import { CanDeactivate } from '@angular/router';
import { Injectable } from "@angular/core";
import { CreateStudentComponent } from "src/app/student/create-student.component";

@Injectable()
export class CreateStudentCanDeactivateGuardService implements CanDeactivate<CreateStudentComponent>{
    canDeactivate(component: CreateStudentComponent): boolean {
        if (component.NewStudentForm.dirty) {
            return confirm('Are you sure you want to discard your changes?');
        }

        return true;
    }

}