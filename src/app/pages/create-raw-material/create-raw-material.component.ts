import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { createRawMaterial } from 'src/app/models/CreateRawMaterial';
import { MeasurementUnit } from 'src/app/models/MeasurementUnit';
import { RawMaterial } from 'src/app/models/RawMaterial';
import { AuthService } from 'src/app/services/auth.service';
import { MeasurementUnitService } from 'src/app/services/measurement-unit.service';
import { RawMaterialService } from 'src/app/services/raw-material.service';

@Component({
  selector: 'app-create-raw-material',
  templateUrl: './create-raw-material.component.html',
  styleUrls: ['./create-raw-material.component.scss']
})
export class CreateRawMaterialComponent implements OnInit{
  createRawMaterial: createRawMaterial = new createRawMaterial();
  measurementUnits: MeasurementUnit[] = [];
  loggedUser: any;

  constructor(private authService: AuthService ,private route: ActivatedRoute,
    private router: Router, private rawMaterialService: RawMaterialService, private measurementService: MeasurementUnitService, private cdr: ChangeDetectorRef) { }
    
  ngOnInit(): void {
    this.authService.currentUser.subscribe(x => this.loggedUser = x);
    this.cdr.detectChanges();
    this.loadData();
  }

  insertRawMaterial(){
    this.createRawMaterial.createdBy = this.loggedUser.id;
    console.log(this.createRawMaterial);
    this.rawMaterialService.createRawMaterial(this.createRawMaterial)
    .subscribe(datos=>{
      console.log(datos), (error: any)=>console.log(error)
      this.router.navigate(['raw-materials']);
    });
  }

  loadData(): void {
    this.measurementService.getMeasurementUnits().subscribe(
      rawMaterialsResponse => {
        this.measurementUnits = rawMaterialsResponse;
        this.cdr.detectChanges();
      }
      );
  }

  goBack(){
    this.router.navigate(['raw-materials']);
  }
}
