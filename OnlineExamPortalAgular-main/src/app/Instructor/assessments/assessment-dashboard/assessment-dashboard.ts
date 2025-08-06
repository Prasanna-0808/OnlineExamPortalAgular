import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

import { Instructor } from '../../instructor/instructor';
import { InstructorAssessmentService } from '../../../services/instructor-assessment-service';
 
 
@Component({
  selector: 'app-assessment',
  standalone: true,
  imports: [CommonModule, RouterModule,Instructor,RouterLink],
  templateUrl: './assessment-dashboard.html',
  styleUrls: ['./assessment-dashboard.css'],
})
export class Assessment implements OnInit {
  assessments: any[] = [];
  errorMessage: string = '';
 
  constructor(private service: InstructorAssessmentService) {}
 
  ngOnInit(): void {
    this.loadAssessments();
  }
 
  loadAssessments(): void {
    this.service.getAllAssessments().subscribe({
      next: (data) => this.assessments = data,
      error: (err) => this.errorMessage = 'Failed to load assessments.'
    });
  }
 
  deleteAssessment(id: number): void {
    if (confirm('Are you sure you want to delete this assessment?')) {
      this.service.deleteAssessment(id).subscribe({
        next: () => {
          alert('Assessment deleted successfully!');
          this.loadAssessments();
        },
        error: (err) => {
          console.error('Delete error:', err);
          alert('Failed to delete assessment.');
        }
      });
    }
  }
 
 
  getAssessmentType(type: number): string {
    switch (type) {
      case 0: return 'Quiz';
      case 1: return 'Assignment';
      case 2: return 'Interview';
      default: return 'Unknown';
    }
  }
}