import { getLocaleDateTimeFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.css']
})
export class MypageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  interests = [
    { name: 'merr', value: '연애결혼', completed: false },
    { name: 'chil', value: '자녀양육', completed: false },
    { name: 'coup', value: '부부관계', completed: false },
    { name: 'life', value: '인생 2막', completed: false },
    { name: 'rela', value: '대인관계', completed: false },
    { name: 'comm', value: '커뮤니케이션', completed: false },
    { name: 'lead', value: '리더십', completed: false },
    { name: 'orga', value: '조직적응', completed: false },
    { name: 'yoga', value: '명상요가', completed: false },
    { name: 'body', value: '몸 마음 건강', completed: false },
    { name: 'arty', value: '예술 치유', completed: false },
    { name: 'heal', value: '힐링 DIY', completed: false },
    { name: 'unde', value: '자기 이해', completed: false },
    { name: 'tria', value: '심리 특강', completed: false },
  ];

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
      ]
    },
    {
      applied: '2021-01-27T16:00:00',
      file: [{
        path: 'thumbnail.png'
      }],
      title: '바쁠수록 마음챙김, 차분하게 명상',
      curr: [{
        title: '커리큘럼 1회차 제목',
        number: 1,
        datetime: '2021-01-27T16:00:00:00',
        runtime: '90분'
      }]
    }
  ]





  allchk(e:Event){
    var thischk = e.target as HTMLElement;
    var chkshow = document.querySelectorAll('.agreeBox div .agreeHole');
    if(thischk.classList.contains('checked')){
      thischk.classList.remove('checked')
      for(var i=0; i<chkshow.length; i++){
        chkshow[i].classList.remove('checked');
        (chkshow[i].querySelector('input') as HTMLInputElement).checked = false;
      }
    }
    else{
      thischk.classList.add('checked')
      for(var i=0; i<chkshow.length; i++){
        chkshow[i].classList.remove('checked');
        chkshow[i].classList.add('checked');
        (chkshow[i].querySelector('input') as HTMLInputElement).checked = true;
      }
    }
  }
  onechk(m:Event){
    var thischk = m.currentTarget as HTMLElement;
    m.preventDefault();
    var allchk = document.querySelector('.agreeBox .allAgree .agreeHole') as HTMLInputElement;
    allchk.classList.remove('checked')
    if(thischk.classList.contains('checked')){
      thischk.classList.remove('checked');
      (thischk.querySelector('input') as HTMLInputElement).checked = false;
    }
    else{
      thischk.classList.add('checked');
      (thischk.querySelector('input') as HTMLInputElement).checked = true;
    }
  }
  tabclick(a:Event){
    var thistab = a.target as HTMLElement;
    var tabs = document.querySelectorAll('.tabBox li');
    var contents = document.querySelectorAll('.tabContentBox');
    for(var i=0; i<tabs.length; i++){
      tabs[i].classList.remove('on')
      contents[i].classList.remove('hidden')
      contents[i].classList.add('hidden')
      if(thistab == tabs[i]){
        contents[i].classList.remove('hidden')
      }
    }
    thistab.classList.add('on')
  }
  nextBtn(b:Event){
    var mother = (b.target as HTMLElement).closest('.tabContentBox')
    var contents = document.querySelectorAll('.tabContentBox');
    var tabs = document.querySelectorAll('.tabBox li');
    for(var i=0; i<contents.length; i++){
      tabs[i].classList.remove('on')
      contents[i].classList.remove('hidden')
      contents[i].classList.add('hidden')
    }
    for(var i=0; i<contents.length; i++){
      if(contents[i] == mother){
        tabs[i+1].classList.add('on')
        contents[i+1].classList.remove('hidden')
      }
    }
  }
  interestChk(m:Event){
    var thischk = m.currentTarget as HTMLElement;
    m.preventDefault();
    if(thischk.classList.contains('checking')){
      thischk.classList.remove('checking');
      (thischk.querySelector('input') as HTMLInputElement).checked = false;
    }
    else{
      thischk.classList.add('checking');
      (thischk.querySelector('input') as HTMLInputElement).checked = true;
    }
  }
  click() {
    console.log(this.interests);
  }
}
