import { WeddingData } from '../models/wedding.model';

export const WEDDING_DATA: WeddingData = {
  couple: {
    partnerOne: 'Anusree',
    partnerTwo: 'Akhil',
    displayNames: 'Anusree & Akhil',
  },

  weddingDate: {
    iso: '2026-08-23T16:00:00',
    display: 'Sunday, August 23, 2026',
    time: '12:00 PM',
  },

  location: {
    city: 'Chottanikkara, Ernakulam, Kerala',
    venue: 'Souparnika Auditorium',
    country: 'India',
  },

  hero: {
    genericWelcome:
      'You are warmly invited to celebrate with us as we begin our forever together.',
    personalizedWelcomePrefix: 'Dear',
    personalizedWelcomeSuffix:
      ', you are warmly invited to celebrate with us as we begin our forever together.',
    tagline: 'Two hearts, one beautiful journey',
  },

  story: {
    title: 'Our Story',
    subtitle:
      'Every love story is beautiful, but ours is our favorite. Here are the moments that brought us here.',
    milestones: [
      {
        id: 'first-meet',
        date: 'March 2019',
        title: 'A Chance Encounter',
        description:
          'We met at a mutual friend\'s art gallery opening in San Francisco. James spilled coffee; Olivia offered a napkin — and the rest is history.',
      },
      {
        id: 'first-date',
        date: 'April 2019',
        title: 'Our First Date',
        description:
          'A long walk through Golden Gate Park turned into dinner, then dessert, then hours of conversation under the stars.',
      },
      {
        id: 'moving-in',
        date: 'June 2021',
        title: 'Building a Home',
        description:
          'We moved into our little cottage in the hills, filling it with plants, books, and countless Sunday morning pancakes.',
      },
      {
        id: 'proposal',
        date: 'December 2025',
        title: 'The Proposal',
        description:
          'On a quiet winter evening in Tuscany, James got down on one knee as the sun set over the vineyards. Olivia said yes before he finished asking.',
      },
      {
        id: 'wedding',
        date: 'September 2026',
        title: 'Forever Begins',
        description:
          'Surrounded by the people we love most, we will say "I do" and begin the greatest adventure of all.',
      },
    ],
  },

  events: {
    title: 'Event Details',
    subtitle:
      'We cannot wait to celebrate with you. Here is everything you need to know for the day.',
    schedule: [
      {
        id: 'wedding-ceremony',
        title: 'Wedding Ceremony',
        date: 'Sunday, August 23, 2026',
        time: '12:00 PM',
        venue: 'Souparnika Auditorium',
        address: 'Chottanikkara, Ernakulam, Kerala',
        description:
          'A beautiful wedding ceremony with all the traditional Kerala customs. Please arrive 15 minutes early.',
        mapsUrl: 'https://maps.app.goo.gl/ToovBXFioaQBUMDx9',
        dressCode: 'Traditional Kerala Attire',
      },
      {
        id: 'reception',
        title: 'Reception',
        date: 'Sunday, August 23, 2026',
        time: '6:30 PM',
        venue: 'Ranganath Auditorium',
        address: 'Vazhikulangara, North Paravur, Ernakulam, Kerala',
        description:
          'A beautiful receptionr.',
        mapsUrl: 'https://maps.app.goo.gl/ZEb1VHRgrZn58Dq16',
        dressCode: 'Garden Formal',
      },
    ],
  },

  gallery: {
    title: 'Gallery',
    subtitle: 'Moments from our journey together.',
    images: [
      /*{
        id: 'g1',
        src: 'gallery/engagement-1.png',
        alt: 'Couple sharing a quiet moment together',
      },
      {
        id: 'g2',
        src: 'gallery/engagement-2.png',
        alt: 'Couples looking at each other',
      },
      {
        id: 'g3',
        src: 'gallery/engagement-3.png',
        alt: 'Close up of couple with engagement rings',
      },
      {
        id: 'g4',
        src: 'gallery/engagement-4.png',
        alt: 'Wedding rings in a decorative wooden box with rose petals',
      },
      {
        id: 'g5',
        src: 'gallery/engagement-5.png',
        alt: 'Couple holding hands showing engagement rings and bangles',
      },*/
      {
        id: 'g6',
        src: 'gallery/engagement-6.png',
        hdSrc: 'gallery/original/engagement-6.jpg',
        alt: 'Couple standing together under a green floral arch',
      },
      {
        id: 'g7',
        src: 'gallery/engagement-7.png',
        hdSrc: 'gallery/original/engagement-7.jpg',
        alt: 'Couple walking together in a garden pathway',
      },
      {
        id: 'g8',
        src: 'gallery/engagement-8.png',
        hdSrc: 'gallery/original/engagement-8.jpg',
        alt: 'Bride laughing joyfully in a garden with greenery',
      },
      {
        id: 'g9',
        src: 'gallery/engagement-9.png',
        hdSrc: 'gallery/original/engagement-9.jpg',
        alt: 'Couple sharing a close romantic moment by an archway',
      },
      {
        id: 'g10',
        src: 'gallery/engagement-10.jpg',
        hdSrc: 'gallery/original/engagement-10.jpg',
        alt: 'Close-up of hands with engagement ring and gold watch',
      },
      {
        id: 'g11',
        src: 'gallery/engagement-11.jpg',
        hdSrc: 'gallery/original/engagement-11.jpg',
        alt: 'Couple laughing together in a candid close-up',
      },
      {
        id: 'g12',
        src: 'gallery/engagement-12.jpg',
        hdSrc: 'gallery/original/engagement-12.jpg',
        alt: 'Couple playing with soap bubbles in a garden',
      },
      {
        id: 'g13',
        src: 'gallery/engagement-13.jpg',
        hdSrc: 'gallery/original/engagement-13.jpg',
        alt: 'Couple on a garden path beside arched doorways',
      },
    ],
  },

  rsvp: {
    sectionTitle: 'RSVP',
    sectionSubtitle: 'Please let us know if you can join us by',
    sectionSubtitleDate: 'August 23, 2026',
    sectionSubtitleEnd: '. We hope to see you there!',
    nameLabel: 'Your Name',
    namePlaceholder: 'Full name or family name',
    attendanceLabel: 'Will you be attending?',
    attending: 'Joyfully Accepts',
    declining: 'Regretfully Declines',
    plusOnesLabel: 'Additional Guests',
    plusOnesHint: 'How many additional guests will you bring?',
    dietaryLabel: 'Dietary Restrictions',
    dietaryPlaceholder: 'Vegetarian, gluten-free, allergies, etc.',
    messageLabel: 'Well Wishes',
    messagePlaceholder: 'Share a message for the happy couple...',
    submitButton: 'Send RSVP',
    submittingButton: 'Sending...',
    thankYouTitle: 'Thank You!',
    thankYouAttending:
      'We are overjoyed that you will be celebrating with us. We cannot wait to see you!',
    thankYouDeclining:
      'Thank you for letting us know. You will be in our hearts on our special day.',
    thankYouGeneric: 'Your response has been received with love.',
  },

  footer: {
    message: 'With love and gratitude',
    hashtag: '#AnusreeAndAkhil2026',
  },
};
