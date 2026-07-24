import type { Dictionary } from './types';
import { BUSINESS_HOURS } from '../data/business';

const fr: Dictionary = {
  meta: {
    title: 'La Natura Agritourisme | Savigliano, Piémont',
    description:
      'Cuisine de campagne \u00e0 Savigliano\u00a0: potager, viande italienne et accueil d\u2019Alfred et Silvana. R\u00e9servez pour le d\u00e9jeuner ou le d\u00eener.',
  },
  nav: {
    call: 'Appeler',
    whatsapp: 'WhatsApp',
    home: 'Accueil',
    menu: 'Menu',
    cucina: 'Cuisine',
    luogo: 'Le lieu',
    info: 'Infos',
  },
  hero: {
    brand: 'La Natura',
    headline: 'Cuisine de campagne \u00e0 Savigliano',
    support:
      'Saveurs pi\u00e9montaises, potager et viande italienne. R\u00e9servez votre table.',
    ctaCall: 'Appeler',
    ctaWhatsApp: 'R\u00e9server sur WhatsApp',
  },
  cucina: {
    title: 'Du potager \u00e0 l\u2019assiette',
    body: 'Nous cuisinons avec ce que la terre nous offre et uniquement de la viande italienne\u00a0: plats authentiques, fumages et desserts comme le cheesecake aux herbes de notre potager. Une saveur de campagne, sans h\u00e2te.',
    imageAlt: 'Table dress\u00e9e avec des plats de cuisine pi\u00e9montaise',
  },
  luogo: {
    title: 'Un jardin pour se retrouver',
    body: 'Entre Savigliano et la campagne de Cuneo, Alfred et Silvana vous accueillent dans un agriturismo avec jardin et espaces pour les enfants. Lumi\u00e8re, verdure et tables conviviales.',
    imageAlt: 'Jardin de l\u2019Agriturismo La Natura',
  },
  menu: {
    metaTitle: 'Menu | Agriturismo La Natura',
    metaDescription:
      'Formule d\u00e9jeuner et menu complet de l\u2019Agriturismo La Natura \u00e0 Savigliano. Eau et couvert offerts.',
    title: 'Le menu',
    intro:
      'Toutes nos propositions à la carte, de la cuisine de campagne aux vins du terroir.',
    lunchTitle: 'Formule d\u00e9jeuner',
    lunchPrice: '13\u00a0\u20ac',
    lunchDays: 'Du lundi au samedi',
    lunchItems: [
      'Entr\u00e9e',
      'Plat de p\u00e2tes',
      'Plat principal',
      'Dessert',
      'Caf\u00e9',
      '1/4 de vin',
      'Eau',
    ],
    coverNote: 'Eau et couvert offerts.',
    categories: {
      antipasti: 'Entr\u00e9es',
      primi_piatti: 'Premiers plats',
      primi_di_pesce: 'Premiers plats de poisson',
      secondi_piatti: 'Plats principaux',
      contorni: 'Accompagnements',
      dolci: 'Desserts',
      bibite_in_lattina: 'Boissons en canette',
      birre_in_bottiglia: 'Bi\u00e8res en bouteille',
      vino_sfuso: 'Vin de la maison au verre (blanc/rouge)',
      vini: 'Nos vins',
      digestivi: 'Digestifs',
      caffe: 'Caf\u00e9',
    },
    notes: ['* Produit surgel\u00e9', 'Toute notre viande est locale (Km 0)'],
  },
  info: {
    title: 'Infos et r\u00e9servations',
    hoursLabel: 'Horaires',
    hours: `D\u00e9jeuner ${BUSINESS_HOURS.lunch.opens}\u2013${BUSINESS_HOURS.lunch.closes}\nD\u00eener ${BUSINESS_HOURS.dinner.opens}\u2013${BUSINESS_HOURS.dinner.closesDisplay}\nFerm\u00e9 le mardi soir`,
    bookingLabel: 'R\u00e9servations',
    booking: '\u00c0 partir de 5 personnes',
    coverLabel: 'Eau et couvert',
    cover: 'Offerts',
    priceLabel: 'Tarifs',
    price: 'Formule d\u00e9jeuner 13\u00a0\u20ac\nD\u00eener 20\u201330\u00a0\u20ac par personne',
    addressLabel: 'O\u00f9 nous trouver',
    mapCta: 'Ouvrir dans Google Maps',
    mapTitle: 'Carte',
    phoneLabel: 'Tél',
  },
  footer: {
    rights: 'Agriturismo La Natura \u00b7 Savigliano',
    follow: 'Suivez-nous',
    credit: 'Site cr\u00e9\u00e9 par',
    creditLinkLabel: 'Bitora',
    vat: 'N\u00b0 TVA',
    privacy: 'Confidentialit\u00e9',
  },
  cookies: {
    title: 'Cookies',
    body: 'Ce site utilise uniquement des cookies techniques n\u00e9cessaires \u00e0 son fonctionnement. Aucun cookie de profilage ou marketing.',
    accept: 'J\u2019ai compris',
    policyLink: 'Confidentialit\u00e9 et cookies',
  },
  privacy: {
    metaTitle: 'Confidentialit\u00e9 et cookies | Agriturismo La Natura',
    metaDescription:
      'Politique de confidentialit\u00e9 et cookies de l\u2019Agriturismo La Natura \u00e0 Savigliano. Responsable du traitement et donn\u00e9es soci\u00e9taires.',
    title: 'Confidentialit\u00e9 et cookies',
    intro:
      'Information sur le traitement des donn\u00e9es personnelles et l\u2019utilisation des cookies conform\u00e9ment au r\u00e8glement (UE) 2016/679 (RGPD) et \u00e0 la loi italienne applicable.',
    controllerTitle: 'Responsable du traitement',
    controllerBody:
      'Le responsable du traitement est la soci\u00e9t\u00e9 indiqu\u00e9e ci-dessous, qui g\u00e8re ce site et l\u2019activit\u00e9 d\u2019agritourisme.',
    labels: {
      legalName: 'D\u00e9nomination',
      legalForm: 'Forme juridique',
      registeredOffice: 'Si\u00e8ge social',
      vat: 'N\u00b0 de TVA',
      taxCode: 'Code fiscal',
      rea: 'REA',
      pec: 'Courriel certifi\u00e9 (PEC)',
      representative: 'Repr\u00e9sentant',
    },
    dataTitle: 'Donn\u00e9es trait\u00e9es',
    dataBody:
      'Ce site ne n\u00e9cessite pas d\u2019inscription et ne collecte pas de donn\u00e9es personnelles via des formulaires. Les informations (nom, t\u00e9l\u00e9phone, message) que vous communiquez volontairement par t\u00e9l\u00e9phone ou WhatsApp pour une r\u00e9servation ou une demande sont utilis\u00e9es uniquement pour r\u00e9pondre et g\u00e9rer le contact. Elles ne sont pas c\u00e9d\u00e9es \u00e0 des tiers \u00e0 des fins commerciales.',
    cookiesTitle: 'Cookies',
    cookiesBody:
      'Nous utilisons uniquement des cookies techniques n\u00e9cessaires au fonctionnement du site (par exemple pour m\u00e9moriser votre pr\u00e9f\u00e9rence concernant la banni\u00e8re cookies). Nous n\u2019utilisons pas de cookies analytiques, de profilage ou marketing. Un consentement sp\u00e9cifique pour des cookies non essentiels n\u2019est donc pas requis.',
    rightsTitle: 'Vos droits',
    rightsBody:
      'Vous pouvez exercer les droits pr\u00e9vus aux articles 15 \u00e0 22 du RGPD (acc\u00e8s, rectification, effacement, limitation, opposition, portabilit\u00e9) en contactant le responsable aux coordonn\u00e9es indiqu\u00e9es. Vous pouvez \u00e9galement d\u00e9poser une r\u00e9clamation aupr\u00e8s de l\u2019autorit\u00e9 italienne de protection des donn\u00e9es (Garante).',
    contactTitle: 'Contact',
    contactBody:
      'Pour toute demande relative \u00e0 la confidentialit\u00e9, contactez-nous par t\u00e9l\u00e9phone ou par courriel certifi\u00e9 (PEC).',
    updated: 'Derni\u00e8re mise \u00e0 jour : juillet 2026',
  },
  whatsapp: {
    prefill: 'Bonjour, je souhaite r\u00e9server une table \u00e0 l\u2019Agriturismo La Natura.',
  },
  a11y: {
    skip: 'Aller au contenu',
    stickyWhatsApp: 'R\u00e9server sur WhatsApp',
    languageNav: 'Choisir la langue',
    mainNav: 'Navigation principale',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
  },
};

export default fr;
