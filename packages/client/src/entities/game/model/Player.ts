import { SpriteEntity } from '@@entities/game/model/SpriteEntity';

export class Player extends SpriteEntity {
  isGrounded: boolean;
  private readonly poseImages: HTMLImageElement[];
  private currentFrameIndex = 0;

  constructor(x = 0, y = 0, w = 0, h = 0, images: HTMLImageElement | HTMLImageElement[]) {
    const imageArray = Array.isArray(images) ? images : [images];

    super(x, y, w, h, imageArray[0]);

    this.poseImages = imageArray;
    this.isGrounded = false;
  }

  update() {
    super.update();

    if (this.currentFrameIndex >= this.poseImages.length - 1) {
      this.currentFrameIndex = 0;
    } else {
      this.currentFrameIndex += 1;
    }

    this.setNewImage(this.poseImages[this.currentFrameIndex]);
  }
}
