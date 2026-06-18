const categoriesData = [
  {
    "id": "grundlagen",
    "title": "Grundlagen &amp; Algebra",
    "icon": "±",
    "iconType": "text",
    "tooltip": "Grundlegende Algebra, Gleichungen und Gleichungssysteme",
    "cards": ["potenzen", ,"sciNot", "zahlbereiche", "graphen", "gleichungart", "lgs"]
  },
  {
    "id": "quadratisch",
    "title": "Quadratische Funktionen",
    "icon": "svg:parabola",
    "iconType": "svg",
    "tooltip": "Quadratische Funktionen, Scheitelpunktform und p-q-Formel",
    "cards": ["scheitelpunktform", "geo-scheitelpunkt", "pq"]
  },
  {
    "id": "polynome",
    "title": "Polynome &amp; Potenzfunktionen",
    "icon": "svg:polynomial",
    "iconType": "svg",
    "tooltip": "Polynome, Potenzfunktionen und ihr Grenzverhalten",
    "cards": ["geo-potparam", "geo-koSymm", "grenzverhalten-poly", "polynom-reko"]
  },
  {
    "id": "ableitungen",
    "title": "Differentialrechnung &amp; Ableitungen",
    "icon": "∂",
    "iconType": "text",
    "tooltip": "Ableitungsregeln von der Potenzregel bis zur Ketten- und Produktregel",
    "cards": ["polynom-ableitung", "ableitungen", "kettenregel", "produktregel"]
  },
  {
    "id": "efkt",
    "title": "e-Funktion",
    "icon": "ℯ",
    "iconType": "text",
    "tooltip": "Natürliche Exponentialfunktion: Ableitung und Grenzverhalten",
    "cards": ["e-fkt", "grenzverhalten-e"]
  },
  {
    "id": "integral",
    "title": "Integralrechnung",
    "icon": "∫",
    "iconType": "text",
    "tooltip": "Stammfunktionen und bestimmte Integrale von Polynomen",
    "cards": ["integral", "bestimmtes-integral", "geo-integral", "aufg-flaechen-integrale", "aufg-schnittflaechen-integrale"]
  },
  {
    "id": "vec",
    "title": "Vektoren",
    "icon": "↗",
    "iconType": "text",
    "tooltip": "Vektoren im 2D- und 3D-Koordinatensystem, Basistransformation",
    "cards": ["geo-3DKoord", "geo-koBasis"]
  },
  {
    "id": "trig",
    "title": "Trigonometrie",
    "icon": "△",
    "iconType": "text",
    "tooltip": "Trigonometrie im rechtwinkligen und beliebigen Dreieck",
    "cards": ["kongruenzsatz", "seiten-benennung", "trig-aufstellen", "trigonometrie", "sinuskosinussatz"]
  },
  {
    "id": "trigfunc",
    "title": "Trigonometrische Funktionen",
    "icon": "∿",
    "iconType": "text",
    "tooltip": "Sinusfunktion, Arkussinus und ihre Parameter visualisieren",
    "cards": ["geo-sinus-herleitung", "geo-arkussinus", "geo-sinus-ablesen", "geo-sinus-veraendern", , "geo-parameter-einheit", "sinus-toene", "geo-fourier"]
  },
  {
    "id": "stochastik",
    "title": "Stochastik",
    "icon": "🎲",
    "iconType": "text",
    "tooltip": "Wahrscheinlichkeitsrechnung, Kombinatorik und Statistik",
    "cards": ["differenz_trifft", "baumdiagramm_auswahl", "vierfeldertafel"]
  },
  {
    "id": "mathematik-sonstiges",
    "title": "Mathematik-Sonstiges",
    "icon": "🔢",
    "iconType": "emoji",
    "tooltip": "Weitere mathematische Themen",
    "cards": ["studiengaenge"]
  },
  {
    "id": "informatik",
    "title": "Informatik",
    "icon": "💻",
    "iconType": "emoji",
    "tooltip": "Informatik-Themen: Binärzahlen, Kryptographie und mehr",
    "cards": ["binary", "rsa", "RAM", "annoinformatica"]
  },
  {
    "id": "ki",
    "title": "Künstliche Intelligenz",
    "icon": "🤖",
    "iconType": "emoji",
    "tooltip": "Grundlagen der Künstlichen Intelligenz",
    "cards": ["unsupervised-learning"]
  },
  {
    "id": "sprachen",
    "title": "Sprachen",
    "icon": "🌐",
    "iconType": "emoji",
    "tooltip": "Griechische, hebräische und kyrillische Schriftsysteme erlernen",
    "cards": ["buchstaben-trainer", "schrift-trainer"]
  },
  {
    "id": "spiele",
    "title": "Spiele",
    "icon": "🕹️",
    "iconType": "emoji",
    "tooltip": "Spielerische mathematische Aktivitäten",
    "cards": ["annomathematica","trio", "differenz_trifft"]
  }
];