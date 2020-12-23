import { Component, OnInit, Input, Output } from '@angular/core';
import { StudentCourse } from "src/app/models/StudentCourse.model";
import { Router } from "@angular/router";
import { StudentCourseService } from "src/app/StudentCourse/StudentCourse.service";
import { EventEmitter } from "@angular/core";
import { MatDialog } from "@angular/material";
import { StudentCourseDetailsComponent } from "src/app/StudentCourse/student-course-details.component";
import { CreateStudentCourseComponent } from "src/app/StudentCourse/create-student-course.component";

@Component({
  selector: 'app-display-course',
  templateUrl: './display-course.component.html',
  styleUrls: ['./display-course.component.css']
})
export class DisplayCourseComponent implements OnInit {

  @Input() course: StudentCourse;
  @Input() _searchCourse: string;
  @Output() notifyDelete: EventEmitter<number> = new EventEmitter<number>();
  confirmDelete: false;

  constructor(private _router: Router, private _StudentCourseService: StudentCourseService, public dialog: MatDialog) { }

  ngOnInit() {

  }

  viewStudentCourse() {
    /* this._router.navigate(['/StudentCourse', this.course.StudentCourse_ID], {
      queryParams: { 'searchCourse': this._searchCourse }
    }); */
    this.dialog.open(StudentCourseDetailsComponent, {
      width: '70%',
      data: {model: this.course}
    });
  }

  editStudentCourse() {
    /* this._router.navigate(['StudentCourse/edit', this.course.StudentCourse_ID]); */
    this.dialog.open(CreateStudentCourseComponent, {
      width: '70%',
      data: {ID: this.course.StudentCourse_ID}
    });
  }

  deleteStudentCourse() {
    if(confirm("Are you sure you want to delete this Student Course?")){
      this._StudentCourseService.delete(this.course.StudentCourse_ID).subscribe();
      this.notifyDelete.emit(this.course.StudentCourse_ID);
    }
    
  }

}
