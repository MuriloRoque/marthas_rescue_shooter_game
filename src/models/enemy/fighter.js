import { Entity, EnemyMissile } from '../entities';

export default class Fighter extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "fighter", "Fighter");

    this.body.velocity.y = Phaser.Math.Between(50, 100);

    this.shootTimer = this.scene.time.addEvent({
      delay: 1000,
      callback: function() {
        var missile = new EnemyMissile(
          this.scene,
          this.x,
          this.y
        );
        missile.setScale(0.5);
        this.scene.enemyMissiles.add(missile);
      },
      callbackScope: this,
      loop: true
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