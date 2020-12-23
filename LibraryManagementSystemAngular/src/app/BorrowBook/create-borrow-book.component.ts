import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { StudentService } from "src/app/student/student.service";
import { IStudent } from "src/app/models/IStudent";
import { FormBuilder } from "@angular/forms";
import { IBookList } from "src/app/models/IBookList";
import { BookService } from "src/app/NewBook/NewBook.service";
import { Validators } from "@angular/forms";
import { FormArray } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { BorrowBookService } from "src/app/BorrowBook/borrowBook.service";
import { IBorrowBook } from "src/app/BorrowBook/IBorrowBook";
import { Router } from "@angular/router";
import { IBorrowBookDetails } from "src/app/BorrowBook/IBorrowBookDetails";
import { MAT_DIALOG_DATA } from "@angular/material";
import { Inject } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-create-borrow-book',
  templateUrl: './create-borrow-book.component.html',
  styleUrls: ['./create-borrow-book.component.css']
})
export class CreateBorrowBookComponent implements OnInit {
  borrowBookForm: FormGroup;
  Students: IStudent[];
  Books: IBookList[];
  BorrowBook: IBorrowBook;
  pageTitle: string;
  dialogData: number;

  validationMessages = {
    'Student_ID': {
      'required': 'Student Name is Required.'
    },
    'CurrentDate': {
      'required': 'Current Date is Required.'
    },
    'ReturnDate': {
      'required': 'Return Date is Required.'
    }
  };
  formErrors = {
    'Student_ID': '',
    'CurrentDate': '',
    'ReturnDate': ''
  };

  constructor(private studentService: StudentService, private _borrowBookService: BorrowBookService,
               private bookService: BookService, private _router: Router, private fb: FormBuilder, 
               private route: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data: any,
               public dialogRef: MatDialogRef<CreateBorrowBookComponent>) { }

  ngOnInit() {
    this.dialogData = this.data.ID;

    this.studentService.getStudents().subscribe(
      (students: IStudent[]) => this.Students = students
    );
    this.bookService.getBookLists().subscribe(
      (books: IBookList[]) => this.Books = books
    )

    this.borrowBookForm = this.fb.group({
      Student_ID: ['', Validators.required],
      CurrentDate: [new Date().toLocaleDateString("en-US"), Validators.required],
      ReturnDate: ['', Validators.required],
      BorrowBookDetails: this.fb.array([
        this.addBookDetailsFormGroup()
      ])
    });

    this.borrowBookForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.borrowBookForm);
    });


    /* this.route.paramMap.subscribe(params => {
      const borrowID = +params.get('id');
      if (borrowID) {
        this.pageTitle = 'Edit Borrow Book';
        this.getBorrowBook(borrowID);
      } else {
        this.pageTitle = 'Create Borrow Book';
        this.BorrowBook = {
          BorrowBook_ID: null,
          Student_ID: null,
          CurrentDate: new Date(),
          ReturnDate: new Date(),
          ReceivedDate: new Date(),
          Status: '',
          Student: null,
          BorrowBookDetails: []
        };
      }
    }) */

      if (this.dialogData) {
        this.pageTitle = 'Edit Borrow Book';
        this.getBorrowBook(this.dialogData);
      } else {
        this.pageTitle = 'Create Borrow Book';
        this.BorrowBook = {
          BorrowBook_ID: null,
          Student_ID: null,
          CurrentDate: new Date(),
          ReturnDate: new Date(),
          ReceivedDate: new Date(),
          Status: '',
          Student: null,
          BorrowBookDetails: []
        };
      }
    


  }

  getBorrowBook(id: number) {
    this._borrowBookService.getBorrowBook(id).subscribe(
      (borrowBook: IBorrowBook) => {
        this.editBorrowBook(borrowBook);
        this.BorrowBook = borrowBook;
      },
      (err) => this._router.navigate(['notfound'])
    );
  }

  editBorrowBook(borrowBook: IBorrowBook) {
    this.borrowBookForm.patchValue({
      Student_ID: borrowBook.Student_ID,
      CurrentDate: new Date(borrowBook.CurrentDate),
      ReturnDate: new Date(borrowBook.ReturnDate)
    });
    this.borrowBookForm.setControl('BorrowBookDetails', this.setExistingBorrowBookDetails(borrowBook.BorrowBookDetails));
  }

  setExistingBorrowBookDetails(borrowBookDetails: IBorrowBookDetails[]): FormArray {
    const formArray = new FormArray([]);
    borrowBookDetails.forEach(s => {
      formArray.push(this.fb.group({
        BorrowBookDetails_ID: s.BorrowBookDetails_ID,
        Book_ID: s.Book_ID,
        BorrowBook_ID: s.BorrowBook_ID
      }));
    });
    return formArray;
  }

  addBookDetailsFormGroup(): FormGroup {
    return this.fb.group({
      BorrowBookDetails_ID: [''],
      Book_ID: ['', Validators.required],
      BorrowBook_ID: ['']
    });
  }

  addBookButtonClick(): void {
    (<FormArray>this.borrowBookForm.get('BorrowBookDetails')).push(this.addBookDetailsFormGroup());
  }

  removeBookButtonClick(BookGroupIndex: number): void {
    const borrowBookFormArray = <FormArray>this.borrowBookForm.get('BorrowBookDetails');
    borrowBookFormArray.removeAt(BookGroupIndex);
    borrowBookFormArray.markAsDirty();
    borrowBookFormArray.markAsTouched();
  }


  logValidationErrors(group: FormGroup = this.borrowBookForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);

      this.formErrors[key] = '';
      if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty || abstractControl.value !== '')) {
        const messages = this.validationMessages[key];
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + ' ';
          }
        }
      }

      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }

    });
  }

  closeDialog() {
    this.dialogRef.close()
  }

  onSubmit(): void {
    this.mapformValuesToBorrowBookModel();
    if (this.BorrowBook.BorrowBook_ID) {
      this._borrowBookService.updateBorrowBook(this.BorrowBook).subscribe(
        () => this.dialogRef.close(),
        (err: any) => this._router.navigate(['notfound'])
      );
    } else {
      this._borrowBookService.addBorrowBook(this.BorrowBook).subscribe(
        /* () => this._router.navigate(['BorrowBook']), */
        () => this.dialogRef.close(),
        (err: any) => this._router.navigate(['notfound'])
      );
    }
  }

  mapformValuesToBorrowBookModel() {
    this.BorrowBook.Student_ID = this.borrowBookForm.value.Student_ID;
    this.BorrowBook.CurrentDate = this.borrowBookForm.value.CurrentDate;
    this.BorrowBook.ReturnDate = this.borrowBookForm.value.ReturnDate;
    this.BorrowBook.ReceivedDate = this.borrowBookForm.value.ReceivedDate;
    this.BorrowBook.BorrowBookDetails = this.borrowBookForm.value.BorrowBookDetails;
    this.BorrowBook.Student = null;
  }

  

}
