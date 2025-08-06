import { Component, OnInit, Inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
 
import { HttpClient } from '@angular/common/http';    
import { RouterLink,RouterLinkActive} from '@angular/router';
// import { ApproveInstructor } from '../approve-instructor/approve-instructor'
import { ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin';

 import { AdminDashboard } from '../admin-dashboard/admin-dashboard';
 
 
 
export class SidebarComponent {}
 
@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.html',
  styleUrls: ['./admin.css'],
  imports: [HttpClientModule, RouterLink, RouterLinkActive]
,
  providers: [AdminService],
})
 
export class Admin implements OnInit {
  totalUsers: number = 0;
  totalAssessments: number = 0;
 
  constructor(private http: HttpClient) {}
 
  ngOnInit(): void {
    this.fetchDashboardData();
  }
 
  fetchDashboardData(): void {
    // Fetch total users
    this.http.get<number>('https://localhost:7201/api/User/totalUsers').subscribe({
      next: (data) => (this.totalUsers = data),
      error: (err) => console.error('Error fetching total users:', err),
    });
 
    // Fetch total assessments
    this.http.get<number>('https://localhost:7201/api/Assessment/totalAssessments').subscribe({
      next: (data) => (this.totalAssessments = data),
      error: (err) => console.error('Error fetching total assessments:', err),
    });
  }
}