import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Environment } from 'src/app/environment/environment';
import { PhxChannelService } from 'src/app/service/phx-channel.service';

@Component({
  selector: 'app-today-live',
  templateUrl: './today-live.component.html',
  styleUrls: ['./today-live.component.css']
})
export class TodayLiveComponent implements AfterViewInit {

  constructor(
    private phxChannel: PhxChannelService,
    private router: Router
  ) {
    phxChannel.LecturesToday.subscribe( data => {
      this.info = [];
      console.log(data.body);
      data.body.forEach( el => {
        let time = new Date().getTime();
        if( el.lecture[0].currs.length > 0 ) {
          let datatime = new Date(el.lecture[0].currs[0].date).getTime();
          if( datatime > time ){
            el.process = '예정';
          } else {
            el.process = '진행';
          }
        }
        console.log(el)
        // 온도
        el.degree = Math.floor(el.lecture[0].receipts.length/el.lecture[0].least * 100);
        // 남은 날짜
        var liveTime = new Date(Date.parse(el.date)).getTime()/1000;
        var calTime = new Date((liveTime - new Date().getTime()/1000)*1000);
        if (Number(calTime) >= 0) {
          let hours = Math.floor((Number(calTime) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          let mins = Math.floor((Number(calTime) % (1000 * 60 * 60)) / (1000 * 60));
  
          el.remain = hours+"시간 "+mins+'분 뒤 시작';
        }
        else{
          el.remain = '마감'
        }
        // 시작 시간
        var start = new Date(el.date)
        el.process = start;
        this.info.push(el);
      })
      console.log(this.info);
      this.loaded = true;
    })
  }

  ngAfterViewInit() {
    this.phxChannel.gets('lecture:today', '');
  }
  color:'#000'
  title = '전체보기';
  today = new Date();
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
  info = [{
    lecture: [{
      currs: [{date: null, dur: null, stage: null}],
      lecture:'',
      subtitle: '', 
      interests: [{value: ''}], 
      thumbnail1: '', 
      limit: null, 
      title: '', 
    }],
    process: '',
    categorycolor:'',
    company:'',
    remain:'',
    id: null,
    degree: null,
  }];
  onselect(c:any,e:Event){
    this.selectedC = c;
    var thisList = (e.target as HTMLElement).closest('li');
    var bigList = document.querySelectorAll('.bigList li');
    for(var i=0; i<bigList.length; i++){
      bigList[i].classList.remove('clicked')
    }
    thisList.classList.add('clicked')
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
