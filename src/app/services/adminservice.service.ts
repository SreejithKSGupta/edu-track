

import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AdminserviceService {
  private url = 'http://localhost:5000/users';

  constructor(private http: HttpClient, private cookieService: CookieService){}

  addUser(user:any):Observable<any>{
    return this.http.post('http://localhost:5000/create-user',user);

  }

  checksignin(user:any):Observable<any>{
    return this.http.post('http://localhost:5000/users', user);
  }


  checkauth(){
    if (typeof window !== 'undefined') {
      const encryptedUsername = this.cookieService.get('username');
      if (encryptedUsername) {
        return true;
      }
    }
    return false;

  }
}
