import { AfterContentInit, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApproveInstructorService } from '../../services/approve-instructor';
 
@Component({
  selector: 'app-approve-instructor',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './approve-instructor.html',
  styleUrls: ['./approve-instructor.css'],
})
export class ApproveInstructor implements AfterContentInit{
  instructorRequests: any[] = [];
 
  constructor(private approveInstructorService: ApproveInstructorService) {}
 
  ngAfterContentInit(): void {
    this.fetchInstructorRequests();
  }
 
  // Fetch instructor requests
 
fetchInstructorRequests(): void {
  this.approveInstructorService.getInstructorRequests().subscribe({
    next: (data) => (this.instructorRequests = data),
    error: (err) => console.error('Error fetching instructor requests:', err),
  });
}
 
 
  // Approve instructor
  approveInstructor(userId: string): void {
    this.approveInstructorService.approveInstructor(userId).subscribe({
      next: () => {
        alert(`Instructor ${userId} approved.`);
        this.fetchInstructorRequests(); // Refresh list
      },
      error: (err) => console.error('Approval failed:', err),
    });
  }
 
  // Reject instructor
  rejectInstructor(userId: string): void {
    this.approveInstructorService.rejectInstructor(userId).subscribe({
      next: () => {
        alert(`Instructor ${userId} rejected.`);
        this.fetchInstructorRequests(); // Refresh list
      },
      error: (err) => console.error('Rejection failed:', err),
    });
  }
}
 
