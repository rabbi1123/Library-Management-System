import { Component, OnInit } from '@angular/core';
import { BookCategory } from "src/app/models/BookCategory.model";
import { Router, ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material";
import { CreateBookCategoryComponent } from "src/app/BookCategory/create-book-category.component";

@Component({
  selector: 'app-list-book-category',
  templateUrl: './list-book-category.component.html',
  styleUrls: ['./list-book-category.component.css']
})
export class ListBookCategoryComponent implements OnInit {
  categories: BookCategory[];
  filteredcategories: BookCategory[];
  private _searchBook: string;
  error: any;
  get searchBook(): string {
    return this._searchBook;
  }
  set searchBook(value: string) {
    this._searchBook = value;
    this.filteredcategories = this.filterbook(value);
  }
  
  filterbook(search: string) {
    return this.categories.filter(book => book.Category_Name.toLowerCase().indexOf(search.toLowerCase()) !== -1);
  }

  constructor(private _router: Router, private _route: ActivatedRoute, public dialog: MatDialog) {
    const resolvedData: BookCategory[] | string | {} = this._route.snapshot.data['BookcategoryList'];
    if(Array.isArray(resolvedData)){
      this.categories = resolvedData;
    }else{
      this.error = resolvedData;
    }

    if (this._route.snapshot.queryParamMap.has('searchBook')) {
      this.searchBook = this._route.snapshot.queryParamMap.get('searchBook')
    }
    else {
      this.filteredcategories = this.categories;
    }
  }

  openDialog(){
    this.dialog.open(CreateBookCategoryComponent, {
      width: '70%',
    });
  }

  onDeleteNotification(id: number){
    if(this._searchBook !== null){
      const j = this.categories.findIndex(e => e.BookCategory_ID === id);
      if(j !== -1){
        this.categories.splice(j, 1);
      }
    }
    const i = this.filteredcategories.findIndex(e => e.BookCategory_ID === id);
    if(i !== -1){
      this.filteredcategories.splice(i, 1);
    }
  }

  ngOnInit() {
  }
}
