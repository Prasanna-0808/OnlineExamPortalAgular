import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoadQuestionsService } from '../../../services/loadQuestions.service';
import { ExamAttemptService } from '../../../services/exam-attempt.service';
import { AssessmentService } from '../../../services/assessment.service';

@Component({
  selector: 'app-assessment',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, FormsModule],
  templateUrl: './assessment.html',
  styleUrls: ['./assessment.css']
})
export class Assessment implements OnInit {
  assessmentId: string = '';
  userId: number = 0;
  assignmentId: number = 0;
  attemptId: number = 0;
  completionStatus: string = '';

  questions: any[] = [];
  currentIndex: number = 0;
  loading: boolean = false;
  completed: boolean = false;
  obtainedMark: number = 0;
  passMark: number = 0;
  totalMark: number = 0;
  timerDisplay: string = '00:00';
  private timerSeconds: number = 0;
  private timerInterval: any;
  hasPassed: boolean = false;

  assessmentTitle: string = 'JAVA Basics';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private loadService: LoadQuestionsService,
    private attemptService: ExamAttemptService,
    private assessmentService: AssessmentService
  ) {}

  ngOnInit(): void {
    this.assessmentId = this.route.snapshot.paramMap.get('id') || '';
    this.userId = Number(localStorage.getItem('userId')) || 0;
    this.fetchAssignmentDetails();
  }

  fetchAssignmentDetails(): void {
    this.assessmentService.getAssignmentDetails(this.userId).subscribe({
      next: (assignments: any[]) => {
        const match = assignments.find((a: any) => a.assessmentId === Number(this.assessmentId));
        if (match) {
          this.assignmentId = match.assignmentId;
          this.completionStatus = match.completionStatus ?? '';
          this.checkPreviousAttempt();
        } else {
          console.warn('No assignment found for this assessment');
        }
      },
      error: (err: any) => console.error('Failed to fetch assignment details', err)
    });
  }

  checkPreviousAttempt(): void {
    this.attemptService.getPreviousAttempt(this.userId, this.assessmentId).subscribe({
      next: (attempt: any) => {
        if (attempt?.isPassed) {
          alert('You have already passed this assessment. Retake is not allowed.');
          this.router.navigate(['/result'], { queryParams: { userId: this.userId } });
        } else if (attempt) {
          this.attemptService.deleteAttempt(attempt.attemptId).subscribe({
            next: () => this.createExamAttempt(),
            error: (err: any) => console.error('Failed to delete previous attempt', err)
          });
        } else {
          this.createExamAttempt();
        }
      },
      error: () => {
        console.warn('No previous attempt found, creating new one');
        this.createExamAttempt();
      }
    });
  }

  createExamAttempt(): void {
    const payload = {
      userId: this.userId,
      assessmentId: Number(this.assessmentId),
      assignmentId: this.assignmentId
    };

    this.attemptService.createAttempt(payload).subscribe({
      next: (res: any) => {
        this.attemptId = res.attemptId ?? 0;
        this.loadAssessmentAndQuestions();
      },
      error: (err: any) => console.error('Failed to create exam attempt', err)
    });
  }

  loadAssessmentAndQuestions(): void {
    this.loading = true;

    this.loadService.loadAssessmentAndQuestions(this.assessmentId).subscribe({
      next: ({ passMark, totalMark, timerSeconds, questions }) => {
        this.passMark = passMark;
        this.totalMark = totalMark;
        this.timerSeconds = timerSeconds;
        this.questions = questions;
        this.cdr.detectChanges();
        this.startTimer();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  startTimer(): void {
    this.updateTimerDisplay();
    this.timerInterval = setInterval(() => {
      if (this.timerSeconds <= 0) {
        clearInterval(this.timerInterval);
        if (!this.completed) {
          this.completeAssessment();
        }
        return;
      }
      this.timerSeconds--;
      this.updateTimerDisplay();
    }, 1000);
  }

  updateTimerDisplay(): void {
    const min = Math.floor(this.timerSeconds / 60);
    const sec = this.timerSeconds % 60;
    this.timerDisplay = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  }

  submitAnswer(): void {
    if (this.completed) return;

    const currentQuestion = this.questions[this.currentIndex];
    if (currentQuestion.selectedOptionId === null) {
      alert('Please select an option before proceeding.');
      return;
    }

    const dto = {
      userId: this.userId,
      assessmentId: Number(this.assessmentId),
      questionId: currentQuestion.questionId,
      optionId: currentQuestion.selectedOptionId
    };

    this.assessmentService.submitAnswer(dto).subscribe({
      next: () => {
        this.currentIndex++;
        if (this.currentIndex >= this.questions.length) {
          clearInterval(this.timerInterval);
          this.completeAssessment();
        }
      },
      error: (err: any) => {
        console.error('Failed to submit answer', err);
        alert('Submission failed. Try again.');
      }
    });
  }

  completeAssessment(): void {
    this.completed = true;

    this.assessmentService.getObtainedMark(this.assessmentId, this.userId).subscribe({
      next: (res: any) => {
        this.obtainedMark = res.obtainedMark ?? 0;
        this.hasPassed = this.passMark > 0 && this.obtainedMark >= this.passMark;
        this.updateExamAttemptStatus();
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Failed to fetch obtained mark', err);
        this.obtainedMark = 0;
        this.hasPassed = false;
        this.cdr.detectChanges();
      }
    });
  }

  updateExamAttemptStatus(): void {
    const payload = {}; // Extend if needed
    this.attemptService.updateAttemptStatus(this.userId, this.assessmentId, payload).subscribe({
      next: () => console.log('Exam attempt updated'),
      error: (err: any) => console.error('Failed to update exam attempt', err)
    });
  }

  retakeAssessment(): void {
    if (this.hasPassed) {
      alert('You have already passed. Retake is not allowed.');
      return;
    }

    this.assessmentService.deletePreviousResponses(this.userId, this.assessmentId).subscribe({
      next: () => {
        console.log('Previous responses deleted. Retaking assessment...');
        this.resetState();
        this.fetchAssignmentDetails();
      },
      error: (err: any) => {
        console.error('Failed to delete previous responses', err);
        alert('Could not reset assessment. Try again.');
      }
    });
  }

  resetState(): void {
    this.questions = [];
    this.currentIndex = 0;
    this.completed = false;
    this.obtainedMark = 0;
    this.hasPassed = false;
    this.timerSeconds = 0;
    this.timerDisplay = '00:00';
    clearInterval(this.timerInterval);
  }

  goToPrev(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  goToNext(): void {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
    }
  }

  goToQuestion(index: number): void {
    this.currentIndex = index;
  }

  goToResult(): void {
    this.router.navigate(['/result'], {
      queryParams: { userId: this.userId,assessmentId:this.assessmentId }
      
    });
    console.log('Navigating to result with:', this.userId, this.assessmentId);

  }

  get isTimeCritical(): boolean {
    return this.timerSeconds <= 60;
  }

  saveAnswer(question: any): void {
    console.log('Auto-saving answer for question:', question.questionId, 'Selected:', question.selectedOptionId);
  }
}
