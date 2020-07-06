import { Entity, EnemyMissile, DiagonalRightMissile, DiagonalLeftMissile } from '../entities';

export default class Multirole extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "multirole", "Multirole");

    this.body.velocity.y = 20;

    this.shootTimer = this.scene.time.addEvent({
      delay: 1000,
      callback: function() {
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
        missile.setScale(0.5);
        diagonalRightMissile.setScale(0.5);
        diagonalLeftMissile.setScale(0.5);
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