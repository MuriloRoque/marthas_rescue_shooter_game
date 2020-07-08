import Phaser from 'phaser';
import Entity from '../entities';
import Shoot from '../attacks/shoot';

export default class AttackAir extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'attack_air', 'AttackAir');

    this.body.velocity.y = Phaser.Math.Between(50, 100);

    this.shootTimer = this.scene.time.addEvent({
      delay: 500,
      callback() {
        const missile = new Shoot(this.scene, this.x, this.y, 'missile', 1, 0);
        missile.setScale(0.5);
        this.scene.enemyMissiles.add(missile);
      },
      callbackScope: this,
      loop: true,
    });
  }
}