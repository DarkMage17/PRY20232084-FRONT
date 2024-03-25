import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Movement } from 'src/app/models/Movement';
import { MovementService } from 'src/app/services/movement.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.scss']
})
export class MovementsComponent implements OnInit{
  movements: Movement[] = [];

  constructor(private route: ActivatedRoute,
    private router: Router,private movementService: MovementService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadMovements();
  }

  loadMovements(): void {
    this.movementService.getMovements().subscribe(
      movementsResponse => {
        this.movements = movementsResponse;
        this.cdr.detectChanges();
      }
      );
  }

  goCreate(){
    this.router.navigate(['movements/create'])
  }
}