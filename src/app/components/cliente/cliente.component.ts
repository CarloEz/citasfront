import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CursoService } from 'src/app/services/curso.service';
import { InterceptorService } from 'src/app/services/interceptor.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styles: [
  ]
})
export class ClienteComponent implements OnInit {

  frmcurso: FormGroup;

  constructor(private cursoservice:CursoService, private interceptorservice: InterceptorService) {
    this.frmcurso = new FormGroup({
      'nombre': new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
  }

  solicitar():void{

    //guardar el id de la empresa en el curso.
   console.log( this.frmcurso.value);

    this.cursoservice.solicitar(this.frmcurso.value)
    .subscribe( (res:any) => console.log(res));
    
  }

}
