import { Fill } from '../types';

// Заполняет холст определенным цветом
export const fill = ({ ctx, color }: Fill): void => {
  ctx.save();
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.restore();
};
