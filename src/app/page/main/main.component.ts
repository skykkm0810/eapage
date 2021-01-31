import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private router: Router
  ) { }
  ngOnInit(): void {
    var dot = document.getElementsByClassName('dot');
    var dotWrap = document.getElementsByClassName('dotWrap')[0] as HTMLElement;
    var wrapWidth = dot.length*30;
    console.log(wrapWidth)
    dotWrap.style.left = 'calc(50% - '+(wrapWidth/2)+'px)';
  }
  autoSlide = setInterval(()=>{this.slideLeft()},5000)
  curIndex = 0;

  slideLeft(){
    this.curIndex ++;
    var slideBody = document.getElementsByClassName('slideBody')[0] as HTMLElement;
    var slideList = slideBody.getElementsByTagName('li');
    var dot = document.getElementsByClassName('dot');
    if(this.curIndex == slideList.length){
      this.curIndex = 0;
      slideBody.style.marginLeft = '0';
      for(var i=0; i<dot.length;i++){
        dot[i].classList.remove('show')
      }
      dot[0].classList.add('show')
    }
    else{
      slideBody.style.transition = 'left , 0.5s';
      slideBody.style.marginLeft = -100*this.curIndex + '%';
      for(var i=0; i<dot.length;i++){
        dot[i].classList.remove('show')
      }
      dot[this.curIndex].classList.add('show')
    }
  }
  dotClick(e:Event){
    var thisDot = e.target as HTMLElement;
    var idx:any ;
    var dot = document.getElementsByClassName('dot');
    for(var i=0; i<dot.length;i++){
      if( thisDot == dot[i]){
        idx = i;
      }
    }
    this.curIndex = idx - 1;
    clearInterval(this.autoSlide)
    this.slideLeft();
    this.autoSlide = setInterval(()=>{this.slideLeft()},5000)
  }
  
}
