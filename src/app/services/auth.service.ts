import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {map} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })

export class AuthService {

  private API: string = 'http://localhost:3000';

  constructor(private http: HttpClient, private router:Router) {
  }

  postLogin(form: any): any {
    return this.http.post(`${this.API}/auth/login`, form)
    .pipe(map((res:any)=>{
      localStorage.setItem('type',res.tipo);    
      console.log(res.tipo); 
      return res;
    }))
  }

  postRegistro(form: any): any {
    return this.http.post(`${this.API}/auth/register`, form);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('type');
    this.router.navigate(['/']);
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getType(tipo:string){
    if(localStorage.getItem('type')==tipo){
      return true;
    }
    return false;
  }

  cerrarSesion(){
    localStorage.removeItem('token');
    localStorage.removeItem('type');
    this.router.navigate(['/']);
  }
}
