// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-reset-password',
//   imports: [],
//   templateUrl: './reset-password.html',
//   styleUrl: './reset-password.css'
// })
// export class ResetPassword {

// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './reset-password.html',
  styleUrls: ['./reset-password.css']
})
export class ResetPassword implements OnInit {
  resetForm!: FormGroup;
  token: string = '';
  message: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams['token'];
    this.resetForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    if (this.resetForm.valid) {
      const payload = {
        token: this.token,
        newPassword: this.resetForm.value.newPassword
      };

      this.http.post<any>('https://localhost:7201/api/Login/reset-password', payload)
        .subscribe({
          next: res => {
            alert(res.message);
            this.router.navigate(['/login']);
          },
          error: err => {
            console.error(err);
            alert('Reset failed. Token may be invalid or expired.');
          }
        });
    }
  }
}
