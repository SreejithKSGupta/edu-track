import { createReducer, on } from '@ngrx/store';
import { loadUsersFailure, loadUsersSuccess, setPagination } from './user.actions';
import { User } from '../models/user.model';

export interface UserState {
  users: User[];
  paginatedUsers: User[];
  length: number;
  pageSize: number;
  pageIndex: number;
}

export const initialState: UserState = {
  users: [],
  paginatedUsers: [],
  length: 0,
  pageSize: 5,
  pageIndex: 0,
};

export const userReducer = createReducer(
  initialState,
  on(loadUsersSuccess, (state, { users }) => { 
    const startIndex = state.pageIndex*state.pageSize;
    // console.log("loadUsersSuccess",startIndex);
    // debugger
    return{
      ...state,
      users,
      length: users.length,
      paginatedUsers: users.slice(startIndex, startIndex + state.pageSize),
    }
  }),
  on(setPagination, (state, { pageIndex, pageSize }) => {
    const startIndex = pageIndex * pageSize;
    // console.log("startIndex",startIndex);
    // debugger
    return {
      ...state,
      pageIndex,
      pageSize,
      paginatedUsers: state.users.slice(startIndex, startIndex + pageSize),
    };
  }),
  on(loadUsersFailure, (state, {error})=>({...state, error}))
);
