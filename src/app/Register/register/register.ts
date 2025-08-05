// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { User, RoleType } from '../../core/models/user.model';
// import { AuthService } from '../register.service';
// import { HttpClient, HttpClientModule } from '@angular/common/http';

// @Component({
//   selector: 'app-register',
//   standalone: true,
//   imports: [ReactiveFormsModule, HttpClientModule],
//   providers: [AuthService],
//   template: '<h3>Welcome</h3>',
//   styleUrls: ['./register.css']
// })
// export class Register implements OnInit {
//   // signupForm: FormGroup;
  

//   // constructor(private fb: FormBuilder, private authService: AuthService) {
//   //   this.signupForm = this.fb.group({
//   //     name: ['', [Validators.required, Validators.maxLength(50)]],
//   //     email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
//   //     password: ['', [Validators.required, Validators.maxLength(50)]],
//   //     registrationDate: [new Date().toISOString(), Validators.required],
//   //     roleType: [RoleType.Candidate, Validators.required]
//   //   });
//   // }

//   // ngOnInit(): void {}

//   // onSubmit(): void {
//   //   if (this.signupForm.valid) {
//   //     const user: User = this.signupForm.value;
//   //     this.authService.register(user).subscribe({
//   //       next: (res: any) => {
//   //         console.log('Registration successful:', res);
//   //         alert('User registered successfully!');
//   //       },
//   //       error: (err: any) => {
//   //         console.error('Registration failed:', err);
//   //         alert('Registration failed. Please try again.');
//   //       }
//   //     });
//   //   } else {
//   //     console.warn('Form is invalid');
//   //   }
//   //   console.log('Form Value:', this.signupForm.value);

//   // }

//   public getJsonValue: any;

//     //   this.signupForm = this.fb.group({
//   //     name: ['', [Validators.required, Validators.maxLength(50)]],
//   //     email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
//   //     password: ['', [Validators.required, Validators.maxLength(50)]],
//   //     registrationDate: [new Date().toISOString(), Validators.required],
//   //     roleType: [RoleType.Candidate, Validators.required]
//   //   });

//   constructor( private http: HttpClient ){}

//   ngOnInit(): void {
//     this.getMethod();
//     this.postMethod();
//   }
//    public getMethod() {
//     this.http.get('https://localhost:7201/api/Assessment/AllAssessments').subscribe((data)=>{
//       console.log(data);
//       this.getJsonValue = data;
//     });

//        }

//        public postMethod() {
//         this.http.post('https://localhost:7201/api/User/register',{}).subscribe((data)=>{
//           console.log(data);
//         });
       
//        }
   
//   image1 = './assets/register.jpg';
// }

import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RoleType } from '../../core/models/user.model';
import { Router, RouterModule } from '@angular/router';

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

  constructor(private http: HttpClient, private router: Router) {}

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
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('POST failed:', err);
        alert('Registration failed. Please check your input.');
      }
    });
  }
}
