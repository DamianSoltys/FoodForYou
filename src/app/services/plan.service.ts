import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DataService } from './data.service';
import { switchMap } from 'rxjs/operators';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
    constructor(private http: HttpClient, private dataService:DataService, private loginService:LoginService){};

    public postPlan(genre, value, fat, cuisine, sex) {
      return this.loginService.checkAuth(this.dataService.getToken()).pipe(
        switchMap(()=>this.http.post('http://localhost/assets/Plan', { 'genre': genre, 'value': value, 'fat': fat, 'cuisine': cuisine, 'sex': sex, 'token':this.dataService.getToken() }))
      );
      }
    
    public getPlan() {
      return this.loginService.checkAuth(this.dataService.getToken()).pipe(
        switchMap(()=>{
          let param = new HttpParams().set('token',this.dataService.getToken())
          return this.http.get('http://localhost/assets/Plan', {params:param})
        })
      );
    }

    public deletePlan(id_plan) {
      return this.loginService.checkAuth(this.dataService.getToken()).pipe(
        switchMap(()=>{
          let param = new HttpParams().set('token',this.dataService.getToken())
          return this.http.delete('http://localhost/assets/Delete_plan', { params:param });
        })
      );
    }
}