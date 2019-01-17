var w = 15;
var bombs = 200;

var flag = false;
var win = false;
var dead = false;
var grid, cols, rows, r;

function setup() {
  createCanvas(601,601);
  background(255);
	cols = floor(width / w);
	rows = floor(height / w);
	initGrid();
	
}

function mousePressed(){
	if(flag == false)
  {
    grid[floor(mouseX/w)][floor(mouseY/w)].reveal();
  }
  else{
    grid[floor(mouseX/w)][floor(mouseY/w)].flag();
  }
}

function draw() {

	var count = 0;
  for(var i = 0; i < rows;i++)
    {
      for(var j = 0; j < cols;j++)
      {
        if(grid[i][j].bomb == true || grid[i][j].revealed == true)
        {
        count++;
        }
      }
    }
    if(count == rows * cols)
    {
      win = true;
    }

    if(keyIsPressed == true)
 	{
    	if(key == '1')
	    {
	      flag = false;
	      cursor(ARROW);
	    }
	  if(key == '2')
	    {
	      flag = true;
	      cursor(CROSS);
	    }
    }

    if(dead == true)
  {
    if((r^2) < (width^2) + (height^2))
    {
      fill(255,0,0);
      ellipse(width/2,height/2,r,r);
      r = (r ^ 2) + 1;
    }
    else
    {
      noLoop();
      print("YOUR DEAD");
    }
  }

  if(win == true)
  {
    fill(0,255,0);
    textSize(width/8);
    text("YOU WIN",width/4,height/2);
    noLoop();
  }
}

function initGrid() {
  grid = new Array(cols);
  for(var i = 0; i < cols; i++)
  {
    grid[i] = new Array(rows);
  }

  for(var i = 0; i < cols; i++)
  {
    for(var j = 0; j < rows; j++)
  	{
    	grid[i][j] = new square(i,j,false);
    	grid[i][j].create();
  	}
  }

  var count = 0;
  while(count < bombs)
  {
  	var x = floor(random(cols));
  	var y = floor(random(rows));
  	if(grid[x][y].bomb == false){
  		grid[x][y].bomb = true;
  		count++;
  	}
  }

  for(var i = 0; i < cols; i++)
  {
    for(var j = 0; j < rows; j++)
  	{
    	grid[i][j].check();
  	}
  }
}




//SQUARE


function square(a,b,c){
    this.x = a;
    this.y = b;
    this.bomb = c;
    this.near = 0;
    this.revealed = false;
  
  
  this.fillB = function(){
    this.bomb = true;
  }
  
	this.reveal = function(){
    this.revealed = true;
    fill(200);
    rect(this.x*w,this.y*w,w,w);
    if(this.bomb == true)
    {
      fill(0);
      stroke(0);
      ellipse(this.x*w+w/2,this.y*w+w/2,w/2,w/2);
      dead = true;
    }
    else{
      if(this.near > 0)
      {
        fill(0);
        stroke(0);
        text(this.near,this.x*w+w/2.5,this.y*w+w/1.4);
      }
    }
    if(this.near==0){
    for(var i = 0; i < 3; i++)
    {
      for(var j = 0; j < 3; j++)
      {
        if(this.x-1+i>-1 && this.x-1+i<rows && this.y-1+j>-1 && this.y-1+j<cols)
        {
          if(grid[this.x-1+i][this.y-1+j].bomb == false)
          {
            if((this.x-1+i != this.x || this.y-1+j != this.y) && grid[this.x-1+i][this.y-1+j].revealed == false){
              grid[this.x-1+i][this.y-1+j].reveal();
            }
          }
        }
      }
    }
    }
  }
     
  this.flag = function(){
    if(this.revealed == false)
    {
      fill(0,0,255);
      ellipse(this.x*w+w/2,this.y*w+w/2,w/2,w/2);
    }
  }
  
  this.create = function(){
    rect(this.x*w,this.y*w,w,w);
  }
  
 this.check = function(){
    var count = 0;
    for(var i = 0; i < 3; i++)
    {
      for(var j = 0; j < 3; j++)
      {
        if(this.x-1+i>-1 && this.x-1+i<rows && this.y-1+j>-1 && this.y-1+j<cols)
        {
          if(grid[this.x-1+i][this.y-1+j].bomb == true)
          {
            count++;
          }
        }
      }
    }
    this.near = count;
  }
  
  this.setDimension = function(a, b){
    a = x;
    b = y;
  }
}