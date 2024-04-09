import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-create-income',
  templateUrl: './create-income.component.html',
  styleUrls: ['./create-income.component.scss'],
})
export class CreateIncomeComponent implements OnInit {
  loggedUser: any;
  movement: CreateMovement = new CreateMovement();
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

  Dummy: any;

  constructor(
    private sharedDataService: SharedDataService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private movementService: MovementService,
    private productService: ProductService,
    private rawMaterialService: RawMaterialService,
    private productMovementDetailService: ProductMovementDetailService,
    private rawMaterialMovementDetailService: RawMaterialMovementDetailService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.Dummy = this.sharedDataService.getSharedObject();
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
    this.movement.createdBy = this.loggedUser.id;
    this.movement.movementType = true;
    this.movementService.createMovement(this.movement).subscribe(
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
                let calc: number = this.quantity / 100;
                let checked: number = Math.floor(calc);
                switch (this.selectedRawMaterialId) {
                  case 9:
                    this.Dummy.telaSeda = this.Dummy.telaSeda + checked;
                    this.sharedDataService.setSharedObject(this.Dummy);
                    break;
                  case 10:
                    this.Dummy.telaLino = this.Dummy.telaLino + checked;
                    this.sharedDataService.setSharedObject(this.Dummy);
                    break;
                  case 11:
                    this.Dummy.telaEncaje = this.Dummy.telaEncaje + checked;
                    this.sharedDataService.setSharedObject(this.Dummy);
                    break;
                  case 13:
                    this.Dummy.telaAlgodon = this.Dummy.telaAlgodon + checked;
                    this.sharedDataService.setSharedObject(this.Dummy);
                    break;
                }
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
    switch (this.isProduct) {
      case true:
        this.movement.registerType = false;
        break;
      case false:
        this.movement.registerType = true;
        break;
    }
    this.cdr.detectChanges();
  }

  goBack() {
    this.router.navigate(['income']);
  }
}
