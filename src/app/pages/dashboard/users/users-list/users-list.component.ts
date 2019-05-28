import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Apiservice } from '../../../../services/api.service';
import { AuthService } from '../../../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss']
})

export class UsersListComponent {

    displayedColumns: string[] = ['Id','Names', 'Correo', 'usuario', 'Documento', 'Cargo', 'Opciones',];
    dataSource: MatTableDataSource<UsersData>;
    users: UsersData[] = [];
    body: HTMLCollectionOf<HTMLBodyElement> = document.getElementsByTagName('body');
    
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    
    
    constructor(private api: Apiservice, private router: Router, private auth: AuthService) {
        
        this.body[0].style.overflowY = 'scroll';
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
        let search = this.users.find(function(element) {
            return element.IdUsuario == userId;
        });
        
        localStorage.setItem('userEdit', JSON.stringify(search));

    }

    deleteUser(userId: string, userName: string) {

        const DATA = {
            userId: userId
        }
        
        Swal.fire({
            title: 'Esta seguro?',
            text: 'Eliminar al usuario: ' + userName,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar!'
        }).then((result) => {
            if (result.value) {
                this.api.deleteUser('deleteUser', DATA).subscribe(
                    (response) => {
                        if (response.estado === 'success') {
                            Swal.fire(
                                'Eliminado!',
                                'Se ha eliminado el usuario: ' + userName,
                                'success'
                            )
                            this.router.navigate(['dashboard/users']);
                        }
                    },
                    error => {
                        console.log(error);
                    }
                )
            }
        })
    }

    ngOnDestroy(): void {
        this.body[0].style.overflowY = 'hidden';
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
