import { Injectable, Signal, signal, computed, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminserviceService } from './adminservice.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly url = "http://localhost:5000";
  userid = '';

  notifications = signal<any[]>([]);

  unreadCount = computed(() =>
    this.notifications().filter(notif => !notif.read.includes(this.userid)).length
  );

  constructor(private http: HttpClient, private adminservice: AdminserviceService) {
    this.userid = this.adminservice.getuserid();
    this.fetchNotifications();
  }

  fetchNotifications(): void {
    this.http.get<any[]>(`${this.url}/notifications`).subscribe({
      next: (data) => this.notifications.set(data),
      error: (err) => console.error("Error fetching notifications:", err)
    });
  }

  sendnotification(notification: any): Observable<any> {
    return this.http.post<any>(`${this.url}/send-notification`, notification);
  }



  markNotifAsRead(notifId: string): void {
    const apiUrl = `${this.url}/read-notification/${notifId}`;
    const payload = { user_id: this.userid };

    this.http.put(apiUrl, payload).subscribe({
      next: () => {
        console.log("Notification marked as read:", notifId);
        this.notifications.update(notifs =>
          notifs.map(notif =>
            notif._id === notifId
              ? { ...notif, read: [...notif.read, this.userid] } // Mark as read
              : notif
          )
        );
      },
      error: (error) => console.error("Error marking notification as read:", error)
    });
  }

}
