import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';

interface ResponseJson {
    nombre?: string;
    apellido?: string;
    usuario?: string;
    estado?: string;
}
@Injectable({
    providedIn: 'root'
})
export class LoginService {

    public backUrl = 'http://localhost/appCondoc/backApp/api/prueba.php/';

    constructor(private http: HttpClient) {}

    login(ruta: string, data: any) {
        const resp = this.http.post<ResponseJson>(this.backUrl.concat(ruta), data);
        return resp;
    }

    decode(token) {
        return decode(token);
    }

}
