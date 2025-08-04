import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Condidate } from "./Candidate/condidate/condidate";
import { Register } from './Register/register/register';
import { ReactiveFormsModule } from '@angular/forms';
import {  HttpClientModule } from '@angular/common/http';
import { Login } from './Login/login/login';
import { Home } from './home/home';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Condidate,Register,ReactiveFormsModule,HttpClientModule,Login,Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('OnlineExamPortal');
}
