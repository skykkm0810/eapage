import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PersonalInformationComponent } from '../../modal/personal-information/personal-information.component';
import { UsageRuleComponent } from '../../modal/usage-rule/usage-rule.component';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(
    public dialog:MatDialog,
    public dialog2:MatDialog,
  ) { }

  ngOnInit(): void {
  }
  pir(){
    const dialogRef = this.dialog.open(PersonalInformationComponent);

  }
  usr(){
    const dialogRef2 = this.dialog.open(UsageRuleComponent);
  }
}
