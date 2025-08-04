import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
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
  questions: any[] = [];
  userId: number = 0;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.assessmentId = this.route.snapshot.paramMap.get('id') || '';
  
    const storedUserId = localStorage.getItem('userId');
    console.log('Retrieved userId from localStorage:', storedUserId);
  
    this.userId = storedUserId ? Number(storedUserId) : 0;
  
    this.loadQuestions();
  
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (event.urlAfterRedirects.includes(`/assessment/${this.assessmentId}`)) {
        this.loadQuestions();
      }
    });
  }
  

  trackByQuestionId(index: number, question: any): number {
    return question.questionId;
  }

  trackByOption(index: number, option: any): number {
    return option.optionId;
  }

  loadQuestions(): void {
    this.http.get<any[]>(`https://localhost:7201/api/Assessment/${this.assessmentId}/questions`).subscribe({
      next: (res) => {
        this.questions = res.map(q => ({
          ...q,
          selectedOptionId: null
        }));
      },
      error: (err) => console.error('Failed to load questions', err)
    });
  }

  submitAnswers(): void {
    const userId = Number(localStorage.getItem('userId')) || 0;
    const assessmentId = Number(this.assessmentId);
  
    if (userId === 0 || !assessmentId) {
      alert('Missing user or assessment information.');
      return;
    }
  
    const responses = this.questions.map(q => ({
      userId: userId,
      assessmentId: assessmentId,
      questionId: q.questionId,
      optionId: q.selectedOptionId
    }));
  
    let submittedCount = 0;
  
    responses.forEach((dto, index) => {
      this.http.post('https://localhost:7201/api/response', dto).subscribe({
        next: (res: any) => {
          console.log(`Response for question ${dto.questionId} submitted:`, res);
          submittedCount++;
  
          // After all responses are submitted, navigate
          if (submittedCount === responses.length) {
            alert('Assessment submitted successfully!');
            this.router.navigate(['/dashboard']);
          }
        },
        error: (err) => {
          console.error(`Submission failed for question ${dto.questionId}`, err);
          alert(`Failed to submit response for question ${dto.questionId}`);
        }
      });
    });
  }
  

  allAnswered(): boolean {
    return this.questions.every(q => q.selectedOptionId !== null);
  }
}
