export default (player, socket) => {
  document.onkeydown = (e) => {
    let direction;
    if (e.keyCode === 68) {
      direction = "right";
    }
    if (e.keyCode === 65) {
      direction = "left";
    }
    if (e.keyCode === 87) {
      direction = "up";
    }
    if (e.keyCode === 83) {
      direction = "down";
    }
    player.move(direction);
    socket.emit("move-player", direction);
  };

  document.onkeyup = (e) => {
    let direction;
    if (e.keyCode === 68) {
      direction = "right";
    }
    if (e.keyCode === 65) {
      direction = "left";
    }
    if (e.keyCode === 87) {
      direction = "up";
    }
    if (e.keyCode === 83) {
      direction = "down";
    }
    player.stop(direction);
    socket.emit("stop-player", direction);
  };
};
