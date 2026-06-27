import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroComponent } from '../../components/hero/hero.component';
import { TimelineComponent } from '../../components/timeline/timeline.component';
import { EventDetailsComponent } from '../../components/event-details/event-details.component';
import { GalleryComponent } from '../../components/gallery/gallery.component';
import { RsvpFormComponent } from '../../components/rsvp-form/rsvp-form.component';
import { SiteFooterComponent } from '../../components/site-footer/site-footer.component';
import { SiteNavComponent } from '../../components/site-nav/site-nav.component';
import { GuestService } from '../../services/guest.service';
import { ParsedGuest } from '../../models/rsvp.model';

@Component({
  selector: 'app-invite',
  standalone: true,
  imports: [
    HeroComponent,
    TimelineComponent,
    EventDetailsComponent,
    GalleryComponent,
    RsvpFormComponent,
    SiteFooterComponent,
    SiteNavComponent,
  ],
  templateUrl: './invite.component.html',
})
export class InviteComponent implements OnInit {
  readonly guest = signal<ParsedGuest | null>(null);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly guestService: GuestService
  ) {}

  ngOnInit(): void {
    const parsed = this.guestService.parseFromRoute(this.route.snapshot);
    this.guest.set(parsed);

    this.route.paramMap.subscribe(() => {
      this.guest.set(this.guestService.parseFromRoute(this.route.snapshot));
    });

    this.route.queryParamMap.subscribe(() => {
      this.guest.set(this.guestService.parseFromRoute(this.route.snapshot));
    });
  }
}
