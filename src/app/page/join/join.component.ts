import { Component, ElementRef, OnInit, Renderer2, ViewChild, ɵɵresolveBody } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { Agreement, INTERESTS } from '../../interface/interface';
import { PhxChannelService } from '../../service/phx-channel.service';
import { SocketioService } from '../../service/socketio.service';
import { postcode } from 'src/assets/js/postcode.js';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})

export class JoinComponent implements OnInit {

  constructor(
    private phxChannel: PhxChannelService,
    private router: Router,
    private mailer: SocketioService,
    private auth: AuthService,
    private renderer: Renderer2
  ) {
    // phxChannel.Confirm.subscribe( data => {
    //   console.log(data);
    //   if( data.body.length > 0 ) {
    //     this.companyInfo = data.body[0];
    //     this.info.companyId = this.companyInfo.id;
    //   } else {
    //     alert('회사코드를 정확히 입력해주세요.');
    //   }
    // })
    // phxChannel.Signup.subscribe( data => {
    //   console.log(data.body);
    //   auth.setToken(data.body);
    //   window.location.href = '/';
    //   // this.nextBtn(this.event3);
    // })
    // phxChannel.Invalid.subscribe( data => {
    //   alert('아이디가 이미 존재합니다.')
    // })
  }

  ngOnInit(): void {
  }

  agreement = Agreement;
  
  subscription: Subscription;
  
  companyInfo: any = {
    reg: '',
    code: '',
    name: '',
    part: '',
  };
  
  info: any = {
    name: '',
    companyId: null,
    email: '',
    gender: null,
    addr: '',
    subaddr: '',
    rank: '',
    region: '',
    contact: '',
    pwd: '',
    child: null,
    birth: '',
    interests: null,
    type: false,
  }
  
  interests = INTERESTS;
  emailCode : any = '초기값';
  companyCode : any = '초기값';

  @ViewChild('daum_popup', { read: ElementRef, static: true }) popup: ElementRef;
  
  
  allchk(e:Event){
    var thischk = e.target as HTMLElement;
    var chkshow = document.querySelectorAll('.agreeBox div .agreeHole');
    if(thischk.classList.contains('checked')){
      thischk.classList.remove('checked')
      for(var i=0; i<chkshow.length; i++){
        chkshow[i].classList.remove('checked');
        (chkshow[i].closest('label').querySelector('input') as HTMLInputElement).checked = false;
      }
    }
    else{
      thischk.classList.add('checked')
      for(var i=0; i<chkshow.length; i++){
        chkshow[i].classList.remove('checked');
        chkshow[i].classList.add('checked');
        (chkshow[i].closest('label').querySelector('input') as HTMLInputElement).checked = true;
      }
    }
  }
  onechk(m:Event){
    var thischk = m.currentTarget as HTMLElement;
    m.preventDefault();
    var allchk = document.querySelector('.agreeBox .allAgree .agreeHole') as HTMLInputElement;
    allchk.classList.remove('checked')
    if(thischk.classList.contains('checked')){
      thischk.classList.remove('checked');
      (thischk.closest('label').querySelector('input') as HTMLInputElement).checked = false;
    }
    else{
      thischk.classList.add('checked');
      (thischk.querySelector('input') as HTMLInputElement).checked = true;
    }
  }
  tabclick(a:Event){
    var thistab = a.target as HTMLElement;
    var tabs = document.querySelectorAll('.tabBox li');
    var contents = document.querySelectorAll('.tabContentBox');
    for(var i=0; i<tabs.length; i++){
      tabs[i].classList.remove('on')
      contents[i].classList.remove('hidden')
      contents[i].classList.add('hidden')
      if(thistab == tabs[i]){
        contents[i].classList.remove('hidden')
      }
    }
    thistab.classList.add('on')
  }
  beforeNext1(a:Event){
    var mother = (a.target as HTMLElement).closest('.tabContentBox') as HTMLElement;
    var neccesary = mother.getElementsByClassName('neccesary');
    for(var i=0; i<neccesary.length; i++){
      if(neccesary[i].getElementsByTagName('input')[0].checked == false){
        alert('필수 항목은 모두 체크 하셔야 이용 가능합니다.');
        return;
      }
    }
    this.nextBtn(a);
  }
  clear(a:Event){
    var clearInput = (a.target as HTMLElement).closest('div').getElementsByClassName('neccesary')[0] as HTMLInputElement
    var clearBox = (a.target as HTMLElement).closest('div')
    if( clearBox.classList.contains('mailCertifi') ){
      if(clearInput.value == this.emailCode){
        clearInput.classList.add('clear');
        alert('인증되었습니다.');
      }
      else{
        alert('인증코드가 맞지 않습니다.');
      }
    }
    else if (clearBox.classList.contains('companyCode')){
      if(clearInput.value == this.companyCode){
        clearInput.classList.add('clear')
        alert('인증되었습니다.');
      }
      else{
        alert('인증코드가 맞지 않습니다.');
      }
    }
  }
  beforeNext2(a:Event){
    var mother = (a.target as HTMLElement).closest('.tabContentBox') as HTMLElement;
    var neccesary = mother.getElementsByClassName('neccesary');
    var inpputs = mother.getElementsByTagName('input');
    for(var i=0; i<inpputs.length; i++){
      if(!neccesary[0].classList.contains('clear')){
        alert('이메일 코드 인증 확인이 필요합니다.');
        return;
      }
      else if (!neccesary[0].classList.contains('clear')){
        alert('회사 코드 인증 확인이 필요합니다.');
        return; 
      }

      if(inpputs[i].value == ""){
        alert('모든 필수항목이 채워져 있어야합니다.');
        return;
      }
    }
    
    this.nextBtn(a);
  }

