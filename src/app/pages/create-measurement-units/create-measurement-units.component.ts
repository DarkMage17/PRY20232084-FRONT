import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateMeasurementUnit } from 'src/app/models/CreateMeasurementUnit';
import { AuthService } from 'src/app/services/auth.service';
import { MeasurementUnitService } from 'src/app/services/measurement-unit.service';

@Component({
  selector: 'app-create-measurement-units',
  templateUrl: './create-measurement-units.component.html',
  styleUrls: ['./create-measurement-units.component.scss']
})
export class CreateMeasurementUnitsComponent implements OnInit{
  createMeasurementUnit: CreateMeasurementUnit = new CreateMeasurementUnit();
  loggedUser: any;

  constructor(private authService: AuthService, private route: ActivatedRoute,
    private router: Router, private measurementService: MeasurementUnitService, private cdr: ChangeDetectorRef) { }
    
  ngOnInit(): void {
    this.authService.currentUser.subscribe(x => this.loggedUser = x);
  }

  insertMeasurementUnit(){
    this.createMeasurementUnit.createdBy = this.loggedUser.id;
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
