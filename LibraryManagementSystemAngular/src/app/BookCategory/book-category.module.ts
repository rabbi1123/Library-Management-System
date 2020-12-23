import { NgModule } from '@angular/core';

import { BookCategoryRoutingModule } from "src/app/BookCategory/BookCategory-routing.module";

import { CreateBookCategoryComponent } from './create-book-category.component';
import { ListBookCategoryComponent } from './list-book-category.component';

import { SharedModule } from "src/app/shared/shared.module";
import { BookCategoryService } from "src/app/BookCategory/BookCategory.service";
import { DisplayBookCategoryComponent } from './display-book-category.component';
import { CreateBookCategoryCanDeactivateGuardService } from "src/app/BookCategory/create-BookCategory-can-deactivate-guard.service";
import { BookCategoryDetailsComponent } from './book-category-details.component';
import { BookCategoryDetailsGuardService } from "src/app/BookCategory/BookCategory-Details-guard.service";
import { HttpClientModule } from "@angular/common/http";
import { BookCategoryListResolverService } from "src/app/BookCategory/BookCategory-list-resolver.service";
import { MaterialModule } from "src/app/material/material.module";

@NgModule({
  declarations: [
    CreateBookCategoryComponent,
    ListBookCategoryComponent,
    DisplayBookCategoryComponent,
    BookCategoryDetailsComponent
  ],
  entryComponents: [CreateBookCategoryComponent,BookCategoryDetailsComponent],
  imports: [
    BookCategoryRoutingModule,
    HttpClientModule,
    MaterialModule,
    SharedModule
  ],
  providers:[BookCategoryService,CreateBookCategoryCanDeactivateGuardService,BookCategoryDetailsGuardService,BookCategoryListResolverService]
})
export class BookCategoryModule { }
