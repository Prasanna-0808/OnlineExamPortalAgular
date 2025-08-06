import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class ApproveInstructorService {
  private baseUrl = 'https://localhost:7201/api/InstructorRequestView';
 
  constructor(private http: HttpClient) {}
 
  // Fetch instructor requests
 
getInstructorRequests(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/getRequest`);
}
 
 
  // Approve instructor
  approveInstructor(userId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/approve/approve` ,userId );
  }
 
  // Reject instructor
  rejectInstructor(userId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/reject`,  userId );
  }
}