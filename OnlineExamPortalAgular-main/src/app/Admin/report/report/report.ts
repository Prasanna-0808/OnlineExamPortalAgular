import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportService } from '../../../services/report';
 
@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report.html',
  styleUrls: ['./report.css'],
  providers: [ReportService]
})
export class Report {
  candidates: {
    name: string;
    email: string;
    assessmentDate: string;
    score: number;
    status: string;
  }[] = [];
 
  constructor(private reportService: ReportService) {
    this.loadReport();
  }
 
  loadReport() {
    this.reportService.getCandidateReport().subscribe({
      next: (data) => this.candidates = data,
      error: (err) => console.error('Error loading report:', err)
    });
  }
}
 