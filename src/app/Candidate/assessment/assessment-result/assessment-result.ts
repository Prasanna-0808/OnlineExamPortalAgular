import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-assessment-result',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './assessment-result.html',
  styleUrls: ['./assessment-result.css']
})
export class AssessmentResultComponent implements OnInit {
  @Input() userId!: number;
  results: any[] = [];
  showResults: boolean = false;
  loading: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    if (!this.userId) return;

    this.loading = true;

    this.http.get<any>(`https://localhost:7201/api/ExamAttempt/${this.userId}`).subscribe({
      next: (res) => {
        console.log('API response:', res);

        // Wrap single object in array if needed
        this.results = Array.isArray(res) ? res : [res];

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
