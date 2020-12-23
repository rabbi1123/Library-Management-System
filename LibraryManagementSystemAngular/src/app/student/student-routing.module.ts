import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CreateStudentComponent } from "src/app/student/create-student.component";
import { ListStudentComponent } from "src/app/student/list-student.component";
import { StudentDetailsComponent } from "src/app/student/student-details.component";
import { CreateStudentCanDeactivateGuardService } from "src/app/student/create-student-can-Deactivate-guard.service";
import { StudentListResolverService } from "src/app/student/student-list-resolver.service";
import { StudentDetailsGuardService } from "src/app/student/student-details-guard.service";
import { StudentCourseListResolverService } from "src/app/StudentCourse/StudentCourse-resolver.service";

const routes: Routes = [
 
  {
    path: '',
    component: ListStudentComponent,
    resolve: { StudentList: StudentListResolverService }
  },

  {
    path: 'create',
    component: CreateStudentComponent,
  //  canDeactivate: [CreateStudentCanDeactivateGuardService]
  },

  {
    path: 'edit/:id',
    component: CreateStudentComponent
  },
  {
    path: ':id',
    component: StudentDetailsComponent,
   // canActivate: [StudentDetailsGuardService]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes), HttpClientModule],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
