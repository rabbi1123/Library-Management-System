import { CanActivate } from "@angular/router";
import { ActivatedRouteSnapshot } from "@angular/router";
import { RouterStateSnapshot } from "@angular/router";
import { StudentCourseService } from "src/app/StudentCourse/StudentCourse.service";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class StudentCourseDetailsGuardService implements CanActivate {
    constructor(private _studentCourseService: StudentCourseService,
                private _router: Router){

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>{
        return this._studentCourseService.getCourse(+route.paramMap.get('id')).pipe(
            map(course => {
                const CourseExist = !!course;

                if(CourseExist){
                    return true;
                }
                else {
                    this._router.navigate(['notfound']);
                    return false;
                }
            })
        );
    }
}