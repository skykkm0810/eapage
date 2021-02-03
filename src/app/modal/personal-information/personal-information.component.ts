import { Component, OnInit } from '@angular/core';
import { Agreement } from 'src/app/interface/interface';
@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css']
})
export class PersonalInformationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  text = Agreement.privRule;
}
