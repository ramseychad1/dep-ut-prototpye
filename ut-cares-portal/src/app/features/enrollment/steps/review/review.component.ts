import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { PatientBannerComponent } from '../../../../shared/components/patient-banner/patient-banner.component';
import { EnrollmentStateService } from '../../../../core/services/enrollment-state.service';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule, MatDividerModule, PatientBannerComponent],
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent {
  private router = inject(Router);
  stateService = inject(EnrollmentStateService);

  get state() { return this.stateService.state(); }
  get prescriber() { return this.state.prescriber; }
  get patient() { return this.state.patient; }
  get product() { return this.state.selectedProduct; }
  get orenitram() { return this.state.orenitram; }
  get remodulin() { return this.state.remodulin; }
  get tyvaso() { return this.state.tyvaso; }

  get productLabel(): string {
    switch (this.product) {
      case 'orenitram': return 'Orenitram® (treprostinil)';
      case 'remodulin': return 'Remodulin® (treprostinil)';
      case 'tyvaso': return 'TYVASO® (treprostinil) & TYVASO DPI® (treprostinil)';
      default: return '—';
    }
  }

  get orenitramPrescriptionType(): string {
    switch (this.orenitram.prescriptionType) {
      case 'therapy-initiation': return 'Therapy initiation and prescription beyond month 3';
      case 'alternate-dosing': return 'Alternate dosing instructions';
      default: return '—';
    }
  }

  get tyvasoIndication(): string {
    switch (this.tyvaso.indication) {
      case 'ph-ild': return 'PH-ILD (Pulmonary Hypertension Associated with Interstitial Lung Disease)';
      case 'pah': return 'PAH (Pulmonary Arterial Hypertension)';
      default: return '—';
    }
  }

  get tyvasoProduct(): string {
    switch (this.tyvaso.product) {
      case 'inhalation-solution': return 'TYVASO (treprostinil) Inhalation Solution';
      case 'inhalation-powder': return 'TYVASO DPI (treprostinil) Inhalation Powder';
      default: return '—';
    }
  }

  editPrescriber() { this.router.navigate(['/enrollment/prescriber']); }
  editPatient() { this.router.navigate(['/enrollment/patient']); }
  editProduct() { this.router.navigate(['/enrollment/product-details']); }
  editPrescription() { this.router.navigate(['/enrollment/prescription-details']); }

  onBack() { this.router.navigate(['/enrollment/prescription-details']); }

  onNext() {
    this.stateService.completeStep('review');
    this.router.navigate(['/enrollment/attestation']);
  }
}
