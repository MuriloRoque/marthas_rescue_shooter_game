import Phaser from "phaser";
import config from './config/config';
import BootScene from './scenes/boot_scene';
import PreloaderScene from './scenes/preloader_scene';
import TitleScene from './scenes/title_scene';
import CreditsScene from './scenes/credits_scene';
import OptionsScene from './scenes/options_scene';
import GameScene from './scenes/game_scene';
import GameOverScene from './scenes/game_over_scene';
import Chapter1DialogueScene from './dialogues/chapter1_dialogue'
import Music from './models/music';

class Game extends Phaser.Game {
  constructor () {
    super(config);
    const music = new Music();
    this.globals = { music, bgMusic: null };
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Game', GameScene);
    this.scene.add('GameOver', GameOverScene);
    this.scene.add('Chapter1Dialogue', Chapter1DialogueScene);
    this.scene.start('Boot');
  }
}

const game = new Game();
