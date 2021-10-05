import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { disableDebugTools } from '@angular/platform-browser';
import { TutorService } from 'src/app/services/tutor.service';

@Component({
  selector: 'app-tutor',
  templateUrl: './tutor.component.html',
  styles: [
  ]
})
export class TutorComponent implements OnInit {

  frmReporte:FormGroup;
  listaCurso:any;
  curso:any;

  constructor(private tutorservice:TutorService) {
    this.frmReporte= new FormGroup({
      'idcurso':new FormControl(''),
      'nombre': new FormControl({value:'',disabled:true}, Validators.required),
      'asistencia':new FormControl(0, [Validators.required,Validators.min(0)])
    })
    this.obtenerCursos();
  }
  
  ngOnInit(): void {
  }

  crearReporte(id:any):void{
    this.curso = this.listaCurso.find((element: any) => element.idcurso == id);
    console.log(this.curso);
    this.frmReporte.patchValue({nombre:this.curso.nombre,idcurso:this.curso.idcurso});
  }

  guardar():void{
    this.tutorservice.crearReporte(this.frmReporte.value)
    .subscribe((res:any)=>{console.log(res)});
  }
  
  obtenerCursos():void{
    this.tutorservice.obtenerCursos()
    .subscribe((res:any)=>{
      console.log(res);
      this.listaCurso=res;
    })
  }

}
