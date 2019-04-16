import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface responseJson 
{
  nombre?: string,
  apellido?: string,
  usuario?: string,
  estado?: string 
}
@Injectable({
  providedIn: 'root'
})
export class LoginService {

    public back_url = "http://localhost/AppCondoc/backend/";

    constructor(private http: HttpClient) { }

    login(ruta:string, data:any){
        let resp = this.http.post<responseJson>(this.back_url.concat(ruta), data);
        return resp;
    }
}
