import { Injectable } from "@angular/core";
import { IStudent } from "src/app/models/IStudent";
import { Observable, of, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpParams } from "@angular/common/http";

@Injectable()
export class StudentService {
    constructor(private httpClient: HttpClient) { }

    baseUrl = 'http://localhost:62995/api/Student';

    getStudents(): Observable<any | {}> {
        return this.httpClient.get<any | {}>(this.baseUrl,{headers : new HttpHeaders({'Authorization':'bearer '+localStorage.getItem('userToken')})})
            .pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            return throwError('There is a problem with the fron service.....');
        }
        else {
            return throwError('There is a problem with the main service.....');
        }
    }

    getStudent(id: number): Observable<IStudent | {}> {
        return this.httpClient.get<IStudent>(`${this.baseUrl}/${id}`, {headers : new HttpHeaders({'Authorization':'bearer '+localStorage.getItem('userToken')})})
            .pipe(catchError(this.handleError));
    }

    updateStudent(student: IStudent): Observable<void | {}> {
        return this.httpClient.put<void>(`${this.baseUrl}/${student.Student_ID}`, student, {headers : new HttpHeaders({'Authorization':'bearer '+localStorage.getItem('userToken')})})
                    .pipe(catchError(this.handleError));
            
    }

    addStudent(student:IStudent,file:File):Observable<IStudent | {}>{
        const formData: FormData = new FormData();
        formData.append('photo',file);
        formData.append('firstName',student.First_Name);
        formData.append('lastName',student.Last_Name);
        formData.append('contactPreference',student.ContactPreference);
        formData.append('email',student.Email);
        formData.append('phone',student.Phone);
        formData.append('courseID',student.Course_ID.toString());
        
        return this.httpClient.post(this.baseUrl, formData, {headers : new HttpHeaders({'Authorization':'bearer '+localStorage.getItem('userToken')})})
                .pipe(catchError(this.handleError));
    }

    delete(id:number): Observable<void | {}> {
        return this.httpClient.delete<void>(`${this.baseUrl}/${id}`, {headers : new HttpHeaders({'Authorization':'bearer '+localStorage.getItem('userToken')})})
                .pipe(catchError(this.handleError));
    }
}
