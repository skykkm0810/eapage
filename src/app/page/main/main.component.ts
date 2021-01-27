import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var dot = document.getElementsByClassName('dot');
    var dotWrap = document.getElementsByClassName('dotWrap')[0] as HTMLElement;
    var wrapWidth = dot.length*30;
    console.log(wrapWidth)
    dotWrap.style.left = 'calc(50% - '+(wrapWidth/2)+'px)';
  }

}
