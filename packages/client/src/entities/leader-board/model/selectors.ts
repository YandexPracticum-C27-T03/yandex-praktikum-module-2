import { RootState } from '@@app/app-store';

const getLeaderBoard = (state: RootState) => state.leaderboard;
export const getLeaderBoardSelecotr = (state: RootState) => getLeaderBoard(state);
