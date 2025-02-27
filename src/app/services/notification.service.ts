import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient){}
  private readonly url = "http://localhost:5000";

  getnotifications(): Observable<any[]>{
    return this.http.get<any[]>(`${this.url}/notifications`);
  }

  sendnotification(notification: any): Observable<any> {
    return this.http.post<any>(`${this.url}/send-notification`, notification);
  }
  }
