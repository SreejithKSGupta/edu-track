import { createReducer, on } from '@ngrx/store';
import { loadUsersFailure, loadUsersSuccess } from './user.actions';
import { User } from '../models/user.model';

export interface UserState {
  users: User[];
}

export const initialState: UserState = {
  users: [],
};

export const userReducer = createReducer(
  initialState,
  on(loadUsersSuccess, (state, { users }) => ({ ...state, users })),
  on(loadUsersFailure, (state, {error})=>({...state, error}))
);
