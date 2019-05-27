import { Var } from "./app.js";
import { Game } from "./app.js";

export class Ship {
  constructor(radius, rearPoints) {
    this.r = radius;
    this.rear = rearPoints;
    this.deg = 0;
    this.y = Var.W / 2;
    this.x = Var.H / 2;
    this.turnSpeed = 10;
    this.moveX = 0;
    this.moveY = 0;
    this.acc = 0.0001;
    this.maxSpeed = 0.01;
    this.points = [{}, {}, {}];
  }
  draw() {
    if (Game.key37 || Game.key39) {
      this.deg = this.deg + this.turnSpeed * (Game.key37 ? -1 : 1);
    }
    if (Game.key38) {
      this.moveX = Math.max(
        -this.maxSpeed * Var.D,
        Math.min(
          this.maxSpeed * Var.D,
          this.moveX + Math.sin((Math.PI / 180) * this.deg) * this.acc * Var.D
        )
      );
      this.moveY = Math.max(
        -this.maxSpeed * Var.D,
        Math.min(
          this.maxSpeed * Var.D,
          this.moveY - Math.cos((Math.PI / 180) * this.deg) * this.acc * Var.D
        )
      );
    } else {
      this.moveX = Math.abs(this.moveX) > this.acc ? this.moveX * 0.98 : 0;
      this.moveY = Math.abs(this.moveY) > this.acc ? this.moveY * 0.98 : 0;
    }
    this.x += this.moveX;
    this.y += this.moveY;

    if (this.points.every(el => el.x < 0)) {
      this.x = Var.W;
    }

    if (this.points.every(el => el.x > Var.W)) {
      this.x = 0;
    }

    if (this.points.every(el => el.y < 0)) {
      this.y = Var.H;
    }

    if (this.points.every(el => el.y > Var.H)) {
      this.y = 0;
    }

    Game.ctx.beginPath();
    for (let i = 0; i < 3; i++) {
      this.tmp =
        i === 0
          ? this.deg
          : this.deg + 180 + (i === 1 ? this.rear : -this.rear);
      this.points[i].x =
        Math.sin((Math.PI / 180) * this.tmp) * this.r * Var.D + this.x;
      this.points[i].y =
        -Math.cos((Math.PI / 180) * this.tmp) * this.r * Var.D + this.y;
      Game.ctx[i === 0 ? "moveTo" : "lineTo"](
        this.points[i].x,
        this.points[i].y
      );
    }

    Game.ctx.closePath();
    Game.ctx.stroke();
  }
}
