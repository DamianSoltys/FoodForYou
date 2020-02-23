import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { DataService } from "./data.service";
import { switchMap } from "rxjs/operators";
import { LoginService } from "./login.service";
import { getToken } from "./helperFunctions";

@Injectable({
  providedIn: "root"
})
export class PlanService {
  constructor(
    private http: HttpClient,
    private dataService: DataService,
    private loginService: LoginService
  ) {}

  public postPlan(genre, value, fat, cuisine, sex) {
    return this.loginService
      .checkAuth(getToken())
      .pipe(
        switchMap(() =>
          this.http.post("http://localhost/assets/Plan", {
            genre: genre,
            value: value,
            fat: fat,
            cuisine: cuisine,
            sex: sex,
            token: getToken()
          })
        )
      );
  }

  public getPlan() {
    return this.loginService.checkAuth(getToken()).pipe(
      switchMap(() => {
        let param = new HttpParams().set("token", getToken());
        return this.http.get("http://localhost/assets/Plan", { params: param });
      })
    );
  }

  public deletePlan(id_plan) {
    return this.loginService.checkAuth(getToken()).pipe(
      switchMap(() => {
        let param = new HttpParams()
          .set("token", getToken())
          .set("id_plan", id_plan);
        return this.http.delete("http://localhost/assets/Delete_plan", {
          params: param
        });
      })
    );
  }
}
