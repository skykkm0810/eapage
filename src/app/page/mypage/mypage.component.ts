import { getLocaleDateTimeFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Environment } from 'src/app/environment/environment';
import { INTERESTS } from 'src/app/interface/interface';
import { AuthService } from 'src/app/service/auth.service';
import { PhxChannelService } from 'src/app/service/phx-channel.service';

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.css']
})
export class MypageComponent implements OnInit {

  constructor(
    private phxChannel: PhxChannelService,
    private auth: AuthService,
    private route: ActivatedRoute,
  ) {
    phxChannel.User.subscribe( data => {
      this.user = data;
      this.user.companyId = this.user.company.id;
      console.log(this.user);
      let ints = this.interests;
      for ( let j = 0; j < data.interests.length; j++ ) {
        for ( let i = 0; i < this.interests.length; i++ ) {
          if (this.interests[i].name == data.interests[j].name) {
            this.interests[i] = data.interests[j];
          }
        }
      }
    })
    phxChannel.Receipts.subscribe( data => {
      let today = new Date();
      this.receipt_end = [];
      this.receipt_yet = [];
      data.body.forEach( el => {
        let idx = el.lecture.currs.length - 1;
        if( el.lecture.currs[idx].date == null ) {
          this.receipt_yet.push(el);
        } else {
          let day = new Date(el.lecture.currs[idx].date).getTime()
          if( day > today.getTime() ) {
            this.receipt_yet.push(el);
          } else {
            this.receipt_end.push(el);
          }
        }
      })
    })
    phxChannel.UserUp.subscribe( () => {
      window.location.reload();
    })

  }

  ngOnInit(): void {
    this.cred = this.route.snapshot.params;
    this.interests = INTERESTS;
    this.user = {
      id: 0,
      pwd: '',
      name: '',
      contact: '',
      addr: '',
      subaddr: '',
      birth: '',
      gender: '',
      child: '',
      merry: '',
      companyId: 0,
      company: { name: '', id: 0 },
      part: '',
      rank: '',
      spot: '',
      email: '',
      interests: [],
    };
    this.user.id = JSON.parse(this.auth.getUserData()).id;
    if ( this.user.id != this.cred.id ) {
      alert('잘못된 접근경로입니다.');
      window.location.href="/";
    } else {
      this.phxChannel.get('user', this.user);
      this.phxChannel.gets('receipt', this.user);
    }
  }

  cred;
  user;
  info;

  receipt_end = [
    {
      date: null,
      lecture: {
        currs: [{ date: null, dur: 0, stage: 1, title: ''}],
        title: '',
        thumbnail1: '',
      }
    }
  ];
  receipt_yet = [
    {
      date: null,
      lecture: {
        currs: [{ date: null, dur: 0, stage: 1, title: ''}],
        title: '',
        thumbnail1: '',
      }
    }
  ];

  interests;
  filePath = Environment.filePath;

  allchk(e:Event){
    var thischk = e.target as HTMLElement;
    var chkshow = document.querySelectorAll('.agreeBox div .agreeHole');
    if(thischk.classList.contains('checked')){
      thischk.classList.remove('checked')
      for(var i=0; i<chkshow.length; i++){
        chkshow[i].classList.remove('checked');
        (chkshow[i].querySelector('input') as HTMLInputElement).checked = false;
      }
    }
    else{
      thischk.classList.add('checked')
      for(var i=0; i<chkshow.length; i++){
        chkshow[i].classList.remove('checked');
        chkshow[i].classList.add('checked');
        (chkshow[i].querySelector('input') as HTMLInputElement).checked = true;
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
      (thischk.querySelector('input') as HTMLInputElement).checked = false;
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
  interestChk(m:Event){
    var thischk = m.currentTarget as HTMLElement;
    m.preventDefault();
    if(thischk.classList.contains('checking')){
      thischk.classList.remove('checking');
      (thischk.querySelector('input') as HTMLInputElement).checked = false;
    }
    else{
      thischk.classList.add('checking');
      (thischk.querySelector('input') as HTMLInputElement).checked = true;
    }
  }
  click() {
    if ( this.user.pwd == '' ) {
      delete this.user.pwd;
    }
    const inter = this.interests.filter( data => data.completed == true );
    this.user.interests = inter;
    this.phxChannel.up('user', this.user);
  }

  check( el ) {
    el.completed = !el.completed;
    console.log(el);
  }
  nochild() {
    this.info.child = '';
  }
  nomerry(){
    this.info.merry = '';
  }
}
