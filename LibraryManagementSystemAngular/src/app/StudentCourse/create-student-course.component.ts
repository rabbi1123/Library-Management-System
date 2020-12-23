import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { StudentCourse } from "src/app/models/StudentCourse.model";
import { StudentCourseService } from "src/app/StudentCourse/StudentCourse.service";
import { Router } from "@angular/router";
import { ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-create-student-course',
  templateUrl: './create-student-course.component.html',
  styleUrls: ['./create-student-course.component.css']
})
export class CreateStudentCourseComponent implements OnInit {

  @ViewChild('courseForm') public createCourseForm: NgForm;

  studentcourse: StudentCourse;
  panelTitle: string;
  dialogData: number = 0;

  constructor(private _StudentCourseService: StudentCourseService,
              private _router: Router,private _route: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<CreateStudentCourseComponent>) { }

  ngOnInit() {
    /* this._route.paramMap.subscribe(parameterMap =>{
        const id = +parameterMap.get('id');
        this.getCourse(id);
    }); */
    if(this.data.ID){
      this.dialogData = this.data.ID;
    }
    this.getCourse(this.dialogData);
  }

  private getCourse(id:number){
    if(id === 0) {
      this.studentcourse = {
        StudentCourse_ID: null,
        Title: null
      };
      this.panelTitle = 'Create Student Course';
      this.createCourseForm.reset();
    }
    else {
      this.panelTitle = 'Edit Student Course';
      this._StudentCourseService.getCourse(id).subscribe(
        (course: StudentCourse) => this.studentcourse = course,
        (err:any) => this._router.navigate(['notfound'])
      );
    }
  }

  closeDialog() {
    this.dialogRef.close()
  }

  saveCourse(): void {
    if (this.studentcourse.StudentCourse_ID == null) {
      this._StudentCourseService.save(this.studentcourse).subscribe(
        () => {
          this.createCourseForm.reset();
          this.dialogRef.close()
        },
        (err:any) => this._router.navigate(['notfound'])
      );
    }else{
      this._StudentCourseService.update(this.studentcourse).subscribe(
        () => {
          this.createCourseForm.reset();
          this.dialogRef.close()
        },
        (err:any) => this._router.navigate(['notfound'])
      );
    }
  }
}
