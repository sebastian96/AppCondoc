import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { log } from 'util';

@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.component.html',
    styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

    Users: Array<object> = [];

    constructor(private auth: AuthService) {
        this.getUsers();
    }

    ngOnInit() {
    }

    getUsers() {
        const userToken = this.auth.getTokenSession();
        this.Users.push(userToken);
    }

}
