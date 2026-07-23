import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroComponent } from '../../components/hero/hero.component';
import { EventDetailsComponent } from '../../components/event-details/event-details.component';
import { GalleryComponent } from '../../components/gallery/gallery.component';
import { RsvpFormComponent } from '../../components/rsvp-form/rsvp-form.component';
import { SiteFooterComponent } from '../../components/site-footer/site-footer.component';
import { SplashScreenComponent } from '../../components/splash-screen/splash-screen.component';
import { GuestService } from '../../services/guest.service';
import { SplashService } from '../../services/splash.service';
import { OgMetaService } from '../../services/og-meta.service';
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
    SplashScreenComponent,
  ],
  templateUrl: './invite.component.html',
})
export class InviteComponent implements OnInit {
  readonly guest = signal<ParsedGuest | null>(null);
  readonly eventFilter = signal<EventFilter>('both');
  readonly splashDone;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly guestService: GuestService,
    private readonly splashService: SplashService,
    private readonly ogMeta: OgMetaService,
  ) {
    this.splashDone = this.splashService.done;
  }

  ngOnInit(): void {
    this.readRoute();
    this.route.paramMap.subscribe(() => this.readRoute());
    this.route.queryParamMap.subscribe(() => this.readRoute());
    // New hash-based guest: /invite?events=ceremony#Guest-Name
    // WhatsApp ignores the hash so the thumbnail always shows for the clean URL.
    this.route.fragment.subscribe(fragment => this.readFragment(fragment));
  }

  scrollToRsvp(event: Event): void {
    event.preventDefault();
    document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  private readRoute(): void {
    // Only set guest from route/query params if no hash guest is present
    const fragment = this.route.snapshot.fragment;
    if (fragment?.trim()) return; // fragment takes priority; readFragment() handles it

    const guest = this.guestService.parseFromRoute(this.route.snapshot);
    this.guest.set(guest);

    const raw = this.route.snapshot.queryParamMap.get('events')?.toLowerCase();
    if (raw === 'ceremony' || raw === 'reception') {
      this.eventFilter.set(raw);
    } else {
      this.eventFilter.set('both');
    }

    this.updateOgMeta(guest);
  }

  private readFragment(fragment: string | null): void {
    // Read events param (still a query param — only 3 variants, WhatsApp caches them fine)
    const raw = this.route.snapshot.queryParamMap.get('events')?.toLowerCase();
    if (raw === 'ceremony' || raw === 'reception') {
      this.eventFilter.set(raw);
    } else {
      this.eventFilter.set('both');
    }

    if (!fragment?.trim()) {
      // No hash — fall back to route/query params
      const guest = this.guestService.parseFromRoute(this.route.snapshot);
      this.guest.set(guest);
      this.updateOgMeta(guest);
      return;
    }

    const guest = this.guestService.parseGuestSlug(decodeURIComponent(fragment));
    this.guest.set(guest);
    this.updateOgMeta(guest);
  }

  private updateOgMeta(guest: import('../../models/rsvp.model').ParsedGuest | null): void {
    if (guest?.displayName) {
      this.ogMeta.set({
        title: `${guest.displayName} — You're invited to Anusree & Akhil's Wedding! 💍`,
        description: `Dear ${guest.displayName}, you are warmly invited to celebrate with us on Sunday, August 23, 2026.`,
      });
    } else {
      this.ogMeta.reset();
    }
  }
}
