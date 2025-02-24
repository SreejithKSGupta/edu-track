import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

export const selectUserState = createFeatureSelector<UserState>('users');

export const selectAllUsers = createSelector(
  selectUserState,
  (state: UserState) => state.users
);

export const selectUserPagination = createSelector(
  selectUserState,
  (state: UserState) => ({
    length: state.length,
    pageSize: state.pageSize,
    pageIndex: state.pageIndex
  })
);

export const selectPaginatedUsers = createSelector(
  selectUserState,
  (state: UserState) => {
    const startIndex = state.pageIndex * state.pageSize;
    return state.users.slice(startIndex, startIndex + state.pageSize);
  }
);
