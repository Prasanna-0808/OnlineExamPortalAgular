import { Injectable } from '@angular/core';
<<<<<<< HEAD
 
=======

>>>>>>> b4f03c60a3cd563dd33cd86ab8c08bcc1d647c39
@Injectable({
  providedIn: 'root'
})
export class Auth {
  isLogged(){
<<<<<<< HEAD
    return sessionStorage.getItem('token') != null ? true : false;
=======
    return sessionStorage.getItem('token') != null? true : false;
>>>>>>> b4f03c60a3cd563dd33cd86ab8c08bcc1d647c39
  }
  logout(){
    sessionStorage.removeItem('token');
  }
<<<<<<< HEAD
 
  getToken(){
    return sessionStorage.getItem('token');
  }
}
 
=======
}
>>>>>>> b4f03c60a3cd563dd33cd86ab8c08bcc1d647c39
