import { Injectable } from '@angular/core';
import decode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor( private router: Router ) { }

    isLogged() {
        const token = sessionStorage.getItem('token');

        if (token === null || token === '') {
            return false;
        } else {
            const isLogged = this.decode(token);
            if (isLogged.estado === 'success') {
                return true;
            }
            if (isLogged.estado === 'error') {
                return false;
            }
            return true;
        }
    }

    logout() {
        sessionStorage.removeItem('token');
        this.router.navigate(['home']);
    }

    decode(token) {
        return decode(token);
    }
}
