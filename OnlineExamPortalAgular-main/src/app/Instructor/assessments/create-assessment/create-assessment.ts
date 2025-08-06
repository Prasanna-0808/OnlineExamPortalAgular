import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { InstructorAssessmentService } from '../../../services/instructor-assessment-service';

@Component({
  selector: 'app-create-assessment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './create-assessment.html',
  styleUrls: ['./create-assessment.css']
})
export class CreateAssessment implements OnInit {
  assessmentForm!: FormGroup;
  isEditMode = false;
  assessmentId!: number;
 
  constructor(
    private fb: FormBuilder,
    private service: InstructorAssessmentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
 
  ngOnInit(): void {
    this.assessmentForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      assessmentType: [0, Validators.required],
      status: ['Scheduled', Validators.required],
      scheduledDate: ['', Validators.required],
      endTime: ['', Validators.required],
      duration: [60, Validators.required],
      maxMark: [100, Validators.required],
      passMark: [40, Validators.required]
    });
 
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.isEditMode = true;
        this.assessmentId = +id;
        console.log('Editing assessment with ID:', this.assessmentId);
        this.loadAssessment(this.assessmentId);
      }
    });
  }
  loadAssessment(id: number): void {
    this.service.getAssessmentById(id).subscribe({
      next: (data) => {
        this.assessmentForm.patchValue(data);
      },
      error: () => {
        alert('Failed to load assessment details.');
      }
    });
  }
 
  submitForm(): void {
    if (this.assessmentForm.valid) {
      const payload = this.assessmentForm.value;
 
      if (this.isEditMode) {
        this.service.updateAssessment(this.assessmentId, payload).subscribe({
          next: () => {
            alert('Assessment updated successfully!');
            this.router.navigate(['/assessment']);
          },
          error: () => {
            alert('Failed to update assessment.');
          }
        });
      } else {
        this.service.addAssessment(payload).subscribe({
          next: () => {
            alert('Assessment created successfully!');
            this.router.navigate(['/assessment']);
          },
          error: () => {
            alert('Failed to create assessment.');
          }
        });
      }
    } else {
      alert('Please fill all required fields.');
    }
  }
}
 