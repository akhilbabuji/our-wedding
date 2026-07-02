import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SplashService {
  // Start as visible so the splash covers everything from the first render frame,
  // preventing any flash of the underlying content before ngOnInit fires.
  readonly visible = signal(true);
  readonly hiding = signal(false);
  /** Flips to true once the splash has fully exited the DOM. */
  readonly done = signal(false);

  private timer1: ReturnType<typeof setTimeout> | null = null;
  private timer2: ReturnType<typeof setTimeout> | null = null;

  /** Show splash, then after it fades out call onDone (optional). */
  show(onDone?: () => void): void {
    // Clear any in-flight timers
    if (this.timer1) clearTimeout(this.timer1);
    if (this.timer2) clearTimeout(this.timer2);

    this.hiding.set(false);
    this.done.set(false);
    this.visible.set(true);

    // Start fade-out after 1 s, remove from DOM after transition (0.5 s)
    this.timer1 = setTimeout(() => {
      this.hiding.set(true);
      this.timer2 = setTimeout(() => {
        this.visible.set(false);
        this.done.set(true);
        onDone?.();
      }, 500);
    }, 1000);
  }
}
