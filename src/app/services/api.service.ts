import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { log } from 'util';

@Injectable({
    providedIn: 'root'
})
export class Apiservice {

    public backUrl = 'http://localhost/appCondoc/backApp/api/ctrlGeneral.php/';

    constructor(private http: HttpClient) {}

    login(ruta: string, data: any) {
        const RESP = this.http.post<object>(this.backUrl.concat(ruta), data);
        return RESP;
    }

    listUsers(ruta: string) {
        const RESP = this.http.get<object>(this.backUrl.concat(ruta));
        return RESP;
    }
    
    listRol(ruta: string) {
        const RESP = this.http.get<object>(this.backUrl.concat(ruta));
        return RESP;
    }
    insertUsers(ruta: string, data: any) {
        const RESP = this.http.post<any>(this.backUrl.concat(ruta), data);
        return RESP;
    }
}
