import { useContext } from 'react';
import { GameContext } from '@@entities/game/lib/context/game-context';

export const GameRecord = () => {
  const { record } = useContext(GameContext);

  return <div className="Game-score">РЕКОРД: {record}</div>;
};
