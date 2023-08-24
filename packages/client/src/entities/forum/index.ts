export type { Comment, Topic, CardProps, setCommentType } from './types/types';
export { forumService } from './api/forum.service';
export { forumSlice } from './model/slice';
export {
  getTopicsReducer,
  getTopicReducer,
  setTopicRedusers,
  setCommentRedusers,
  removeCommentReduser,
} from './model/redusers';
export { getTopicListSelectors } from './model/selecrots';
