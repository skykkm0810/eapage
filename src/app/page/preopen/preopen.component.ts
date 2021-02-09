import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Environment } from 'src/app/environment/environment';
import { PhxChannelService } from 'src/app/service/phx-channel.service';

@Component({
  selector: 'app-preopen',
  templateUrl: './preopen.component.html',
  styleUrls: ['./preopen.component.css']
})
export class PreopenComponent  {

  constructor(
    private phxChannel: PhxChannelService,
    private router: Router
  ) {

    phxChannel.Lectures.subscribe( data => {
      this.info = [];
      data.forEach( data => {
        let time = new Date().getTime();
        if( data.currs.length > 0 ) {
          let datatime = new Date(data.currs[0].date).getTime();
          if( datatime > time ){
            data.process = '예정';
          } else {
            data.process = '종료';
          }
        }
        data.degree = Math.floor(data.receipts.length/data.least * 100);
        this.info.push(data);
      })
      console.log(this.info);
      this.loaded = true;
    })
  }

  ngAfterViewInit() {
    this.phxChannel.gets('lecture', '');

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

  title = '전체보기';
  selectedC : any;
  // 카테고리
  category = [
    { title:'인생여정',
      image: '../../../assets/images/icon/pink/category1.png',
      subtitle: [
        {subname:'연애·결혼'},
        {subname:'자녀양육'},
        {subname:'부부·가족'},
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
  // 강의 
  class = [
    // {process:'진행중',remain:'',openDay:'2021-02-22',degree:100 ,color:"#DD5E5E",category:'연애·결혼',title:'플라워디퓨저' , img:'assets/images/banner/week1.png', text:'각종 가공 플라워를 이용한 힐링 프로그램'},
    // {process:'진행중',remain:'',openDay:'2021-02-22',degree:80 ,color:"#00C6C6",category:'부부·가족',title:'글자를 늘려보려고 길게 적어보았습니다.' , img:'assets/images/banner/week2.png', text:'각종 가공의 그것들을 이용한 어쩃든 무엇을 하는 프로그램'},
    // {process:'진행중',degree:50 ,color:"#954FD0",category:'인생 2막',title:'두줄 까지는 안전한가요? 세줄은 좀 힘들어 보이는데' , img:'assets/images/banner/week3.png', text:'글자길이'},
    {process:'OPEN 예정',hashTag:[{tag:'#스트레칭'},{tag:'#심리안정'},{tag:'#릴렉스'}],color:"#DD5E5E",maincategory:'인생여정',subcategory:'연애·결혼',title:'플라워디퓨저' , img:'assets/images/banner/week1.png', text:'각종 가공 플라워를 이용한 힐링 프로그램'},
    {process:'OPEN 예정',hashTag:[{tag:'#스트레칭'},{tag:'#심리안정'},{tag:'#릴렉스'}],color:"#00C6C6",maincategory:'인생여정',subcategory:'부부·가족',title:'글자를 늘려보려고 길게 적어보았습니다.' , img:'assets/images/banner/week2.png', text:'각종 가공의 그것들을 이용한 어쩃든 무엇을 하는 프로그램'},
    {process:'OPEN 예정',remain:'',openDay:'2021-02-22',hashTag:[{tag:'#스트레칭'},{tag:'#심리안정'},{tag:'#릴렉스'}],color:"#954FD0",maincategory:'인생여정',subcategory:'인생 2막',title:'두줄 까지는 안전한가요? 세줄은 좀 힘들어 보이는데' , img:'assets/images/banner/week3.png', text:'글자길이'},
  ]
  filePath = Environment.filePath;
  loaded = false;
  info = [
    { currs: [{date: null, dur: null, stage: null}],
     subtitle: '', 
     interests: [{value: ''}], 
     thumbnail1: '', 
     limit: null, 
     degree: null,
     title: '', 
     process: '',
     categorycolor:'',
    }];
  
  onselect(c:any,e:Event){
    this.selectedC = c;
    var thisList = (e.target as HTMLElement).closest('li');
    var bigList = document.querySelectorAll('.bigList li');
    var lives = document.querySelectorAll('.designedBox');
    for(var i=0; i<bigList.length; i++){
      bigList[i].classList.remove('clicked')
    }
    thisList.classList.add('clicked')
    this.title = thisList.textContent
    for(var i=0; i<lives.length; i++){
      (lives[i] as HTMLElement).style.display='none';
      if(lives[i].getElementsByClassName('maincategory')[0].textContent == thisList.textContent){
      (lives[i] as HTMLElement).style.display='block';
      }
      // lives[i].getElementsByClassName('small')[0];
    }
  }
  filter(e:Event){
    var subList = (e.target as HTMLElement);
    var lives = document.querySelectorAll('.designedBox');

    for(var i=0; i<lives.length; i++){
      (lives[i] as HTMLElement).style.display='none';
      if(lives[i].getElementsByClassName('subcategory')[0].textContent == subList.textContent){
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

  detail( el ) {
    this.router.navigate(['detail/' + el.id])
  }
  
}
