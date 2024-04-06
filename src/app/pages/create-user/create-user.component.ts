import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterUser } from 'src/app/models/CreateUser';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  form: FormGroup;
  registerUser: RegisterUser = {
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
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      password: ['', Validators.required],
      email: [
        '',
        [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
      ],
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{9}')]],
      enterprise: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    });
  }

  sendRequired(): void {
    Swal.fire('Error', 'Complete los campos requeridos', 'error');
  }

  sendSuccess(): void{
    Swal.fire('Registro exitoso', 'Se registró exitosamente', 'success');
  }

  register(): void {
    this.authService.register(this.registerUser).subscribe((response) => {
      this.router.navigate(['login']);
      this.sendSuccess();
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.sendRequired();
    } else {
      this.registerUser = this.form.value
      console.log(this.registerUser)
      this.register();
    }
  }

  goToLogin(): void {
    this.router.navigate(['login']);
  }
}
