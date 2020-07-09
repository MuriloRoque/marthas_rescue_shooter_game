import Entity from '../entities';

export default class Shoot extends Entity {
  constructor(scene, x, y, key, vertical, horizontal) {
    super(scene, x, y, key);
    this.body.velocity.y = 200 * vertical;
    this.body.velocity.x = 200 * horizontal;
  }
}