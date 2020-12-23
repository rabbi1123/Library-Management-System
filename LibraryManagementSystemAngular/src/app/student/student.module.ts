import { NgModule } from '@angular/core';
import { CreateStudentComponent } from './create-student.component';
import { ListStudentComponent } from './list-student.component';
import { StudentRoutingModule } from "src/app/student/student-routing.module";
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from "@angular/common/http";
import { StudentDetailsComponent } from './student-details.component';
import { CreateStudentCanDeactivateGuardService } from "src/app/student/create-student-can-Deactivate-guard.service";
import { StudentService } from "src/app/student/student.service";
import { StudentListResolverService } from "src/app/student/student-list-resolver.service";
import { StudentDetailsGuardService } from "src/app/student/student-details-guard.service";
import { StudentCourseService } from "src/app/StudentCourse/StudentCourse.service";
import { MaterialModule } from "src/app/material/material.module";

@NgModule({
  declarations: [
    CreateStudentComponent,
    ListStudentComponent,
    StudentDetailsComponent
  ],
  entryComponents: [CreateStudentComponent, StudentDetailsComponent],
  imports: [
    StudentRoutingModule,
    SharedModule,
    MaterialModule,
    HttpClientModule
  ],
  providers:[StudentService, CreateStudentCanDeactivateGuardService, StudentListResolverService, StudentCourseService, StudentDetailsGuardService]
})
export class StudentModule { }
