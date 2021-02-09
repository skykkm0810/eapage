import { Component, ElementRef, OnInit, Renderer2, ViewChild, ɵɵresolveBody } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { Agreement, INTERESTS } from '../../interface/interface';
import { PhxChannelService } from '../../service/phx-channel.service';
import { SocketioService } from '../../service/socketio.service';
import { postcode } from 'src/assets/js/postcode.js';
import { MatDialog } from '@angular/material/dialog';
import { AddressComponent } from '../../modal/address/address.component';
@Component({
  selector: 'app-join-teacher',
  templateUrl: './join-teacher.component.html',
  styleUrls: ['./join-teacher.component.css']
})
export class JoinTeacherComponent implements OnInit {

  constructor(
    private phxChannel: PhxChannelService,
    private router: Router,
    private mailer: SocketioService,
    private auth: AuthService,
    public dialog:MatDialog,
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
  eduFace: any = { level: '', coll: '', dep: '', grad: null, status: '' };
  certFace: any = { agency: '', name: '', level: '', code: '', date: null };
  careerFace: any = { start: null, end: null, name: '', form: '', count: null };
  edus: any[] = [this.eduFace]
  certs: any[] = [this.certFace]
  careers: any[] = [this.careerFace]
  causes = [
    { name: 'Work_1', value: 'Work-관계(갈등)', completed: false },
    { name: 'Work_2', value: 'Work-역할모호성', completed: false },
    { name: 'Work_3', value: 'Work-업무과다', completed: false },
    { name: 'Work_4', value: 'Work-직무적응/적성', completed: false },
    { name: 'Work_5', value: 'Work-업무성과', completed: false },
    { name: 'Work_6', value: 'Work-진급/평가', completed: false },
    { name: 'Work_7', value: 'Work-경력개발', completed: false },
    { name: 'Work_8', value: 'Work-조직개편(부서이동 포함)', completed: false },
    { name: 'Work_9', value: 'Work-징계연류', completed: false },
    { name: 'Work_10', value: 'Work-감정노동', completed: false },
    { name: 'Work_11', value: 'Work-직장 내 폭력(괴롭힘)', completed: false },
    { name: 'Work_12', value: 'Work-직장 내 성희롱', completed: false },
    { name: 'Life_1', value: 'Life-관계(갈등)', completed: false },
    { name: 'Life_2', value: 'Life-부부/가족', completed: false },
    { name: 'Life_3', value: 'Life-자녀양육', completed: false },
    { name: 'Life_4', value: 'Life-경제적문제', completed: false },
    { name: 'Life_5', value: 'Life-부부/가족', completed: false },
    { name: 'Life_6', value: 'Life-건강', completed: false },
    { name: 'Life_7', value: 'Life-진로', completed: false },
    { name: 'Life_8', value: 'Life-상실', completed: false },
    { name: 'Life_9', value: 'Life-성생활', completed: false },
    { name: 'Life_10', value: 'Life-성소수자', completed: false },
    { name: 'Life_11', value: 'Life-재무', completed: false },
    { name: 'Life_12', value: 'Life-법률', completed: false },
    { name: 'Life_13', value: 'Life-세무', completed: false },
    { name: 'Life_14', value: 'Life-노무', completed: false },
    { name: 'Healing_1', value: 'Healing-요가', completed: false },
    { name: 'Healing_2', value: 'Healing-원예', completed: false },
    { name: 'Healing_3', value: 'Healing-독서', completed: false },
    { name: 'Healing_4', value: 'Healing-아로마', completed: false },
    { name: 'Healing_5', value: 'Healing-마사지', completed: false },
    { name: 'Healing_6', value: 'Healing-캘리그라피', completed: false },
    { name: 'Healing_7', value: 'Healing-사진', completed: false },
    { name: 'Healing_8', value: 'Healing-아트', completed: false },
    { name: 'Healing_9', value: 'Healing-음악', completed: false },
    { name: 'Healing_10', value: 'Healing-명상', completed: false },
    { name: 'Healing_11', value: 'Healing-영화', completed: false },
    { name: 'Healing_12', value: 'Healing-힐링캠프', completed: false },
  ];

  result = [
    { name: 'Emotional_1', value: '정서적증상-분노/화', completed: false },
    { name: 'Emotional_2', value: '정서적증상-우울', completed: false },
    { name: 'Emotional_3', value: '정서적증상-불안', completed: false },
    { name: 'Emotional_4', value: '정서적증상-PTSD', completed: false },
    { name: 'Behavior_1', value: '행동적증상-자살위험', completed: false },
    { name: 'Behavior_2', value: '행동적증상-자해', completed: false },
    { name: 'Behavior_3', value: '행동적증상-근태', completed: false },
    { name: 'Behavior_4', value: '행동적증상-신체화', completed: false },
    { name: 'Behavior_5', value: '행동적증상-폭력/폭언', completed: false },
    { name: 'Behavior_6', value: '행동적증상-자해', completed: false },
    { name: 'Behavior_7', value: '행동적증상-섭식', completed: false },
    { name: 'Behavior_8', value: '행동적증상-수면', completed: false },
    { name: 'Behavior_9', value: '행동적증상-강박', completed: false },
    { name: 'Behavior_10', value: '행동적증상-음주', completed: false },
    { name: 'Behavior_11', value: '행동적증상-중독', completed: false },
    { name: 'Cognitive_1', value: '인지적증상-기억력 저하', completed: false },
    { name: 'Cognitive_2', value: '인지적증상-집중력 저하', completed: false },
  ];

  bankList = [
    {id:1, name:"신한은행", },
    {id:2, name:"하나은행", },
    {id:3, name:"국민은행", },
  ]
  @ViewChild('daum_popup', { read: ElementRef, static: true }) popup: ElementRef;
  
  showPicture(event : Event){
    console.log();
    var reader = new FileReader();
    var imgBox = document.getElementsByClassName('fakeUpload')[0] as HTMLElement;
    var file = (event.target as HTMLInputElement).files[0];
    imgBox.style.background = 'no-repeat center center / contain';
    reader.onload = function(e){
      imgBox.style.backgroundImage ='url('+reader.result+')';
      imgBox.innerHTML = "";
    }
    reader.readAsDataURL(file);
  }
  addEdu(e:Event){
    var hiddenEdu = (e.target as HTMLElement).closest('.educationInfo')?.querySelector('div.hidden');
    hiddenEdu?.classList.remove('hidden')
  }
  addcer() {
    this.certs.push({ agency: '', name: '', level: '', code: '', date: null });
  }
  addcar() {
    this.careers.push({ start: null, end: null, name: '', form: '', count: null });
  }
  removeEdu(e:Event){
    var hiddenEdu = (e.target as HTMLElement).closest('div')
    hiddenEdu.classList.add('hidden')
    // console.log(hiddenEdu)

  }
  removeCer(value:any){
    const index: number = this.certs.indexOf(value);
    this.certs.splice(index, 1);
  }
  removeCar(value:any){
    const index: number = this.careers.indexOf(value);
    this.careers.splice(index, 1);
  }
  showadd(obj){
    const dialogRef = this.dialog.open(AddressComponent);
  }
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
