import Phaser from "phaser";
import config from './config/config';
import BootScene from './scenes/boot_scene';
import PreloaderScene from './scenes/preloader_scene';
import TitleScene from './scenes/title_scene';
import CreditsScene from './scenes/credits_scene';
import OptionsScene from './scenes/options_scene';
import GameOverScene from './scenes/game_over_scene';
import GameScene1 from './stages/chapter1_scene';
import GameScene2 from './stages/chapter2_scene';
import Chapter1DialogueScene from './dialogues/chapter_dialogues/chapter1_dialogue';
import Chapter1BossDialogueScene from './dialogues/boss_dialogues/chapter1_boss_dialogue';
import Chapter1EndDialogueScene from './dialogues/chapter_dialogues/chapter1_end_dialogue';
import Chapter1BonusScene from './bonuses/chapter1_bonus';
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
    this.scene.add('GameOver', GameOverScene);
    this.scene.add('Game1', GameScene1);
    this.scene.add('Game2', GameScene2);
    this.scene.add('Chapter1Dialogue', Chapter1DialogueScene);
    this.scene.add('Chapter1BossDialogue', Chapter1BossDialogueScene);
    this.scene.add('Chapter1EndDialogue', Chapter1EndDialogueScene);
    this.scene.add('Chapter1Bonus', Chapter1BonusScene);
    this.scene.start('Boot');
  }
}

const game = new Game();
