import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {

  constructor() { }

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
}
