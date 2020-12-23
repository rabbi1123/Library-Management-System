import { Component, OnInit } from '@angular/core';
import { IStudent } from "src/app/models/IStudent";
import { ActivatedRoute, Router } from "@angular/router";
import { StudentService } from "src/app/student/student.service";
import { Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  student:IStudent;
  constructor(private _route:ActivatedRoute, private _studentService: StudentService,
               private _router: Router, @Inject(MAT_DIALOG_DATA) public data: any,
               public dialogRef: MatDialogRef<StudentDetailsComponent>) { }

  ngOnInit() {
    /* const id = +this._route.snapshot.params['id'];
    this._studentService.getStudent(id).subscribe(
      (student: IStudent) => this.student = student,
      (err:any) => this._router.navigate(['notfound'])
    ); */

    this.student = this.data.Model;
  }

}
