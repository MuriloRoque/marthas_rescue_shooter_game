import Phaser from 'phaser';
import config from './config/config';
import BootScene from './scenes/boot_scene';
import PreloaderScene from './scenes/preloader_scene';
import TitleScene from './scenes/title_scene';
import CreditsScene from './scenes/credits_scene';
import OptionsScene from './scenes/options_scene';
import GameOverScene from './scenes/game_over_scene';
import EndGameScene from './scenes/end_game_scene';
import PlayerInputScene from './scenes/player_input';
import LeaderboardScene from './scenes/leaderboard_scene';
import IntroScene from './scenes/intro_scene';
import GameScene from './scenes/chapter_scene';
import BonusDialogue from './scenes/bonus_dialogues';
import Dialogue from './scenes/dialogues';
import Music from './models/music';

localStorage.clear();

class Game extends Phaser.Game {
  constructor() {
    super(config);
    const music = new Music();
    this.globals = { music, bgMusic: null };
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('GameOver', GameOverScene);
    this.scene.add('EndGame', EndGameScene);
    this.scene.add('PlayerInput', PlayerInputScene);
    this.scene.add('Leaderboard', LeaderboardScene);
    this.scene.add('Intro', IntroScene);
    this.scene.add('Game1', new GameScene('Game1', 'desert', 'Chapter1BossDialogue', 'Boss1', 'Chapter1EndDialogue'));
    this.scene.add('Game2', new GameScene('Game2', 'oasis', 'Chapter2BossDialogue', 'Boss2', 'Chapter2EndDialogue'));
    this.scene.add('Game3', new GameScene('Game3', 'swamp', 'Chapter3BossDialogue', 'Boss3', 'Chapter3EndDialogue'));
    this.scene.add('Game4', new GameScene('Game4', 'forest', 'Chapter4BossDialogue', 'Boss4', 'Chapter4EndDialogue'));
    this.scene.add('Game5', new GameScene('Game5', 'river', 'Chapter5BossDialogue', 'Boss5', 'Chapter5EndDialogue'));
    this.scene.add('Game6', new GameScene('Game6', 'warzone', 'Chapter6BossDialogue', 'Boss6', 'Chapter6EndDialogue'));
    this.scene.add('Chapter1Dialogue', new Dialogue('Chapter1Dialogue', 'desert', 'Chapter 1', 'Martha has arrived at the 1st command outpost.', 'Martha: "This is it, the beginning of my mission,\n\nI will never give up, I need to save him!"', 'Game1'));
    this.scene.add('Chapter2Dialogue', new Dialogue('Chapter2Dialogue', 'oasis', 'Chapter 2', 'Martha has arrived at the 2nd command outpost.', "Martha: 'Let's keep on moving, hang in there, dad!", 'Game2'));
    this.scene.add('Chapter3Dialogue', new Dialogue('Chapter3Dialogue', 'swamp', 'Chapter 3', 'Martha has arrived at the 3rd command outpost.', "Martha: 'It's only the beginning, let's move!'", 'Game3'));
    this.scene.add('Chapter4Dialogue', new Dialogue('Chapter4Dialogue', 'forest', 'Chapter 4', 'Martha has arrived at the 4th command outpost.', "Martha: 'Almost there, I must not fail!'", 'Game4'));
    this.scene.add('Chapter5Dialogue', new Dialogue('Chapter5Dialogue', 'river', 'Chapter 5', 'Martha has arrived at the 5th command outpost.', "Martha: 'This is the last command post,\nthis must contain the final piece of the puzzle!'", 'Game5'));
    this.scene.add('Chapter6Dialogue', new Dialogue('Chapter6Dialogue', 'warzone', 'Chapter 6', 'Martha has arrived at the 6th command outpost.', "Martha: 'Dad, I'm coming, hang in there!'", 'Game6'));
    this.scene.add('Chapter1BossDialogue', new Dialogue('Chapter1BossDialogue', 'desert', 'Chapter 1 - Boss', 'The boss appeared!', "Philip (Boss): 'How dare you invade my outpost?\nWho are you?'\nMartha: 'Where's him?'\nPhilip (Boss): 'Who are you talking about?\nGet her!'", 'Game1', true));
    this.scene.add('Chapter2BossDialogue', new Dialogue('Chapter2BossDialogue', 'oasis', 'Chapter 2 - Boss', 'The boss appeared!', "Karl (Boss): 'Welcome, this will be the end,\nprepare yourself!'\nMartha: 'I'm ready to rumble!'", 'Game2', true));
    this.scene.add('Chapter3BossDialogue', new Dialogue('Chapter3BossDialogue', 'swamp', 'Chapter 3 - Boss', 'The boss appeared!', "Robert (Boss): 'Give up already,\nyou won't get past me!'\nMartha: 'Don't flatter yourself, come on!'", 'Game3', true));
    this.scene.add('Chapter4BossDialogue', new Dialogue('Chapter4BossDialogue', 'forest', 'Chapter 4 - Boss', 'The boss appeared!', "Hermann (Boss): 'This is the end of the road for you!'\nMartha: 'It is the end of the road, but not for me!'", 'Game4', true));
    this.scene.add('Chapter5BossDialogue', new Dialogue('Chapter5BossDialogue', 'river', 'Chapter 5 - Boss', 'The boss appeared!', "Heinrich (Boss): 'You have finally arrived,\nlet me give you a very warm welcome!'\nMartha: 'This is for my father, be gone!'", 'Game5', true));
    this.scene.add('Chapter6BossDialogue', new Dialogue('Chapter6BossDialogue', 'warzone', 'Chapter 6 - Boss', 'The boss appeared!', "Adolf (Boss): 'I can't believe you defeated\nmy commanders!' Martha: 'Release my father\nand give up right now if you want\nto live.' Adolf (Boss): 'Unfortunately\nfor you, this fight won't be as easy\nas the previous ones!'", 'Game6', true));
    this.scene.add('Chapter1EndDialogue', new Dialogue('Chapter1EndDialogue', 'desert', 'Chapter 1 End', 'Mission Complete!', "Martha: 'I guess he didn't know where my father is,\nbut I found a note here!'\nNote: 'Find the giant'\nMartha: 'What does that mean?'", 'Chapter1Bonus'));
    this.scene.add('Chapter2EndDialogue', new Dialogue('Chapter2EndDialogue', 'oasis', 'Chapter 2 End', 'Mission Complete!', "Martha: 'Tell me where he is now!'\nKarl (Boss): 'You won't get away with this,\nthe seven must live!'\nMartha: 'What do you mean?'\nMartha: 'He's gone...'", 'Chapter2Bonus'));
    this.scene.add('Chapter3EndDialogue', new Dialogue('Chapter3EndDialogue', 'swamp', 'Chapter 3 End', 'Mission Complete!', "Martha: 'This is the third one and\nI still got nothing.Huh, what's\nthat written on the wall?'\nWall: 'Your destiny is in the sleepless mountain'\nMartha: 'Hmmm'", 'Chapter3Bonus'));
    this.scene.add('Chapter4EndDialogue', new Dialogue('Chapter4EndDialogue', 'forest', 'Chapter 4 End', 'Mission Complete!', "Martha: 'What is that? A chest?'\n** opens the chest **\nMartha: 'There's a toy castle inside,\nvery curious.'", 'Chapter4Bonus'));
    this.scene.add('Chapter5EndDialogue1', new Dialogue('Chapter5EndDialogue1', 'river', 'Chapter 5 End', 'Mission Complete!', "Martha: 'I have destroyed the last outpost\nand found nothing.' Martha: 'Wait a minute,\nthe clues must mean something.'\nNigel: 'That's right, Martha, put\nthem together!' Martha: 'The sleepless\nmountain, it must be the Owl Mountains!'", 'Chapter5EndDialogue2'));
    this.scene.add('Chapter5EndDialogue2', new Dialogue('Chapter5EndDialogue2', 'river', 'Chapter 5 End', 'Mission Complete!', "Martha: 'The toy castle, could it be\nKsiąż Castle?'Nigel: 'Yes, and I\nheard the Germans are building\nseven massive underground bases\nin that location!'Martha: 'Wait\na minute, the 'Giant'! It must\nbe Project Riese, that's where my\nfather is! We must not waste time,\nlet's go!'", 'Chapter5Bonus'));
    this.scene.add('Chapter6EndDialogue1', new Dialogue('Chapter6EndDialogue1', 'warzone', 'Chapter 6 End', 'Mission Complete!', "Martha: 'He's unconscious, I must find\nmy father and leave as fast as possible.'\nFather: 'Martha, in here!'\nMartha: 'I have finally found you,\ncome on, we don't have much time!'\n** huge explosion **", 'Chapter6EndDialogue2'));
    this.scene.add('Chapter6EndDialogue2', new Dialogue('Chapter6EndDialogue2', 'warzone', 'Chapter 6 End', "Martha: 'I am so happy I found you,\nyou must go back to England,\nyou will be safe there.'\nFather: 'Martha, this war is far\nfrom over, I won't stop fighting'\nMartha: 'How did you end up being\ncaptured?' Father: 'It's a long story,\nbut a very good one,\nit all began when I...'", 'EndGame'));
    this.scene.add('Chapter1Bonus', new BonusDialogue('Chapter1Bonus', 'desert', "Nigel: 'Martha, congratulations on\ndestroying this outpost, the agency\n sent you a gift, please choose one:", 'Chapter2Dialogue'));
    this.scene.add('Chapter2Bonus', new BonusDialogue('Chapter2Bonus', 'oasis', "Nigel: 'Martha, congratulations on\ndestroying this outpost, the agency\n sent you a gift, please choose one:", 'Chapter3Dialogue'));
    this.scene.add('Chapter3Bonus', new BonusDialogue('Chapter3Bonus', 'swamp', "Nigel: 'Martha, congratulations on\ndestroying this outpost, the agency\n sent you a gift, please choose one:", 'Chapter4Dialogue'));
    this.scene.add('Chapter4Bonus', new BonusDialogue('Chapter4Bonus', 'forest', "Nigel: 'Martha, congratulations on\ndestroying this outpost, the agency\n sent you a gift, please choose one:", 'Chapter5Dialogue'));
    this.scene.add('Chapter5Bonus', new BonusDialogue('Chapter5Bonus', 'river', "Nigel: 'Martha, congratulations on\ndestroying this outpost, the agency\n sent you a gift, please choose one:", 'Chapter6Dialogue'));
    this.scene.start('Boot');
  }
}

const game = new Game(); /* eslint-disable-line */
