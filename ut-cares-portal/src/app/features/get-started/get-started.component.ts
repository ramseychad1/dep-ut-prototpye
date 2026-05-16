import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-get-started',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, HeaderComponent, FooterComponent],
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.scss']
})
export class GetStartedComponent {
  private router = inject(Router);

  beginEnrollment() {
    this.router.navigate(['/enrollment/prescriber']);
  }
}
