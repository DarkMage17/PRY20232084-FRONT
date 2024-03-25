import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalComponent, ModalConfig } from 'src/app/_metronic/partials';
import { ProductStyleService } from 'src/app/services/product-style.service';
import { Style } from 'src/app/models/Style';

@Component({
  selector: 'app-product-styles',
  templateUrl: './product-styles.component.html',
  styleUrls: ['./product-styles.component.scss']
})
export class ProductStylesComponent implements OnInit{
  productStyles: Style[] = [];
  selectedStyle: Style | null = null;

  modalConfig: ModalConfig = {
    modalTitle: '¿Está seguro de que quiere eliminar el estilo?',
    dismissButtonLabel: 'Sí, eliminar',
    closeButtonLabel: 'Cancel',
    onDismiss: () => this.deleteStyle(),
  };
  @ViewChild('modal') private modalComponent: ModalComponent;

  constructor(private route: ActivatedRoute,
    private router: Router,private productStyleService: ProductStyleService, private cdr: ChangeDetectorRef) { }

    ngOnInit(): void {
      this.loadStyles();
    }

    async openModal(style: Style) {
      this.selectedStyle = style;
      return await this.modalComponent.open();
    }

    loadStyles(): void {
      this.productStyleService.getProductStyles().subscribe(
        styleResponse => {
          this.productStyles = styleResponse;
          this.cdr.detectChanges();
        }
        );
    }

    async deleteStyle(): Promise<boolean> {
      if (!this.selectedStyle) return false;
      try {
        await this.productStyleService.deleteProductStyle(this.selectedStyle.id).toPromise();
        // Recargar las unidades de medida después de la eliminación.
        await this.loadStyles();
        return true;
      } catch (error) {
        console.error("Error deleting style:", error);
        return false;
      } finally {
        this.selectedStyle = null;
        // Forzar la detección de cambios después de eliminar la unidad de medida.
        this.cdr.detectChanges();
      }
    }

    goEdit(id: number): void {
      this.router.navigate([`/product-styles/edit/${id}`]);
    }

    goCreate(): void {
      this.router.navigate(['/product-styles/create']);
    }
}
