import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WEDDING_DATA } from '../../config/wedding-data';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './event-details.component.html',
})
export class EventDetailsComponent {
  readonly wedding = WEDDING_DATA;

  openMaps(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
