import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, HeaderComponent, FooterComponent],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  private router = inject(Router);

  recaptchaChecked = signal(false);
  showError = signal(false);

  mockRecaptcha() {
    this.recaptchaChecked.set(true);
    this.showError.set(false);
  }

  startAsProvider() {
    if (!this.recaptchaChecked()) {
      this.showError.set(true);
      return;
    }
    this.router.navigate(['/get-started']);
  }
}
