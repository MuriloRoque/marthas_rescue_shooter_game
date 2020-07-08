import Phaser from 'phaser';
import config from './config/config';
import Music from './models/music';

localStorage.clear();

class Game extends Phaser.Game {
  constructor() {
    super(config);
    const music = new Music();
    this.globals = { music, bgMusic: null };
  }

}

const game = new Game(); /* eslint-disable-line */
