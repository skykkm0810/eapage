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
      console.log(this.instInfo);
    })
    phxChannel.Lecture.subscribe( data => {
      this.info = data;
      this.sum = 0;
      this.stgs = this.info.currs.length;
      this.reviews = data.reviews;
      data.currs.forEach( data => {
        this.sum += data.dur*1;
      })
      this.info.degree = Math.ceil(data.receipts.length*1 / data.least * 100);
      if( this.info.dday != null ) {
        let d1 = new Date(this.info.dday).getTime();
        let d2 = new Date().getTime();
        console.log(d1, d2);
        if ( d1 < d2 ) {
          this.dday_c = false;
          this.dday = '종료';
        } else {
          let time = Math.ceil((d2 - d1) / 1000 / 60 / 60 / 24);
          this.dday_c = true;
          this.dday = 'D' + time;
        }
        console.log(this.dday_c);
      } else {
        this.dday_c = false;
        this.dday = '오픈 예정';
      }
      phxChannel.get('inst', this.info.inst)
      console.log(this.info);
    })
    phxChannel.ReviewAdd.subscribe( data => {
      this.reviews = data.body;
    })
  }
  
  ngOnInit() {
    // var number = (document.querySelector('.progress-container .right').textContent)
    // this.number = number;
    this.injected = this.route.snapshot.params;
    // console.log(this.injected);
    this.phxChannel.get('lecture', this.injected);

    this.categoryArrow();
    this.login = this.auth.isAuthenticated();
    console.log(this.login);
    if ( this.login == true ) {
      this.reviewText = "주제와 무관한 리뷰나 악플은 경고조치 없이 삭제 될수 있습니다.";
    }
    this.user = JSON.parse(this.auth.getUserData());
    console.log(this.user);
  }
  
  detail = {
    // 리뷰 
    review:[
      {img:'assets/images/icon/star/star4.png',name:'박최고',desc:'완전 굿굿'},
    ],
    // 별점이미지
    starimg:[
      {img:'assets/images/icon/star/star5.png', text:'', value: 5},
      {img:'assets/images/icon/star/star4.png', text:'', value: 4},
      {img:'assets/images/icon/star/star3.png', text:'', value: 3},
      {img:'assets/images/icon/star/star2.png', text:'', value: 2},
      {img:'assets/images/icon/star/star1.png', text:'', value: 1},
      {img:'', text:'별점 주기'},
    ],
    // 로그인 된 사람 정보
    im:'갱갱미',
    
    // 추천 강의
    recommand :[
      {process:'진행중',degree:100 ,color:"#DD5E5E",category:'연애·결혼',title:'플라워디퓨저' , img:'assets/images/banner/week1.png', text:'각종 가공 플라워를 이용한 힐링 프로그램'},
      {process:'진행중',degree:80 ,color:"#00C6C6",category:'부부·가족',title:'글자를 늘려보려고 길게 적어보았습니다.' , img:'assets/images/banner/week2.png', text:'각종 가공의 그것들을 이용한 어쩃든 무엇을 하는 프로그램'},
      {process:'진행중',degree:50 ,color:"#954FD0",category:'인생 2막',title:'두줄 까지는 안전한가요? 세줄은 좀 힘들어 보이는데' , img:'assets/images/banner/week3.png', text:'글자길이'},
      {process:'OPEN 예정',hashTag:[{tag:'#스트레칭'},{tag:'#심리안정'},{tag:'#릴렉스'}],color:"#DD5E5E",category:'연애·결혼',title:'플라워디퓨저' , img:'assets/images/banner/week1.png', text:'각종 가공 플라워를 이용한 힐링 프로그램'},
      {process:'OPEN 예정',hashTag:[{tag:'#스트레칭'},{tag:'#심리안정'},{tag:'#릴렉스'}],color:"#00C6C6",category:'부부·가족',title:'글자를 늘려보려고 길게 적어보았습니다.' , img:'assets/images/banner/week2.png', text:'각종 가공의 그것들을 이용한 어쩃든 무엇을 하는 프로그램'},
      {process:'OPEN 예정',hashTag:[{tag:'#스트레칭'},{tag:'#심리안정'},{tag:'#릴렉스'}],color:"#954FD0",category:'인생 2막',title:'두줄 까지는 안전한가요? 세줄은 좀 힘들어 보이는데' , img:'assets/images/banner/week3.png', text:'글자길이'},
    ]
  }
  
  reviews = this.detail.review;
  star = { img: '', value: 0 };
  review_desc;
  login = false;
  reviewText = "리뷰를 작성하려면 로그인을 해주세요.";
  number;
  user = { name: '', id: 0};
  injected;
  info = {
    currs: [{ date: null, dur: null, id: null, lectureId: null, stage: null, title: '', timetable: [
      {stage: '', dur: '', desc: ''}
    ]}],
    desc: "",
    id: null,
    inquire: "",
    feats: [{point: '', desc: '' }],
    exps: [{point: '', desc: '' }],
    sums: [{point: '', desc: '' }],
    inst: [{ id: null }],
    interests: [{ completed: true, lectureId: null, name: '', value: '' }],
    limit: null,
    mainImg: '',
    kit: false,
    kitImg: '',
    mat: false,
    matImg: '',
    point: null,
    least: 0,
    max: 0,
    subtitle: "",
    targets: [{ desc: '', id: null, lectureId: null, point: null }],
    thumbnail1: '',
    thumbnail2: '',
    thumbnail3: '',
    thumbnail4: '',
    title: "",
    dday: null,
    degree: 0,
  };
  instInfo = { name: '', inst: { file: '', career: '' } };
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
        alert('이미 신청 마감된 강의입니다.');
      }
    } else {
      alert('먼저 로그인을 해주세요.');
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
  giveStar( el ){
    var box = document.getElementsByClassName('mat-menu-trigger')[0] as HTMLElement;
    box.style.background ='url('+ el.img +') no-repeat center center / cover';
    box.textContent = el.text;
    box.classList.remove('arrowremove');
    box.classList.add('arrowremove');
    if(el.img == ''){
      box.classList.remove('arrowremove');
    }
    this.star = el;
  }
  bcc(e:Event){
    var box = e.target as HTMLElement;
    box.style.borderColor = '#DD5E5E;'
  }
  
  remainDate2(time,tag){
    var classdate = time;
    var remainTag = document.getElementsByClassName('remainDate')[0] as HTMLElement;
    var liveTime = new Date(Date.parse(classdate)).getTime()/1000;
    var calTime = new Date((liveTime - new Date().getTime()/1000)*1000);
    if (Number(calTime) >= 0) {
      let days = Math.floor(Number(calTime) / (1000 * 60 * 60 * 24));
      remainTag.textContent = days+"";
    }
  }
  review_add() {
    const form = {
      userId: this.user.id,
      author: this.user.name,
      lectureId: this.info.id,
      desc: this.review_desc,
      value: this.star.value,
      img: this.star.img,
      sub: false,
      open: true,
    }

    this.phxChannel.send('review', form);
    console.log(form);
  }
}
