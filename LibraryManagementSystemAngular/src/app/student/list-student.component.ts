import { Component, OnInit } from '@angular/core';
import { IStudent } from "src/app/models/IStudent";
import { StudentService } from "src/app/student/student.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material";
import { CreateStudentComponent } from "src/app/student/create-student.component";
import { StudentDetailsComponent } from "src/app/student/student-details.component";

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css']
})
export class ListStudentComponent implements OnInit {

  students: IStudent[];
  

  filteredStudent: IStudent[];
  error: any;
  private _searchStudent: string;

  get SearchStudent(): string {
    return this._searchStudent;
  }
  set SearchStudent(value: string) {
    this._searchStudent = value;
    this.filteredStudent = this.filterStudent(value);
  }

  filterStudent(search: string) {
    return this.students.filter(student => student.First_Name.toLowerCase().indexOf(search.toLowerCase()) !== -1);
  }

  constructor(private _studentService: StudentService, private _route: ActivatedRoute, 
        private _router: Router, public dialog: MatDialog) {

    const resolvedData: IStudent[] | {} | string = this._route.snapshot.data['StudentList'];
    if(Array.isArray(resolvedData)){
      this.students = resolvedData;
    }else{
      this.error = resolvedData;
    }

    if (this._route.snapshot.queryParamMap.has('SearchStudent')) {
      this.SearchStudent = this._route.snapshot.queryParamMap.get('SearchStudent')
    }
    else {
      this.filteredStudent = this.students;
    }
  }

  ngOnInit() {
    /* this._studentService.getStudents().subscribe(
      (listStudents) => this.students = listStudents,
      (err) => console.log(err)
    ); */
  }

  openDialog(){
    this.dialog.open(CreateStudentComponent, {
      width: '70%',
    });
  }

  editButtonClick(id: number){
    /* this._router.navigate(['student/edit', id]); */
    this.dialog.open(CreateStudentComponent, {
      width: '70%',
      data: {ID : id}
    });

  }

  viewButtonClick(model){
    /* this._router.navigate(['/student',id], {
      queryParams: { 'SearchStudent': this.SearchStudent }
    }); */
    this.dialog.open(StudentDetailsComponent, {
      width: '70%',
      data: {Model : model}
    });
  }

  deleteButtonClick(id:number){
    if(confirm("Are you sure you want to delete that book?")) {
      this._studentService.delete(id).subscribe();
      
          if(this._searchStudent !== null){
            const j = this.students.findIndex(e => e.Student_ID === id);
            if(j !== -1){
              this.students.splice(j, 1);
            }
          }
          const i = this.filteredStudent.findIndex(e => e.Student_ID === id);
          if(i !== -1){
            this.filteredStudent.splice(i, 1);
          }
      }
    
  }

}
