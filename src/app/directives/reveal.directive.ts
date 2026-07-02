import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';

export type RevealFrom = 'default' | 'left' | 'right' | 'bottom';

@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements OnInit, OnDestroy {
  @Input() revealDelay = 0;
  @Input() revealFrom: RevealFrom = 'default';

  private readonly el = inject(ElementRef<HTMLElement>);
  private observer: IntersectionObserver | null = null;

  ngOnInit(): void {
    const element = this.el.nativeElement;
    element.classList.add('reveal', `reveal-${this.revealFrom}`);

    if (this.revealDelay > 0) {
      element.style.transitionDelay = `${this.revealDelay}ms`;
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // rAF ensures the initial opacity:0 paint is committed before
          // the transition fires — critical for above-the-fold elements
          requestAnimationFrame(() => {
            element.classList.add('visible');
            this.observer?.unobserve(element);
          });
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    );

    this.observer.observe(element);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
