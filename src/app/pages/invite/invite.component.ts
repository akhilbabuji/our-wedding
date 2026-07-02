import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroComponent } from '../../components/hero/hero.component';
import { EventDetailsComponent } from '../../components/event-details/event-details.component';
import { GalleryComponent } from '../../components/gallery/gallery.component';
import { RsvpFormComponent } from '../../components/rsvp-form/rsvp-form.component';
import { SiteFooterComponent } from '../../components/site-footer/site-footer.component';
import { SiteNavComponent } from '../../components/site-nav/site-nav.component';
import { SplashScreenComponent } from '../../components/splash-screen/splash-screen.component';
import { GuestService } from '../../services/guest.service';
import { ParsedGuest } from '../../models/rsvp.model';

export type EventFilter = 'ceremony' | 'reception' | 'both';

@Component({
  selector: 'app-invite',
  standalone: true,
  imports: [
    HeroComponent,
    EventDetailsComponent,
    GalleryComponent,
    RsvpFormComponent,
    SiteFooterComponent,
    SiteNavComponent,
    SplashScreenComponent,
  ],
  templateUrl: './invite.component.html',
})
export class InviteComponent implements OnInit {
  readonly guest = signal<ParsedGuest | null>(null);
  readonly eventFilter = signal<EventFilter>('both');

  constructor(
    private readonly route: ActivatedRoute,
    private readonly guestService: GuestService
  ) {}

  ngOnInit(): void {
    this.readRoute();
    this.route.paramMap.subscribe(() => this.readRoute());
    this.route.queryParamMap.subscribe(() => this.readRoute());
  }

  scrollToRsvp(event: Event): void {
    event.preventDefault();
    document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  private readRoute(): void {
    this.guest.set(this.guestService.parseFromRoute(this.route.snapshot));

    const raw = this.route.snapshot.queryParamMap.get('events')?.toLowerCase();
    if (raw === 'ceremony' || raw === 'reception') {
      this.eventFilter.set(raw);
    } else {
      this.eventFilter.set('both');
    }
  }
}
