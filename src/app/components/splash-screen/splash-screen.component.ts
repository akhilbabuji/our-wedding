import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplashService } from '../../services/splash.service';

@Component({
  selector: 'app-splash-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './splash-screen.component.html',
})
export class SplashScreenComponent implements OnInit, AfterViewInit {
  readonly visible;
  readonly hiding;

  constructor(private readonly splash: SplashService) {
    this.visible = this.splash.visible;
    this.hiding  = this.splash.hiding;
  }

  ngOnInit(): void {
    this.splash.show();
  }

  ngAfterViewInit(): void {
    // ngAfterViewInit fires after Angular's view is in the DOM.
    // One rAF after that = browser has definitely painted the Angular splash.
    // Only NOW is it safe to fade out the pre-boot HTML splash.
    requestAnimationFrame(() => {
      const el = document.getElementById('pre-boot-splash');
      if (!el) return;
      el.style.transition = 'opacity 0.25s ease';
      el.style.opacity = '0';
      setTimeout(() => el.remove(), 280);
    });
  }
}
