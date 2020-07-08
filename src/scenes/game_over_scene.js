import Phaser from 'phaser';
import Button from '../objects/buttons';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  create(currentScene) {
    if (currentScene === 'Game1') {
      this.menuButton = new Button(this, 400, 300, 'menu_button', 'menu_button_click', 'Title');
    } else {
      this.menuButton = new Button(this, 400, 300, 'menu_button', 'menu_button_click', 'PlayerInput');
    }
    this.restartButton = new Button(this, 400, 400, 'restart_button', 'restart_button_click', currentScene);

    this.title = this.add.text(this.game.config.width * 0.5, 128, 'GAME OVER', {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: 'red',
      align: 'center',
    });
    this.title.setOrigin(0.5);
  }
}