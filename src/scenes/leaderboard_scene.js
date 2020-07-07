import Phaser from 'phaser';
import Button from '../models/button';
import { getScores } from '../leaderboard';

export default class LeaderboardScene extends Phaser.Scene {
  constructor() {
    super('Leaderboard');
    this.playerText;
  }

  preload () {
    this.load.bitmapFont('arcade', 'src/assets/images/arcade.png', 'src/assets/text/arcade.xml');
  }

  create () {
    this.cameras.main.setBackgroundColor('#000111');
    this.menuButton = new Button(this, 400, 550, 'menu_button', 'menu_button_click', 'Title');
    this.add.bitmapText(100, 260, 'arcade', 'RANK  SCORE   NAME').setTint(0xff00ff);
    this.add.bitmapText(100, 310, 'arcade', '1ST   50000').setTint(0xff0000);
    this.playerText = this.add.bitmapText(580, 310, 'arcade', '').setTint(0xff0000);
  }
}