import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

 logged = new BehaviorSubject(false);
currentlogged = this.logged.asObservable();

  constructor(private http: HttpClient) { }


  Login(email, pass) {
    return this.http.post('http://localhost/ProjektPHP/assets/Login', {'email': email, 'pass': pass});

  }
  Check_auth() {
    return this.http.get('http://localhost/ProjektPHP/assets/CheckAuth');
  }
  logout() {
    return this.http.get('http://localhost/ProjektPHP/assets/Logout');
  }
  getLogged(logged) {
     this.logged.next(logged);
  }
  ChangeData(username, surname, pass, sex, email) {
    return this.http.post('http://localhost/ProjektPHP/assets/Update', {'pass': pass, 'username': username, 'surname': surname, 'sex': sex, 'email': email});

  }
  get_Data() {
    return this.http.get('http://localhost/ProjektPHP/assets/Update');
  }

  post_Plan(genre, value, fat, cuisine, sex) {
    return this.http.post('http://localhost/ProjektPHP/assets/Plan', {'genre': genre, 'value': value, 'fat': fat, 'cuisine': cuisine, 'sex': sex});
  }
  get_Plan() {
    return this.http.get('http://localhost/ProjektPHP/assets/Plan');
  }
  delete_plan(id_plan){
    return this.http.post('http://localhost/ProjektPHP/assets/Delete_plan',{'id_plan':id_plan});
  }
}
