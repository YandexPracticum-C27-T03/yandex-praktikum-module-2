import { FillRect } from '../types';

// Рисует фигуры на холсте
export const fillRect = ({ ctx, x = 0, y = 0, w = 0, h = 0, color = 'black' }: FillRect): void => {
  ctx.save();
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
  ctx.restore();
};
