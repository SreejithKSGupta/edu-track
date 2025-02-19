import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com' },
    { id: 4, name: 'John Doe', email: 'john@example.com' },
    { id: 5, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 6, name: 'Alice Johnson', email: 'alice@example.com' },
    { id: 7, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 8, name: 'Alice Johnson', email: 'alice@example.com' },
    { id: 9, name: 'John Doe', email: 'john@example.com' },
    { id: 10, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 11, name: 'Alice Johnson', email: 'alice@example.com' },
    { id: 12, name: 'John Doe', email: 'john@example.com' },
    { id: 13, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 14, name: 'Alice Johnson', email: 'alice@example.com' },
    { id: 15, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 16, name: 'Alice Johnson', email: 'alice@example.com' },
  ];

  getUsers(): Observable<User[]> {
    return of(this.users);
  }
}