import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalComponent, ModalConfig } from 'src/app/_metronic/partials';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements  OnInit{
  products: Product[] = [];
  selectedProduct: Product | null = null;

  modalConfig: ModalConfig = {
    modalTitle: '¿Está seguro de que quiere eliminar el producto?',
    dismissButtonLabel: 'Sí, eliminar',
    closeButtonLabel: 'Cancel',
    onDismiss: () => this.deleteProduct(),
  };
  @ViewChild('modal') private modalComponent: ModalComponent;

  constructor(private route: ActivatedRoute,
    private router: Router,private productService: ProductService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      productsResponse => {
        this.products = productsResponse;
        this.cdr.detectChanges();
      }
      );
  }

  async openModal(product: Product) {
    this.selectedProduct = product;
    return await this.modalComponent.open();
  }

  async deleteProduct(): Promise<boolean> {
    if (!this.selectedProduct) return false;
    try {
      await this.productService.deleteProduct(this.selectedProduct.id).toPromise();
      // Recargar los productos después de la eliminación.
      await this.loadProducts();
      return true;
    } catch (error) {
      console.error("Error deleting product:", error);
      return false;
    } finally {
      this.selectedProduct = null;
      // Forzar la detección de cambios después de eliminar el producto.
      this.cdr.detectChanges();
    }
  }

  goEdit(id: number){
    this.router.navigate([`products/edit/${id}`]);
  }

  goCreate(){
    this.router.navigate(['products/create'])
  }
}
