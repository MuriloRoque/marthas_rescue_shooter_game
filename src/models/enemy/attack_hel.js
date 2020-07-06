import Phaser from 'phaser';
import Entity from '../entities';
import EnemyMissile from '../attacks/enemy_missile';

export default class AttackHel extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'attack_hel', 'AttackHel');

    this.body.velocity.y = Phaser.Math.Between(50, 100);

    this.shootTimer = this.scene.time.addEvent({
      delay: 1000,
      callback() {
        const missile1 = new EnemyMissile(
          this.scene,
          this.x - 20,
          this.y,
        );
        const missile2 = new EnemyMissile(
          this.scene,
          this.x + 25,
          this.y,
        );
        missile1.setScale(0.5);
        missile2.setScale(0.5);
        this.scene.enemyMissiles.add(missile1);
        this.scene.enemyMissiles.add(missile2);
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