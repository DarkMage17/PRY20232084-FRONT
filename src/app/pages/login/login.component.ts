import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';
import { Login } from 'src/app/models/Login';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  model: Login = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.model.email, this.model.password).subscribe(
      response => {
        console.log(response);
        this.router.navigate(['dashboard']);
      }
    );
  }

  goToRegister() {
    this.router.navigate(['register']);
  }
}
