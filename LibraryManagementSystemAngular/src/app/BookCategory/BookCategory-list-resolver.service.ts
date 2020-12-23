import { Resolve } from "@angular/router";
import { BookCategory } from "src/app/models/BookCategory.model";
import { ActivatedRouteSnapshot } from "@angular/router";
import { RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { BookCategoryService } from "src/app/BookCategory/BookCategory.service";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";

@Injectable()
export class BookCategoryListResolverService implements Resolve<BookCategory[] | string | {}> {
    constructor(private _bookcategoryService: BookCategoryService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<BookCategory[] | string | {}> {
        return this._bookcategoryService.getBookCategory()
                .pipe(
                    catchError((err: string) => of(err))
                );
    }
}