
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {User} from './User';
import {LoginService} from '../login.service';

@Component({
  selector: 'app-change-info',
  templateUrl: './change-info.component.html',
  styleUrls: ['./change-info.component.css']
})
export class ChangeInfoComponent implements OnInit {
  error = '';
  success = false;
  user = new User();
  _username;
  _surname;
  _pass;
  _sex;
  Change_form = new FormGroup({
    username: new FormControl('', Validators.minLength(4)),
    surname: new FormControl('', Validators.minLength(4)),
    pass: new FormControl('', Validators.minLength(4)),
    passcheck: new FormControl('', Validators.minLength(4)),
    sex: new FormControl('')
  });
  constructor(private login: LoginService) { }

  ngOnInit() {
    this.login.get_Data().subscribe(
      res => {
         if (res) {
           this.user.username = res[0]['username'];
           this.user.surname = res[0]['surname'];
           this.user.email = res[0]['email'];
           if (res[0]['sex'] === 'man') {
           this.user.sex = 'Mezczyzna'; } else {this.user.sex = 'Kobieta'; }
           console.log(res);
           console.log(res[0]['username']);
         } else {
           console.log(res);
           this.error="Ups... Nie udało się wczytać informacji";
         }
      },
      error => {
        console.log(error);
        this.error="Ups... Nie udało się wczytać informacji";
      }
    );
  }
  onSubmit() {
    if (!(this.Change_form.get('pass').value === this.Change_form.get('passcheck').value)) {
      this.error = 'Hasła się od siebie róźnią!';
      this.Change_form.get('pass').reset();
      this.Change_form.get('passcheck').reset();
  } else {
    this._username = this.Change_form.get('username').value;
    this._surname = this.Change_form.get('surname').value;
    this._pass = this.Change_form.get('pass').value;
    this._sex = this.Change_form.get('sex').value;
    this.login.ChangeData(this._username, this._surname, this._pass, this._sex,this.user.email).subscribe(
      res => {
         if (res) {
          switch (res) {
            case 'usernameerr': {
              this.error = 'Popraw imię';
              console.log(false);
              this.success = false;
              break;
            }
            case 'surnameerr': {
              this.error = 'Popraw Nazwisko';
              console.log(false);
              this.success = false;
              break;
            }
            case 'passerr': {
              this.error = 'Hasło jest nieprawidłowe[a-Z0-9]';
              console.log(false);
              this.success = false;
              break;
            }
            default: {
              this.success = true;
            }
          }
          if (this.success) {
           this.user.username = res[0]['username'];
           this.user.surname = res[0]['surname'];
           this.user.email = res[0]['email'];
           if (res[0]['sex'] === 'man') {
           this.user.sex = 'Mezczyzna';
           } else { this.user.sex = 'Kobieta'; }
           console.log(res);
           console.log(res[0]['username']);
           this.success = true;
           this.error = 'Pomyslnie zmieniono dane!';
           this.Change_form.reset();
          }

         } else {
           console.log(res);
           this.success = false;
         }

      },
      error => {
        console.log(error);
      }
    );
  }
}

}
