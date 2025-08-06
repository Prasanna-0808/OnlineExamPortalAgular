import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ProfileComponent } from '../../Profile/profile/profile';
import { EnrolledAssessmentsComponent } from '../../assessment/enrolled-assessments/enrolled-assessments';
import { PackagesComponent } from '../../package/package/package';
import { FormsModule } from '@angular/forms';
import { AssessmentResultComponent } from '../../assessment/assessment-result/assessment-result';
import { Auth } from '../../../services/auth';
 
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ProfileComponent,
    EnrolledAssessmentsComponent,
    PackagesComponent,
    FormsModule,
    AssessmentResultComponent
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard {
  // No data fetching here — child components handle it
 
  constructor(private auth : Auth,private router: Router) {}
 
  OnLogout(){
    this.auth.logout();
    this.router.navigateByUrl('/login');
 
  }
}
 