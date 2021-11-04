class Player {
  constructor({
    id,
    x = 10,
    y = 10,
    width = 50,
    height = 50,
    color = "tomato",
  }) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.speed = 10;
    this.isMoving = {};
  }
  draw(ctx) {
    if (this.isMoving.right) {
      this.x += this.speed;
    }
    if (this.isMoving.left) {
      this.x -= this.speed;
    }
    if (this.isMoving.up) {
      this.y -= this.speed;
    }
    if (this.isMoving.down) {
      this.y += this.speed;
    }
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  move(direction) {
    this.isMoving[direction] = true;
  }
  stop(direction) {
    this.isMoving[direction] = false;
  }
}

export default Player;
