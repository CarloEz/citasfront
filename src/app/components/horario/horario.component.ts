import { Component, OnInit } from '@angular/core';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html'
})
export class HorarioComponent implements OnInit {

  listaCurso:any;
  
  constructor(private cursoservice:CursoService) { 
    this.obtenerHorario();
  }

  ngOnInit(): void {
  }

  obtenerHorario():void{
    this.cursoservice.obtenerHorario()
    .subscribe((res:any)=>{
      console.log(res);

      this.listaCurso=res;
    })
  }

}
