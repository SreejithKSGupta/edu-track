import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  private readonly url = 'http://localhost:5000';

  constructor(private http: HttpClient){}

  getUsers(start: number, limit: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/students?_start=${start}&_limit=${limit}`);
  }

  addStudent(studentData: any): Observable<User> {
    return this.http.post<User>(`${this.url}/create-student`, studentData);
  }

  getStudentById(studentId: string): Observable<User> {
    console.log(studentId);
    return this.http.get<User>(`${this.url}/students/${studentId}`);
  }

  updateStudentById(_id: string, data: any): Observable<User>{
    console.log(data, _id);
    debugger
    return this.http.put<User>(`${this.url}/students/${_id}`, data);
  }
}
