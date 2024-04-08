import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateProductStyle } from 'src/app/models/CreateProductStyle';
import { AuthService } from 'src/app/services/auth.service';
import { ProductStyleService } from 'src/app/services/product-style.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-product-style',
  templateUrl: './create-product-style.component.html',
  styleUrls: ['./create-product-style.component.scss']
})
export class CreateProductStyleComponent implements OnInit {
  form: FormGroup;
  loggedUser: any;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private productStyleService: ProductStyleService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe(x => this.loggedUser = x);
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9. ]*')]],
      description: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9., ]*')]]
    });
  }

  insertProductStyle(): void {
    const productStyle: CreateProductStyle = {
      ...this.form.value,
      createdBy: this.loggedUser.id
    };

    this.productStyleService.createProductStyle(productStyle)
      .subscribe(
        datos => {
          this.router.navigate(['product-styles']);
          this.sendSuccess();
        },
        (error: any) => console.log(error)
      );
  }

  sendRequired(): void {
    Swal.fire('Error', 'Complete los campos requeridos', 'error');
  }

  sendSuccess(): void{
    Swal.fire('Registro exitoso', 'Se registró exitosamente', 'success');
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.sendRequired();
    } else {
      this.insertProductStyle();
    }
  }

  goBack(): void {
    this.router.navigate(['product-styles']);
  }
}
