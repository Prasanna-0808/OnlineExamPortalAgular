// import { Component } from '@angular/core';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { FormsModule } from '@angular/forms';
// import { Router, RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [FormsModule, HttpClientModule, RouterModule],
//   templateUrl: './login.html',
//   styleUrls: ['./login.css']
// })
// export class Login {
//   email: string = '';
//   password: string = '';
//   image1 = './assets/register.jpg';

//   constructor(private http: HttpClient, private router: Router) {}

//   onLogin(): void {
//     const payload = {
//       email: this.email,
//       password: this.password
//     };
  
//     this.http.post('https://localhost:7201/api/Login/login', payload).subscribe({
//       next: (res: any) => {
//         console.log('Login successful:', res);
//         localStorage.setItem('userEmail', this.email);
//         console.log('Full login response:', res);
      

//         alert(`Welcome back, ${this.email}!`);
//         // this.router.navigate(['/dashboard']);
//         // this.router.navigate(['/dashboard', { refresh: new Date().getTime() }]);
//         this.router.navigateByUrl('/refresh').then(() => {
//           this.router.navigateByUrl('/dashboard');
//         });
        

//       },
//       error: (err) => {
//         console.error('Login failed:', err);
//         alert('Invalid credentials. Please try again.');
//       }
//     });
//   }
  
// }



import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

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

    this.http.post('https://localhost:7201/api/Login/login', payload, { responseType: 'text' }).subscribe({
      next: (token: string) => {
        console.log('Login successful. Token received:', token);
        localStorage.setItem('userEmail', this.email);

        // Fetch user profile without token
        const userUrl = `https://localhost:7201/api/User/GetUser${encodeURIComponent(this.email)}`;

        this.http.get<any>(userUrl).subscribe({
          next: (user) => {
            console.log('Fetched user profile:', user);

            if (user && user.userId) {
              localStorage.setItem('userId', user.userId.toString());

              alert(`Welcome back, ${this.email}!`);
              this.router.navigateByUrl('/refresh').then(() => {
                this.router.navigateByUrl('/dashboard');
              });
            } else {
              console.warn('User profile missing userId');
              alert('Login succeeded but userId was not found.');
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
