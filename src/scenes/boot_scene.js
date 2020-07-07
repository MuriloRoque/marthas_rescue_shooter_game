import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('murilo', 'src/assets/images/murilo.png');
  }

  create() {
    this.scene.start('Preloader');
  }
}