import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { EnrollmentStateService } from '../../../core/services/enrollment-state.service';

export interface NavStep {
  id: string;
  label: string;
  route: string;
  subSteps?: NavStep[];
}

@Component({
  selector: 'app-progress-nav',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './progress-nav.component.html',
  styleUrls: ['./progress-nav.component.scss']
})
export class ProgressNavComponent {
  @Input() activeStep = '';
  @Input() activeSubStep = '';

  private stateService = inject(EnrollmentStateService);
  private router = inject(Router);

  get completedSteps() { return this.stateService.state().completedSteps; }
  get selectedProduct() { return this.stateService.state().selectedProduct; }

  get prescriptionSubStepLabel(): string {
    switch (this.selectedProduct) {
      case 'orenitram': return 'Prescription Details for Orenitram';
      case 'remodulin': return 'Prescription Details for Remodulin';
      case 'tyvaso': return 'Prescription Details for Tyvaso';
      default: return 'Prescription Details';
    }
  }

  isCompleted(step: string): boolean {
    return this.completedSteps.includes(step);
  }

  isActive(step: string): boolean {
    return this.activeStep === step;
  }

  isSubActive(sub: string): boolean {
    return this.activeSubStep === sub;
  }

  navigateTo(route: string, step: string) {
    if (this.isCompleted(step) || this.isActive(step)) {
      this.router.navigate([route]);
    }
  }
}
