const SCREEN_WIDTH = 1280;
const SCREEN_HEIGHT = 720;
const WORLD_BG = "./assets/scenes/world_bg.png";
const PLAYER_IMG = "./assets/personas/persona_1.png";
const MOUNTAIN_IMG = "./assets/scenes/mountains_side.png";
const STREET_IMG = "./assets/scenes/street_side.png";

class GameEngine {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = SCREEN_WIDTH;
    this.canvas.height = SCREEN_HEIGHT;
    this.context = this.canvas.getContext("2d");
    this.bgImage = new Image();
    this.bgImage.src = WORLD_BG;
  }

  start() {
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
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

class ScrollingComponent {
  constructor(imagePath, x, y, width, height, speed) {
    this.x = x;
    this.y = y;

    this.width = width;
    this.height = height;

    this.speed = speed;
    this.image = new Image();
    this.image.src = imagePath;
  }

  scroll(context) {
    // change sign of speed to change scroll direction
    this.x = (((this.x - this.speed) % this.width) + this.width) % this.width;
    this.drawImageRepeat(context);
  }

  drawImageRepeat(context) {
    context.drawImage(this.image, this.x, this.y);
    context.drawImage(this.image, this.x + this.width, this.y);
    context.drawImage(this.image, this.x - this.width, this.y);
  }
}
class GameComponent {
  constructor(imagePath, x, y, accX, accY, width, height) {
    this.x = x;
    this.y = y;

    this.speedX = 0;
    this.speedY = 0;

    this.accX = accX;
    this.accY = accY;

    this.width = width;
    this.height = height;

    this.image = new Image();
    this.image.src = imagePath;
  }

  setPosition() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  move(direction) {
    const actions = {
      up: () => {
        this.speedY -= this.accY;
      },
      down: () => {
        this.speedY += this.accY;
      },
      left: () => {
        this.speedX -= this.accX;
      },
      right: () => {
        this.speedX += this.accX;
      },
      stop: () => {
        this.speedX = 0;
        this.speedY = 0;
      },
    };
    actions[direction]();

    this.setPosition();
  }

  draw(context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

const gamePlayers = [];
const gameScenario = [];
const GAME_RUNTIME = new GameEngine();

function startGame() {
  GAME_RUNTIME.start();
  gamePlayers.push(new GameComponent(PLAYER_IMG, 30, 400, 1, 1, 160, 120));
  gameScenario.push(new ScrollingComponent(MOUNTAIN_IMG, 0, 230, 1280, 170, 1));
  gameScenario.push(new ScrollingComponent(STREET_IMG, 0, 400, 1280, 350, 4));
  updateGame();
}

function updateGame() {
  window.requestAnimationFrame(updateGame);

  console.log("update");
  GAME_RUNTIME.clear();
  for (const element of gameScenario) element.scroll(GAME_RUNTIME.context);
  for (const element of gamePlayers) element.draw(GAME_RUNTIME.context);
}

startGame();
