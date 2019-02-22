import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Product } from './product';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "/api/product/";
const custApi = "/api/customer/";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getProducts (){
    return this.http.get(apiUrl+"getAll")
      .pipe(
        tap(heroes => console.log('fetched products')),
        catchError(this.handleError('getProducts', []))
      );
  }
  
  getProduct(id: number){
    // const url = `${apiUrl}/${id}`;
    return this.http.get(apiUrl+"get/"+id).pipe(
      tap(_ => console.log(`fetched product id=${id}`)),
      catchError(this.handleError(`getProduct id=${id}`))
    );
  }
  
  addProduct (product){
    return this.http.post(apiUrl+"addNew", product, httpOptions).pipe(
      tap((product: Product) => console.log(`added product w/ id=${product.id}`)),
      catchError(this.handleError('addProduct'))
    );
  }
  
  updateProduct (id, product){
    // const url = `${apiUrl}/${id}`;
    return this.http.put(apiUrl+"update/"+id, product, httpOptions).pipe(
      tap(_ => console.log(`updated product id=${id}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }
  
  deleteProduct (id){
    // const url = `${apiUrl}/${id}`;
  
    return this.http.delete(apiUrl+"delete/"+id, httpOptions).pipe(
      tap(_ => console.log(`deleted product id=${id}`)),
      catchError(this.handleError('deleteProduct'))
    );
  }

  getCustomers(){
    return this.http.get(custApi + "getAll")
      .pipe(
        tap(heroes => console.log('fetched customers')),
        catchError(this.handleError('getCustomers', []))
      );
  }

  getCustomer(id: number) {
    // const url = `${apiUrl}/${id}`;
    return this.http.get(custApi + "get/" + id).pipe(
      tap(_ => console.log(`fetched customer id=${id}`)),
      catchError(this.handleError(`getCustomer id=${id}`))
    );
  }

  addCustomer(cust) {
    return this.http.post(custApi + "addNew", cust, httpOptions).pipe(
      tap((product: Product) => console.log(`added customer w/ id=${cust.id}`)),
      catchError(this.handleError('addCustomer'))
    );
  }

  deleteCustomer(id) {
    // const url = `${apiUrl}/${id}`;

    return this.http.delete(custApi + "delete/" + id, httpOptions).pipe(
      tap(_ => console.log(`deleted customer id=${id}`)),
      catchError(this.handleError('deleteCustomer'))
    );
  }

  updateCustomer(id, cust) {
    // const url = `${apiUrl}/${id}`;
    return this.http.put(custApi + "update/" + id, cust, httpOptions).pipe(
      tap(_ => console.log(`updated customer id=${id}`)),
      catchError(this.handleError<any>('updateCustomer'))
    );
  }
}
