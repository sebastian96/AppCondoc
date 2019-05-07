import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SessionGuard } from './services/session.guard';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    {
        path: 'inicio',
        redirectTo: 'dashboard'
    },
    {
        path: 'dashboard',
        canActivate: [SessionGuard],
        loadChildren: './pages/dashboard/dashboard.module#DashboardModule'
    },
    { path: '**', pathMatch: 'full', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
