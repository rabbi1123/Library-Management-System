import { NgModule } from '@angular/core';
import { StudentCourseDetailsComponent } from "src/app/StudentCourse/student-course-details.component";
import { DisplayCourseComponent } from "src/app/StudentCourse/display-course.component";
import { CreateStudentCourseComponent } from "src/app/StudentCourse/create-student-course.component";
import { ListStudentCourseComponent } from "src/app/StudentCourse/list-student-course.component";
import { SharedModule } from "src/app/shared/shared.module";
import { HttpClientModule } from "@angular/common/http";
import { StudentCourseRoutingModule } from "src/app/StudentCourse/StudentCourse-routing.module";
import { StudentCourseService } from "src/app/StudentCourse/StudentCourse.service";
import { StudentCourseListResolverService } from "src/app/StudentCourse/StudentCourse-resolver.service";
import { StudentCourseDetailsGuardService } from "src/app/StudentCourse/StudentCourse-details-guard.service";
import { CreateStudentCourseCanDeactivateGuardService } from "src/app/StudentCourse/create-studentCourse-can-deactivate-guard.service";
import { MaterialModule } from "src/app/material/material.module";

@NgModule({
  declarations: [
    ListStudentCourseComponent,
    CreateStudentCourseComponent,
    DisplayCourseComponent,
    StudentCourseDetailsComponent
  ],
  entryComponents: [CreateStudentCourseComponent, StudentCourseDetailsComponent],
  imports: [
    StudentCourseRoutingModule,
    HttpClientModule,
    MaterialModule,
    SharedModule
  ],
  providers: [StudentCourseService, CreateStudentCourseCanDeactivateGuardService, StudentCourseListResolverService, StudentCourseDetailsGuardService]
})

export class StudentCourseModule { }
