import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from './User';
import { LoginService } from '../services/login.service';
import { Plan } from './Plan';
import { forEach } from '@angular/router/src/utils/collection';
import { PlanService } from '../services/plan.service';


@Component({
  selector: 'app-add-delete-plan',
  templateUrl: './add-delete-plan.component.html',
  styleUrls: ['./add-delete-plan.component.css']
})
export class AddDeletePlanComponent implements OnInit {
  constructor(private loginService: LoginService, private planService: PlanService) { }

  public error = '';
  public success = false;
  public genre;
  public value_;
  public fat;
  public sex;
  public cuisine;
  public Plans = new Array<Plan>();
  public plan: Plan;
  public Add_plan = new FormGroup({
    genre: new FormControl(''),
    value: new FormControl(''),
    fat: new FormControl(''),
    sex: new FormControl(''),
    cuisine: new FormControl('')
  });
  public i: number;

  ngOnInit() {
    this.getPlans();
  }

  public onSubmit() {
    this.genre = this.Add_plan.get('genre').value;
    this.value_ = this.Add_plan.get('value').value;
    this.fat = this.Add_plan.get('fat').value;
    this.cuisine = this.Add_plan.get('cuisine').value;
    this.sex = this.Add_plan.get('sex').value;
    this.planService.postPlan(this.genre, this.value_, this.fat, this.cuisine, this.sex).subscribe(res => {
      if (res) {
        this.Plans = new Array<Plan>();
        this.getPlans();
      } else {
        this.error = 'Nie udało się wybrać planu';
      }
    }, error => {
      console.log(error);
      this.error = 'Ups...Nie udało się połączyć';

    });

  }

  public getPlans() {
    this.planService.getPlan().subscribe(res => {
      if (res) {
        for (this.i = 0; this.i < Object.keys(res).length; this.i++) {
          this.plan = new Plan();
          this.plan.cuisine = res[this.i]['cuisine'];
          this.plan.fat = res[this.i]['fat'];
          this.plan.genre = res[this.i]['genre'];
          if (res[this.i]['sex'] === 'man') {
            this.plan.sex = 'mężczyzna';
          } else {
            this.plan.sex = 'kobieta';
          }

          this.plan.value_ = res[this.i]['value'];
          this.plan.id_plan = res[this.i]['id_plan'];
          this.plan.id_user = res[this.i]['id_user'];
          this.Plans.push(this.plan);
        }
        this.error = '';
      } else {
        this.error = 'Nie masz żadnych planów';
      }
    }
      , error => {
        this.error = 'Nie udało się wczytać aktualnych planów';
        console.log(error);
      });
  }

  public deletePlan(plan: Plan) {
    this.planService.deletePlan(plan.id_plan).subscribe(res => {
      this.Plans = new Array<Plan>();
      this.getPlans();
    }, error => {
      console.log(error);
    });
  }
}


