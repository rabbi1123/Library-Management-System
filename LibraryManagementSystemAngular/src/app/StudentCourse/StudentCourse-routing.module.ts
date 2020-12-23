import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ListStudentCourseComponent } from "src/app/StudentCourse/list-student-course.component";
import { CreateStudentCourseComponent } from "src/app/StudentCourse/create-student-course.component";
import { StudentCourseDetailsComponent } from "src/app/StudentCourse/student-course-details.component";
import { StudentCourseListResolverService } from "src/app/StudentCourse/StudentCourse-resolver.service";
import { StudentCourseDetailsGuardService } from "src/app/StudentCourse/StudentCourse-details-guard.service";
import { CreateStudentCourseCanDeactivateGuardService } from "src/app/StudentCourse/create-studentCourse-can-deactivate-guard.service";

const route: Routes = [
    {
        path: '',
        component: ListStudentCourseComponent,
        resolve: { courseList: StudentCourseListResolverService }
    },
    {
        path: 'edit/:id',
        component: CreateStudentCourseComponent,
       // canDeactivate: [CreateStudentCourseCanDeactivateGuardService]
    },
    {
        path: ':id', component: StudentCourseDetailsComponent,
       // canActivate: [StudentCourseDetailsGuardService]
    }
];

@NgModule({
    imports: [RouterModule.forChild(route), HttpClientModule],
    exports: [RouterModule]
})

export class StudentCourseRoutingModule { }