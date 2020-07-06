import Entity from '../entities';

export default class EnemyBomb extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'bomb');
    this.body.velocity.y = 200;
  }
}