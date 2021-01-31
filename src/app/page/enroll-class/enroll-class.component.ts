import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-enroll-class',
  templateUrl: './enroll-class.component.html',
  styleUrls: ['./enroll-class.component.css']
})
export class EnrollClassComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  fakeoption(e:Event){
    var tag = e.target as HTMLInputElement
    var f_option = document.getElementsByClassName('fakeoption')[0] as HTMLInputElement;
    if(tag.value == '0'){
      f_option.style.display='block';
    }
    else {
      f_option.style.display='none';
    }
  }
}
