import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { Apiservice } from '../../../../services/api.service';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss']
})

export class UsersListComponent  implements OnInit{

    displayedColumns: string[] = ['names', 'Correo', 'Documento'];
    dataSource: MatTableDataSource<UsersData>;
    users: UsersData[] = [];
    
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    
    
    constructor(private api: Apiservice, private router: Router) {

        this.api.getColaboradores('colaboradores').subscribe(
            (response) => {
                this.users.push(response);
            },
            error => {
                console.log(error);
            }
        );

        console.log(typeof this.users, this.users);

    }
    
    ngOnInit() {
        this.dataSource = new MatTableDataSource(this.users);        
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
    
    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
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
