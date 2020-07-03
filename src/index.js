import Phaser from "phaser";
import logoImg from "./assets/images/logo.png";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#FFFF00",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 }
    }
  },
  scene: {
    preload: preload,
    create: create
  },
  pixelArt: true,
  roundPixels: true
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image("logo", logoImg);
}

function create() {
  const logo = this.add.image(400, 150, "logo");
}