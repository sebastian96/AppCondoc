import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from './inicio/inicio.component';
import { DashboardComponent } from './dashboard.component';
import { SessionGuard } from '../../services/session.guard';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        canActivate: [SessionGuard],
        children: [
            { path: 'users', loadChildren: './users/users.module#UsersModule' },
            { path: 'inicio', component: InicioComponent },
            { path: '', redirectTo: 'inicio'},
            { path: '**', pathMatch: 'full', redirectTo: 'inicio' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashRoutingModule {}
