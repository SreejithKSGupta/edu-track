import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

export const loadMoreUsers = createAction(
    '[User] Load More Users',
    props<{ offset: number; limit: number }>()
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

export const commitPrefetchedUsers = createAction(
  '[User] Commit Prefetched Users',
  props<{ users: User[] }>()
);