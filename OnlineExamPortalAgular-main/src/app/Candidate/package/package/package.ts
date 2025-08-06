

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
 
@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './package.html',
  styleUrls: ['./package.css']
})
export class PackagesComponent implements OnInit {
  packages: any[] = [];
  selectedPackageName: string = '';
  assessmentsInPackage: any[] = [];
  selectedPackageId: number = 0;
 
  selectedAssessmentId: number = 0;
  selectedMaxMark: number = 0;
  selectedPassMark: number = 0;
 
  existingRequests: any[] = [];
  userId: number = 0;
 
  constructor(private http: HttpClient) {}
 
  ngOnInit(): void {
    const storedId = localStorage.getItem('userId');
    if (storedId) {
      this.userId = parseInt(storedId, 10);
      this.loadPackages();
      this.loadUserRequests();
    } else {
      console.error('User ID not found in localStorage.');
    }
  }
 
  loadPackages(): void {
    this.http.get<any[]>(`https://localhost:7201/api/AssessmentPackage`).subscribe({
      next: (res) => this.packages = res,
      error: (err) => console.error('Failed to load packages', err)
    });
  }
 
 
 
 
 
loadUserRequests(): void {
  this.http.get<any[]>(`https://localhost:7201/api/CandidateRequest/by-user/${this.userId}`).subscribe({
    next: (res) => this.existingRequests = res,
    error: (err) => console.error('Failed to load user requests', err)
  });
}
 
 
  onPackageSelect(): void {
    const selectedPackage = this.packages.find(pkg => pkg.packageName === this.selectedPackageName);
    if (!selectedPackage) return;
 
    this.selectedPackageId = selectedPackage.packageId;
 
    this.http.get<any[]>(`https://localhost:7201/api/Assessment/package/${this.selectedPackageName}`).subscribe({
      next: (res) => {this.assessmentsInPackage = res},
      error: (err) => console.error('Failed to load assessments', err)
    });
  }
 
 
requestAssessment(assessmentId: number): void {
  if (this.hasRequestedPackage()) {
    alert('You have already requested this package.');
    return;
  }
 
  const formData = new FormData();
  formData.append('UserId', this.userId.toString());
  formData.append('PackageId', this.selectedPackageId.toString());
 
  this.http.post('https://localhost:7201/api/CandidateRequest/create', formData).subscribe({
    next: () => {
      alert('Request submitted successfully!');
      this.loadUserRequests(); // Refresh request list
    },
    error: (err) => console.error('Request submission failed', err)
  });
}
 
 
 
setAssessmentDetails(assessmentId: number): void {
  const selected = this.assessmentsInPackage.find(a => a.assessmentId === assessmentId);
  if (selected) {
    this.selectedAssessmentId = assessmentId;
    this.selectedMaxMark = selected.maxMark;
    this.selectedPassMark = selected.passMark;
  }
}
 
 
hasRequestedPackage(): boolean {
  return this.existingRequests.some(req => req.packageId === this.selectedPackageId);
}
image="assets/Woman.png";
 
 
 
}