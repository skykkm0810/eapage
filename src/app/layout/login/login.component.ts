import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { LoginService } from 'src/app/service/login.service';
// import { PhxChannelService } from 'src/app/service/phx-channel.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public router : Router,
    // private phxChannel: PhxChannelService,
    // private login: LoginService
  ) {
    // phxChannel.Access.subscribe( data => {
    //   if ( data.body.length > 0 ) {
    //     login.setLogin(data.body);
    //   }
    // })
    // login.Log.subscribe( () => {
    //   router.navigate(['/']);
    // })
  }

  ngOnInit(): void {
  }

  info = {
    uname: null,
    pwd: null,
  }

  // access() {
  //   this.phxChannel.get('access', this.info);
  // }
  // join(){
    // this.router.navigate(['/join/']);
  // }
  // findAccount(){
    // this.router.navigate(['/findAccount/']);
  // }
}
