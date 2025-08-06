import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
 
import { map } from 'rxjs/operators';
 
 
@Injectable({ providedIn: 'root' })
export class AdminService {
  private baseUrl = 'https://localhost:7201/api/User/register'; // Replace with your actual API URL
 
  constructor(private http: HttpClient) {}
 
 
  getTotalUsers(): Observable<number> {
    return this.http.get<any[]>('https://localhost:7201/api/User/AllUserDetails')
      .pipe(
        map(users => users.length)
      );
  }
 
 
 
 
getTotalAssessments(): Observable<number> {
  return this.http.get<any[]>('https://localhost:7201/api/Assessment/AllAssessments')
    .pipe(
      map(assessments => assessments.length)
    );
}
 
 
  getInstructorRequests(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7201/api/InstructorRequestView/getRequest');
  }
 
 
  }