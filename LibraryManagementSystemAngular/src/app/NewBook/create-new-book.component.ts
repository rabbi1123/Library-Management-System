import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { BookService } from "src/app/NewBook/NewBook.service";
import { IBookList } from "src/app/models/IBookList";
import { Router } from "@angular/router";
import { ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { BookCategory } from "src/app/models/BookCategory.model";
import { BookCategoryService } from "src/app/BookCategory/BookCategory.service";
import { Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-create-new-book',
  templateUrl: './create-new-book.component.html',
  styleUrls: ['./create-new-book.component.css']
})
export class CreateNewBookComponent implements OnInit {
  @ViewChild('bookForm') public BookForm: NgForm;
  
  dialogData: number;
  newBookForm: FormGroup;
  book: IBookList;
  bookCategory: BookCategory[];
  pageTitle: string;
  validationMessages = {
    'title': {
      'required': 'Title is Required'
    },
    'author': {
      'required': 'Author Name is Required'
    },
    'category_ID': {
      'required': 'Author Name is Required'
    }
  };
  formErrors = {
    'title': '',
    'author': '',
    'category_ID': ''
  };

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router, private _bookCategoryService: BookCategoryService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CreateNewBookComponent>) { }

  ngOnInit() {
    this.dialogData = this.data.ID;

    this._bookCategoryService.getBookCategory().subscribe(
      (categories: BookCategory[]) => this.bookCategory = categories
    );

    this.newBookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      category_ID: ['', Validators.required]
    });
    this.newBookForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.newBookForm);
    });

    
      if (this.dialogData) {
        this.pageTitle = 'Edit Book';
        this.getBook(this.dialogData);
      }
      else {
        this.pageTitle = 'Create Book';
        this.book = {
          Book_ID: null,
          Title: '',
          Author: '',
          Category_ID: null,
          BookCategory: null
        };
      }
    
  }

  getBook(isbnNumber: number) {
    this.bookService.getBook(isbnNumber).subscribe(
      (book: IBookList) => {
        this.editBook(book);
        this.book = book;
      }
    );
  }

  editBook(book: IBookList) {
    this.newBookForm.patchValue({
      title: book.Title,
      author: book.Author,
      category_ID: book.Category_ID
    });
  }

  logValidationErrors(group: FormGroup = this.newBookForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      } else {
        this.formErrors[key] = '';
        if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty || abstractControl.value !== '')) {
          const messages = this.validationMessages[key];
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + ' ';
            }
          }
        }
      }
    });
  }

  closeDialog() {
    this.dialogRef.close()
  }

  onSubmit(): void {
    this.mapFormValuesToBookModel();
    if (this.book.Book_ID) {
      this.bookService.update(this.book).subscribe(
        () => this.dialogRef.close()
      );
    } else {
      this.bookService.save(this.book).subscribe(
        () => {
          this.BookForm.reset();
          this.dialogRef.close()
        }
      );
    }
  }

  mapFormValuesToBookModel() {
    this.book.Title = this.newBookForm.value.title;
    this.book.Author = this.newBookForm.value.author;
    this.book.Category_ID = this.newBookForm.value.category_ID;
  }

}
