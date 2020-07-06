import Phaser from "phaser";

export class Entity extends Phaser.GameObjects.Sprite {
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

export class EnemyMissile extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "missile");
    this.body.velocity.y = 200;
  }
}

export class ChasingEnemyMissile extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "missile");
    this.body.velocity.y = Phaser.Math.Between(50, 100);

    this.states = {
      MOVE_DOWN: "MOVE_DOWN",
      CHASE: "CHASE"
    };
    this.state = this.states.MOVE_DOWN;
  }

  update() {
    if (!this.getData("isDead") && this.scene.player) {
      if (Phaser.Math.Distance.Between(
        this.x,
        this.y,
        this.scene.player.x,
        this.scene.player.y
      ) < 320) {

        this.state = this.states.CHASE;
      }

      if (this.state == this.states.CHASE) {
        var dx = this.scene.player.x - this.x;
        var dy = this.scene.player.y - this.y;

        var angle = Math.atan2(dy, dx);

        var speed = 100;
        this.body.setVelocity(
          Math.cos(angle) * speed,
          Math.sin(angle) * speed
        );

        if (this.x < this.scene.player.x) {
          this.angle -= 5;
        }
        else {
          this.angle += 5;
        } 
      }
    }
  }
}

export class EnemyBomb extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "bomb");
    this.body.velocity.y = 200;
  }
}

export class DiagonalRightMissile extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "missile");
    this.body.velocity.y = 200;
    this.body.velocity.x = 200;
  }
}

export class DiagonalLeftMissile extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "missile");
    this.body.velocity.y = 200;
    this.body.velocity.x = -200;
  }
}
