import { Fill } from '../lib/types';
import { fillRect } from '../lib/utils';
import { Entity } from './Entity';
import { Player } from './Player';

export class Rectangle {
  x: number;
  y: number;
  w: number;
  h: number;

  constructor(x = 0, y = 0, w = 0, h = 0) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  draw({ ctx, color }: Fill) {
    fillRect({ ctx, x: this.x, y: this.y, w: this.w, h: this.h, color });
  }

  // Проверяет столкновение игрока с объектом
  static areColliding({ player, spike }: { player: Player; spike: Entity }) {
    return (
      player.x < spike.x + spike.w &&
      player.x + player.w > spike.x &&
      player.y < spike.y + spike.h &&
      player.y + player.h > spike.y
    );
  }
}
