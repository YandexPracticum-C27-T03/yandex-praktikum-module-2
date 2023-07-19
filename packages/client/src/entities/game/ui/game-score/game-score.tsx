import { useContext } from 'react';
import './styles.scss';
import { GameContext } from '../context/game-context';

export const GameScore = () => {
  const { score } = useContext(GameContext);
  return <div className="Game-score">{score}</div>;
};
