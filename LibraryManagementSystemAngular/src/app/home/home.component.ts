import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { BookCategoryService } from "src/app/BookCategory/BookCategory.service";
import { BorrowBookService } from "src/app/BorrowBook/borrowBook.service";
import { BookService } from "src/app/NewBook/NewBook.service";
import { StudentService } from "src/app/student/student.service";
import { StudentCourseService } from "src/app/StudentCourse/StudentCourse.service";
import { BookCategory } from "src/app/models/BookCategory.model";
import { IBorrowBook } from "src/app/BorrowBook/IBorrowBook";
import { IBookList } from "src/app/models/IBookList";
import { IStudent } from "src/app/models/IStudent";
import { StudentCourse } from "src/app/models/StudentCourse.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  bookCategoryList: BookCategory[];
  borrowBookList: IBorrowBook[];
  bookList: IBookList[] | {};
  studentList: IStudent[];
  studentCourseList: StudentCourse[];

  constructor(private router: Router, private _BookCategoryService:BookCategoryService,
          private _borrowBookService: BorrowBookService, private _bookService: BookService,
          private _studentService: StudentService, private _StudentCourseService: StudentCourseService,) { }

  ngOnInit() {
    this._BookCategoryService.getBookCategory().subscribe(
      (categoryList) => this.bookCategoryList = categoryList,
      (err) => this.router.navigate(['notfound'])
    );

    this._borrowBookService.getBorrowBooks().subscribe(
      (borrowList) => this.borrowBookList = borrowList,
      (err) => this.router.navigate(['notfound'])
    );

    this._bookService.getBookLists().subscribe(
      (list) => this.bookList = list,
      (err) => this.router.navigate(['notfound'])
    );

    this._studentService.getStudents().subscribe(
      (stu) => this.studentList = stu,
      (err) => this.router.navigate(['notfound'])
    );

    this._StudentCourseService.getCourses().subscribe(
      (course) => this.studentCourseList = course,
      (err) => this.router.navigate(['notfound'])
    );
  }
  
}
