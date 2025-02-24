import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DataService } from '../services/data.service';
import { loadMoreUsers, loadMoreUsersSuccess, loadMoreUsersFailure } from './user.actions';
import { catchError, map, mergeMap, of, take } from 'rxjs';

@Injectable()
export class UserEffects {
    // loadUsers$;
    loadMoreUsers$;

  constructor(private actions$: Actions, private dataService: DataService) {
    // this.loadUsers$ = createEffect(() =>
    //     this.actions$.pipe(
    //       ofType(loadUsers),
    //       mergeMap(() =>
    //         this.dataService.getUsers(0,1000).pipe(
    //           map((users) => {
    //             console.log(users.length);
    //             return loadUsersSuccess({ users })
    //           }),
    //           catchError((error) => of(loadUsersFailure({ error: error.message })))
    //         )
    //       )
    //     )
    //   );

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
