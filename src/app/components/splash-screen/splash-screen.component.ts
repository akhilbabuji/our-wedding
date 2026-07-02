import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplashService } from '../../services/splash.service';

@Component({
  selector: 'app-splash-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './splash-screen.component.html',
})
export class SplashScreenComponent implements OnInit {
  readonly visible;
  readonly hiding;

  constructor(private readonly splash: SplashService) {
    this.visible = this.splash.visible;
    this.hiding  = this.splash.hiding;
  }

  ngOnInit(): void {
    // Trigger automatically on first page load
    this.splash.show();
  }
}
