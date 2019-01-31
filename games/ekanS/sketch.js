var w, dir, food, oldFood, count;

var sWidth, sHeight;

let snake = [];



function setup() {

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

    if (count != 0) {

        count--;

        if (count == 0) {

            snake[snake.length] = createVector(oldFood.x, oldFood.y);

        }

    }

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

        count = snake.length;

        oldFood = createVector(food.x, food.y);

        generateFood();

    }

}
