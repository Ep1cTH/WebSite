var w, dir, food, countSize;
var sWidth, sHeight;
let snake = [];
let oldFood = [];
let count = [];

function setup() {
  countSize = 0;
  noStroke();
  sWidth = 600;
  sHeight = 600;
  frameRate(15);
  dir = createVector(1, 0);
  w = 20;
  generateFood();
  createCanvas(sWidth, sHeight);
  snake[0] = createVector(floor(sWidth / w / 2), floor(sHeight / w / 2));
}

function draw() {
  //TEST
  //snake[snake.length] = createVector(floor(sWidth / w / 2), floor(sHeight / w / 2));
  background(0);
  countCount();
  edgeCheck();
  deathCheck();
  fill(255);
  text(snake.length, width / 2, 20);
  if (snake.length > 1) {
    for (var i = snake.length - 1; i > 0; i--) {
      snake[i].x = snake[i - 1].x;
      snake[i].y = snake[i - 1].y;
    }
  }
  snake[0].x += dir.x;
  snake[0].y += dir.y;
  fill(255, 0, 0);
  rect(food.x * w, food.y * w, w, w);
  fill(0, 255, 0);
  //rect(snake[0].x * w,snake[0].y * w,w,w);
  foodCheck();
  for (var k = 0; k < snake.length; k++) {
    fill(0, 255, 0);
    rect(snake[k].x * w, snake[k].y * w, w, w);
  }
}

function generateFood() {
  var x = floor(random(sWidth / w));
  var y = floor(random(sHeight / w));
  food = createVector(x, y);
}

function keyPressed() {
  if (keyCode == UP_ARROW) {
    dir = createVector(0, -1);
  }
  if (keyCode == DOWN_ARROW) {
    dir = createVector(0, 1);
  }
  if (keyCode == RIGHT_ARROW) {
    dir = createVector(1, 0);
  }
  if (keyCode == LEFT_ARROW) {
    dir = createVector(-1, 0);
  }
}

function foodCheck() {
  if (snake[0].x == food.x && snake[0].y == food.y) {
    var done = false;
    var index = 0;
    while (done == false) {
      if (count[index] > 0) {
        index++;
      } else {
        count[index] = snake.length;
        oldFood[index] = createVector(food.x, food.y);
        done = true;
        if (index > countSize) {
          countSize = index;
        }
      }
    }
    generateFood();
  }
}

function edgeCheck() {
  if (snake[0].x < 0) {
    snake[0].x = width / w - 1;
  }
  if (snake[0].x > width / w - 1) {
    snake[0].x = 0;
  }
  if (snake[0].y < 0) {
    snake[0].y = height / w - 1;
  }
  if (snake[0].y > height / w - 1) {
    snake[0].y = 0;
  }
}

function countCount() {
  for (var i = 0; i < countSize; i++) {
    if (count[i] > 0) {
      count[i]--;
      if (count[i] == 0) {
        snake[snake.length] = createVector(oldFood[i].x, oldFood[i].y);
      }
    }
  }
}

function deathCheck() {
  var dead = false;
  for (var i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      dead = true;
    }
  }
  if (dead == true) {
    textAlign(CENTER);
    textSize(32);
    text("FINAL SCORE:" + snake.length, width / 2, height / 2);
    noLoop();
  }
}
