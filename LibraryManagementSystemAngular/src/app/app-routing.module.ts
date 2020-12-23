import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from "src/app/page-not-found.component";
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from "src/app/home/home.component";
import { SignInComponent } from "src/app/User/sign-in/sign-in.component";
import { AuthGuard } from "src/app/Auth/auth.guard";

const routes: Routes = [
  
  { path: 'home', component: HomeComponent,canActivate:[AuthGuard]},
  { path: 'login', component: SignInComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'BorrowBook', loadChildren: './BorrowBook/borrow-book.module#BorrowBookModule' },
  { path: 'StudentCourse', loadChildren: './StudentCourse/student-course.module#StudentCourseModule' },
  { path: 'student', loadChildren: './student/student.module#StudentModule' },
  { path: 'BookCategories', loadChildren: './BookCategory/book-category.module#BookCategoryModule' },
  { path: 'Book', loadChildren: './NewBook/new-book.module#NewBookModule' },
  { path: 'notfound', component: PageNotFoundComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
