import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateProductSize } from 'src/app/models/CreateProductSize';
import { AuthService } from 'src/app/services/auth.service';
import { ProductSizeService } from 'src/app/services/product-size.service';

@Component({
  selector: 'app-edit-product-size',
  templateUrl: './edit-product-size.component.html',
  styleUrls: ['./edit-product-size.component.scss']
})
export class EditProductSizeComponent implements OnInit{
  editProductSize: CreateProductSize = new CreateProductSize();
  productSizeId: number | null = null;
  loggedUser: any;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private productSizeService: ProductSizeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe(x => this.loggedUser = x);
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
    this.editProductSize.createdBy = this.loggedUser.id;
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
