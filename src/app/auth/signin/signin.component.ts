import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    let element: HTMLElement = document.getElementById('btnSign') as HTMLElement;
    element.click();
  }

  onLogin(form: NgForm) {
    console.log('login button');
    this.authService.login(form.value).then((res) => {
      this.router.navigate(['/home']);
    });
  }
}
