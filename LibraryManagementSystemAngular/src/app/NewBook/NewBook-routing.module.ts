import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListBookComponent } from "src/app/NewBook/list-book.component";
import { CreateNewBookComponent } from "src/app/NewBook/create-new-book.component";
import { CreateBookCanDeactivateGuardService } from "src/app/NewBook/create-book-can-deactivate-guard.service";
import { BookDetailsComponent } from "src/app/NewBook/book-details.component";
import { BookListResolverService } from "src/app/NewBook/Book-List-resolver.service";
import { BookDetailsGuardService } from "src/app/NewBook/Book-Details-guard.service";

const appRoutes: Routes = [
    {
        path: '',
        component: ListBookComponent,
        resolve: { BookList: BookListResolverService }
    },
    {
        path: 'create',
        component: CreateNewBookComponent,
        canDeactivate: [CreateBookCanDeactivateGuardService]
    },
    {
        path: 'edit/:id',
        component: CreateNewBookComponent
    },
    {
        path: ':id',
        component: BookDetailsComponent,
        //canActivate: [BookDetailsGuardService]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(appRoutes)
    ],
    exports: [RouterModule]
})
export class NewBookRoutingModule { }