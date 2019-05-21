window.onload = () => {
  Game.init();
};

// Variables object
Var = {
  fps: 60,
  W: 0,
  H: 0,
  lastTime: 0
};

Game = {
  init: () => {
    Game.canvas = document.createElement("canvas");
    Game.ctx = Game.canvas.getContext("2d");
    Game.layout();
    window.addEventListener("resize", Game.layout, false);
    document.body.appendChild(Game.canvas);
    Game.animation();
  },
  layout: () => {
    Var.H = window.innerHeight;
    Var.W = window.innerWidth;
    Game.canvas.height = Var.H;
    Game.canvas.width = Var.W;

    Game.ctx.fillStyle = "white";
    Game.ctx.strokeStyle = "white";
    Game.ctx.lineWidth = 3;
    Game.ctx.lineJoin = "round";
  },
  animation: time => {
    requestAnimationFrame(Game.animation);
    if (time - Var.lastTime >= 1000 / Var.fps) {
      Var.lastTime = time;
      Game.ctx.clearRect(0, 0, Game.H, Game.W);
    }
  }
};
