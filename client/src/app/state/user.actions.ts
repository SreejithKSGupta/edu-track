import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

export const loadUsers = createAction('[User] Load Initial Users');
export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ users: User[] }>()
);
export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: any }>()
);

export const loadMoreUsers = createAction(
    '[User] Load More Users',
    props<{ users: User[] }>() 
  );
export const loadMoreUsersSuccess = createAction(
  '[User] Load More Users Success',
  props<{ users: User[] }>()
);
export const loadMoreUsersFailure = createAction(
  '[User] Load More Users Failure',
  props<{ error: any }>()
);

export const setPagination = createAction(
  '[User] Set Pagination',
  props<{ pageIndex: number; pageSize: number }>()
);