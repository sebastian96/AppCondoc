// IMPORTACION DE ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// RUTAS DE MODULO DASHBOARD
import { DashRoutingModule } from './dashboard-routing.module';

// COMPONENTES DE DASHBOARD
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';

@NgModule({
    declarations: [
        DashboardComponent,
        InicioComponent,
    ],
    imports: [
        CommonModule,
        DashRoutingModule
    ]
})
export class DashboardModule { }
