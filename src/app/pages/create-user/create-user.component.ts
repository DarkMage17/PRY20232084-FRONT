import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';
import { RegisterUser } from 'src/app/models/CreateUser';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent {

  sendRequired() {
    Swal.fire('Error', 'Complete los campos requeridos', 'error');
  }

  form: FormGroup;
  model: RegisterUser = {
    email: '',
    password: '',
    name: '',
    phone: '',
    userType: true,
    enterprise: '',
    registerDate: new Date(),
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]], // No permite números
      phone: ['', [Validators.required, Validators.pattern('[0-9]{9}')]], // Solo permite 9 números
      enterprise: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]], // No permite números
    });
  }

  get formValidations() {
    return this.form.controls;
  }

  register() {
    this.authService.register(this.model).subscribe((response) => {
      this.router.navigate(['login']);
    });
  }

  onSubmit() {
    // Aquí puedes enviar los datos del formulario o realizar acciones adicionales
    if (this.form.invalid) {
      this.sendRequired();
    }
    this.register();
  }

  goToLogin() {
    this.router.navigate(['login']);
  }
}
