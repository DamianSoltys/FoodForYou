import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public logged = new BehaviorSubject(false);
  public currentlogged = this.logged.asObservable();

  constructor(private http: HttpClient) { }

  public loginUser(email, pass) {
    return this.http.post('http://localhost/assets/Login', { 'email': email, 'pass': pass });
  }

  public checkAuth() {
    return this.http.get('http://localhost/assets/CheckAuth');
  }

  public logoutUser() {
    return this.http.get('http://localhost/assets/Logout');
  }

  public getLogged(logged) {
    this.logged.next(logged);
  }
}
