import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SplashService {
  readonly visible = signal(true);
  readonly hiding = signal(false);
  readonly done = signal(false);

  private timer: ReturnType<typeof setTimeout> | null = null;

  /** Show splash and wait for user to dismiss via dismiss(). */
  show(): void {
    this.hiding.set(false);
    this.done.set(false);
    this.visible.set(true);
  }

  /** Called when the visitor clicks the enter button. */
  dismiss(): void {
    if (this.hiding()) return;
    this.hiding.set(true);
    this.timer = setTimeout(() => {
      this.visible.set(false);
      this.done.set(true);
    }, 650);
  }
}
