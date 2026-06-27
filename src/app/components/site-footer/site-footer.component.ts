import { Component } from '@angular/core';
import { WEDDING_DATA } from '../../config/wedding-data';

@Component({
  selector: 'app-site-footer',
  standalone: true,
  templateUrl: './site-footer.component.html',
})
export class SiteFooterComponent {
  readonly wedding = WEDDING_DATA;
  readonly year = new Date().getFullYear();
}
