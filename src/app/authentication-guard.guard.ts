import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuardGuard implements CanActivate, CanActivateChild {
  response;
  constructor(private login: LoginService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.checkauth()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.checkauth()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }

  }

  checkauth() {
    this.login.checkAuth().subscribe(res => {
      if (res['auth'] === 1) {
        this.response = true;
      } else {
        this.response = false;
        window.alert('Proszę się zalogować');
      }
    }, error => {
      return this.response = false;
    });
    return of(this.response);
  }
}
