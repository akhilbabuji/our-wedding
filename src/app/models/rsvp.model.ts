export type AttendanceStatus = 'attending' | 'declining';

export interface RsvpSubmission {
  guestName: string;
  attendance: AttendanceStatus;
  plusOnes: number;
  dietaryRestrictions: string;
  message: string;
  submittedAt: string;
  guestSlug?: string;
}

export interface RsvpResponse {
  id: string;
  success: boolean;
  message: string;
}

export interface ParsedGuest {
  raw: string;
  displayName: string;
  slug: string;
}
