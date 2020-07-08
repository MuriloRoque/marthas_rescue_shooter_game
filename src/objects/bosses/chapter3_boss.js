import Phaser from 'phaser';
import Entity from '../entities';
import ChasingEnemyMissile from '../attacks/chasing_enemy_missile';

export default class Boss3 extends Entity {
  constructor(scene) {
    super(scene, 400, 80, 'boss', 'Boss3');
    this.hp = 45;
    this.body.collideWorldBounds = true;

    this.shootTimer = this.scene.time.addEvent({
      delay: 1000,
      callback() {
        this.body.velocity.x = Phaser.Math.Between(-200, 200);
        const missile = new ChasingEnemyMissile(
          this.scene,
          this.x,
          this.y,
        );
        this.scene.enemyMissiles.add(missile);
      },
      callbackScope: this,
      loop: true,
    });
  }
}
