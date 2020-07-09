import Entity from '../entities';
import Shoot from '../attacks/shoot';

export default class Multirole extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'multirole', 'Multirole');

    this.body.velocity.y = 20;

    this.shootTimer = this.scene.time.addEvent({
      delay: 1000,
      callback() {
        for (let i = -1; i <= 1; i += 1) {
          const missile = new Shoot(this.scene, this.x, this.y, 'missile', 1, i);
          this.scene.enemyMissiles.add(missile);
          missile.setScale(0.5);
        }
      },
      callbackScope: this,
      loop: true,
    });
  }
}