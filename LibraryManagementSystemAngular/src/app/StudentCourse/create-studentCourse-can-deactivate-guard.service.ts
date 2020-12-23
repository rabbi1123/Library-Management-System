import { CanDeactivate } from '@angular/router';
import { CreateStudentCourseComponent } from './create-student-course.component';
import { Injectable } from "@angular/core";

@Injectable()
export class CreateStudentCourseCanDeactivateGuardService implements CanDeactivate<CreateStudentCourseComponent>{
     canDeactivate(component: CreateStudentCourseComponent): boolean{
         if(component.createCourseForm.dirty){
            return confirm("Are you sure you want to discard your changes?");
        }

        return true;
    }
}