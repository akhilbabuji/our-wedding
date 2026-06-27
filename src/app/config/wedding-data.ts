import { WeddingData } from '../models/wedding.model';

export const WEDDING_DATA: WeddingData = {
  couple: {
    partnerOne: 'Olivia',
    partnerTwo: 'James',
    displayNames: 'Olivia & James',
  },

  weddingDate: {
    iso: '2026-09-12T16:00:00',
    display: 'Saturday, September 12, 2026',
    time: '4:00 PM',
  },

  location: {
    city: 'Napa Valley',
    venue: 'Willow Creek Estate',
    country: 'California',
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
        id: 'ceremony',
        title: 'Ceremony',
        date: 'Saturday, September 12, 2026',
        time: '4:00 PM',
        venue: 'Willow Creek Estate — Garden Pavilion',
        address: '2450 Silverado Trail, Napa, CA 94558',
        description:
          'An intimate outdoor ceremony surrounded by olive trees and rolling vineyards. Please arrive 15 minutes early.',
        mapsUrl: 'https://maps.google.com/?q=2450+Silverado+Trail+Napa+CA',
        dressCode: 'Garden Formal',
      },
      {
        id: 'reception',
        title: 'Reception',
        date: 'Saturday, September 12, 2026',
        time: '6:00 PM',
        venue: 'Willow Creek Estate — Grand Terrace',
        address: '2450 Silverado Trail, Napa, CA 94558',
        description:
          'Dinner, dancing, and celebration under the stars. The party continues until midnight.',
        mapsUrl: 'https://maps.google.com/?q=2450+Silverado+Trail+Napa+CA',
        dressCode: 'Garden Formal',
      },
      {
        id: 'brunch',
        title: 'Farewell Brunch',
        date: 'Sunday, September 13, 2026',
        time: '10:00 AM',
        venue: 'Willow Creek Estate — Courtyard',
        address: '2450 Silverado Trail, Napa, CA 94558',
        description:
          'A relaxed morning gathering for those staying in the area. Light bites and coffee served.',
        mapsUrl: 'https://maps.google.com/?q=2450+Silverado+Trail+Napa+CA',
      },
    ],
  },

  gallery: {
    title: 'Gallery',
    subtitle: 'Moments from our journey together.',
    images: [
      {
        id: 'g1',
        src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
        alt: 'Couple walking through a vineyard at sunset',
        caption: 'Tuscany, December 2025',
      },
      {
        id: 'g2',
        src: 'https://images.unsplash.com/photo-1522673607210-8a2aa9a8a659?w=800&q=80',
        alt: 'Engagement ring held between two hands',
        caption: 'The moment she said yes',
      },
      {
        id: 'g3',
        src: 'https://images.unsplash.com/photo-1465497424744-6f3389a4a8ad?w=800&q=80',
        alt: 'Couple laughing together outdoors',
        caption: 'Golden Gate Park, 2019',
      },
      {
        id: 'g4',
        src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
        alt: 'Wedding celebration with flowers',
        caption: 'Dreaming of our day',
      },
      {
        id: 'g5',
        src: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80',
        alt: 'Couple toasting with champagne',
        caption: 'Cheers to us',
      },
      {
        id: 'g6',
        src: 'https://images.unsplash.com/photo-1529636798458-92182ee66240?w=800&q=80',
        alt: 'Couple dancing in soft light',
        caption: 'Our first dance practice',
      },
    ],
  },

  rsvp: {
    sectionTitle: 'RSVP',
    sectionSubtitle:
      'Please let us know if you can join us by August 15, 2026. We hope to see you there!',
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
    hashtag: '#OliviaAndJames2026',
  },
};
