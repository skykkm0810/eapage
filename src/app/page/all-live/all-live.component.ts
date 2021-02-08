import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Environment } from 'src/app/environment/environment';
import { PhxChannelService } from 'src/app/service/phx-channel.service';

@Component({
  selector: 'app-all-live',
  templateUrl: './all-live.component.html',
  styleUrls: ['./all-live.component.css']
})
export class AllLiveComponent implements AfterViewInit {

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
        this.info.push(data);
      })
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
  
  category = [
    { title:'인생여정',
      image: '../../../assets/images/icon/pink/category1.png',
      subtitle: [
        {subname:'연애ㆍ결혼'},
        {subname:'자녀양육'},
        {subname:'부부 / 가족관계'},
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
  filePath = Environment.filePath;
  loaded = false;
  info = [{ currs: [{date: null, dur: null, stage: null}], subtitle: '', interests: [{value: ''}], thumbnail: '', limit: null, degree: null, title: '', process: ''}];
  
  onselect(c:any,e:Event){
    this.selectedC = c;
    var thisList = (e.target as HTMLElement).closest('li');
    var bigList = document.querySelectorAll('.bigList li');
    var lives = document.querySelectorAll('.live');
    for(var i=0; i<bigList.length; i++){
      bigList[i].classList.remove('clicked')
    }
    thisList.classList.add('clicked')
    this.title = thisList.textContent
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

  detail( el ) {
    this.router.navigate(['detail/' + el.id])
  }
}
