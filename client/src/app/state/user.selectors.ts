import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

// Select the user state
export const selectUserState = createFeatureSelector<UserState>('users');

export const selectAllUsers = createSelector(
  selectUserState,
  (state: UserState) => state.users
);

// Select pagination details
export const selectUserPagination = createSelector(
  selectUserState,
  (state: UserState) => ({
    length: state.length,
    pageSize: state.pageSize,
    pageIndex: state.pageIndex
  })
);

// Select paginated users (based on current page)
export const selectPaginatedUsers = createSelector(
  selectUserState,
  (state: UserState) => {
    const startIndex = state.pageIndex * state.pageSize;
    return state.users.slice(startIndex, startIndex + state.pageSize);
  }
);
