import { ReactNode } from 'react';
import { GameRecord } from './game-record';
import { GameScore } from './game-score';

import './styles.scss';

type GameHeaderProps = {
  children: ReactNode | ReactNode[];
};

export const GameHeader = ({ children }: GameHeaderProps) => {
  return (
    <div className="Game-header">
      {children}
      <GameRecord />
      <GameScore />
    </div>
  );
};
