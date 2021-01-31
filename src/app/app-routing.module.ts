import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TAGS } from './interface/interface';


import {MainComponent} from './page/main/main.component';
import {JoinComponent} from './page/join/join.component';
import {EnrollClassComponent} from './page/enroll-class/enroll-class.component';
const routes: Routes = [
  { path: TAGS.MAIN, component: MainComponent },
  { path: TAGS.JOIN, component: JoinComponent },
  { path: TAGS.ENROLLCLASS, component: EnrollClassComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
