import Phaser from 'phaser';
import Button from '../models/button';
import { getScores } from '../leaderboard';

export default class LeaderboardScene extends Phaser.Scene {
  constructor() {
    super('Leaderboard');
  }

  preload() {
    this.load.bitmapFont('arcade', 'src/assets/images/arcade.png', 'src/assets/text/arcade.xml');
  }

  create() {
    this.cameras.main.setBackgroundColor('#000111');
    const loading = this.add.bitmapText(250, 250, 'arcade', 'Loading...').setTint(0xff00ff);
    this.menuButton = new Button(this, 400, 550, 'menu_button', 'menu_button_click', 'Title');
    getScores().then((scores) => {
      loading.destroy();
      scores.sort((a, b) => b.score - a.score);
      this.add.bitmapText(100, 20, 'arcade', 'RANK  SCORE   NAME').setTint(0xff00ff);
      for (let i = 0; i <= 4; i += 1) {
        this.add.bitmapText(100, 90 * (i + 1), 'arcade', ` ${i + 1}     ${scores[i].score}   ${scores[i].user}`).setTint(0xff0000);
      }
    });
  }
}