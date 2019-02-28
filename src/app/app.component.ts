import { Component, OnInit, AfterViewInit , OnDestroy, AfterContentChecked, AfterViewChecked} from '@angular/core';
import {Router, Route} from '@angular/router';
import {trigger, state, style, transition, animate, keyframes} from '@angular/animations';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  constructor(private login: LoginService, private router: Router) {}
  
  public logged: Boolean;
  public state: String = 'none';
  
  ngOnInit(): void {
    this.state = 'none';
    this.login.currentlogged.subscribe(logged => this.logged = logged);
    this.login.Check_auth().subscribe(res => {
      this.logged = res['auth'] === 1 ? true : false;
      console.log(res['user']);
    }, error => {
      console.log(error);
    });
  }

  logout(): void {
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
