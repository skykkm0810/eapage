import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TAGS } from './interface/interface';


import {MainComponent} from './page/main/main.component';
import {JoinComponent} from './page/join/join.component';
const routes: Routes = [
  { path: TAGS.MAIN, component: MainComponent },
  { path: TAGS.JOIN, component: JoinComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
