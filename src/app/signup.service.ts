import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';


import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) {
    
   }

   Signup_func(username,surname,email,pass,sex){

    
    return this.http.post("http://localhost/ProjektPHP/assets/Signup",{"username":username,"surname":surname,"email":email,"pass":pass,"sex":sex});
  }
}
