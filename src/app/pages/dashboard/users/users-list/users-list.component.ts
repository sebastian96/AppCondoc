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
    body: HTMLCollectionOf<HTMLBodyElement> = document.getElementsByTagName('body');

    constructor(private api: Apiservice, private router: Router) { 
        this.body[0].style.overflowY = 'scroll';
    }

    ngOnInit() {
        this.api.getColaboradores('colaboradores').subscribe(
            (response) => {
                this.users = response;
            },
            error => {
                console.log(error);
            });
        }
        
    saveLocalStorage(idUser: number) {     
        this.users.forEach(element => {
            if (element['IdUsuario'] === idUser) {
                localStorage.setItem('userEdit', JSON.stringify(element));
            }
        });
    }

    ngOnDestroy(): void {
        this.body[0].style.overflowY = 'hidden';
    }
}
