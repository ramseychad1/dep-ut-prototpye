import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { PatientBannerComponent } from '../../../../../shared/components/patient-banner/patient-banner.component';
import { EnrollmentStateService } from '../../../../../core/services/enrollment-state.service';

@Component({
  selector: 'app-remodulin-prescription',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, PatientBannerComponent,
    MatFormFieldModule, MatInputModule, MatSelectModule,
    MatButtonModule, MatCheckboxModule, MatRadioModule
  ],
  templateUrl: './remodulin-prescription.component.html',
  styleUrls: ['./remodulin-prescription.component.scss']
})
export class RemodulinPrescriptionComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private stateService = inject(EnrollmentStateService);

  form!: FormGroup;

  readonly doseUnits = ['ng/kg/min', 'mcg/kg/min', 'ng/min'];

  ngOnInit() {
    const d = this.stateService.state().remodulin;
    this.form = this.fb.group({
      refills: [d.refills || ''],
      dosingWeight: [d.dosingWeight || ''],
      dosingWeightUnit: [d.dosingWeightUnit || 'kg'],
      infusionType: [d.infusionType || null],
      diluent: [d.diluent || 'sodium-chloride'],
      pumpAmbulatory: [d.pumpAmbulatory || false],
      pumpRemunity: [d.pumpRemunity || false],
      vial04: [d.vial04 || false],
      vial1: [d.vial1 || false],
      vial25: [d.vial25 || false],
      vial5: [d.vial5 || false],
      vial10: [d.vial10 || false],
      initiationDosageAmount: [d.initiationDosageAmount || ''],
      initiationDosageUnit: [d.initiationDosageUnit || 'ng/kg/min'],
      titrateAmount: [d.titrateAmount || ''],
      titrateUnit: [d.titrateUnit || 'ng/kg/min'],
      titrateEveryDays: [d.titrateEveryDays || ''],
      goalDoseAmount: [d.goalDoseAmount || ''],
      goalDoseUnit: [d.goalDoseUnit || 'ng/kg/min'],
      instructions: [d.instructions || ''],
      nursingVisitType: [d.nursingVisitType || null],
      ivDressingChangeDays: [d.ivDressingChangeDays || ''],
      ivPerStandard: [d.ivPerStandard || false],
      subqInstructions: [d.subqInstructions || ''],
      location: [d.location || null]
    });
  }

  get nursingType() { return this.form.get('nursingVisitType')?.value; }
  get isIV() { return this.nursingType === 'iv'; }
  get isSubQ() { return this.nursingType === 'subq'; }

  onBack() { this.router.navigate(['/enrollment/product-details']); }

  onNext() {
    this.stateService.setRemodulin(this.form.value);
    this.stateService.completeStep('prescription-details');
    this.router.navigate(['/enrollment/review']);
  }
}
