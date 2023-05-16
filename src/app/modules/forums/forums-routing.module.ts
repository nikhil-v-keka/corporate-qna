import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ForumsComponent } from './pages/forums.component';

const routes: Routes = [
  { path: '', component: ForumsComponent,
    children: [
      { path: 'home', loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),},
      { path: 'categories', loadChildren: () => import('./categories/categories.module').then((m) => m.CategoriesModule),},
      { path: 'users', loadChildren: () => import('./users/users.module').then((m) => m.UsersModule),},
      { path: '', redirectTo: 'home', pathMatch: 'full',},
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForumsRoutingModule {}
