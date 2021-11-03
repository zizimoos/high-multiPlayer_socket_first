console.log("client");

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
  ctx.font = "30px Arial";
  ctx.fillText(msg, width / 2, height / 2);
};
socket.on("init", (id, players) => {
  writeToCanvas("Waiting for other players...");
});
