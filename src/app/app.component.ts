import { Component, OnInit } from "@angular/core";
import { LoginService } from "./services/login.service";
import { Router, Route } from "@angular/router";
import { DataService } from "./services/data.service";
import { getToken } from "./services/helperFunctions";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor(
    private login: LoginService,
    private router: Router,
    private dataService: DataService
  ) {}
  public logged;
  public state: String = "none";
  ngOnInit(): void {
    this.state = "none";
    this.login.currentlogged.subscribe(logged => (this.logged = logged));
    this.login.checkAuth(getToken()).subscribe(
      res => {
        if (res) {
          this.logged = true;
        } else {
          this.logged = false;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  public logout() {
    this.login.logoutUser();
    this.router.navigate([""]);
  }
}
