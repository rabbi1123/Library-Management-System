import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { BookCategory } from "src/app/models/BookCategory.model";
import { BookCategoryService } from "src/app/BookCategory/BookCategory.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-create-book-category',
  templateUrl: './create-book-category.component.html',
  styleUrls: ['./create-book-category.component.css']
})
export class CreateBookCategoryComponent implements OnInit {
  @ViewChild('categoryForm') public createBookCategoryForm: NgForm;
  panelTitle: string;
  bookCategory: BookCategory;
  dialogData: number = null;

  constructor(private _bookCategoryService: BookCategoryService,
    private _router: Router,
    private _route: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CreateBookCategoryComponent>) { }

  ngOnInit() {
    /* this._route.paramMap.subscribe(parameterMap => {
      const id = +parameterMap.get('id');
      this.getCategory(id);
    }); */
    this.dialogData = this.data.ID;
    this.getCategory(this.dialogData);

  }

  private getCategory(id: number) {
    if (id == null) {
      this.bookCategory = {
        BookCategory_ID: null,
        Category_Name: null
      };
      this.panelTitle = 'Create Book Category';
      this.createBookCategoryForm.reset();
    } else {
      this.panelTitle = 'Edit Book Category';
      this._bookCategoryService.getCategory(id).subscribe(
        (BookCategory: BookCategory) => this.bookCategory = BookCategory,
        (err: any) => alert(err)
      );
    }
  }

  closeDialog() {
    this.dialogRef.close()
  }

  saveCategory(): void {
    //const newBookCategory: BookCategory = Object.assign({},this.bookCategory);
    if (this.bookCategory.BookCategory_ID == null) {
      this._bookCategoryService.save(this.bookCategory).subscribe(
        (data: BookCategory) => {
          this.createBookCategoryForm.reset();
          /* this._router.navigate(['BookCategories']); */
          this.dialogRef.close()
        },
        (error: any) => alert("There is something wrong in saving Book Category")
      );
    }else{
      this._bookCategoryService.update(this.bookCategory).subscribe(
        () => {
          this.createBookCategoryForm.reset();
          /* this._router.navigate(['BookCategories']); */
          this.dialogRef.close()
        },
        (error: any) => alert("There is something wrong in saving Book Category")
      );
    }
  }

}
