import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { Apiservice } from '../../../../services/api.service';

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

    constructor(private auth: AuthService, private Api: Apiservice) { 
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
        console.log('update');
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
