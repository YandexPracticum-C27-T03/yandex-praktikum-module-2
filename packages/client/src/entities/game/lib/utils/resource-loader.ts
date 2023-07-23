import { EventEmitter } from 'eventemitter3';
import { ImageResourcesMap } from '../constants/game-options';

type AssetMap = Record<string, string>;

export enum ResourceLoaderEvents {
  Success = 'success',
  Error = 'error',
}

export class ResourceLoader extends EventEmitter {
  private imageList: Record<string, HTMLImageElement> = {};
  private errorOccurred = false;
  private readonly _imageAssetMap: AssetMap;

  constructor() {
    super();

    this._imageAssetMap = ImageResourcesMap;
  }

  load(timeout = 5000) {
    const assetNames = Object.keys(this._imageAssetMap);
    const assetPromises = assetNames.map((assetName) => this.loadAsset(assetName, this._imageAssetMap[assetName]));

    const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('Load timeout')), timeout));

    Promise.race([Promise.all(assetPromises), timeoutPromise])
      .then(() => {
        if (this.errorOccurred) {
          this.emit(ResourceLoaderEvents.Error);
        } else {
          this.emit(ResourceLoaderEvents.Success);
        }
      })
      .catch(() => {
        this.errorOccurred = true;
        this.emit(ResourceLoaderEvents.Error);
      });

    return this;
  }

  getResourceByName(name: keyof typeof ImageResourcesMap): HTMLImageElement {
    return this.imageList[name];
  }

  hasError(): boolean {
    return this.errorOccurred;
  }

  private loadAsset(name: string, url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const image = new Image();

      image.onload = () => {
        this.imageList[name] = image;
        resolve();
      };

      image.onerror = () => {
        this.errorOccurred = true;
        reject(new Error(`Failed to load asset: ${name} at url: ${url}`));
      };

      image.src = url;
    });
  }
}

export const resourceLoader = new ResourceLoader();
