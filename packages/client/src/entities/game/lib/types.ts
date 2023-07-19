export type CanvasProps = React.DetailedHTMLProps<React.CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement> & {
  draw: (ctx: CanvasRenderingContext2D) => void;
};

export type FillRect = {
  ctx: CanvasRenderingContext2D;
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  color: string;
};

export type Fill = Omit<FillRect, 'x' | 'y' | 'w' | 'h'>;

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
