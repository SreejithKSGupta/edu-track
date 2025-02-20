import { createReducer, on } from '@ngrx/store';
import { loadMoreUsersSuccess, loadUsersFailure, loadUsersSuccess, setPagination } from './user.actions';
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
  
  // Load initial users
  on(loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    length: users.length
  })),

  // Load more users (append to state)
  on(loadMoreUsersSuccess, (state, { users }) => ({
    ...state,
    users: [...state.users, ...users],
    length: state.users.length + users.length
  })),

  // Update pagination
  on(setPagination, (state, { pageIndex, pageSize }) => ({
    ...state,
    pageIndex,
    pageSize
  }))
);