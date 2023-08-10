import { Injectable } from "@angular/core";
import { LoginService } from './login/login.service';
import { Observable } from 'rxjs';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard {

  constructor(private loginService: LoginService, private router: Router) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    boolean | Observable<boolean> | Promise<boolean> {
    if (this.loginService.getLoggedIn()) {
      this.router.navigate(['/dashboard'])
      return false;
    } else {
      return true
    }
  }
}