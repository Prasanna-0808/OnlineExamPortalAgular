import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../core/models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  register(user: User): Observable<any> {
    return this.http.post('https://localhost:7201/api/User/register', user);
  }
}
