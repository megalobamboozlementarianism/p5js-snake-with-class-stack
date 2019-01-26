class Snake {
  constructor() {
    this.body = [];
    this.body[0] = createVector(width/2, height/2);
    this.xdir = 0;
    this.ydir = 0;
  }

  update(){
    let head = this.body[0].copy();
    head.x += this.xdir;
    head.y += this.ydir;
    this.body.unshift(head);
    this.body.pop()
  }

  show(){
    for (let i = 0; i < this.body.length; i++){
      fill('coral');
      ellipse(this.body[i].x, this.body[i].y, 20, 20);
    }
  }

  setDir(x, y){
    this.xdir = x;
    this.ydir = y;
  }

  eat(pos){
    if (Math.abs(pos.x - this.body[0].x) < 10 && Math.abs(pos.y - this.body[0].y) < 10){
      this.grow();
      return true;
    }
  }

  grow(){
    let head = this.body[0].copy();
    this.body.unshift(head);
  }

  die(){
    let head = this.body[0].copy();
    for (let i = 3; i < this.body.length; i++){
      if (this.body[i].x === head.x && this.body[i].y === head.y){
        return true;
      }
    }
    if ((head.x === width || head.x === 0) || (head.y === height || head.y === 0)){
      return true;
    }
    return false;
  }
}
