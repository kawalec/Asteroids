import { Var } from "./app.js";
import { Game } from "./app.js";

export class Bullet {
  constructor(x, y, deg) {
    this.x = x;
    this.y = y;
    this.deg = deg;
    this.speed = 0.01;
    this.moveX = Math.sin((Math.PI / 180) * this.deg) * this.speed * Var.D;
    this.moveY = -Math.cos((Math.PI / 180) * this.deg) * this.speed * Var.D;
  }
  drawBullet() {
    this.x += this.moveX;
    this.y += this.moveY;

    Game.ctx.beginPath();
    Game.ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
    Game.ctx.closePath();
    Game.ctx.fill();
  }
}
