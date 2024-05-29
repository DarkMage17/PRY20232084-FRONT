import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
      password: ['', [Validators.required, Validators.minLength(8)]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
      ],
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), this.noWhitespaceValidator()]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{9}'), this.phoneValidator]],
      enterprise: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), this.noWhitespaceValidator()]],
    });
  }

  phoneValidator(control: AbstractControl): ValidationErrors | null {
    const phoneNumber = control.value;
    
    // Verificar si el número comienza con 0 o es igual a 000000000
    if (phoneNumber && (phoneNumber.charAt(0) === '0' || phoneNumber === '000000000')) {
      return { invalidPhone: true };
    }
    
    return null;
  }
  
  noWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isWhitespace = (control.value || '').trim().length === 0;
      const isValid = !isWhitespace;
      return isValid ? null : { whitespace: true };
    };
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
