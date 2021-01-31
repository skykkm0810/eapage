import { Injectable, EventEmitter, Output } from '@angular/core';
import { Environment } from '../environment/environment';
import { Socket } from 'phoenix';

declare const Phoenix: any;

@Injectable({
  providedIn: 'root'
})

export class PhxChannelService {

  socket: any;
  instChannel: any;
  lectureChannel: any;
  userChannel: any;
  companyChannel: any;

  @Output() Insts: EventEmitter<any> = new EventEmitter();
  @Output() Inst: EventEmitter<any> = new EventEmitter();
  @Output() Lectures: EventEmitter<any> = new EventEmitter();
  @Output() Lecture: EventEmitter<any> = new EventEmitter();
  @Output() Users: EventEmitter<any> = new EventEmitter();
  @Output() Companies: EventEmitter<any> = new EventEmitter();
  @Output() Company: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.init_channel();
  }

  private init_channel() {
    this.socket = new Socket( `${Environment.socket_channel}/socket`, {
      logger: (kind, msg, data) => {
        // console.log( `${kind}: ${msg}`, data );
      },
      transport: WebSocket
    });
    this.socket.connect();
    this.instChannel = this.socket.channel('eap:inst', {});
    this.instChannel
      .join()
      .receive('ok', resp => {
        // console.log('Joined successfully', resp);
      })
      .receive('error', resp => {
        // console.log('Unable to join', resp);
      });

    this.instChannel.on('inst:list', payload => {
      // console.log('eap:inst from phx channel: ', payload);
      this.Insts.emit(payload.body);
    })
    this.instChannel.on('inst:list:ready', payload => {
      // console.log('eap:inst from phx channel: ', payload);
      this.RInsts.emit(payload.body);
    })
    this.instChannel.on('inst:detail', payload => {
      // console.log('eap:inst from phx channel: ', payload);
      this.Inst.emit(payload);
    })


    this.lectureChannel = this.socket.channel('eap:lecture', {});
    this.lectureChannel
      .join()
      .receive('ok', resp => {
        // console.log('Joined successfully', resp);
      })
      .receive('error', resp => {
        // console.log('Unable to join', resp);
      });

    this.lectureChannel.on('lecture:list', payload => {
      // console.log('eap:inst from phx channel: ', payload);
      this.Lectures.emit(payload.body);
    })
    this.lectureChannel.on('lecture:detail', payload => {
      // console.log('eap:inst from phx channel: ', payload);
      this.Lecture.emit(payload);
    })
    

    this.userChannel = this.socket.channel('eap:user', {});
    this.userChannel
      .join()
      .receive('ok', resp => {
        // console.log('Joined successfully', resp);
      })
      .receive('error', resp => {
        // console.log('Unable to join', resp);
      });

    this.userChannel.on('user:list', payload => {
      // console.log('eap:inst from phx channel: ', payload);
      this.Users.emit(payload.body);
    })


    this.companyChannel = this.socket.channel('eap:company', {});
    this.companyChannel
      .join()
      .receive('ok', resp => {
        // console.log('Joined successfully', resp);
      })
      .receive('error', resp => {
        // console.log('Unable to join', resp);
      });

    this.companyChannel.on('company:list', payload => {
      // console.log('eap:company from phx channel: ', payload);
      this.Companies.emit(payload.body);
    })
    this.companyChannel.on('company:detail', payload => {
      // console.log('eap:company from phx channel: ', payload);
      this.Company.emit(payload);
    })
        // this.send('device', 'req:device', { status: 'device' } )
  }

  send(channel, message) {
    switch (channel) {
      case 'inst':
        this.instChannel.push("inst:add:req", {body: message});
        break;
      case 'lecture':
        this.lectureChannel.push("lecture:add:req", {body: message});
        break;
      case 'user':
        this.userChannel.push("user:add:req", {body: message});
        break;
      case 'company':
        this.companyChannel.push("company:add:req", {body: message});
        break;
            
      default:
        // this.instChannel.push(event, {body: message});
        break;
    }
  }

  gets(channel, message) {
    switch (channel) {
      case 'inst':
        this.instChannel.push("inst:list:req", {body: message});
        break;
      case 'Rinst':
        this.instChannel.push("inst:list:ready:req", {body: message});
        break;
      case 'lecture':
        this.lectureChannel.push("lecture:list:req", {body: message});
        break;
      case 'user':
        this.userChannel.push("user:list:req", {body: message});
        break;
      case 'company':
        this.companyChannel.push("company:list:req", {body: message});
        break;
            
      default:
        // this.instChannel.push(event, {body: message});
        break;
    }
  }

  get(channel, message) {
    switch (channel) {
      case 'inst':
        this.instChannel.push("inst:detail:req", {body: message});
        break;
      case 'lecture':
        this.lectureChannel.push("lecture:detail:req", {body: message});
        break;
      case 'user':
        this.userChannel.push("user:detail:req", {body: message});
        break;
      case 'company':
        this.companyChannel.push("company:detail:req", {body: message});
        break;
            
      default:
        // this.instChannel.push(event, {body: message});
        break;
    }
  }

  up(channel, message) {
    switch (channel) {
      case 'inst':
        this.instChannel.push("inst:up:req", {body: message});
        break;
      case 'lecture':
        this.lectureChannel.push("lecture:up:req", {body: message});
        break;
      case 'user':
        this.userChannel.push("user:up:req", {body: message});
        break;
      case 'company':
        this.companyChannel.push("company:up:req", {body: message});
        break;
            
      default:
        // this.instChannel.push(event, {body: message});
        break;
    }
  }

  del(channel, message) {
    switch (channel) {
      case 'inst':
        this.instChannel.push("inst:del:req", {body: message});
        break;
      case 'lecture':
        this.lectureChannel.push("lecture:del:req", {body: message});
        break;
      case 'user':
        this.userChannel.push("user:del:req", {body: message});
        break;
      case 'company':
        this.companyChannel.push("company:del:req", {body: message});
        break;
            
      default:
        // this.instChannel.push(event, {body: message});
        break;
    }
  }

}
