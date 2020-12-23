import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateBookCategoryComponent } from "src/app/BookCategory/create-book-category.component";
import { ListBookCategoryComponent } from "src/app/BookCategory/list-book-category.component";
import { CreateBookCategoryCanDeactivateGuardService } from "src/app/BookCategory/create-BookCategory-can-deactivate-guard.service";
import { BookCategoryDetailsComponent } from "src/app/BookCategory/book-category-details.component";
import { BookCategoryDetailsGuardService } from "src/app/BookCategory/BookCategory-Details-guard.service";
import { BookCategoryListResolverService } from "src/app/BookCategory/BookCategory-list-resolver.service";

const routes: Routes = [
  {
    path: '',
    component: ListBookCategoryComponent,
    resolve: { BookcategoryList: BookCategoryListResolverService }
  },
  {
    path: 'edit/:id',
    component: CreateBookCategoryComponent,
    canDeactivate: [CreateBookCategoryCanDeactivateGuardService],
  },
  {
    path: ':id', component: BookCategoryDetailsComponent,
    canActivate: [BookCategoryDetailsGuardService]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class BookCategoryRoutingModule { }