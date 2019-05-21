class Ship {
  constructor(radius, rearPoints) {
    this.r = radius;
    this.rear = rearPoints;
    this.deg = 0;
    this.x = Var.H / 2;
    this.y = Var.W / 2;
    this.points = [{}, {}, {}];
  }
  draw() {
    Game.ctx.beginPath();
    for (let i = 0; i < 3; i++) {
      this.tmp =
        i === 0
          ? this.deg
          : this.deg + 180 + (i === 1 ? this.rear : -this.rear);
      this.points[i].x =
        Math.sin((Math.PI / 180) * this.tmp) * this.r * Var.D + this.x;
      this.points[i].y =
        -Math.cos((Math.PI / 180) * this.tmp) * this.r * Var.D + this.x;

      Game.ctx[i === 0 ? "moveTo" : "lineTo"](
        this.points[i].x,
        this.points[i].y
      );
    }
    Game.ctx.closePath();
    Game.ctx.stroke();
  }
}
