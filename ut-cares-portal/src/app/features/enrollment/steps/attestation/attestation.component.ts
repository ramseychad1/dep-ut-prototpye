import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { PatientBannerComponent } from '../../../../shared/components/patient-banner/patient-banner.component';
import { EnrollmentStateService } from '../../../../core/services/enrollment-state.service';

@Component({
  selector: 'app-attestation',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCheckboxModule, MatIconModule, PatientBannerComponent],
  templateUrl: './attestation.component.html',
  styleUrls: ['./attestation.component.scss']
})
export class AttestationComponent {
  private router = inject(Router);
  private stateService = inject(EnrollmentStateService);

  attestation1 = signal(false);
  attestation2 = signal(false);
  attestation3 = signal(false);
  submitted = signal(false);
  recaptchaChecked = signal(false);

  get prescriber() { return this.stateService.state().prescriber; }

  readonly refNumber = 'DEP-' + (Date.now() % 1000000);

  get today(): string {
    return new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  get allAttested(): boolean {
    return this.attestation1() && this.attestation2() && this.attestation3() && this.recaptchaChecked();
  }

  onBack() { this.router.navigate(['/enrollment/review']); }

  mockRecaptcha() {
    this.recaptchaChecked.set(true);
  }

  onSubmit() {
    if (this.allAttested) {
      this.stateService.completeStep('attestation');
      this.submitted.set(true);
    }
  }

  startNew() {
    this.router.navigate(['/enrollment/prescriber']);
  }
}
