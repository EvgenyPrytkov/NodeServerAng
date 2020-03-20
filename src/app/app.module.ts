import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app.router';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { ErrorComponent } from './error/error.component';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from './common-modules/material.module';

// import { UsersModule } from './users/users.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ErrorComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
