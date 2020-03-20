import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UsersRoutingModule } from './users.router';
import { MaterialModule } from '../common-modules/material.module';
import { HttpClientModule } from '@angular/common/http';
import { UsersEntryComponent } from './users-entry.component'
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UsersComponent } from './users/users.component';
import { EditComponent } from './edit/edit.component';
import { UserDialogComponent } from './user-dialog/user-dialog.component';

@NgModule({
  declarations: [
    UsersEntryComponent,
    UsersComponent,
    UserDetailComponent,
    EditComponent,
    UserDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    UsersRoutingModule,
  ]
})
export class UsersModule { }
