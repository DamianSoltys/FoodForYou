import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
    constructor(private http: HttpClient) { }

    public changeData(username, surname, pass, sex, email) {
        return this.http.post('http://localhost/assets/Update', { 'pass': pass, 'username': username, 'surname': surname, 'sex': sex, 'email': email });
      }
    
    public getData() {
        return this.http.get('http://localhost/assets/Update');
    }
}