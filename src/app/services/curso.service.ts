import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CursoService {

  private API: string = 'http://localhost:3000';

  constructor(private http:HttpClient) { }

  solicitar(frm:any):any{
    return this.http.post(`${this.API}/empresa/solicitar`,frm);
  }

  crear(frm:any,id:number):any{
    return this.http.put(`${this.API}/lider/crearCurso/${id}`,frm);
  }

  reprobarSolicitud(frm:any):any{
    return this.http.post(`${this.API}/empresa/solicitar`,frm);
  }  

  obtenerCursos():any{
    return this.http.get(`${this.API}/empresa/obtenerCursos`);
  }

  obtenerHorario():any{
    return this.http.get(`${this.API}/participante/horario`);
  }

  obtenerReporte(frm:any):any{
    return this.http.get(`${this.API}/tutor/reporte/${frm.año}`);
  }

  reporteMes(frm:any):any{
    return this.http.post(`${this.API}/lider/reporteMes`,frm);
  }

  reporteSemana(frm:any):any{
    return this.http.post(`${this.API}/lider/reporteSemana`,frm);
  }

  reporteDia(frm:any):any{
    return this.http.post(`${this.API}/lider/reporteDia`,frm);
  }
}
