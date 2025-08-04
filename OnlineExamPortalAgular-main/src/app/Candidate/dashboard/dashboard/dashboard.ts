import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {
  email = localStorage.getItem('userEmail') || '';
  profile: any = {};
  assessments: any[] = [];
  packages: any[] = [];
  completion: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadDashboardData();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (event.urlAfterRedirects.includes('/dashboard')) {
        this.loadDashboardData();
      }
    });
  }

  loadDashboardData(): void {
    this.loadProfile();
    this.loadPackages();
  }

  loadProfile() {
    this.http.get<any>(`https://localhost:7201/api/User/GetUser${this.email}`).subscribe({
      next: (res) => {
        this.profile = res;
        this.loadAssessments();
        this.CompletionStatus();
      },
      error: (err) => console.error('Profile load failed', err)
    });
  }

  loadAssessments() {
    if (!this.profile.userId) return;

    this.http.get<any[]>(`https://localhost:7201/api/Assessment/assigned/user/${this.profile.userId}`).subscribe({
      next: (res) => this.assessments = res,
      error: (err) => console.error('Assessments load failed', err)
    });
  }

  loadPackages() {
    this.http.get<any[]>(`https://localhost:7201/api/AssessmentPackage`).subscribe({
      next: (res) => this.packages = res,
      error: (err) => console.error('Packages load failed', err)
    });
  }

  CompletionStatus() {
    this.http.get<any[]>(`https://localhost:7201/api/AssessmentAssignment/user/${this.profile.userId}`).subscribe({
      next: (res) => this.completion = res,
      error: (err) => console.error('Completion status load failed', err)
    });
  }

  getCompletionStatus(assessmentId: any): boolean {
    const match = this.completion.find(c =>
      String(c.assessmentId) === String(assessmentId) &&
      String(c.userId) === String(this.profile.userId)
    );
    return match?.isCompleted === true;
  }

  isEnrolled(assessmentId: number): boolean {
    return this.completion.some(c =>
      String(c.assessmentId) === String(assessmentId) &&
      String(c.userId) === String(this.profile.userId)
    );
  }

  enrollAssessment(assessmentId: number): void {
    const userId = this.profile.userId;
    const url = `https://localhost:7201/api/AssessmentAssignment/enroll?userId=${userId}&assessmentId=${assessmentId}`;

    this.http.post(url, null).subscribe({
      next: () => {
        alert('Enrollment successful!');
        this.CompletionStatus(); // Refresh enrollment data
      },
      error: (err) => {
        console.error('Enrollment failed', err);
        alert('Could not enroll. Try again.');
      }
    });
  }

  // ✅ NEW METHOD: Redirect to assessment if not completed
  takeAssessment(assessmentId: number): void {
    const isCompleted = this.getCompletionStatus(assessmentId);
    if (!isCompleted) {
      this.router.navigate(['/assessment', assessmentId]); // ✅ Redirect to assessment page
    } else {
      alert('You have already completed this assessment.');
    }
  }
}
