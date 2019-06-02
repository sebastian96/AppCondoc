import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { Apiservice } from '../../../../services/api.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-user-create',
    templateUrl: './user-create.component.html',
    styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit, OnDestroy {

    form: FormGroup;
    url: any = '';
    data: any;
    usersUsed: Array<any> = [];
    body: HTMLCollectionOf<HTMLBodyElement> = document.getElementsByTagName('body');
    rol: object = [];
    userExist: object = {
        email: false,
        user: false,
        document: false
    };
    
    
    constructor( public Api: Apiservice, private router: Router, private fb: FormBuilder) {
        this.body[0].style.overflowY = 'scroll';

        this.Api.listRol('getRol').subscribe(
            (response) => {
                this.rol = response;
            },
            error => {
                console.log(error);
            }
        );

        this.Api.listUsers('getUsers').subscribe(
            (Response: Array<any>) => {
                this.usersUsed = Response;
            },
            err => {
                console.log(err);
            }
        );
    }

    ngOnInit() {
        this.form = new FormGroup({
            nombres: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z]+( +[a-zA-Z]+)*')]),
            apellidos: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z]+( +[a-zA-Z]+)*')]),
            correo: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$'), Validators.email], this.existUser.bind(this)),
            usuario: new FormControl('', Validators.required, this.existUser.bind(this)),
            foto: new FormControl(''),
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
        if (this.form.valid && !this.userExist['email'] && !this.userExist['user'] && !this.userExist['document']) {
            const datosUsuario: object = {
                nombres: this.form.controls.nombres.value,
                apellidos: this.form.controls.apellidos.value,
                correo: this.form.controls.correo.value,
                usuario: this.form.controls.usuario.value,
                password: this.form.controls.password1.value,
                cargo: this.form.controls.cargo.value,
                nameFoto: this.form.controls.foto.value,
                foto: this.url,
                tipo: this.form.controls.tipo.value,
                documento: this.form.controls.documento.value
            };
            this.Api.insertUsers('userInsert', datosUsuario).subscribe(
                (response) => {
                    if (response.estado === 'success') {
                        setTimeout(() => {
                            Swal.fire({
                                title: `${response.usuario} Registrado/a con exito`,
                                type: 'success',
                                animation: false,
                                showConfirmButton: false,
                                timer: 1500,
                                customClass: {
                                    popup: 'animated bounceIn'
                                }
                            })
                            this.router.navigate(['dashboard/users/listar']);
                        }, 1000);
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

    different( control: FormControl ): { [s: string]: boolean } {
        const FORMA: any = this;

        if ( control.value !== FORMA.controls.password1.value) {
            return {
                different: true
            };
        }
        return null;
    }

    existUser( control: AbstractControl): Promise<any> | Observable<any> {
        
        const PROMISE = new Promise(
            ( resolve, reject ) => {
                control.valueChanges.subscribe(
                    (value) => {
                        this.usersUsed.forEach(element => {
                            if (value === element.CorreoColaborador) {
                                this.userExist['email'] = true;
                            } else if (value === element.Usuario) {
                                this.userExist['user'] = true;
                            } else if (value === element.DocumentoColaborador) {
                                this.userExist['document'] = true;
                            }
                            resolve(null);
                        });
                    }
                );
            }
        );

        return PROMISE;
    }

    ngOnDestroy(): void {
        this.body[0].style.overflowY = 'hidden';
    }

}
