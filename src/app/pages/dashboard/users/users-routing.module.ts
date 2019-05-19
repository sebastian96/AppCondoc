import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';

const routes: Routes = [
    {
        path: '',
        component: UsersComponent,
        children: [
            { path: 'listar', component: UsersListComponent },
            { path: 'editar/:user', component: UserEditComponent },
            { path: 'nuevo', component: UserCreateComponent },
            { path: '', redirectTo: 'listar' },
            { path: '**', pathMatch: 'full', redirectTo: 'listar' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule {}
