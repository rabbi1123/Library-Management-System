import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { IStudent } from "src/app/models/IStudent";
import { StudentService } from "src/app/student/student.service";
import { ActivatedRouteSnapshot } from "@angular/router";
import { RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class StudentListResolverService implements Resolve<any | {}> {
    constructor(private _studentService: StudentService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any | {}> {
        return this._studentService.getStudents()
        .pipe(
            catchError((err: string) => of(err))
        );
    }
}