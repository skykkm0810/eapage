import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Environment } from 'src/app/environment/environment';
import { AuthService } from 'src/app/service/auth.service';
import { PhxChannelService } from 'src/app/service/phx-channel.service';

@Component({
  selector: 'app-enroll-class',
  templateUrl: './enroll-class.component.html',
  styleUrls: ['./enroll-class.component.css']
})
export class EnrollClassComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private phxChannel: PhxChannelService,
    private auth: AuthService
  ) {
    phxChannel.Lecture.subscribe( data => {
      console.log(data);
      this.info = data;
      this.point.pay = this.info.point;
      console.log(this.point);
      this.receipt.payment = this.point.pay;
      this.receipt.lectureId = this.info.id;
    })
    phxChannel.User.subscribe( data => {
      this.user = data;
      this.point.all = this.user.company.personal;
      console.log(this.user);
    })
    phxChannel.Receipt.subscribe( data => {
      router.navigate(['enrollList/'+data.body.id])
    })
    phxChannel.ReceiptI.subscribe( () => {
      alert("이미 구매한 강의입니다.");
    })
  }

  ngOnInit(): void {
    this.injected = this.route.snapshot.params;
    this.user = JSON.parse(this.auth.getUserData());
    console.log(this.user);
    this.receipt.userId = this.user.id;
    this.phxChannel.get('lecture', this.injected);
    this.phxChannel.get('user', this.user);
  }


  point = {
    all: 0, now: 0, pay: 0
  }
  filePath = Environment.filePath;
  injected;
  user = {
    company: { personal: 0 },
    addr: '',
    subaddr: '',
    name: '',
    contact: '',
    id: 0
  };
  info = {
    currs: [{ date: null, dur: null, id: null, lectureId: null, stage: null, title: ''}],
    desc: "",
    id: null,
    inquire: "",
    inst: { id: null, name: '' },
    interests: [{ completed: true, lectureId: null, name: '', value: '' }],
    limit: null,
    mainImg: '',
    point: null,
    subtitle: "",
    targets: [{ desc: '', id: null, lectureId: null, point: null }],
    thumbnail1: '',
    title: "",
    kit: false,
  };
  delivery;
  receipt = {
    lectureId: 0,
    userId: 0,
    addr: '',
    subaddr: '',
    name: '',
    contact: '',
    subcontact: '',
    note: '',
    payment: 0,
  }
  msg = '';



  fakeoption(){
    this.receipt.note = this.msg;
  }

  apply() {
    this.phxChannel.send('apply', this.receipt);
  }

  deli( el ) {
    if( el == 1 ) {
      this.receipt.addr = this.user.addr;
      this.receipt.subaddr = this.user.subaddr;
      this.receipt.name = this.user.name;
      this.receipt.contact = this.user.contact;
    } else {
      this.receipt.addr = '';
      this.receipt.subaddr = '';
      this.receipt.name = '';
      this.receipt.contact = '';
    }
  }
}
