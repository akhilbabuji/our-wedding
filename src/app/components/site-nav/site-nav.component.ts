import { Component } from '@angular/core';
import { WEDDING_DATA } from '../../config/wedding-data';
import { SplashService } from '../../services/splash.service';

@Component({
  selector: 'app-site-nav',
  standalone: true,
  templateUrl: './site-nav.component.html',
})
export class SiteNavComponent {
  readonly wedding = WEDDING_DATA;

  readonly links = [
    { label: 'Events',  href: '#events'  },
    { label: 'Gallery', href: '#gallery' },
    { label: 'RSVP',    href: '#rsvp'    },
  ];

  isMenuOpen = false;

  constructor(private readonly splash: SplashService) {}

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  navigate(event: Event, sectionId: string): void {
    event.preventDefault();
    this.isMenuOpen = false;

    this.splash.show(() => {
      const el = document.getElementById(sectionId);
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
}
