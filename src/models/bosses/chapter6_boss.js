import Phaser from 'phaser';
import Entity from '../entities';
import ChasingEnemyMissile from '../attacks/chasing_enemy_missile';
import EnemyBomb from '../attacks/enemy_bomb';

export default class Boss6 extends Entity {
  constructor(scene) {
    super(scene, 400, 80, 'boss', 'Boss6');
    this.hp = 40;
    this.body.collideWorldBounds = true;

    this.shootTimer = this.scene.time.addEvent({
      delay: 1000,
      callback() {
        this.body.velocity.x = Phaser.Math.Between(-200, 200);
        const missile1 = new ChasingEnemyMissile(
          this.scene,
          this.x,
          this.y,
        );
        const bomb = new EnemyBomb(
          this.scene,
          this.x,
          this.y,
        );
        const missile2 = new ChasingEnemyMissile(
          this.scene,
          this.x - 70,
          this.y,
        );
        const missile3 = new ChasingEnemyMissile(
          this.scene,
          this.x + 70,
          this.y,
        );
        this.scene.enemyMissiles.add(missile1);
        this.scene.enemyMissiles.add(missile2);
        this.scene.enemyMissiles.add(missile3);
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
