import Phaser from 'phaser';
import BootScene from './boot_scene';
import PreloaderScene from './preloader_scene';
import TitleScene from './title_scene';
import CreditsScene from './credits_scene';
import OptionsScene from './options_scene';
import GameOverScene from './game_over_scene';
import EndGameScene from './end_game_scene';
import PlayerInputScene from './player_input';
import LeaderboardScene from './leaderboard_scene';
import IntroScene from './intro_scene';
import GameScene from './chapter_scene';
import BonusDialogue from './bonus_dialogue';
import Dialogue from './dialogue';
import dialogues from './dialogue_array';

export default class Controller extends Phaser.Scene {
  constructor() {
    super('Controller');
  }

  create() {
    const [terrains, initialDialogues, bossDialogues, endDialogues] = dialogues();
    this.scene.add('Boot', new BootScene());
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('GameOver', GameOverScene);
    this.scene.add('EndGame', EndGameScene);
    this.scene.add('PlayerInput', PlayerInputScene);
    this.scene.add('Leaderboard', LeaderboardScene);
    this.scene.add('Intro', IntroScene);
    for (let i = 0; i <= 5; i += 1) {
      this.scene.add(`Game${i + 1}`, new GameScene(`Game${i + 1}`, `${terrains[i]}`, `Chapter${i + 1}BossDialogue`, `Boss${i + 1}`, `Chapter${i + 1}EndDialogue`));
      this.scene.add(`Chapter${i + 1}Dialogue`, new Dialogue(`Chapter${i + 1}Dialogue`, `${terrains[i]}`, `Chapter ${i + 1}`, `Martha has arrived at the ${i + 1}º command outpost`, `${initialDialogues[i]}`, `Game${i + 1}`));
      this.scene.add(`Chapter${i + 1}BossDialogue`, new Dialogue(`Chapter${i + 1}BossDialogue`, `${terrains[i]}`, `Chapter ${i + 1} - Boss`, 'The boss appeared!', `${bossDialogues[i]}`, `Game${i + 1}`, true));
      if (i <= 3) {
        this.scene.add(`Chapter${i + 1}EndDialogue`, new Dialogue(`Chapter${i + 1}EndDialogue`, `${terrains[i]}`, `Chapter ${i + 1} End`, 'Mission Complete!', `Martha: ${endDialogues[i]}`, `Chapter${i + 1}Bonus`));
      } else if (i === 4) {
        this.scene.add(`Chapter${i + 1}EndDialogue`, new Dialogue(`Chapter${i + 1}EndDialogue`, `${terrains[i]}`, `Chapter ${i + 1} End`, 'Mission Complete!', `Martha: ${endDialogues[i]}`, `Chapter${i + 1}EndDialogue2`));
        this.scene.add(`Chapter${i + 1}EndDialogue2`, new Dialogue(`Chapter${i + 1}EndDialogue2`, `${terrains[i]}`, `Chapter ${i + 1} End`, 'Mission Complete!', `Martha: ${endDialogues[i + 1]}`, `Chapter${i + 1}Bonus`));
      } else {
        this.scene.add(`Chapter${i + 1}EndDialogue`, new Dialogue(`Chapter${i + 1}EndDialogue`, `${terrains[i]}`, `Chapter ${i + 1} End`, 'Mission Complete!', `Martha: ${endDialogues[i + 1]}`, `Chapter${i + 1}EndDialogue2`));
        this.scene.add(`Chapter${i + 1}EndDialogue2`, new Dialogue(`Chapter${i + 1}EndDialogue2`, `${terrains[i]}`, `Chapter ${i + 1} End`, 'Mission Complete!', `Martha: ${endDialogues[i + 2]}`, 'EndGame'));
      }
      if (i <= 4) {
        this.scene.add(`Chapter${i + 1}Bonus`, new BonusDialogue(`Chapter${i + 1}Bonus`, `${terrains[i]}`, 'Nigel: \'Martha, congratulations on\ndestroying this outpost, the agency\n sent you a gift, please choose one:', `Chapter${i + 2}Dialogue`));
      }
    }
    this.scene.start('Boot');
  }
}