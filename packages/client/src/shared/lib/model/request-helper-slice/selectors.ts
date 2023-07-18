import { STATUSES } from '@@shared/lib/constants/statuses-request';

export const selectRequestModule = (state: RootState) => state.request;

export const selectRequestStatus = (state: RootState, requestId: string) =>
  selectRequestModule(state).entities[requestId]?.status || STATUSES.idle;
