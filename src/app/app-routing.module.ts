import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoreComponent } from './core/pages/core.component';

import { AuthGuard } from './core/authentication/auth.guard';

const routes: Routes = [
  { path: 'login', component: CoreComponent },
  { path: 'forums', loadChildren: () => import('./modules/forums/forums.module').then((m) => m.ForumsModule), canActivate: [AuthGuard] },
  { path: '', redirectTo:'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
