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
      this.setTexture("explosion").setScale(2);
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

class DiagonalRightMissile extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "missile");
    this.body.velocity.y = 200;
    this.body.velocity.x = 200;
  }
}

class DiagonalLeftMissile extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "missile");
    this.body.velocity.y = 200;
    this.body.velocity.x = -200;
  }
}

export class Fighter extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "fighter", "Fighter");

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

export class Boss extends Entity {
  constructor(scene, x, y, hp) {
    super(scene, x, y, "boss", "Boss");
    this.hp = hp;
    this.body.collideWorldBounds = true;

    this.shootTimer = this.scene.time.addEvent({
      delay: 1000,
      callback: function() {
        this.body.velocity.x = Phaser.Math.Between(-200, 200);
        var missile = new EnemyMissile(
          this.scene,
          this.x,
          this.y
        );
        var diagonalRightMissile = new DiagonalRightMissile(
          this.scene,
          this.x,
          this.y
        );
        var diagonalLeftMissile = new DiagonalLeftMissile(
          this.scene,
          this.x,
          this.y
        );
        missile.setScale(0.7);
        diagonalRightMissile.setScale(0.7);
        diagonalLeftMissile.setScale(0.7);
        this.scene.enemyMissiles.add(missile);
        this.scene.enemyMissiles.add(diagonalRightMissile);
        this.scene.enemyMissiles.add(diagonalLeftMissile);
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

