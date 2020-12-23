
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { BookCategoryService } from "src/app/BookCategory/BookCategory.service";
import { Injectable } from "@angular/core";
import { map, catchError } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable()
export class BookCategoryDetailsGuardService implements CanActivate {
    constructor(private _bookCategoryService: BookCategoryService,
                private _router: Router){

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>{
        return this._bookCategoryService.getCategory(+route.paramMap.get('id')).pipe(
            map(category => {
                const BookCategoryExist = !!category;

                if(BookCategoryExist){
                    return true;
                }
                else {
                    this._router.navigate(['notfound']);
                    return false;
                }
            })
        );

       // const BookCategoryExist = !!this._bookCategoryService.getCategory(+route.paramMap.get('id'));

        

    }
}