import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateProductSize } from 'src/app/models/CreateProductSize';
import { ProductSizeService } from 'src/app/services/product-size.service';

@Component({
  selector: 'app-edit-product-size',
  templateUrl: './edit-product-size.component.html',
  styleUrls: ['./edit-product-size.component.scss']
})
export class EditProductSizeComponent implements OnInit{
  editProductSize: CreateProductSize = new CreateProductSize();
  productSizeId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productSizeService: ProductSizeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.productSizeId = this.route.snapshot.paramMap.get('id') as number | null;
    if (this.productSizeId) {
      this.loadProductSizeDetails(this.productSizeId);
    }
  }

  loadProductSizeDetails(productSizeId: number): void {
    this.productSizeService.getProductSizeById(productSizeId).subscribe(
      productSize => {
        this.editProductSize = productSize;
        console.log(this.editProductSize);
        this.cdr.detectChanges();
      }
    );
  }

  updateProductSize(): void {
    this.editProductSize.createdBy = 'd398c3e8-44e0-43fe-923c-cea0be963670';
    this.productSizeService.updateProductSize(this.productSizeId!, this.editProductSize).subscribe(
      response => {
        this.router.navigate(['product-sizes']);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['product-sizes']);
  }
}
