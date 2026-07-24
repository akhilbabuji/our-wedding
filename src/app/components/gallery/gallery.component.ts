import { Component, OnDestroy, OnInit, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WEDDING_DATA } from '../../config/wedding-data';
import { RevealDirective } from '../../directives/reveal.directive';
import { LightboxComponent } from '../lightbox/lightbox.component';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, RevealDirective, LightboxComponent],
  templateUrl: './gallery.component.html',
})
export class GalleryComponent implements OnInit, OnDestroy {
  @ViewChild(LightboxComponent) lightbox!: LightboxComponent;

  readonly wedding = WEDDING_DATA;
  readonly images = WEDDING_DATA.gallery.images;

  readonly current = signal(0);
  readonly transitioning = signal(false);
  readonly downloading = signal(false);

  private autoTimer: ReturnType<typeof setInterval> | null = null;

  ngOnInit(): void {
    this.startAuto();
  }

  ngOnDestroy(): void {
    this.stopAuto();
  }

  private startAuto(): void {
    this.stopAuto();
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

  openLightbox(): void {
    this.stopAuto();
    this.lightbox.open(this.current());
  }

  onLightboxClosed(): void {
    this.startAuto();
  }

  downloadCurrent(): void {
    const image = this.images[this.current()];
    if (!image) return;
    const src = image.hdSrc ?? image.src;
    this.downloadFile(src, this.fileName(src, this.current() + 1));
  }

  async downloadAll(): Promise<void> {
    if (this.downloading()) return;
    this.downloading.set(true);
    this.stopAuto();
    try {
      for (let i = 0; i < this.images.length; i++) {
        const image = this.images[i];
        const src = image.hdSrc ?? image.src;
        this.downloadFile(src, this.fileName(src, i + 1));
        await new Promise((r) => setTimeout(r, 600));
      }
    } finally {
      this.downloading.set(false);
      this.startAuto();
    }
  }

  private fileName(src: string, index: number): string {
    const base = src.split('/').pop() ?? `photo-${index}.jpg`;
    return `anusree-akhil-original-${base}`;
  }

  private resolveUrl(src: string): string {
    if (/^https?:\/\//i.test(src) || src.startsWith('/')) return src;
    return `/${src}`;
  }

  private downloadFile(src: string, filename: string): void {
    const url = this.resolveUrl(src);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
}
