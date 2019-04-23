import { Injectable } from '@angular/core';
import decode  from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}
  
  isLogged(){
    const token = sessionStorage.getItem('token');
    if(token != null || token != ''){
      const isLogged = this.decode(token);
      if(isLogged.estado === 'success') {
        return true
      }
      if (isLogged.estado === 'error') {
        return false
      }
    } else {
      return false
    }
  }

  decode(token){
    return decode(token);
  }
}
