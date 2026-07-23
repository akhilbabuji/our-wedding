import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { WEDDING_DATA } from '../../config/wedding-data';
import {
  AttendanceStatus,
  InvitedTo,
  ParsedGuest,
  RsvpSubmission,
} from '../../models/rsvp.model';
import { RsvpService } from '../../services/rsvp.service';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-rsvp-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RevealDirective],
  templateUrl: './rsvp-form.component.html',
})
export class RsvpFormComponent implements OnInit {
  @Input() guest: ParsedGuest | null = null;
  @Input() invitedTo: InvitedTo = 'both';

  private invitedToFromUrl: InvitedTo = 'both';

  readonly wedding = WEDDING_DATA;
  readonly isSubmitted = signal(false);
  readonly isSubmitting = signal(false);
  readonly submitError = signal<string | null>(null);
  readonly submittedAttendance = signal<AttendanceStatus | null>(null);

  rsvpForm!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly rsvpService: RsvpService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Read ?events= directly from URL — most reliable source
    const raw = this.route.snapshot.queryParamMap.get('events')?.toLowerCase();
    if (raw === 'ceremony' || raw === 'reception') {
      this.invitedToFromUrl = raw;
    } else {
      this.invitedToFromUrl = this.invitedTo; // fall back to @Input if no URL param
    }

    this.rsvpForm = this.fb.group({
      guestName: [
        this.guest?.displayName ?? '',
        [Validators.required, Validators.minLength(2)],
      ],
      attendance: ['attending' as AttendanceStatus, Validators.required],
      attendingEvents: ['both' as InvitedTo],
      plusOnes: [0, [Validators.min(0), Validators.max(10)]],
      stayRequired: [false],
      message: ['', Validators.maxLength(500)],
    });

    this.rsvpForm.get('attendance')?.valueChanges.subscribe((value) => {
      if (value === 'declining') {
        this.rsvpForm.patchValue({ plusOnes: 0 }, { emitEvent: false });
      }
    });
  }

  get isAttending(): boolean {
    return this.rsvpForm.get('attendance')?.value === 'attending';
  }

  get showEventPicker(): boolean {
    return this.invitedToFromUrl === 'both' && this.isAttending;
  }

  selectAttendingEvents(value: InvitedTo): void {
    this.rsvpForm.patchValue({ attendingEvents: value });
  }

  get thankYouMessage(): string {
    const attendance = this.submittedAttendance();
    if (attendance === 'attending') {
      return this.wedding.rsvp.thankYouAttending;
    }
    if (attendance === 'declining') {
      return this.wedding.rsvp.thankYouDeclining;
    }
    return this.wedding.rsvp.thankYouGeneric;
  }

  selectAttendance(status: AttendanceStatus): void {
    this.rsvpForm.patchValue({ attendance: status });
  }

  toggleStay(): void {
    this.rsvpForm.patchValue({ stayRequired: !this.rsvpForm.value.stayRequired });
  }

  decrementPlusOnes(): void {
    const current = this.rsvpForm.value.plusOnes ?? 0;
    this.rsvpForm.patchValue({ plusOnes: Math.max(0, current - 1) });
  }

  incrementPlusOnes(): void {
    const current = this.rsvpForm.value.plusOnes ?? 0;
    this.rsvpForm.patchValue({ plusOnes: Math.min(10, current + 1) });
  }

  onSubmit(): void {
    if (this.rsvpForm.invalid || this.isSubmitting()) {
      this.rsvpForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.submitError.set(null);

    const formValue = this.rsvpForm.value;
    const isAttending = formValue.attendance === 'attending';
    const submission: RsvpSubmission = {
      guestName: formValue.guestName.trim(),
      attendance: formValue.attendance,
      invitedTo: this.invitedToFromUrl,
      // Only save attendingEvents when invited to both and actually attending
      ...(isAttending && this.invitedToFromUrl === 'both'
        ? { attendingEvents: (formValue.attendingEvents as InvitedTo) ?? 'both' }
        : {}),
      plusOnes: isAttending ? formValue.plusOnes : 0,
      stayRequired: isAttending ? !!formValue.stayRequired : false,
      dietaryRestrictions: '',
      message: formValue.message?.trim() ?? '',
      submittedAt: new Date().toISOString(),
      guestSlug: this.guest?.slug,
    };

    this.rsvpService.submitRsvp(submission).subscribe({
      next: () => {
        this.submittedAttendance.set(submission.attendance);
        this.isSubmitted.set(true);
        this.isSubmitting.set(false);
      },
      error: (err) => {
        this.submitError.set(
          err?.message ?? 'Something went wrong. Please try again or contact us directly.'
        );
        this.isSubmitting.set(false);
      },
    });
  }

  fieldError(field: string): string | null {
    const control = this.rsvpForm.get(field);
    if (!control?.touched || !control.errors) return null;

    if (control.errors['required']) return 'This field is required';
    if (control.errors['minlength']) return 'Please enter at least 2 characters';
    if (control.errors['maxlength']) return 'Message is too long (max 500 characters)';

    return 'Invalid value';
  }
}
