import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
 
@Component({
  selector: 'app-instructor',
  standalone: true,
  imports: [RouterLink,HttpClientModule],
  templateUrl: './instructor.html',
  styleUrls: ['./instructor.css']
})
export class Instructor {
  name: string = '';
 
  constructor() {
    this.name = localStorage.getItem('userName') || 'Instructor';
  }
}
 