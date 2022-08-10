const SCREEN_WIDTH = 1080;
const SCREEN_HEIGHT = 760;
const WORLD_BG = "./assets/scenes/world_bg.png";
const PLAYER_IMG = "./assets/personas/persona_1.png";
const PLAYER_WIDTH = 140;
const PLAYER_HEIGHT = 110;
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
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
    context.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
    context.drawImage(
      this.image,
      this.x - this.width,
      this.y,
      this.width,
      this.height
    );
  }

  update(context) {
    this.scroll(context);
  }
}
class Player {
  constructor(imagePath, x, y, accX, accY, width, height) {
    this.x = x;
    this.y = y;

    this.speedX = 0.2;
    this.speedY = 0.2;

    this.accX = accX;
    this.accY = accY;

    this.width = width;
    this.height = height;

    this.movingState = "stop";

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
        this.speedY += -this.accY;
      },
      down: () => {
        this.speedY += this.accY;
      },
      left: () => {
        this.speedX += -this.accX;
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

  update(context) {
    this.randomDirection();
    this.move(this.movingState);
    this.checkWorldCollision();
    this.draw(context);
  }

  checkWorldCollision() {
    // left
    if (this.x < 0) {
      this.x = 0;
      // right
    } else if (this.x + this.width > SCREEN_WIDTH) {
      this.x = SCREEN_WIDTH - this.width;
    }
    // top
    if (this.y < 0) {
      this.y = 0;
      // bottom
    } else if (this.y + this.height > SCREEN_HEIGHT) {
      this.y = SCREEN_HEIGHT - this.height;
    }
  }

  randomDirection() {
    const directions = ["up", "down", "left", "right", "stop"];
    if (count % 10 === 0)
      this.movingState = directions[Math.floor(Math.random() * directions.length)];
    count++;
  }
}
let count = 0;

const gameComponents = [];
const GAME_RUNTIME = new GameEngine();

function startGame() {
  const mountain_side = new ScrollingComponent(
    MOUNTAIN_IMG,
    0,
    230,
    SCREEN_WIDTH,
    170,
    1
  );
  const street_side = new ScrollingComponent(
    STREET_IMG,
    0,
    400,
    SCREEN_WIDTH,
    360,
    4
  );
  const player1 = new Player(
    PLAYER_IMG,
    30,
    400,
    0.2,
    0.2,
    PLAYER_WIDTH,
    PLAYER_HEIGHT
  );

  GAME_RUNTIME.start();
  gameComponents.push(...[mountain_side, street_side, player1]);
  updateGame();
}

function updateGame() {
  console.log("update");
  GAME_RUNTIME.clear();
  for (const element of gameComponents) element.update(GAME_RUNTIME.context);

  window.requestAnimationFrame(updateGame);
}

startGame();
