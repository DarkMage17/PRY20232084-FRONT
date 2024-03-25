import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { createRawMaterial } from 'src/app/models/CreateRawMaterial';
import { MeasurementUnit } from 'src/app/models/MeasurementUnit';
import { MeasurementUnitService } from 'src/app/services/measurement-unit.service';
import { RawMaterialService } from 'src/app/services/raw-material.service';

@Component({
  selector: 'app-edit-raw-material',
  templateUrl: './edit-raw-material.component.html',
  styleUrls: ['./edit-raw-material.component.scss']
})
export class EditRawMaterialComponent implements OnInit{
  measurementUnits: MeasurementUnit[] = [];
  editRawMaterial: createRawMaterial = new createRawMaterial(); // Consider renaming CreateProduct to Product for better clarity
  rawMaterialId: number | null = null;
  
  constructor(private route: ActivatedRoute,
    private router: Router, private rawMaterialService: RawMaterialService, private measurementService: MeasurementUnitService, private cdr: ChangeDetectorRef) { }
    
  ngOnInit(): void {
    this.rawMaterialId = this.route.snapshot.paramMap.get('id') as number | null;
    this.loadData();
    if (this.rawMaterialId) {
      this.loadRawMaterialDetails(this.rawMaterialId);
    }
  }

  loadData(): void {
    this.measurementService.getMeasurementUnits().subscribe(
      rawMaterialsResponse => {
        this.measurementUnits = rawMaterialsResponse;
        this.cdr.detectChanges();
      }
      );
  }

  loadRawMaterialDetails(rawMaterialId: number): void {
    this.rawMaterialService.getRawMaterialById(rawMaterialId).subscribe(
      rawMaterial => {
        this.editRawMaterial = rawMaterial;
        console.log(this.rawMaterialId);
        this.cdr.detectChanges();
      }
    );
  }

  updateRawMaterial(): void {
    console.log(this.editRawMaterial);
    this.rawMaterialService.updateRawMaterial(this.rawMaterialId!, this.editRawMaterial).subscribe(
      response => {
        this.router.navigate(['raw-materials']);
      }
    );
  }

  goBack(){
    this.router.navigate(['raw-materials']);
  }
}
