

import { Routes } from "@angular/router";
import { Home } from "./home/home";
import { Login } from "./Login/login/login";
import { Register } from "./Register/register/register";
import { Dashboard } from "./Candidate/dashboard/dashboard/dashboard";
import { Condidate } from "./Candidate/condidate/condidate";
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
    path: 'forgot-password',
    loadComponent: () => import('./forgot-password/forgot-password').then(m => m.ForgotPassword)
  },
  {
    path: 'reset-password',
    loadComponent: () => import('./reset-password/reset-password').then(m => m.ResetPassword)
  },
  {
    path: 'register',
    loadComponent: () => import('./Register/register/register').then(m => m.Register)
  },
  {
    path: 'condidate',
    loadComponent: () => import('./Candidate/condidate/condidate').then(m => m.Condidate)
  },
  {
    path: 'assessment/:id',
    loadComponent: () => import('./Candidate/assessment/assessment/assessment').then(m => m.Assessment) // ✅ NEW
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./Candidate/dashboard/dashboard/dashboard').then(m => m.Dashboard)
  },
  { path: 'refresh', component: DummyRefreshComponent }

  
];
