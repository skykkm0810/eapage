import { Injectable, Output, EventEmitter } from '@angular/core';
import * as SocketIOFileUpload from 'socketio-file-upload';
import { io } from 'socket.io-client';
import { Environment } from '../environment/environment'



@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() {
    this.initSocket();
  }

  @Output() Resp: EventEmitter<any> = new EventEmitter();

  fileSocket: any;
  uploader: any;

  initSocket(){
    this.fileSocket = io(Environment.fileUpload);
    this.uploader = new SocketIOFileUpload(this.fileSocket);
    this.fileSocket.on('saved', (msg) => {
      this.Resp.emit(msg);
    })
  }

  listen( el ){
    this.uploader.listenOnInput( el ); // ex. document.getElementById("siofu_input")
  }

}
