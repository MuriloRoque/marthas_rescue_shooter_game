import Phaser from 'phaser';
import Entity from '../entities';
import EnemyMissile from '../attacks/enemy_missile';
import EnemyBomb from '../attacks/enemy_bomb';

export default class Boss2 extends Entity {
  constructor(scene, x, y, hp) {
    super(scene, x, y, 'boss', 'Boss2');
    this.hp = hp;
    this.body.collideWorldBounds = true;

    this.shootTimer = this.scene.time.addEvent({
      delay: 1000,
      callback() {
        this.body.velocity.x = Phaser.Math.Between(-200, 200);
        const missile1 = new EnemyMissile(
          this.scene,
          this.x - 70,
          this.y,
        );
        const missile2 = new EnemyMissile(
          this.scene,
          this.x + 70,
          this.y,
        );
        const bomb = new EnemyBomb(
          this.scene,
          this.x,
          this.y,
        );
        bomb.setScale(1.7);
        this.scene.enemyMissiles.add(missile1);
        this.scene.enemyMissiles.add(missile2);
        this.scene.enemyMissiles.add(bomb);
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
