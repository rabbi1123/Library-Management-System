import { Injectable } from "@angular/core";
import { HttpInterceptor } from "@angular/common/http";
import { HttpRequest } from "@angular/common/http";
import { HttpHandler } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpEvent } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router) {}
        intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
            if(req.headers.get('No-Auth') == "True"){
                return next.handle(req.clone());
            }
            /* if(localStorage.getItem('userToken') != null){
                const clonedreq = req.clone({
                    headers: req.headers.set("Authorization", "bearer " + localStorage.getItem('userToken'))
                });
                return next.handle(clonedreq)
                        .do(
                            succ => { },
                            err => {
                                if (err.status === 401){
                                    this.router.navigate(['login']);
                                }
                            }
                        );
            } */
            else {
                this.router.navigate(['login']);
            }
        }
}


