import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
export interface User {
 
  name: string;
  email: string;
}
 
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:7201/api/User';
 
  constructor(private http: HttpClient) {}
 
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('https://localhost:7201/api/User/AllUserDetails');
  }
 
 
deleteUser(email: string): Observable<void> {
  return this.http.delete<void>(`https://localhost:7201/api/User/deleteUser?email=${email}`);
}
 
}