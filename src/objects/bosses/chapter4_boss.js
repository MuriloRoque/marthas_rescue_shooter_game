import Phaser from 'phaser';
import Entity from '../entities';
import Shoot from '../attacks/shoot';

export default class Boss4 extends Entity {
  constructor(scene) {
    super(scene, 400, 80, 'boss', 'Boss4');
    this.hp = 55;
    this.body.collideWorldBounds = true;

    this.shootTimer = this.scene.time.addEvent({
      delay: 500,
      callback() {
        this.body.velocity.x = Phaser.Math.Between(-200, 200);
        for (let i = -70; i <= 70; i += 70) {
          const missile = new Shoot(this.scene, this.x + i, this.y, 'missile', 1, 0);
          this.scene.enemyMissiles.add(missile);
        }
      },
      callbackScope: this,
      loop: true,
    });
  }
}
