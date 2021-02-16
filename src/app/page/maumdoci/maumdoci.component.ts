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
  
}
