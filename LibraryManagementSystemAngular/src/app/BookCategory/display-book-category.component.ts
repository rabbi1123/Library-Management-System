import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BookCategory } from "src/app/models/BookCategory.model";
import { Router } from "@angular/router";
import { BookCategoryService } from "src/app/BookCategory/BookCategory.service";
import { MatDialog } from "@angular/material";
import { CreateBookCategoryComponent } from "src/app/BookCategory/create-book-category.component";
import { BookCategoryDetailsComponent } from "src/app/BookCategory/book-category-details.component";

@Component({
  selector: 'app-display-book-category',
  templateUrl: './display-book-category.component.html',
  styleUrls: ['./display-book-category.component.css']
})
export class DisplayBookCategoryComponent implements OnInit {
  @Input() bookCategory: BookCategory;
  @Input() searchBook: string;
  @Output() notifyDelete: EventEmitter<number> = new EventEmitter<number>();
  confirmDelete = false;

  constructor(private _router: Router,private _bookCategoryService: BookCategoryService, 
                public dialog: MatDialog) { }

  ngOnInit() {
  }

  viewCategory(){
    /* this._router.navigate(['/BookCategories', this.bookCategory.BookCategory_ID],{
      queryParams:{'searchBook':this.searchBook}
    }); */
    this.dialog.open(BookCategoryDetailsComponent, {
      width: '70%',
      data: {model: this.bookCategory}
    });

  }

  editCategory(){
    /* this._router.navigate(['/BookCategories/edit', this.bookCategory.BookCategory_ID]); */

    this.dialog.open(CreateBookCategoryComponent, {
      width: '70%',
      data: {ID: this.bookCategory.BookCategory_ID}
    });
  }

  deleteCategory(){
    if(confirm("Are you sure you want to delete this Borrow book?")) {
      this._bookCategoryService.delete(this.bookCategory.BookCategory_ID).subscribe();
      this.notifyDelete.emit(this.bookCategory.BookCategory_ID);
    }
  }

}
