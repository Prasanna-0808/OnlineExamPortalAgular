import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-assessment-result',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './assessment-result.html',
  styleUrls: ['./assessment-result.css']
})
export class AssessmentResultComponent implements OnInit {
  @Input() userId!: number;
  @Input() assessmentId!: number;

  results: any[] = [];
  showResults: boolean = false;
  loading: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    if (!this.userId || !this.assessmentId) {
      console.warn('Missing userId or assessmentId');
      return;
    }

    this.loading = true;

    this.http.get<any[]>(`https://localhost:7201/api/ExamAttempt/ExamAttempted`).subscribe({
      next: (res) => {
        // Filter results by userId and assessmentId
        this.results = res.filter(r =>
          String(r.userId) === String(this.userId) &&
          String(r.assessmentId) === String(this.assessmentId)
        );
        this.showResults = true;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to fetch results', err);
        this.loading = false;
      }
    });
  }
}
