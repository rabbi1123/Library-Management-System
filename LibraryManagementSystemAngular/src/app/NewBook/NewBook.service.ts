import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { IBookList } from "src/app/models/IBookList";
import { Router } from "@angular/router";

@Injectable()
export class BookService {
    constructor(private httpClient: HttpClient) { }
    
    baseUrl = 'http://localhost:62995/api/BookList';

    getBookLists(): Observable<IBookList[] | {}> {
        return this.httpClient.get<IBookList[]>(this.baseUrl,{headers : new HttpHeaders({'Authorization':'bearer '+localStorage.getItem('userToken')})})
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

    getBook(id: number): Observable<IBookList | {}> {
        return this.httpClient.get<IBookList>(`${this.baseUrl}/${id}`, {headers : new HttpHeaders({'Authorization':'bearer '+localStorage.getItem('userToken')})})
                .pipe(catchError(this.handleError));
    }

    save(book: IBookList): Observable<IBookList | {}> {
            return this.httpClient.post<IBookList>(this.baseUrl, book, {headers : new HttpHeaders({'Authorization':'bearer '+localStorage.getItem('userToken')})})
                    .pipe(catchError(this.handleError));
    }

    update(book: IBookList): Observable<void | {}> {
        return this.httpClient.put<void>(`${this.baseUrl}/${book.Book_ID}`, book, {headers : new HttpHeaders({'Authorization':'bearer '+localStorage.getItem('userToken')})})
                .pipe(catchError(this.handleError));
    }

    delete(id:number): Observable<void | {}> {
        return this.httpClient.delete<void>(`${this.baseUrl}/${id}`, {headers : new HttpHeaders({'Authorization':'bearer '+localStorage.getItem('userToken')})})
                .pipe(catchError(this.handleError));
    }
}