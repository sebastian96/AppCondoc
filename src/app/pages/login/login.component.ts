import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { Apiservice } from '../../services/api.service';

import Swal from 'sweetalert2';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    public user = {
        username: '',
        password: ''
    };

    constructor(
        private apiLogin: Apiservice,
        private auth: AuthService,
        private router: Router
    ) { }

    ngOnInit() {
        if (this.auth.isLogged()) {
            this.router.navigate(['inicio']);
        } else {
            this.router.navigate(['login']);
        }
    }

    ingresar(f: NgForm) {
        const data = f.value;
        if (this.user.username === '' || this.user.password === '') {
            Swal.fire({
                title: 'Campos vacíos',
                type: 'error',
                animation: false,
                showConfirmButton: false,
                timer: 1000,
                customClass: {
                    popup: 'animated bounceIn'
                }
            });
        } else {
            this.apiLogin.login('login', data).subscribe(
                response => {
                    const res = response;
                    const token = this.auth.decode(res);
                    if (token.estado === 'success') {
                        sessionStorage.setItem('token', JSON.stringify(res));
                        this.router.navigate(['inicio']);
                    } else {
                        Swal.fire({
                            title: 'Usuario o contraseña',
                            text: 'Incorrectos',
                            type: 'error',
                            animation: false,
                            customClass: {
                                popup: 'animated bounceIn'
                            }
                        });
                    }
                },
                err => {
                    console.log(err);
                }
            );
        }
    }
}
