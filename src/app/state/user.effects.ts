import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DataService } from '../services/data.service';
import { loadMoreUsers, loadMoreUsersSuccess, loadMoreUsersFailure } from './user.actions';
import { catchError, map, mergeMap, of, take } from 'rxjs';

@Injectable()
export class UserEffects {
    loadMoreUsers$;

  constructor(private actions$: Actions, private dataService: DataService) {

      this.loadMoreUsers$ = createEffect(() =>
        this.actions$.pipe(
          ofType(loadMoreUsers),
          mergeMap(({ offset, limit }) =>
            this.dataService.getUsers(offset, limit).pipe(
              take(1),
              map(users => loadMoreUsersSuccess({ users })),
              catchError(error => of(loadMoreUsersFailure({ error: error.message })))
            )
          )
        )
      );
    
  }
}
