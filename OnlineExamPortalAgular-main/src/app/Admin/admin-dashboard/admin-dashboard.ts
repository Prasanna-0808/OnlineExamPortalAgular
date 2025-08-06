import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin';
// import { AdminService } from '../../../services/admin.service'; // Adjust the path as necessary

// import { AdminService } from '../../../services/admin';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Admin } from '../admin/admin';
// import { Admin } from '../../../models/admin'; 
 
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboard implements OnInit {
  totalUsers: number = 0;
  totalAssessments: number = 0;
 
  constructor(private adminService: AdminService, private httpclient:HttpClient) {}
 
  ngOnInit(): void {
    this.adminService.getTotalUsers().subscribe({
      next: (data: number) => this.totalUsers = data,
      error: (err: any) => console.error('Error fetching total users:', err)
    });
 
    this.adminService.getTotalAssessments().subscribe({
      next: (data: number) => this.totalAssessments = data,
      error: (err: any) => console.error('Error fetching total assessments:', err)
    });
  }
}