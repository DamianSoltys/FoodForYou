import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  Router
} from "@angular/router";
import { Observable, of } from "rxjs";
import { LoginService } from "./services/login.service";
import { DataService } from "./services/data.service";
import { getToken } from "./services/helperFunctions";

@Injectable({
  providedIn: "root"
})
export class AuthenticationGuardGuard implements CanActivate, CanActivateChild {
  response;
  constructor(
    private login: LoginService,
    private router: Router,
    private dataService: DataService
  ) {}
  public canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.checkauth()) {
      return true;
    } else {
      this.router.navigate(["/"]);
      return false;
    }
  }

  public canActivateChild(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.checkauth()) {
      return true;
    } else {
      this.router.navigate(["/"]);
      return false;
    }
  }

  public checkauth() {
    let token = getToken();
    if (!token) {
      return false;
    }
    return true;
  }
}
