import { Resolve } from '@angular/router';
import { StudentCourse } from "src/app/models/StudentCourse.model";
import { ActivatedRouteSnapshot } from "@angular/router";
import { RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { StudentCourseService } from "src/app/StudentCourse/StudentCourse.service";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/internal/operators/catchError";

@Injectable()
export class StudentCourseListResolverService implements Resolve<StudentCourse[] | string | {}> {
    constructor(private _studentCourseService: StudentCourseService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any | string | {}> {
        return this._studentCourseService.getCourses()
                .pipe(
                    catchError((err: string) => of(err))
                );
    }
}