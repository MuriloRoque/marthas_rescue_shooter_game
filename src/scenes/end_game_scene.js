import Phaser from "phaser";
import config from '../config/config';

export default class EndGameScene extends Phaser.Scene {
  constructor () {
    super('EndGame');
  }

  preload () {
  }

  create () {
    this.cameras.main.setBackgroundColor('#000111');
    this.endGameText = this.add.text(0, 0, 'Congratulations!\nYou completed the game!', { fontSize: '32px', fill: '#fff' });
    this.madeByText = this.add.text(0, 0, "* Story continues in the next game *", { fontSize: '26px', fill: '#fff' });
    this.zone = this.add.zone(config.width/2, config.height/2, config.width, config.height);

    Phaser.Display.Align.In.Center(
      this.endGameText,
      this.zone
    );

    this.madeByText.setY(850);

    this.endGameTween = this.tweens.add({
      targets: this.endGameText,
      y: -200,
      duration: 3000,
      delay: 1000,
      onComplete: function () {
        this.destroy;
      }
    });

    this.imageTween1 = this.tweens.add({
      targets: this.image1,
      y: -200,
      duration: 13000,
      delay: 1000,
      onComplete: function () {
        this.destroy;
      }
    });

    this.madeByTween = this.tweens.add({
      targets: this.madeByText,
      y: -200,
      duration: 14000,
      delay: 1000,
      onComplete: function () {
        this.madeByTween.destroy;
        this.scene.start('Title');
      }.bind(this)
    });
  }
};