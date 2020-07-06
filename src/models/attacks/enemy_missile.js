import Entity from '../entities';

export default class EnemyMissile extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'missile');
    this.body.velocity.y = 200;
  }
}