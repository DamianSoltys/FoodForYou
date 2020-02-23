import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { SignupService } from "../services/signup.service";
@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  public error: String = "";
  public username_: String;
  public surname_: String;
  public email_: String;
  public pass_: String;
  public sex_: String;
  public success = false;

  public Signup_form = new FormGroup({
    username: new FormControl("", Validators.minLength(4)),
    surname: new FormControl("", Validators.minLength(4)),
    email: new FormControl("", Validators.email),
    pass: new FormControl("", Validators.minLength(4)),
    passcheck: new FormControl("", Validators.minLength(4)),
    sex: new FormControl("")
  });

  constructor(private signup: SignupService) {}

  ngOnInit() {}

  public onSubmit() {
    if (
      !(
        this.Signup_form.get("pass").value ===
        this.Signup_form.get("passcheck").value
      )
    ) {
      this.error = "Hasła się od siebie róźnią!";
      this.Signup_form.get("pass").reset();
      this.Signup_form.get("passcheck").reset();
    } else {
      this.username_ = this.Signup_form.get("username").value;
      this.surname_ = this.Signup_form.get("surname").value;
      this.email_ = this.Signup_form.get("email").value;
      this.pass_ = this.Signup_form.get("pass").value;
      this.sex_ = this.Signup_form.get("sex").value;
      this.signup
        .signUser(
          this.username_,
          this.surname_,
          this.email_,
          this.pass_,
          this.sex_
        )
        .subscribe(
          res => {
            switch (res) {
              case "usernameerr": {
                this.error = "Popraw imię";
                this.success = false;
                break;
              }
              case "surnameerr": {
                this.error = "Popraw Nazwisko";
                this.success = false;
                break;
              }
              case "emailerr": {
                this.error = "Popraw email";
                this.success = false;
                break;
              }
              case "passerr": {
                this.error = "Hasło jest nieprawidłowe[a-Z0-9]";
                this.success = false;
                break;
              }
            }

            if (res === true) {
              this.error = "Użytkownik został zapisany do bazy danych";
              this.success = true;
              window.alert("Pomyślnie zarejestrowano użytkownika");
              this.Signup_form.reset();
            } else if (res === false) {
              this.error = "Taki użytkownik już istnieje!";
              this.success = false;
            }
          },
          error => {
            this.error = "Coś poszło nie tak!";
            console.log(error);
            this.success = false;
          }
        );
    }
  }
}
