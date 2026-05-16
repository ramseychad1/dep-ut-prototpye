import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollmentStateService } from '../../../../core/services/enrollment-state.service';
import { OrenitramPrescriptionComponent } from './orenitram/orenitram-prescription.component';
import { RemodulinPrescriptionComponent } from './remodulin/remodulin-prescription.component';
import { TyvasoPrescriptionComponent } from './tyvaso/tyvaso-prescription.component';

@Component({
  selector: 'app-prescription-details',
  standalone: true,
  imports: [CommonModule, OrenitramPrescriptionComponent, RemodulinPrescriptionComponent, TyvasoPrescriptionComponent],
  template: `
    <app-orenitram-prescription *ngIf="product === 'orenitram'"></app-orenitram-prescription>
    <app-remodulin-prescription *ngIf="product === 'remodulin'"></app-remodulin-prescription>
    <app-tyvaso-prescription *ngIf="product === 'tyvaso'"></app-tyvaso-prescription>
    <div *ngIf="!product" class="no-product">
      <p>Please go back and select a product first.</p>
    </div>
  `,
  styles: [`.no-product { padding: 40px; color: #616161; font-size: 14px; }`]
})
export class PrescriptionDetailsComponent {
  private stateService = inject(EnrollmentStateService);
  get product() { return this.stateService.state().selectedProduct; }
}
