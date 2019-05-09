import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { log } from 'util';

interface ResponseJson {
    nombre?: string;
    apellido?: string;
    usuario?: string;
    estado?: string;
}
@Injectable({
    providedIn: 'root'
})
export class Apiservice {

    public backUrl = 'http://localhost/appCondoc/backApp/api/ctrlGeneral.php/';

    constructor(private http: HttpClient) {}

    login(ruta: string, data: any) {
        const RESP = this.http.post<ResponseJson>(this.backUrl.concat(ruta), data);
        return RESP;
    }

    listUsers(ruta: string) {
        const RESP = this.http.get(this.backUrl.concat(ruta));
        return RESP;
    }
}
