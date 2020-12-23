import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { IBorrowBook } from "src/app/BorrowBook/IBorrowBook";

@Injectable()
export class BorrowBookService {
    constructor(private httpClient: HttpClient) { }

    baseUrl = 'http://localhost:62995/api/BorrowBook';

    getBorrowBooks(): Observable<IBorrowBook[]> {
        return this.httpClient.get<IBorrowBook[]>(this.baseUrl,{headers : new HttpHeaders({'Authorization':'bearer '+localStorage.getItem('userToken')})})
            .pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            return throwError('There is a problem with the service.....');
        }
        else {
            return throwError('There is a problem with the service.....');
        }
    }

    getBorrowBook(id: number): Observable<IBorrowBook | {}> {
        return this.httpClient.get<IBorrowBook>(`${this.baseUrl}/${id}`, {headers : new HttpHeaders({'Authorization':'bearer '+localStorage.getItem('userToken')})})
            .pipe(catchError(this.handleError));
    }

    updateBorrowBook(borrowBook: IBorrowBook): Observable<void | {}> {
        return this.httpClient.put<void>(`${this.baseUrl}/${borrowBook.BorrowBook_ID}`, borrowBook, {headers : new HttpHeaders({'Authorization':'bearer '+localStorage.getItem('userToken')})}).pipe(catchError(this.handleError));
            
    }

    addBorrowBook(borrowBook:IBorrowBook):Observable<IBorrowBook | {}>{
        return this.httpClient.post<IBorrowBook>(this.baseUrl,borrowBook, {headers : new HttpHeaders({'Authorization':'bearer '+localStorage.getItem('userToken')})})
                .pipe(catchError(this.handleError));
    }

    delete(id:number): Observable<void | {}> {
        return this.httpClient.delete<void>(`${this.baseUrl}/${id}`, {headers : new HttpHeaders({'Authorization':'bearer '+localStorage.getItem('userToken')})})
                .pipe(catchError(this.handleError));
    }
}
