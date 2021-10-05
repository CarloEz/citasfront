import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CursoService } from 'src/app/services/curso.service';
import { TutorService } from 'src/app/services/tutor.service';

@Component({
  selector: 'app-lider',
  templateUrl: './lider.component.html',
  styles: [
  ]
})

export class LiderComponent implements OnInit {

  frmcurso: FormGroup;
  listaCurso: any;
  listaTutor: any;
  curso: any;

  constructor(private cursoservice: CursoService, private tutorservice: TutorService) {

    this.frmcurso = new FormGroup({
      'nombre': new FormControl('', Validators.required),
      'fecha': new FormControl('', Validators.required),
      'hora': new FormControl('', Validators.required),
      'idtutor': new FormControl('', Validators.required),
      'estado':new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
    this.obtenerCursos();
    this.obtenerTutores();
  }

  guardar(): void {
    console.log(this.frmcurso.value);
  }

  cargarCurso(id: string): void {
    this.curso = this.listaCurso.find((element: any) => element.idcurso == id);
    this.frmcurso.patchValue(this.curso);
  }

  rechazar(id:any):void{
    this.curso = this.listaCurso.find((element: any) => element.idcurso == id);
    this.curso.estado=false;
    this.frmcurso.patchValue(this.curso);
    this.cursoservice.crear(this.frmcurso.value, id).subscribe((res: any) => { console.log("res:", res) });
  }

  actualizarCurso(id: any): void {    
    this.frmcurso.value['estado']=true;
    this.curso.estado=true;
    this.cursoservice.crear(this.frmcurso.value, id).subscribe((res: any) => { console.log("res:", res) });
  }

  obtenerCursos(): void {
    this.cursoservice.obtenerCursos().subscribe((res: any) => {
      this.listaCurso = res;
    })
  }

  obtenerTutores(): void {
    this.tutorservice.obtenerTutores()
      .subscribe((res: any) => {
        console.log(res);
        this.listaTutor = res;
      });
  }

}