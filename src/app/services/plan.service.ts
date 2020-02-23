import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
    constructor(private http: HttpClient){};

    public postPlan(genre, value, fat, cuisine, sex) {
        return this.http.post('http://localhost/assets/Plan', { 'genre': genre, 'value': value, 'fat': fat, 'cuisine': cuisine, 'sex': sex });
      }
    
    public getPlan() {
        return this.http.get('http://localhost/assets/Plan');
    }

    public deletePlan(id_plan) {
        return this.http.post('http://localhost/assets/Delete_plan', { 'id_plan': id_plan });
    }
}