import Phaser from 'phaser';
import Player from '../objects/player';
import Fighter from '../objects/enemies/fighter';
import Bomber from '../objects/enemies/bomber';
import Chaser from '../objects/enemies/chaser';
import AttackHel from '../objects/enemies/attack_hel';
import AttackAir from '../objects/enemies/attack_air';
import Multirole from '../objects/enemies/multirole';
import Boss1 from '../objects/bosses/chapter1_boss';
import Boss2 from '../objects/bosses/chapter2_boss';
import Boss3 from '../objects/bosses/chapter3_boss';
import Boss4 from '../objects/bosses/chapter4_boss';
import Boss5 from '../objects/bosses/chapter5_boss';
import Boss6 from '../objects/bosses/chapter6_boss';

let life1;
let life2;
let life3;
let score;
let bonuses;

export default class GameScene extends Phaser.Scene {
  constructor(scene, key, bossDialogue, boss, endDialogue) {
    super(scene);
    this.key = key;
    this.bossDialogue = bossDialogue;
    this.boss = boss;
    this.endDialogue = endDialogue;
    this.currentScene = scene;
  }

  create() {
    const myself = this;
    this.add.image(400, 300, this.key).setDisplaySize(800, 600);
    if (localStorage.getItem('bonuses') !== null) {
      bonuses = JSON.parse(localStorage.getItem('bonuses'));
    } else {
      bonuses = { bonus1: 0, bonus2: 0, bonus3: 0 };
    }
    if (localStorage.getItem('score') !== null) {
      score = JSON.parse(localStorage.getItem('score'));
    } else {
      score = 0;
    }
    life1 = this.add.image(750, 50, 'playerPlane').setDisplaySize(50, 50);
    life2 = this.add.image(700, 50, 'playerPlane').setDisplaySize(50, 50);
    life3 = this.add.image(650, 50, 'playerPlane').setDisplaySize(50, 50);
    this.anims.create({
      key: 'explosion',
      frames: this.anims.generateFrameNumbers('explosion'),
      frameRate: 20,
      repeat: 0,
    });
    this.music = this.sys.game.globals.music;
    if (this.music.musicOn === true) {
      this.sys.game.globals.bgMusic.stop();
      this.bgMusic = this.sound.add(`${this.key}Music`, { volume: 0.7, loop: true });
      this.bgMusic.play();
      this.music.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
      this.sys.game.globals.bgMusic.play();
    }
    this.sfx = {
      explosion: this.sound.add('explosionSound', { volume: 0.1 }),
      missile: this.sound.add('shootSound', { volume: 0.1 }),
    };
    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'playerPlane',
      score, bonuses.bonus1, bonuses.bonus2, bonuses.bonus3,
    );
    this.player.setScale(0.3);
    const scoreText = this.add.text(16, 16, `Score: ${this.player.score}`, { fontSize: '32px', fill: '#000' });
    this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.enemies = this.add.group();
    this.enemyMissiles = this.add.group();
    this.playerMissiles = this.add.group();
    this.stopEnemy = false;
    this.time.addEvent({
      delay: 1000,
      callback() {
        let enemy = null;
        const number = Phaser.Math.Between(0, 10);
        const position = Phaser.Math.Between(0, this.game.config.width);
        switch (this.key) {
          case 'oasis':
            if (number >= 0 && number <= 5 && this.stopEnemy === false) {
              enemy = new Fighter(
                this,
                position,
                0,
              );
            } else if (number > 5 && this.stopEnemy === false) {
              enemy = new Bomber(
                this,
                position,
                0,
              );
            }
            break;
          case 'swamp':
            if (number >= 0 && number <= 3 && this.stopEnemy === false) {
              enemy = new Fighter(
                this,
                position,
                0,
              );
            } else if (number > 3 && number <= 6 && this.stopEnemy === false) {
              enemy = new Bomber(
                this,
                position,
                0,
              );
            } else if (number > 6 && this.stopEnemy === false) {
              enemy = new Chaser(
                this,
                position,
                0,
              );
            }
            break;
          case 'forest':
            if (number >= 0 && number <= 2 && this.stopEnemy === false) {
              enemy = new Fighter(
                this,
                position,
                0,
              );
            } else if (number > 2 && number <= 4 && this.stopEnemy === false) {
              enemy = new Bomber(
                this,
                position,
                0,
              );
            } else if (number > 4 && number <= 7 && this.stopEnemy === false) {
              enemy = new Chaser(
                this,
                position,
                0,
              );
            } else if (number > 7 && this.stopEnemy === false) {
              enemy = new AttackHel(
                this,
                position,
                0,
              );
            }
            break;
          case 'river':
            if (number >= 0 && number <= 2 && this.stopEnemy === false) {
              enemy = new Fighter(
                this,
                position,
                0,
              );
            } else if (number > 2 && number <= 4 && this.stopEnemy === false) {
              enemy = new Bomber(
                this,
                position,
                0,
              );
            } else if (number > 4 && number <= 6 && this.stopEnemy === false) {
              enemy = new Chaser(
                this,
                position,
                0,
              );
            } else if (number > 6 && number <= 8 && this.stopEnemy === false) {
              enemy = new AttackHel(
                this,
                position,
                0,
              );
            } else if (number > 8 && number <= 10 && this.stopEnemy === false) {
              enemy = new AttackAir(
                this,
                position,
                0,
              );
            }
            break;
          case 'warzone':
            if (number >= 0 && number <= 1 && this.stopEnemy === false) {
              enemy = new Fighter(
                this,
                position,
                0,
              );
            } else if (number > 1 && number <= 2 && this.stopEnemy === false) {
              enemy = new Bomber(
                this,
                position,
                0,
              );
            } else if (number > 2 && number <= 4 && this.stopEnemy === false) {
              enemy = new Chaser(
                this,
                position,
                0,
              );
            } else if (number > 4 && number <= 6 && this.stopEnemy === false) {
              enemy = new AttackHel(
                this,
                position,
                0,
              );
            } else if (number > 6 && number <= 8 && this.stopEnemy === false) {
              enemy = new AttackAir(
                this,
                position,
                0,
              );
            } else if (number > 8 && number <= 10 && this.stopEnemy === false) {
              enemy = new Multirole(
                this,
                position,
                0,
              );
            }
            break;
          default:
            if (this.stopEnemy === false) {
              enemy = new Fighter(
                this,
                position,
                0,
              );
            }
        }
        if (enemy !== null) {
          enemy.setScale(0.3);
          this.enemies.add(enemy);
        }
      },
      callbackScope: this,
      loop: true,
    });
    this.time.addEvent({
      delay: 30000,
      callback() {
        this.scene.pause();
        this.scene.launch(this.bossDialogue);
        this.stopEnemy = true;
        let boss = null;
        switch (this.key) {
          case 'oasis':
            boss = new Boss2(this);
            break;
          case 'swamp':
            boss = new Boss3(this);
            break;
          case 'forest':
            boss = new Boss4(this);
            break;
          case 'river':
            boss = new Boss5(this);
            break;
          case 'warzone':
            boss = new Boss6(this);
            break;
          default:
            boss = new Boss1(this);
        }
        if (boss !== null) {
          boss.setScale(0.8);
          this.enemies.add(boss);
        }
      },
      callbackScope: this,
    });
    this.physics.add.collider(this.playerMissiles, this.enemies, (playerMissile, enemy) => {
      if (enemy) {
        if (enemy.hp !== undefined) {
          enemy.hp -= 1;
          playerMissile.destroy();
          if (enemy.hp === 0) {
            enemy.explode(true);
            playerMissile.destroy();
            score += 100;
            scoreText.setText(`Score: ${score}`);
            localStorage.setItem('score', JSON.stringify(score));
            localStorage.setItem('player', JSON.stringify(myself.player));
            myself.scene.start(this.endDialogue);
          }
        } else {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }
          enemy.explode(true);
          playerMissile.destroy();
          score += 10;
          scoreText.setText(`Score: ${score}`);
        }
      }
    });
    this.physics.add.overlap(this.player, this.enemies, (player, enemy) => {
      if (!player.getData('isDead')
          && !enemy.getData('isDead')) {
        if (enemy.constructor.name === this.boss) {
          player.explode(false);
          player.gameOver(this.currentScene);
          enemy.explode(true);
        } else {
          player.hp -= 1;
          enemy.explode(true);
          if (player.hp === 0) {
            player.explode(false);
            player.gameOver(this.currentScene);
            enemy.explode(true);
          }
        }
      }
    });
    this.physics.add.overlap(this.player, this.enemyMissiles, (player, missile) => {
      if (!player.getData('isDead')
          && !missile.getData('isDead')) {
        player.hp -= 1;
        missile.destroy();
        if (player.hp === 0) {
          player.explode(false);
          player.gameOver(this.currentScene);
          missile.destroy();
        }
      }
    });
  }

  update() {
    if (this.player.hp === 2) {
      life3.destroy();
    } else if (this.player.hp === 1) {
      life2.destroy();
    } else if (this.player.hp === 0) {
      life1.destroy();
    }

    if (!this.player.getData('isDead')) {
      this.player.update();
      if (this.keyUp.isDown) {
        this.player.moveUp();
      } else if (this.keyDown.isDown) {
        this.player.moveDown();
      }
      if (this.keyLeft.isDown) {
        this.player.moveLeft();
      } else if (this.keyRight.isDown) {
        this.player.moveRight();
      }

      if (this.keySpace.isDown) {
        this.player.setData('isShooting', true);
      } else {
        this.player.setData('timerShootTick', this.player.getData('timerShootDelay') - 1);
        this.player.setData('isShooting', false);
      }
    }

    for (let i = 0; i < this.enemies.getChildren().length; i += 1) {
      const enemy = this.enemies.getChildren()[i];

      enemy.update();

      if (enemy.x < -enemy.displayWidth
        || enemy.x > this.game.config.width + enemy.displayWidth
        || enemy.y < -enemy.displayHeight * 4
        || enemy.y > this.game.config.height + enemy.displayHeight) {
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }
          enemy.destroy();
        }
      }
    }

    for (let i = 0; i < this.enemyMissiles.getChildren().length; i += 1) {
      const missile = this.enemyMissiles.getChildren()[i];
      missile.update();
      if (missile.x < -missile.displayWidth
        || missile.x > this.game.config.width + missile.displayWidth
        || missile.y < -missile.displayHeight * 4
        || missile.y > this.game.config.height + missile.displayHeight) {
        if (missile) {
          missile.destroy();
        }
      }
    }

    for (let i = 0; i < this.playerMissiles.getChildren().length; i += 1) {
      const missile = this.playerMissiles.getChildren()[i];
      missile.update();
      if (missile.x < -missile.displayWidth
        || missile.x > this.game.config.width + missile.displayWidth
        || missile.y < -missile.displayHeight * 4
        || missile.y > this.game.config.height + missile.displayHeight) {
        if (missile) {
          missile.destroy();
        }
      }
    }
  }
}