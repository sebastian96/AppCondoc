import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { NgForm }   from '@angular/forms';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { log } from 'util';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    private user = {
        username: '', 
        password: ''
    };

    constructor( private apiLogin: LoginService, private router: Router) { }

    ngOnInit() {
    } 

    ingresar(f: NgForm) {
        let data = f.value;
        if (this.user.username == '' || this.user.password == '') {
            Swal.fire({
                title: "Campos vacíos",
                type: "error",
                animation: false,
                showConfirmButton: false,
                timer: 1000,
                customClass: {
                    popup: "animated bounceIn"
                }
            });
        } else {
            this.apiLogin.login('login/login.php', data).subscribe(
                response => {
                    let res = response;
                    if(res.estado == 'success') {
                        Swal.fire({
                            title: "Bienvenido",
                            text: res.nombre + " " + res.apellido,
                            type: "success",
                            animation: false,
                            showConfirmButton: false,
                            timer: 1000,
                            customClass: {
                                popup: "animated bounceIn"
                            }
                        });
                        this.router.navigate(['inicio']);
                    }else {
                        Swal.fire({
                            title: "Usuario o contraseña",
                            text: "Incorrectos",
                            type: "error",
                            animation: false,
                            customClass: {
                                popup: "animated bounceIn"
                            }
                        });
                    }
                }, 
                err => {
                    console.log(err)
                }
            )
        }
    }
}
