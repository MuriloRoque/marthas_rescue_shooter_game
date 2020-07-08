import Phaser from 'phaser';
import Entity from '../entities';
import Shoot from '../attacks/shoot';

export default class Boss1 extends Entity {
  constructor(scene) {
    super(scene, 400, 80, 'boss', 'Boss1');
    this.hp = 25;
    this.body.collideWorldBounds = true;

    this.shootTimer = this.scene.time.addEvent({
      delay: 1000,
      callback() {
        this.body.velocity.x = Phaser.Math.Between(-200, 200);
        for (let i = -1; i <= 1; i += 1) {
          const missile = new Shoot(this.scene, this.x, this.y, 'missile', 1, i);
          this.scene.enemyMissiles.add(missile);
        }
      },
      callbackScope: this,
      loop: true,
    });
  }
}
