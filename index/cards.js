const cardsData = [
  {
    "id": "potenzen",
    "title": "Quadratzahlen, Potenzen und Wurzeln",
    "desc": "Übe Quadratzahlen, andere Potenzen und Wurzeln",
    "types": ["flash", "quiz"],
    "mobilefriendly": true,
    "link": "potenzen.html"
  },
  {
    "id": "gleichungart",
    "title": "Gleichungsart erkennen",
    "desc": "Welche Gleichungsart liegt vor und wie löst man sie?",
    "types": ["quiz"],
    "mobilefriendly": true,
    "link": "gleichungart.html"
  },
  {
    "id": "lgs",
    "title": "Lineares Gleichungssystem",
    "desc": "LGS mit 2 oder 3 Gleichungen lösen",
    "types": ["learn"],
    "mobilefriendly": true,
    "link": "lgs.html"
  },
  {
    "id": "scheitelpunktform",
    "title": "Scheitelpunktform",
    "desc": "Umwandeln der Scheitelpunktform üben",
    "types": ["learn"],
    "mobilefriendly": true,
    "link": "scheitelpunktform.html"
  },
  {
    "id": "geo-scheitelpunkt",
    "title": "GeoGebra: Quadratische Funktionen ablesen/einzeichnen",
    "desc": "Ablesen und Einzeichnen in Scheitelpunktform",
    "types": ["geo"],
    "mobilefriendly": false,
    "link": "https://t1p.de/geogebraScheitelpunkt"
  },
  {
    "id": "pq",
    "title": "pq-Formel",
    "desc": "Anwendung der p-q-Formel trainieren",
    "types": ["learn"],
    "mobilefriendly": true,
    "link": "pq.html"
  },
  {
    "id": "geo-potparam",
    "title": "GeoGebra: Potenzfunktionen Ablesen/Einzeichnen",
    "desc": "Ablesen/Einzeichnen lineartransformierter Potenzfunktionen",
    "types": ["geo"],
    "mobilefriendly": false,
    "link": "https://t1p.de/potparam"
  },
  {
    "id": "geo-koSymm",
    "title": "GeoGebra: Symmetrie bei Polynomen",
    "desc": "Symmetrie am Graphen oder der Funktionsgleichung erkennen",
    "types": ["geo"],
    "mobilefriendly": false,
    "link": "https://t1p.de/koSymm"
  },
  {
    "id": "grenzverhalten-poly",
    "title": "Grenzverhalten von Polynomen",
    "desc": "Grenzverhalten von Polynomen und Potenzfunktionen bestimmen",
    "types": ["quiz"],
    "mobilefriendly": true,
    "link": "grenzverhalten-poly.html"
  },
  {
    "id": "polynom-ableitung",
    "title": "Polynome ableiten",
    "desc": "Ableitungen von Polynomen und Potenzfunktionen",
    "types": ["learn"],
    "mobilefriendly": true,
    "link": "polynom-ableitung.html"
  },
  {
    "id": "ableitungen",
    "title": "Weitere Ableitungen",
    "desc": "Ableitungen weiterer Standardfunktionen festigen",
    "types": ["flash"],
    "mobilefriendly": true,
    "link": "ableitungen.html"
  },
  {
    "id": "kettenregel",
    "title": "Kettenregel",
    "desc": "Kettenregel sicher anwenden",
    "types": ["learn"],
    "mobilefriendly": true,
    "link": "kettenregel.html"
  },
  {
    "id": "produktregel",
    "title": "Produktregel",
    "desc": "Produktregel sicher anwenden",
    "types": ["learn"],
    "mobilefriendly": true,
    "link": "produktregel.html"
  },
  {
    "id": "e-fkt",
    "title": "e-Funktion ableiten &amp; zusammenfassen",
    "desc": "Ableiten der e-Funktion und Terme zusammenfassen",
    "types": ["learn"],
    "mobilefriendly": true,
    "link": "e-fkt.html"
  },
  {
    "id": "grenzverhalten-e",
    "title": "Grenzverhalten der e-Funktion",
    "desc": "Grenzverhalten der e-Funktion bestimmen",
    "types": ["quiz"],
    "mobilefriendly": true,
    "link": "grenzverhalten-e.html"
  },
  {
    "id": "integral",
    "title": "Stammfunktionen von Polynomen",
    "desc": "Stammfunktionen von Polynomen finden",
    "types": ["learn"],
    "mobilefriendly": true,
    "link": "integral_uebung.html"
  },
  {
    "id": "bestimmtes-integral",
    "title": "Bestimmte Integrale von Polynomen",
    "desc": "Bestimmte Integrale berechnen",
    "types": ["learn"],
    "mobilefriendly": true,
    "link": "bestimmtes_integral_uebung.html"
  },
  {
    "id": "geo-integral",
    "title": "GeoGebra: Geometr. Interpret. von Integralen",
    "desc": "Visualisierung bestimmter Integrale",
    "types": ["geo"],
    "mobilefriendly": false,
    "link": "https://www.geogebra.org/calculator/ftgpxxzx"
  },
  {
    "id": "aufg-flaechen-integrale",
    "title": "Flächeninhalte unter Graphen von Polynomen",
    "desc": "Flächeninhalte unter Graphen von Polynomen mit bestimmten Integralen",
    "types": ["learn"],
    "mobilefriendly": true,
    "link": "flaeche_polynom_uebung.html"
  },
  {
    "id": "geo-3DKoord",
    "title": "GeoGebra: 3D-Koordinatensystem einzeichnen",
    "desc": "Visualisierung des 3-dimensionalen Koordinatensystems",
    "types": ["geo"],
    "mobilefriendly": false,
    "link": "https://t1p.de/3DKoord"
  },
  {
    "id": "geo-koBasis",
    "title": "GeoGebra: Basistransformation",
    "desc": "Visualisierung der Basistransformation",
    "types": ["geo"],
    "mobilefriendly": false,
    "link": "https://t1p.de/koBasis"
  },
  {
    "id": "seiten-benennung",
    "title": "Seiten im rechtwinkligen Dreieck benennen",
    "desc": "Quiz: Ankathete, Gegenkathete, Hypotenuse benennen",
    "types": ["quiz"],
    "mobilefriendly": true,
    "link": "seiten_benennung.html"
  },
  {
    "id": "trigonometrie",
    "title": "Trigonometrie im <b>rechtwinkligen</b> Dreieck",
    "desc": "Sinus, Kosinus, Tangens &amp; Pythagoras anwenden",
    "types": ["learn"],
    "mobilefriendly": true,
    "link": "trigonometrie_uebung.html"
  },
  {
    "id": "sinuskosinussatz",
    "title": "Trigonometrie im <b>beliebigen</b> Dreieck",
    "desc": "Sinus- und Kosinussatz anwenden",
    "types": ["learn"],
    "mobilefriendly": true,
    "link": "sinuskosinussatz_uebung.html"
  },
  {
    "id": "geo-sinus-herleitung",
    "title": "GeoGebra: Herleitung Sinusfunktion",
    "desc": "Visualisierung der Herleitung der Sinusfunktion",
    "types": ["geo"],
    "mobilefriendly": false,
    "link": "https://t1p.de/geogebra-herleitung-sinusfunktion"
  },
  {
    "id": "geo-arkussinus",
    "title": "GeoGebra: Herleitung Arkussinus",
    "desc": "Visualisierung der Arkussinus-Funktion und ihrer Herleitung",
    "types": ["geo"],
    "mobilefriendly": false,
    "link": "https://t1p.de/geogebra-arkussinus"
  },
  {
    "id": "geo-sinus-ablesen",
    "title": "GeoGebra: Allgemeine Sinusfunktion ablesen/einzeichnen",
    "desc": "Parameter der allgemeinen Sinusfunktion üben",
    "types": ["geo"],
    "mobilefriendly": false,
    "link": "https://t1p.de/geogebra-sinus-parameter-ueben"
  },
  {
    "id": "geo-sinus-veraendern",
    "title": "GeoGebra: Parameter der Sinusfunktion verändern",
    "desc": "Auswirkungen der Lineartransformations-Parameter verstehen",
    "types": ["geo"],
    "mobilefriendly": false,
    "link": "https://t1p.de/geogebra-sinus-parameter-veraendern"
  },
  {
    "id": "geo-parameter-einheit",
    "title": "GeoGebra: Parameter am Einheitskreis verstehen",
    "desc": "Herleitung der Parameter über Einheitskreis. Auch: Summe zweier Sinus-Funktionen",
    "types": ["geo"],
    "mobilefriendly": false,
    "link": "https://t1p.de/ko-sinparam-einheit"
  },
  {
    "id": "sinus-toene",
    "title": "Sinus-Funktionen als Töne",
    "desc": "Zusammenhang zwischen Tonhöhe und Frequenz-Parameter b.<br>\
    Wieso haben die Noten genau diese Frequenzen und was bewirken Akkorde",
    "types": ["uebung"],
    "mobilefriendly": true,
    "link": "sinus-toene.html"
  },
  {
    "id": "geo-fourier",
    "title": "GeoGebra: Fourierreihe",
    "desc": "Visualisierung der Fourierreihe",
    "types": ["geo"],
    "mobilefriendly": false,
    "link": "https://t1p.de/geogebra-fourier"
  },
  {
    "id": "graphen",
    "title": "Graph erkennen",
    "desc": "Welche Standard-Funktion wird dargestellt?",
    "types": ["flash"],
    "mobilefriendly": true,
    "link": "graphen.html"
  },
  {
    "id": "binary",
    "title": "Binärzahlen",
    "desc": "Umrechnung zwischen Binär- und Dezimalzahlen üben",
    "types": ["uebung"],
    "mobilefriendly": true,
    "link": "binary.html"
  },
  {
    "id": "rsa",
    "title": "RSA",
    "desc": "RSA-Verschlüsselung Schritt für Schritt üben",
    "types": ["uebung"],
    "mobilefriendly": true,
    "link": "rsa_interaktiv.html"
  },
  {
    "id": "buchstaben-trainer",
    "title": "Buchstaben kennenlernen",
    "desc": "Wie heißen die griechischen (hebräischen, kyrillischen) Buchstaben und wie werden sie geschrieben?",
    "types": ["flash", "quiz", "uebung"],
    "mobilefriendly": true,
    "link": "buchstaben_trainer.html"
  },
  {
    "id": "schrift-trainer",
    "title": "Schrift-Trainer",
    "desc": "Übersetze die Schrift von einzelnen Wörtern in andere Buchstabensysteme",
    "types": ["uebung"],
    "mobilefriendly": true,
    "link": "schrift_trainer.html"
  },
  {
    "id": "trio",
    "title": "TRIO",
    "desc": "Zufallsgeneriertes Spielfeld für das Mathe-Spiel TRIO",
    "types": ["game"],
    "mobilefriendly": true,
    "link": "TRIO.html"
  },
  {
    "id": "mathdomini",
    "title": "Math-Domini",
    "desc": "Ordne mathematische Ereignisse am Zeitstrahl",
    "types": ["game"],
    "mobilefriendly": false,
    "link": "math_domini.html"
  },
  {
    "id": "studiengaenge",
    "title": "Studienwahl Mathematik",
    "desc": "Orientierungshilfe für Studiengänge rund um Mathematik",
    "types": ["info"],
    "mobilefriendly": true,
    "link": "studiengaenge_mathematik.html"
  }
];