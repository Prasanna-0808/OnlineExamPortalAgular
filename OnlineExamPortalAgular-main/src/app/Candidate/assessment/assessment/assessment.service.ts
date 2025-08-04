import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from './assessment.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AssessmentService {
  constructor(private http: HttpClient) {}

  // ✅ UPDATED: Accept assessmentId
  getQuestions(assessmentId: string): Observable<Question[]> {
    return this.http.get<Question[]>(`https://localhost:7201/api/Assessment/${assessmentId}/questions`);
  }

  // ✅ UPDATED: Include assessmentId in submission
  submitAnswers(assessmentId: string, answers: Question[]): Observable<any> {
    return this.http.post(`https://localhost:7201/api/Assessment/${assessmentId}/submit`, answers);
  }

  hasCompletedAssessment(userId: string, assessmentId: string): Observable<boolean> {
    return this.http.get<boolean>(`https://localhost:7201/api/Assessment/status/${userId}/${assessmentId}`);
  }
}
