import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public logged = new BehaviorSubject(false);
  public currentlogged = this.logged.asObservable();

  constructor(private http: HttpClient) { }

  public loginUser(email, pass) {
    return this.http.post('http://localhost/CrudPhp/assets/Login', { 'email': email, 'pass': pass });
  }

  public checkAuth() {
    return this.http.get('http://localhost/CrudPhp/assets/CheckAuth');
  }

  public logoutUser() {
    return this.http.get('http://localhost/CrudPhp/assets/Logout');
  }

  public getLogged(logged) {
    this.logged.next(logged);
  }

  public changeData(username, surname, pass, sex, email) {
    return this.http.post('http://localhost/CrudPhp/assets/Update', { 'pass': pass, 'username': username, 'surname': surname, 'sex': sex, 'email': email });
  }

  public getData() {
    return this.http.get('http://localhost/CrudPhp/assets/Update');
  }

  public postPlan(genre, value, fat, cuisine, sex) {
    return this.http.post('http://localhost/CrudPhp/assets/Plan', { 'genre': genre, 'value': value, 'fat': fat, 'cuisine': cuisine, 'sex': sex });
  }

  public getPlan() {
    return this.http.get('http://localhost/CrudPhp/assets/Plan');
  }

  public deletePlan(id_plan) {
    return this.http.post('http://localhost/CrudPhp/assets/Delete_plan', { 'id_plan': id_plan });
  }
}
