# Wie is de Piemel - interactieve conceptdemo

Een premium, responsive salesdemo voor het vrijgezellenfeestspel **Wie is de Piemel**. De site is ontworpen als boutique productpresentatie: stijlvol, speels en ondeugend zonder ordinair te worden.

## Projectdoel

Deze front-end mock-up laat Frederique en andere stakeholders ervaren hoe het product online gepresenteerd en samengesteld kan worden. Het is nog geen webshop en verwerkt geen echte bestellingen of betalingen.

## Onderdelen

- Responsive one-page website voor mobiel, tablet en desktop
- Pakketpresentatie voor Basis Doos, Party Bag en Luxe Bride Bag
- Live pakketconfigurator met uitbreidingen en totaalprijs
- Interactieve gameflow met vier stappen
- Virtuele game-masterdemo in een modal
- Automatische en handmatig bedienbare reviewcarousel
- FAQ-accordion
- Sticky bestelknop op mobiel
- Scrollanimaties met ondersteuning voor `prefers-reduced-motion`
- `noindex`-instelling voor de publieke conceptdemo

## Structuur

```text
.
├── assets/
│   ├── game-master.webp
│   └── product-hero.webp
├── css/
│   └── styles.css
├── js/
│   ├── components/
│   │   ├── configurator.js
│   │   ├── faq.js
│   │   ├── gameFlow.js
│   │   └── reviews.js
│   ├── app.js
│   └── data.js
├── .nojekyll
└── index.html
```

Pakketten, prijzen, uitbreidingen, reviews, gameflow en FAQ staan centraal in `js/data.js`.

## Lokaal starten

Omdat de website JavaScript-modules gebruikt, moet hij via een lokale webserver worden geopend.
Er zijn geen npm-afhankelijkheden nodig.

```bash
python -m http.server 8080
```

Open daarna `http://localhost:8080`.

Een andere statische webserver werkt ook.

De JavaScript-syntax kan worden gecontroleerd met:

```bash
npm run check
```

## Publiceren

De repository is geschikt voor GitHub Pages:

1. Push de bestanden naar `main`.
2. Open **Settings > Pages**.
3. Kies **Deploy from a branch**.
4. Selecteer `main` en de map `/`.

## Toekomstige uitbreidingen

- Echte checkout en betaalprovider
- Voorraad- en verzendbeheer
- CMS voor pakketten en prijzen
- Formulierverwerking en e-mailautomatisering
- Video-hosting voor de virtuele game master
- Echte QR-rondes met sessiestatus
- Personalisatie met naam van de bride-to-be
- Analytics en conversiemeting

## Belangrijk

Alle prijzen, reviews, aantallen en contactgegevens in deze demo zijn conceptinhoud en moeten vóór productie worden gecontroleerd.
