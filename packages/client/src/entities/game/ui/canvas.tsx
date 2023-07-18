import { useEffect, useRef } from 'react';
import { CanvasProps } from '../lib/types';

export const Canvas = ({ width, height, draw }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const propsRef = useRef<CanvasProps>({ width, height, draw });

  useEffect(() => {
    const { width, height, draw } = propsRef.current;
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    canvas.width = width as number;
    canvas.height = height as number;

    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return;
    }

    draw(ctx);
  }, []);

  return <canvas ref={canvasRef} />;
};
