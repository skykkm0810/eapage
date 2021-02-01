import { Component, OnInit,AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-today-live',
  templateUrl: './today-live.component.html',
  styleUrls: ['./today-live.component.css']
})
export class TodayLiveComponent implements AfterViewInit {

  constructor() { }
  date = new Date;
  today = this.date.getFullYear() +"-"+( this.date.getMonth()+1) +"-"+ this.date.getDate();
  title = '오늘의 라이브'
  ngAfterViewInit() {
    var tempBar = document.getElementsByClassName('tempDynamic');
    for(var i=0; i<tempBar.length; i++){
      var degree = tempBar[i].textContent
      if(degree !==''){
        (tempBar[i] as HTMLElement).style.width = 3*Number(degree) + 'px';
      }
    }

    var process = document.getElementsByClassName('process');
    for(var i=0; i<process.length; i++){
      if(process[i].textContent == '종료'){
        (process[i] as HTMLElement).style.color = '#2d6c6e';
        (process[i] as HTMLElement).style.borderColor = '#2d6c6e';
      }
    }
  }
  selectedC : any;
  
  category = [
    { title:'인생여정',
      image: '../../../assets/images/icon/pink/category1.png',
      subtitle: [
        {subname:'연애ㆍ결혼'},
        {subname:'자녀양육'},
        {subname:'부부관계'},
        {subname:'인생 2막'},
        ]
    },
    { title:'사회생활',
      image: '../../../assets/images/icon/pink/category2.png',
      subtitle: [
        {subname:'대인관계'},
        {subname:'커뮤니케이션'},
        {subname:'리더십'},
        {subname:'조직적응'},
        ]
    },
    { title:'힐링',
      image: '../../../assets/images/icon/pink/category3.png',
      subtitle: [
        {subname:'명상ㆍ요가'},
        {subname:'몸마음건강'},
        {subname:'예술치유'},
        {subname:'힐링DIY'},
        ]
    },
    { title:'심리',
      image: '../../../assets/images/icon/pink/category4.png',
      subtitle: [
        {subname:'자기이해'},
        {subname:'심리특강'},
        ]
    },
  ]

  liveList = [
    {
      process:'예정',
      title:'바쁠수록 차분하게, 마음챙김 영상',
      img: '../../../assets/images/banner/yoga1.png',
      degree : 50,
      time: 60,
      text:'각종 요가자세를 이용한 힐링 프로그램',
      bigL:'힐링',
      smallL:'명상ㆍ요가'
    },
    {
      process:'예정',
      title:'자기를 스스로 파악하기',
      img: '../../../assets/images/banner/open.png',
      degree : 70,
      time: 90,
      text:'남이보는 나, 내가 보는 나',
      bigL:'심리',
      smallL:'자기이해'
    },
    {
      process:'종료',
      title:'최적이 될수 있는 남은 인생',
      img: '../../../assets/images/banner/week3.png',
      degree : 97,
      time: 90,
      text:'남은 인생 화려하지 못해도 웃음지며 살 수 있게',
      bigL:'인생여정',
      smallL:'연애ㆍ결혼'
    },
    {
      process:'예정',
      title:'사람과의 관계에서 우뚝 서기',
      img: '../../../assets/images/banner/list2.png',
      degree : 85,
      time: 60,
      text:'남과 나를 동시에 존중하며 살아가는 방법',
      bigL:'사회생활',
      smallL:'대인관계'
    },
  ]
  
  onselect(c:any,e:Event){
    this.selectedC = c;
    var thisList = (e.target as HTMLElement).closest('li');
    var bigList = document.querySelectorAll('.bigList li');
    var lives = document.querySelectorAll('.live');
    for(var i=0; i<bigList.length; i++){
      bigList[i].classList.remove('clicked')
    }
    thisList.classList.add('clicked')
    for(var i=0; i<lives.length; i++){
      (lives[i] as HTMLElement).style.display='none';
      if(lives[i].getElementsByClassName('big')[0].textContent == thisList.textContent){
      (lives[i] as HTMLElement).style.display='block';
      }
      // lives[i].getElementsByClassName('small')[0];
    }
  }
  filter(e:Event){
    var subList = (e.target as HTMLElement);
    var lives = document.querySelectorAll('.live');

    for(var i=0; i<lives.length; i++){
      (lives[i] as HTMLElement).style.display='none';
      if(lives[i].getElementsByClassName('small')[0].textContent == subList.textContent){
      (lives[i] as HTMLElement).style.display='block';
      }
      // lives[i].getElementsByClassName('small')[0];
    }
  }
  bold(e:Event){
    var list = (e.target as HTMLElement).closest('.subList').getElementsByTagName('li');
    for(var i=0; i<list.length; i++){
      (list[i] as HTMLElement).classList.remove('bold');
    }
    (e.target as HTMLElement).classList.add('bold');
    this.filter(e)
  }

  

}
