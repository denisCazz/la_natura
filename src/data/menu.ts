export type MenuProduct = {
  nome: string;
  prezzo: number;
  descrizione?: string;
  formato?: string;
  cantina?: string;
  tipologie?: string[];
  surgelato?: boolean;
};

export type MenuCategory = {
  id: string;
  nome: string;
  prodotti: MenuProduct[];
};

export type MenuNote = {
  simbolo?: string;
  testo: string;
};

export type MenuData = {
  locale: { nome: string; tipologia: string };
  valuta: string;
  coperto: { prezzo: number; descrizione: string };
  note: MenuNote[];
  categorie: MenuCategory[];
};

export const menu: MenuData = {
  locale: {
    nome: 'La Natura',
    tipologia: 'Agriturismo',
  },
  valuta: 'EUR',
  coperto: {
    prezzo: 0,
    descrizione: 'Coperto e acqua offerti dalla casa',
  },
  note: [
    { simbolo: '*', testo: 'Prodotto surgelato' },
    { testo: 'Tutta la nostra carne è Km 0' },
  ],
  categorie: [
    {
      id: 'antipasti',
      nome: 'Antipasti',
      prodotti: [
        { nome: 'Vitello Tonnato cotto a bassa temperatura', prezzo: 9.0 },
        { nome: 'Battuta al coltello con rucola e scaglie di grana', prezzo: 10.0 },
        { nome: 'Peperoni al forno con bagnetto verde', prezzo: 8.0 },
        { nome: 'Flan di verdure con Bagna Cauda', prezzo: 8.0 },
        {
          nome: 'Antipasto misto',
          descrizione: 'Vitello tonnato, Battuta, Peperoni e Flan',
          prezzo: 15.0,
        },
        { nome: 'Tagliere di salumi e formaggi', prezzo: 15.0 },
      ],
    },
    {
      id: 'primi_piatti',
      nome: 'Primi piatti',
      prodotti: [
        { nome: 'Gnocchi di patate al Castelmagno', prezzo: 9.0 },
        { nome: 'Gnocchi alla Sorrentina', prezzo: 9.0 },
        { nome: 'Risotto del giorno', prezzo: 12.0 },
        { nome: 'Penne Pancetta Panna e Zafferano', prezzo: 8.0 },
        { nome: 'Tagliatelle al Ragù di carne', prezzo: 9.0 },
        { nome: 'Penne all’Arrabbiata', prezzo: 8.0 },
        { nome: 'Spaghetti Aglio Olio e Peperoncino', prezzo: 8.0 },
        { nome: 'Spaghetti alla Carbonara', prezzo: 8.0 },
      ],
    },
    {
      id: 'primi_di_pesce',
      nome: 'Primi di pesce',
      prodotti: [
        { nome: 'Risotto ai Frutti di mare', prezzo: 13.0, surgelato: true },
        { nome: 'Penne al Salmone', prezzo: 10.0, surgelato: false },
        { nome: 'Paccheri Gamberetti e Zucchine', prezzo: 10.0, surgelato: true },
        { nome: 'Spaghetti allo Scoglio', prezzo: 12.0, surgelato: true },
        { nome: 'Linguine all’Astice', prezzo: 16.0, surgelato: true },
      ],
    },
    {
      id: 'secondi_piatti',
      nome: 'Secondi piatti',
      prodotti: [
        { nome: 'Tagliata di Fassona con contorno', prezzo: 16.0 },
        { nome: 'Grigliata mista con contorno', prezzo: 18.0 },
        { nome: 'Filetto al pepe verde', prezzo: 18.0 },
        { nome: 'Filetto al Blue di Cuneo', prezzo: 18.0 },
        { nome: 'Sottofiletto alla griglia con contorno', prezzo: 15.0 },
        { nome: 'Milanese di vitello con contorno', prezzo: 10.0 },
        {
          nome: 'Hamburger',
          descrizione: 'Bacon, formaggio, uovo fritto, insalata e pomodoro',
          prezzo: 12.0,
        },
        {
          nome: 'Costata alla griglia',
          descrizione: 'Da 700 g in su, con contorno, su ordinazione',
          prezzo: 25.0,
        },
        { nome: 'Fritto misto di Pesce', prezzo: 16.0, surgelato: true },
      ],
    },
    {
      id: 'contorni',
      nome: 'Contorni',
      prodotti: [
        { nome: 'Patate al forno', prezzo: 3.0 },
        { nome: 'Insalata mista', prezzo: 3.0 },
        { nome: 'Verdure grigliate', prezzo: 3.0 },
      ],
    },
    {
      id: 'dolci',
      nome: 'Dolci',
      prodotti: [{ nome: 'Dolce della casa', prezzo: 4.0 }],
    },
    {
      id: 'bibite_in_lattina',
      nome: 'Bibite in lattina',
      prodotti: [
        { nome: 'Coca Cola', prezzo: 3.0 },
        { nome: 'Fanta', prezzo: 3.0 },
        { nome: 'Tè al limone', prezzo: 3.0 },
        { nome: 'Tè alla pesca', prezzo: 3.0 },
        { nome: 'Lemon Soda', prezzo: 3.0 },
      ],
    },
    {
      id: 'birre_in_bottiglia',
      nome: 'Birre in bottiglia',
      prodotti: [
        { nome: 'Birra Moretti', formato: '66 cl', prezzo: 3.5 },
        { nome: 'Birra Moretti', formato: '33 cl', prezzo: 3.0 },
      ],
    },
    {
      id: 'vino_sfuso',
      nome: 'Vino sfuso della casa bianco/rosso',
      prodotti: [
        {
          nome: 'Vino sfuso della casa',
          tipologie: ['Bianco', 'Rosso'],
          formato: '1/4 l',
          prezzo: 3.0,
        },
        {
          nome: 'Vino sfuso della casa',
          tipologie: ['Bianco', 'Rosso'],
          formato: '1/2 l',
          prezzo: 4.5,
        },
        {
          nome: 'Vino sfuso della casa',
          tipologie: ['Bianco', 'Rosso'],
          formato: '0,75 l',
          prezzo: 6.5,
        },
      ],
    },
    {
      id: 'vini',
      nome: 'I nostri vini',
      prodotti: [
        {
          nome: 'Barbera d’Alba',
          cantina: 'Cantina Bosco',
          descrizione: 'Senza solfiti',
          prezzo: 14.0,
        },
        { nome: 'Barbera d’Alba Superiore', cantina: 'Cantina Bosco', prezzo: 16.0 },
        { nome: 'Nebbiolo d’Alba', cantina: 'Cantina Bosco', prezzo: 16.0 },
        { nome: 'Roero DOCG', cantina: 'Cantina Bosco', prezzo: 18.0 },
        { nome: 'Roero Riserva Rosso', cantina: 'Cantina Bosco', prezzo: 22.0 },
        { nome: 'Roero Arneis', cantina: 'Cantina Bosco', prezzo: 14.0 },
        { nome: 'Prosecco Extra Dry', cantina: 'Borgo Molino', prezzo: 14.0 },
      ],
    },
    {
      id: 'digestivi',
      nome: 'Digestivi',
      prodotti: [{ nome: 'Digestivo', prezzo: 2.0 }],
    },
    {
      id: 'caffe',
      nome: 'Caffè',
      prodotti: [{ nome: 'Caffè', prezzo: 1.2 }],
    },
  ],
};
