import Phaser from 'phaser';
import Entity from './entities';
import PlayerMissile from './attacks/player_missile';

export default class Player extends Entity {
  constructor(scene, x, y, key, hp, score, bonus1 = 0, bonus2 = 0, bonus3 = 0) {
    super(scene, x, y, key, 'Player');
    this.hp = hp;
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

  onDestroy(scene) {
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
      } else if (this.bonus1 === 0) {
        const missile = new PlayerMissile(this.scene, this.x, this.y);
        this.scene.playerMissiles.add(missile);
        missile.setScale(0.5);
        this.setData('timerShootTick', 0);
        this.scene.sfx.missile.play();
      } else if (this.bonus1 === 1) {
        const missile1 = new PlayerMissile(this.scene, this.x - 20, this.y);
        const missile2 = new PlayerMissile(this.scene, this.x + 25, this.y);
        this.scene.playerMissiles.add(missile1);
        this.scene.playerMissiles.add(missile2);
        missile1.setScale(0.5);
        missile2.setScale(0.5);
        this.setData('timerShootTick', 0);
        this.scene.sfx.missile.play();
      } else if (this.bonus1 >= 2) {
        const missile1 = new PlayerMissile(this.scene, this.x - 20, this.y);
        const missile2 = new PlayerMissile(this.scene, this.x + 25, this.y);
        const missile3 = new PlayerMissile(this.scene, this.x, this.y);
        this.scene.playerMissiles.add(missile1);
        this.scene.playerMissiles.add(missile2);
        this.scene.playerMissiles.add(missile3);
        missile1.setScale(0.5);
        missile2.setScale(0.5);
        missile3.setScale(0.5);
        this.setData('timerShootTick', 0);
        this.scene.sfx.missile.play();
      }
    }
  }
}
