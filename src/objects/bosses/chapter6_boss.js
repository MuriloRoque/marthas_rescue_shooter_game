import Phaser from 'phaser';
import Entity from '../entities';
import ChasingEnemyMissile from '../attacks/chasing_enemy_missile';
import Shoot from '../attacks/shoot';

export default class Boss6 extends Entity {
  constructor(scene) {
    super(scene, 400, 80, 'boss', 'Boss6');
    this.hp = 80;
    this.body.collideWorldBounds = true;

    this.shootTimer = this.scene.time.addEvent({
      delay: 1000,
      callback() {
        this.body.velocity.x = Phaser.Math.Between(-200, 200);
        for (let i = -70; i <= 70; i += 70) {
          const missile = new ChasingEnemyMissile(this.scene, this.x + i, this.y);
          this.scene.enemyMissiles.add(missile);
        }
        const bomb = new Shoot(this.scene, this.x, this.y, 'bomb', 1, 0);
        bomb.setScale(1.7);
        this.scene.enemyMissiles.add(bomb);
      },
      callbackScope: this,
      loop: true,
    });
  }
}
