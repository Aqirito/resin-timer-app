import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResinTimerPage } from './resin-timer.page';

const routes: Routes = [
  {
    path: '',
    component: ResinTimerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResinTimerPageRoutingModule {}
