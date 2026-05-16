import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { ProgressNavComponent } from '../../../shared/components/progress-nav/progress-nav.component';
import { EnrollmentStateService } from '../../../core/services/enrollment-state.service';

@Component({
  selector: 'app-enrollment-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent, ProgressNavComponent],
  templateUrl: './enrollment-layout.component.html',
  styleUrls: ['./enrollment-layout.component.scss']
})
export class EnrollmentLayoutComponent {
  private router = inject(Router);
  activeStep = 'prescriber';
  activeSubStep = '';

  constructor() {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e: any) => {
      const url: string = e.urlAfterRedirects;
      if (url.includes('prescriber')) { this.activeStep = 'prescriber'; this.activeSubStep = ''; }
      else if (url.includes('patient')) { this.activeStep = 'patient'; this.activeSubStep = ''; }
      else if (url.includes('product-details')) { this.activeStep = 'product'; this.activeSubStep = 'product-details'; }
      else if (url.includes('prescription-details')) { this.activeStep = 'prescription'; this.activeSubStep = 'prescription-details'; }
      else if (url.includes('review')) { this.activeStep = 'review'; this.activeSubStep = ''; }
      else if (url.includes('attestation')) { this.activeStep = 'attestation'; this.activeSubStep = ''; }
    });
  }
}
