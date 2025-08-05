// src/app/components/enrolled-assessments/enrolled-assessments.component.ts
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AssessmentService } from '../../../services/assessment.service';
import { AssessmentResultComponent } from '../assessment-result/assessment-result';

@Component({
  selector: 'app-enrolled-assessments',
  standalone: true,
  imports: [CommonModule, RouterModule, AssessmentResultComponent],
  templateUrl: './enrolled-assessments.html',
  styleUrls: ['./enrolled-assessments.css']
})
export class EnrolledAssessmentsComponent implements OnInit {
  email = localStorage.getItem('userEmail') || '';
  profile: any = {};
  assessments: any[] = [];
  completion: any[] = [];

  @Output() enroll = new EventEmitter<number>();
  @Output() take = new EventEmitter<number>();

  selectedAssessmentId: number | null = null;
  showResult: boolean = false;

  constructor(
    private router: Router,
    private assessmentService: AssessmentService
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.assessmentService.getUserProfile(this.email).subscribe({
      next: (res) => {
        this.profile = res;
        this.loadAssessments();
        this.loadCompletionStatus();
      },
      error: (err) => console.error('Profile load failed', err)
    });
  }

  loadAssessments(): void {
    this.assessmentService.getAssignedAssessments(this.profile.userId).subscribe({
      next: (res) => {
        console.log('Assessments:', res);
        this.assessments = res;
      },
      error: (err) => console.error('Assessments load failed', err)
    });
  }

  loadCompletionStatus(): void {
    this.assessmentService.getAssignmentDetails(this.profile.userId).subscribe({
      next: (res) => {
        console.log('Completion status:', res);
        this.completion = res;
      },
      error: (err) => console.error('Completion status load failed', err)
    });
  }

  isEnrolled(assessmentId: number): boolean {
    return this.completion.some(c =>
      String(c.assessmentId) === String(assessmentId) &&
      String(c.userId) === String(this.profile.userId)
    );
  }

  getCompletionStatus(assessmentId: number): boolean {
    const match = this.completion.find(c =>
      String(c.assessmentId) === String(assessmentId) &&
      String(c.userId) === String(this.profile.userId)
    );
    return match?.isCompleted === true;
  }

  enrollAssessment(assessmentId: number): void {
    this.assessmentService.enrollUserToAssessment(this.profile.userId, assessmentId).subscribe({
      next: () => {
        alert('Enrollment successful!');
        this.loadCompletionStatus();
      },
      error: (err) => {
        console.error('Enrollment failed', err);
        alert('Could not enroll. Try again.');
      }
    });
  }

  takeAssessment(assessmentId: number): void {
    this.showResult = false;
    const isCompleted = this.getCompletionStatus(assessmentId);
    if (!isCompleted) {
      this.router.navigate(['/assessment', assessmentId]);
    } else {
      alert('You have already completed this assessment.');
    }
  }

  viewResult(assessmentId: number): void {
    if (!this.profile?.userId || !assessmentId) {
      console.warn('Missing userId or assessmentId');
      return;
    }

    this.router.navigate(['/result'], {
      queryParams: {
        userId: this.profile.userId,
        assessmentId: assessmentId
      }
    });
  }

  image="./assets/Man.png";
}
