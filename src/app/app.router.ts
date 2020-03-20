import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  { path: 'users', loadChildren: () => import('./users/users.module').then(module => module.UsersModule) },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: 'about', pathMatch: 'full' },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
