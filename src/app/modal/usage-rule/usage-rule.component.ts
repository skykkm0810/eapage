import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Agreement} from '../../interface/interface';
@Component({
  selector: 'app-usage-rule',
  templateUrl: './usage-rule.component.html',
  styleUrls: ['./usage-rule.component.css']
})
export class UsageRuleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  text = Agreement.userRule
}
