import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string;
  password: string;
  errorMsg: string;

  constructor(private authService: AuthService) { }

  login() {
    this.authService.login(this.email, this.password)
     .catch(error => this.errorMsg = error.message);
  }
}
