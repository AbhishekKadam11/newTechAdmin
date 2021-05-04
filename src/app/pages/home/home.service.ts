import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { GlobalShared } from '../../app.global';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient, private globalShared: GlobalShared) { 

  }

  dashboardCount():Observable<any> {
    return this.http.get<any>(`${this.globalShared['apiUrl']}/dashboardCount`)
      .pipe(data => {
        return data;
      });
  }

  orderStatistics():Observable<any>  {
    return this.http.get<any>(`${this.globalShared['apiUrl']}/orderStatistics`)
      .pipe(data => {
        return data;
      });
  }

  orderByCustomer():Observable<any>  {
    return this.http.get<any>(`${this.globalShared['apiUrl']}/orderByCustomer`)
      .pipe(data => {
        return data;
      });
  }

  orderCountByCustomer():Observable<any>  {
    return this.http.get<any>(`${this.globalShared['apiUrl']}/orderCountByCustomer`)
      .pipe(data => {
        return data;
      });
  }

  stateWiseCount(state: string):Observable<any>  {
    return this.http.get<any>(`${this.globalShared['apiUrl']}/stateWiseCount?state=${state}`)
      .pipe(data => {
        return data;
      });
  }

  // private stateNameSource = new BehaviorSubject("Maharashtra");
  // stataName:any = this.stateNameSource.asObservable();

  // setStateName(state: string) {
  //    this.stateNameSource.next(state);
  // }
}
