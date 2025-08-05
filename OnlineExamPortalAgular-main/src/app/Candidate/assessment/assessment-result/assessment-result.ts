// src/app/components/assessment-result/assessment-result.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ExamAttemptService } from '../../../services/exam-attempt.service';

@Component({
  selector: 'app-assessment-result',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './assessment-result.html',
  styleUrls: ['./assessment-result.css']
})
export class AssessmentResultComponent implements OnInit {
  userId!: number;
  assessmentId!: number;

  results: any[] = [];
  showResults: boolean = false;
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private examAttemptService: ExamAttemptService
  ) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.queryParamMap.get('userId')) || 0;
    this.assessmentId = Number(this.route.snapshot.queryParamMap.get('assessmentId')) || 0;

    console.log('Query Params:', this.userId, this.assessmentId);

    if (!this.userId || !this.assessmentId) {
      console.warn('Missing query params');
      return;
    }

    this.loading = true;

    this.examAttemptService.getAllAttempts().subscribe({
      next: (res) => {
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
