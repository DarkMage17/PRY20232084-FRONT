import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateProduct } from 'src/app/models/CreateProduct';
import { Size } from 'src/app/models/Size';
import { Style } from 'src/app/models/Style';
import { ProductSizeService } from 'src/app/services/product-size.service';
import { ProductStyleService } from 'src/app/services/product-style.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit{
  productStyles: Style[] = [];
  productSizes: Size[] = [];
  createProduct: CreateProduct = new CreateProduct();

  constructor(private route: ActivatedRoute,
    private router: Router, private productStyleService: ProductStyleService, private productSizeService: ProductSizeService, private productService: ProductService ,private cdr: ChangeDetectorRef) { }
    
  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.productStyleService.getProductStyles().subscribe(
      productStylesResponse => {
        this.productStyles = productStylesResponse;
        this.cdr.detectChanges();
      }
      );
    this.productSizeService.getProductSizes().subscribe(
      productSizesResponse => {
        this.productSizes = productSizesResponse;
        this.cdr.detectChanges();
      }
      );
  }

  insertProduct(): void {
    this.createProduct.createdBy = 'd398c3e8-44e0-43fe-923c-cea0be963670';
    console.log(this.createProduct);
    this.productService.insertProduct(this.createProduct).subscribe(
      response => {
        this.router.navigate(['products']);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['products']);
  }
}
