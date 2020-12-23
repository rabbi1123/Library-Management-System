import { Component, OnInit } from '@angular/core';
import { StudentCourse } from "src/app/models/StudentCourse.model";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { StudentCourseService } from "src/app/StudentCourse/StudentCourse.service";
import { MatDialog } from "@angular/material";
import { CreateStudentCourseComponent } from "src/app/StudentCourse/create-student-course.component";

@Component({
  selector: 'app-list-student-course',
  templateUrl: './list-student-course.component.html',
  styleUrls: ['./list-student-course.component.css']
})
export class ListStudentCourseComponent implements OnInit {
  error: string | {};

  courses: StudentCourse[];
  filteredCourses: StudentCourse[];
  private _searchCourse: string;
  get searchCourse(): string {
    return this._searchCourse;
  }
  set searchCourse(value: string) {
    this._searchCourse = value;
    this.filteredCourses = this.filterCourses(value);
  }

  filterCourses(searchString: string) {
    return this.courses.filter(course => course.Title.toLowerCase().indexOf(searchString.toLowerCase()) !== -1)
  }

  constructor(private _router: Router, private _route: ActivatedRoute, 
            private service: StudentCourseService, public dialog: MatDialog) {
    const resolvedData: any | string | {} = this._route.snapshot.data['courseList'];

    if (Array.isArray(resolvedData)) {
      this.courses = resolvedData;
    }
    else {
      this.error = resolvedData;
    }
    if (this._route.snapshot.queryParamMap.has('searchCourse')) {
      this.searchCourse = this._route.snapshot.queryParamMap.get('searchCourse')
    }
    else {
      this.filteredCourses = this.courses;
    }

  }
  ngOnInit() {}

  openDialog(){
    this.dialog.open(CreateStudentCourseComponent, {
      width: '70%',
    });
  }

  onDeleteNotification(id: number) {
    if (this._searchCourse !== null) {
      const j = this.courses.findIndex(e => e.StudentCourse_ID === id);
      if (j !== -1) {
        this.courses.splice(j, 1);
      }
    }
    const i = this.filteredCourses.findIndex(e => e.StudentCourse_ID === id);
    if (i !== -1) {
      this.filteredCourses.splice(i, 1);
    }
  }



}
