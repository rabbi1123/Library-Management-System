import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { BookCategoryService } from "src/app/BookCategory/BookCategory.service";
import { BookCategory } from "src/app/models/BookCategory.model";
import { Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-book-category-details',
  templateUrl: './book-category-details.component.html',
  styleUrls: ['./book-category-details.component.css']
})
export class BookCategoryDetailsComponent implements OnInit {
  bookCategory:BookCategory;
  constructor(private _route:ActivatedRoute, private _BookCategoryService:BookCategoryService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<BookCategoryDetailsComponent>) { }

  ngOnInit() {
    /* const id = +this._route.snapshot.params['id'];
    this._BookCategoryService.getCategory(id).subscribe(
      (BookCategory: BookCategory) => this.bookCategory = BookCategory,
      (err: any) => alert(err)
    ); */

    this.bookCategory = this.data.model;
  }

}
