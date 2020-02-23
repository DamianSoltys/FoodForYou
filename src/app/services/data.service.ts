import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
    constructor(private http: HttpClient, private loginService:LoginService) { }

    public storageAvailable() {
        var test = 'test';
        try {
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch(e) {
            return false;
        }
    }

    public changeData(username, surname, pass, sex, email) {
        return this.loginService.checkAuth(this.getToken()).pipe(
            switchMap((value)=>this.http.post('http://localhost/assets/Update', { 'pass': pass, 'username': username, 'surname': surname, 'sex': sex, 'email': email, 'token':this.getToken()}))
        );
      }
    
    public getData() {
        return this.loginService.checkAuth(this.getToken()).pipe(
            switchMap(()=>{
                let param = new HttpParams().set('token',this.getToken())
                return this.http.get('http://localhost/assets/Update', {params:param})
            })
        );
    }

    public saveToken(token:string) {
        if(this.storageAvailable()) {
            localStorage.setItem('token',token);
        }else {
            console.log("Storage is not available!")
        }
    }

    public getToken() {
        if(this.storageAvailable()) {
            let token = localStorage.getItem('token');
            return token?token:null;
        } else {
            console.log("Storage is not available!");
            return null;
        }
    }

    public deleteToken() {
        if(this.storageAvailable() && localStorage.getItem('token')) {
            localStorage.removeItem('token');
            return true;
        } else {
            console.log("Storage is not available!");
            return false;
        }
    }
}