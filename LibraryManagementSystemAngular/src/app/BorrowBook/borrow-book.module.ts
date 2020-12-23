import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { SharedModule } from "src/app/shared/shared.module";
import { BorrowBookRoutingModule } from "src/app/BorrowBook/BorrowBook-routing.module";
import { ListBorrowBookComponent } from "src/app/BorrowBook/list-borrow-book.component";
import { CreateBorrowBookComponent } from "src/app/BorrowBook/create-borrow-book.component";
import { BorrowBookDetailsComponent } from "src/app/BorrowBook/borrow-book-details.component";
import { StudentService } from "src/app/student/student.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { BookService } from "src/app/NewBook/NewBook.service";
import { BorrowBookService } from "src/app/BorrowBook/borrowBook.service";
import { MaterialModule } from "src/app/material/material.module";

@NgModule({
  declarations: [
    ListBorrowBookComponent,
    CreateBorrowBookComponent,
    BorrowBookDetailsComponent
  ],
  entryComponents: [CreateBorrowBookComponent, BorrowBookDetailsComponent],
  imports: [
    BorrowBookRoutingModule,
    SharedModule,
    HttpClientModule,
    MaterialModule,
    BsDatepickerModule.forRoot()
  ],
  providers:[StudentService, BookService, BorrowBookService]
})
export class BorrowBookModule { }
