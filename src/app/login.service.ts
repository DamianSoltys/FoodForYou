import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class LoginService {

  public logged = new BehaviorSubject(false);
  public currentlogged = this.logged.asObservable();
  
  private _host: string = 'http://localhost';

  constructor(private http: HttpClient) { }

  public Login(email, pass) {
    return this.http.post(this._host + '/ProjektPHP/assets/Login', {
      'email': email, 
      'pass': pass,
    });
  }
  
  public Check_auth() {
    return this.http.get(this._host + '/ProjektPHP/assets/CheckAuth');
  }
  
  public logout() {
    return this.http.get(this._host + '/ProjektPHP/assets/Logout');
  }
  
  public etLogged(logged) {
     this.logged.next(logged);
  }
  
  public ChangeData(username, surname, pass, sex, email) {
    return this.http.post(this._host + '/ProjektPHP/assets/Update', {
      'pass': pass, 
      'username': username, 
      'surname': surname, 
      'sex': sex, 
      'email': email,
    });
  }
  
  public get_Data() {
    return this.http.get(this._host + '/ProjektPHP/assets/Update');
  }

  public post_Plan(genre, value, fat, cuisine, sex) {
    return this.http.post(this._host + '/ProjektPHP/assets/Plan', {
      'genre': genre, 
      'value': value, 
      'fat': fat, 
      'cuisine': cuisine, 
      'sex': sex,
    });
  }
  
  public get_Plan() {
    return this.http.get(this._host + '/ProjektPHP/assets/Plan');
  }
  
  public delete_plan(id_plan){
    return this.http.post(this._host + '/ProjektPHP/assets/Delete_plan', {
      'id_plan':id_plan,
    });
  }
}
