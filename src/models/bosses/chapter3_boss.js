import { Entity, ChasingEnemyMissile } from '../entities';

export default class Boss3 extends Entity {
  constructor(scene, x, y, hp) {
    super(scene, x, y, "boss", "Boss3");
    this.hp = hp;
    this.body.collideWorldBounds = true;

    this.shootTimer = this.scene.time.addEvent({
      delay: 1000,
      callback: function() {
        this.body.velocity.x = Phaser.Math.Between(-200, 200);
        var missile = new ChasingEnemyMissile(
          this.scene,
          this.x,
          this.y
        );
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
