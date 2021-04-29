import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { GlobalShared } from '../../app.global';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient, private globalShared: GlobalShared) { }

  orderList():Observable<any> {
    return this.http.get<any>(`${this.globalShared['apiUrl']}/orderList`)
      .pipe(data => {
        return data;
      });
  }
}
