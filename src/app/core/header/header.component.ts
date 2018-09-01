import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  result: boolean;

  constructor(private router: Router, private authService: AuthService) {
  }

  onSaveData() {

  }

  onFetchData() {

  }

  onLogout() {
    this.authService.logout().then((res) => {
      this.router.navigate(['/']);
    });
  }

  isAuthenticated() {
    this.result = this.authService.isAuthValid();
    console.log(this.result);

    return this.result;
    // return true;
  }
}
