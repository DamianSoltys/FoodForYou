import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {LoginService} from '../login.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  error: String = '';
  Login_form = new FormGroup({
    email: new FormControl('', Validators.email),
    pass: new FormControl('', Validators.minLength(4))
  });
  email: String;
  pass: String;
  constructor(private login: LoginService,private router:Router) { }

  ngOnInit() {
  }
  onSubmit() {
    this.email = this.Login_form.get('email').value;
    this.pass = this.Login_form.get('pass').value;
    this.login.Login(this.email, this.pass).subscribe(
      res => {
      console.log(res);
      if (res === '0user') {
        this.error = 'Danego użytkownika nie ma w bazie danych!';
        this.Login_form.reset();
      } else if (res === 'badpass') {
        this.error = 'Złe hasło!';
        this.Login_form.reset();
      }else{
      this.router.navigate(['']);
      this.login.getLogged(true);
      window.alert("Pomyślnie zalogowano");
      }



    }, error => {
      this.error = 'Błąd połączenia!';
       console.log(error);
       this.Login_form.reset();
    });

  }

}
