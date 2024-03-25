import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateMeasurementUnit } from 'src/app/models/CreateMeasurementUnit';
import { MeasurementUnitService } from 'src/app/services/measurement-unit.service';

@Component({
  selector: 'app-create-measurement-units',
  templateUrl: './create-measurement-units.component.html',
  styleUrls: ['./create-measurement-units.component.scss']
})
export class CreateMeasurementUnitsComponent implements OnInit{
  createMeasurementUnit: CreateMeasurementUnit = new CreateMeasurementUnit();

  constructor(private route: ActivatedRoute,
    private router: Router, private measurementService: MeasurementUnitService, private cdr: ChangeDetectorRef) { }
    
  ngOnInit(): void {
  }

  insertMeasurementUnit(){
    this.createMeasurementUnit.createdBy = 'd398c3e8-44e0-43fe-923c-cea0be963670';
    this.measurementService.createMeasurementUnit(this.createMeasurementUnit)
    .subscribe(datos=>{
      console.log(datos), (error: any)=>console.log(error)
      this.router.navigate(['measurement-units']);
    });
  }

  goBack(){
    this.router.navigate(['measurement-units']);
  }
}
