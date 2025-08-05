
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';

import { AssessmentResultComponent } from '../assessment-result/assessment-result';

import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-enrolled-assessments',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule,AssessmentResultComponent],
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

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadProfile();
  } 

  loadProfile(): void {
    this.http.get<any>(`https://localhost:7201/api/User/GetUser${this.email}`).subscribe({
      next: (res) => {
        this.profile = res;
        this.loadAssessments();
        this.loadCompletionStatus();
      },
      error: (err) => console.error('Profile load failed', err)
    });
  }
  loadAssessments(): void {
    this.http.get<any[]>(`https://localhost:7201/api/Assessment/assigned/user/${this.profile.userId}`).subscribe({
      next: (res) => {
        console.log('Assessments:', res); // 👈 Check field names
        this.assessments = res;
      },
      error: (err) => console.error('Assessments load failed', err)
    });
  }
  

  loadCompletionStatus(): void {
    this.http.get<any[]>(`https://localhost:7201/api/AssessmentAssignment/user/${this.profile.userId}`).subscribe({
      next: (res) => {
        console.log('Completion status:', res); // 👈 Check field names and values
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
    const url = `https://localhost:7201/api/AssessmentAssignment/enroll?userId=${this.profile.userId}&assessmentId=${assessmentId}`;
    this.http.post(url, null).subscribe({
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

  // takeAssessment(assessmentId: number): void {
  //   const isCompleted = this.getCompletionStatus(assessmentId);
  //   console.log('Clicked assessment:', assessmentId, 'Completed:', isCompleted);
  //   if (!isCompleted) {
  //     this.router.navigate(['/assessment', assessmentId]).then(success => {
  //       console.log('Navigation success:', success);
  //     });
  //   } else {
  //     alert('You have already completed this assessment.');
  //   }
  // }


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
    this.selectedAssessmentId = assessmentId;
    this.showResult = true;
  }
  
  
}
