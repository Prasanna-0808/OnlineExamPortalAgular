import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

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

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.assessmentId = this.route.snapshot.paramMap.get('id') || '';
    this.userId = Number(localStorage.getItem('userId')) || 0;
    this.fetchAssignmentDetails();
  }

  fetchAssignmentDetails(): void {
    const url = `https://localhost:7201/api/AssessmentAssignment/user/${this.userId}`;
    this.http.get<any[]>(url).subscribe({
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
    const url = `https://localhost:7201/api/ExamAttempt/user/${this.userId}/assessment/${this.assessmentId}`;
    this.http.get<any>(url).subscribe({
      next: (attempt: any) => {
        if (attempt && attempt.isPassed) {
          alert('You have already passed this assessment. Retake is not allowed.');
          this.router.navigate(['/result'], { queryParams: { userId: this.userId } });
        } else if (attempt && !attempt.isPassed) {
          this.deletePreviousAttempt(attempt.attemptId);
        } else {
          this.createExamAttempt();
        }
      },
      error: (err: any) => {
        console.warn('No previous attempt found, creating new one');
        this.createExamAttempt();
      }
    });
  }

  deletePreviousAttempt(attemptId: number): void {
    const url = `https://localhost:7201/api/ExamAttempt/${attemptId}`;
    this.http.delete(url).subscribe({
      next: () => {
        console.log('Previous attempt deleted');
        this.createExamAttempt();
      },
      error: (err: any) => console.error('Failed to delete previous attempt', err)
    });
  }

  createExamAttempt(): void {
    const payload = {
      userId: this.userId,
      assessmentId: Number(this.assessmentId),
      assignmentId: this.assignmentId
    };

    this.http.post<any>('https://localhost:7201/api/ExamAttempt/create-attempt', payload).subscribe({
      next: (res: any) => {
        this.attemptId = res.attemptId ?? 0;
        this.loadAssessmentAndQuestions();
      },
      error: (err: any) => console.error('Failed to create exam attempt', err)
    });
  }

  loadAssessmentAndQuestions(): void {
    this.loading = true;

    this.http.get<any>(`https://localhost:7201/api/Assessment/${this.assessmentId}`).subscribe({
      next: (assessmentArray: any) => {
        const assessment = Array.isArray(assessmentArray) ? assessmentArray[0] : assessmentArray;
        this.passMark = assessment.passMark ?? 0;
        this.totalMark = assessment.maxMark ?? 0;
        this.timerSeconds = typeof assessment.duration === 'number' && assessment.duration > 0 ? assessment.duration : 900;
        this.cdr.detectChanges();

        this.http.get<any[]>(`https://localhost:7201/api/Assessment/${this.assessmentId}/questions`).subscribe({
          next: (questions: any[]) => {
            this.questions = questions.map((q: any) => ({
              ...q,
              selectedOptionId: null
            }));
            this.startTimer();
            this.loading = false;
          },
          error: (err: any) => {
            console.error('Failed to load questions', err);
            this.loading = false;
          }
        });
      },
      error: (err: any) => {
        console.error('Failed to load assessment details', err);
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

    this.http.post<any>('https://localhost:7201/api/response', dto).subscribe({
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

    const url = `https://localhost:7201/api/Assessment/${this.assessmentId}/user/${this.userId}/obtainedmark`;
    this.http.get<any>(url).subscribe({
      next: (res: any) => {
        this.obtainedMark = res.obtainedMark ?? 0;
        this.hasPassed = this.passMark > 0 && this.obtainedMark >= this.passMark;
        this.updateExamAttemptStatus();
        if (this.hasPassed) {
          this.updateAssessmentStatus();
        }
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
    const payload = {
      //attemptId: this.attemptId,
      userId: this.userId,
      assessmentId: Number(this.assessmentId),
      //attemptDate: new Date().toISOString(),
      //completionStatus: 'Completed',
      //totalMarkObtained: this.obtainedMark,
      //isPassed: this.hasPassed
    };

    const url = `https://localhost:7201/api/ExamAttempt/update-status?userId=${this.userId}&assessmentId=${this.assessmentId}`;
    this.http.post(url, payload).subscribe({
      next: () => console.log('Exam attempt updated'),
      error: (err: any) => console.error('Failed to update exam attempt', err)
    });
  }

  updateAssessmentStatus(): void {
    const url = `https://localhost:7201/api/AssessmentStatus/user/${this.userId}/assessment/${this.assessmentId}`;
    const payload = { status: 'Completed' };

    this.http.put(url, payload).subscribe({
      next: () => console.log('Assessment status updated to Completed'),
      error: (err: any) => console.error('Failed to update assessment status', err)
    });
  }

  goToResult(): void {
    this.router.navigate(['/result'], {
      queryParams: { userId: this.userId }
    });
  }

  get isTimeCritical(): boolean {
    return this.timerSeconds <= 60;
  }

  retakeAssessment(): void {
    if (this.hasPassed) {
      alert('You have already passed. Retake is not allowed.');
      return;
    }

    const url = `https://localhost:7201/api/response/user/${this.userId}/assessment/${this.assessmentId}`;
    this.http.delete(url).subscribe({
      next: () => {
        console.log('Previous responses deleted. Retaking assessment...');
        this.resetState();
        this.fetchAssignmentDetails(); // Restart flow
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

  assessmentTitle: string = 'JAVA Basics';

  saveAnswer(question: any): void {
    console.log('Auto-saving answer for question:', question.questionId, 'Selected:', question.selectedOptionId);
  }
}
