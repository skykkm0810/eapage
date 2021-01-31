import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TAGS } from './interface/interface';


import {MainComponent} from './page/main/main.component';
import {JoinComponent} from './page/join/join.component';
import {MypageComponent} from './page/mypage/mypage.component';
import {DetailComponent} from './page/detail/detail.component';

const routes: Routes = [
  { path: TAGS.MAIN, component: MainComponent },
  { path: TAGS.JOIN, component: JoinComponent },
  { path: TAGS.DETAIL, component: DetailComponent },
  { path: TAGS.MYPAGE, component: MypageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
