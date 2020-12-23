import { Injectable } from "@angular/core";
import { StudentCourse } from "src/app/models/StudentCourse.model";
import { Observable, of, throwError } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from "@angular/common/http";
import { catchError } from 'rxjs/operators';
import { HttpHeaders } from "@angular/common/http";


@Injectable()
export class StudentCourseService {
    constructor(private httpClient: HttpClient) { }
    baseUrl = 'http://localhost:62995/api/StudentCourse';
    head:any = {headers : new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})} ;

    getCourses(): Observable<any> {
        return this.httpClient.get<any>(this.baseUrl, this.head)
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

    getCourse(id: number): Observable<StudentCourse | {}> {
        return this.httpClient.get<StudentCourse>(`${this.baseUrl}/${id}`,this.head)
            .pipe(catchError(this.handleError));
    }

    save(course: StudentCourse): Observable<StudentCourse | {}> {
        return this.httpClient.post<StudentCourse>(this.baseUrl, course, this.head)
        .pipe(catchError(this.handleError));
    }

    update(course: StudentCourse): Observable<void | {}> {
        return this.httpClient.put<void>(`${this.baseUrl}/${course.StudentCourse_ID}`, course, this.head)
        .pipe(catchError(this.handleError));
    }

    delete(id: number): Observable<void | {}> {
        return this.httpClient.delete<void>(`${this.baseUrl}/${id}`, this.head)
            .pipe(catchError(this.handleError));
    }
}