import Phaser from 'phaser';
import config from '../config/config';

export default class IntoScene extends Phaser.Scene {
  constructor() {
    super('Intro');
  }

  create() {
    this.cameras.main.setBackgroundColor('#000111');
    this.introText = this.add.text(0, 0, 'Introduction', { fontSize: '32px', fill: '#fff' });
    this.madeByText = this.add.text(0, 0, "The year is 1943, we are in the\nmiddle of World War II. Our story's\nheroine is Martha, a 25 years\nold British pilot. She works for a\nsecret agency, where she learned\neverything about battle planes to take\nundercover missions against german air\nforces. Two days ago, her father,\na British general, was kidnapped by the\nGermans and is being held captive\nin their western stronghold.\nEnraged at this news, Martha is\non a mission to rescue her father\nby breaching each of the 5 main\nwest command posts, where she will\nfind clues on how to breach through\nthe command post in which her father\nis located. Now everything depends\non you, the player, to guide her\nin this journey, but don't worry,\nthe agency will help you with any\nmeans necessary each time you take\ndown a post commander.\n\nGood luck!", { fontSize: '26px', fill: '#fff' });
    this.zone = this.add.zone(config.width / 2, config.height / 2, config.width, config.height);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.skipText = this.add.text(10, 10, 'Press SPACE\nto skip', { fontSize: '10px', fill: '#fff' });

    Phaser.Display.Align.In.Center(
      this.introText,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.madeByText,
      this.zone,
    );

    this.madeByText.setY(650);

    this.introTween = this.tweens.add({
      targets: this.introText,
      y: -200,
      duration: 3000,
      delay: 1000,
    });

    this.madeByTween = this.tweens.add({
      targets: this.madeByText,
      y: -500,
      duration: 55000,
      delay: 0,
      onComplete: (() => {
        this.scene.start('Chapter1Dialogue');
      }),
    });
  }

  update() {
    if (this.keySpace.isDown) {
      this.scene.start('Chapter1Dialogue');
    }
  }
}
