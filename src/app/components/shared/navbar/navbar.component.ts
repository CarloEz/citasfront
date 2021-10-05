import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {

  constructor(private authservice:AuthService) { }

  ngOnInit(): void {
  }

  salir():void{
    this.authservice.cerrarSesion();
  }

  verRol(tipo:string):boolean{
    return this.authservice.getType(tipo);
  }



}