  event3: any;
  beforeNext3(a:Event){
    this.event3 = a;
    var mother = (a.target as HTMLElement).closest('.tabContentBox') as HTMLElement;
    var neccesary = mother.getElementsByTagName('input');
    for(var i=0; i<neccesary.length; i++){
      if((neccesary[i] as HTMLInputElement).value == ''){
        alert('모든 필수 항목을 채워주셔야 이용 가능합니다.');
        return;
      }
    }
    this.reg();
    this.nextBtn(a);
  }
  nextBtn(b:Event){
    var mother = (b.target as HTMLElement).closest('.tabContentBox')
    var contents = document.querySelectorAll('.tabContentBox');
    var tabs = document.querySelectorAll('.tabBox li');
    for(var i=0; i<contents.length; i++){
      tabs[i].classList.remove('on')
      contents[i].classList.remove('hidden')
      contents[i].classList.add('hidden')
    }
    for(var i=0; i<contents.length; i++){
      if(contents[i] == mother){
        tabs[i+1].classList.add('on')
        contents[i+1].classList.remove('hidden')
      }
    }
  }
  prevBtn(b:Event){
    var mother = (b.target as HTMLElement).closest('.tabContentBox')
    var contents = document.querySelectorAll('.tabContentBox');
    var tabs = document.querySelectorAll('.tabBox li');
    for(var i=0; i<contents.length; i++){
      tabs[i].classList.remove('on')
      contents[i].classList.remove('hidden')
      contents[i].classList.add('hidden')
    }
    for(var i=0; i<contents.length; i++){
      if(contents[i] == mother){
        tabs[i-1].classList.add('on')
        contents[i-1].classList.remove('hidden')
      }
    }
  }
  interestChk(m:Event){
    var thischk = m.target as HTMLInputElement;
    var fakebox = (thischk.closest('label') as HTMLElement).querySelector('span');
    m.preventDefault();
    if(thischk.checked == true){
      fakebox.classList.remove('checking');
      fakebox.classList.add('checking');
    }
    else{
      fakebox.classList.remove('checking');
    }
  }

  confirm() {
    this.phxChannel.confirm( 'company', this.companyInfo );
  }

  reg() {
    const inter = this.interests.filter( data => data.completed == true );
    this.info.interests = inter;
    console.log(this.info);
    this.phxChannel.send('user', this.info);
  }

  send() {
    const code = Math.round(Math.random()*899999) + 100000;
    const msg = { to: this.info.email, code: code }
    this.emailCode = code;
    console.log(msg);
    this.mailer.mailSend(msg);
    alert('메일을 확인해주세요');
  }

  nochild() {
    this.info.child = '';
  }
  nomerry(){
    this.info.merry = '';
  }

  addr() {
    postcode( this.renderer, this.popup.nativeElement, data => {
      console.log(data);
      this.info.addr = `(${data.zonecode}) ${data.roadAddress}`;
      console.log(this.info);
    })
  }
  close() {
    this.renderer.setStyle(this.popup.nativeElement, 'display', 'none');
  }
}

