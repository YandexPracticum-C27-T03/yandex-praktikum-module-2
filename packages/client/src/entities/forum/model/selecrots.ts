import { RootState } from '@@app/app-store';

export const getTopicListSelectors = (state: RootState) => state.forum.topics;
export const getTopicSelectors = (state: RootState) => state.forum.topic;
