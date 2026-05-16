import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { EnrollmentStateService } from '../../../core/services/enrollment-state.service';

@Component({
  selector: 'app-patient-banner',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './patient-banner.component.html',
  styleUrls: ['./patient-banner.component.scss']
})
export class PatientBannerComponent {
  stateService = inject(EnrollmentStateService);
  get patient() { return this.stateService.state().patient; }
  get productName() { return this.stateService.getProductDisplayName(); }
}
