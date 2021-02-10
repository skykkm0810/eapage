import { Component, OnInit , AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PhxChannelService } from 'src/app/service/phx-channel.service';
import { MatCarouselSlide, MatCarouselSlideComponent } from '@ngmodule/material-carousel';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnDestroy, AfterViewInit {

  constructor(
    private router: Router,
    private phxChannel: PhxChannelService,
  ) {
    phxChannel.LecturesToday.subscribe( data => {
      console.log(data.body);
    })
    phxChannel.Lectures.subscribe( data => {
      console.log(data);
    })
    phxChannel.LectureControled.subscribe( data => {
      console.log(data.body);
    })

  }
  ngAfterViewInit(): void {
    var dot = document.getElementsByClassName('dot');
    var dotWrap = document.getElementsByClassName('dotWrap')[0] as HTMLElement;
    var wrapWidth = dot.length*30;
    dotWrap.style.left = 'calc(50% - '+(wrapWidth/2)+'px)';
    
    var tempBar = document.getElementsByClassName('tempDynamic');
    for(var i=0; i<tempBar.length; i++){
      var degree = tempBar[i].textContent
      if(degree !==''){
        if(Number(degree) > 100 ){
        (tempBar[i] as HTMLElement).style.width = 450 + 'px';
        }
        else{
          (tempBar[i] as HTMLElement).style.width = 4.5*Number(degree) + 'px';
        }
      }
    }

    this.int_remainTime = setInterval(()=>{
      this.remainTime();
    },1000)

    this.remainDate();
    this.autoSlide = setInterval(()=>{this.slideLeft()},5000)

    this.phxChannel.gets('lecture:today', '');
    this.phxChannel.gets('lecture', '');
    this.phxChannel.gets('lecture:controled', '');

  }

  ngOnDestroy(): void {
    clearInterval(this.int_remainTime);
    clearInterval(this.autoSlide);
  }

  int_remainTime;

  
  // 마음도씨  fake data 
  dcs = [
    {time:'2월 12일 FRI - PM 3시 30분',time2:'2021-02-12 15:30', during: '90분',title : '바쁠수록 차분하게, 마음챙김 영상',img:"../../../assets/images/banner/yoga1.png", allRound:3, nowRound:1, degree : 80, text : '각종 가공 플라워를 이용한 힐링 프로그램'},
    {time:'2월 15일 MON - PM 3시 30분',time2:'2021-02-15 15:30', during: '90분',title : '바쁠수록 차분하게, 마음챙김 영상',img:"../../../assets/images/banner/yoga1.png", allRound:0, nowRound:0, degree : 80, text : '각종 가공 플라워를 이용한 힐링 프로그램'},
    {time:'2월 12일 FRI - PM 3시 30분',time2:'2021-02-12 15:30', during: '90분',title : '바쁠수록 차분하게, 마음챙김 영상',img:"../../../assets/images/banner/yoga1.png", allRound:3, nowRound:1, degree : 80, text : '각종 가공 플라워를 이용한 힐링 프로그램'},
    {time:'2월 15일 MON - PM 3시 30분',time2:'2021-02-15 15:30', during: '90분',title : '바쁠수록 차분하게, 마음챙김 영상',img:"../../../assets/images/banner/yoga1.png", allRound:0, nowRound:0, degree : 80, text : '각종 가공 플라워를 이용한 힐링 프로그램'},

  ]
   // 오픈예정  fake data 
   pre = [
    {time:'OPEN 예정 ',during: '90분',title : '바쁠수록 차분하게, 마음챙김 영상',img:"../../../assets/images/banner/open.png", degree : 80, text : '각종 가공 플라워를 이용한 힐링 프로그램'},
    {time:'OPEN 예정',during: '90분',title : '바쁠수록 차분하게, 마음챙김 영상',img:"../../../assets/images/banner/flower.png", degree : 80, text : '각종 가공 플라워를 이용한 힐링 프로그램'},
    {time:'OPEN 예정 ',during: '90분',title : '바쁠수록 차분하게, 마음챙김 영상',img:"../../../assets/images/banner/open.png", degree : 80, text : '각종 가공 플라워를 이용한 힐링 프로그램'},
    {time:'OPEN 예정',during: '90분',title : '바쁠수록 차분하게, 마음챙김 영상',img:"../../../assets/images/banner/flower.png", degree : 80, text : '각종 가공 플라워를 이용한 힐링 프로그램'},

  ]

  // 오늘의 라이브 fake data
  todayLive = [
    {time2:'2021-02-15 16:00',year:'2021',day:'15', monthName:'February',teacher:'황신혜' ,title : '바쁠수록 차분하게, 마음챙김 영상',tagimg:"../../../assets/images/icon/subject1.png", img:'../../../assets/images/banner/todayLive1.png', text : '바쁘고 복잡한 세상 속에서도 마음은 고요하게, 머리를 맑게',color:'#66cccc', thema:'힐링'},
    {time2:'2021-02-25 16:00',year:'2021',day:'25', monthName:'February',teacher:'김신혜' ,title : '바쁘니까 밤새도록, 마음상함 영상',tagimg:"../../../assets/images/icon/subject2.png", img:'../../../assets/images/banner/saveMental.png', text : '바쁘고 복잡한 세상 속에서도 마음은 고요하게, 머리를 맑게',color:'#B08FCC',thema:'인생여정'},
  ]
  // 이달의 TOp 라이브
  monthLive = [
    {number:1,img:'../../../assets/images/banner/list1.png',title:'꿀잠 프로젝트-솔솔', text:'생각 스위치 끄고, 쉼으로 충전하기'},
    {number:2,img:'../../../assets/images/banner/list2.png',title:'상자를 설득하는 말하기 스킬', text:'까칠한 상사를 내편으로 만드는 말습관'},
    {number:3,img:'../../../assets/images/banner/list3.png',title:'이움 홈트', text:'몸과 마음의 이완과 움직임을 통한 건강관리 홈 트레이닝'},
    {number:4,img:'../../../assets/images/banner/list4.png',title:'플라워 디퓨저', text:'각종 가공 플라워를 이용한 힐링 프로그램'},
    {number:5,img:'../../../assets/images/banner/list5.png',title:'컬러테라피', text:'컬러로 알아보는 나의 마음여행'},
    {number:6,img:'../../../assets/images/banner/list6.png',title:'꿀잠 프로젝트-솔솔', text:'생각 스위치 끄고, 쉼으로 충전하기'},
    {number:7,img:'../../../assets/images/banner/list7.png',title:'상자를 설득하는 말하기 스킬', text:'까칠한 상사를 내편으로 만드는 말습관'},
    {number:8,img:'../../../assets/images/banner/list8.png',title:'이움 홈트', text:'몸과 마음의 이완과 움직임을 통한 건강관리 홈 트레이닝'},
    {number:9,img:'../../../assets/images/banner/list9.png',title:'플라워 디퓨저', text:'각종 가공 플라워를 이용한 힐링 프로그램'},
    {number:10,img:'../../../assets/images/banner/list10.png',title:'컬러테라피', text:'컬러로 알아보는 나의 마음여행'},
  ]
//   .month .contentBox div:nth-child(1) .img {
//     background: url(../../../assets/images/banner/list1.png) no-repeat center center / cover;
// }
// .month .contentBox div:nth-child(2) .img {
//     background: url(../../../assets/images/banner/list2.png) no-repeat center center / cover;
// }
// .month .contentBox div:nth-child(3) .img {
//     background: url(../../../assets/images/banner/list3.png) no-repeat center center / cover;
// }
// .month .contentBox div:nth-child(4) .img {
//     background: url(../../../assets/images/banner/list4.png) no-repeat center center / cover;
// }
// .month .contentBox div:nth-child(5) .img {
//     background: url(../../../assets/images/banner/list5.png) no-repeat center center / cover;
// }

  // monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  callTime :any;
  remainDays : any;
  // 타이머 기준 시간 
  liveTime1 = new Date(Date.parse('2021-02-15 16:00')).getTime()/1000;
  liveTime2 = new Date(Date.parse('2021-02-20 16:00')).getTime()/1000;
  autoSlide;
  
  curIndex = 0;
  bannerCount = 0;
  bannerCount2 = 0;

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
  // 배너 슬라이드
  bannerSliderRight(){
    this.bannerCount ++;
    var bannerBody = document.querySelector('.nowlive .innerWrap .banner') as HTMLElement;
    var bannerList = bannerBody.getElementsByClassName('clive');
    if(this.bannerCount == bannerList.length){
      this.bannerCount = 0;
      bannerBody.style.marginLeft = '0';
    }
    else{
      bannerBody.style.transition = 'left , 0.5s';
      bannerBody.style.marginLeft = -50*this.bannerCount + '%';
    }
  }
  bannerSliderLeft(){
    
    var bannerBody = document.querySelector('.nowlive .innerWrap .banner') as HTMLElement;
    var bannerList = bannerBody.getElementsByClassName('clive');
    if(this.bannerCount == 0){
      this.bannerCount = bannerList.length -1;
      bannerBody.style.marginLeft = -50*this.bannerCount + '%';
      this.bannerCount2 = bannerList.length;
    }
    else{
      bannerBody.style.transition = 'left , 0.5s';
      bannerBody.style.marginLeft = -50*this.bannerCount + 50 + "%";
    }
    this.bannerCount --;
  }
  bannerSliderRight2(){
    this.bannerCount2 ++;
    var bannerBody = document.querySelector('.preopen .innerWrap .banner') as HTMLElement;
    var bannerList = bannerBody.getElementsByClassName('pre');
    if(this.bannerCount2 == bannerList.length){
      this.bannerCount2 = 0;
      bannerBody.style.marginLeft = '0';
    }
    else{
      bannerBody.style.transition = 'left , 0.5s';
      bannerBody.style.marginLeft = -50*this.bannerCount2 + '%';
    }
  }
  bannerSliderLeft2(){
    
    var bannerBody = document.querySelector('.preopen .innerWrap .banner') as HTMLElement;
    var bannerList = bannerBody.getElementsByClassName('pre');
    if(this.bannerCount2 == 0){
      this.bannerCount2 = bannerList.length -1;
      bannerBody.style.marginLeft = -50*this.bannerCount2 + '%';
      this.bannerCount2 = bannerList.length;
    }
    else{
      bannerBody.style.transition = 'left , 0.5s';
      bannerBody.style.marginLeft = -50*this.bannerCount2 + 50 + "%";
    }
    this.bannerCount2 --;
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
  remainDate(){
    var classdate = document.getElementsByClassName('classdate');
    var remainDays = document.getElementsByClassName('remainDays');
    var remain;

    for(var i =0; i<classdate.length; i++){
      var time = (classdate[i] as HTMLElement).textContent;
      var liveTime = new Date(Date.parse(time)).getTime()/1000;
      var calTime = new Date((liveTime - new Date().getTime()/1000)*1000);
      if (Number(calTime) >= 0) {
        let days = Math.floor(Number(calTime) / (1000 * 60 * 60 * 24));
        let hours = Math.floor((Number(calTime) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let mins = Math.floor((Number(calTime) % (1000 * 60 * 60)) / (1000 * 60));
        let secs = Math.floor((Number(calTime) % (1000 * 60)) / 1000);
        remainDays[i].textContent = days+"";
      }
    }
  }
  remainTime(){
    var tlength = this.todayLive.length;
    for(var i =0; i<tlength; i++){
      var time = this.todayLive[i].time2;
      var remainTime = document.getElementsByClassName('time');
      var classYear = document.getElementsByClassName('year');
      var classDay = document.getElementsByClassName('day');
      classYear[i].textContent = new Date(this.todayLive[i].time2).getFullYear().toString();
      classDay[i].textContent = ('00'+new Date(this.todayLive[i].time2).getDate()).slice(-2);
      var liveTime = new Date(Date.parse(time)).getTime()/1000;
      var calTime = new Date((liveTime - new Date().getTime()/1000)*1000);
      if (Number(calTime) >= 0) {
        let days = Math.floor(Number(calTime) / (1000 * 60 * 60 * 24));
        let hours = Math.floor((Number(calTime) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let mins = Math.floor((Number(calTime) % (1000 * 60 * 60)) / (1000 * 60));
        let secs = Math.floor((Number(calTime) % (1000 * 60)) / 1000);
        remainTime[i].textContent = (days*24)+Number(('00'+hours).slice(-2))+":"+ 
        ('00'+mins).slice(-2)+":" +
        ('00'+secs).slice(-2);
      }
    }
  }
}
