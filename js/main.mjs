import Player from "./player.mjs";
import controls from "./controls.mjs";

const socket = io();
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

const writeToCanvas = (msg) => {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "black";
  ctx.font = "15px Arial";
  ctx.fillText(msg, width / 2, height / 2);
};

let playersArry = [];

socket.on("init", ({ id, players: serverPlayers }) => {
  const localPlayer = new Player({ id });
  controls(localPlayer, socket);

  socket.emit("new-player", localPlayer);
  socket.on("new-player", (player) => {
    playersArry.push(new Player(player));
  });

  playersArry = serverPlayers
    .map((player) => new Player(player))
    .concat(localPlayer);

  socket.on("move-player", ({ id, direction }) =>
    playersArry.find((p) => p.id === id).move(direction)
  );
  socket.on("stop-player", ({ id, direction }) =>
    playersArry.find((p) => p.id === id).stop(direction)
  );

  const draw = () => {
    ctx.clearRect(0, 0, width, height);
    playersArry.forEach((player) => player.draw(ctx));
    requestAnimationFrame(draw);
  };
  draw();
});
