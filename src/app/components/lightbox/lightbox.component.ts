import { Component, HostListener, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryImage } from '../../models/wedding.model';

@Component({
  selector: 'app-lightbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lightbox.component.html',
})
export class LightboxComponent {
  @Input() images: GalleryImage[] = [];

  readonly isOpen = signal(false);
  readonly currentIndex = signal(0);

  get currentImage(): GalleryImage | null {
    return this.images[this.currentIndex()] ?? null;
  }

  open(index: number): void {
    this.currentIndex.set(index);
    this.isOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  close(): void {
    this.isOpen.set(false);
    document.body.style.overflow = '';
  }

  next(): void {
    this.currentIndex.update((i) => (i + 1) % this.images.length);
  }

  prev(): void {
    this.currentIndex.update(
      (i) => (i - 1 + this.images.length) % this.images.length
    );
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (!this.isOpen()) return;

    switch (event.key) {
      case 'Escape':
        this.close();
        break;
      case 'ArrowRight':
        this.next();
        break;
      case 'ArrowLeft':
        this.prev();
        break;
    }
  }
}
