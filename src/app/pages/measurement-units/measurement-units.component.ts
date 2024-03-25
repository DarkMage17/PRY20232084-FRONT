import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalComponent, ModalConfig } from 'src/app/_metronic/partials';
import { MeasurementUnit } from 'src/app/models/MeasurementUnit';
import { MeasurementUnitService } from 'src/app/services/measurement-unit.service';

@Component({
  selector: 'app-measurement-units',
  templateUrl: './measurement-units.component.html',
  styleUrls: ['./measurement-units.component.scss'],
})
export class MeasurementUnitsComponent implements OnInit {
  measurementUnits: MeasurementUnit[] = [];
  selectedMeasurementUnit: MeasurementUnit | null = null;

  modalConfig: ModalConfig = {
    modalTitle: '¿Está seguro de que quiere eliminar la unidad de medida?',
    dismissButtonLabel: 'Sí, eliminar',
    closeButtonLabel: 'Cancelar',
    onDismiss: () => this.deleteMeasurementUnit(),
  };
  @ViewChild('modal') private modalComponent: ModalComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private measurementUnitService: MeasurementUnitService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadMeasurementUnits();
  }

  loadMeasurementUnits(): void {
    this.measurementUnitService
      .getMeasurementUnits()
      .subscribe((measurementUnitResponse) => {
        this.measurementUnits = measurementUnitResponse;
        this.cdr.detectChanges();
      });
  }

  async openModal(measurementUnit: MeasurementUnit) {
    this.selectedMeasurementUnit = measurementUnit;
    return await this.modalComponent.open();
  }

  async deleteMeasurementUnit(): Promise<boolean> {
    if (!this.selectedMeasurementUnit) return false;
    try {
      await this.measurementUnitService
        .deleteMeasurementUnit(this.selectedMeasurementUnit.id)
        .toPromise();
      // Recargar las unidades de medida después de la eliminación.
      await this.loadMeasurementUnits();
      return true;
    } catch (error) {
      console.error('Error deleting measurement unit:', error);
      return false;
    } finally {
      this.selectedMeasurementUnit = null;
      // Forzar la detección de cambios después de eliminar la unidad de medida.
      this.cdr.detectChanges();
    }
  }

  goEdit(id: number) {
    this.router.navigate([`measurement-units/edit/${id}`]);
  }

  goCreate() {
    this.router.navigate(['measurement-units/create']);
  }
}
