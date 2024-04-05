import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';
import { Login } from 'src/app/models/Login';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  sendRequired() {
    Swal.fire('Error', 'Complete el correo y contraseña', 'error');
  }
  
  form: FormGroup;
  model: Login = {
    email: '',
    password: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      password: ['', Validators.required],
      //email: ['', [Validators.required, Validators.email]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
    });
  }

  get f() {
    return this.form.controls;
  }

  login() {
    this.authService
      .login(this.model.email, this.model.password)
      .subscribe((response) => {
        console.log(response);
        this.router.navigate(['dashboard']);
      });
  }

  onSubmit() {
    // Aquí puedes enviar los datos del formulario o realizar acciones adicionales
    if (this.form.invalid) {
      this.sendRequired();
    }
    this.login();
  }

  goToRegister() {
    this.router.navigate(['register']);
  }
}
