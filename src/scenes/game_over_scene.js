import Phaser from "phaser";
import Button from '../objects/button';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super("GameOver");
  }
  create(current_scene) {

    this.menuButton = new Button(this, 400, 300, 'menu_button', 'menu_button_click', 'Title');
    this.restartButton = new Button(this, 400, 400, 'restart_button', 'restart_button_click', current_scene);

    this.title = this.add.text(this.game.config.width * 0.5, 128, "GAME OVER", {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#000000',
      align: 'center'
    });
    this.title.setOrigin(0.5);
  }
}