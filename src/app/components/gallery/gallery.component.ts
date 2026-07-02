import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WEDDING_DATA } from '../../config/wedding-data';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './gallery.component.html',
})
export class GalleryComponent implements OnInit, OnDestroy {
  readonly wedding = WEDDING_DATA;
  readonly images = WEDDING_DATA.gallery.images;

  readonly current = signal(0);
  readonly transitioning = signal(false);

  private autoTimer: ReturnType<typeof setInterval> | null = null;

  ngOnInit(): void {
    this.startAuto();
  }

  ngOnDestroy(): void {
    this.stopAuto();
  }

  private startAuto(): void {
    this.autoTimer = setInterval(() => this.goTo(this.next()), 4000);
  }

  private stopAuto(): void {
    if (this.autoTimer) {
      clearInterval(this.autoTimer);
      this.autoTimer = null;
    }
  }

  private next(): number {
    return (this.current() + 1) % this.images.length;
  }

  private prev(): number {
    return (this.current() - 1 + this.images.length) % this.images.length;
  }

  goTo(index: number): void {
    if (this.transitioning() || index === this.current()) return;
    this.transitioning.set(true);
    setTimeout(() => {
      this.current.set(index);
      this.transitioning.set(false);
    }, 400);
  }

  onPrev(): void {
    this.stopAuto();
    this.goTo(this.prev());
    this.startAuto();
  }

  onNext(): void {
    this.stopAuto();
    this.goTo(this.next());
    this.startAuto();
  }

  onDot(index: number): void {
    this.stopAuto();
    this.goTo(index);
    this.startAuto();
  }
}
