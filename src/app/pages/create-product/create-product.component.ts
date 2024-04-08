import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateProduct } from 'src/app/models/CreateProduct';
import { Size } from 'src/app/models/Size';
import { Style } from 'src/app/models/Style';
import { AuthService } from 'src/app/services/auth.service';
import { ProductSizeService } from 'src/app/services/product-size.service';
import { ProductStyleService } from 'src/app/services/product-style.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  productStyles: Style[] = [];
  productSizes: Size[] = [];
  createProductForm: FormGroup;
  loggedUser: any;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private productStyleService: ProductStyleService,
    private productSizeService: ProductSizeService,
    private productService: ProductService,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe((x) => (this.loggedUser = x));
    this.loadData();
    this.createForm();
  }

  loadData(): void {
    this.productStyleService.getProductStyles().subscribe((productStylesResponse) => {
      this.productStyles = productStylesResponse;
      this.cdr.detectChanges();
    });
    this.productSizeService.getProductSizes().subscribe((productSizesResponse) => {
      this.productSizes = productSizesResponse;
      this.cdr.detectChanges();
    });
  }

  createForm(): void {
    this.createProductForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9. ]*')]],
      description: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9., ]*')]],
      stock: ['', [Validators.required]],
      size_ID: ['', [Validators.required]],
      style_ID: ['', [Validators.required]]
    });
  }

  get formControls() {
    return this.createProductForm.controls;
  }

  insertProduct(): void {
    const productData: CreateProduct = {
      ...this.createProductForm.value,
      createdBy: this.loggedUser.id
    };

    this.productService.insertProduct(productData).subscribe((response) => {
      this.router.navigate(['products']);
      this.sendSuccess();
    });
  }

  sendRequired(): void {
    Swal.fire('Error', 'Complete los campos requeridos', 'error');
  }

  sendSuccess(): void{
    Swal.fire('Registro exitoso', 'Se registró exitosamente', 'success');
  }

  onSubmit(): void {
    if (this.createProductForm.invalid) {
      this.sendRequired();
    } else {
      this.insertProduct();
    }
  }

  goBack(): void {
    this.router.navigate(['products']);
  }
}
