import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TutorService {
  
  private API: string = 'http://localhost:3000';

  constructor(private http:HttpClient) { }

  obtenerTutores():any {
    return this.http.get(`${this.API}/tutor/obtenerTutores`);
  }

  obtenerCursos():any{
    return this.http.get(`${this.API}/tutor/cursos`);
  }

  crearReporte(frm:any):any{
    return this.http.post(`${this.API}/tutor/crearReporte`,frm);
  }

}
