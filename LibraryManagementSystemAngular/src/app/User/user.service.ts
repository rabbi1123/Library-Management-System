import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "src/app/models/user.model";
import { HttpHeaders } from "@angular/common/http";

@Injectable()
export class UserService {
    constructor(private httpClient: HttpClient) { }
    baseUrl = 'http://localhost:62995';

    userAuthentication(email: string,password: string) {
        var data = "username="+email+"&password="+password+"&grant_type=password";
        var req = new HttpHeaders({'Content-type':'application/x-www-urlencoded','No-Auth':'True' });
        return this.httpClient.post(this.baseUrl+'/token',data,{headers: req});
    }
}