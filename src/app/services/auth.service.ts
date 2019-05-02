import { Injectable } from '@angular/core';
import decode from "jwt-decode";
import { log } from 'util';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor() { }

    isLogged() {
        let token = sessionStorage.getItem('token');

        if (token != null || token != '') {
            console.log(token);
            return true;
            // const isLogged = this.decode(token);
            // if (isLogged.estado === 'success') {
            //     return true
            // }
            // if (isLogged.estado === 'error') {
            //     return false
            // }
        } else {
            return false;
        }
    }

    decode(token) {
        return decode(token);
    }
}
