import Phaser from 'phaser';
import Entity from '../entities';
import Shoot from '../attacks/shoot';

export default class AttackHel extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'attack_hel', 'AttackHel');

    this.body.velocity.y = Phaser.Math.Between(50, 100);

    this.shootTimer = this.scene.time.addEvent({
      delay: 1000,
      callback() {
        const missile1 = new Shoot(this.scene, this.x - 22, this.y, 'missile', 1, 0);
        const missile2 = new Shoot(this.scene, this.x + 22, this.y, 'missile', 1, 0);
        missile1.setScale(0.5);
        missile2.setScale(0.5);
        this.scene.enemyMissiles.add(missile1);
        this.scene.enemyMissiles.add(missile2);
      },
      callbackScope: this,
      loop: true,
    });
  }
}