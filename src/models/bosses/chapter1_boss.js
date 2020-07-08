import Phaser from 'phaser';
import Entity from '../entities';
import EnemyMissile from '../attacks/enemy_missile';
import DiagonalRightMissile from '../attacks/diagonal_right_missile';
import DiagonalLeftMissile from '../attacks/diagonal_left_missile';

export default class Boss1 extends Entity {
  constructor(scene) {
    super(scene, 400, 80, 'boss', 'Boss1');
    this.hp = 15;
    this.body.collideWorldBounds = true;

    this.shootTimer = this.scene.time.addEvent({
      delay: 1000,
      callback() {
        this.body.velocity.x = Phaser.Math.Between(-200, 200);
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
        missile.setScale(0.7);
        diagonalRightMissile.setScale(0.7);
        diagonalLeftMissile.setScale(0.7);
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
