import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { Apiservice } from '../../../../services/api.service';
import { stringify } from 'querystring';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss']
})

export class UsersListComponent {

    displayedColumns: string[] = ['names', 'Correo', 'usuario', 'Documento', 'Editar'];
    dataSource: MatTableDataSource<UsersData>;
    users: UsersData[] = [];
    
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    
    
    constructor(private api: Apiservice, private router: Router) {

        this.api.getColaboradores('colaboradores').subscribe(
            (response) => {
                this.users.push(...response);
                this.dataSource = new MatTableDataSource(this.users);        
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },
            error => {
                console.log(error);
            }
        );

    }
    
    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
    }

    saveUserStorage(userId: string) {
        console.log(userId);
        console.log(this.users);
        
        let search = this.users.find(function(element) {
            return element.IdUsuario == userId;
        });
        
        localStorage.setItem('userEdit', JSON.stringify(search));
        
    }

}
export interface UsersData {
    ApeColaborador: string;
    CorreoColaborador: string;
    DocumentoColaborador: string;
    FotoColaborador: string;
    IdRol: string;
    IdUsuario: string;
    NomColaborador: string;
    NomRol: string;
    TipDocColaborador: string;
}
