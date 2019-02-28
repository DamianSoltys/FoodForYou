import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})

export class SignupService {
  
    private _host: string = 'http://localhost';

    constructor(private http: HttpClient) { }

    public Signup_func(username, surname, email, pass, sex) {
      return this.http.post(this._host + '/ProjektPHP/assets/Signup', {
        'username': username,
        'surname': surname,
        'email': email,
        'pass': pass,
        'sex': sex,
      });
    }
}
