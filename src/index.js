import Phaser from 'phaser';
import config from './config/config';
import Music from './models/music';
import Controller from './scenes/controller';

localStorage.clear();

class Game extends Phaser.Game {
  constructor() {
    super(config);
    const music = new Music();
    this.globals = { music, bgMusic: null };
    this.scene.add('Controller', new Controller());
    this.scene.start('Controller');
  }
}

const game = new Game(); /* eslint-disable-line */
