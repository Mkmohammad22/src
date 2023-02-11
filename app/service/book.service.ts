import { Injectable } from '@angular/core';
import { Book } from './Book';
import { catchError,map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient,HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

 

// REST_API: string = 'http://127.0.0.1:8000/api/books';

// REST_API: string='http://127.0.0.1:8000/book';

REST_API: string = 'http://localhost:8080/api_java/rest/book/all';
REST_APICR: string = 'http://localhost:8080/api_java/rest/book/create';
REST_APIUP: string = 'http://localhost:8080/api_java/rest/book/update';
REST_APIDL: string = 'http://localhost:8080/api_java/rest/book/delete';



httpHeaders = new HttpHeaders().set('Content-Type','application/json');

constructor(private httpClient: HttpClient) { }

addBook(data:Book): Observable<any>{
let API_URL =  `${this.REST_APICR}`;
return this.httpClient.post(API_URL,data).pipe(catchError(this.handleError))
}


getBooks(){
return this.httpClient.get(`${this.REST_API}`);
}

getBook(id: any): Observable<any> {
let API_URL = `${this.REST_APIUP}/${id}`;
return this.httpClient.get(API_URL, { headers: this.httpHeaders})
.pipe(map((res:any)=>{
return res || {}
}),
catchError(this.handleError))
}


updateBook(id: any, data: Book): Observable<any> {
  let API_URL = `${this.REST_APIUP}/${id}`;
  return this.httpClient.put(API_URL, data, { headers: this.httpHeaders })
    .pipe(catchError(this.handleError))
}

deleteBook(id: any ): Observable<any> {
  let API_URL = `${this.REST_APIDL}/${id}`;
  return this.httpClient.delete(API_URL,  { headers: this.httpHeaders })
    .pipe(catchError(this.handleError))
}

handleError(error:HttpErrorResponse){ 
  let errorMessage = '';
  if(error.error instanceof ErrorEvent){
    errorMessage = error.error.message;
  }else{
    errorMessage = `Error Code: ${error.status}\n Message: ${error.message}`
  }
  console.log(errorMessage);
  return throwError(errorMessage);
}
}
