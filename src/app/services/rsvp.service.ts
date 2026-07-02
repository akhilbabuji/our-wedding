import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, throwError, timeout } from 'rxjs';
import { environment } from '../../environments/environment';
import { RsvpResponse, RsvpSubmission } from '../models/rsvp.model';

@Injectable({ providedIn: 'root' })
export class RsvpService {
  private readonly http = inject(HttpClient);

  private readonly projectId = environment.firebase.projectId;
  private readonly apiKey = environment.firebase.apiKey;

  private readonly firestoreUrl = `https://firestore.googleapis.com/v1/projects/${this.projectId}/databases/(default)/documents/rsvps`;

  submitRsvp(data: RsvpSubmission): Observable<RsvpResponse> {
    if (environment.useMockApi) {
      return this.http.post<RsvpResponse>(`${environment.apiUrl}/rsvp`, data);
    }
    return this.submitToFirestore(data);
  }

  storeSubmission(data: RsvpSubmission): RsvpResponse {
    const stored = localStorage.getItem('wedding-rsvps');
    const existing: RsvpSubmission[] = stored ? JSON.parse(stored) : [];
    existing.push(data);
    localStorage.setItem('wedding-rsvps', JSON.stringify(existing));
    return { id: `rsvp-${Date.now()}`, success: true, message: 'RSVP saved successfully' };
  }

  private toFirestoreFields(data: Record<string, unknown>): Record<string, unknown> {
    const fields: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data)) {
      if (value === undefined || value === null) continue;
      if (typeof value === 'string') {
        fields[key] = { stringValue: value };
      } else if (typeof value === 'number') {
        fields[key] = { integerValue: String(value) };
      } else if (typeof value === 'boolean') {
        fields[key] = { booleanValue: value };
      } else {
        fields[key] = { stringValue: String(value) };
      }
    }
    return fields;
  }

  private submitToFirestore(data: RsvpSubmission): Observable<RsvpResponse> {
    const payload = {
      guestName: data.guestName,
      attendance: data.attendance,
      invitedTo: data.invitedTo ?? 'both',
      ...(data.attendingEvents ? { attendingEvents: data.attendingEvents } : {}),
      plusOnes: data.plusOnes ?? 0,
      stayRequired: data.stayRequired ?? false,
      dietaryRestrictions: data.dietaryRestrictions ?? '',
      message: data.message ?? '',
      createdAt: new Date().toISOString(),
      ...(data.guestSlug ? { guestSlug: data.guestSlug } : {}),
    };

    const body = { fields: this.toFirestoreFields(payload as Record<string, unknown>) };
    const url = `${this.firestoreUrl}?key=${this.apiKey}`;

    return this.http.post<{ name: string }>(url, body).pipe(
      timeout(15000),
      map((res) => ({
        id: res.name?.split('/').pop() ?? 'unknown',
        success: true,
        message: 'RSVP saved successfully',
      } as RsvpResponse)),
      catchError((err) => {
        const msg = err?.error?.error?.message ?? err?.message ?? 'RSVP submission failed';
        console.error('[RSVP] error:', msg, err);
        return throwError(() => new Error(msg));
      })
    );
  }
}
