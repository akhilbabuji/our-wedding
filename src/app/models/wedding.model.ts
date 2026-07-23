export interface WeddingCouple {
  partnerOne: string;
  partnerTwo: string;
  displayNames: string;
}

export interface WeddingDate {
  iso: string;
  display: string;
  time: string;
}

export interface WeddingLocation {
  city: string;
  venue: string;
  country: string;
}

export interface HeroContent {
  genericWelcome: string;
  personalizedWelcomePrefix: string;
  personalizedWelcomeSuffix: string;
  tagline: string;
}

export interface TimelineMilestone {
  id: string;
  date: string;
  title: string;
  description: string;
}

export interface WeddingEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  description: string;
  mapsUrl: string;
  dressCode?: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

export interface RsvpFormLabels {
  sectionTitle: string;
  sectionSubtitle: string;
  sectionSubtitleDate: string;
  sectionSubtitleEnd: string;
  nameLabel: string;
  namePlaceholder: string;
  attendanceLabel: string;
  attending: string;
  declining: string;
  plusOnesLabel: string;
  plusOnesHint: string;
  dietaryLabel: string;
  dietaryPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  submitButton: string;
  submittingButton: string;
  thankYouTitle: string;
  thankYouAttending: string;
  thankYouDeclining: string;
  thankYouGeneric: string;
}

export interface WeddingData {
  couple: WeddingCouple;
  weddingDate: WeddingDate;
  location: WeddingLocation;
  hero: HeroContent;
  story: {
    title: string;
    subtitle: string;
    milestones: TimelineMilestone[];
  };
  events: {
    title: string;
    subtitle: string;
    schedule: WeddingEvent[];
  };
  gallery: {
    title: string;
    subtitle: string;
    images: GalleryImage[];
  };
  rsvp: RsvpFormLabels;
  footer: {
    message: string;
    hashtag: string;
  };
}
