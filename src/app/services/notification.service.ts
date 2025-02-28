import { AdminserviceService } from './adminservice.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly url = "http://localhost:5000";
  userid='';
  constructor(private http: HttpClient,private adminservice:AdminserviceService){
    this.userid =  this.adminservice.getuserid();
  }

  getnotifications(): Observable<any[]>{
    return this.http.get<any[]>(`${this.url}/notifications`);
  }

  sendnotification(notification: any): Observable<any> {
    return this.http.post<any>(`${this.url}/send-notification`, notification);
  }

  getnotificationcount(): Observable<number> {
    return this.getnotifications().pipe(
      map((res) => {
        let notifications = res.filter((notif) => !notif.read.includes(this.userid));
        return notifications.length;
      })
    );
  }

  markNotifAsRead(notifId: string) {
    const apiUrl = "http://localhost:5000/read-notification";
    const payload = { user_id: this.userid }; // Ensure this.userid is defined

    console.log("Marking notification as read:", this.userid, notifId);

    this.http.put(apiUrl + `/${notifId}`, payload).subscribe({
      next: (response) => {
        console.log("Notification marked as read:", response);
      },
      error: (error) => {
        console.error("Error marking notification as read:", error);
      }
    });
  }

}
