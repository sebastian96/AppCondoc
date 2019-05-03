import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from '../shared/app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from 'src/shared/header/header.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './pages/admin/admin.component';
import { SessionGuard } from './services/session.guard';
import { AuthService } from './services/auth.service';
import { Apiservice } from './services/api.service';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        HeaderComponent,
        LoginComponent,
        AdminComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [
        Apiservice,
        SessionGuard,
        AuthService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
