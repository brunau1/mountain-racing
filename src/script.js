const WORLD_BG = "./assets/scenes/world_bg.png";
const PLAYER_IMG = "./assets/personas/persona_1.png";

class GameEngine {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = 1280;
    this.canvas.height = 720;
    this.context = this.canvas.getContext("2d");
    this.bgImage = new Image();
    this.bgImage.src = WORLD_BG;
  }

  start() {
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGame, 30);
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.drawImage(
      this.bgImage,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
  }
}

class GameComponent {
  constructor(imagePath, x, y, width, height, context) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.image = new Image();
    this.image.src = imagePath;

    this.context = context;
  }

  draw() {
    this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

const GAME_RUNTIME = new GameEngine();
const gameElements = [];
var myGamePiece;

function startGame() {
  GAME_RUNTIME.start();
  gameElements.push(
    new GameComponent(PLAYER_IMG, 30, 30, 160, 120, GAME_RUNTIME.context)
  );
}

function updateGame() {
  GAME_RUNTIME.clear();
  for(const element of gameElements) {
    element.draw();
  }
}

startGame();
