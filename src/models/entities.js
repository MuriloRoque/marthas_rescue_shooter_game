import Phaser from "phaser";

class Entity extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key, type) {
    super(scene, x, y, key);

    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
    this.setData("type", type);
    this.setData("isDead", false);
  }

  explode(canDestroy) {
    if (!this.getData("isDead")) {
      this.setTexture("explosion");
      this.play("explosion");
      if (this.shootTimer !== undefined) {
        if (this.shootTimer) {
          this.shootTimer.remove(false);
        }
      }
      this.setAngle(0);
      this.body.setVelocity(0, 0);
      this.on('animationcomplete', function() {
        if (canDestroy) {
          this.destroy();
        }
        else {
          this.setVisible(false);
        }
      }, this);
      this.setData("isDead", true);
    }
  }
}

export class Player extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key, "Player");

    this.setData("speed", 200);

    this.setData("isShooting", false);
    this.setData("timerShootDelay", 10);
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

  onDestroy() {
    this.scene.time.addEvent({
      delay: 1000,
      callback: function() {
        this.scene.scene.start("GameOver");
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

class EnemyMissile extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "missile");
    this.body.velocity.y = 200;
  }
}

export class Fighter extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "fighter", "Fighter");
    this.play("fighter");

    this.body.velocity.y = Phaser.Math.Between(50, 100);

    this.shootTimer = this.scene.time.addEvent({
      delay: 1000,
      callback: function() {
        var missile = new EnemyMissile(
          this.scene,
          this.x,
          this.y
        );
        missile.setScale(0.5);
        this.scene.enemyMissiles.add(missile);
      },
      callbackScope: this,
      loop: true
    });
  }

  onDestroy() {
    if (this.shootTimer !== undefined) {
      if (this.shootTimer) {
        this.shootTimer.remove(false);
      }
    }
  }
}