import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResinTimerPageRoutingModule } from './resin-timer-routing.module';

import { ResinTimerPage } from './resin-timer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResinTimerPageRoutingModule
  ],
  declarations: [ResinTimerPage]
})
export class ResinTimerPageModule {}
