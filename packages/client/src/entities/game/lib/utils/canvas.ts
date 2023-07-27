import { DrawBackground, DrawImage, FillRect } from '@@entities/game/lib/types';

// Добавляет изображение на холст
export const drawImage = ({ ctx, x = 0, y = 0, w = 0, h = 0, image }: DrawImage): void => {
  ctx.drawImage(image, x, y, w, h);
};

// Рисует фигуры на холсте
export const fillRect = ({ ctx, x = 0, y = 0, w = 0, h = 0, color = 'black' }: FillRect): void => {
  ctx.save();
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
  ctx.restore();
};

// Выводит на холст фоновое изображением
export const drawBackground = ({ ctx, image, xShift }: DrawBackground): void => {
  ctx.drawImage(image, xShift ?? 0, 0, ctx.canvas.width, ctx.canvas.height);
};
