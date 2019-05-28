import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { Apiservice } from '../../../../services/api.service';

import Swal from 'sweetalert2';

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

    form: FormGroup;
    user: object = {};
    rol: object = [];
    url: any = '';
    body: HTMLCollectionOf<HTMLBodyElement> = document.getElementsByTagName('body');

    constructor(private auth: AuthService, private Api: Apiservice, private router: Router) { 
        let data = this.auth.getLocalStorage('userEdit');
        this.body[0].style.overflowY = 'scroll';
        this.user = JSON.parse(data);

        this.Api.listRol('getRol').subscribe(
            (response) => {
                this.rol = response;
            },
            error => {
                console.log(error);
            }
        )
    }

    ngOnInit() {
        this.form = new FormGroup({
            nombres: new FormControl(this.user['NomColaborador'], [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z]+( +[a-zA-Z]+)*')]),
            apellidos: new FormControl(this.user['ApeColaborador'], [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z]+( +[a-zA-Z]+)*')]),
            correo: new FormControl(this.user['CorreoColaborador'], [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$'), Validators.email]),
            usuario: new FormControl(this.user['Usuario'], Validators.required),
            foto: new FormControl(''),
            tipo: new FormControl(this.user['TipDocColaborador'], Validators.required),
            documento: new FormControl(this.user['DocumentoColaborador'], [Validators.required, Validators.pattern('[0-9]+')]),
            cargo: new FormControl(this.user['IdRol'], Validators.required)
        });

        this.url = this.user['FotoColaborador'];
    }

    update() {
        if (this.form.valid) {
            const datosUsuario: object = {
                nombres: this.form.controls.nombres.value,
                apellidos: this.form.controls.apellidos.value,
                correo: this.form.controls.correo.value,
                usuario: this.form.controls.usuario.value,
                cargo: this.form.controls.cargo.value,
                nameFoto: this.form.controls.foto.value,
                foto: this.url,
                tipo: this.form.controls.tipo.value,
                documento: this.form.controls.documento.value, 
                idUsuario: this.user['IdUsuario']
            };

            this.Api.userUpdate('userUpdate', datosUsuario).subscribe(
                (response) => {
                    if (response.estado === 'success') {
                        setTimeout(() => {
                            Swal.fire({
                                title: `${response.usuario} Actualizado/a con exito`,
                                type: 'success',
                                animation: false,
                                showConfirmButton: false,
                                timer: 1500,
                                customClass: {
                                    popup: 'animated bounceIn'
                                }
                            })
                            this.router.navigate(['dashboard/users/listar']);
                        }, 650);
                    }
                },
                error => {
                    console.log(error);
                }
            );
        } else {
            Swal.fire({
                title: 'Campos vacíos o incorrectos',
                type: 'error',
                animation: false,
                showConfirmButton: false,
                timer: 1000,
                customClass: {
                    popup: 'animated bounceIn'
                }
            });
        }
    }

    previewImage( event ) {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = (event) => {
                this.url = event.target['result'];
            };
          }
    }

    ngOnDestroy(): void {
        this.body[0].style.overflowY = 'hidden';
    }

}
