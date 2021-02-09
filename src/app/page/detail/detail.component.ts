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
  
  ngOnInit() {
    // var number = (document.querySelector('.progress-container .right').textContent)
    // this.number = number;
    this.injected = this.route.snapshot.params;
    // console.log(this.injected);
    this.phxChannel.get('lecture', this.injected);

    this.categoryArrow();
    this.remainDate();
    this.degree();
    
  }
  
  detail = {
    progress:'예정', 
    teacher : '도애지',
    teacherImg:'../../../assets/images/noImg.png',
    teacherSpec:`
    이움(이완과 움직임) 대표
    단국대학교 체육학 박사
    숨터 Director
    명상 수행 안내자
    - GX program / Yoga / Pilates Master Trainer
    - NLP Trainer (Certified by Q.A.S)
    - MBSR (Mindfulness Based Stress Reduction program)
    - MBCT (Mindfulness-based cognitive therapy)
    `,
    OpenDay:'2021-02-22',
    classImg:[
      {img:'../../../assets/images/img/yjkim_1.jpg'},
      {img:'../../../assets/images/img/yjkim_2.jpg'},
      {img:'../../../assets/images/img/yjkim_3.jpg'},
    ],
    title:'바쁠수록 차분하게, 마음챙김 영상 입니다만 글자를 길게하기위해서', 
    text:'바쁘고 복잡한 새상 속에서도 마음은 고요하게, 머리를 맑게하고싶어요 엉엉 릴렉스',
    degree:'100',
    hashTag: [
      {tag:'#스트레칭'},
      {tag:'#명상'},
      {tag:'#릴렉스'},
      {tag:'#심리안정'},
    ],
    // 수업 세분화
    classRound:{
      totalR:3,
      classTime:90,
      classDate: [
        {numRo:'1 회기',date:'2월 22일 수요일', time:'20:00 ~ 21:30',subtitle:'슬기롭게마음먹기',
        curr:[
          {pieceTime:'10분',kinds:'소개',contents:'강사소개'},
          {pieceTime:'40분',kinds:'소개',contents:'강사소개'},
          {pieceTime:'10분',kinds:'소개',contents:'강사소개'},
          {pieceTime:'20분',kinds:'소개',contents:'강사소개'},
          {pieceTime:'20분',kinds:'소개',contents:'강사소개'},
          {pieceTime:'10분',kinds:'마무리',contents:'끝맺음'},
        ]},
        {numRo:'2 회기',date:'2월 23일 목요일', time:'20:00 ~ 21:30', subtitle:'당당하게 걷기',
        curr:[
          {pieceTime:'10분',kinds:'소개',contents:'강사소개'},
          {pieceTime:'40분',kinds:'소개',contents:'강사소개'},
          {pieceTime:'10분',kinds:'소개',contents:'강사소개'},
          {pieceTime:'20분',kinds:'소개',contents:'강사소개'},
          {pieceTime:'20분',kinds:'소개',contents:'강사소개'},
          {pieceTime:'10분',kinds:'마무리',contents:'끝맺음'},
        ]},
        {numRo:'3 회기',date:'2월 24일 금요일', time:'20:00 ~ 21:30', subtitle:'끝맺음 잘하기',
        curr:[
          {pieceTime:'10분',kinds:'소개',contents:'강사소개'},
          {pieceTime:'40분',kinds:'소개',contents:'강사소개'},
          {pieceTime:'10분',kinds:'소개',contents:'강사소개'},
          {pieceTime:'20분',kinds:'소개',contents:'강사소개'},
          {pieceTime:'20분',kinds:'소개',contents:'강사소개'},
          {pieceTime:'10분',kinds:'마무리',contents:'끝맺음'},
        ]},
      ]
    },
    minStudent:10,
    maxStudent:30,
    pointMoney:120000,
    // 클래스 소개
    classPoint:[
      {title:'point 01',text:'나를 나타내는 컬러 타인을 통해 알아본 나의 컬러'},
      {title:'point 02',text:'나를 나타내는 컬러 타인을 통해 알아본 나의 컬러'},
      {title:'point 03',text:'나를 나타내는 컬러 타인을 통해 알아본 나의 컬러'},
      {title:'point 04',text:'나를 나타내는 컬러 타인을 통해 알아본 나의 컬러'},
    ],
    // 기대효과
    expect:[
      {text:'컬러에너지로 얻는 나의 이해 및 타인 이해로 관계에 대한 스트레스 해소 및 자존감 향상을 도모'},
      {text:'컬러에너지로 얻는 나의 이해 '},
      {text:'컬러에너지로 얻는 나의 이해 및 타인 이해로 관계에 대한 스트레스 해소'},
      {text:'컬러에너지로 얻는 나의 이해 및 타인 이해'},
    ],
    // 진행특징
    particular:[
      {text:'컬러에너지로 얻는 나의 이해 및 타인 이해로 관계에 대한 스트레스 해소 및 자존감 향상을 도모'},
      {text:'컬러에너지로 얻는 나의 이해 '},
      {text:'컬러에너지로 얻는 나의 이해 및 타인 이해로 관계에 대한 스트레스 해소'},
      {text:'컬러에너지로 얻는 나의 이해 및 타인 이해'},
    ],
    // 이런분들을 위해
    readyFor:[
      {who:'비활동적인 사람'},
      {who:'집중하지 못하고 효율이 안 나오는 사람'},
      {who:'계획했던 일이 잘 풀리지 않는 사람'},
    ],
    // 키트 ,준비물
    kit:'../../../assets/images/noImg.png',
    material:'../../../assets/images/noImg.png',
    // 리뷰 
    review:[
      {star:'assets/images/icon/star/star1.png',reviewer:'김이박',text:'아주 별루'},
      {star:'assets/images/icon/star/star2.png',reviewer:'박종윤',text:'조금 굿굿'},
      {star:'assets/images/icon/star/star3.png',reviewer:'이정안',text:'아주 굿굿'},
      {star:'assets/images/icon/star/star4.png',reviewer:'박최고',text:'완전 굿굿'},
      {star:'assets/images/icon/star/star2.png',reviewer:'박종윤',text:'조금 굿굿'},
      {star:'assets/images/icon/star/star2.png',reviewer:'박종윤',text:'조금 굿굿'},
      {star:'assets/images/icon/star/star4.png',reviewer:'박최고',text:'완전 굿굿'},
      {star:'assets/images/icon/star/star4.png',reviewer:'박최고',text:'완전 굿굿'},
      {star:'assets/images/icon/star/star4.png',reviewer:'박최고',text:'완전 굿굿'},
    ],
    // 별점이미지
    starimg:[
      {star:'assets/images/icon/star/star5.png',text:''},
      {star:'assets/images/icon/star/star4.png',text:''},
      {star:'assets/images/icon/star/star3.png',text:''},
      {star:'assets/images/icon/star/star2.png',text:''},
      {star:'assets/images/icon/star/star1.png',text:''},
      {star:'', text:'별점 주기'},
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
  giveStar(star,text){
    var box = document.getElementsByClassName('mat-menu-trigger')[0] as HTMLElement;
    box.style.background ='url('+ star +') no-repeat center center / cover';
    box.textContent = text;
    box.classList.remove('arrowremove');
    box.classList.add('arrowremove');
    if(star == ''){
      box.classList.remove('arrowremove');
    }
  }
  bcc(e:Event){
    var box = e.target as HTMLElement;
    box.style.borderColor = '#DD5E5E;'
  }
  remainDate(){
    var classdate = this.detail.OpenDay;
    var remainTag = document.getElementsByClassName('remainDate')[0] as HTMLElement;
    var liveTime = new Date(Date.parse(classdate)).getTime()/1000;
    var calTime = new Date((liveTime - new Date().getTime()/1000)*1000);
    if (Number(calTime) >= 0) {
      let days = Math.floor(Number(calTime) / (1000 * 60 * 60 * 24));
      remainTag.textContent = days+"";
    }
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
  degree() {
    // var bar = document.getElementsByClassName('thermoBar');
    // console.log(bar)
    // console.log(bar.length)
    // for(var i=0; i<bar.length; i++){
    //   var tag = bar[i] as HTMLElement;
    //   console.log(tag)
    //   var text = Number(tag.textContent) 
    //   console.log(text)
    //   tag.style.width = 3 * text +'px';
    //   if(3*text >= 100){ 
    //     tag.style.width = 300 +'px';
    //   }
    // }
    
  }
  
}
