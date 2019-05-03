import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { log } from 'util';

@Injectable({
    providedIn: 'root'
})
export class SessionGuard implements CanActivate {
    constructor(
        private auth: AuthService,
        private router: Router
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | boolean {
        const isLogged = this.auth.isLogged();

        if (isLogged) {
            return true;
        } else {
            this.router.navigate(['login']);
            return false;
        }
    }

}
