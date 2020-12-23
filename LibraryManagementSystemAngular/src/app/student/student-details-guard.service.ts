import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { StudentService } from "src/app/student/student.service";
import { Router } from "@angular/router";
import { ActivatedRouteSnapshot } from "@angular/router";
import { RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class StudentDetailsGuardService implements CanActivate {
    constructor(private _studentService: StudentService,
        private _router: Router) {

    }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>{
        
        return this._studentService.getStudent(+route.paramMap.get('id')).pipe(
            map(Student => {
                const StudentExist = !!Student;

                if(StudentExist){
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