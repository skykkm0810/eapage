import { EventEmitter, Injectable, Output } from '@angular/core';
import { io } from 'socket.io-client';
import { Environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  constructor() {
    this.init();
  }
  
  init() {
    this.nodeSocket = io(Environment.node_socket);
    this.zoomSocket = io(Environment.zoom_socket);
    this.zoomSocket.on('url', data => {
      this.ZoomUrl.emit(data);
    })
  }

  @Output() ZoomUrl: EventEmitter<any> = new EventEmitter;
  
  nodeSocket;
  zoomSocket;
  
  emergencyCall(info) {
    this.nodeSocket.emit('emergency', info);
  }

  weatherCall() {
    this.nodeSocket.emit('weather');
  }

  covidCall() {
    this.nodeSocket.emit('covid');
  }

  mailSend(info) {
    this.nodeSocket.emit('mail', info);
  }

  get_url( data ) {
    this.zoomSocket.emit('meeting:url', data);
  }
}
