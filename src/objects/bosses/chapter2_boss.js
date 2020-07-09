import Phaser from 'phaser';
import Entity from '../entities';
import Shoot from '../attacks/shoot';

export default class Boss2 extends Entity {
  constructor(scene) {
    super(scene, 400, 80, 'boss', 'Boss2');
    this.hp = 35;
    this.body.collideWorldBounds = true;

    this.shootTimer = this.scene.time.addEvent({
      delay: 1000,
      callback() {
        this.body.velocity.x = Phaser.Math.Between(-200, 200);
        const missile1 = new Shoot(this.scene, this.x - 70, this.y, 'missile', 1, 0);
        const missile2 = new Shoot(this.scene, this.x + 70, this.y, 'missile', 1, 0);
        const bomb = new Shoot(this.scene, this.x, this.y, 'bomb', 1, 0);
        bomb.setScale(1.7);
        this.scene.enemyMissiles.add(missile1);
        this.scene.enemyMissiles.add(missile2);
        this.scene.enemyMissiles.add(bomb);
      },
      callbackScope: this,
      loop: true,
    });
  }
}
