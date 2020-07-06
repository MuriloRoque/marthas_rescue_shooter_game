import { Entity, ChasingEnemyMissile } from '../entities';

export default class Boss5 extends Entity {
  constructor(scene, x, y, hp) {
    super(scene, x, y, "boss", "Boss5");
    this.hp = hp;
    this.body.collideWorldBounds = true;

    this.shootTimer = this.scene.time.addEvent({
      delay: 1000,
      callback: function() {
        this.body.velocity.x = Phaser.Math.Between(-200, 200);
        var missile1 = new ChasingEnemyMissile(
          this.scene,
          this.x,
          this.y
        );
        var missile2 = new ChasingEnemyMissile(
          this.scene,
          this.x - 70,
          this.y
        );
        var missile3 = new ChasingEnemyMissile(
          this.scene,
          this.x + 70,
          this.y
        );
        this.scene.enemyMissiles.add(missile1);
        this.scene.enemyMissiles.add(missile2);
        this.scene.enemyMissiles.add(missile3);
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
