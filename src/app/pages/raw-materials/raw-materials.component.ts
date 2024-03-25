import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalComponent, ModalConfig } from 'src/app/_metronic/partials';
import { RawMaterial } from 'src/app/models/RawMaterial';
import { RawMaterialService } from 'src/app/services/raw-material.service';

@Component({
  selector: 'app-raw-materials',
  templateUrl: './raw-materials.component.html',
  styleUrls: ['./raw-materials.component.scss'],
})
export class RawMaterialsComponent implements OnInit {
  rawMaterials: RawMaterial[] = [];
  selectedRawMaterial: RawMaterial | null = null;
  isLoading: boolean = false;

  modalConfig: ModalConfig = {
    modalTitle: '¿Está seguro de que quiere eliminar la materia prima?',
    dismissButtonLabel: 'Sí, eliminar',
    closeButtonLabel: 'Cancelar',
    onDismiss: () => this.deleteRawMaterial(),
  };
  @ViewChild('modal') private modalComponent: ModalComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rawMaterialService: RawMaterialService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadRawMaterials();
  }

  loadRawMaterials(): void {
    this.isLoading = true;
    this.rawMaterialService.getRawMaterials().subscribe({
      next: (rawMaterialsResponse) => {
        this.rawMaterials = rawMaterialsResponse;
        this.isLoading = false; // Finaliza la carga
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading movements', error);
      },
      complete: () => {
        this.isLoading = false; // Finaliza la carga
      }
    });
  }

  async openModal(rawMaterial: RawMaterial) {
    this.selectedRawMaterial = rawMaterial;
    return await this.modalComponent.open();
  }

  async deleteRawMaterial(): Promise<boolean> {
    if (!this.selectedRawMaterial) return false;
    try {
      await this.rawMaterialService
        .deleteRawMaterial(this.selectedRawMaterial.id)
        .toPromise();
      await this.loadRawMaterials();
      return true;
    } catch (error) {
      console.error('Error deleting raw material:', error);
      return false;
    } finally {
      this.selectedRawMaterial = null;
      this.cdr.detectChanges();
    }
  }

  goEdit(id: number) {
    this.router.navigate([`raw-materials/edit/${id}`]);
  }

  goCreate() {
    this.router.navigate(['raw-materials/create']);
  }
}
