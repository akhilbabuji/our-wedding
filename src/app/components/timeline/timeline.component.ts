import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WEDDING_DATA } from '../../config/wedding-data';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './timeline.component.html',
})
export class TimelineComponent {
  readonly wedding = WEDDING_DATA;
}
