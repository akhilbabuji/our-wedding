import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, ParamMap } from '@angular/router';
import { ParsedGuest } from '../models/rsvp.model';

@Injectable({ providedIn: 'root' })
export class GuestService {
  parseFromRoute(route: ActivatedRouteSnapshot): ParsedGuest | null {
    const paramGuest = route.paramMap.get('guest');
    const queryGuest = route.queryParamMap.get('guest');

    const raw = paramGuest ?? queryGuest;
    if (!raw?.trim()) {
      return null;
    }

    return this.parseGuestSlug(raw);
  }

  parseGuestSlug(raw: string): ParsedGuest {
    const decoded = decodeURIComponent(raw.trim());
    const displayName = this.formatDisplayName(decoded);
    const slug = this.toSlug(displayName);

    return { raw: decoded, displayName, slug };
  }

  formatDisplayName(raw: string): string {
    return raw
      .replace(/\+/g, ' ')
      .replace(/-/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .split(' ')
      .map((word) => {
        if (word.toLowerCase() === 'and') {
          return '&';
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(' ')
      .replace(/\s&\s/g, ' & ');
  }

  toSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/\s&\s/g, '-and-')
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  }

  getGuestFromParamMap(paramMap: ParamMap): ParsedGuest | null {
    const raw = paramMap.get('guest');
    if (!raw?.trim()) {
      return null;
    }
    return this.parseGuestSlug(raw);
  }
}
