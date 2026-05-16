import { Routes } from '@angular/router';
import { WelcomeComponent } from './features/welcome/welcome.component';
import { GetStartedComponent } from './features/get-started/get-started.component';

export const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'get-started', component: GetStartedComponent },
  {
    path: 'enrollment',
    loadChildren: () => import('./features/enrollment/enrollment.routes').then(m => m.ENROLLMENT_ROUTES)
  }
];
