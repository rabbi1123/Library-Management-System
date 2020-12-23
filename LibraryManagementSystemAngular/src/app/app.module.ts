import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccordionComponent } from './shared/accordion.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SignUpComponent } from "src/app/User/sign-up/sign-up.component";
import { SignInComponent } from "src/app/User/sign-in/sign-in.component";
import { UserService } from "src/app/User/user.service";
import { AuthGuard } from "src/app/Auth/auth.guard";
import { AuthInterceptor } from "src/app/Auth/auth.interceptor";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { MaterialModule } from "src/app/material/material.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { SideNavListComponent } from './side-nav-list/side-nav-list.component';
import { BookCategoryService } from "src/app/BookCategory/BookCategory.service";
import { BorrowBookService } from "src/app/BorrowBook/borrowBook.service";
import { BookService } from "src/app/NewBook/NewBook.service";
import { StudentService } from "src/app/student/student.service";
import { StudentCourseService } from "src/app/StudentCourse/StudentCourse.service";
import { SharedModule } from "src/app/shared/shared.module";
import { BookCategoryModule } from "src/app/BookCategory/book-category.module";
import { BorrowBookModule } from "src/app/BorrowBook/borrow-book.module";
import { NewBookModule } from "src/app/NewBook/new-book.module";
import { StudentModule } from "src/app/student/student.module";
import { StudentCourseModule } from "src/app/StudentCourse/student-course.module";


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    AccordionComponent,
    HomeComponent,
    SignInComponent,
    SignUpComponent,
    SideNavListComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    BookCategoryModule,
    BorrowBookModule,
    NewBookModule,
    StudentModule,
    StudentCourseModule,
    BsDatepickerModule.forRoot(),
    AppRoutingModule
  ],
  providers: [UserService,BookCategoryService,BorrowBookService,BookService,StudentService,StudentCourseService,
    AuthGuard,{provide : HTTP_INTERCEPTORS,useClass : AuthInterceptor, multi : true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
