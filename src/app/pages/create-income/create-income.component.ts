import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateMovement } from 'src/app/models/CreateMovement';
import { createProductMovementDetail } from 'src/app/models/CreateProductMovementDetail';
import { createRawMaterialMovementDetail } from 'src/app/models/CreateRawMaterialMovementDetail';
import { Product } from 'src/app/models/Product';
import { RawMaterial } from 'src/app/models/RawMaterial';
import { AuthService } from 'src/app/services/auth.service';
import { MovementService } from 'src/app/services/movement.service';
import { ProductMovementDetailService } from 'src/app/services/product-movement-detail.service';
import { ProductService } from 'src/app/services/product.service';
import { RawMaterialMovementDetailService } from 'src/app/services/raw-material-movement-detail.service';
import { RawMaterialService } from 'src/app/services/raw-material.service';

@Component({
  selector: 'app-create-income',
  templateUrl: './create-income.component.html',
  styleUrls: ['./create-income.component.scss'],
})
export class CreateIncomeComponent implements OnInit {
  loggedUser: any;
  movementForm: FormGroup;
  isProduct: boolean = false;
  products: Product[] = [];
  rawMaterials: RawMaterial[] = [];
  selectedProductId: number = 0;
  selectedRawMaterialId: number = 0;
  quantity: number = 0;
  productMovement: createProductMovementDetail =
    new createProductMovementDetail();
  rawMaterialMovement: createRawMaterialMovementDetail =
    new createRawMaterialMovementDetail();

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private movementService: MovementService,
    private productService: ProductService,
    private rawMaterialService: RawMaterialService,
    private productMovementDetailService: ProductMovementDetailService,
    private rawMaterialMovementDetailService: RawMaterialMovementDetailService,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder
  ) {
    this.movementForm = this.formBuilder.group({
      quantity: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((x) => {
      this.loggedUser = x;
      if (!this.loggedUser || Object.keys(this.loggedUser).length === 0) {
        this.router.navigate(['login']);
      } else {
        this.isProduct = false;
        this.cdr.detectChanges();
        this.loadData();
      }
    });
  }

  insertMovement() {
    const movementData = this.movementForm.value;
    movementData.createdBy = this.loggedUser.id;
    this.movementService.createMovement(movementData).subscribe(
      (datos: any) => {
        console.log(datos);
        if (this.isProduct) {
          this.productMovement.productID = this.selectedProductId;
          this.productMovement.quantity = this.quantity;
          this.productMovement.movementID = datos.id;
          console.log(this.productMovement);
          this.productMovementDetailService
            .createProductMovementDetail(this.productMovement)
            .subscribe(
              () => {
                this.router.navigate(['income']);
              },
              (error: any) => {
                console.error(error);
              }
            );
        } else {
          this.rawMaterialMovement.rawMaterial_ID = this.selectedRawMaterialId;
          this.rawMaterialMovement.quantity = this.quantity;
          this.rawMaterialMovement.movement_ID = datos.id;
          this.rawMaterialMovementDetailService
            .createRawMaterialMovementDetail(this.rawMaterialMovement)
            .subscribe(
              () => {
                this.router.navigate(['income']);
              },
              (error: any) => {
                console.error(error);
              }
            );
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  loadData(): void {
    this.productService.getProducts().subscribe((productsResponse) => {
      this.products = productsResponse;
      console.log("aaaaaaaaaaa")
      console.log(productsResponse)
      this.cdr.detectChanges();
    });
    this.rawMaterialService
      .getRawMaterials()
      .subscribe((rawMaterialsResponse) => {
        this.rawMaterials = rawMaterialsResponse;
        this.cdr.detectChanges();
      });
  }

  onRadioChange(value: boolean) {
    this.isProduct = value;
    this.cdr.detectChanges();
  }

  goBack() {
    this.router.navigate(['income']);
  }
}
