var square1, square2, Gsize, collision, weight1, weight2, colour, colourMode, offset, speed, ready;
let weight1Input, weight2Input, vInput, button;


function setup() {
    ready = false;
    createCanvas(400, 400);
    background(200);
    weight1Input = createInput();
    weight2Input = createInput();
    vInput = createInput();
    weight1Input.size(100, 15);
    weight2Input.size(100, 15);
    vInput.size(100, 15);
    weight1Input.position(25, 10);
    weight2Input.position(width / 2 - 50, 10);
    vInput.position(width - 125, 10);
    button = createButton('START');
    button.size(80, 20);
    button.position(width / 2 - 40, 40);
    button.mousePressed(start);
    noLoop();
}

function start() {
    weight1 = weight1Input.value();
    weight2 = weight2Input.value();
    speed = vInput.value();
    offset = 50;
    Gsize = 50 * (1 / sqrt(weight2));
    square1 = new square(width / 4 + offset, height / 2, weight1, 0);
    square2 = new square(3 * width / 4 + offset, height / 2, weight2, -speed);
    collision = 0;
    colour = 255;
    ready = true;
    loop();
}

function draw() {
    if (ready == true) {
        fill(0);
        background(240);
        text(collision, 10, 10);
        square1.update();
        square2.update();
        square1.draw();
        square2.draw();
        if (square1.x + square1.r / 2 + square2.r / 2 >= square2.x) {
            var temp = square1.v;
            square1.v = ((square1.m - square2.m) * square1.v + 2 * square2.m * square2.v) / (square1.m + square2.m);
            square2.v = (2 * square1.m * temp - (square1.m - square2.m) * square2.v) / (square1.m + square2.m);
            collision++;
            colourFill();
        }

        if (square1.x <= 20 + offset) {
            if (square1.v < 0) {
                square1.v = -1 * square1.v;
                collision++;
                colourFill();
            }
        }
    }
}



function square(a, b, c, d) {
    this.x = a;
    this.y = b;
    this.m = c;
    this.v = d;
    this.r = Gsize * sqrt(this.m);
    this.draw = function() {
        fill(255 - colour, colour, 255);
        rectMode(CENTER);
        rect(this.x, this.y, this.r, this.r);
    }
    this.update = function() {
        this.r = Gsize * sqrt(this.m);
        this.x += this.v;
    }
}



function colourFill() {
    if (colourMode == 1) {
        colour--;
    }
    if (colourMode == 2) {
        colour++;
    }

    if (colour == 255) {
        colourMode = 1;
    }
    if (colour == 0) {
        colourMode = 2;
    }
}
