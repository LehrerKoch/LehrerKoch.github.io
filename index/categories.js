const categoriesData = [
  {
    "id": "grundlagen",
    "title": "Grundlagen",
    "title_en": "Basics",
    "icon": "±",
    "iconType": "text",
    "tooltip": "Zahlbereiche, Graphen und die Ansätze rund um Funktionen",
    "tooltip_en": "Number sets, graphs and the standard approaches around functions",
    "cards": ["zahlbereiche", "graphen", "funktionen-ansaetze"]
  },
  {
    "id": "raumUndForm",
    "title": "Flächen und Körper",
    "title_en": "Shapes and Solids",
    "icon": "▱",
    "iconType": "text",
    "tooltip": "Berechnung von Flächen und Körpern, Volumen und Oberflächen, Umrechnen von Einheiten",
    "tooltip_en": "Calculating areas and volumes of shapes and solids, converting units",
    "cards": ["flaechen_erkennen", "flaecheninhalte", "koerper_erkennen","volumen", "groessen_umrechnen"]
  },
  {
    "id": "linear",
    "title": "Lineare Funktionen & Gleichungen",
    "title_en": "Linear Functions & Equations",
    "icon": "=",
    "iconType": "text",
    "tooltip": "Lineare Funktionen, Gleichungen und Gleichungssysteme",
    "tooltip_en": "Linear functions, equations and systems of linear equations",
    "cards": ["waage", "lgs"]
  },
  {
    "id": "quadratisch",
    "title": "Quadratische Funktionen",
    "title_en": "Quadratic Functions",
    "icon": "svg:parabola",
    "iconType": "svg",
    "tooltip": "Quadratische Funktionen, Scheitelpunktform und p-q-Formel",
    "tooltip_en": "Quadratic functions, vertex form and the p-q formula",
    "cards": ["scheitelpunktform", "geo-scheitelpunkt", 
      "quadratische-gleichungen"
      // "pq"
    ]
  },
  {
    "id": "potenzen",
    "title": "Potenzen, Potenzgesetze &amp; Wurzeln",
    "title_en": "Powers, Power Rules &amp; Roots",
    "icon": "ⁿ√",
    "iconType": "text",
    "tooltip": "Potenzgesetze, Wurzelgesetze und ihre Anwendungen",
    "tooltip_en": "Power rules, root rules and their applications",
    "cards": ["potenzen", "sciNot", "potenzgesetze"]
  },
  {
    "id": "polynome",
    "title": "Polynome &amp; Potenzfunktionen",
    "title_en": "Polynomials &amp; Power Functions",
    "icon": "svg:polynomial",
    "iconType": "svg",
    "tooltip": "Polynome, Potenzfunktionen und ihr Grenzverhalten",
    "tooltip_en": "Polynomials, power functions and their end behaviour",
    "cards": ["polynomgrad", "geo-potparam", "symmetrie", "grenzverhalten-poly", "polynom-reko"]
  },
  {
    "id": "gleichungen",
    "title": "Polynomgleichungen lösen",
    "title_en": "Solving Polynomial Equations",
    "icon": "svg:wurzel",
    "iconType": "svg",
    "tooltip": "Potenz-, quadratische und höhere Gleichungen Schritt für Schritt lösen",
    "tooltip_en": "Solving power, quadratic and higher-degree equations step by step",
    "cards": ["gleichungart", "quadratische-gleichungen", "potenzgleichungen", "nullprodukt", "ausklammern", "biquadratische-gleichungen", "nullstelle-raten"]
  },
  {
    "id": "ableitungen",
    "title": "Differentialrechnung &amp; Ableitungen",
    "title_en": "Differential Calculus &amp; Derivatives",
    "icon": "∂",
    "iconType": "text",
    "tooltip": "Ableitungsregeln von der Potenzregel bis zur Ketten- und Produktregel",
    "tooltip_en": "Differentiation rules from the power rule to the chain and product rules",
    "cards": ["polynom-ableitung", "steigung_tangenten", "extremstellen", "wendestellen", "ableitungen", "kettenregel", "produktregel", ]
  },
  {
    "id": "efkt",
    "title": "e-Funktion",
    "title_en": "Exponential Function",
    "icon": "ℯ",
    "iconType": "text",
    "tooltip": "Natürliche Exponentialfunktion: Ableitung und Grenzverhalten",
    "tooltip_en": "Natural exponential function: derivative and end behaviour",
    "cards": ["e-fkt", "grenzverhalten-e"]
  },
  {
    "id": "integral",
    "title": "Integralrechnung",
    "title_en": "Integral Calculus",
    "icon": "∫",
    "iconType": "text",
    "tooltip": "Stammfunktionen und bestimmte Integrale von Polynomen",
    "tooltip_en": "Antiderivatives and definite integrals of polynomials",
    "cards": ["integral", "bestimmtes-integral", "geo-integral", "aufg-flaechen-integrale", "aufg-schnittflaechen-integrale"]
  },
  {
    "id": "vec",
    "title": "Vektoren",
    "title_en": "Vectors",
    "icon": "↗",
    "iconType": "text",
    "tooltip": "Vektoren im 2D- und 3D-Koordinatensystem, Basistransformation",
    "tooltip_en": "Vectors in 2D and 3D coordinate systems, change of basis",
    "cards": ["koordinatensystem3d", "vektoren_grundlagen", "skalar_kreuzprodukt", "geraden_grundlagen", "lage_gerade_gerade", "ebenen_grundlagen", "lage_gerade_ebene", "lage_ebene_ebene", "abstaende", "analytische_geometrie", 
      // "geo-3DKoord", 
      "geo-koBasis"]
  },
  {
    "id": "trig",
    "title": "Trigonometrie",
    "title_en": "Trigonometry",
    "icon": "△",
    "iconType": "text",
    "tooltip": "Trigonometrie im rechtwinkligen und beliebigen Dreieck",
    "tooltip_en": "Trigonometry in right-angled and general triangles",
    "cards": ["kongruenzsatz", "seiten-benennung", "trig-aufstellen", "trigonometrie", "sinuskosinussatz"]
  },
  {
    "id": "trigfunc",
    "title": "Trigonometrische Funktionen",
    "title_en": "Trigonometric Functions",
    "icon": "∿",
    "iconType": "text",
    "tooltip": "Sinusfunktion, Arkussinus und ihre Parameter visualisieren",
    "tooltip_en": "Visualise the sine function, arcsine and their parameters",
    "cards": ["geo-sinus-herleitung", "geo-arkussinus", "geo-sinus-ablesen", "geo-sinus-veraendern", "geo-parameter-einheit", "sinus-toene", "geo-fourier"]
  },
  {
    "id": "stochastik",
    "title": "Stochastik",
    "title_en": "Probability &amp; Statistics",
    "icon": "🎲",
    "iconType": "text",
    "tooltip": "Wahrscheinlichkeitsrechnung, Kombinatorik und Statistik",
    "tooltip_en": "Probability, combinatorics and statistics",
    "cards": ["differenz_trifft", "ziegenproblem", "baumdiagramm_auswahl", "vierfeldertafel"]
  },
  {
    "id": "mathematik-sonstiges",
    "title": "Mathematik-Sonstiges",
    "title_en": "Other Maths Topics",
    "icon": "🔢",
    "iconType": "emoji",
    "tooltip": "Weitere mathematische Themen",
    "tooltip_en": "More mathematical topics",
    "cards": ["studiengaenge"]
  },
  {
    "id": "informatik",
    "title": "Informatik",
    "title_en": "Computer Science",
    "icon": "💻",
    "iconType": "emoji",
    "tooltip": "Informatik-Themen: Binärzahlen, Kryptographie und mehr",
    "tooltip_en": "Computer science topics: binary numbers, cryptography and more",
    "cards": ["binary", "rsa", "RAM", "annoinformatica"]
  },
  {
    "id": "ki",
    "title": "Künstliche Intelligenz",
    "title_en": "Artificial Intelligence",
    "icon": "🤖",
    "iconType": "emoji",
    "tooltip": "Grundlagen der Künstlichen Intelligenz",
    "tooltip_en": "Foundations of artificial intelligence",
    "cards": ["supervised-learning","unsupervised-learning"]
  },
  {
    "id": "sprachen",
    "title": "Sprachen",
    "title_en": "Languages",
    "icon": "🌐",
    "iconType": "emoji",
    "tooltip": "Griechische, hebräische und kyrillische Schriftsysteme erlernen",
    "tooltip_en": "Learn the Greek, Hebrew and Cyrillic writing systems",
    "cards": ["buchstaben-trainer", "schrift-trainer"]
  },
  {
    "id": "spiele",
    "title": "Spiele",
    "title_en": "Games",
    "icon": "🕹️",
    "iconType": "emoji",
    "tooltip": "Spielerische mathematische Aktivitäten",
    "tooltip_en": "Playful mathematical activities",
    "cards": ["annomathematica", "trio", "differenz_trifft", "ziegenproblem", "zendo", "geographie"]
  }
];