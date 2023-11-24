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

server.listen(5000, () => {
  console.log("Listening on port 5000");
});
