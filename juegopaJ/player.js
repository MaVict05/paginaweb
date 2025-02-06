class Player {
  constructor() {
    this.x = width / 2;
    this.y = height - 50;
    this.width = 40;
    this.height = 40;
  }

  show() {
    image(playerImg, this.x, this.y, this.width, this.height);
  }

  move() {
    if (keyIsDown(LEFT_ARROW) && this.x > 0) {
      this.x -= 5;
    }
    if (keyIsDown(RIGHT_ARROW) && this.x < width - this.width) {
      this.x += 5;
    }
  }
}
