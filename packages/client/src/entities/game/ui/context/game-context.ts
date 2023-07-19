import { createContext } from 'react';

type GameContextDTO = {
  gameStatus: string;
  score: number;
  start: () => void;
  reset: () => void;
};

export const GameContext = createContext<GameContextDTO>({} as GameContextDTO);
