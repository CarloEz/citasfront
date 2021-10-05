import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  frmregister: FormGroup;
  frmlogin: FormGroup;

  constructor(private authservice: AuthService, private router:Router) {
    this.frmregister = new FormGroup({
      'nombre': new FormControl('', Validators.required),
      'correo': new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
      'contraseña': new FormControl('', Validators.required),
      'cuenta':new FormControl('participante', Validators.required)
    })

    this.frmlogin = new FormGroup({
      'correo': new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
      'contraseña': new FormControl('', Validators.required),
      'cuenta':new FormControl('participante',Validators.required)
    })
  }

  ngOnInit(): void {
  }

  iniciarSesion(): void {
    this.authservice.postLogin(this.frmlogin.value).subscribe((data: any) => {
      if (data.msg) {
        localStorage.setItem('token', data.msg);
        this.router.navigate(['/panel']);
      } else {
        console.log("error", data.error);
      }
    });
  }

  guardar(): void {
    this.authservice.postRegistro(this.frmregister.value).subscribe((data: any) => console.log(data));
  }
}
