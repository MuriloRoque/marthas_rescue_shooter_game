import Phaser from 'phaser';
import Entity from './entities';
import Shoot from './attacks/shoot';

export default class Player extends Entity {
  constructor(scene, x, y, key, score, bonus1, bonus2, bonus3) {
    super(scene, x, y, key, 'Player');
    this.hp = 3;
    this.score = score;
    this.bonus1 = bonus1;
    this.bonus2 = bonus2;
    this.bonus3 = bonus3;

    switch (this.bonus2) {
      case 1:
        this.setData('speed', 240);
        break;
      case 2:
        this.setData('speed', 280);
        break;
      case 3:
        this.setData('speed', 320);
        break;
      case 4:
        this.setData('speed', 360);
        break;
      case 5:
        this.setData('speed', 400);
        break;
      default:
        this.setData('speed', 200);
    }

    this.setData('isShooting', false);
    switch (this.bonus3) {
      case 1:
        this.setData('timerShootDelay', 26);
        break;
      case 2:
        this.setData('timerShootDelay', 22);
        break;
      case 3:
        this.setData('timerShootDelay', 18);
        break;
      case 4:
        this.setData('timerShootDelay', 14);
        break;
      case 5:
        this.setData('timerShootDelay', 10);
        break;
      default:
        this.setData('timerShootDelay', 30);
    }
    this.setData('timerShootTick', this.getData('timerShootDelay') - 1);
  }

  moveUp() {
    this.body.velocity.y = -this.getData('speed');
  }

  moveDown() {
    this.body.velocity.y = this.getData('speed');
  }

  moveLeft() {
    this.body.velocity.x = -this.getData('speed');
  }

  moveRight() {
    this.body.velocity.x = this.getData('speed');
  }

  gameOver(scene) {
    this.scene.time.addEvent({
      delay: 1000,
      callback() {
        this.scene.scene.start('GameOver', scene);
      },
      callbackScope: this,
      loop: false,
    });
  }

  update() {
    this.body.setVelocity(0, 0);
    this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);
    this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);

    if (this.getData('isShooting')) {
      if (this.getData('timerShootTick') < this.getData('timerShootDelay')) {
        this.setData('timerShootTick', this.getData('timerShootTick') + 1);
      } else {
        if (this.bonus1 === 0) {
          const missile = new Shoot(this.scene, this.x, this.y, 'missile', -1, 0);
          missile.setScale(0.5);
          this.scene.playerMissiles.add(missile);
        } else if (this.bonus1 === 1) {
          for (let i = -22; i <= 22; i += 44) {
            const missile = new Shoot(this.scene, this.x + i, this.y, 'missile', -1, 0);
            missile.setScale(0.5);
            this.scene.playerMissiles.add(missile);
          }
        } else if (this.bonus1 >= 2) {
          for (let i = -22; i <= 22; i += 22) {
            const missile = new Shoot(this.scene, this.x + i, this.y, 'missile', -1, 0);
            missile.setScale(0.5);
            this.scene.playerMissiles.add(missile);
          }
        }
        this.setData('timerShootTick', 0);
        this.scene.sfx.missile.play();
      }
    }
  }
}
