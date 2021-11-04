import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const __dirname = path.resolve(
  path.dirname(decodeURI(new URL(import.meta.url).pathname))
);

server.listen(3000, () => console.log("✅  Server listening on port 3000"));

app.use(express.static(__dirname + "/"));
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "/index.html")));

const players = [];

io.on("connection", (socket) => {
  console.log("socket.id : ", socket.id);
  socket.emit("init", { id: socket.id, players: players });
  socket.on("new-player", (player) => {
    players.push(player);
    socket.broadcast.emit("new-player", player);
  });

  socket.on("move-player", (direction) =>
    socket.broadcast.emit("move-player", { id: socket.id, direction })
  );
  socket.on("stop-player", (direction) =>
    socket.broadcast.emit("stop-player", { id: socket.id, direction })
  );
});
