import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Apiservice } from '../../../../services/api.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-user-create',
    templateUrl: './user-create.component.html',
    styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

    form: FormGroup;
    url = '';
    data: any;
    usersUsed: Array<any> = [];

    constructor( public Api: Apiservice) {

    }

    ngOnInit() {
        this.form = new FormGroup({
            nombres: new FormControl('', [Validators.required, Validators.minLength(3)]),
            apellidos: new FormControl('', [Validators.required, Validators.minLength(3)]),
            correo: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')], this.existUser.bind(this)),
            usuario: new FormControl('', Validators.required, this.existUser.bind(this)),
            foto: new FormControl('', ),
            tipo: new FormControl('', Validators.required),
            documento: new FormControl('', [Validators.required, Validators.pattern('[0-9]+')], this.existUser.bind(this)),
            cargo: new FormControl('', Validators.required),
            password1: new FormControl('', Validators.required),
            password2: new FormControl()
        });

        this.form.controls.password2.setValidators([
            Validators.required,
            this.different.bind(this.form)
        ]);

    }

    register() {
        if (!this.form.valid) {
            console.log(this.form);
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
            // tslint:disable-next-line: no-shadowed-variable
            reader.onload = (event) => {
                this.url = event.target['result'];
            };
          }
    }

    different( control: FormControl): { [s: string]: boolean } {
        const FORMA: any = this;

        if ( control.value !== FORMA.controls.password1.value) {
            return {
                different: true
            };
        }
        return null;
    }

    existUser( control: FormControl ): Promise<any>|Observable<any> {
        const PROMESA = new Promise(
            ( resolve, reject ) => {
                this.Api.listUsers('listarUsuarios').subscribe(
                    (Response: Array<any>) => {
                        console.log(Response);
                        Response.map((dato) => {
                            if (control.value === dato.Usuario || control.value === dato.CorreoColaborador || control.value === dato.DocumentoColaborador) {
                                resolve({ existe: true });
                            } else {
                                resolve(null);
                            }
                        });
                    },
                    err => {
                        console.log(err);
                    }
                );
            }
        );
        return PROMESA;
    }


}
