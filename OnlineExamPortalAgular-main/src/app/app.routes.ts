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
    loadComponent: () => import('./Candidate/candidate/condidate').then(m => m.Condidate)
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
  }
];
