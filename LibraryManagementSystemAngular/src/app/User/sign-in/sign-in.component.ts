import { Component, OnInit } from '@angular/core';
import { User } from "src/app/models/user.model";
import { UserService } from "src/app/User/user.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { ViewChild } from "@angular/core";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  @ViewChild('loginForm') public loginForm: NgForm;
  isLoginError: boolean = false;
  /* user: User; */
  constructor(private userService: UserService,private router: Router) { }

  ngOnInit() {
  }

  login(email,password) {
    
    this.userService.userAuthentication(email,password).subscribe((data: any)=>{
      localStorage.setItem('userToken',data.access_token);
      this.loginForm.reset();
      this.router.navigate(['home']);
    },
    (err: any)=>{
      this.router.navigate(['notfound'])
    });
  }

}
