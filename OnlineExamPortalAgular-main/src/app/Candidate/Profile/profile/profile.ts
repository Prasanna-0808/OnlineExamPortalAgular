import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class ProfileComponent implements OnInit {
  email = localStorage.getItem('userEmail') || '';
  profile: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.http.get<any>(`https://localhost:7201/api/User/GetUser${this.email}`).subscribe({
      next: (res) => this.profile = res,
      error: (err) => console.error('Profile load failed', err)
    });
  }
  
}
