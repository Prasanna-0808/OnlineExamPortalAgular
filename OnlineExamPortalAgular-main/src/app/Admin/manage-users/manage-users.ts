import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/manage-users';
 
@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-users.html',
  styleUrls: ['./manage-users.css'],
  providers: [UserService]
})
export class ManageUsers {
  users: { name:string; email: string }[] = [];
 
  constructor(private userService: UserService) {
    this.fetchUsers();
  }
 
  fetchUsers() {
    this.userService.getUsers().subscribe({
      next: (data) => this.users = data,
      error: (err) => console.error('Error fetching users:', err)
    });
  }
 
  confirmDelete(email: string) {
    const confirmed = window.confirm('Are you sure you want to remove this user?');
    if (confirmed) {
      this.userService.deleteUser(email).subscribe({
        next: () => {
          console.log(`User with email ${email}.`);
          this.users = this.users.filter(user => user.email !== email);
          alert('User removed successfully!');
        },
        error: (err) =>{
              if(err.status === 200){
                console.log(`User with email ${email} removed successfully.`);
                alert('User removed successfully!');
              }
              else if (err.status === 500 || err.status === 404 || err.status === 0) {
                console.error('Error deleting user:', err);
                alert('Failed to remove user. Please try again.');
              }
 
        }
     
       
      });
    }
  }
}
 