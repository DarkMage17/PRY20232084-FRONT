import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';
import { RegisterUser } from 'src/app/models/CreateUser';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {

  model: RegisterUser = {
    email: '',
    password: '',
    name: '',
    phone: '',
    userType: true,
    enterprise: '',
    registerDate: new Date()
  };

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    this.authService.register(this.model).subscribe(
      response => {
        this.router.navigate(['login']);
      }
    );
  }

  goToLogin() {
    this.router.navigate(['login']);
  }
}
