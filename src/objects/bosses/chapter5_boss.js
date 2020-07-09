import Phaser from 'phaser';
import Entity from '../entities';
import ChasingEnemyMissile from '../attacks/chasing_enemy_missile';

export default class Boss5 extends Entity {
  constructor(scene) {
    super(scene, 400, 80, 'boss', 'Boss5');
    this.hp = 65;
    this.body.collideWorldBounds = true;

    this.shootTimer = this.scene.time.addEvent({
      delay: 1000,
      callback() {
        this.body.velocity.x = Phaser.Math.Between(-200, 200);
        for (let i = -70; i <= 70; i += 70) {
          const missile = new ChasingEnemyMissile(this.scene, this.x + i, this.y);
          this.scene.enemyMissiles.add(missile);
        }
      },
      callbackScope: this,
      loop: true,
    });
  }
}
