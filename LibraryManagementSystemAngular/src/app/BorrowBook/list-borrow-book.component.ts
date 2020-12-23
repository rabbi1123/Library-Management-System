import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IBorrowBook } from "src/app/BorrowBook/IBorrowBook";
import { BorrowBookService } from "src/app/BorrowBook/borrowBook.service";
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Router } from "@angular/router";
import { CreateBorrowBookComponent } from "src/app/BorrowBook/create-borrow-book.component";
import { BorrowBookDetailsComponent } from "src/app/BorrowBook/borrow-book-details.component";



@Component({
  selector: 'app-list-borrow-book',
  templateUrl: './list-borrow-book.component.html',
  styleUrls: ['./list-borrow-book.component.css']
})
export class ListBorrowBookComponent implements OnInit {
  borrowBooks: IBorrowBook[];

  /* displayedColumns: string[];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator; */
 
  constructor(private _borrowBookService: BorrowBookService, private _router: Router,public dialog: MatDialog) {
    
  }

  ngOnInit() {
    this._borrowBookService.getBorrowBooks().subscribe(
      (listBorrowBook) => this.borrowBooks = listBorrowBook,
      (err) => this._router.navigate(['notfound'])
    );
    
    /* this.displayedColumns = ['Student Name', 'Current Date', 'Return Date', 'Received Date', 'Status'];
    this.dataSource = new MatTableDataSource<IBorrowBook>(this.borrowBooks); */
    /* this.dataSource.paginator = this.paginator; */
  }

  openDialog(){
    this.dialog.open(CreateBorrowBookComponent, {
      width: '70%',
    });
  }

  
  editButtonClick(id: number) {
    /* this._router.navigate(['BorrowBook/edit', id]); */
    this.dialog.open(CreateBorrowBookComponent, {
      width: '70%',
      data: {ID: id}
    });
  }

  viewButtonClick(model: IBorrowBook) {
    /* this._router.navigate(['/BorrowBook',id]); */
    this.dialog.open(BorrowBookDetailsComponent, {
      width: '70%',
      data: {Model : model}
    });
  }

  deleteButtonClick(id: number){
    if(confirm("Are you sure you want to delete this Borrow book?")) {
      this._borrowBookService.delete(id).subscribe();
    }
  }

}
