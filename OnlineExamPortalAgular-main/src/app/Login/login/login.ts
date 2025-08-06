import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Auth } from '../../services/auth';
 
 
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login implements OnInit{
  email: string = '';
  password: string = '';
  image1 = './assets/register.jpg';
 
  constructor(private http: HttpClient, private router: Router,private auth :Auth) {}
 ngOnInit(): void {
   if(this.auth.isLogged()){
    
    this.router.navigateByUrl('/dashboard');
   }
 }
 
 
  onLogin(): void {
    const payload = {
      email: this.email,
      password: this.password
    };
 
    this.http.post<any>('https://localhost:7201/api/Login/login', payload).subscribe({
      next: (res) => {
        const token = typeof res === 'string' ? res : res.token;
        console.log('Login response:', res);
        localStorage.setItem('userEmail', this.email);
        sessionStorage.setItem('token', token);
 
        if (!token) {
          alert('Login succeeded but token is missing.');
          return;
        }
 
        let role = '';
        let name = this.email;
 
        try {
          const decoded: any = jwtDecode(token);
          console.log('Decoded token:', decoded);
 
          role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || '';
          name = decoded["name"] || decoded["unique_name"] || decoded["given_name"] || this.email;
        } catch (err) {
          console.warn('Token could not be decoded. Proceeding without role.');
        }
 
        localStorage.setItem('Name', name);
        localStorage.setItem('userRole', role);
 
        // Fetch user profile
        const userUrl = `https://localhost:7201/api/User/GetUser${encodeURIComponent(this.email)}`;
        this.http.get<any>(userUrl).subscribe({
          next: (user) => {
            console.log('Fetched user profile:', user);
            if (user?.userId) {
              localStorage.setItem('userId', user.userId.toString());
            } else {
              console.warn('User profile missing userId');
            }
 
            alert(`Welcome back, ${name}!`);
 
            // Redirect based on role
            const normalizedRole = role.toLowerCase();
            switch (normalizedRole) {
              case 'candidate':
               
                  this.router.navigateByUrl('/dashboard');
             
                 
               
                break;
              case 'instructor':
               
                  this.router.navigateByUrl('/instructor');
               
                break;
              case 'admin':
                
                  this.router.navigateByUrl('/admin');
                
                break;
              default:
               
                  this.router.navigateByUrl('/dashboard');
                break;
            }
          },
          error: (err) => {
            console.error('Failed to fetch user profile:', err);
            alert('Login succeeded but could not load the user profile.');
          }
        });
      },
      error: (err) => {
        console.error('Login failed:', err);
        alert('Invalid credentials. Please try again.');
      }
    });
  }
}
 
 