import { Component, ViewChild } from '@angular/core';
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
export class GalleryComponent {
  readonly wedding = WEDDING_DATA;

  @ViewChild(LightboxComponent) lightbox!: LightboxComponent;

  openLightbox(index: number): void {
    this.lightbox.open(index);
  }
}
