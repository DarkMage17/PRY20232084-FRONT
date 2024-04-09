import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loggedUser: any;
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe(x => {
      this.loggedUser = x;
      if (!this.loggedUser || Object.keys(this.loggedUser).length === 0) {
        this.initializeForm();
      } else {
        this.router.navigate(['dashboard']);
      }
    });
  }

  initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
      ],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.authService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe((response) => {
        this.router.navigate(['dashboard']);
        this.sendSuccess();
      });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.sendRequired();
    }
    this.login();
  }

  sendRequired() {
    Swal.fire('Error', 'Complete el correo y contraseña', 'error');
  }

  sendSuccess(): void {
    Swal.fire('Ingresaste', 'Ingreso correctamente', 'success');
  }

  goToRegister() {
    this.router.navigate(['register']);
  }
}
