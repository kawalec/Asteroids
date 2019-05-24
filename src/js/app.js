import "../styles/styles.css";
import { Ship } from "./ship.js";

window.onload = () => {
  Game.init();
};

// Variables object
export const Var = {
  fps: 60,
  W: 0,
  H: 0,
  lastTime: 0,
  lastUpdate: -1,
  rand: (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};

// Game object
export const Game = {
  init: () => {
    Game.canvas = document.createElement("canvas");
    Game.ctx = Game.canvas.getContext("2d");
    Game.layout();
    window.addEventListener("resize", Game.layout, false);
    document.body.appendChild(Game.canvas);
    Game.enterprise = new Ship(0.04, 35);
    window.addEventListener("keydown", Game.onKey, false);
    window.addEventListener("keyup", Game.onKey, false);
    Game.animation();
  },
  layout: () => {
    Var.H = window.innerHeight;
    Var.W = window.innerWidth;
    Var.D = Math.min(Var.H, Var.W);
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
      Game.ctx.clearRect(0, 0, Var.H, Var.W);
      Game.enterprise.draw();
    }
  },
  onKey: event => {
    if (
      event.keyCode == 32 ||
      event.keyCode == 37 ||
      event.keyCode == 38 ||
      event.keyCode == 39
    ) {
      // event.preventDefault();
      if (event.type == "keydown" && !Game["key" + event.keyCode]) {
        Game["key" + event.keyCode] = true;
        if (event.keyCode == 37) {
          Game.key39 = false;
        } else if (event.keyCode == 39) {
          Game.key37 = false;
        }
      } else if (event.type == "keyup") {
        Game["key" + event.keyCode] = false;
      }
    }
  }
};
