
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { map, catchError } from "rxjs/operators";
import { Observable } from "rxjs";
import { BookService } from "src/app/NewBook/NewBook.service";

@Injectable()
export class BookDetailsGuardService implements CanActivate {
    constructor(private _bookService: BookService,
        private _router: Router) {

    }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>{
        
        return this._bookService.getBook(+route.paramMap.get('id')).pipe(
            map(book => {
                const BookExist = !!book;

                if( BookExist){
                    return true;
                }
                else {
                    this._router.navigate(['notfound']);
                    return false;
                    
                }
            })
        );
    }
}