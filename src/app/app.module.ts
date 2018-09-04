import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SigninComponent } from './auth/signin/signin.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth-guard.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomeComponent } from './home/home.component';
import { ElemProfileComponent } from './elem-profile/elem-profile.component';

import { CoreModule } from './core/core.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalContentComponent } from './util/modal-component';

import { AgGridModule } from 'ag-grid-angular';
import { ChildEditElementComponent } from './util/child-edit-element.component';

@NgModule({
  declarations: [
    SigninComponent,
    AppComponent,
    ErrorPageComponent,
    HomeComponent,
    ChildEditElementComponent,
    ElemProfileComponent,
    NgbdModalContentComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    CommonModule,
    AgGridModule.withComponents([ChildEditElementComponent])
  ],
  entryComponents: [
    NgbdModalContentComponent,
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
