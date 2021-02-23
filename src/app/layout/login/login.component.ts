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
      window.location.href = './';
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
  pwdOk = false;
  info;

  access() {
    this.phxChannel.get('access', this.info);
  }
  close() {
    this.dialogRef.close();
  }
  findId(){
    var boxwrap = document.getElementsByClassName('boxwrap')[0] as HTMLElement;
    boxwrap.style.marginTop = -550+'px';
  }
  idSend(){
    // 이름 이메일 확인 후
    alert('가입 이메일로 아이디를 전송하였습니다.');
    this.close();
  }
  findPWD(){
    var boxwrap = document.getElementsByClassName('boxwrap')[0] as HTMLElement;
    boxwrap.style.marginTop = -1100+'px';
  }
  newPwd(){
    // 아이디 이메일 확인 후 
    this.pwdOk = true;
  }
  chgpwd(){
    // 비밀번호 변경 
    this.close();
  }
}
