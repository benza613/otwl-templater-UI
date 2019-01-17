import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SigninComponent } from './auth/signin/signin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth-guard.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomeComponent } from './home/home.component';
import { ElemProfileComponent } from './elem-profile/elem-profile.component';

import { CoreModule } from './core/core.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { ElemAddComponent } from './elem-add/elem-add.component';

import { Angular2PromiseButtonModule } from 'angular2-promise-buttons/dist';

import { AgGridModule } from 'ag-grid-angular';
import { ChildEditElementComponent } from './util/child-edit-element.component';
import { ChildDeleteElementComponent } from './util/child-del-element.component';
import { ChildCopyElementComponent } from './util/child-copy-element.component';
import { ChildRuleDelElementComponent } from './util/child-rule-del-element.component';
import { RenameFormComponent } from './util/rename-form/rename-form.component';


@NgModule({
  declarations: [
    SigninComponent,
    AppComponent,
    ErrorPageComponent,
    HomeComponent,
    ChildEditElementComponent,
    ChildDeleteElementComponent,
    ChildCopyElementComponent,
    ChildRuleDelElementComponent,
    ElemProfileComponent,
    ElemAddComponent,
    RenameFormComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    CommonModule,
    Angular2PromiseButtonModule.forRoot({
      // your custom config goes here
      spinnerTpl: '<span class="btn-spinner"></span>',
      // disable buttons when promise is pending
      disableBtn: true,
      // the class used to indicate a pending promise
      btnLoadingClass: 'is-loading',
      // only disable and show is-loading class for clicked button
      // even when they share the same promise
      handleCurrentBtnOnly: false,
    }),
    NgxSmartModalModule.forRoot(),
    AgGridModule.withComponents([
      ChildEditElementComponent,
      ChildRuleDelElementComponent,
      ChildCopyElementComponent,
      ChildDeleteElementComponent])

  ],
  entryComponents: [
    RenameFormComponent
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
