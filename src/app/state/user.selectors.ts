import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

export const selectUserState = createFeatureSelector<UserState>('users');

export const selectAllUsers = createSelector(selectUserState, (state) => {
    console.log(state);
    debugger
    state.users
});

export const selectPaginatedUsers = createSelector(
    selectUserState,
    (state) => state.paginatedUsers
  );
  
  export const selectUserPagination = createSelector(
    selectUserState,
    (state) => {
      return{length: state.length,
      pageSize: state.pageSize,
      pageIndex: state.pageIndex,}
    }
  );