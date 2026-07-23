import { Component, Input, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WEDDING_DATA } from '../../config/wedding-data';
import { ParsedGuest } from '../../models/rsvp.model';
import { RevealDirective } from '../../directives/reveal.directive';
interface CountdownUnit {
  label: string;
  value: number;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './hero.component.html',
})
export class HeroComponent implements OnInit, OnDestroy {
  @Input() guest: ParsedGuest | null = null;

  readonly wedding = WEDDING_DATA;
  readonly countdown = signal<CountdownUnit[]>([]);

  private intervalId: ReturnType<typeof setInterval> | null = null;

  get welcomeMessage(): string {
    if (this.guest) {
      return `${this.wedding.hero.personalizedWelcomePrefix} ${this.guest.displayName}${this.wedding.hero.personalizedWelcomeSuffix}`;
    }
    return this.wedding.hero.genericWelcome;
  }

  ngOnInit(): void {
    this.updateCountdown();
    this.intervalId = setInterval(() => this.updateCountdown(), 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  scrollToRsvp(): void {
    document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToEvents(): void {
    document.getElementById('events')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  private updateCountdown(): void {
    const target = new Date(this.wedding.weddingDate.iso).getTime();
    const now = Date.now();
    const diff = Math.max(0, target - now);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    this.countdown.set([
      { label: 'Days', value: days },
      { label: 'Hours', value: hours },
      { label: 'Minutes', value: minutes },
      { label: 'Seconds', value: seconds },
    ]);
  }
}
