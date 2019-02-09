var bird, pipes, r, birdV, pipeCount, score, padding, v, density, birdPos;
var gravity, h, w;

function setup() {
  birdPos = 50;
  density = 0;
  v = 5;
  score = 0;
  padding = 100;
	w = 35;
	h = 100;
	gravity = 0.5;
	birdV = 0;
	pipeCount = 0;
	r = 20;
	pipes = [];
  createCanvas(600, 600);
  generatePipe(width);
	bird = createVector(birdPos,height/2);
}

function draw() {
  background(0);
  
  //BIRD STUFF
	birdV -= gravity;
	ellipse(bird.x,bird.y,r);
	bird.y -= birdV;
  
  //PIPE STUFF
	for(var i = 0; i < pipeCount; i++) {
    pipes[i].update();
		pipes[i].draw();
	}
  
  //SCORE STUFF
  fill(255);
  text(score,width/2,20);
}

function mousePressed() {
	birdV = 10;
}

function generatePipe(a) {
	pipes[pipeCount] = new pipe(a,floor(random(height - h - padding)));
	pipeCount++;
}

function pipe(x,top) {
	this.x1 = x;
	this.y1 = 0;
	this.h1 = top + padding/2;
	this.x2 = x;
	this.y2 = this.h1 + h;
	this.h2 = height - h - this.h1;
  this.doneG = false;
  this.doneS = false;
	this.draw = function() {
		fill(0,255,0);
		rect(this.x1,this.y1,w,this.h1);
		rect(this.x2,this.y2,w,this.h2);
	}
  this.update = function() {
    this.x1 -= v;
    this.x2 = this.x1;
    if(this.x1 < width / 2 - density && this.doneG == false) {
      generatePipe(width);
      this.doneG = true;
    }
    if(this.x1 < birdPos && this.doneS == false) {
      score++;
      this.doneS = true;
    }
    if(this.x1 > birdPos - w && this.x1 < birdPos) {
      if(bird.y < this.h1 || bird.y > this.h1 + h) {
        die();
      }
    }
  }
}

function die() {
  noLoop();
}
