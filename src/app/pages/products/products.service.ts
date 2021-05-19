import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/operators';
import { GlobalShared } from '../../app.global';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient, private globalShared: GlobalShared) {

  }

  productList(): Observable<any> {
    return this.http.get<any>(`${this.globalShared['apiUrl']}/productList`)
      .pipe(data => {
        return data;
      });
  }

  productCategories(): Observable<any> {
    return this.http.get<any>(`${this.globalShared['apiUrl']}/productCategories`)
      .pipe(data => {
        return data;
      });
  }

  uploads(file): Observable<any> {
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post<any>(`${this.globalShared['apiUrl']}/uploads`, formData)
      .pipe(data => {
        return data;
      });
  }

  productUpload(data: any): Observable<any> {
    return this.http.post<any>(`${this.globalShared['apiUrl']}/productUpload`, data)
      .pipe(map(result => {
        return result;
      }));
  }

  productDetails(productId: string): Observable<any> {
    return this.http.get<any>(`${this.globalShared['apiUrl']}/productDetails?productId=${productId}`)
      .pipe(data => {
        return data;
      });
  }

  productReview(productId: string): Observable<any> {
    return this.http.get<any>(`${this.globalShared['apiUrl']}/productReview?productId=${productId}`)
      .pipe(data => {
        return data;
      });
  }

  productUpdate(productId: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.globalShared['apiUrl']}/productUpdate?productId=${productId}`, data)
      .pipe(map(result => {
        return result;
      }));
  }

  getFile(imageId: string): Observable<any> {
    return this.http.get<any>(`${this.globalShared['apiUrl']}/getFile?filename=${imageId}`)
      .pipe((result => {
        return result;
      }), catchError(this.handleError));
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
