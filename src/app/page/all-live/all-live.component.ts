import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Environment } from 'src/app/environment/environment';
import { PhxChannelService } from 'src/app/service/phx-channel.service';
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-all-live',
  templateUrl: './all-live.component.html',
  styleUrls: ['./all-live.component.css']
})
export class AllLiveComponent implements AfterViewInit {

  constructor(
    private phxChannel: PhxChannelService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    phxChannel.Lectures.subscribe( data => {
      this.info = [];
      let filtered;
      if( this.search.text ) {
        filtered = data.filter( data => data.title.includes(this.search.text))
      } else {
        filtered = data;
      }
      console.log(filtered);
      filtered.forEach( data => {
        let time = new Date().getTime();
        if( data.currs.length > 0 ) {
          let datatime = new Date(data.currs[0].date).getTime();
          if( datatime > time ){
            data.process = '예정';
          } else {
            data.process = '종료';
          }
        }
        // 온도
        data.degree = Math.floor(data.receipts.length/data.least * 100);
        // 남은 날짜
        var liveTime = new Date(Date.parse(data.created)).getTime()/1000;
        var calTime = new Date((liveTime - new Date().getTime()/1000)*1000);
        if (Number(calTime) >= 0) {
          let days = Math.floor(Number(calTime) / (1000 * 60 * 60 * 24));
          data.remain = days
        }
        else{
          data.remain = '0'
        }
        
        this.info.push(data);
      })
      console.log(this.info);
      this.loaded = true;
    })
  }

  ngAfterViewInit() {
    this.phxChannel.gets('lecture', '');
    this.search = this.route.snapshot.params;
    console.log(this.search)

    
  }
  search;
  color:'#000'
  title = '전체보기';
  selectedC : any;
  
  category = [
    { title:'인생여정',
      image: '../../../assets/images/icon/pink/category1.png',
      subtitle: [
        {subname:'연애결혼'},
        {subname:'자녀양육'},
        {subname:'부부/가족관계'},
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
        {subname:'명상요가'},
        {subname:'몸마음건강'},
        {subname:'예술 치유'},
        {subname:'힐링 DIY'},
        ]
    },
    { title:'심리',
      image: '../../../assets/images/icon/pink/category4.png',
      subtitle: [
        {subname:'자기 이해'},
        {subname:'심리 특강'},
        ]
    },
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
     remain:'',
     company:'',
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
