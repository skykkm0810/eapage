import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
// import { LoginService } from 'src/app/service/login.service';
import { PhxChannelService } from 'src/app/service/phx-channel.service';
import { MatDialogRef } from '@angular/material/dialog';
import { TopComponent } from '../top/top.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TopComponent>,
    public router : Router,
    private phxChannel: PhxChannelService,
  ) {
    phxChannel.Access.subscribe( () => {
      this.close();
    })
    phxChannel.Invalid.subscribe( () => {
      alert( '계정정보가 틀렸습니다.' );
      this.info.pwd = '';
    })
  }

  ngOnInit(): void {
    this.info = {
      uname: null,
      pwd: null,
    }
  }

  info;

  access() {
    this.phxChannel.get('access', this.info);
  }
  close() {
    this.dialogRef.close();
  }
}
