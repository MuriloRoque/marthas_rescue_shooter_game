import { Entity } from './entities';

export default class Player extends Entity {
  constructor(scene, x, y, key, hp, score, bonus1 = 0, bonus2 = 0, bonus3 = 0, bonus4 = 0) {
    super(scene, x, y, key, "Player");
    this.hp = hp;
    this.score = score;
    this.bonus1 = bonus1;
    this.bonus2 = bonus2;
    this.bonus3 = bonus3;
    this.bonus4 = bonus4;

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

    switch(this.bonus1){
      case 1:
        this.setData("speed", 400);
        break;
      case 2:
        this.setData("speed", 280);
        break;
      case 3:
        this.setData("speed", 320);
        break;
      case 4:
        this.setData("speed", 360);
        break;
      case 5:
        this.setData("speed", 400);
        break;
    }

    this.body.setVelocity()
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
