import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DataService } from '../services/data.service';
import { loadUsers, loadUsersSuccess, loadUsersFailure, loadMoreUsers, loadMoreUsersSuccess, loadMoreUsersFailure } from './user.actions';
import { catchError, delay, map, mergeMap, of, take } from 'rxjs';

@Injectable()
export class UserEffects {
    loadUsers$;
    loadMoreUsers$;

  constructor(private actions$: Actions, private dataService: DataService) {
    this.loadUsers$ = createEffect(() =>
        this.actions$.pipe(
          ofType(loadUsers),
          mergeMap(() =>
            this.dataService.getUsers(0,100).pipe(
              map((users) => {
                console.log(users.length);
                return loadUsersSuccess({ users })
              }),
              catchError((error) => of(loadUsersFailure({ error: error.message })))
            )
          )
        )
      );

      this.loadMoreUsers$ = createEffect(() =>
        this.actions$.pipe(
          ofType(loadMoreUsers),
          delay(2000), 
          mergeMap(() =>{
            
            return this.dataService.getUsers(100, Number.MAX_SAFE_INTEGER).pipe( 
              take(1),
              map(users => {
                console.log(users.length);
                return loadMoreUsersSuccess({ users })  
              }),
              catchError(error => of(loadMoreUsersFailure({ error: error.message })))
            )
          })
        )
      );
  }
}
