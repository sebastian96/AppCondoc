import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserCreateComponent } from './user-create/user-create.component';

const routes: Routes = [
    {
        path: '',
        component: UsersComponent,
        children: [
            // { path: 'editar', component: UserEditComponent },
            { path: 'nuevo', component: UserCreateComponent },
            { path: 'listar', component: UsersListComponent },
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
