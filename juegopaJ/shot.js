class Shot {
  constructor(x, y) {
    this.x = x + 20; // Centrar el disparo en el jugador (mitad del ancho del jugador)
    this.y = y;
    this.width = 5;
    this.height = 15;
  }
  
  show() {
    fill(0, 255, 0);
    rectMode(CORNER); // Cambiar a CORNER para consistencia
    rect(this.x, this.y, this.width, this.height);
  }
  
  move() {
    this.y -= 10;
  }
  
  offscreen() {
    return this.y < 0;
  }
}
