import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhxChannelService } from 'src/app/service/phx-channel.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private phxChannel: PhxChannelService
  ) {
    phxChannel.Inst.subscribe( data => {
      console.log(data)
      this.instInfo = data;
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
          this.dday = '종료';
        } else {
          let time = Math.ceil((d2 - d1) / 1000 / 60 / 60 / 24);
          this.dday = time + '일 남음';
        }
      }
      console.log(this.dday);
      console.log(data)
      phxChannel.get('inst', this.info.inst[0])
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
  info;
  instInfo;
  sum = 0;
  stgs = 0;
  dday = '';
}
