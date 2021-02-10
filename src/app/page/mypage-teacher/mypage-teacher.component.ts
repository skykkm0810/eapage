import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddressComponent } from '../../modal/address/address.component';
import { Agreement, INTERESTS, react, cause, Banks, selAccountType, selCollStat, selGender, selLevel } from '../../interface/interface';
import { PhxChannelService } from 'src/app/service/phx-channel.service';
import { AuthService } from 'src/app/service/auth.service';
import { Environment } from 'src/app/environment/environment';
import { FileUploadService } from 'src/app/service/file-upload.service';

@Component({
  selector: 'app-mypage-teacher',
  templateUrl: './mypage-teacher.component.html',
  styleUrls: ['./mypage-teacher.component.css']
})
export class MypageTeacherComponent implements OnInit {

  constructor(
    public dialog:MatDialog,
    private phxChannel: PhxChannelService,
    private auth: AuthService,
    private uploader: FileUploadService,
  ) {
    uploader.Resp.subscribe( data => {
      console.log(data);
      this.info.file = data;
    })
    phxChannel.Inst.subscribe( data => {
      console.log(data);
      this.info = {
        id: data.id,
        instId: data.inst.id,
        name: data.name,
        birth: data.birth,
        gender: data.gender,
        contact: data.contact,
        addr: data.addr,
        accType: data.inst.accType,
        bankName: data.inst.bankName,
        companyId: 0,
        reg: data.inst.reg,
        email: data.email,
        bankAcc: data.inst.bankAcc,
        career: data.inst.career,
        file: data.inst.file,
      };
      this.edus = data.grads;
      this.careers = data.cars;
      this.certs = data.certs;

      for ( let j = 0; j < data.causes.length; j++ ) {
        for ( let i = 0; i < this.cause.length; i++ ) {
          if (this.cause[i].name == data.causes[j].name) {
            this.cause[i] = data.causes[j];
          }
        }
      }
      for ( let j = 0; j < data.reacts.length; j++ ) {
        for ( let i = 0; i < this.react.length; i++ ) {
          if (this.react[i].name == data.reacts[j].name) {
            this.react[i] = data.reacts[j];
          }
        }
      }
      let today = new Date();
      this.lecture_end = [];
      this.lecture_yet = [];
      data.lectures.forEach( el => {
        // console.log(el);
        let idx = el.currs.length - 1;
        if( el.currs[idx].date == null ) {
          this.lecture_yet.push(el);
        } else {
          let day = new Date(el.currs[idx].date).getTime()
          if( day > today.getTime() ) {
            this.lecture_yet.push(el);
          } else {
            this.lecture_end.push(el);
          }
        }
      })
      console.log( this.lecture_yet, this.lecture_end );
      // console.log(data);
      // console.log(this.info);
    })
  }

  ngOnInit(): void {
    this.uploader.listen( document.getElementById('file') );
    this.info = JSON.parse(this.auth.getUserData());
    console.log(this.info);
    this.phxChannel.get('inst', this.info);
  }


  info: any = {
    uname: '',
    pwd: '',
    name: '',
    gender: '',
    contact: '',
    addr: '',
    accType: '',
    bankName: '',
    companyId: 0,
    bankAcc: '',
    career: '',
    passed: false,
    type: true,
    file: 'unknown.jpg',
  }
  lecture_end = [];
  lecture_yet = [];
  
  eduFace: any = { level: '', coll: '', dep: '', grad: null, status: '' };
  certFace: any = { agency: '', name: '', level: '', code: '', date: null };
  careerFace: any = { start: null, end: null, name: '', form: '', count: null };
  edus: any[] = [];
  certs: any[] = [];
  careers: any[] = [];

  cause = cause;
  react = react;
  filePath = Environment.filePath;

