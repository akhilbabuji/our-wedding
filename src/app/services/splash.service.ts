import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SplashService {
  readonly visible = signal(false);
  readonly hiding = signal(false);

  private timer1: ReturnType<typeof setTimeout> | null = null;
  private timer2: ReturnType<typeof setTimeout> | null = null;

  /** Show splash, then after it fades out call onDone (optional). */
  show(onDone?: () => void): void {
    // Clear any in-flight timers
    if (this.timer1) clearTimeout(this.timer1);
    if (this.timer2) clearTimeout(this.timer2);

    this.hiding.set(false);
    this.visible.set(true);

    // Start fade-out after 1 s, remove from DOM after transition (0.7 s)
    this.timer1 = setTimeout(() => {
      this.hiding.set(true);
      this.timer2 = setTimeout(() => {
        this.visible.set(false);
        onDone?.();
      }, 700);
    }, 1000);
  }
}
