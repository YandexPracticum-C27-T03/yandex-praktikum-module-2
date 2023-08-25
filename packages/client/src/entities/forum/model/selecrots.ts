import { RootState } from '@@app/app-store';

export const getTopicListSelectors = (state: RootState) => state.forum.topics;
export const getCommentsSelectors = (state: RootState) => state.forum.comments;
