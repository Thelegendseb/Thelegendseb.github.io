
let numBalls = 15;
let spring = 1;
let gravity = 0.6;
let friction = -0.9;
let balls = [];

var id = 'p5-canvas';

function setup() {

  setup_Sketch();
  
  drawingContext.shadowOffsetX = 0;
  drawingContext.shadowOffsetY = 0;
  drawingContext.shadowBlur = 30;
  drawingContext.shadowColor = 'rgb(0,200,0)';
  
  for (let i = 0; i < numBalls; i++) {
    balls[i] = new Ball(
      random(width),
      random(height),
      random(height / 10, height / 7),
      i,
      balls
    );
  }
  noStroke();
}

function setup_Sketch() {
  var elem = document.getElementById(id);
  var properties = window.getComputedStyle(elem, null);
  var height = properties.height;
  var width = properties.width;
  var c = createCanvas(parseInt(width),parseInt(height));
  c.parent(id);
}

function windowResized() {
  var elem = document.getElementById(id);
  var properties = window.getComputedStyle(elem, null);
  var height = properties.height;
  var width = properties.width;
  resizeCanvas(parseInt(width),parseInt(height));
  firstit = false;
}

function draw() {
  background(12, 12, 12);
  balls.forEach(ball => {
    ball.collide();
    ball.move();
    ball.display();
  });
}

function mouseClicked() {
  gravity = -gravity;
}

class Ball {
  constructor(xin, yin, din, idin, oin) {
    this.x = xin;
    this.y = yin;
    this.vx = 0;
    this.vy = 0;
    this.diameter = din;
    this.id = idin;
    this.others = oin;
  }

  collide() {
    for (let i = this.id + 1; i < numBalls; i++) {
      // console.log(others[i]);
      let dx = this.others[i].x - this.x;
      let dy = this.others[i].y - this.y;
      let distance = sqrt(dx * dx + dy * dy);
      let minDist = this.others[i].diameter / 2 + this.diameter / 2;
      //   console.log(distance);
      //console.log(minDist);
      if (distance < minDist) {
        //console.log("2");
        let angle = atan2(dy, dx);
        let targetX = this.x + cos(angle) * minDist;
        let targetY = this.y + sin(angle) * minDist;
        let ax = (targetX - this.others[i].x) * spring;
        let ay = (targetY - this.others[i].y) * spring;
        this.vx -= ax;
        this.vy -= ay;
        this.others[i].vx += ax;
        this.others[i].vy += ay;
      }
    }
  }

  move() {

      this.vy += gravity;
      this.x += this.vx / 8;
      this.y += this.vy / 8;
      if (this.x + this.diameter / 2 > width) {
        this.x = width - this.diameter / 2;
        this.vx *= friction;
      } else if (this.x - this.diameter / 2 < 0) {
        this.x = this.diameter / 2;
        this.vx *= friction;
      }
      if (this.y + this.diameter / 2 > height) {
        this.y = height - this.diameter / 2;
        this.vy *= friction;
      } else if (this.y - this.diameter / 2 < 0) {
        this.y = this.diameter / 2;
        this.vy *= friction;
      }
      
  }


  display() {
    fill(16, 225, 86);
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}
