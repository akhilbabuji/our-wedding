import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface OgConfig {
  title: string;
  description: string;
  imageUrl?: string;
}

/** Canonical site origin — never decorate with guest / events params. */
const BASE_URL = 'https://akhilwedsanusree.web.app';
const DEFAULT_IMAGE = `${BASE_URL}/og-thumbnail.jpg?v=7`;

/**
 * Clean OG pipe for WhatsApp / social previews.
 *
 * WhatsApp scrapes raw HTML (no JS) and caches by URL. Parameterised invite
 * links would each be a cold scrape unless we pin every page to one
 * undecorated canonical `og:url` (the root). That makes WhatsApp reuse the
 * root thumbnail for `/invite?events=…`, `/invite#Guest`, etc.
 */
@Injectable({ providedIn: 'root' })
export class OgMetaService {
  constructor(
    private readonly meta: Meta,
    private readonly titleSvc: Title,
  ) {}

  set(config: OgConfig): void {
    const { title, description, imageUrl = DEFAULT_IMAGE } = config;

    this.titleSvc.setTitle(title);

    // Always pin og:url to the undecorated root (WhatsApp requirement).
    this.apply({
      description,
      'og:title': title,
      'og:description': description,
      'og:image': imageUrl,
      'og:url': BASE_URL,
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': imageUrl,
    });
  }

  /** Restore the default wedding invitation tags. */
  reset(): void {
    this.set({
      title: 'Anusree & Akhil — Wedding Invitation',
      description:
        'Join us on Sunday, August 23, 2026. You are warmly invited to celebrate with us as we begin our forever together.',
    });
  }

  private apply(tags: Record<string, string>): void {
    for (const [name, content] of Object.entries(tags)) {
      if (name.startsWith('og:')) {
        this.meta.updateTag({ property: name, content });
      } else {
        this.meta.updateTag({ name, content });
      }
    }
  }
}
