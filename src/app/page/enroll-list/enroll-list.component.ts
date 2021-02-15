import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Environment } from 'src/app/environment/environment';
import { AuthService } from 'src/app/service/auth.service';
import { PhxChannelService } from 'src/app/service/phx-channel.service';

@Component({
  selector: 'app-enroll-list',
  templateUrl: './enroll-list.component.html',
  styleUrls: ['./enroll-list.component.css']
})
export class EnrollListComponent implements OnInit {

  constructor(
    private phxChannel: PhxChannelService,
    private route: ActivatedRoute,
    private auth: AuthService,
  ) {
    phxChannel.ReceiptD.subscribe( data => {
      console.log(data.body);
      this.info = data.body;
      this.point.pay = this.info.payment
    })
    phxChannel.UserReceipt.subscribe( data => {
      console.log(data.body);
      this.receipts = data.body;
      data.body.forEach( data => {
        this.point.now += data.payment*1;
      })
      this.point.res = this.point.all - this.point.now;
    })
    phxChannel.User.subscribe( data => {
      console.log(data);
      this.user = data;
      this.point.all = this.user.company.personal;
      this.point.res = this.point.all - this.point.now;
    })
  }
  
  ngOnInit(): void {
    this.params = this.route.snapshot.params;
    this.cred = JSON.parse(this.auth.getUserData());

    this.phxChannel.gets('user:receipt', { id: this.params.id, uid: this.cred.id });
    this.phxChannel.get('receipt', this.params);
    this.phxChannel.get('user', this.cred);
  }

  params;
  cred;
  user = {
    company: { personal: 0, id: 0 },
    addr: '',
    subaddr: '',
    name: '',
    contact: '',
    id: 0
  };
  receipts;
  point = {
    all: 0, now: 0, pay: 0, res: 0
  }
  info = {
    lecture: {
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
    },
    payment: 0,
    date: null,
  };

  filePath = Environment.filePath

  go() {
    window.location.href = "./";
  }
}
