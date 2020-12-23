import { Resolve } from "@angular/router";
import { ActivatedRouteSnapshot } from "@angular/router";
import { RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { BookService } from "src/app/NewBook/NewBook.service";
import { IBookList } from "src/app/models/IBookList";

@Injectable()
export class BookListResolverService implements Resolve<IBookList[] | string | {}> {
    constructor(private _bookService: BookService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IBookList[] | string | {}> {
        return this._bookService.getBookLists()
                .pipe(
                    catchError((err: string) => of(err))
                );
    }
}