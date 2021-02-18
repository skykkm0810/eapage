import { Component, OnInit ,Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private getdata:any, 
  ) { 
  this.name = this.getdata.data.user[0].name;
  this.contact = this.getdata.data.user[0].contact;
  this.addr1 = this.getdata.data.addr;
  this.addr2 = this.getdata.data.subaddr;
  this.company = this.getdata.data.user[0].company[0].name;
  }
  
  ngOnInit(): void {
    
  }
  name  = '';
  contact  = '';
  addr1  = '';
  addr2  = '';
  company = '';
}
