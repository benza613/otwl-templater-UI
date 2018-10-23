import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigninComponent } from './auth/signin/signin.component';
import { HomeComponent } from './home/home.component';
import { ElemProfileComponent } from './elem-profile/elem-profile.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AuthGuard } from './auth-guard.service';

const appRoutes: Routes = [
    { path: 'resET', component: SigninComponent },
    { path: 'resET/home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'resET/elem', component: ElemProfileComponent, canActivate: [AuthGuard] },
    { path: 'resET/not-found', component: ErrorPageComponent, data: { message: 'Page not found!' } },
    { path: 'resET/**', redirectTo: '/not-found' }
];

@NgModule({
    imports: [
        // RouterModule.forRoot(appRoutes, {useHash: true})
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
