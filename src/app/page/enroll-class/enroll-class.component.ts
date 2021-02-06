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
    })
    phxChannel.User.subscribe( data => {
      this.user = data;
      this.point.all = this.user.company[0].personal;
      console.log(this.point);
    })
    phxChannel.Receipt.subscribe( () => {
      router.navigate(['enrollList/'+this.injected])
    })
  }

  ngOnInit(): void {
    this.injected = this.route.snapshot.params;
    this.user = JSON.parse(this.auth.getUserData());
    console.log(this.user);
    this.phxChannel.get('lecture', this.injected);
    this.phxChannel.get('user', this.user);
  }


  point = {
    all: 0, now: 0, pay: 0
  }
  filePath = Environment.filePath;
  injected;
  user = {
    company: [{ personal: 0 }],
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
    thumbnail: '',
    title: "",
    kit: false,
  };



  fakeoption(e:Event){
    var tag = e.target as HTMLInputElement
    var f_option = document.getElementsByClassName('fakeoption')[0] as HTMLInputElement;
    if(tag.value == '0'){
      f_option.style.display='block';
    }
    else {
      f_option.style.display='none';
    }
  }

  apply() {
    const form = { point: this.point.pay, lectureId: this.injected.id*1, userId: this.user.id };
    console.log(form);
    this.phxChannel.send('apply', form);
  }
}
