import Phaser from 'phaser';
import Player from '../models/player';
import Fighter from '../models/enemy/fighter';
import Bomber from '../models/enemy/bomber';
import Boss2 from '../models/bosses/chapter2_boss';

let life1;
let life2;
let life3;

export default class GameScene2 extends Phaser.Scene {
  constructor() {
    super('Game2');
  }

  preload() {
    this.load.image('bomb', 'src/assets/images/bomb.png');
    this.load.image('bomber', 'src/assets/images/bomber.png');
    this.load.audio('oasisMusic', ['src/assets/audio/oasis.ogg']);
  }

  create() {
    const myself = this;
    this.add.image(400, 300, 'oasis').setDisplaySize(800, 600);

    const bonuses = JSON.parse(localStorage.getItem('bonuses'));
    let score = JSON.parse(localStorage.getItem('score'));

    const scoreText = this.add.text(16, 16, `Score: ${score}`, { fontSize: '32px', fill: '#000' });

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
      this.bgMusic = this.sound.add('oasisMusic', { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.music.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
      this.sys.game.globals.bgMusic.play();
    }

    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'playerPlane',
      3, score, bonuses.bonus1, bonuses.bonus2, bonuses.bonus3,
    );
    this.player.setScale(0.3);

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
        if (number >= 3 && number <= 6 && this.stopEnemy === false) {
          enemy = new Fighter(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0,
          );
          if (enemy !== null) {
            enemy.setScale(0.3);
            this.enemies.add(enemy);
          }
        } else if (number > 6 && this.stopEnemy === false) {
          enemy = new Bomber(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0,
          );
          if (enemy !== null) {
            enemy.setScale(0.3);
            this.enemies.add(enemy);
          }
        }
      },
      callbackScope: this,
      loop: true,
    });

    this.time.addEvent({
      delay: 10000,
      callback() {
        this.scene.pause();
        this.scene.launch('Chapter2BossDialogue');
        this.stopEnemy = true;
        let boss = null;

        boss = new Boss2(this, 400, 80, 20);

        if (boss !== null) {
          boss.setScale(0.8);
          this.enemies.add(boss);
        }
      },
      callbackScope: this,
    });

    this.physics.add.collider(this.playerMissiles, this.enemies, (playerMissile, enemy) => {
      if (enemy) {
        if (enemy.constructor.name === 'Boss2') {
          enemy.hp -= 1;
          playerMissile.destroy();
          if (enemy.hp === 0) {
            enemy.explode(true);
            playerMissile.destroy();
            score += 100;
            scoreText.setText(`Score: ${score}`);
            localStorage.setItem('score', JSON.stringify(score));
            localStorage.setItem('player', JSON.stringify(myself.player));
            myself.scene.start('Chapter2EndDialogue');
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
        player.hp -= 1;
        enemy.explode(true);
        if (player.hp === 0) {
          player.explode(false);
          player.onDestroy('Game2');
          enemy.explode(true);
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
          player.onDestroy('Game2');
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