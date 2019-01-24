import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes, RouterModule, Router, CanActivate, CanActivateChild} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppIndexComponent } from './app-index/app-index.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';
import { UserComponent } from './user/user.component';
import { ChangeInfoComponent } from './change-info/change-info.component';
import { AddDeletePlanComponent } from './add-delete-plan/add-delete-plan.component';
import {AuthenticationGuardGuard} from './authentication-guard.guard';

const routes: Routes = [
  {path: '', redirectTo: 'index', pathMatch: 'full'},
  {path: 'index', component: AppIndexComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'contact', component: ContactComponent},
  {path:  'user', component: UserComponent, children: [
    {path: 'change_info', component: ChangeInfoComponent},
    {path: 'plan', component: AddDeletePlanComponent}
  ],
canActivate: [AuthenticationGuardGuard],
canActivateChild: [AuthenticationGuardGuard]}
];
@NgModule({
  declarations: [
    AppComponent,
    AppIndexComponent,
    SignupComponent,
    LoginComponent,
    ContactComponent,
    UserComponent,
    ChangeInfoComponent,
    AddDeletePlanComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
