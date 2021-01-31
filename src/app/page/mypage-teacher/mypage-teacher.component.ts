import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mypage-teacher',
  templateUrl: './mypage-teacher.component.html',
  styleUrls: ['./mypage-teacher.component.css']
})
export class MypageTeacherComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  lectList = [
    {
      applied: '2021-01-27T16:00:00',
      file: [{
        path: 'thumbnail.png'
      }],
      title: '바쁠수록 마음챙김, 차분하게 명상',
      subtitle: '커리큘럼 1회차 제목',
      number: 1,
      student:30,
      students:[
        {name:'김슬기',company:'일심전자 본사', contact:'010-1111-2222'},
        {name:'이슬기',company:'일심전자 본사', contact:'010-3333-2222'},
        {name:'배슬기',company:'일심전자 본사', contact:'010-5555-2222'},
      ],
    },
    {
      applied: '2021-01-27T16:00:00',
      file: [{
        path: 'thumbnail.png'
      }],
      title: '바쁠수록 마음챙김, 차분하게 명상',
      subtitle: '커리큘럼 1회차 제목',
      number: 1,
      student:30,
      students:[
        {name:'김슬기',company:'일심전자 본사', contact:'010-1111-2222'},
        {name:'이슬기',company:'일심전자 본사', contact:'010-3333-2222'},
        {name:'배슬기',company:'일심전자 본사', contact:'010-5555-2222'},
      ],
    },
    {
      applied: '2021-01-27T16:00:00',
      file: [{
        path: 'thumbnail.png'
      }],
      title: '바쁠수록 마음챙김, 차분하게 명상',
      subtitle: '커리큘럼 1회차 제목',
      number: 1,
      student:30,
      students:[
        {name:'김슬기',company:'일심전자 본사', contact:'010-1111-2222'},
        {name:'이슬기',company:'일심전자 본사', contact:'010-3333-2222'},
        {name:'배슬기',company:'일심전자 본사', contact:'010-5555-2222'},
      ],
    },
    
    
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

  }
}
