import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { BookService } from "src/app/NewBook/NewBook.service";
import { IBookList } from "src/app/models/IBookList";
import { Router } from "@angular/router";
import { Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book:IBookList;
  constructor(private _route:ActivatedRoute, private _bookService: BookService, 
              private _router: Router, @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<BookDetailsComponent>) { }

  ngOnInit() {
    /* const id = +this._route.snapshot.params['id'];
    this._bookService.getBook(id).subscribe(
      (Book: IBookList) => this.book = Book,
      (err:any) => this._router.navigate(['notfound'])
    ); */
    this.book = this.data.Model;
  }

}
