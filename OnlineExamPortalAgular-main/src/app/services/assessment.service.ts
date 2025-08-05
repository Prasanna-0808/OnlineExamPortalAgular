// src/app/services/assessment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AssessmentService {
  private baseUrl = 'https://localhost:7201/api';

  constructor(private http: HttpClient) {}

  getUserProfile(email: string): Observable<any> {
    const url = `${this.baseUrl}/User/GetUser${email}`;
    return this.http.get<any>(url);
  }

  getAssignedAssessments(userId: number): Observable<any[]> {
    const url = `${this.baseUrl}/Assessment/assigned/user/${userId}`;
    return this.http.get<any[]>(url);
  }

  getAssignmentDetails(userId: number): Observable<any[]> {
    const url = `${this.baseUrl}/AssessmentAssignment/user/${userId}`;
    return this.http.get<any[]>(url);
  }

  enrollUserToAssessment(userId: number, assessmentId: number): Observable<any> {
    const url = `${this.baseUrl}/AssessmentAssignment/enroll?userId=${userId}&assessmentId=${assessmentId}`;
    return this.http.post(url, null);
  }

  getObtainedMark(assessmentId: string, userId: number): Observable<any> {
    const url = `${this.baseUrl}/Assessment/${assessmentId}/user/${userId}/obtainedmark`;
    return this.http.get<any>(url);
  }

  updateAssessmentStatus(userId: number, assessmentId: string, status: string): Observable<any> {
    const url = `${this.baseUrl}/AssessmentStatus/user/${userId}/assessment/${assessmentId}`;
    const payload = { status };
    return this.http.put(url, payload);
  }

  submitAnswer(dto: any): Observable<any> {
    const url = `${this.baseUrl}/response`;
    return this.http.post<any>(url, dto);
  }

  deletePreviousResponses(userId: number, assessmentId: string): Observable<any> {
    const url = `${this.baseUrl}/response/user/${userId}/assessment/${assessmentId}`;
    return this.http.delete(url);
  }
}
