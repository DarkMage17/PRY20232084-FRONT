import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateProductStyle } from 'src/app/models/CreateProductStyle';
import { AuthService } from 'src/app/services/auth.service';
import { ProductStyleService } from 'src/app/services/product-style.service';

@Component({
  selector: 'app-edit-product-style',
  templateUrl: './edit-product-style.component.html',
  styleUrls: ['./edit-product-style.component.scss']
})
export class EditProductStyleComponent implements OnInit{
  editProductStyle: CreateProductStyle = new CreateProductStyle();
  productStyleId: number | null = null;
  loggedUser: any;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private productStyleService: ProductStyleService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe(x => this.loggedUser = x);
    this.productStyleId = this.route.snapshot.paramMap.get('id') as number | null;
    if (this.productStyleId) {
      this.loadProductStyleDetails(this.productStyleId);
    }
  }

  loadProductStyleDetails(productStyleId: number): void {
    this.productStyleService.getProductStyleById(productStyleId).subscribe(
      productStyle => {
        this.editProductStyle = productStyle;
        console.log(this.editProductStyle);
        this.cdr.detectChanges();
      }
    );
  }

  updateProductStyle(): void {
    this.editProductStyle.createdBy = this.loggedUser.id;
    this.productStyleService.updateProductStyle(this.productStyleId!, this.editProductStyle).subscribe(
      response => {
        this.router.navigate(['product-styles']);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['product-styles']);
  }
}
