import { Component, OnInit } from '@angular/core';
import { Apiservice } from '../../../../services/api.service';
import { Router } from '@angular/router';
import { element } from 'protractor';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

    users: Array<object> = [];

    constructor(private api: Apiservice, private router: Router) { }

    ngOnInit() {
        this.api.getColaboradores('colaboradores').subscribe(
            (response) => {
                this.users = response;
                console.log(this.users);
            },
            error => {
                console.log(error);
            }
            )
        }
        
    saveLocalStorage(idUser: number) {     
        this.users.forEach(element => {
            if (element['IdUsuario'] === idUser) {
                localStorage.setItem('userEdit', JSON.stringify(element));
                return element;
            }
        });
    }


}
