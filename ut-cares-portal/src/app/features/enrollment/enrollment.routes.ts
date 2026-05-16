import { Routes } from '@angular/router';
import { EnrollmentLayoutComponent } from './layout/enrollment-layout.component';

export const ENROLLMENT_ROUTES: Routes = [
  {
    path: '',
    component: EnrollmentLayoutComponent,
    children: [
      { path: '', redirectTo: 'prescriber', pathMatch: 'full' },
      {
        path: 'prescriber',
        loadComponent: () => import('./steps/prescriber/prescriber.component').then(m => m.PrescriberComponent)
      },
      {
        path: 'patient',
        loadComponent: () => import('./steps/patient/patient.component').then(m => m.PatientComponent)
      },
      {
        path: 'product-details',
        loadComponent: () => import('./steps/product-details/product-details.component').then(m => m.ProductDetailsComponent)
      },
      {
        path: 'prescription-details',
        loadComponent: () => import('./steps/prescription-details/prescription-details.component').then(m => m.PrescriptionDetailsComponent)
      },
      {
        path: 'review',
        loadComponent: () => import('./steps/review/review.component').then(m => m.ReviewComponent)
      },
      {
        path: 'attestation',
        loadComponent: () => import('./steps/attestation/attestation.component').then(m => m.AttestationComponent)
      }
    ]
  }
];
