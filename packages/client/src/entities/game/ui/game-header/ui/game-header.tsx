import { PropsWithChildren } from 'react';
import { GameRecord } from './game-record';
import { GameScore } from './game-score';

import './styles.scss';

export const GameHeader = ({ children }: PropsWithChildren) => {
  return (
    <div className="Game-header">
      {children}
      <GameRecord />
      <GameScore />
    </div>
  );
};
