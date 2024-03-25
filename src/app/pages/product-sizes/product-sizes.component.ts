import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalComponent, ModalConfig } from 'src/app/_metronic/partials';
import { Size } from 'src/app/models/Size';
import { ProductSizeService } from 'src/app/services/product-size.service';

@Component({
  selector: 'app-product-sizes',
  templateUrl: './product-sizes.component.html',
  styleUrls: ['./product-sizes.component.scss'],
})
export class ProductSizesComponent implements OnInit {
  productSizes: Size[] = [];
  selectedSize: Size | null = null;

  modalConfig: ModalConfig = {
    modalTitle: '¿Está seguro de que quiere eliminar la talla?',
    dismissButtonLabel: 'Sí, eliminar',
    closeButtonLabel: 'Cancelar',
    onDismiss: () => this.deleteSize(),
  };
  @ViewChild('modal') private modalComponent: ModalComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productSizeService: ProductSizeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadSizes();
  }

  async openModal(size: Size) {
    this.selectedSize = size;
    return await this.modalComponent.open();
  }

  loadSizes(): void {
    this.productSizeService.getProductSizes().subscribe((sizeResponse) => {
      this.productSizes = sizeResponse;
      this.cdr.detectChanges();
    });
  }

  async deleteSize(): Promise<boolean> {
    if (!this.selectedSize) return false;
    try {
      await this.productSizeService
        .deleteProductSize(this.selectedSize.id)
        .toPromise();
      // Recargar las unidades de medida después de la eliminación.
      await this.loadSizes();
      return true;
    } catch (error) {
      console.error('Error deleting size:', error);
      return false;
    } finally {
      this.selectedSize = null;
      // Forzar la detección de cambios después de eliminar la unidad de medida.
      this.cdr.detectChanges();
    }
  }

  goEdit(id: number) {
    this.router.navigate([`product-sizes/edit/${id}`]);
  }

  goCreate() {
    this.router.navigate(['product-sizes/create']);
  }
}
