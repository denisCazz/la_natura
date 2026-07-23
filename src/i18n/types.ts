export type Locale = 'it' | 'en' | 'fr';

export type Dictionary = {
  meta: { title: string; description: string };
  nav: {
    call: string;
    whatsapp: string;
    home: string;
    menu: string;
    cucina: string;
    luogo: string;
    info: string;
  };
  hero: {
    brand: string;
    headline: string;
    support: string;
    ctaCall: string;
    ctaWhatsApp: string;
  };
  cucina: { title: string; body: string; imageAlt: string };
  luogo: { title: string; body: string; imageAlt: string };
  menu: {
    metaTitle: string;
    metaDescription: string;
    title: string;
    intro: string;
    lunchTitle: string;
    lunchPrice: string;
    lunchDays: string;
    lunchItems: string[];
    coverNote: string;
    categories: Record<string, string>;
    notes: string[];
  };
  info: {
    title: string;
    hoursLabel: string;
    hours: string;
    bookingLabel: string;
    booking: string;
    coverLabel: string;
    cover: string;
    priceLabel: string;
    price: string;
    addressLabel: string;
    mapCta: string;
    mapTitle: string;
    phoneLabel: string;
  };
  footer: {
    rights: string;
    follow: string;
    credit: string;
    creditLinkLabel: string;
    vat: string;
    privacy: string;
  };
  cookies: {
    title: string;
    body: string;
    accept: string;
    policyLink: string;
  };
  privacy: {
    metaTitle: string;
    metaDescription: string;
    title: string;
    intro: string;
    controllerTitle: string;
    controllerBody: string;
    labels: {
      legalName: string;
      legalForm: string;
      registeredOffice: string;
      vat: string;
      taxCode: string;
      rea: string;
      pec: string;
      representative: string;
    };
    dataTitle: string;
    dataBody: string;
    cookiesTitle: string;
    cookiesBody: string;
    rightsTitle: string;
    rightsBody: string;
    contactTitle: string;
    contactBody: string;
    updated: string;
  };
  whatsapp: { prefill: string };
  a11y: {
    skip: string;
    stickyWhatsApp: string;
    languageNav: string;
    mainNav: string;
    openMenu: string;
    closeMenu: string;
  };
};
