import Phaser from "phaser";

export default {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  autoCenter: Phaser.Scale.CENTER_BOTH,
  backgroundColor: "#FFFF00",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 }
    }
  },
  pixelArt: true,
  roundPixels: true
};