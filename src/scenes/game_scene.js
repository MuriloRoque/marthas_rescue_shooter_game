import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
  }

  preload () {
    this.load.spritesheet("explosion", "src/assets/images/explosion.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.image("boss", "src/assets/images/boss.png");
    this.load.image("desert", "src/assets/images/desert.png");
    this.load.image("fighter", "src/assets/images/fighter.png");
    this.load.image("missile", "src/assets/images/missile.png");
    this.load.image("playerPlane", "src/assets/images/player_plane.png");
    this.load.audio('desertMusic', ['src/assets/audio/desert.wav']);
  }

  create () {
    this.add.image(400, 300, 'desert').setDisplaySize(800, 600);
    this.anims.create({
      key: "explosion",
      frames: this.anims.generateFrameNumbers("explosion"),
      frameRate: 20,
      repeat: 0
    });

    this.music = this.sys.game.globals.music;
    if (this.music.musicOn === true) {
      this.sys.game.globals.bgMusic.stop();
      this.bgMusic = this.sound.add('desertMusic', { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.music.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
      this.sys.game.globals.bgMusic.play();
    }
  }
};