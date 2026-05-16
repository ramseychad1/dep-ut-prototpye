import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { PatientBannerComponent } from '../../../../shared/components/patient-banner/patient-banner.component';
import { EnrollmentStateService } from '../../../../core/services/enrollment-state.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatButtonModule, PatientBannerComponent],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private stateService = inject(EnrollmentStateService);

  form!: FormGroup;

  readonly productOptions = [
    { value: 'orenitram', label: 'Orenitram® (treprostinil)' },
    { value: 'remodulin', label: 'Remodulin® (treprostinil)' },
    { value: 'tyvaso', label: 'TYVASO® (treprostinil) & TYVASO DPI® (treprostinil)' }
  ];

  ngOnInit() {
    this.form = this.fb.group({
      product: [this.stateService.state().selectedProduct || '', Validators.required]
    });
  }

  onBack() { this.router.navigate(['/enrollment/patient']); }

  onNext() {
    if (this.form.valid) {
      this.stateService.setProduct(this.form.value.product);
      this.stateService.completeStep('product-details');
      this.router.navigate(['/enrollment/prescription-details']);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
