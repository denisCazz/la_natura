export type Locale = 'it' | 'en' | 'fr';

export type Dictionary = {
  meta: { title: string; description: string };
  nav: { call: string; whatsapp: string };
  hero: {
    brand: string;
    headline: string;
    support: string;
    ctaCall: string;
    ctaWhatsApp: string;
  };
  cucina: { title: string; body: string; imageAlt: string };
  luogo: { title: string; body: string; imageAlt: string };
  info: {
    title: string;
    hoursLabel: string;
    hours: string;
    priceLabel: string;
    price: string;
    addressLabel: string;
    mapCta: string;
    phoneLabel: string;
  };
  footer: {
    rights: string;
    follow: string;
  };
  whatsapp: { prefill: string };
  a11y: { skip: string; stickyWhatsApp: string; languageNav: string };
};
