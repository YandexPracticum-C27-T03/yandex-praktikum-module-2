import { HTTPTransport } from '@@shared/lib/HTTPTransport';
import { TEAM_NAME } from '@@shared/lib/constants';

export type UserData = {
  name: string;
  score: number;
  avatar?: string;
  id: number;
};

const createLeaderData = (data: UserData) => ({
  data,
  ratingFieldName: 'score',
  teamName: TEAM_NAME,
});

class LeaderboardService extends HTTPTransport {
  constructor() {
    super('/');
  }

  public getLeaderBoard(limited?: number) {
    const limit = limited || 100;

    return this.http.post(`leaderboard/${TEAM_NAME}`, {
      ratingFieldName: 'score',
      limit,
      cursor: 0,
    });
  }

  public updateScore(data: UserData) {
    this.http.post('leaderboard', createLeaderData(data));
  }
}

export const leaderBoardService = new LeaderboardService();
