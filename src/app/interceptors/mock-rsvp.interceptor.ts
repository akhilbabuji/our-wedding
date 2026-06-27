import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { delay, of } from 'rxjs';
import { RsvpResponse, RsvpSubmission } from '../models/rsvp.model';
import { RsvpService } from '../services/rsvp.service';

export const mockRsvpInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.method === 'POST' && req.url.includes('/api/rsvp')) {
    const rsvpService = inject(RsvpService);
    const body = req.body as RsvpSubmission;
    const response: RsvpResponse = rsvpService.storeSubmission(body);

    return of(new HttpResponse({ status: 201, body: response })).pipe(delay(800));
  }

  return next(req);
};
