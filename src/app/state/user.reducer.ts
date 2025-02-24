import { createReducer, on } from '@ngrx/store';
import { commitPrefetchedUsers, loadMoreUsersSuccess, setPagination } from './user.actions';
import { User } from '../models/user.model';

export interface UserState {
  users: User[];
  length: number;
  pageSize: number;
  pageIndex: number;
}

const initialState: UserState = {
  users: [],
  length: 0,
  pageSize: 10,
  pageIndex: 0
};

export const userReducer = createReducer(
  initialState,

  on(loadMoreUsersSuccess, (state, { users }) => ({
    ...state,
    users: [...state.users, ...users],
    length: state.users.length + users.length
  })),

  on(setPagination, (state, { pageIndex, pageSize }) => ({
    ...state,
    pageIndex,
    pageSize
  })),
  on(commitPrefetchedUsers, (state, { users }) => ({
    ...state,
    users: [...state.users, ...users],
    length: state.users.length + users.length
  })),
);