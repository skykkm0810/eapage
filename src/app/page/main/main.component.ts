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
    dotWrap.style.left = 'calc(50% - '+(wrapWidth/2)+'px)';
    
    var tempBar = document.getElementsByClassName('tempDynamic');
    for(var i=0; i<tempBar.length; i++){
      var degree = tempBar[i].textContent
      if(degree !==''){
        (tempBar[i] as HTMLElement).style.width = 4.5*Number(degree) + 'px';
      }
    }

    setInterval(()=>{
      var calTime = new Date((this.liveTime1 - new Date().getTime()/1000)*1000);
      if (Number(calTime) >= 0) {
        let days = Math.floor(Number(calTime) / (1000 * 60 * 60 * 24));
        let hours = Math.floor((Number(calTime) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let mins = Math.floor((Number(calTime) % (1000 * 60 * 60)) / (1000 * 60));
        let secs = Math.floor((Number(calTime) % (1000 * 60)) / 1000);

        this.remainDays = days;
        this.remainTime = ('00'+hours).slice(-2)+":"+ 
        ('00'+mins).slice(-2)+":" +
        ('00'+secs).slice(-2);
      }
    },1000)
  }
  callTime :any;
  remainDays : any;
  remainTime :any;
  liveTime1 = new Date(Date.parse('2021-02-02 16:00')).getTime()/1000;
  liveTime2 = new Date(Date.parse('2021-02-02 16:00')).getTime()/1000;
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

  tempChange(obj:any){
    var degree = obj as HTMLElement;
    console.log(degree.textContent);
  }
}
