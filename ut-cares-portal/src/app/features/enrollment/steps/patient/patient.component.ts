import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { EnrollmentStateService } from '../../../../core/services/enrollment-state.service';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule,
    MatDatepickerModule, MatNativeDateModule
  ],
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private stateService = inject(EnrollmentStateService);

  form!: FormGroup;

  readonly sexOptions = ['Male', 'Female', 'Unknown'];
  readonly states = [
    'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
    'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
    'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
    'VA','WA','WV','WI','WY'
  ];

  ngOnInit() {
    const p = this.stateService.state().patient;
    this.form = this.fb.group({
      firstName: [p.firstName || '', Validators.required],
      lastName: [p.lastName || '', Validators.required],
      dateOfBirth: [p.dateOfBirth || '', Validators.required],
      sex: [p.sex || '', Validators.required],
      addressLine1: [p.addressLine1 || '', Validators.required],
      city: [p.city || '', Validators.required],
      state: [p.state || '', Validators.required],
      zip: [p.zip || '', [Validators.required, Validators.pattern(/^\d{5}(-\d{4})?$/)]],
      phone: [p.phone || '', Validators.required]
    });
  }

  onBack() { this.router.navigate(['/enrollment/prescriber']); }

  onNext() {
    if (this.form.valid) {
      this.stateService.setPatient(this.form.value);
      this.stateService.completeStep('patient');
      this.router.navigate(['/enrollment/product-details']);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
