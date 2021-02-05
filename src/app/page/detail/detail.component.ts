import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Environment } from 'src/app/environment/environment';
import { AuthService } from 'src/app/service/auth.service';
import { PhxChannelService } from 'src/app/service/phx-channel.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

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
    var number = (document.querySelector('.progress-container .right').textContent)
    this.number = number;
    this.injected = this.route.snapshot.params;
    console.log(this.injected);
    this.phxChannel.get('lecture', this.injected);
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
}
