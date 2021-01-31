import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-enroll-list',
  templateUrl: './enroll-list.component.html',
  styleUrls: ['./enroll-list.component.css']
})
export class EnrollListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  lectList = [
    {
      applied: '2021-01-27T16:00:00',
      file: [{
        path: 'thumbnail.png'
      }],
      title: '바쁠수록 차분하게, 마음챙김 명상',
      curr: [
        {
          title: '커리큘럼 1회차 제목',
          number: 1,
          datetime: '2021-01-27T16:00:00',
          runtime: '90분'
        },
        {
          title: '커리큘럼 2회차 제목',
          number: 2,
          datetime: '2021-01-27T16:00:00',
          runtime: '90분'
        },
        {
          title: '커리큘럼 3회차 제목',
          number: 3,
          datetime: '2021-01-27T16:00:00',
          runtime: '90분'
        },
      ]
    },
  ]
}
