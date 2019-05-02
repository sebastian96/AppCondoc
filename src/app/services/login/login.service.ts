import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import decode from "jwt-decode";

interface responseJson {
    nombre?: string,
    apellido?: string,
    usuario?: string,
    estado?: string
}
@Injectable({
    providedIn: 'root'
})
export class LoginService {

    public back_url = "http://localhost/backApp/api/prueba.php/";

    constructor(private http: HttpClient) { }

    login(ruta: string, data: any) {
        let resp = this.http.post<responseJson>(this.back_url.concat(ruta), data);        
        return resp;
    }

    decode(token) {
        return decode(token);
    }

}
