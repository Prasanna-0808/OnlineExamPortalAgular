import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, switchMap, catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadQuestionsService {
  constructor(private http: HttpClient) {}

  loadAssessmentAndQuestions(assessmentId: string): Observable<{
    passMark: number;
    totalMark: number;
    timerSeconds: number;
    questions: any[];
  }> {
    return this.http.get<any>(`https://localhost:7201/api/Assessment/${assessmentId}`).pipe(
      map((assessmentArray: any) => Array.isArray(assessmentArray) ? assessmentArray[0] : assessmentArray),
      switchMap((assessment) => {
        const passMark = assessment.passMark ?? 0;
        const totalMark = assessment.maxMark ?? 0;
        const timerSeconds = typeof assessment.duration === 'number' && assessment.duration > 0 ? assessment.duration : 900;

        return this.http.get<any[]>(`https://localhost:7201/api/Assessment/${assessmentId}/questions`).pipe(
          map((questions) => questions.map(q => ({ ...q, selectedOptionId: null }))),
          map((questions) => ({ passMark, totalMark, timerSeconds, questions })),
          catchError(err => {
            console.error('Failed to load questions', err);
            return of({ passMark, totalMark, timerSeconds, questions: [] });
          })
        );
      }),
      catchError(err => {
        console.error('Failed to load assessment details', err);
        return of({ passMark: 0, totalMark: 0, timerSeconds: 900, questions: [] });
      })
    );
  }
}
