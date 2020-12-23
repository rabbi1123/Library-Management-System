
import { Injectable } from "@angular/core";
import { BookCategory } from "src/app/models/BookCategory.model";
import { Observable, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { HttpHeaders } from "@angular/common/http";

@Injectable()
export class BookCategoryService {
    constructor(private httpClient: HttpClient) { }
    
    baseUrl = 'http://localhost:62995/api/BookCategory';

    getBookCategory(): Observable<BookCategory[]> {
        return this.httpClient.get<BookCategory[]>(this.baseUrl, {headers : new HttpHeaders({'Authorization':'bearer '+localStorage.getItem('userToken')})})
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

    getCategory(id: number): Observable<BookCategory | {}> {
        return this.httpClient.get<BookCategory>(`${this.baseUrl}/${id}`, {headers : new HttpHeaders({'Authorization':'bearer '+localStorage.getItem('userToken')})})
                .pipe(catchError(this.handleError));
    }

    save(category: BookCategory): Observable<BookCategory | {}> {
            return this.httpClient.post<BookCategory>(this.baseUrl, category, {headers : new HttpHeaders({'Authorization':'bearer '+localStorage.getItem('userToken')})})
                    .pipe(catchError(this.handleError));
    }

    update(category: BookCategory): Observable<void | {}> {
        return this.httpClient.put<void>(`${this.baseUrl}/${category.BookCategory_ID}`, category, {headers : new HttpHeaders({'Authorization':'bearer '+localStorage.getItem('userToken')})})
            .pipe(catchError(this.handleError));
    }

    delete(id:number): Observable<void | {}> {
        return this.httpClient.delete<void>(`${this.baseUrl}/${id}`, {headers : new HttpHeaders({'Authorization':'bearer '+localStorage.getItem('userToken')})})
                .pipe(catchError(this.handleError));
    }
}