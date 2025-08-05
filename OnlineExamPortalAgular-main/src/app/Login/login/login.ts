import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { RoleType } from '../../core/models/user.model';
 
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  email: string = '';
  password: string = '';
  image1 = './assets/register.jpg';
 
  constructor(private http: HttpClient, private router: Router) {}
 
  onLogin(): void {
    const payload = {
      email: this.email,
      password: this.password
    };
 
    this.http.post<any>('https://localhost:7201/api/Login/login', payload).subscribe({
      next: (res) => {
        console.log('Login response:', res);
        localStorage.setItem('userEmail', this.email);
 
        const token = res.token;
        if (!token) {
          alert('Login succeeded but token is missing.');
          return;
        }
 
        const decoded: any = jwtDecode(token);
        console.log('Decoded token:', decoded);
 
        const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        const name = decoded["name"] || decoded["unique_name"] || decoded["given_name"] || this.email;
 
        if (!role) {
          alert('Login succeeded but role is missing in token.');
          return;
        }
        localStorage.setItem('Name', name);
        localStorage.setItem('userRole', role);
       
       
        alert(`Welcome back, ${name}!`);
 
        switch (role.toLowerCase()) {
          case 'candidate':
            this.router.navigateByUrl('/refresh').then(() => {
              this.router.navigateByUrl('/candidate');
            });
            break;
          case 'instructor':
            this.router.navigateByUrl('/refresh').then(() => {
              this.router.navigateByUrl('/instructor');
            });
            break;
          case 'admin':
            this.router.navigateByUrl('/refresh').then(() => {
              this.router.navigateByUrl('/admin');
            });
            break;
          default:
            alert('Unknown role. Please contact support.');
        }
      },
      error: (err) => {
        console.error('Login failed:', err);
        alert('Invalid credentials. Please try again.');
      }
    });
  }
}