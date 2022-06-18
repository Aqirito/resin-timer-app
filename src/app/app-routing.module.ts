import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'resin-timer',
    pathMatch: 'full'
  },
  {
    path: 'resin-timer',
    loadChildren: () => import('./resin-timer/resin-timer.module').then(m => m.ResinTimerPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
