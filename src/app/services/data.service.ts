import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { LoginService } from './login.service';
import { getToken } from './helperFunctions';

@Injectable({
  providedIn: 'root'
})
export class DataService {
    constructor(private http: HttpClient, private loginService:LoginService) { }

    public changeData(username, surname, pass, sex, email) {
        return this.loginService.checkAuth(getToken()).pipe(
            switchMap((value)=>this.http.post('http://localhost/assets/Update', { 'pass': pass, 'username': username, 'surname': surname, 'sex': sex, 'email': email, 'token':getToken()}))
        );
      }
    
    public getData() {
        return this.loginService.checkAuth(getToken()).pipe(
            switchMap(()=>{
                let param = new HttpParams().set('token',getToken())
                return this.http.get('http://localhost/assets/Update', {params:param})
            })
        );
    }
}