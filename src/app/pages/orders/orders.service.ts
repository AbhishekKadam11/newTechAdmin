import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { from } from 'rxjs/internal/observable/from';
import { of } from 'rxjs/internal/observable/of';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';
import { mergeMap } from 'rxjs/internal/operators/mergeMap';
import { toArray } from 'rxjs/internal/operators/toArray';
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

  public getMultipleOrderData(OrderData): Observable<any> {
    return of(OrderData);
  }

  public getSingleFileData(id): Observable<any> {
    return this.http.get<any>(`${this.globalShared['apiUrl']}/getFile?filename=${id}`)
    .pipe((result => {
      return (result);
    }), catchError(this.handleError));
  }

  public getCombinedFileData(OrderData): Observable<any> {
    return this.getMultipleOrderData(OrderData).pipe(
      mergeMap((result: any) =>
        // `from` emits each contact separately
        from(result).pipe(
          // load each contact
          mergeMap(
            id => this.getSingleFileData(id.image),
            // in result selector, connect fetched detail 
            (original, detail) => {
              return original.image = "data:image/jpg;base64," + detail;
            }
          ),
        ),
      ),
    )
  }


  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
