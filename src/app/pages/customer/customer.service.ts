import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalShared } from '../../app.global';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient, private globalShared: GlobalShared) { 

  }

  customerList():Observable<any> {
    return this.http.get<any>(`${this.globalShared['apiUrl']}/customerList`)
      .pipe(data => {
        return data;
      });
  }

  customerDetails(customerId: string):Observable<any> {
    return this.http.get<any>(`${this.globalShared['apiUrl']}/customerDetails?customerId=${customerId}`)
      .pipe(data => {
        return data;
      });
  }

  customerUpdate(customerId: string, data: any):Observable<any> {
    return this.http.put<any>(`${this.globalShared['apiUrl']}/customerUpdate?customerId=${customerId}`, data)
      .pipe(data => {
        return data;
      });
  }

}
