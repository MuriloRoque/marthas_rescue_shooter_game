import { Entity, EnemyMissile, DiagonalRightMissile, DiagonalLeftMissile } from '../entities';

export default class Boss1 extends Entity {
  constructor(scene, x, y, hp) {
    super(scene, x, y, "boss", "Boss1");
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
