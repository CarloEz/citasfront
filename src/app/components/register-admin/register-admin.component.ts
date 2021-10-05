import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent implements OnInit {

  frmregister;frmlogin:FormGroup;

  constructor(private authservice:AuthService,private router:Router) {
    this.frmregister = new FormGroup({
      'nombre': new FormControl('', Validators.required),
      'correo': new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
      'contraseña': new FormControl('', Validators.required),
      'cuenta':new FormControl('false')
    })

    this.frmlogin = new FormGroup({
      'correo': new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
      'contraseña': new FormControl('', Validators.required),
      'cuenta':new FormControl('false')
    })
  }

  ngOnInit(): void {
  }


  iniciarSesion(): void {
    this.authservice.postLogin(this.frmlogin.value).subscribe((data: any) => {
      if (data.msg) {
        localStorage.setItem('token', data.msg);
        localStorage.setItem('type', data.tipo);
        this.router.navigate(['/panel']);
      } else {
        console.log("error", data.error);
      }
    });
  }


  guardar():void{
    this.authservice.postRegistro(this.frmregister.value)
    .subscribe( (res:any)=>console.log(res));
  }
}
