import { Component, OnInit, AfterViewInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplashService } from '../../services/splash.service';

/* Each petal carries its own burst trajectory as inline CSS vars */
export interface BurstPetal {
  tx: string; ty: string; rot: string;
  color: string; size: string; delay: string;
}

@Component({
  selector: 'app-splash-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './splash-screen.component.html',
})
export class SplashScreenComponent implements OnInit, AfterViewInit {
  readonly visible;
  readonly hiding;
  readonly bursting = signal(false);

  readonly burstPetals: BurstPetal[] = [
    { tx: '0px',    ty: '-90px',  rot: '30deg',  color: '#e8a0b0', size: '14px', delay: '0ms'   },
    { tx: '63px',   ty: '-63px',  rot: '-20deg', color: '#f0bcc8', size: '10px', delay: '30ms'  },
    { tx: '90px',   ty: '0px',    rot: '60deg',  color: '#c9a87c', size: '12px', delay: '15ms'  },
    { tx: '63px',   ty: '63px',   rot: '-45deg', color: '#d4a0b0', size: '11px', delay: '45ms'  },
    { tx: '0px',    ty: '90px',   rot: '90deg',  color: '#e8bcc8', size: '10px', delay: '0ms'   },
    { tx: '-63px',  ty: '63px',   rot: '15deg',  color: '#f0d0da', size: '13px', delay: '30ms'  },
    { tx: '-90px',  ty: '0px',    rot: '-60deg', color: '#e8a0b0', size: '11px', delay: '10ms'  },
    { tx: '-63px',  ty: '-63px',  rot: '45deg',  color: '#8fb87a', size: '12px', delay: '40ms'  },
    { tx: '40px',   ty: '-110px', rot: '-30deg', color: '#f0bcc8', size: '9px',  delay: '20ms'  },
    { tx: '-40px',  ty: '-110px', rot: '20deg',  color: '#c9a87c', size: '10px', delay: '50ms'  },
    { tx: '110px',  ty: '-40px',  rot: '-10deg', color: '#d4a0b0', size: '9px',  delay: '25ms'  },
    { tx: '110px',  ty: '40px',   rot: '50deg',  color: '#e8bcc8', size: '11px', delay: '35ms'  },
    { tx: '-110px', ty: '40px',   rot: '-50deg', color: '#8fb87a', size: '9px',  delay: '15ms'  },
    { tx: '-110px', ty: '-40px',  rot: '35deg',  color: '#f0d0da', size: '10px', delay: '45ms'  },
    { tx: '0px',    ty: '-130px', rot: '-15deg', color: '#e8a0b0', size: '8px',  delay: '60ms'  },
    { tx: '75px',   ty: '-90px',  rot: '25deg',  color: '#c9a87c', size: '9px',  delay: '55ms'  },
  ];

  constructor(private readonly splash: SplashService) {
    this.visible = this.splash.visible;
    this.hiding  = this.splash.hiding;
  }

  ngOnInit(): void {
    this.splash.show();
  }

  ngAfterViewInit(): void {
    requestAnimationFrame(() => {
      const el = document.getElementById('pre-boot-splash');
      if (!el) return;
      el.style.transition = 'opacity 0.25s ease';
      el.style.opacity = '0';
      setTimeout(() => el.remove(), 280);
    });
  }

  onEnter(): void {
    if (this.bursting()) return;
    this.bursting.set(true);
    setTimeout(() => this.splash.dismiss(), 900);
  }
}
