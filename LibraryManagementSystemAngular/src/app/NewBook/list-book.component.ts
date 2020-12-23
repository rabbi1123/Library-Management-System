import { Component, OnInit } from '@angular/core';
import { IBookList } from "src/app/models/IBookList";
import { BookService } from "src/app/NewBook/NewBook.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material";
import { CreateNewBookComponent } from "src/app/NewBook/create-new-book.component";
import { BookDetailsComponent } from "src/app/NewBook/book-details.component";

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css']
})
export class ListBookComponent implements OnInit {
  bookList: IBookList[];
  filteredBook: IBookList[];
  error: any;
  private _searchBook: string;

  get SearchBook(): string {
    return this._searchBook;
  }
  set SearchBook(value: string) {
    this._searchBook = value;
    this.filteredBook = this.filterbook(value);
  }

  filterbook(search: string) {
    return this.bookList.filter(book => book.Title.toLowerCase().indexOf(search.toLowerCase()) !== -1);
  }

  constructor(private _router: Router, private _route: ActivatedRoute, private _bookService:BookService,public dialog: MatDialog) {
    const resolvedData: IBookList[] | string | {} = this._route.snapshot.data['BookList'];
    if(Array.isArray(resolvedData)){
      this.bookList = resolvedData;
    }else{
      this.error = resolvedData;
    }

    if (this._route.snapshot.queryParamMap.has('SearchBook')) {
      this.SearchBook = this._route.snapshot.queryParamMap.get('SearchBook')
    }
    else {
      this.filteredBook = this.bookList;
    }
  }

  ngOnInit() {
    
  }

  openDialog(){
    this.dialog.open(CreateNewBookComponent, {
      width: '70%',
    });
  }



  editButtonClick(id: number) {
    /* this._router.navigate(['Book/edit', id]); */
    this.dialog.open(CreateNewBookComponent, {
      width: '70%',
      data: {ID: id}
    });
  }

  viewButtonClick(model) {
    /* this._router.navigate(['Book/', id], {
      queryParams: { 'SearchBook': this.SearchBook }
    }); */

    this.dialog.open(BookDetailsComponent, {
      width: '70%',
      data: {Model : model}
    });
  }

  deleteButtonClick(id: number){
    if(confirm("Are you sure you want to delete that book?")) {
      this._bookService.delete(id).subscribe();
      
        if(this._searchBook !== null){
          const j = this.bookList.findIndex(e => e.Book_ID === id);
          if(j !== -1){
            this.bookList.splice(j, 1);
          }
        }
        const i = this.filteredBook.findIndex(e => e.Book_ID === id);
        if(i !== -1){
          this.filteredBook.splice(i, 1);
        }
    }
    
  }

}
