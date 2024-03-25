import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateMeasurementUnit } from 'src/app/models/CreateMeasurementUnit';
import { MeasurementUnitService } from 'src/app/services/measurement-unit.service';

@Component({
  selector: 'app-edit-measurement-units',
  templateUrl: './edit-measurement-units.component.html',
  styleUrls: ['./edit-measurement-units.component.scss']
})
export class EditMeasurementUnitsComponent implements OnInit{
  editMeasurementUnit: CreateMeasurementUnit = new CreateMeasurementUnit(); // Consider renaming CreateProduct to Product for better clarity
  measurementUnitId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private measurementService: MeasurementUnitService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.measurementUnitId = this.route.snapshot.paramMap.get('id') as number | null;
    if (this.measurementUnitId) {
      this.loadMeasurementUnitDetails(this.measurementUnitId);
    }
  }

  loadMeasurementUnitDetails(measurementUnitId: number): void {
    this.measurementService.getMeasurementUnitById(measurementUnitId).subscribe(
      measurementUnit => {
        this.editMeasurementUnit = measurementUnit;
        console.log(this.editMeasurementUnit);
        this.cdr.detectChanges();
      }
    );
  }

  updateMeasurementUnit(): void {
    this.measurementService.updateMeasurementUnit(this.measurementUnitId!, this.editMeasurementUnit).subscribe(
      response => {
        this.router.navigate(['measurement-units']);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['measurement-units']);
  }
}
