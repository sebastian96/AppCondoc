import { Injectable } from '@angular/core';
import decode from 'jwt-decode';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private headerHidden: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor( private router: Router ) { }

    get hide() {
        return this.headerHidden.asObservable();
    }

    isLogged() {
        const token = sessionStorage.getItem('token');

        if (token === null || token === '') {
            this.headerHidden.next(false);
            return false;
        } else {
            const isLogged = this.decode(token);
            if (isLogged.estado === 'success') {
                this.headerHidden.next(true);
                return true;
            }
            if (isLogged.estado === 'error') {
                this.headerHidden.next(false);
                return false;
            }
        }
    }

    logout() {
        sessionStorage.removeItem('token');
        this.headerHidden.next(false);
        this.router.navigate(['']);
    }

    getTokenSession() {
        const token = sessionStorage.getItem('token');
        const userToken = this.decode(token);
        return userToken;
    }

    getLocalStorage(item: string) {
        const data = localStorage.getItem(item);
        return data;
    }

    decode(token) {
        return decode(token);
    }
}
