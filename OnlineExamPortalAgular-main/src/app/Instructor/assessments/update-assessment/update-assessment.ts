import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InstructorAssessmentService } from '../../../services/instructor-assessment-service';

 
@Component({
  selector: 'app-update-assessment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './update-assessment.html',
  styleUrls: ['./update-assessment.css']
})
export class UpdateAssessmentComponent implements OnInit {
  assessmentForm!: FormGroup;
  assessmentId!: number;
 
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: InstructorAssessmentService
  ) {}
 
  ngOnInit(): void {
    this.assessmentId = +this.route.snapshot.paramMap.get('id')!;
    this.assessmentForm = this.fb.group({
      title: [''],
      description: [''],
      assessmentType: [0],
      status: [''],
      scheduledDate: [''],
      endTime: [''],
      duration: [0],
      maxMark: [0],
      passMark: [0]
    });
 
    this.service.getAssessmentById(this.assessmentId).subscribe({
      next: (data) => this.assessmentForm.patchValue(data),
      error: () => alert('Failed to load assessment.')
    });
  }
 
  submitForm(): void {
    if (this.assessmentForm.valid) {
      const formValue = {
        ...this.assessmentForm.value,
        scheduledDate: new Date(this.assessmentForm.value.scheduledDate),
        endTime: new Date(this.assessmentForm.value.endTime)
      };
 
      this.service.updateAssessment(this.assessmentId, formValue).subscribe({
        next: (res) => {
          console.log('Update response:', res);
          if (res && res.message && res.title) {
            alert(`${res.message}\nTitle: ${res.title}`);
          } else {
            alert('Assessment updated successfully.');
          }
          this.router.navigate(['/assessment']);
        },
        error: (err) => {
          console.error('Update error:', err);
          alert(`Failed to update assessment.\nError: ${err.message || err}`);
        }
      });
    }
  }
}