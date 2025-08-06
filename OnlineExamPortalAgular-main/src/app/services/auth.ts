import { Injectable } from '@angular/core';
 
@Injectable({
  providedIn: 'root'
})
export class Auth {
  isLogged(){
    return sessionStorage.getItem('token') != null ? true : false;
  }
  logout(){
    sessionStorage.removeItem('token');
  }
 
  getToken(){
    return sessionStorage.getItem('token');
  }
}
 