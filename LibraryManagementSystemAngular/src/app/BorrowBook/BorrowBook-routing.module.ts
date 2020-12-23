import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ListBorrowBookComponent } from "src/app/BorrowBook/list-borrow-book.component";
import { CreateBorrowBookComponent } from "src/app/BorrowBook/create-borrow-book.component";
import { BorrowBookDetailsComponent } from "src/app/BorrowBook/borrow-book-details.component";

const routes: Routes = [
 
  {
    path: '',
    component: ListBorrowBookComponent
   // resolve: {  }
  },

  {
    path: 'create',
    component: CreateBorrowBookComponent
   // canDeactivate: []
  },

  {
    path: 'edit/:id',
    component: CreateBorrowBookComponent
  },
  {
    path: ':id',
    component: BorrowBookDetailsComponent
   // canActivate: []
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes), HttpClientModule],
  exports: [RouterModule]
})
export class BorrowBookRoutingModule { }
