import Phaser from "phaser";
import config from './config/config';
import BootScene from './scenes/boot_scene';

class Game extends Phaser.Game {
  constructor () {
    super(config);
    this.scene.add('Boot', BootScene);
    this.scene.start('Boot');
  }
}

const game = new Game();
