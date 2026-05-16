import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { PatientBannerComponent } from '../../../../../shared/components/patient-banner/patient-banner.component';
import { EnrollmentStateService } from '../../../../../core/services/enrollment-state.service';

@Component({
  selector: 'app-tyvaso-prescription',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, PatientBannerComponent,
    MatFormFieldModule, MatInputModule, MatSelectModule,
    MatButtonModule, MatRadioModule
  ],
  templateUrl: './tyvaso-prescription.component.html',
  styleUrls: ['./tyvaso-prescription.component.scss']
})
export class TyvasoPrescriptionComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private stateService = inject(EnrollmentStateService);

  form!: FormGroup;

  readonly indicationOptions = [
    { value: 'ph-ild', label: 'PH-ILD (Pulmonary Hypertension Associated with Interstitial Lung Disease)' },
    { value: 'pah', label: 'PAH (Pulmonary Arterial Hypertension)' }
  ];

  readonly productOptions = [
    { value: 'inhalation-solution', label: 'TYVASO (treprostinil) 1.74mg/2.9ml ampule (0.6mg/ml) Inhalation Solution' },
    { value: 'inhalation-powder', label: 'TYVASO DPI (treprostinil) Inhalation Powder' }
  ];

  readonly dpiTargetDoseOptions = [
    { value: '48', label: '48 mcg' },
    { value: '64', label: '64 mcg' },
    { value: '80', label: '80 mcg' },
    { value: '96', label: '96 mcg' },
    { value: '112', label: '112 mcg' },
    { value: '128', label: '128 mcg' },
    { value: 'other', label: 'Other' }
  ];

  readonly maintenanceAmountOptions = [
    '16 mcg (112 ct)',
    '32 mcg (112 ct)',
    '48 mcg (112 ct)',
    '64 mcg (112 ct)',
    '80 mcg (112 ct)',
    '96 mcg: 32 mcg (112 ct) + 64 mcg (112 ct)',
    '112 mcg: 48 mcg (112 ct) + 64 mcg (112 ct)',
    'Other'
  ];

  ngOnInit() {
    const d = this.stateService.state().tyvaso;
    this.form = this.fb.group({
      indication: [d.indication || ''],
      product: [d.product || ''],
      // Inhalation solution
      targetDoseType: [d.targetDoseType || ''],
      targetDosageMcg: [d.targetDosageMcg || ''],
      starterKit: [d.starterKit || false],
      refillKit: [d.refillKit !== undefined ? d.refillKit : true],
      refillKitAmount: [d.refillKitAmount || ''],
      instructions: [d.instructions || ''],
      // DPI powder
      dpiTargetDose: [d.dpiTargetDose || ''],
      dpiOtherDosageMcg: [d.dpiOtherDosageMcg || ''],
      dpiTitrationKit: [d.dpiTitrationKit || false],
      dpiMaintenanceRefills: [d.dpiMaintenanceRefills || ''],
      dpiMaintenanceAmounts: [d.dpiMaintenanceAmounts || ''],
      // Shared
      nursingVisitType: [d.nursingVisitType || ''],
      nursingInstructions: [d.nursingInstructions || ''],
      location: [d.location || '']
    });
  }

  get indication() { return this.form.get('indication')?.value; }
  get product() { return this.form.get('product')?.value; }
  get isSolution() { return this.product === 'inhalation-solution'; }
  get isPowder() { return this.product === 'inhalation-powder'; }
  get isOtherDose() { return this.form.get('targetDoseType')?.value === 'other'; }
  get isDpiOtherDose() { return this.form.get('dpiTargetDose')?.value === 'other'; }
  get isRefillKitSelected() { return this.form.get('refillKit')?.value === true || this.form.get('refillKit')?.value === 'refill'; }
  get isPrescriber() { return this.form.get('nursingVisitType')?.value === 'prescriber-directed'; }

  onBack() { this.router.navigate(['/enrollment/product-details']); }

  onNext() {
    this.stateService.setTyvaso(this.form.value);
    this.stateService.completeStep('prescription-details');
    this.router.navigate(['/enrollment/review']);
  }
}
