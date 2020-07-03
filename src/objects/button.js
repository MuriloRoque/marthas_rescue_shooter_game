import Phaser from "phaser";

export default class Button extends Phaser.GameObjects.Container {
  constructor(scene, x, y, key1, targetScene) {
    super(scene);
    this.scene = scene;
    this.x = x;
    this.y = y;

    this.button = this.scene.add.sprite(0, 0, key1).setInteractive();
    Phaser.Display.Align.In.Center(this.button);

    this.add(this.button);

    this.button.on('pointerdown', function () {
      this.scene.scene.start(targetScene);
    }.bind(this));

    this.button.on('pointerout', function () {
      this.button.setTexture(key1);
    }.bind(this));

    this.scene.add.existing(this);
  }
}