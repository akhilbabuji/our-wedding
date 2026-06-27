import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { WEDDING_DATA } from '../../config/wedding-data';
import {
  AttendanceStatus,
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

  readonly wedding = WEDDING_DATA;
  readonly isSubmitted = signal(false);
  readonly isSubmitting = signal(false);
  readonly submitError = signal<string | null>(null);
  readonly submittedAttendance = signal<AttendanceStatus | null>(null);

  rsvpForm!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly rsvpService: RsvpService
  ) {}

  ngOnInit(): void {
    this.rsvpForm = this.fb.group({
      guestName: [
        this.guest?.displayName ?? '',
        [Validators.required, Validators.minLength(2)],
      ],
      attendance: ['attending' as AttendanceStatus, Validators.required],
      plusOnes: [0, [Validators.min(0), Validators.max(10)]],
      dietaryRestrictions: [''],
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
    const submission: RsvpSubmission = {
      guestName: formValue.guestName.trim(),
      attendance: formValue.attendance,
      plusOnes: formValue.attendance === 'attending' ? formValue.plusOnes : 0,
      dietaryRestrictions: formValue.dietaryRestrictions?.trim() ?? '',
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
      error: () => {
        this.submitError.set(
          'Something went wrong. Please try again or contact us directly.'
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
