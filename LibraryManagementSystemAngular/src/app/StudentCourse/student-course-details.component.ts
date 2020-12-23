import { Component, OnInit } from '@angular/core';
import { StudentCourse } from "src/app/models/StudentCourse.model";
import { ActivatedRoute } from "@angular/router";
import { StudentCourseService } from "src/app/StudentCourse/StudentCourse.service";
import { Router } from "@angular/router";
import { Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-student-course-details',
  templateUrl: './student-course-details.component.html',
  styleUrls: ['./student-course-details.component.css']
})
export class StudentCourseDetailsComponent implements OnInit {
  course: StudentCourse;
  constructor(private _route:ActivatedRoute, private _StudentCourseService: StudentCourseService,
       private _router: Router, @Inject(MAT_DIALOG_DATA) public data: any,
       public dialogRef: MatDialogRef<StudentCourseDetailsComponent>) { }

  ngOnInit() {
    /* const id = +this._route.snapshot.paramMap.get('id');
    this._StudentCourseService.getCourse(id).subscribe(
      (Course: StudentCourse) => this.course = Course,
      (err:any) => this._router.navigate(['notfound'])
    ); */
    this.course = this.data.model;
  }

}
