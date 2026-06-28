export const packages = [
  {
    id: "basis",
    name: "Basis Doos",
    price: 199,
    eyebrow: "Compact & compleet",
    description: "Alles voor een hilarische avond op één locatie.",
    image: "assets/product-real.webp",
    imageAlt: "Geopende Basis Doos met houten PieMol tokens",
    features: [
      "Spelmateriaal thuisbezorgd",
      "QR-spelrondes",
      "Opdrachtkaarten",
      "Scorekaarten",
      "Direct speelbaar",
    ],
  },
  {
    id: "party",
    name: "Party Bag",
    price: 249,
    eyebrow: "Meest gekozen",
    featured: true,
    description: "Georganiseerd, draagbaar en klaar voor jullie route.",
    image: "assets/game-board.webp",
    imageAlt: "Overzicht van spelrondes en opdrachten uit de Bridal Edition",
    features: [
      "Alles uit Basis",
      "Stijlvolle meeneemtas",
      "Handige vakjes per spelronde",
      "Ideaal voor stad, hotel of restaurant",
    ],
  },
  {
    id: "luxe",
    name: "Luxe Bride Bag",
    price: 299,
    eyebrow: "The full experience",
    description: "De premium uitvoering en meteen een cadeau voor de bride-to-be.",
    image: "assets/tokens-real.webp",
    imageAlt: "Houten PieMol tokens uit het luxe spelpakket",
    features: [
      "Alles uit Party Bag",
      "Chiquere tas",
      "Extra spelaccessoires",
      "Premium uitstraling",
      "Leuk als cadeau",
    ],
  },
];

export const addons = [
  { id: "cocktail", name: "Cocktail Challenge", price: 29, icon: "◇" },
  { id: "bride", name: "Bride-to-be bonusronde", price: 35, icon: "♕" },
  { id: "qr", name: "Extra QR-ronde", price: 25, icon: "⌗" },
  { id: "photo", name: "Fotomissie pakket", price: 29, icon: "◎" },
  { id: "score", name: "Luxe scorekaarten", price: 19, icon: "✦" },
  { id: "personal", name: "Gepersonaliseerde tas", price: 49, icon: "✎" },
  { id: "mystery", name: "Mystery enveloppen", price: 24, icon: "✉" },
  { id: "tasks", name: "Extra opdrachtenpakket", price: 27, icon: "?" },
];

export const gameSteps = [
  {
    number: "01",
    title: "Pakket ontvangen",
    text: "Alles arriveert georganiseerd per spelronde. Open alleen wat de game master aangeeft.",
    icon: "▣",
  },
  {
    number: "02",
    title: "QR-code scannen",
    text: "Eén scan opent de volgende ronde. Geen app, account of voorbereiding nodig.",
    icon: "⌗",
  },
  {
    number: "03",
    title: "Game master starten",
    text: "Jullie digitale host legt de opdracht uit en zet meteen de juiste sfeer.",
    icon: "▷",
  },
  {
    number: "04",
    title: "Nieuwe plek, nieuwe missie",
    text: "Ga door wanneer jullie willen en verzamel hints tot de grote ontmaskering.",
    icon: "✦",
  },
];

export const reviews = [
  {
    quote: "We hebben zó hard gelachen. Ideaal dat alles gewoon in één pakket zat.",
    name: "Lisa",
    city: "Amsterdam",
    package: "Party Bag",
  },
  {
    quote: "De QR-rondes maakten het supermakkelijk. Niemand hoefde het spel uit te leggen.",
    name: "Sophie",
    city: "Utrecht",
    package: "Basis Doos",
  },
  {
    quote: "De tas was echt handig onderweg. Alles bleef netjes per ronde gesorteerd.",
    name: "Kim",
    city: "Rotterdam",
    package: "Luxe Bride Bag",
  },
];

export const faqs = [
  {
    question: "Kun je het spel overal spelen?",
    answer: "Ja. Het pakket is gemaakt voor thuis, een hotel, restaurant, borrelroute of een weekendje weg. Een vaste speellocatie is niet nodig.",
  },
  {
    question: "Hoe lang duurt het spel?",
    answer: "Reken op ongeveer twee tot vier uur. Jullie bepalen zelf het tempo en kunnen tussen de rondes pauzeren.",
  },
  {
    question: "Hebben we begeleiding nodig?",
    answer: "Nee. De virtuele game master introduceert iedere ronde en legt de opdrachten duidelijk uit.",
  },
  {
    question: "Wat zit er in het pakket?",
    answer: "QR-kaarten, opdrachten, scorekaarten, spelaccessoires en een duidelijke indeling per ronde. De precieze inhoud verschilt per pakket.",
  },
  {
    question: "Kan het pakket gepersonaliseerd worden?",
    answer: "Ja. Denk aan een persoonlijke tas, extra bride-to-be ronde en opdrachten die aansluiten bij jullie groep.",
  },
  {
    question: "Hoe werkt de virtuele game master?",
    answer: "Na het scannen opent een mobiele spelpagina. De game master geeft uitleg, deelt hints en vertelt wanneer de volgende envelop open mag.",
  },
];
