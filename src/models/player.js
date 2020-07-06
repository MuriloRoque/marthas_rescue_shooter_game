import { Entity } from './entities';

export default class Player extends Entity {
  constructor(scene, x, y, key, hp, score) {
    super(scene, x, y, key, "Player");
    this.hp = hp;
    this.score = score;

    this.setData("speed", 200);

    this.setData("isShooting", false);
    this.setData("timerShootDelay", 30);
    this.setData("timerShootTick", this.getData("timerShootDelay") - 1);
  }

  moveUp() {
    this.body.velocity.y = -this.getData("speed");
  }
  moveDown() {
    this.body.velocity.y = this.getData("speed");
  }
  moveLeft() {
    this.body.velocity.x = -this.getData("speed");
  }
  moveRight() {
    this.body.velocity.x = this.getData("speed");
  }

  onDestroy(scene) {
    this.scene.time.addEvent({
      delay: 1000,
      callback: function() {
        this.scene.scene.start("GameOver", scene);
      },
      callbackScope: this,
      loop: false
    });
  }

  update() {
    this.body.setVelocity(0, 0);
    this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);
    this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);

    if (this.getData("isShooting")) {
      if (this.getData("timerShootTick") < this.getData("timerShootDelay")) {
        this.setData("timerShootTick", this.getData("timerShootTick") + 1);
      }
      else {
        var missile = new PlayerMissile(this.scene, this.x, this.y);
        this.scene.playerMissiles.add(missile);
        missile.setScale(0.5);
        this.setData("timerShootTick", 0);
      }
    }
  }
}

class PlayerMissile extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "missile");
    this.body.velocity.y = -200;
  }
}
