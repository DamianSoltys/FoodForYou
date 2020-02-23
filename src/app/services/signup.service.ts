import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) {}

  signUser(username, surname, email, pass, sex) {
    return this.http.post("http://localhost/assets/Signup", { "username": username, "surname": surname, "email": email, "pass": pass, "sex": sex });
  }
}
