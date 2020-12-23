import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";


@NgModule({
  declarations: [],
  imports: [],
  exports:[
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    /* BookCategoryModule,
    BorrowBookModule,
    NewBookModule,
    StudentModule,
    StudentCourseModule */
  ]
})
export class SharedModule { }
