import { Graphic } from '../lib/types';
import { Rectangle } from './Rectangle';

export class Entity extends Rectangle {
  acceleration: Graphic;
  velocity: Graphic;

  constructor(x = 0, y = 0, w = 0, h = 0) {
    super(x, y, w, h);

    this.acceleration = {
      x: 0,
      y: 0,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
  }

  update() {
    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}
