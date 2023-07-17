import { RandomRange } from '../types';

export const randomRangeInt = ({ min, max }: RandomRange) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
