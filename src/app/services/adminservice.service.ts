

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

  addUser(user:any){
    localStorage.setItem('user', JSON.stringify(user));

    console.log(user);
    // return this.http.post(this.url,user).subscribe();
    console.log('Account created:', user.username);

  }

  checksignin(user:any):Observable<any>{
     return this.http.post('http://localhost:5000/checksignin',user);
  }
}
