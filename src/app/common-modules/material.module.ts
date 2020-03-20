import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button'
import { MatChipsModule } from '@angular/material/chips'
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatTableModule } from '@angular/material/table'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'

@NgModule({
  imports: [
    MatButtonModule,
    MatChipsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatSlideToggleModule,
    MatTableModule,
  ],
  exports: [
    MatButtonModule,
    MatChipsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatSlideToggleModule,
    MatTableModule,
  ]
})
export class MaterialModule { }
