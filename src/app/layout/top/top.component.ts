import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog} from '@angular/material/dialog';
import { ReadyComponent} from '../../page/ready/ready.component';
import { TodayLiveComponent} from '../../page/today-live/today-live.component';
import { AllLiveComponent} from '../../page/all-live/all-live.component';
import { MaumdociComponent} from '../../page/maumdoci/maumdoci.component';
import { LoginComponent} from '../login/login.component';
import { AuthService } from '../../service/auth.service';
import { AuthGuard } from '../../service/auth.guard';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {

  constructor(
    private router: Router,
    private auth: AuthService,
    public dialog:MatDialog,
    public sign_in:MatDialog,
    public golink:MatDialog,
    private guard: AuthGuard,
  ) {
    auth.Log.subscribe( () => {
      this.sign_check();
    })
  }

  ngOnInit(): void {
    this.sign_check();
  }

  sign = false;
  info;
  display = 'none';
  sign_check() {
    if (!this.auth.isAuthenticated()) {
      this.sign = false;
    } else {
      this.sign = true;
      this.info = JSON.parse(this.auth.getUserData());
    }
  }
  active(e:Event){
    var menu = e.target as HTMLElement;
    var allmenu = document.querySelectorAll('.snb li');
    for(var i=0; i<allmenu.length; i++){
      allmenu[i].classList.remove('on');
    }
    menu.classList.add('on');
  }


  mypage() {
    this.router.navigate(['mypage/' + this.info.id]);
  }
  modal(){
    const dialogRef = this.dialog.open(ReadyComponent);
  }
  signin(){
    const dialogRef2 = this.sign_in.open(LoginComponent);
  }
  signout() {
    this.auth.signout();
  }
  searchBox(){
    var box1 = document.getElementsByClassName('searchBox')[0] as HTMLElement;
    var box2 = document.getElementsByClassName('menuBox')[0] as HTMLElement;
    box1.style.display = 'block';
    box2.style.display = 'none';
  }
  closeBox(){
    var box1 = document.getElementsByClassName('searchBox')[0] as HTMLElement;
    var box2 = document.getElementsByClassName('menuBox')[0] as HTMLElement;
    box1.style.display = 'none';
    box2.style.display = 'none';
  }
  menuBox(){
    var box1 = document.getElementsByClassName('searchBox')[0] as HTMLElement;
    var box2 = document.getElementsByClassName('menuBox')[0] as HTMLElement;
    box1.style.display = 'none';
    box2.style.display = 'block';
  }
}
