import { Component, ElementRef, OnInit, Renderer2, ViewChild, ɵɵresolveBody } from '@angular/core';
import { postcode } from 'src/assets/js/postcode.js';
import { AnimationEvent } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.css']
})
export class TestPageComponent implements OnInit {

  constructor(
    private renderer: Renderer2

  ) { }
  @ViewChild('daum_popup', { read: ElementRef, static: true }) popup: ElementRef;

  ngOnInit(): void {
  }
  phoneFormat(e:Event) {
    var number = (e.target as HTMLInputElement).value;
    console.log(number);
  }
  show(e:Event){
    var number = (e.target as HTMLInputElement).value;
    console.log(number)
  }
  animStart(event: AnimationEvent) {
    console.log('Animation Started', event);
  }
   
  animDone(event: AnimationEvent) {
    console.log('Animation Ended', event);
  }
}
