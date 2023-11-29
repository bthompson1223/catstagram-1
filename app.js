const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
require("dotenv").config();
const { Message, User } = require("./db/models");

app.use(express.static(__dirname + "/public"));
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    await res.sendFile(__dirname + "/index.html");
  } catch (e) {
    console.log(e);
    res.sendStatus(e.statusCode || 500);
  }
});

app.get("/api", async (req, res) => {
  try {
    const messages = await Message.findAll({
      include: User,
      order: [["createdAt", "DESC"]],
      limit: 5,
    });
    res.json(messages);
  } catch (e) {
    console.log(e);
  }
});

app.get("/api/user/:name", async (req, res) => {
  try {
    console.log("body =====> ", req.params.name);
    const userName = await User.findOne({
      where: {
        userName: req.params.name,
      },
    });
    res.json(userName);
  } catch (e) {
    console.log(e);
  }
});

app.get("/api/message", async (req, res) => {
  const message = await Message.findOne({
    include: User,
    order: [["createdAt", "DESC"]],
  });

  res.json(message);
});

app.post("/api", async (req, res) => {
  if (req.body.user && req.body.message) {
    console.log("full body", req.body);
    const user = await User.findOne({
      where: {
        userName: req.body.user,
      },
    });
    if (user) {
      user.createMessage({
        message: req.body.message,
      });
    }
  }
  console.log("null body", req.body);
  res.json({
    message: "Message sent",
  });
});

app.post("/api/user", async (req, res) => {
  if (!req.body.user) return res.json("Need username");
  else {
    const entry = await User.create({
      userName: req.body.user,
    });

    res.json(entry);
  }
});

io.on("connection", (socket) => {
  console.log("A new user connected");
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

// io.on("connection", (socket) => {
//   socket.on("username", (username) => {
//     socket.emit("connected", username);
//     console.log(`${username} has connected`);

//     socket.on("message", (message) => {
//       socket.emit("message", message, username);
//       console.log(`${username}: ${message}`);
//     });
//     socket.on("disconnect", (username) => {
//       socket.emit("disconnected");
//       console.log(`${username} has disconnected`);
//     });
//   });
// });

server.listen(5000, () => {
  console.log("Listening on port 5000");
});
