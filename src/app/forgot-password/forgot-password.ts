// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-forgot-password',
//   imports: [],
//   templateUrl: './forgot-password.html',
//   styleUrl: './forgot-password.css'
// })
// export class ForgotPassword {

// }


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule,HttpClientModule],
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.css']
})
export class ForgotPassword implements OnInit {
  forgotForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {}

  goToHome(){
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgotForm.valid) {
      this.http.post<any>('https://localhost:7201/api/Login/forgot-password', this.forgotForm.value)
        .subscribe({
          next: res => {
            alert(res.message);
          },
          error: err => {
            console.error(err);
            alert('Request failed');
          }
        });
    }
  }
}
