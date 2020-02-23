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
        return this.http.post('http://localhost/assets/Update', { 'pass': pass, 'username': username, 'surname': surname, 'sex': sex, 'email': email });
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
}