export type AttendanceStatus = 'attending' | 'declining';

export type InvitedTo = 'both' | 'ceremony' | 'reception';

export interface RsvpSubmission {
  guestName: string;
  attendance: AttendanceStatus;
  invitedTo: InvitedTo;
  attendingEvents?: InvitedTo;
  plusOnes: number;
  stayRequired: boolean;
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
