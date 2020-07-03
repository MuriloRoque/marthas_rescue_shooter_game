import Phaser from "phaser";
import logoImg from "../assets/images/logo.png";

export default class BootScene extends Phaser.Scene {
  constructor () {
    super('Boot');
  }

  preload () {
    this.load.image('logo', logoImg);
  }

  create () {
    this.add.image(400, 200, 'logo');
  }
};