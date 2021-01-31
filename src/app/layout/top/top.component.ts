import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
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
    this.router.navigate(['mypage']);
  }
}
