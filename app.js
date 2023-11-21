const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(__dirname + "/public"));

io.on("connection", (socket) => {
  console.log("A new user connected");
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

app.get("/", async (req, res) => {
  try {
    console.log("I work!");
    await res.sendFile(__dirname + "/index.html");
  } catch (e) {
    console.log("I don't work!");
    console.log(e);
    res.sendStatus(404);
  }
});

server.listen(5000, () => {
  console.log("Listening on port 5000");
});
