import { NgModule } from '@angular/core';
import { NewBookRoutingModule } from "src/app/NewBook/NewBook-routing.module";
import { SharedModule } from "src/app/shared/shared.module";
import { CreateNewBookComponent } from './create-new-book.component';
import { ListBookComponent } from './list-book.component';
import { BookService } from "src/app/NewBook/NewBook.service";
import { HttpClientModule } from "@angular/common/http";
import { CreateBookCanDeactivateGuardService } from "src/app/NewBook/create-book-can-deactivate-guard.service";
import { BookDetailsComponent } from './book-details.component';
import { BookListResolverService } from "src/app/NewBook/Book-List-resolver.service";
import { BookDetailsGuardService } from "src/app/NewBook/Book-Details-guard.service";
import { BookCategoryService } from "src/app/BookCategory/BookCategory.service";
import { MaterialModule } from "src/app/material/material.module";

@NgModule({
  declarations: [CreateNewBookComponent, ListBookComponent, BookDetailsComponent],
  entryComponents: [CreateNewBookComponent, BookDetailsComponent],
  imports: [
    NewBookRoutingModule,
    SharedModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [BookService, BookCategoryService, CreateBookCanDeactivateGuardService, BookListResolverService, BookDetailsGuardService]
})
export class NewBookModule { }
