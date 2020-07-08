import Phaser from 'phaser';
import Entity from '../entities';
import EnemyBomb from '../attacks/enemy_bomb';

export default class Bomber extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'bomber', 'Bomber');

    this.body.velocity.y = Phaser.Math.Between(50, 100);

    this.shootTimer = this.scene.time.addEvent({
      delay: 1000,
      callback() {
        const missile = new EnemyBomb(
          this.scene,
          this.x,
          this.y,
        );
        missile.setScale(1.5);
        this.scene.enemyMissiles.add(missile);
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