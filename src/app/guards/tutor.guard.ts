import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class TutorGuard implements CanActivate {

  constructor(private authservice:AuthService, private router:Router){}

  canActivate(): boolean {
    if (this.authservice.getType('tutor')) {
      return true;
    }else{
      this.router.navigate(['/']);
      return false;
    }
  }
}
