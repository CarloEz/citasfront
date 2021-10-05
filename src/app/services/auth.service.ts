import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })

export class AuthService {

  private API: string = 'http://localhost:3000';

  constructor(private http: HttpClient, private router:Router) {
    console.log("SERVICE");
  }

  postLogin(form: any): any {
    return this.http.post(`${this.API}/auth/login`, form);
  }

  postRegistro(form: any): any {
    return this.http.post(`${this.API}/auth/register`, form);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getType(){
    return localStorage.getItem('type');
  }

  cerrarSesion(){
    localStorage.removeItem('token');
    localStorage.removeItem('type');
    this.router.navigate(['/']);
  }
}
