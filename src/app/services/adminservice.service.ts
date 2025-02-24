

import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AdminserviceService {
  private url = 'http://localhost:5000/users';

  constructor(private http: HttpClient){}

  addUser(user:any):Observable<any>{
    return this.http.post('http://localhost:5000/create-user',user);

  }

  checksignin(user:any):Observable<any>{
    // const username = user.username;
    // const password = user.password;
    // const body = { username, password };
    // console.log(body);
    return this.http.post('http://localhost:5000/users', user);
  }
}
