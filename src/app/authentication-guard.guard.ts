import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})

export class AuthenticationGuardGuard implements CanActivate, CanActivateChild {
  public response: boolean;
  
  constructor(private login: LoginService, private router: Router) {}
  
  public canActivate (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.checkauth()) {
        return true; 
      } else {
        this.router.navigate(['/']);
        return false;
      }
  }
  
  public canActivateChild (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.checkauth()) {
        return true; 
      } else {
        this.router.navigate(['/']);
        return false;
      }

  }

  public checkauth(): Observable {
    this.login.Check_auth().subscribe(res => {
      if (res['auth'] === 1) {
        console.log('User');
        this.response = true;
      } else {
        console.log('Userblee');
        this.response = false;
        window.alert('Prosze sie zalogowac');
      }
    }, error => {
      console.log('Nie można się zalogować');
      return this.response = false;
    });
    return of(this.response);
  }
}
