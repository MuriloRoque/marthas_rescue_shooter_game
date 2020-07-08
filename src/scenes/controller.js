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
import BonusDialogue from './bonus_dialogues';
import Dialogue from './dialogues';

export default class Controller extends Phaser.Scene {
  constructor() {
    super('Controller');
  }

  create() {
    const terrains = ['desert', 'oasis', 'swamp', 'forest', 'river', 'warzone'];
    const initialDialogues = [`'This is it, the beginning of my mission,\n
I will never give up, I need to save him!'`,
    '\'Let\'s keep on moving, hang in there, dad!',
    '\'It\'s only the beginning, let\'s move!\'',
    '\'Almost there, I must not fail!\'',
    `'This is the last command post,\n
this must contain the final piece of the puzzle!'`,
    '\'Dad, I\'m coming, hang in there!\''];
    const bossDialogues = [`Philip (Boss): 'How dare you invade my outpost?\n
Who are you?'\n
Martha: 'Where's him?'\n
Philip (Boss): 'Who are you talking about?\n
Get her!'`,
    `Karl (boss): 'Welcome, this will be the end,\n
prepare yourself!'\n
Martha: 'I'm ready to rumble!'`,
    `Robert (boss): 'Give up already,\n
you won't get past me!'\n
Martha: 'Don't flatter yourself, come on!'`,
    `Hermann (boss): 'This is the end of the road\n
for you!' Martha: 'It is the end of the road,\n
but not for me!'`,
    `Heinrich (boss): 'You have finally arrived,\n
let me give you a very warm welcome!'\n
Martha: 'This is for my father, be gone!'`,
    `Adolf (boss): 'I can't believe you defeated\n
my commanders!' Martha: 'Release my father\n
and give up right now if you want\n
to live.' Adolf (Boss): 'Unfortunately\n
for you, this fight won't be as easy\n
as the previous ones!'`];
    const endDialogues = ['\'I guess he didn\'t know where my father is,\nbut I found a note here!\'\nNote: \'Find the giant\'\nMartha: \'What does that mean?\'',
      '\'Tell me where he is now!\'\nKarl (Boss): \'You won\'t get away with this,\nthe seven must live!\'\nMartha: \'What do you mean?\'\nMartha: \'He\'s gone...\'',
      '\'This is the third one and\nI still got nothing.Huh, what\'s\nthat written on the wall?\'\nWall: \'Your destiny is in the sleepless mountain\'\nMartha: \'Hmmm\'',
      '\'What is that? A chest?\'\n** opens the chest **\nMartha: \'There\'s a toy castle inside,\nvery curious.\'',
      '\'I have destroyed the last outpost\nand found nothing.\' Martha: \'Wait a minute,\nthe clues must mean something.\'\nNigel: \'That\'s right, Martha, put\nthem together!\' Martha: \'The sleepless\nmountain, it must be the Owl Mountains!\'',
      '\'The toy castle, could it be\nKsiąż Castle?\'Nigel: \'Yes, and I\nheard the Germans are building\nseven massive underground bases\nin that location!\'Martha: \'Wait\na minute, the \'Giant\'! It must\nbe Project Riese, that\'s where my\nfather is! We must not waste time,\nlet\'s go!\'',
      '\'He\'s unconscious, I must find\nmy father and leave as fast as possible.\'\nFather: \'Martha, in here!\'\nMartha: \'I have finally found you,\ncome on, we don\'t have much time!\'\n** huge explosion **',
      '\'I am so happy I found you,\nyou must go back to England,\nyou will be safe there.\'\nFather: \'Martha, this war is far\nfrom over, I won\'t stop fighting\'\nMartha: \'How did you end up being\ncaptured?\' Father: \'It\'s a long story,\nbut a very good one,\nit all began when I...\''];
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