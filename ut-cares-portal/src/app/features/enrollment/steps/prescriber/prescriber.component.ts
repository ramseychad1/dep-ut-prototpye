import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { EnrollmentStateService } from '../../../../core/services/enrollment-state.service';

@Component({
  selector: 'app-prescriber',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatDividerModule
  ],
  templateUrl: './prescriber.component.html',
  styleUrls: ['./prescriber.component.scss']
})
export class PrescriberComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private stateService = inject(EnrollmentStateService);

  form!: FormGroup;

  readonly specialties = [
    'Cardiology', 'Pulmonology', 'Internal Medicine', 'Rheumatology',
    'Hematology/Oncology', 'Nephrology', 'Other'
  ];

  readonly states = [
    'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
    'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
    'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
    'VA','WA','WV','WI','WY'
  ];

  ngOnInit() {
    const p = this.stateService.state().prescriber;
    this.form = this.fb.group({
      npi: [p.npi || '', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      firstName: [p.firstName || '', Validators.required],
      lastName: [p.lastName || '', Validators.required],
      specialty: [p.specialty || '', Validators.required],
      practiceName: [p.practiceName || '', Validators.required],
      phone: [p.phone || '', Validators.required],
      fax: [p.fax || ''],
      email: [p.email || '', [Validators.required, Validators.email]],
      addressLine1: [p.addressLine1 || '', Validators.required],
      addressLine2: [p.addressLine2 || ''],
      city: [p.city || '', Validators.required],
      state: [p.state || '', Validators.required],
      zip: [p.zip || '', [Validators.required, Validators.pattern(/^\d{5}(-\d{4})?$/)]]
    });
  }

  onNext() {
    if (this.form.valid) {
      this.stateService.setPrescriber(this.form.value);
      this.stateService.completeStep('prescriber');
      this.router.navigate(['/enrollment/patient']);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
