import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from '../app-routing.module';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent
  ],
  providers: [
    AuthService
  ]
})
export class CoreModule { }
