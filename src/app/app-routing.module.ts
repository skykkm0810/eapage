import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TAGS } from './interface/interface';

import {MainComponent} from './page/main/main.component';
import {JoinComponent} from './page/join/join.component';
import {EnrollClassComponent} from './page/enroll-class/enroll-class.component';
import {EnrollListComponent} from './page/enroll-list/enroll-list.component';
import {MypageComponent} from './page/mypage/mypage.component';
import {MypageTeacherComponent} from './page/mypage-teacher/mypage-teacher.component';
import {DetailComponent} from './page/detail/detail.component';
const routes: Routes = [
  { path: TAGS.MAIN, component: MainComponent },
  { path: TAGS.JOIN, component: JoinComponent },
  { path: TAGS.ENROLLCLASS, component: EnrollClassComponent },
  { path: TAGS.ENROLLLIST, component: EnrollListComponent },
  { path: TAGS.DETAIL, component: DetailComponent },
  { path: TAGS.MYPAGE, component: MypageComponent },
  { path: TAGS.MYPAGETEACHER, component: MypageTeacherComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
