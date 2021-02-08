import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TAGS } from './interface/interface';

import {LoginComponent} from './layout/login/login.component';
import {MainComponent} from './page/main/main.component';
import {JoinComponent} from './page/join/join.component';
import {EnrollClassComponent} from './page/enroll-class/enroll-class.component';
import {EnrollListComponent} from './page/enroll-list/enroll-list.component';
import {MypageComponent} from './page/mypage/mypage.component';
import {MypageTeacherComponent} from './page/mypage-teacher/mypage-teacher.component';
import {DetailComponent} from './page/detail/detail.component';
import {AllLiveComponent} from './page/all-live/all-live.component';
import {TodayLiveComponent} from './page/today-live/today-live.component';
import {MaumdociComponent} from './page/maumdoci/maumdoci.component';
const routes: Routes = [
  { path: TAGS.LOGIN, component: LoginComponent },
  { path: TAGS.MAIN, component: MainComponent },
  { path: TAGS.JOIN, component: JoinComponent },
  { path: TAGS.ENROLLCLASS, component: EnrollClassComponent },
  { path: TAGS.ENROLLLIST, component: EnrollListComponent },
  { path: TAGS.DETAIL, component: DetailComponent },
  { path: TAGS.MYPAGE, component: MypageComponent },
  { path: TAGS.MYPAGETEACHER, component: MypageTeacherComponent },
  { path: TAGS.ALLLIVE, component: AllLiveComponent },
  { path: TAGS.TODAYLIVE, component: TodayLiveComponent },
  { path: TAGS.MAUM, component: MaumdociComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
