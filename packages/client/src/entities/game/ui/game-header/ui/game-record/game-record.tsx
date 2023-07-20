import { INITIAL_SCORE } from '@@entities/game/lib/constants/game-options';

export const GameRecord = () => {
  const record = (localStorage.getItem('score') || INITIAL_SCORE) as number;
  return <div className="Game-score">РЕКОРД: {record}</div>;
};
