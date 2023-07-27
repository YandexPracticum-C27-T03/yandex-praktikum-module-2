export type CanvasProps = React.DetailedHTMLProps<React.CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement> & {
  draw: (ctx: CanvasRenderingContext2D) => void;
};

export type FillRect = {
  ctx: CanvasRenderingContext2D;
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  color?: string;
};

export type DrawImage = Omit<FillRect, 'color'> & {
  image: HTMLImageElement;
};

export type DrawBackground = Pick<FillRect, 'ctx'> & {
  xShift: number;
  image: HTMLImageElement;
};

export type RandomRange = {
  min: number;
  max: number;
};

export interface Graphic {
  x: number;
  y: number;
}

export interface GameObj extends Graphic {
  w: number;
  h: number;
}
