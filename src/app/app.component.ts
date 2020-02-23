import { Component, OnInit, AfterViewInit, OnDestroy, AfterContentChecked, AfterViewChecked } from '@angular/core';
import { LoginService } from './services/login.service';
import { Router, Route } from '@angular/router';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent implements OnInit {
  constructor(private login: LoginService, private router: Router) { }
  public logged;
  public state: String = 'none';
  ngOnInit(): void {
    this.state = 'none';
    this.login.currentlogged.subscribe(logged => this.logged = logged);
    this.login.checkAuth().subscribe(res => {
      if (res['auth'] === 1) {
        this.logged = true;
      } else {
        this.logged = false;
      }
    }, error => {
      console.log(error);
    });
  }

  public logout() {
    this.router.navigate(['']);
    this.login.logoutUser().subscribe(res => {
      this.logged = !res;
      window.alert('Pomyślnie wylogowano');
    }, error => {
      console.log(error);
    });
  }
}
