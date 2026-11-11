/* Die Seitentypen in der Reihenfolge, in der sie überall erscheinen:
   erst die beiden Aufgaben-Werkzeuge, dann die kurzen Übungsformen,
   danach das zum Anschauen und Ausprobieren, zuletzt Spiel und Info.

   Worin sich die ersten vier unterscheiden:
     Übungstool        eine große, mehrschrittige Aufgabe, durch die ein
                       Quiz Schritt für Schritt hindurchführt
     Aufgabengenerator ein kleiner Generator für einen einzelnen
                       Aufgabentyp - Aufgabe, Lösung, Lösungsweg
     Quiz              kurze Fragen zum Antippen oder mit kurzer Eingabe,
                       auch am Handy schnell zu bedienen
     Karteikarten      Vorderseite - Rückseite, zum Einprägen            */
const typesData = [
  {
    "id": "uebung",
    "label": "Übungstool",
    "label_en": "Practice Tool",
    "icon": "🧠",
    "iconType": "emoji",
    "color": "#dc2020",
    "colorBg": "rgba(220,32,32,0.08)",
    "tooltip": "Mehrschrittige Aufgaben, durch die ein Quiz Schritt für Schritt hindurchführt",
    "tooltip_en": "Multi-step tasks with a quiz that guides you through them step by step",
    "linkLabel": "Zum Übungstool",
    "linkLabel_en": "Open the practice tool"
  },
  {
    "id": "learn",
    "label": "Aufgabengenerator",
    "label_en": "Task Generator",
    "icon": "📝",
    "iconType": "emoji",
    "color": "#d97706",
    "colorBg": "rgba(217,119,6,0.10)",
    "tooltip": "Erzeugt beliebig viele Aufgaben zu einem einzelnen Aufgabentyp – mit Lösung und Lösungsweg",
    "tooltip_en": "Generates as many tasks as you like on a single type of exercise – with answer and worked solution",
    "linkLabel": "Aufgaben erzeugen",
    "linkLabel_en": "Generate tasks"
  },
  {
    "id": "quiz",
    "label": "Quiz",
    "label_en": "Quiz",
    "icon": "❓",
    "iconType": "emoji",
    "color": "#7c3aed",
    "colorBg": "rgba(124,58,237,0.08)",
    "tooltip": "Kurze Fragen zum Antippen oder mit kurzer Eingabe – auch am Handy schnell zu lösen",
    "tooltip_en": "Short questions to tap or answer briefly – quick to work through on a phone",
    "linkLabel": "Zum Quiz",
    "linkLabel_en": "Take the quiz"
  },
  {
    "id": "flash",
    "label": "Karteikarten",
    "label_en": "Flashcards",
    "icon": "📚",
    "iconType": "emoji",
    "color": "#16a34a",
    "colorBg": "rgba(22,163,74,0.08)",
    "tooltip": "Karteikarten zum Einprägen von Formeln, Regeln und Definitionen",
    "tooltip_en": "Flashcards for memorising formulas, rules and definitions",
    "linkLabel": "Zu den Karten",
    "linkLabel_en": "View the cards"
  },
  {
    "id": "visuals",
    "label": "Visualisierung",
    "label_en": "Visualisation",
    "icon": "🎨",
    "iconType": "emoji",
    /* Magenta statt des früheren Petrols: in der Filterleiste steht der
       farbige Punkt der Visualisierung direkt neben dem der Karteikarten,
       und Petrol und Grün waren dort kaum zu unterscheiden. */
    "color": "#a21caf",
    "colorBg": "rgba(162,28,175,0.09)",
    "tooltip": "Zum Ausprobieren und Anschauen: macht Zusammenhänge sichtbar, ohne feste Aufgaben",
    "tooltip_en": "To explore and look at: makes relationships visible, without set exercises",
    "linkLabel": "Zur Visualisierung",
    "linkLabel_en": "Open the visualisation"
  },
  {
    "id": "geo",
    "label": "GeoGebra",
    "label_en": "GeoGebra",
    "icon": "svg:geo",
    "iconType": "svg",
    "color": "#0369a1",
    "colorBg": "rgba(3,105,161,0.08)",
    "tooltip": "Interaktives GeoGebra-Applet zum Ziehen und Ausprobieren",
    "tooltip_en": "Interactive GeoGebra applet to drag and explore",
    "linkLabel": "Zum Applet",
    "linkLabel_en": "Open the applet"
  },
  {
    "id": "game",
    "label": "Spiel",
    "label_en": "Game",
    "icon": "🎮",
    "iconType": "emoji",
    "color": "#f7bd00",
    "colorBg": "rgba(255, 238, 0, 0.16)",
    "tooltip": "Mathematik spielerisch – allein oder mit anderen",
    "tooltip_en": "Maths the playful way – on your own or with others",
    "linkLabel": "Zum Spiel",
    "linkLabel_en": "Play now"
  },
  // {
  //   "id": "video",
  //   "label": "Video",
  //   "icon": "🎥",
  //   "iconType": "emoji",
  //   "color": "#ea580c",
  //   "colorBg": "rgba(234,88,12,0.08)",
  //   "tooltip": "Externe Video-Inhalte zur Vertiefung des Stoffes",
  //   "linkLabel": "Zum Video"
  // },
  {
    "id": "info",
    "label": "Info",
    "label_en": "Info",
    "icon": "ℹ",
    "iconType": "emoji",
    "color": "#6b7280",
    "colorBg": "rgba(107,114,128,0.08)",
    "tooltip": "Hintergrund, Erklärungen und Tipps zum Thema",
    "tooltip_en": "Background, explanations and tips on the topic",
    "linkLabel": "Zur Info",
    "linkLabel_en": "Read more"
  }
];
