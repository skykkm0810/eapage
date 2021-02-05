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
  }
  
  nodeSocket;
  
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
}
