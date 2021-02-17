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
  @Output() InstUp: EventEmitter<any> = new EventEmitter();
  @Output() Lectures: EventEmitter<any> = new EventEmitter();
  @Output() LecturesToday: EventEmitter<any> = new EventEmitter();
  @Output() Lecture: EventEmitter<any> = new EventEmitter();
  @Output() LectureOpen: EventEmitter<any> = new EventEmitter();
  @Output() LectureClose: EventEmitter<any> = new EventEmitter();
  @Output() LectureControled: EventEmitter<any> = new EventEmitter();
  @Output() Users: EventEmitter<any> = new EventEmitter();
  @Output() User: EventEmitter<any> = new EventEmitter();
  @Output() UserUp: EventEmitter<any> = new EventEmitter();
  @Output() Companies: EventEmitter<any> = new EventEmitter();
  @Output() Company: EventEmitter<any> = new EventEmitter();
  @Output() Confirm: EventEmitter<any> = new EventEmitter();
  @Output() Invalid: EventEmitter<any> = new EventEmitter();
  @Output() Access: EventEmitter<any> = new EventEmitter();
  @Output() Signup: EventEmitter<any> = new EventEmitter();
  @Output() Receipts: EventEmitter<any> = new EventEmitter();
  @Output() Receipt: EventEmitter<any> = new EventEmitter();
  @Output() ReceiptD: EventEmitter<any> = new EventEmitter();
  @Output() ReceiptI: EventEmitter<any> = new EventEmitter();
  @Output() UserReceipt: EventEmitter<any> = new EventEmitter();
  @Output() ReviewAdd: EventEmitter<any> = new EventEmitter();
  @Output() Reviews: EventEmitter<any> = new EventEmitter();

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
        console.log('Joined successfully', resp);
      })
      .receive('error', resp => {
        console.log('Unable to join', resp);
      });

    this.instChannel.on('inst:list', payload => {
      this.Insts.emit(payload.body);
    })
    this.instChannel.on('inst:detail', payload => {
      this.Inst.emit(payload);
    })
    this.instChannel.on('inst:invalid', payload => {
      // console.log('eap:inst from phx channel: ', payload);
      this.Invalid.emit(payload);
    })
    this.instChannel.on('inst:add', payload => {
      // console.log('eap:inst from phx channel: ', payload);
      this.InstUp.emit(payload);
    })
    this.instChannel.on('inst:up', payload => {
      // console.log('eap:inst from phx channel: ', payload);
      this.InstUp.emit(payload);
    })


    this.lectureChannel = this.socket.channel('eap:lecture', {});
    this.lectureChannel
      .join()
      .receive('ok', resp => {
        console.log('Joined successfully', resp);
      })
      .receive('error', resp => {
        console.log('Unable to join', resp);
      });

    this.lectureChannel.on('lecture:list', payload => {
      this.Lectures.emit(payload.body);
    })
    this.lectureChannel.on('lecture:today:list', payload => {
      this.LecturesToday.emit(payload);
    })
    this.lectureChannel.on('lecture:detail', payload => {
      this.Lecture.emit(payload);
    })
    this.lectureChannel.on('review:add', payload => {
      this.ReviewAdd.emit(payload);
    })
    this.lectureChannel.on('lecture:controled:list', payload => {
      this.LectureControled.emit(payload);
    })
    this.lectureChannel.on('lecture:open:list', payload => {
      this.LectureOpen.emit(payload.body);
    })
    this.lectureChannel.on('lecture:close:list', payload => {
      this.LectureClose.emit(payload.body);
    })
    
    

    this.userChannel = this.socket.channel('eap:user', {});
    this.userChannel
      .join()
      .receive('ok', resp => {
        console.log('Joined successfully', resp);
      })
      .receive('error', resp => {
        console.log('Unable to join', resp);
      });

    this.userChannel.on('user:list', payload => {
      this.Users.emit(payload.body);
    })
    this.userChannel.on('user:invalid', payload => {
      this.Invalid.emit(payload.body);
    })
    this.userChannel.on('user:access', payload => {
      this.Access.emit(payload.body);
    })
    this.userChannel.on('user:signup', payload => {
      this.Signup.emit(payload);
    })
    this.userChannel.on('user:detail', payload => {
      this.User.emit(payload);
    })
    this.userChannel.on('user:up', payload => {
      this.UserUp.emit(payload);
    })
    this.userChannel.on('receipt:add', payload => {
      this.Receipt.emit(payload);
    })
    this.userChannel.on('receipt:invalid', payload => {
      this.ReceiptI.emit(payload);
    })
    this.userChannel.on('receipt:list', payload => {
      this.Receipts.emit(payload);
    })
    this.userChannel.on('receipt:detail', payload => {
      this.ReceiptD.emit(payload);
    })
    this.userChannel.on('user:receipt:list', payload => {
      this.UserReceipt.emit(payload);
    })

    this.companyChannel = this.socket.channel('eap:company', {});
    this.companyChannel
      .join()
      .receive('ok', resp => {
        console.log('Joined successfully', resp);
      })
      .receive('error', resp => {
        console.log('Unable to join', resp);
      });

    this.companyChannel.on('company:list', payload => {
      this.Companies.emit(payload.body);
    })
    this.companyChannel.on('company:detail', payload => {
      this.Company.emit(payload);
    })
    this.companyChannel.on('company:confirm', payload => {
      this.Confirm.emit(payload);
    })
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
      case 'apply':
        this.userChannel.push('receipt:add:req', {body: message});
        break;
      case 'review':
        this.lectureChannel.push('review:add:req', {body: message});
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
      case 'lecture:open':
        this.lectureChannel.push("lecture:open:list:req", {body: message});
        break;
      case 'lecture:close':
        this.lectureChannel.push("lecture:close:list:req", {body: message});
        break;
      case 'lecture:today':
        this.lectureChannel.push("lecture:today:list:req", {body: message});
        break;
      case 'lecture:controled':
        this.lectureChannel.push("lecture:controled:list:req", {body: message});
        break;
      case 'user':
        this.userChannel.push("user:list:req", {body: message});
        break;
      case 'receipt':
        this.userChannel.push("receipt:list:req", {body: message});
        break;
      case 'user:receipt':
        this.userChannel.push("user:receipt:list:req", {body: message});
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
      case 'receipt':
        this.userChannel.push("receipt:detail:req", {body: message});
        break;
      case 'company':
        this.companyChannel.push("company:detail:req", {body: message});
        break;
      case 'access':
        this.userChannel.push("user:access:req", {body: message});
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

  confirm(channel, message) {
    switch (channel) {
      case 'company':
        this.companyChannel.push("company:confirm:req", {body: message});
        break;
            
      default:
        // this.instChannel.push(event, {body: message});
        break;
    }
  }

}
