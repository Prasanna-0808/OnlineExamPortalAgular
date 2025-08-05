import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Condidate } from "./Candidate/candidate/condidate";
import { Register } from './Register/register/register';
import { ReactiveFormsModule } from '@angular/forms';
import {  HttpClientModule } from '@angular/common/http';
import { Login } from './Login/login/login';
import { Home } from './home/home';
import { HttpClient } from '@angular/common/http';
import { AssessmentResultComponent } from './Candidate/assessment/assessment-result/assessment-result';

@Component({
  selector: 'app-root',
  standalone: true, // ✅ Add this
  imports: [RouterOutlet, Condidate, Register, ReactiveFormsModule, HttpClientModule, Login, Home,AssessmentResultComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('OnlineExamPortal');
}