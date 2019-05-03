import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
        const resp = this.http.post<ResponseJson>(this.backUrl.concat(ruta), data);
        return resp;
    }
}
