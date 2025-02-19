import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DataService } from '../services/data.service';
import { loadUsers, loadUsersSuccess, loadUsersFailure } from './user.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class UserEffects {
    loadUsers$;
  constructor(private actions$: Actions, private dataService: DataService) {
    this.loadUsers$ = createEffect(() =>
        this.actions$.pipe(
          ofType(loadUsers),
          mergeMap(() =>
            this.dataService.getUsers().pipe(
              map((users) => {
                console.log(users);
                return loadUsersSuccess({ users })
              }),
              catchError((error) => of(loadUsersFailure({ error: error.message })))
            )
          )
        )
      );
  }

  
}
