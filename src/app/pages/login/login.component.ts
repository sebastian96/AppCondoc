import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { NgForm }   from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

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
            this.apiLogin.login('login', data).subscribe(
                response => {
                    let res = response;
                    let token = this.apiLogin.decode(res);
                    
                    if(token.estado == 'success') {
                        sessionStorage.setItem('token', JSON.stringify(res));
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
