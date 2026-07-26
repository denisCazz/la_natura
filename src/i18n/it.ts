import type { Dictionary } from './types';
import { BUSINESS_HOURS } from '../data/business';

const it: Dictionary = {
  meta: {
    title: 'Agriturismo La Natura | Savigliano',
    description:
      'Cucina di campagna a Savigliano: orto, carne italiana e ospitalit\u00e0 di Alfred e Silvana. Prenota a pranzo o a cena.',
  },
  nav: {
    call: 'Chiama',
    whatsapp: 'WhatsApp',
    home: 'Home',
    menu: 'Menu',
    cucina: 'Cucina',
    luogo: 'Il luogo',
    info: 'Info',
  },
  hero: {
    brand: 'La Natura',
    headline: 'Cucina di campagna, a Savigliano',
    support:
      'Sapori piemontesi, prodotti dell\u2019orto e carne italiana. Prenota il tuo tavolo.',
    ctaCall: 'Chiama ora',
    ctaWhatsApp: 'Prenota su WhatsApp',
  },
  cucina: {
    title: 'Dall\u2019orto alla tavola',
    body: 'Cuciniamo con ci\u00f2 che la terra ci offre e con sola carne italiana: piatti genuini, affumicature e dolci come la cheesecake alle erbe del nostro orto. Un sapore di campagna, senza frettolosit\u00e0.',
    imageAlt: 'Tavola imbandita con piatti di cucina piemontese',
  },
  luogo: {
    title: 'Un giardino per stare insieme',
    body: 'Tra Savigliano e la campagna cuneese, Alfred e Silvana vi accolgono in un agriturismo con giardino e spazi per i bambini. Luce, verde e tavolate conviviali.',
    imageAlt: 'Giardino dell\u2019agriturismo La Natura',
  },
  menu: {
    metaTitle: 'Menu | Agriturismo La Natura',
    metaDescription:
      'Pranzo di lavoro e menu completo dell\u2019Agriturismo La Natura a Savigliano. Acqua e coperto non si pagano.',
    title: 'Il menu',
    intro: 'Tutte le nostre proposte a la carte, dalla cucina di campagna ai vini del territorio.',
    lunchTitle: 'Pranzo di lavoro',
    lunchPrice: '\u20ac13',
    lunchDays: 'Dal luned\u00ec al sabato',
    lunchItems: [
      'Antipasto',
      'Primo',
      'Secondo',
      'Dolce',
      'Caff\u00e8',
      '1/4 di vino',
      'Acqua',
    ],
    coverNote: 'Acqua e coperto non si pagano.',
    categories: {
      antipasti: 'Antipasti',
      primi_piatti: 'Primi piatti',
      primi_di_pesce: 'Primi di pesce',
      secondi_piatti: 'Secondi piatti',
      contorni: 'Contorni',
      dolci: 'Dolci',
      bibite_in_lattina: 'Bibite in lattina',
      birre_in_bottiglia: 'Birre in bottiglia',
      vino_sfuso: 'Vino sfuso della casa bianco/rosso',
      vini: 'I nostri vini',
      digestivi: 'Digestivi',
      caffe: 'Caff\u00e8',
    },
    notes: ['* Prodotto surgelato', 'Tutta la nostra carne \u00e8 Km 0'],
  },
  info: {
    title: 'Info e prenotazioni',
    hoursLabel: 'Orari',
    hours: `Pranzo ${BUSINESS_HOURS.lunch.opens}\u2013${BUSINESS_HOURS.lunch.closes}\nCena ${BUSINESS_HOURS.dinner.opens}\u2013${BUSINESS_HOURS.dinner.closesDisplay}\nChiuso marted\u00ec sera`,
    bookingLabel: 'Prenotazioni',
    booking: 'Da 5 persone in su',
    coverLabel: 'Acqua e coperto',
    cover: 'Non si pagano',
    priceLabel: 'Prezzi',
    price: 'Pranzo di lavoro \u20ac13\nCena \u20ac20\u201330 a persona',
    addressLabel: 'Dove siamo',
    mapCta: 'Apri in Google Maps',
    mapTitle: 'Mappa',
    phoneLabel: 'Tel',
  },
  footer: {
    rights: 'Agriturismo La Natura \u00b7 Savigliano',
    follow: 'Seguici',
    credit: 'Sito creato da',
    creditLinkLabel: 'Bitora',
    vat: 'P. IVA',
    privacy: 'Privacy',
  },
  cookies: {
    title: 'Cookie',
    body: 'Questo sito utilizza solo cookie tecnici necessari al funzionamento. Nessun cookie di profilazione o marketing.',
    accept: 'Ho capito',
    policyLink: 'Privacy e cookie',
  },
  privacy: {
    metaTitle: 'Privacy e cookie | Agriturismo La Natura',
    metaDescription:
      'Informativa privacy e cookie dell\u2019Agriturismo La Natura a Savigliano. Titolare del trattamento e dati societari.',
    title: 'Privacy e cookie',
    intro:
      'Informativa sul trattamento dei dati personali e sull\u2019uso dei cookie, ai sensi del Regolamento (UE) 2016/679 (GDPR) e della normativa italiana vigente.',
    controllerTitle: 'Titolare del trattamento',
    controllerBody:
      'Il titolare del trattamento dei dati \u00e8 la societ\u00e0 di seguito indicata, che gestisce il sito e l\u2019attivit\u00e0 agrituristica.',
    labels: {
      legalName: 'Denominazione',
      legalForm: 'Forma giuridica',
      registeredOffice: 'Sede legale',
      vat: 'Partita IVA',
      taxCode: 'Codice fiscale',
      rea: 'REA',
      pec: 'PEC',
      representative: 'Rappresentante',
    },
    dataTitle: 'Dati trattati',
    dataBody:
      'Il sito non richiede registrazione n\u00e9 raccoglie dati personali tramite form. Eventuali dati (nome, numero di telefono, messaggio) possono essere comunicati volontariamente tramite telefono o WhatsApp per richieste di prenotazione o informazioni, e sono usati solo per rispondere e gestire il contatto. Non vengono ceduti a terzi per finalit\u00e0 commerciali.',
    cookiesTitle: 'Cookie',
    cookiesBody:
      'Utilizziamo esclusivamente cookie tecnici necessari al funzionamento del sito (ad esempio per memorizzare la preferenza sul banner cookie). Non utilizziamo cookie analitici, di profilazione o di marketing. Non \u00e8 quindi richiesto un consenso specifico per cookie non essenziali.',
    rightsTitle: 'Diritti dell\u2019interessato',
    rightsBody:
      'Puoi esercitare i diritti previsti dagli artt. 15\u201322 GDPR (accesso, rettifica, cancellazione, limitazione, opposizione, portabilit\u00e0) contattando il titolare ai recapiti indicati. Hai inoltre diritto di proporre reclamo al Garante per la protezione dei dati personali.',
    contactTitle: 'Contatti',
    contactBody:
      'Per qualsiasi richiesta relativa alla privacy puoi contattarci telefonicamente o via PEC.',
    updated: 'Ultimo aggiornamento: luglio 2026',
  },
  notFound: {
    metaTitle: 'Pagina non trovata | Agriturismo La Natura',
    metaDescription:
      'La pagina che cerchi non esiste. Torna all\u2019Agriturismo La Natura a Savigliano o scopri il menu.',
    eyebrow: '404',
    title: 'Questa pagina non c\u2019\u00e8',
    body: 'Il sentiero che cercavi non porta da nessuna parte. Torna alla home o scopri il menu.',
    ctaHome: 'Torna alla home',
    ctaMenu: 'Vedi il menu',
  },
  whatsapp: {
    prefill: 'Ciao, vorrei prenotare un tavolo all\u2019Agriturismo La Natura.',
  },
  a11y: {
    skip: 'Vai al contenuto',
    stickyWhatsApp: 'Prenota su WhatsApp',
    languageNav: 'Seleziona lingua',
    mainNav: 'Navigazione principale',
    openMenu: 'Apri menu',
    closeMenu: 'Chiudi menu',
  },
};

export default it;
