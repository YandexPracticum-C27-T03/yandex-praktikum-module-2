import { createContext } from 'react';
import { userRecord } from '@@entities/leader-board';

type GameContextDTO = {
  gameStatus: string;
  score: number;
  record: number;
  recordList: userRecord[];
  start: () => void;
  reset: () => void;
};

export const GameContext = createContext<GameContextDTO>({} as GameContextDTO);
