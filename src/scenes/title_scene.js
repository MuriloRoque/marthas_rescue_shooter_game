import Phaser from 'phaser';
import config from '../config/config';
import Button from '../objects/buttons';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    this.add.image(400, 300, 'background');
    this.add.image(400, 80, 'logo');
    this.gameButton = new Button(this, config.width / 2, config.height / 2 - 100, 'start_button', 'start_button_click', 'Intro');
    this.optionsButton = new Button(this, config.width / 2, config.height / 2, 'options_button', 'options_button_click', 'Options');
    this.creditsButton = new Button(this, config.width / 2, config.height / 2 + 100, 'credits_button', 'credits_button_click', 'Credits');
    this.leaderboardButton = new Button(this, config.width / 2, config.height / 2 + 200, 'leaderboard_button', 'leaderboard_button_click', 'Leaderboard');

    this.music = this.sys.game.globals.music;
    if (this.music.musicOn === true && this.music.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('main_menu_music', { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.music.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }
}