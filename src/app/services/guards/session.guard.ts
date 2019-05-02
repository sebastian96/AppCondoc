import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "./../auth.service";
import { log } from 'util';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {
    constructor(private auth: AuthService){}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | boolean{
        
        let isLogged = this.auth.isLogged();

        console.log(isLogged);
        
        return isLogged;
    
        // if(isLogged) {
        //     return true;
        // } else {
        //     return false;
        // }
        
    }
  
}
