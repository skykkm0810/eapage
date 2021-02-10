import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DefaultMatCalendarRangeStrategy } from '@angular/material/datepicker';
import { postcode } from 'src/assets/js/postcode.js';

@Component({
  selector: 'app-maumdoci',
  templateUrl: './maumdoci.component.html',
  styleUrls: ['./maumdoci.component.css']
})
export class MaumdociComponent implements OnInit {

  constructor(
    private renderer: Renderer2
  ) {}
  
  ngOnInit(): void {
  }

  @ViewChild('daum_popup', { read: ElementRef, static: true }) popup: ElementRef;

  addr() {
    postcode( this.renderer, this.popup.nativeElement, data => {
      console.log(data);
    })
  }

  close() {
    this.renderer.setStyle(this.popup.nativeElement, 'display', 'none');
  }


  // daumAddressOptions =  {
  //   class: ['btn', 'btn-primary']
  // };
  // setDaumAddressApi(data){
  //   // 여기로 주소값이 반환
  //   console.log(data);
  // }
  fun(){
    console.log(document.getElementsByTagName('input')[0].value) 
  }
}
