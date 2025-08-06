

import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, HttpClientModule,RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  public getJsonValue: any;
  image1 = './assets/register.jpg';

  // Form-bound properties
  name: string = '';
  email: string = '';
  password: string = '';
  roleType: string = '0'; // default to Candidate

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
   // this.getMethod();
  }

  // public getMethod(): void {
  //   this.http.get('https://localhost:7201/api/Assessment/AllAssessments').subscribe({
  //     next: (data) => {
  //       console.log('GET response:', data);
  //       this.getJsonValue = data;
  //     },
  //     error: (err) => {
  //       console.error('GET failed:', err);
  //     }
  //   });
  // }

  public postMethod(): void {
    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('email', this.email);
    formData.append('password', this.password);
    formData.append('registrationDate', new Date().toISOString());
    formData.append('roleType', this.roleType);

    this.http.post('https://localhost:7201/api/User/register', formData).subscribe({
      next: (data) => {
        console.log('POST response:', data);
        alert('User registered successfully!');
      },
      error: (err) => {
        console.error('POST failed:', err);
        alert('Registration failed. Please check your input.');
      }
    });
  }
}
