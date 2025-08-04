import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [CommonModule, HttpClientModule,FormsModule],
  templateUrl: './package.html',
  styleUrls: ['./package.css']
})
export class PackagesComponent implements OnInit {
  packages: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadPackages();
  }

  loadPackages(): void {
    this.http.get<any[]>(`https://localhost:7201/api/AssessmentPackage`).subscribe({
      next: (res) => this.packages = res,
      error: (err) => console.error('Packages load failed', err)
    });
  }
}
