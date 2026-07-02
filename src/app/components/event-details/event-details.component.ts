import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WEDDING_DATA } from '../../config/wedding-data';
import { WeddingEvent } from '../../models/wedding.model';
import { RevealDirective, RevealFrom } from '../../directives/reveal.directive';
import { EventFilter } from '../../pages/invite/invite.component';

const EVENT_ID_MAP: Record<Exclude<EventFilter, 'both'>, string> = {
  ceremony: 'wedding-ceremony',
  reception: 'reception',
};

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './event-details.component.html',
})
export class EventDetailsComponent implements OnChanges {
  @Input() eventFilter: EventFilter = 'both';

  readonly wedding = WEDDING_DATA;
  visibleEvents: WeddingEvent[] = [];

  /** Alternate: left → bottom → right → left … per card index */
  cardRevealFrom(i: number): RevealFrom {
    const dirs: RevealFrom[] = ['left', 'bottom', 'right'];
    return dirs[i % dirs.length];
  }

  openMaps(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  scrollToRsvp(event: Event): void {
    event.preventDefault();
    document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  ngOnChanges(): void {
    const all = this.wedding.events.schedule;
    if (this.eventFilter === 'both') {
      this.visibleEvents = all;
    } else {
      const targetId = EVENT_ID_MAP[this.eventFilter];
      this.visibleEvents = all.filter((e) => e.id === targetId);
    }
  }
}
