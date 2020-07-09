import Phaser from 'phaser';
import config from '../config/config';

export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('Credits');
  }

  create() {
    this.cameras.main.setBackgroundColor('#000111');
    this.creditsText = this.add.text(0, 0, 'Credits', { fontSize: '32px', fill: '#fff' });
    this.image1 = this.add.image(400, 200, 'murilo');
    this.madeByText1 = this.add.text(0, 0, 'Created By: Murilo Roque', { fontSize: '26px', fill: '#fff' });
    this.madeByText2 = this.add.text(0, 0, "Big thanks to Ikraam Ghoor,\n\nwho helped me building this story's\n\nintroduction.", { fontSize: '26px', fill: '#fff' });
    this.madeByText3 = this.add.text(0, 0, 'This project was built during\n\nmy course at Microverse!', { fontSize: '26px', fill: '#fff' });
    this.image2 = this.add.image(400, 200, 'microverse');
    this.madeByText4 = this.add.text(0, 0, 'Thanks to OpenGameArt.org for\n\nproviding the free assets\n\nI used in this game.', { fontSize: '26px', fill: '#fff' });
    this.image3 = this.add.image(400, 200, 'openart');
    this.zone = this.add.zone(config.width / 2, config.height / 2, config.width, config.height);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.skipText = this.add.text(10, 10, 'Press SPACE\nto skip', { fontSize: '10px', fill: '#fff' });

    Phaser.Display.Align.In.Center(
      this.creditsText,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.image1,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.madeByText1,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.madeByText2,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.madeByText3,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.image2,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.madeByText4,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.image3,
      this.zone,
    );

    this.image1.setY(800);
    this.madeByText1.setY(850);
    this.madeByText2.setY(1100);
    this.madeByText3.setY(1300);
    this.image2.setY(1500);
    this.madeByText4.setY(1800);
    this.image3.setY(1850);

    this.creditsTween = this.tweens.add({
      targets: this.creditsText,
      y: -200,
      duration: 3000,
      delay: 1000,
    });

    this.imageTween1 = this.tweens.add({
      targets: this.image1,
      y: -200,
      duration: 13000,
      delay: 1000,
    });

    this.madeByTween1 = this.tweens.add({
      targets: this.madeByText1,
      y: -200,
      duration: 14000,
      delay: 1000,
    });

    this.madeByTween2 = this.tweens.add({
      targets: this.madeByText2,
      y: -200,
      duration: 20000,
      delay: 1000,
    });

    this.madeByTween3 = this.tweens.add({
      targets: this.madeByText3,
      y: -200,
      duration: 25000,
      delay: 1000,
    });

    this.imageTween2 = this.tweens.add({
      targets: this.image2,
      y: -200,
      duration: 28800,
      delay: 1000,
    });

    this.madeByTween4 = this.tweens.add({
      targets: this.madeByText4,
      y: -200,
      duration: 35000,
      delay: 1000,
    });

    this.imageTween3 = this.tweens.add({
      targets: this.image3,
      y: -200,
      duration: 38800,
      delay: 1000,
      onComplete: (() => {
        this.scene.start('Title');
      }),
    });
  }

  update() {
    if (this.keySpace.isDown) {
      this.scene.start('Title');
    }
  }
}