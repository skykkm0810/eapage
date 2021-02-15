import { Component, ElementRef, OnInit, Renderer2, ViewChild, ɵɵresolveBody } from '@angular/core';
import { postcode } from 'src/assets/js/postcode.js';

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
  
}
