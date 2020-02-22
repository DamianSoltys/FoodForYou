import { Component, OnInit, AfterViewInit, OnDestroy, AfterContentChecked, AfterViewChecked } from '@angular/core';
import { LoginService } from './login.service';
import { Router, Route } from '@angular/router';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent implements OnInit {
  constructor(private login: LoginService, private router: Router) {
  }
  logged;
  state: String = 'none';
  ngOnInit(): void {
    this.state = 'none';
    this.login.currentlogged.subscribe(logged => this.logged = logged);
    this.login.Check_auth().subscribe(res => {
      if (res['auth'] === 1) {
        console.log(res['user']);
        this.logged = true;
      } else {
        console.log(res['user']);
        this.logged = false;
      }
    }, error => {
      console.log(error);
    });



  }

  logout() {

    this.router.navigate(['']);
    this.login.logout().subscribe(res => {
      this.logged = !res;
      console.log(res);
      window.alert('Pomyślnie wylogowano');
    }, error => {
      console.log(error);
    });

  }
}
