import Phaser from 'phaser';

export default class Button extends Phaser.GameObjects.Container {
  constructor(scene, x, y, key1, key2, targetScene) {
    super(scene);
    this.scene = scene;
    this.x = x;
    this.y = y;

    this.button = this.scene.add.image(0, 0, key1).setInteractive();

    this.add(this.button);

    this.button.on('pointerdown', () => {
      this.scene.scene.start(targetScene);
    });

    this.button.on('pointerover', () => {
      this.button.setTexture(key2);
    });

    this.button.on('pointerout', () => {
      this.button.setTexture(key1);
    });

    this.scene.add.existing(this);
  }
}