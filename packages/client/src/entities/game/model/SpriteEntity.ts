import { drawImage } from '@@entities/game/lib/utils';
import { Entity } from '@@entities/game/model/Entity';

export class SpriteEntity extends Entity {
  private image: HTMLImageElement;

  constructor(x = 0, y = 0, w = 0, h = 0, image: HTMLImageElement) {
    super(x, y, w, h);

    this.image = image;
  }

  public setNewImage(image: HTMLImageElement) {
    this.image = image;
  }

  draw(ctx: CanvasRenderingContext2D) {
    drawImage({ ctx, x: this.x, y: this.y, w: this.w, h: this.h, image: this.image });
  }
}
