import { createSelector } from 'reselect'

/**
 * Selectors when reading loader state in the redux store
 */

 const loadingStatus = state => state.loader.isLoading;
 const loadingStatus_front = state => state.loader.isLoading_front;
 export const isLoading = createSelector(
    [loadingStatus, loadingStatus_front],
    (status, status_front) => status || status_front
  );