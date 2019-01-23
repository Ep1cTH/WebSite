var square1, square2, size, collision, weight1, weight2, colour, colourMode, offset, speed;

 

function setup() {

          weight1 = 1;

          weight2 = 10000;

          offset = 50;

          speed = 1;

         

  createCanvas(400, 400);

          size = 200 * (1 / sqrt(weight2));

          square1 = new square(width/4 + offset, height/2, weight1, 0);

          square2 = new square(3 * width/4 + offset, height/2, weight2, -speed);

          collision = 0;

          colour = 255;

}

 

function draw() {

          fill(0);

  background(240);

          text(collision, 10, 10);

          square1.draw();

          square2.draw();

          square1.update();

          square2.update();

          print(collision);

          if(square1.x + square1.r/2 + square2.r/2 >= square2.x) {

                   var temp = square1.v;

                  

                   square1.v = ((square1.m - square2.m) * square1.v + 2 * square2.m * square2.v)/(square1.m + square2.m);

 

                   square2.v = (2 * square1.m * temp - (square1.m - square2.m) * square2.v)/(square1.m + square2.m);

         

                   collision++;

                   colourFill();

          }

          if(square1.x <= 20 + offset) {

                   if(square1.v < 0) {

                             square1.v = -1 * square1.v;

                             collision++;

                             colourFill();

                   }

          }

}

 

function square(a,b,c,d) {

          this.x = a;

          this.y = b;

          this.m = c;

          this.v = d;

          this.r = size * sqrt(this.m);

         

          this.draw = function() {

                   fill(255-colour,colour,255);

                   rectMode(CENTER);

                   rect(this.x, this.y, this.r, this.r);

          }

         

          this.update = function() {

                   this.x += this.v;

          }

}

 

function colourFill() {

          if(colourMode == 1) {

                   colour--;

          }

          if(colourMode == 2) {

                   colour++;

          }

          if(colour == 255) {

                   colourMode = 1;

          }

          if(colour == 0) {

                   colourMode = 2;

          }

}
