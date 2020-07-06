import Entity from '../entities';
import EnemyMissile from '../attacks/enemy_missile';
import DiagonalRightMissile from '../attacks/diagonal_right_missile';
import DiagonalLeftMissile from '../attacks/diagonal_left_missile';

export default class Multirole extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'multirole', 'Multirole');

    this.body.velocity.y = 20;

    this.shootTimer = this.scene.time.addEvent({
      delay: 1000,
      callback() {
        const missile = new EnemyMissile(
          this.scene,
          this.x,
          this.y,
        );
        const diagonalRightMissile = new DiagonalRightMissile(
          this.scene,
          this.x,
          this.y,
        );
        const diagonalLeftMissile = new DiagonalLeftMissile(
          this.scene,
          this.x,
          this.y,
        );
        missile.setScale(0.5);
        diagonalRightMissile.setScale(0.5);
        diagonalLeftMissile.setScale(0.5);
        this.scene.enemyMissiles.add(missile);
        this.scene.enemyMissiles.add(diagonalRightMissile);
        this.scene.enemyMissiles.add(diagonalLeftMissile);
      },
      callbackScope: this,
      loop: true,
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