import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  selector: 'app-orenitram-prescription',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, PatientBannerComponent,
    MatFormFieldModule, MatInputModule, MatSelectModule,
    MatButtonModule, MatCheckboxModule, MatRadioModule
  ],
  templateUrl: './orenitram-prescription.component.html',
  styleUrls: ['./orenitram-prescription.component.scss']
})
export class OrenitramPrescriptionComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private stateService = inject(EnrollmentStateService);

  form!: FormGroup;

  readonly prescriptionOptions = [
    { value: 'therapy-initiation', label: 'Therapy initiation and prescription beyond month 3' },
    { value: 'alternate-dosing', label: 'Alternate dosing instructions' }
  ];

  ngOnInit() {
    const d = this.stateService.state().orenitram;
    this.form = this.fb.group({
      prescriptionType: [d.prescriptionType || '', Validators.required],
      // Therapy initiation
      titrationKit: [d.titrationKit || false],
      prescriptionBeyondMonth3: [d.prescriptionBeyondMonth3 || false],
      titrateByAmount: [d.titrateByAmount || ''],
      titrateEveryDays: [d.titrateEveryDays || ''],
      untilGoalDose: [d.untilGoalDose || ''],
      // Alternate dosing
      initiateAtAmount: [d.initiateAtAmount || ''],
      initiateFrequency: [d.initiateFrequency || 'TID'],
      alternatetitrateAmount: [d.alternatetitrateAmount || ''],
      alternateEveryDays: [d.alternateEveryDays || ''],
      alternateGoalDose: [d.alternateGoalDose || ''],
      // Strengths
      strength0125: [d.strength0125 || false],
      strength025: [d.strength025 || false],
      strength1: [d.strength1 || false],
      strength25: [d.strength25 || false],
      strength5: [d.strength5 || false],
      // Instructions
      instructions: [d.instructions || ''],
      // Dispense
      dispenseType: [d.dispenseType || '12months'],
      refillsCount: [d.refillsCount || ''],
      // Nurse education
      nurseEduType: [d.nurseEduType || ''],
      nurseInstructions: [d.nurseInstructions || '']
    });
  }

  get prescriptionType() { return this.form.get('prescriptionType')?.value; }
  get isTherapy() { return this.prescriptionType === 'therapy-initiation'; }
  get isAlternate() { return this.prescriptionType === 'alternate-dosing'; }
  get showTitrationKitDetails() { return this.form.get('titrationKit')?.value; }
  get showBeyondMonth3Fields() { return this.form.get('prescriptionBeyondMonth3')?.value; }
  get showSpecifyRefills() { return this.form.get('dispenseType')?.value === 'specify'; }
  get showNurseInstructions() { return this.form.get('nurseEduType')?.value === 'prescriber-directed'; }

  onBack() { this.router.navigate(['/enrollment/product-details']); }

  onNext() {
    this.stateService.setOrenitram(this.form.value);
    this.stateService.completeStep('prescription-details');
    this.router.navigate(['/enrollment/review']);
  }
}
