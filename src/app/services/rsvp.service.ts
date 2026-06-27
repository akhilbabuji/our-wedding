import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { RsvpResponse, RsvpSubmission } from '../models/rsvp.model';

/**
 * RSVP persistence service.
 *
 * Mock mode (default): posts to /api/rsvp via HttpClient + MockRsvpInterceptor.
 * Firebase mode: swap submitRsvp() body to use Firestore — see submitToFirestore().
 */
@Injectable({ providedIn: 'root' })
export class RsvpService {
  private readonly submissions: RsvpSubmission[] = [];

  constructor(private readonly http: HttpClient) {}

  submitRsvp(data: RsvpSubmission): Observable<RsvpResponse> {
    if (environment.useMockApi) {
      return this.http.post<RsvpResponse>(`${environment.apiUrl}/rsvp`, data);
    }

    return this.submitToFirestore(data);
  }

  /** Retrieve mock submissions (dev/debug only) */
  getStoredSubmissions(): RsvpSubmission[] {
    return [...this.submissions];
  }

  storeSubmission(data: RsvpSubmission): RsvpResponse {
    this.submissions.push(data);
    const stored = localStorage.getItem('wedding-rsvps');
    const existing: RsvpSubmission[] = stored ? JSON.parse(stored) : [];
    existing.push(data);
    localStorage.setItem('wedding-rsvps', JSON.stringify(existing));

    return {
      id: `rsvp-${Date.now()}`,
      success: true,
      message: 'RSVP saved successfully',
    };
  }

  /**
   * Firebase Firestore integration — enable by setting environment.useMockApi = false
   * and configuring environment.firebase, then install firebase:
   *   npm install firebase
   */
  private submitToFirestore(data: RsvpSubmission): Observable<RsvpResponse> {
    return from(this.firestoreSubmit(data)).pipe(
      map((id) => ({
        id,
        success: true,
        message: 'RSVP saved to Firestore',
      }))
    );
  }

  private async firestoreSubmit(data: RsvpSubmission): Promise<string> {
    const { initializeApp } = await import('firebase/app');
    const { getFirestore, collection, addDoc } = await import('firebase/firestore');

    const app = initializeApp(environment.firebase);
    const db = getFirestore(app);
    const docRef = await addDoc(collection(db, 'rsvps'), {
      ...data,
      createdAt: new Date().toISOString(),
    });

    return docRef.id;
  }
}
