import { useAppSelector } from '@@shared/lib/model/hooks';

export const LeaderBoardPage = () => {
  const leaderboardFromRedux = useAppSelector((state) => state.leaderboard.leaderboard);

  return (
    <ul>
      {leaderboardFromRedux.map((leader) => (
        <li key={`${leader.id}_${leader.name}`}>{leader.name}</li>
      ))}
    </ul>
  );
};
