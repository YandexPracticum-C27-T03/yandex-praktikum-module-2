import { RootState } from '@@app/app-store';

const getTopicList = (state: RootState) => state.forum.topics;
export const getTopicListSelectors = (state: RootState) => getTopicList(state);
