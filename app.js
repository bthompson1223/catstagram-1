const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
require("dotenv").config();
const { Message, User } = require("./db/models");

app.use(express.static(__dirname + "/public"));

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
    });
    res.json(messages);
  } catch (e) {
    console.log(e);
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
