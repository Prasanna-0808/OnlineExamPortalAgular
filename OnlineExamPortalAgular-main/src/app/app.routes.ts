import { Routes } from "@angular/router";
import { DummyRefreshComponent } from "./Candidate/dashboard/dashboard/refresherdummy";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home').then(m => m.Home)
  },
  {
    path: 'login',
    loadComponent: () => import('./Login/login/login').then(m => m.Login)
  },
  {
    path: 'register',
    loadComponent: () => import('./Register/register/register').then(m => m.Register)
  },
  {
    path: 'condidate',
    loadComponent: () => import('./Candidate/candidate/candidate').then(m => m.Condidate)
  },
  {
    path: 'assessment/:id',
    loadComponent: () => import('./Candidate/assessment/assessment/assessment').then(m => m.Assessment)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./Candidate/dashboard/dashboard/dashboard').then(m => m.Dashboard)
  },
  {
    path: 'refresh',
    component: DummyRefreshComponent
  },
  {
    path: 'result',
    loadComponent: () => import('./Candidate/assessment/assessment-result/assessment-result').then(m => m.AssessmentResultComponent)
  },
  {
    path: 'instructor',
    loadComponent: () => import('./Instructor/instructor/instructor').then(m => m.Instructor)
  },
  // {
  //   path:'instructor-profile',
  //   loadComponent: () => import('./Instructor/profile/instructor-profile').then(m => m.In
  // }
  {
    path:'instructor-assessment',
    loadComponent: () => import('./Instructor/assessments/assessment-dashboard/assessment-dashboard').then(m => m.Assessment)
  },
  {
    path: 'create-assessment',
    loadComponent: () => import('./Instructor/assessments/create-assessment/create-assessment').then(m => m.CreateAssessment)
  }
  ,
  {
    path: 'update-assessment/:id',
    loadComponent: () => import('./Instructor/assessments/update-assessment/update-assessment').then(m => m.UpdateAssessmentComponent)
  },

  {path: 'admin',
    loadComponent: () => import('./Admin/admin/admin').then(m => m.Admin)
  },
  {path: 'admin-dashboard',
    loadComponent: () => import('./Admin/admin-dashboard/admin-dashboard').then(m => m.AdminDashboard)
  },
  {path: 'approve-instructor',
    loadComponent: () => import('./Admin/approve-instructor/approve-instructor').then(m => m.ApproveInstructor)
  },
  {
    path: 'manage-users',
    loadComponent: () => import('./Admin/manage-users/manage-users').then(m => m.ManageUsers)
  },
   
  
  {
    path: 'report',
    loadComponent: () => import('./Admin/report/report/report').then(m => m.Report)
  },
];
