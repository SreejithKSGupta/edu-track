import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  private url = 'http://localhost:5000';
  // private url = 'http://localhost:3000/students';

  constructor(private http: HttpClient){}

  getUsers(start: number, limit: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/student?_start=${start}&_limit=${limit}`);
  }

  addStudent(studentData: any): Observable<User> {
    return this.http.post<User>(`${this.url}/create-student`, studentData);
  }

  getStudentById(studentId: string): Observable<User> {
    return this.http.get<User>(`${this.url}/students/${studentId}`);
  }
}