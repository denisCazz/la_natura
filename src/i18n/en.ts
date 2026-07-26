import type { Dictionary } from './types';
import { BUSINESS_HOURS } from '../data/business';

const en: Dictionary = {
  meta: {
    title: 'La Natura Farmhouse Restaurant | Savigliano, Piedmont',
    description:
      'Countryside cooking in Savigliano: garden produce, Italian meat and hospitality from Alfred and Silvana. Book for lunch or dinner.',
  },
  nav: {
    call: 'Call',
    whatsapp: 'WhatsApp',
    home: 'Home',
    menu: 'Menu',
    cucina: 'Kitchen',
    luogo: 'The place',
    info: 'Info',
  },
  hero: {
    brand: 'La Natura',
    headline: 'Countryside cooking in Savigliano',
    support:
      'Piedmontese flavours, garden produce and Italian meat. Book your table.',
    ctaCall: 'Call now',
    ctaWhatsApp: 'Book on WhatsApp',
  },
  cucina: {
    title: 'From garden to table',
    body: 'We cook with what the land offers and only Italian meat: genuine dishes, smoked specialities and desserts like herb cheesecake from our garden. A taste of the countryside, without rush.',
    imageAlt: 'Table laid with Piedmontese cuisine dishes',
  },
  luogo: {
    title: 'A garden to gather together',
    body: 'Between Savigliano and the Cuneo countryside, Alfred and Silvana welcome you to a farmhouse with a garden and spaces for children. Light, greenery and convivial gatherings.',
    imageAlt: 'Garden at Agriturismo La Natura',
  },
  menu: {
    metaTitle: 'Menu | Agriturismo La Natura',
    metaDescription:
      'Working lunch and full menu at Agriturismo La Natura in Savigliano. Water and cover charge are free.',
    title: 'The menu',
    intro: 'All our à la carte dishes, from countryside cooking to local wines.',
    lunchTitle: 'Working lunch',
    lunchPrice: '\u20ac13',
    lunchDays: 'Monday to Saturday',
    lunchItems: [
      'Starter',
      'First course',
      'Main course',
      'Dessert',
      'Coffee',
      '1/4 litre of wine',
      'Water',
    ],
    coverNote: 'Water and cover charge are free.',
    categories: {
      antipasti: 'Starters',
      primi_piatti: 'First courses',
      primi_di_pesce: 'Seafood first courses',
      secondi_piatti: 'Main courses',
      contorni: 'Side dishes',
      dolci: 'Desserts',
      bibite_in_lattina: 'Soft drinks (cans)',
      birre_in_bottiglia: 'Bottled beer',
      vino_sfuso: 'House wine on tap (white/red)',
      vini: 'Our wines',
      digestivi: 'Digestifs',
      caffe: 'Coffee',
    },
    notes: ['* Frozen product', 'All our meat is locally sourced (Km 0)'],
  },
  info: {
    title: 'Info and bookings',
    hoursLabel: 'Hours',
    hours: `Lunch ${BUSINESS_HOURS.lunch.opens}\u2013${BUSINESS_HOURS.lunch.closes}\nDinner ${BUSINESS_HOURS.dinner.opens}\u2013${BUSINESS_HOURS.dinner.closesDisplay}\nClosed Tuesday evening`,
    bookingLabel: 'Bookings',
    booking: 'For parties of 5 or more',
    coverLabel: 'Water & cover',
    cover: 'Not charged',
    priceLabel: 'Prices',
    price: 'Working lunch \u20ac13\nDinner \u20ac20\u201330 per person',
    addressLabel: 'Find us',
    mapCta: 'Open in Google Maps',
    mapTitle: 'Map',
    phoneLabel: 'Tel',
  },
  footer: {
    rights: 'Agriturismo La Natura \u00b7 Savigliano',
    follow: 'Follow us',
    credit: 'Website by',
    creditLinkLabel: 'Bitora',
    vat: 'VAT no.',
    privacy: 'Privacy',
  },
  cookies: {
    title: 'Cookies',
    body: 'This site uses only technical cookies required for it to work. No profiling or marketing cookies.',
    accept: 'Got it',
    policyLink: 'Privacy & cookies',
  },
  privacy: {
    metaTitle: 'Privacy & cookies | Agriturismo La Natura',
    metaDescription:
      'Privacy and cookie notice for Agriturismo La Natura in Savigliano. Data controller and company details.',
    title: 'Privacy & cookies',
    intro:
      'Information on the processing of personal data and the use of cookies under Regulation (EU) 2016/679 (GDPR) and applicable Italian law.',
    controllerTitle: 'Data controller',
    controllerBody:
      'The data controller is the company listed below, which operates this website and the agriturismo.',
    labels: {
      legalName: 'Legal name',
      legalForm: 'Legal form',
      registeredOffice: 'Registered office',
      vat: 'VAT number',
      taxCode: 'Tax code',
      rea: 'REA',
      pec: 'Certified email (PEC)',
      representative: 'Representative',
    },
    dataTitle: 'Data we process',
    dataBody:
      'This website does not require registration and does not collect personal data through forms. Any details (name, phone number, message) you share voluntarily by phone or WhatsApp for bookings or enquiries are used only to reply and manage the request. They are not shared with third parties for commercial purposes.',
    cookiesTitle: 'Cookies',
    cookiesBody:
      'We only use technical cookies needed for the site to function (for example to remember your cookie-banner preference). We do not use analytics, profiling, or marketing cookies. Specific consent for non-essential cookies is therefore not required.',
    rightsTitle: 'Your rights',
    rightsBody:
      'You may exercise the rights under Articles 15\u201322 GDPR (access, rectification, erasure, restriction, objection, portability) by contacting the controller using the details below. You may also lodge a complaint with the Italian Data Protection Authority (Garante).',
    contactTitle: 'Contact',
    contactBody:
      'For any privacy-related request, please contact us by phone or certified email (PEC).',
    updated: 'Last updated: July 2026',
  },
  notFound: {
    metaTitle: 'Page not found | Agriturismo La Natura',
    metaDescription:
      'This page does not exist. Return to Agriturismo La Natura in Savigliano or browse the menu.',
    eyebrow: '404',
    title: 'This page isn\u2019t here',
    body: 'The path you followed doesn\u2019t lead anywhere. Head home or explore the menu.',
    ctaHome: 'Back to home',
    ctaMenu: 'View the menu',
  },
  whatsapp: {
    prefill: 'Hello, I would like to book a table at Agriturismo La Natura.',
  },
  a11y: {
    skip: 'Skip to content',
    stickyWhatsApp: 'Book on WhatsApp',
    languageNav: 'Choose language',
    mainNav: 'Main navigation',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },
};

export default en;
