# SegmaSirra — Sito Web

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=flat&logo=three.js&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=flat&logo=greensock&logoColor=black)
![License](https://img.shields.io/badge/license-MIT-green?style=flat)

Sito vetrina per **SegmaSirra**, un progetto di serra automatizzata con monitoraggio intelligente delle piante.

> ⚠️ Questa repository contiene **solo il sito web**. Il codice del progetto della serra si trova in una repository separata.

## Struttura

```
SegmaSito/
├── index.html        # Homepage
├── features.html     # Pagina delle funzionalità
├── team.html         # Pagina del team
├── contact.html      # Contatti e FAQ
├── download.html     # Pagina di download dell'app
├── style.css         # Stile globale
├── script.js         # Logica principale (animazioni, Three.js, GSAP)
├── cursor.js         # Cursore personalizzato
├── images/           # Immagini e loghi
├── videos/           # Video di sfondo
└── files/            # File scaricabili
```

## Pagine

- **Home** — Hero con animazione canvas, statistiche (uptime, sensori, monitoraggio 24/7) e anteprima delle funzionalità
- **Features** — Dettaglio delle funzionalità: controllo clima, irrigazione smart, analytics, notifiche
- **Team** — Presentazione dei membri del team
- **Contatti / FAQ** — Modulo contatti e domande frequenti
- **Download** — Link per scaricare l'app SegmaSirra

## Tecnologie

- HTML, CSS, JavaScript vanilla
- [Three.js](https://threejs.org/) — animazione 3D sulla homepage
- [GSAP](https://gsap.com/) + ScrollTrigger — animazioni scroll

## Avvio locale

Essendo un sito statico, basta aprire `index.html` nel browser oppure usare un server locale:

```bash
npx serve .
# oppure
python -m http.server
```

## Licenza

MIT © 2026 Dragonyx
