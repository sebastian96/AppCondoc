import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-user-create',
    templateUrl: './user-create.component.html',
    styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

    form: FormGroup;

    constructor() {
        this.form = new FormGroup({
            nombres: new FormControl('', Validators.required),
            apellidos: new FormControl('', Validators.required),
            correo: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')])
        });
    }

    ngOnInit() {
    }

    register() {
        console.log(this.form.value);
    }

}
