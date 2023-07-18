import { Entity } from './Entity';

export class Player extends Entity {
  isGrounded: boolean;

  constructor(x = 0, y = 0, w = 0, h = 0) {
    super(x, y, w, h);

    this.isGrounded = false;
  }
}
