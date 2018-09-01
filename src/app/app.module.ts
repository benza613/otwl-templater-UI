import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SigninComponent } from './auth/signin/signin.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth-guard.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomeComponent } from './home/home.component';
import { CoreModule } from './core/core.module';

import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [
    SigninComponent,
    AppComponent,
    ErrorPageComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    CoreModule,
    CommonModule,
    AgGridModule.withComponents([])
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
