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


  
  eduFace: any = { level: '', coll: '', dep: '', grad: null, status: '' };
  certFace: any = { agency: '', name: '', level: '', code: '', date: null };
  careerFace: any = { start: null, end: null, name: '', form: '', count: null };
  edus: any[] = [this.eduFace]
  certs: any[] = [this.certFace]
  careers: any[] = [this.careerFace]

  

  causes = [
    { name: 'Work_1', value: 'Work-관계(갈등)', completed: false },
    { name: 'Work_2', value: 'Work-역할모호성', completed: false },
    { name: 'Work_3', value: 'Work-업무과다', completed: false },
    { name: 'Work_4', value: 'Work-직무적응/적성', completed: false },
    { name: 'Work_5', value: 'Work-업무성과', completed: false },
    { name: 'Work_6', value: 'Work-진급/평가', completed: false },
    { name: 'Work_7', value: 'Work-경력개발', completed: false },
    { name: 'Work_8', value: 'Work-조직개편(부서이동 포함)', completed: false },
    { name: 'Work_9', value: 'Work-징계연류', completed: false },
    { name: 'Work_10', value: 'Work-감정노동', completed: false },
    { name: 'Work_11', value: 'Work-직장 내 폭력(괴롭힘)', completed: false },
    { name: 'Work_12', value: 'Work-직장 내 성희롱', completed: false },
    { name: 'Life_1', value: 'Life-관계(갈등)', completed: false },
    { name: 'Life_2', value: 'Life-부부/가족', completed: false },
    { name: 'Life_3', value: 'Life-자녀양육', completed: false },
    { name: 'Life_4', value: 'Life-경제적문제', completed: false },
    { name: 'Life_5', value: 'Life-부부/가족', completed: false },
    { name: 'Life_6', value: 'Life-건강', completed: false },
    { name: 'Life_7', value: 'Life-진로', completed: false },
    { name: 'Life_8', value: 'Life-상실', completed: false },
    { name: 'Life_9', value: 'Life-성생활', completed: false },
    { name: 'Life_10', value: 'Life-성소수자', completed: false },
    { name: 'Life_11', value: 'Life-재무', completed: false },
    { name: 'Life_12', value: 'Life-법률', completed: false },
    { name: 'Life_13', value: 'Life-세무', completed: false },
    { name: 'Life_14', value: 'Life-노무', completed: false },
    { name: 'Healing_1', value: 'Healing-요가', completed: false },
    { name: 'Healing_2', value: 'Healing-원예', completed: false },
    { name: 'Healing_3', value: 'Healing-독서', completed: false },
    { name: 'Healing_4', value: 'Healing-아로마', completed: false },
    { name: 'Healing_5', value: 'Healing-마사지', completed: false },
    { name: 'Healing_6', value: 'Healing-캘리그라피', completed: false },
    { name: 'Healing_7', value: 'Healing-사진', completed: false },
    { name: 'Healing_8', value: 'Healing-아트', completed: false },
    { name: 'Healing_9', value: 'Healing-음악', completed: false },
    { name: 'Healing_10', value: 'Healing-명상', completed: false },
    { name: 'Healing_11', value: 'Healing-영화', completed: false },
    { name: 'Healing_12', value: 'Healing-힐링캠프', completed: false },
  ];

  result = [
    { name: 'Emotional_1', value: '정서적증상-분노/화', completed: false },
    { name: 'Emotional_2', value: '정서적증상-우울', completed: false },
    { name: 'Emotional_3', value: '정서적증상-불안', completed: false },
    { name: 'Emotional_4', value: '정서적증상-PTSD', completed: false },
    { name: 'Behavior_1', value: '행동적증상-자살위험', completed: false },
    { name: 'Behavior_2', value: '행동적증상-자해', completed: false },
    { name: 'Behavior_3', value: '행동적증상-근태', completed: false },
    { name: 'Behavior_4', value: '행동적증상-신체화', completed: false },
    { name: 'Behavior_5', value: '행동적증상-폭력/폭언', completed: false },
    { name: 'Behavior_6', value: '행동적증상-자해', completed: false },
    { name: 'Behavior_7', value: '행동적증상-섭식', completed: false },
    { name: 'Behavior_8', value: '행동적증상-수면', completed: false },
    { name: 'Behavior_9', value: '행동적증상-강박', completed: false },
    { name: 'Behavior_10', value: '행동적증상-음주', completed: false },
    { name: 'Behavior_11', value: '행동적증상-중독', completed: false },
    { name: 'Cognitive_1', value: '인지적증상-기억력 저하', completed: false },
    { name: 'Cognitive_2', value: '인지적증상-집중력 저하', completed: false },
  ];

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

  bankList = [
    {id:1, name:"신한은행", },
    {id:2, name:"하나은행", },
    {id:3, name:"국민은행", },
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
  educhk(m:Event){
    var thischk = m.target as HTMLInputElement;
    var fakeBox = thischk.closest('.chkBox') as HTMLElement;
    var inputText = thischk.closest('div')?.querySelector('input[type="text"]') as HTMLInputElement;
    if(thischk.checked == true){
      fakeBox.classList.add('checked')
      inputText.disabled = false;
    }
    else{
      fakeBox.classList.remove('checked');
      inputText.disabled = true;
    }
  }
  showStudent(e:Event){
    var showStudent = (e.target as HTMLElement);
    var thisTd = showStudent.closest('td') as HTMLElement;
    var listTable = thisTd.getElementsByClassName('studentList')[0] as HTMLElement;
    if(listTable.classList.contains('hidden')){
      showStudent.classList.remove('showStudent')
      showStudent.classList.add('hideStudent')
      listTable.classList.remove('hidden')
    }
    else {
      showStudent.classList.remove('hideStudent')
      showStudent.classList.add('showStudent')
      listTable.classList.add('hidden')
    }
  }

  addEdu(e:Event){
    var hiddenEdu = (e.target as HTMLElement).closest('.educationInfo')?.querySelector('div.hidden');
    hiddenEdu?.classList.remove('hidden')
  }

  // addEdu() {
  //   if( this.edus.length < 3 ) {
  //     this.edus.push({ level: '', coll: '', dep: '', grad: null, status: '' });
  //   }
  // }
  addcer() {
    this.certs.push({ agency: '', name: '', level: '', code: '', date: null });
  }
  addcar() {
    this.careers.push({ start: null, end: null, name: '', form: '', count: null });
  }
  removeEdu(e:Event){
    var hiddenEdu = (e.target as HTMLElement).closest('div')
    hiddenEdu.classList.add('hidden')
    // console.log(hiddenEdu)

  }
  removeCer(value:any){
    const index: number = this.certs.indexOf(value);
    this.certs.splice(index, 1);
  }
  removeCar(value:any){
    const index: number = this.careers.indexOf(value);
    this.careers.splice(index, 1);
  }
  
}
