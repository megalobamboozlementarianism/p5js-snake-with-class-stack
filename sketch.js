let snake;
let paused = false;
let food;
let highScore = 0;
let windowWidth = 150;
let windowHeight = 150;

function setup(){
  createCanvas(windowWidth, windowHeight);
  snake = new Snake();
  foodLocation();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function foodLocation(){
  let x = floor(random(width));
  let y = floor(random(height));
  food = createVector(x, y);
}

function draw(){
  background('dimgrey');
  noStroke();
  fill('lime');
  ellipse(food.x, food.y, 20, 20);
  snake.update();
  snake.show();
  if(snake.eat(food)){
    foodLocation();
    if ((snake.body.length-1) % 10 === 0){
      windowWidth += 10;
      windowHeight += 10;
      windowResized();
    }
  }
  if (snake.die()){
    if ((snake.body.length-1) > highScore){
      highScore = snake.body.length-1;
    }
    snake.body = [];
    snake.body[0] = createVector(width/2, height/2);
    snake.xdir = 0;
    snake.ydir = 0;
    windowWidth = 150;
    windowHeight = 150;
    windowResized();
  }
  score();
}

function score(){
  fill('lemonchiffon');
  text("score: " + (snake.body.length-1), 10, height - 25);
  text("high score: " + highScore, 10, height - 10);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW && snake.xdir !==1) {
    snake.setDir(-1, 0);
  } else if (keyCode === RIGHT_ARROW && snake.xdir !==-1) {
    snake.setDir(1, 0);
  } else if (keyCode === DOWN_ARROW && snake.ydir !==-1){
    snake.setDir(0, 1);
  } else if (keyCode === UP_ARROW && snake.ydir !==1){
    snake.setDir(0, -1);
  } else if (keyCode === 32 ){
    if (!paused) {
      noLoop();
      paused = true;
    } else if (paused){
      loop();
      paused = false;
    }
  }
}
