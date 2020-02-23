
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from './User';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-change-info',
  templateUrl: './change-info.component.html',
  styleUrls: ['./change-info.component.css']
})
export class ChangeInfoComponent implements OnInit {
  public error = '';
  public success = false;
  public user = new User();
  public _username;
  public _surname;
  public _pass;
  public _sex;
  public Change_form = new FormGroup({
    username: new FormControl('', Validators.minLength(4)),
    surname: new FormControl('', Validators.minLength(4)),
    pass: new FormControl('', Validators.minLength(4)),
    passcheck: new FormControl('', Validators.minLength(4)),
    sex: new FormControl('')
  });
  constructor(private login: LoginService) { }

  ngOnInit() {
    this.login.getData().subscribe(
      res => {
        if (res) {
          this.user.username = res[0]['username'];
          this.user.surname = res[0]['surname'];
          this.user.email = res[0]['email'];
          if (res[0]['sex'] === 'man') {
            this.user.sex = 'Mezczyzna';
          } else {
            this.user.sex = 'Kobieta';
          }
        } else {
          this.error = "Ups... Nie udało się wczytać informacji";
        }
      },
      error => {
        console.log(error);
        this.error = "Ups... Nie udało się wczytać informacji";
      }
    );
  }

  public onSubmit() {
    if (!(this.Change_form.get('pass').value === this.Change_form.get('passcheck').value)) {
      this.error = 'Hasła się od siebie róźnią!';
      this.Change_form.get('pass').reset();
      this.Change_form.get('passcheck').reset();
    } else {
      this._username = this.Change_form.get('username').value;
      this._surname = this.Change_form.get('surname').value;
      this._pass = this.Change_form.get('pass').value;
      this._sex = this.Change_form.get('sex').value;
      this.login.changeData(this._username, this._surname, this._pass, this._sex, this.user.email).subscribe(
        res => {
          if (res) {
            switch (res) {
              case 'usernameerr': {
                this.error = 'Popraw imię';
                this.success = false;
                break;
              }
              case 'surnameerr': {
                this.error = 'Popraw Nazwisko';
                this.success = false;
                break;
              }
              case 'passerr': {
                this.error = 'Hasło jest nieprawidłowe[a-Z0-9]';
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
              this.success = true;
              this.error = 'Pomyslnie zmieniono dane!';
              this.Change_form.reset();
            }
          } else {
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
