import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient){}

  notificationurl = "http://localhost:5000/notifications"
  sendnotificationurl="http://localhost:5000/send-notification";

  getnotifications(): Observable<any[]>{
    return this.http.get<any[]>(this.notificationurl);
  }

  sendnotification(notification: any): Observable<any> {
    return this.http.post<any>(this.sendnotificationurl, notification);
  }

  getnotificationcount(): Observable<number> {
    return this.http.get<any[]>(this.notificationurl).pipe(
      map(res => res.length)
    );
  }
}
