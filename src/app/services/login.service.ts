import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public logged = new BehaviorSubject(false);
  public currentlogged = this.logged.asObservable();

  constructor(private http: HttpClient, private dataService:DataService) { }

  public loginUser(email, pass) {
    return this.http.post('http://localhost/assets/Login', { 'email': email, 'pass': pass });
  }

  public checkAuth(token:string | boolean) {
    let param = new HttpParams().set('token',this.dataService.getToken())
    return this.http.get('http://localhost/assets/CheckAuth', { params:param });
  }

  public logoutUser() {
    this.dataService.deleteToken();
  }

  public getLogged(logged) {
    this.logged.next(logged);
  }
}
