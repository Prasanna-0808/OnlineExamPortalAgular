import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
 
@Injectable({
  providedIn: 'root'
})
export class InstructorAssessmentService {
  private baseUrl = 'https://localhost:7201/api/Assessment';
 
  constructor(private http: HttpClient) {}
 
  // ✅ Get all assessments
  getAllAssessments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/AllAssessments`).pipe(
      catchError((error) => {
        console.error('Error fetching assessments:', error);
        return throwError(() => new Error('Failed to load assessments.'));
      })
    );
  }
 
  // ✅ Create new assessment
  addAssessment(assessment: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/CreateAssesment`, assessment).pipe(
      catchError((error) => {
        console.error('Error creating assessment:', error);
        return throwError(() => new Error('Failed to create assessment.'));
      })
    );
  }
 
  // ✅ Get assessment by ID
  getAssessmentById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`).pipe(
      catchError((error) => {
        console.error(`Error fetching assessment with ID ${id}:`, error);
        return throwError(() => new Error('Failed to load assessment.'));
      })
    );
  }
 
  // ✅ Update assessment by ID
  updateAssessment(id: number, assessment: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/UpdateAssessment/${id}`, assessment).pipe(
      catchError((error) => {
        console.error(`Error updating assessment with ID ${id}:`, error);
        return throwError(() => new Error('Failed to update assessment.'));
      })
    );
  }
 
  // ✅ Delete assessment by ID
  deleteAssessment(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/DeleteAssesment/${id}`)
.pipe(
      catchError((error) => {
        console.error(`Error deleting assessment with ID ${id}:`, error);
        return throwError(() => new Error('Failed to delete assessment.'));
      })
    );
  }
}
 