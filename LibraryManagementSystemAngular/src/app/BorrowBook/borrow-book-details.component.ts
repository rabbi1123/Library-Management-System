import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { BorrowBookService } from "src/app/BorrowBook/borrowBook.service";
import { IBorrowBook } from "src/app/BorrowBook/IBorrowBook";
import { Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-borrow-book-details',
  templateUrl: './borrow-book-details.component.html',
  styleUrls: ['./borrow-book-details.component.css']
})
export class BorrowBookDetailsComponent implements OnInit {

  borrowBook: IBorrowBook;
  constructor(private _route:ActivatedRoute, private _borrowBookService: BorrowBookService,
               private _router: Router, @Inject(MAT_DIALOG_DATA) public data: any,
               public dialogRef: MatDialogRef<BorrowBookDetailsComponent>) { }

  ngOnInit() {
    /* const id = +this._route.snapshot.params['id'];
    this._borrowBookService.getBorrowBook(id).subscribe(
      (BorrowBook: IBorrowBook) => this.borrowBook = BorrowBook,
      (err:any) => this._router.navigate(['notfound'])
    ); */

    this.borrowBook = this.data.Model;
  }

}
