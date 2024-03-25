import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Movement } from 'src/app/models/Movement';
import { MovementService } from 'src/app/services/movement.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalComponent, ModalConfig } from 'src/app/_metronic/partials';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.scss']
})
export class MovementsComponent implements OnInit{
  movements: Movement[] = [];
  selectedMovement: Movement | null = null;

  modalConfig: ModalConfig = {
    modalTitle: '¿Está seguro de que quiere eliminar el movimiento?',
    dismissButtonLabel: 'Sí, eliminar',
    closeButtonLabel: 'Cancel',
    onDismiss: () => this.deleteMovement(),
  };
  @ViewChild('modal') private modalComponent: ModalComponent;

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

  async openModal(movement: Movement) {
    this.selectedMovement = movement;
    return await this.modalComponent.open();
  }

  async deleteMovement(): Promise<boolean> {
    if (!this.selectedMovement) return false;
    try {
      await this.movementService.deleteMovement(this.selectedMovement.id).toPromise();
      // Recargar los movimientos después de la eliminación.
      await this.loadMovements();
      return true;
    } catch (error) {
      console.error("Error deleting product:", error);
      return false;
    } finally {
      this.selectedMovement = null;
      // Forzar la detección de cambios después de eliminar el movimiento.
      this.cdr.detectChanges();
    }
  }

  goCreate(){
    this.router.navigate(['movements/create'])
  }
}