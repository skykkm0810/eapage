import {  Component, OnInit, AfterViewInit, ViewChild  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ExportService } from '../../service/export.service';
import { PhxChannelService } from 'src/app/service/phx-channel.service';
import { AuthService } from 'src/app/service/auth.service';
import { forEachChild } from 'typescript';

@Component({
  selector: 'app-lecture-info-list',
  templateUrl: './lecture-info-list.component.html',
  styleUrls: ['./lecture-info-list.component.css']
})
export class LectureInfoListComponent {
  
  constructor(
    private phxChannel: PhxChannelService,
    private auth: AuthService,
  ) { 
    this.tableData = new MatTableDataSource(this.info);
    this.tableData.paginator = this.paginator;
    this.tableData.sort = this.sort;
  }

  ngOnInit(): void {
    this.phxChannel.InstReceipts.subscribe( data => {
      console.log(data.body);
      this.info = [];
      data.body.forEach( d => {
        let d1 = new Date(d.birth).getFullYear();
        let d2 = new Date().getFullYear();
        d.age = d2 - d1 + 1;

        if( d.currs.length > 0 ) {
          if ( d.currs[0].date != null ) {
            d.date = d.currs[0].date;
          }
        }
        if( d.reviews.length > 0 ) {
          d.star = d.reviews[0].value;
        }
        this.info.push(d);
      })
      console.log(this.info);
      this.tableData = new MatTableDataSource(this.info);
      this.tableData.paginator = this.paginator;
      this.tableData.sort = this.sort;
    })

    
    
    
    this.user = JSON.parse(this.auth.getUserData());
    this.phxChannel.gets('inst:receipt', { id: this.user.id })

  }
  ngAfterViewInit(): void{
  }

  user;
  subs;
  info = [
    {name:'깽미',age:'29',gender:'남',merry:'무',workType:'IT',rank:'연구원',title:'개발 잘하는 기초',date:'2021-02-28',star:4},
  ]

  tableHeader = ['name','age','gender','merry','workType','rank','title','date','star']
  tableData : MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableData.filter = filterValue.trim().toLowerCase();
  }
}
