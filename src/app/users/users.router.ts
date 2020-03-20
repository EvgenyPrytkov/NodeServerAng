import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersEntryComponent } from './users-entry.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UsersComponent } from './users/users.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: ':id', component: UserDetailComponent },
  { path: '', component: UsersEntryComponent, children: [
    { path: '', component: UsersComponent, outlet: 'primary' },
    { path: '', component: EditComponent, outlet: 'user-edit' }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
