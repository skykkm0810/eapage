import {  Component, OnInit, AfterViewInit, ViewChild  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ExportService } from '../../service/export.service';
import { PhxChannelService } from 'src/app/service/phx-channel.service';

@Component({
  selector: 'app-lecture-info-list',
  templateUrl: './lecture-info-list.component.html',
  styleUrls: ['./lecture-info-list.component.css']
})
export class LectureInfoListComponent {
  
  constructor(
  ) { 
    this.tableData = new MatTableDataSource(this.FAKE);

    
  }

  ngOnInit(): void {
    this.tableData.paginator = this.paginator;
    this.tableData.sort = this.sort;
  }
  ngAfterViewInit(): void{
    this.tableData.paginator = this.paginator;
    this.tableData.sort = this.sort;
  }
  FAKE = [
    {name:'깽미',age:'29',gender:'남',marry:'무',copWork:'IT',psnWork:'연구원',className:'개발 잘하는 기초',classTime:'2021-02-28',reviewPoint:4},
    {name:'이지은',age:'29',gender:'여',marry:'무',copWork:'엔터테인먼트',psnWork:'엔터테이너',className:'개발 잘하는 기초',classTime:'2021-02-28',reviewPoint:5},
  ]

  tableHeader = ['name','age','gender','marry','copWork','psnWork','className','classTime','reviewPoint']
  tableData : MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableData.filter = filterValue.trim().toLowerCase();
  }
}
