import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
export interface CandidateReport {
  name: string;
  email: string;
  assessmentDate: string;
  score: number;
  status: string;
}
 
@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = 'https://localhost:7201/api/Report/all/';
 
  constructor(private http: HttpClient) {}
 
  getCandidateReport(): Observable<CandidateReport[]> {
    return this.http.get<CandidateReport[]>('https://localhost:7201/api/Report/all');
  }
}