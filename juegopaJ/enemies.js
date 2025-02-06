class Enemy {
  constructor(x, y, level) {
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 40;
    this.speedX = baseSpeed;
    // Aseguramos que level - 1 esté dentro del rango del array
    const imageIndex = Math.min(Math.max(level - 1, 0), enemyImgs.length - 1);
    this.img = enemyImgs[imageIndex];
  }

 show() {
    // Verificamos que la imagen esté cargada antes de mostrarla
    if (this.img) {
      image(this.img, this.x, this.y, this.width, this.height);
    } else {
      // Fallback en caso de que la imagen no esté cargada
      fill(255, 0, 0);
      rect(this.x, this.y, this.width, this.height);
    }
  }

  move() {
    this.x += this.speedX;
    if (this.x > width - this.width || this.x < 0) {
      this.speedX *= -1;
      this.y += 20;
    }
  }

  checkPlayerCollision(player) {
    return (
      this.x < player.x + player.width &&
      this.x + this.width > player.x &&
      this.y < player.y + player.height &&
      this.y + this.height > player.y
    );
  }
}
