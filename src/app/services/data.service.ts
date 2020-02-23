import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
    constructor(private http: HttpClient) { }

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
        let token;
        
        if(this.storageAvailable()) {
            token = localStorage.getItem('token');
        }
        return this.http.post('http://localhost/assets/Update', { 'pass': pass, 'username': username, 'surname': surname, 'sex': sex, 'email': email, 'token':token});
      }
    
    public getData() {
        return this.http.get('http://localhost/assets/Update');
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
            return token?token:false;
        } else {
            console.log("Storage is not available!");
            return false;
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