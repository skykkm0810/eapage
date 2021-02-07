import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Environment } from 'src/app/environment/environment';
import { AuthService } from 'src/app/service/auth.service';
import { PhxChannelService } from 'src/app/service/phx-channel.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private phxChannel: PhxChannelService,
    private auth: AuthService
  ) {
    phxChannel.Inst.subscribe( data => {
      this.instInfo = data;
    })
    phxChannel.Lecture.subscribe( data => {
      this.info = data;
      console.log(this.info);
      this.stgs = this.info.currs.length;
      for( var i = 0; i < this.stgs; i++ ) {
        this.sum += this.info.currs[i].dur;
      }
      if( this.info.currs.length > 0 ) {
        let d1 = new Date(this.info.currs[0].date).getTime();
        let d2 = new Date().getTime();
        if ( d1 < d2 ) {
          this.dday_c = false;
          this.dday = '종료';
        } else {
          let time = Math.ceil((d2 - d1) / 1000 / 60 / 60 / 24);
          this.dday_c = true;
          this.dday = 'D' + time;
        }
      }
      phxChannel.get('inst', this.info.inst)
      console.log(this.info);
    })
  }
  
  ngOnInit(): void {
    // var number = (document.querySelector('.progress-container .right').textContent)
    // this.number = number;
    // this.injected = this.route.snapshot.params;
    // console.log(this.injected);
    this.phxChannel.get('lecture', this.injected);

    this.categoryArrow();
  }
  
  detail = {
    progress:'예정', title:'바쁠수록 차분하게, 마음챙김 영상 입니다만 글자를 길게하기위해서', text:'바쁘고 복잡한 새상 속에서도 마음은 고요하게, 머리를 맑게하고싶어요 엉엉 릴렉스',
    degree:100, classDate:'2020-02-20', hashTag1:'#스트레칭',hashTag2:'#명상',hashTag3:'#릴렉스',hashTag4:'#심리안정' , classTime:90, classRound:3,
  }

  number;
  injected;
  info = {
    currs: [{ date: null, dur: null, id: null, lectureId: null, stage: null, title: ''}],
    desc: "",
    id: null,
    inquire: "",
    inst: [{ id: null }],
    interests: [{ completed: true, lectureId: null, name: '', value: '' }],
    limit: null,
    mainImg: '',
    point: null,
    subtitle: "",
    targets: [{ desc: '', id: null, lectureId: null, point: null }],
    thumbnail: '',
    title: "",
  };
  instInfo = { name: '', inst: { file: '' } };
  sum = 0;
  stgs = 0;
  dday = '';
  dday_c = false;

  filePath = Environment.filePath;

  progress(){

  }

  apply() {
    if ( this.auth.isAuthenticated() ) {
      if( this.dday_c ) {
        this.router.navigate(['enrollClass/'+this.injected.id])
      } else {
        alert('이미 신청 마감된 강의입니다.')
      }
    } else {
      alert('먼저 로그인을 해주세요.')
    }
  }
  
  categoryArrow(){
    var categoryTag = document.getElementsByClassName('title-header')[0] as HTMLElement;
    var arrow = document.querySelector('.arrow img') as HTMLElement;
    var categoryText:any = categoryTag.textContent;
    switch(categoryText){
      case '인생여정': 
        arrow.style.paddingLeft = '150px'
        break;
      case '사회생활': 
        arrow.style.paddingLeft = 150+ 285 + 'px'
        break;
      case '힐링': 
        arrow.style.paddingLeft = 150+ 285 + 285 +'px'
        break;
      case '심리': 
        arrow.style.paddingLeft = 150+ 285 + 285 + 'px'
        break;
      default: 
        break;
    }

  }

  thumbnail(e:Event){
    var image = e.target as HTMLElement;
    var url = image.getAttribute('src');
    var mainImg = document.querySelector('.mainpic img') as HTMLElement;
    mainImg.setAttribute('src',url);
  }
  
}
