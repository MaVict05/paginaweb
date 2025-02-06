let player;
let shots = [];
let enemies = [];
let score = 0;
let lives = 3;
let level = 1;
let baseSpeed = 2;
let canCreateEnemies = true;
let restartButton;

// Variables para imágenes
let playerImg;
let enemyImgs = []; // Arreglo para imágenes de enemigos por nivel

function preload() {
  playerImg = loadImage('imagenes/player.png'); // Asegúrate de que esta ruta es correcta
  // Carga una imagen diferente para cada nivel
  enemyImgs = [
    loadImage('imagenes/enemy1.jpg'),  // Nivel 1
    loadImage('imagenes/enemy2.jpg'),  // Nivel 2
    loadImage('imagenes/enemy3.jpg'),  // Nivel 3
    loadImage('imagenes/enemy4.jpg'),  // Nivel 4
    loadImage('imagenes/enemy5.jpg')   // Nivel 5
  ];
}


function setup() {
  createCanvas(400, 600);
  player = new Player();
  createEnemies();
}

function createEnemies() {
  if (!canCreateEnemies) return;
  
  let currentSpeed = baseSpeed + (level * 0.5);
  enemies = [];

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 3; j++) {
      let enemy = new Enemy(i * 60 + 100, j * 50 + 50, level); // Corrección
      enemy.speedX = currentSpeed;
      enemies.push(enemy);
    }
  }
}

function draw() {
  background(0);
  
  fill(255);
  textSize(20);
  text(`Puntos: ${score}`, 10, 30);
  text(`Vidas: ${lives}`, width - 100, 30);
  text(`Nivel: ${level}`, width / 2 - 30, 30);
  
  player.show();
  player.move();
  
  if (enemies.length === 0 && canCreateEnemies) {
    level++;

    if (level > 5) {
      noLoop();
      background(0);
      fill(255);
      textSize(32);
      textAlign(CENTER);
      text('ganaste', width / 2, height / 2);
      text(`puntos: ${score}`, width / 2, height / 2 + 40);
      createRestartButton();
      return;
    }

    canCreateEnemies = false;
    fill(255);
    textSize(32);
    textAlign(CENTER);
    text(`nivel ${level}`, width / 2, height / 2);

    setTimeout(() => {
      canCreateEnemies = true;
      createEnemies();
    }, 1500);
  }

  for (let i = shots.length - 1; i >= 0; i--) {
    shots[i].move();
    shots[i].show();

    if (shots[i].offscreen()) {
      shots.splice(i, 1);
      continue;
    }

    for (let j = enemies.length - 1; j >= 0; j--) {
      if (checkCollision(shots[i], enemies[j])) {
        enemies.splice(j, 1);
        shots.splice(i, 1);
        score += 10;
        break;
      }
    }
  }

  for (let i = enemies.length - 1; i >= 0; i--) {
    enemies[i].show();
    enemies[i].move();

    if (enemies[i].checkPlayerCollision(player)) {
      lives--;
      enemies = [];
      canCreateEnemies = true;
      createEnemies();

      if (lives <= 0) {
        noLoop();
        background(0);
        fill(255);
        textSize(32);
        textAlign(CENTER);
        text('juego terminado', width / 2, height / 2);
        text(`puntos: ${score}`, width / 2, height / 2 + 40);
        createRestartButton();
      }
      break;
    }
  }
}

function createRestartButton() {
  restartButton = createButton('volver a jugar');
  restartButton.position(width / 2 - 40, height / 2 + 80);
  restartButton.mousePressed(restartGame);
}

function restartGame() {
  score = 0;
  lives = 3;
  level = 1;
  enemies = [];
  shots = [];
  canCreateEnemies = true;
  
  createEnemies();
  loop();

  restartButton.remove();
}

function checkCollision(shot, enemy) {
  return (
    shot.x < enemy.x + enemy.width &&
    shot.x + shot.width > enemy.x &&
    shot.y < enemy.y + enemy.height &&
    shot.y + shot.height > enemy.y
  );
}
function keyPressed() {
  if (key === ' ') {
    shots.push(new Shot(player.x, player.y));
  }
}
 
