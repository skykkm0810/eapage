import { Component, OnInit, AfterViewInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Environment } from 'src/app/environment/environment';
import { AuthService } from 'src/app/service/auth.service';
import { PhxChannelService } from 'src/app/service/phx-channel.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-broadcast',
  templateUrl: './broadcast.component.html',
  styleUrls: ['./broadcast.component.css']
})
export class BroadcastComponent implements OnInit, AfterViewInit, AfterViewChecked {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private phxChannel: PhxChannelService,
    private auth: AuthService,
    private bar: MatSnackBar,
  ) {
  }
  
  ngOnInit() {
    window.scrollTo(0,0);
    this.subs[0] = this.phxChannel.Like.subscribe( data => {
      this.bar.open('찜하기!', '닫기', {
        duration: 1000,
        verticalPosition: this.vP,
        horizontalPosition: this.hP,
      }) 
    })

    this.subs[1] = this.phxChannel.UnLike.subscribe( data => {
      this.bar.open('찜하기를 취소하셨습니다.', '닫기', {
        duration: 1000,
        verticalPosition: this.vP,
        horizontalPosition: this.hP,
      }) 
    })

    console.log(this.subs);
    this.phxChannel.Inst.subscribe( data => {
      this.instInfo = data;
    })
    this.phxChannel.Curr.subscribe( data => {
      console.log(data);
      this.info = data.lecture;
      if(this.info.kit){
        this.kit = '../../../assets/images/icon/pink/kit.png'
      }
      else{
        this.kit = '../../../assets/images/icon/white/kit.png'
      }
      this.sum = 0;
      this.stgs = this.info.currs.length;
      this.reviews = data.lecture.reviews;
      data.lecture.currs.forEach( data => {
        this.sum += data.dur*1;
      })
      if(this.info.least == null || this.info.least == undefined){
        this.info.degree = 0;
      }
      else{
        this.info.degree = Math.floor(data.lecture.receipts.length/data.lecture.least * 100);
      }
      // this.info.degree = Math.ceil(data.receipts.length*1 / data.least * 100);
      if( this.info.dday != null ) {
        let d1 = new Date(this.info.dday).getTime();
        let d2 = new Date().getTime();
        if ( d1 < d2 ) {
          this.dday_c = false;
          this.dday = '마감';
        } else {
          d1 = new Date(this.info.dday).setHours(0,0,0,0);
          d2 = new Date().setHours(0,0,0,0);
          let time = Math.round((d1 - d2) / 1000 / 60 / 60 / 24 );
          this.dday_c = true;
          this.dday = time+"";
          console.log(d1,d2,time,this.dday);
        }
      } else {
        this.dday_c = false;
        this.dday = '오픈 예정';
      }


      if ( data.lecture.reviews.length > 0 ) {
        data.lecture.reviews.forEach( el => {
          if ( el.userId == this.user.id*1 ) {
            this.reviewed = true;
            console.log('hello');
          }
        })
      }


      this.phxChannel.get('inst', this.info.inst)
      console.log(this.info);
    })
    this.phxChannel.Lecture.subscribe( data => {
      this.info = data;
      if(this.info.kit){
        this.kit = '../../../assets/images/icon/pink/kit.png'
      }
      else{
        this.kit = '../../../assets/images/icon/white/kit.png'
      }
      this.sum = 0;
      this.stgs = this.info.currs.length;
      this.reviews = data.reviews;
      data.currs.forEach( data => {
        this.sum += data.dur*1;
      })
      if(this.info.least == null || this.info.least == undefined){
        this.info.degree = 0;
      }
      else{
        this.info.degree = Math.floor(data.receipts.length/data.least * 100);
      }
      // this.info.degree = Math.ceil(data.receipts.length*1 / data.least * 100);
      if( this.info.dday != null ) {
        let d1 = new Date(this.info.dday).getTime();
        let d2 = new Date().getTime();
        if ( d1 < d2 ) {
          this.dday_c = false;
          this.dday = '마감';
        } else {
          d1 = new Date(this.info.dday).setHours(0,0,0,0);
          d2 = new Date().setHours(0,0,0,0);
          let time = Math.round((d1 - d2) / 1000 / 60 / 60 / 24 );
          this.dday_c = true;
          this.dday = time+"";
          console.log(d1,d2,time,this.dday);
        }
      } else {
        this.dday_c = false;
        this.dday = '오픈 예정';
      }


      if ( data.reviews.length > 0 ) {
        data.reviews.forEach( el => {
          if ( el.userId == this.user.id*1 ) {
            this.reviewed = true;
            console.log('hello');
          }
        })
      }


      this.phxChannel.get('inst', this.info.inst)
      console.log(this.info);
    })
    this.phxChannel.UserReceipt.subscribe( data => {
      console.log(data);
      data.body.forEach( d => {
        if (d.lectureId == this.injected.id*1) {
          this.reviewable = true;
        }
      })
    })
    this.phxChannel.ReviewAdd.subscribe( data => {
      this.reviews = data.body;
      this.reviewed = true;
    })

    // var number = (document.querySelector('.progress-container .right').textContent)
    // this.number = number;
    this.injected = this.route.snapshot.params;
    // console.log(this.injected);
    // this.phxChannel.get('lecture', this.injected);
    this.phxChannel.get('curr', this.injected);
    if (this.login = this.auth.isAuthenticated()) {
      this.user = JSON.parse(this.auth.getUserData());
      console.log(this.user);
      this.phxChannel.gets('user:receipt', { uid: this.user.id*1 });
    };

    console.log(this.login);
    if ( this.login == true ) {
      this.reviewText = "주제와 무관한 리뷰나 악플은 경고조치 없이 삭제 될수 있습니다.";
    }

    // // 채팅창 커서
    // var chatInput = document.getElementsByClassName('chatInput')[0] as HTMLInputElement;
    // // console.log(chatInput);
    // var line = document.getElementsByClassName('nml')[0] as HTMLElement;
    // chatInput.addEventListener('focus',()=>{
    //   line.style.display ='block';
    // })
    // chatInput.addEventListener('focusout',()=>{
    //   line.style.display ='none';
    // })
    
    
  }


  ngAfterViewInit():void{
    // var chatInput = document.getElementsByClassName('chatInput')[0] as HTMLElement;
    // chatInput.addEventListener('keypress',(e)=>{
    //   console.log(e)
    //   if(e.ctrlKey == false  && e.shiftKey == false){
    //     if(e.code =="NumpadEnter" || e.key == "Enter"){
    //       e.preventDefault();
    //       this.chatUp(this.chatText);
    //     }
    //   }
    //   else if(e.ctrlKey == true ){
    //     if(e.code =="NumpadEnter" || e.key == "Enter"){
    //       alert();
    //     }
    //   }
    // })
    // this.scrollToB();
  }
  
  ngAfterViewChecked(): void {
    // let diff = this.chatContainer.nativeElement.scrollHeight - this.chatContainer.nativeElement.scrollTop;
    // console.log(this.chatContainer.nativeElement.scrollHeight)
    // if ( this.chatContainer.nativeElement.scrollHeight > 460){
    //   var chatBody = document.getElementsByClassName('chatBody')[0] as HTMLElement;
    //   chatBody.classList.remove('noOver');

    // }
    // if ( diff < 500) {
    //   this.scrollToB();
    // }

  }

  // @ViewChild('chatScroll') private chatContainer: ElementRef;

  // scrollToB(): void {
  //   try {
  //     this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }


  subs = [];

  hP: MatSnackBarHorizontalPosition = 'center';
  vP: MatSnackBarVerticalPosition = 'top';
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

    // 강의
    recommand:[
      {process:'OPEN 예정',remain:'',openDay:'2021-02-22',hashTag:[{tag:'#스트레스'},{tag:'#심리안정'},{tag:'#릴렉스'}] ,color:"#DD5E5E",category:'연애·결혼',title:'플라워디퓨저' , img:'assets/images/banner/week1.png', text:'각종 가공 플라워를 이용한 힐링 프로그램'},
      {process:'OPEN 예정',remain:'',openDay:'2021-02-22',hashTag:[{tag:'#스트레칭'},{tag:'#운동'},{tag:'#릴렉스'}],color:"#00C6C6",category:'부부·가족',title:'요가로 이용한 스트레스 풀기' , img:'assets/images/banner/week2.png', text:'요가를 이용해 심신을 수양하는 프로그램'},
      // {process:'진행중',degree:50 ,color:"#954FD0",category:'인생 2막',title:'두줄 까지는 안전한가요? 세줄은 좀 힘들어 보이는데' , img:'assets/images/banner/week3.png', text:'글자길이'},
      // {process:'OPEN 예정',hashTag:[{tag:'#스트레칭'},{tag:'#심리안정'},{tag:'#릴렉스'}],color:"#DD5E5E",category:'연애·결혼',title:'플라워디퓨저' , img:'assets/images/banner/week1.png', text:'각종 가공 플라워를 이용한 힐링 프로그램'},
      // {process:'OPEN 예정',hashTag:[{tag:'#스트레칭'},{tag:'#심리안정'},{tag:'#릴렉스'}],color:"#00C6C6",category:'부부·가족',title:'글자를 늘려보려고 길게 적어보았습니다.' , img:'assets/images/banner/week2.png', text:'각종 가공의 그것들을 이용한 어쩃든 무엇을 하는 프로그램'},
      {process:'OPEN 예정',remain:'',openDay:'2021-02-22',hashTag:[{tag:'#가족관계'},{tag:'#공감하기'},{tag:'#행복'}],color:"#954FD0",category:'인생 2막',title:'함께하는 가족관계 형성하기' , img:'assets/images/banner/week3.png', text:'일도 중요하지만 가정은 더욱 소중하기에, 나의 가정을 행복하게 가꾸기 위한 프로그램'},
    ]
  }

  like = false;
  kit = ''
  reviewable = false;
  reviews = this.detail.review;
  reviewed = false;
  star = { img: '', value: 0 };
  review_desc;
  login = false;
  reviewText = "리뷰를 작성하려면 로그인을 해주세요.";
  number;
  user = { name: '', id: 0, companyId: 0, uname: '' };
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
    hash:'',
    kitImg: '',
    mat: false,
    matImg: '',
    point: null,
    least: 0,
    max: 0,
    subtitle: "",
    reviewimg: null,
    targets: [{ desc: '', id: null, lectureId: null, point: null }],
    thumbnail1: '',
    thumbnail2: '',
    thumbnail3: '',
    thumbnail4: '',
    re1:'',
    re2:'',
    re3:'',
    restar1:'',
    restar2:'',
    restar3:'',
    company: false,
    companyId: null,
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

  // fakeChat
  fakeChat = [
    {name:'전태현',text:'안녕하세요 반갑습니다. 잘 부탁드리겠습니다.'},
    {name:'김진혁',text:'올 시즌은 과연 몇 골이나 넣을까?'},
    {name:'Cesinha',text:'vamos and Thank you gogo DaeguFC!! come on my fans i miss you. how many you guys come? :)'},
  ]
  chatText='';

  apply() {
    if ( this.auth.isAuthenticated() ) {
      if( this.dday_c ) {
        if( this.reviewable ) {
          alert('이미 신청한 강의입니다.');
        } else {
          if( this.info.company == true && this.user.companyId*1 != this.info.companyId*1 ) {
            alert('소속 고객사만 신청할 수 있습니다.');
          } else {
            this.router.navigate(['enrollClass/'+this.injected.id])
          }
        }
      } else {
        alert('이 강의는 신청할 수 없는 상태입니다.');
      }
    } else {
      alert('먼저 로그인을 해주세요.');
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
  
  
  review_add() {
    if ( !this.login ) {
      alert('리뷰를 쓰시려면 로그인을 하셔야합니다.');
      return;
    } 
    if ( !this.reviewable ) {
      alert('수강을 하셔야 리뷰를 쓸 수 있습니다.');
      return;
    }
    if ( this.reviewed ) {
      alert('이미 리뷰를 쓰셨습니다.');
      return;
    }

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
  scroll( el ) {
    // var tag = document.getElementById(el) as HTMLElement;
    el.scrollIntoView();
  }
  likes() {
    if ( !this.login ) {
      this.bar.open('로그인을 해주셔야합니다.', '닫기', {
        duration: 1000,
        verticalPosition: this.vP,
        horizontalPosition: this.hP,
        // panelClass: 'snackbar',
      })     
    } else {
      this.phxChannel.send('like', { userId: this.user.id, lectureId: this.injected.id*1 });
    }
  }
  // chatUp(txt){
  //   if(txt == ''){
  //     return;
  //   }
  //   else{
  //     var chatInput = document.getElementsByClassName('chatInput')[0] as HTMLElement;
  //     var obj = {name:this.user.name , text: txt };
  //     this.fakeChat.push(obj);
  //     this.chatText = '';
  //     chatInput.focus();
  //   }
  //     // this.whenOverFlow()
  // }

  // whenOverFlow(){
  //   var chatMount = document.getElementsByClassName('chatLine');
  //   var chatBody = document.getElementsByClassName('chatBody')[0] as HTMLElement;
  //   var bodyHeight = chatBody.offsetHeight;
  //   var TotalHeight = 0;
    

  //   for(var i=0; i< chatMount.length; i++){
  //     TotalHeight = TotalHeight + chatMount[i].clientHeight;
  //   }
  //   console.log(TotalHeight);
  //   if(TotalHeight > bodyHeight){
  //     chatBody.classList.remove('noOver');
  //     chatBody.scrollTop = TotalHeight;
      
  //   }
  // }
  
}

