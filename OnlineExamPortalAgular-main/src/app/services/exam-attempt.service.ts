// src/app/services/exam-attempt.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ExamAttemptService {
  private baseUrl = 'https://localhost:7201/api/ExamAttempt';

  constructor(private http: HttpClient) {}

  getPreviousAttempt(userId: number, assessmentId: string): Observable<any> {
    const url = `${this.baseUrl}/user/${userId}/assessment/${assessmentId}`;
    return this.http.get<any>(url);
  }

  getAllAttempts(): Observable<any[]> {
    const url = `${this.baseUrl}/ExamAttempted`;
    return this.http.get<any[]>(url);
  }

  deleteAttempt(attemptId: number): Observable<any> {
    const url = `${this.baseUrl}/${attemptId}`;
    return this.http.delete(url);
  }

  createAttempt(payload: { userId: number; assessmentId: number; assignmentId: number }): Observable<any> {
    const url = `${this.baseUrl}/create-attempt`;
    return this.http.post<any>(url, payload);
  }

  updateAttemptStatus(userId: number, assessmentId: string, payload: any): Observable<any> {
    const url = `${this.baseUrl}/update-status?userId=${userId}&assessmentId=${assessmentId}`;
    return this.http.post(url, payload);
  }
}
