import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateMovement } from 'src/app/models/CreateMovement';
import { Movement } from 'src/app/models/Movement';
import { Product } from 'src/app/models/Product';
import { RawMaterial } from 'src/app/models/RawMaterial';
import { MovementService } from 'src/app/services/movement.service';
import { ProductService } from 'src/app/services/product.service';
import { RawMaterialService } from 'src/app/services/raw-material.service';

@Component({
  selector: 'app-create-movements',
  templateUrl: './create-movements.component.html',
  styleUrls: ['./create-movements.component.scss']
})
export class CreateMovementsComponent implements OnInit{
  movement: CreateMovement =  new CreateMovement();
  isProduct: boolean = false;
  products: Product[] = [];
  rawMaterials: RawMaterial[] = [];
  selectedProductId: number = 0;
  selectedRawMaterialId: number = 0;
  quantity: number = 0;
  
  constructor(private route: ActivatedRoute,
    private router: Router,private movementService: MovementService, private productService: ProductService, private rawMaterialService: RawMaterialService, private cdr: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.isProduct = false;
    this.cdr.detectChanges();
    this.loadData();
  }

  insertMovement(){
    this.movement.createdBy = 'd398c3e8-44e0-43fe-923c-cea0be963670';
    this.movementService.createMovement(this.movement)
    .subscribe(datos=>{
      console.log(datos), (error: any)=>console.log(error)

      this.router.navigate(['movements']);
    });
  }

  loadData(): void {
    this.productService.getProducts().subscribe(
      productsResponse => {
        this.products = productsResponse;
        this.cdr.detectChanges();
      }
      );
    this.rawMaterialService.getRawMaterials().subscribe(
      rawMaterialsResponse => {
        this.rawMaterials = rawMaterialsResponse;
        this.cdr.detectChanges();
      }
      );
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


  goBack(){
    this.router.navigate(['movements']);
  }
}
