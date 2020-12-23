import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ViewChild } from "@angular/core";
import { UserService } from "src/app/User/user.service";
import { Router } from "@angular/router";
import { OnInit } from "@angular/core";
import { MediaObserver, MediaChange } from "@angular/flex-layout";
import { Subscription } from "rxjs";
import { OnDestroy } from "@angular/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'LibraryManagementSystemAngular';
  token:any;
  mediaSub:Subscription;
  device: boolean;
  open: boolean;
  bar:string;

  constructor(public mediaObserver:MediaObserver, private router: Router){}

  ngOnInit() {
    if(localStorage.getItem('userToken') != null){
      this.token = localStorage.getItem('userToken');
    }
    else{
      this.token = null;
    }

    this.mediaSub = this.mediaObserver.media$.subscribe((result:MediaChange) => {
      console.log(result.mqAlias);
      this.device = result.mqAlias === 'xs' ? true : false;
      this.open = result.mqAlias === 'xs' ? false : true;
      this.bar = result.mqAlias === 'xs' ? 'over' : 'side';
    })
  }

  ngOnDestroy() {
    this.mediaSub.unsubscribe();
  }

  logout(){
    localStorage.removeItem('userToken');
    this.router.navigate(['login']);
  }

}


