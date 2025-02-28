import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class AdminserviceService {
  private url = 'http://localhost:5000/users';

  constructor(private http: HttpClient, private cookieService: CookieService, ){}

  addUser(user:any):Observable<any>{
    return this.http.post('http://localhost:5000/create-user',user);

  }

  checksignin(user:any):Observable<any>{
    return this.http.post('http://localhost:5000/users', user);
  }

  getuserid(){
         const encryptUserID = this.cookieService.get('user_id');
         const decryptUserID = CryptoJS.AES.decrypt(encryptUserID, 'your-secret-key').toString(CryptoJS.enc.Utf8);
         return decryptUserID;
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
