import { GameRecord } from './game-record';
import { GameScore } from './game-score';

import './styles.scss';

export const GameHeader = () => {
  return (
    <div className="Game-header">
      <GameRecord />
      <GameScore />
    </div>
  );
};