  lectList = [
    {
      applied: '2021-01-27T16:00:00',
      file: [{
        path: 'thumbnail.png'
      }],
      title: '바쁠수록 마음챙김, 차분하게 명상',
      subtitle: '커리큘럼 1회차 제목',
      number: 1,
      student:30,
      students:[
        {name:'김슬기',company:'일심전자 본사', contact:'010-1111-2222',address:'어딘가에 살겠지~'},
        {name:'이슬기',company:'일심전자 본사', contact:'010-3333-2222',address:'어딘가에 살겠지~'},
        {name:'배슬기',company:'일심전자 본사', contact:'010-5555-2222',address:'어딘가에 살겠지~'},
      ],
    },
    {
      applied: '2021-01-27T16:00:00',
      file: [{
        path: 'thumbnail.png'
      }],
      title: '바쁠수록 마음챙김, 차분하게 명상',
      subtitle: '커리큘럼 1회차 제목',
      number: 1,
      student:30,
      students:[
        {name:'김슬기',company:'일심전자 본사', contact:'010-1111-2222',address:'어딘가에 살겠지~'},
        {name:'이슬기',company:'일심전자 본사', contact:'010-3333-2222',address:'어딘가에 살겠지~'},
        {name:'배슬기',company:'일심전자 본사', contact:'010-5555-2222',address:'어딘가에 살겠지~'},
      ],
    },
    {
      applied: '2021-01-27T16:00:00',
      file: [{
        path: 'thumbnail.png'
      }],
      title: '바쁠수록 마음챙김, 차분하게 명상',
      subtitle: '커리큘럼 1회차 제목',
      number: 1,
      student:30,
      students:[
        {name:'김슬기',company:'일심전자 본사', contact:'010-1111-2222',address:'어딘가에 살겠지~'},
        {name:'이슬기',company:'일심전자 본사', contact:'010-3333-2222',address:'어딘가에 살겠지~'},
        {name:'배슬기',company:'일심전자 본사', contact:'010-5555-2222',address:'어딘가에 살겠지~'},
      ],
    },
  ]

  banks = Banks;
  genders = selGender;
  accTypes = selAccountType;
  levels = selLevel;
  collStat = selCollStat;

  changePassword(e:Event){
    var button =(e.target as HTMLElement);
    console.log(button)
    var password = button.closest('div').getElementsByTagName('input')[0] as HTMLInputElement;
    console.log(password)
    if(confirm('비밀번호를 변경하시겠습니까?')){
      password.style.display ='block';
      button.style.display = 'none';
    }
  }
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
  educhk(m:Event){
    var thischk = m.target as HTMLInputElement;
    var fakeBox = thischk.closest('.chkBox') as HTMLElement;
    var inputText = thischk.closest('div')?.querySelector('input[type="text"]') as HTMLInputElement;
    if(thischk.checked == true){
      fakeBox.classList.add('checked')
      inputText.disabled = false;
    }
    else{
      fakeBox.classList.remove('checked');
      inputText.disabled = true;
    }
  }
  showStudent(e:Event){
    var showStudent = (e.target as HTMLElement);
    var thisTd = showStudent.closest('td') as HTMLElement;
    var listTable = thisTd.getElementsByClassName('studentList')[0] as HTMLElement;
    if(listTable.classList.contains('hidden')){
      showStudent.classList.remove('showStudent')
      showStudent.classList.add('hideStudent')
      listTable.classList.remove('hidden')
    }
    else {
      showStudent.classList.remove('hideStudent')
      showStudent.classList.add('showStudent')
      listTable.classList.add('hidden')
    }
  }

  addEdu() {
    if( this.edus.length < 3 ) {
      this.edus.push({ level: '', coll: '', dep: '', grad: null, status: '' });
    }
  }
  addcer() {
    this.certs.push({ agency: '', name: '', level: '', code: '', date: null });
  }
  addcar() {
    this.careers.push({ start: null, end: null, name: '', form: '', count: null });
  }
  removeEdu(value: any){
    const index: number = this.edus.indexOf(value);
    this.edus.splice(index, 1);
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
  click() {
    if ( this.info.pwd == '' ) {
      delete this.info.pwd;
    }
    if ( !this.info.name || !this.info.gender || !this.info.contact ) {
      alert('필수 항목을 입력해주세요');
    } else {
      this.info.edus = this.edus;
      this.info.certs = this.certs;
      this.info.careers = this.careers;
      const cau = this.cause.filter( data => data.completed == true );
      const rea = this.react.filter( data => data.completed == true );
      this.info.cause = cau;
      this.info.react = rea;
      console.log(this.info);
      this.phxChannel.up('inst', this.info);
    }
  }
}
