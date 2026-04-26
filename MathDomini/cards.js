const cardPool = [
    {
        "title": "Der Papyrus Rhind",
        "fronttext": "Eines der ältesten Dokumente der Welt enthält Rechenregeln für Brüche und Flächeninhalte auf einer langen Schriftrolle.",
        "backtext": "Der ägyptische Schreiber Ahmes verfasste dieses Handbuch, das einen Einblick in die hochentwickelte Mathematik des alten Ägyptens gibt.",
        "valuetext": "um 1550 v. Chr.",
        "startvalue": -1550,
        "endvalue": -1550,
        "tags": [
            "Antike",
            "Geometrie"
        ],
        "furtherInformation": []
    },
    {
        "title": "Plimpton 322",
        "fronttext": "Eine babylonische Tontafel zeigt eine Liste von Zahlenkombinationen, die wir heute als pythagoreische Tripel kennen.",
        "backtext": "Lange vor Pythagoras kannten die Babylonier bereits die Beziehungen zwischen den Seiten rechtwinkliger Dreiecke.",
        "valuetext": "um 1800 v. Chr.",
        "startvalue": -1800,
        "endvalue": -1800,
        "tags": [
            "Antike",
            "Zahlen"
        ],
        "furtherInformation": []
    },
    {
        "title": "Satz des Thales",
        "fronttext": "Ein griechischer Philosoph bewies, dass jeder Winkel in einem Halbkreis ein rechter Winkel ist.",
        "backtext": "Thales von Milet gilt als der erste Mathematiker, der geometrische Sätze durch logische Beweise statt durch bloßes Ausprobieren begründete.",
        "valuetext": "6. Jh. v. Chr.",
        "startvalue": -600,
        "endvalue": -501,
        "tags": [
            "Antike",
            "Geometrie"
        ],
        "furtherInformation": []
    },
    {
        "title": "Die Schule des Pythagoras",
        "fronttext": "Ein Geheimbund verehrte Zahlen als das Wesen aller Dinge und entdeckte die Irrationalität der Wurzel aus 2.",
        "backtext": "Pythagoras und seine Schüler prägten das mathematische Denken tiefgreifend, auch wenn sie die Entdeckung irrationaler Zahlen zunächst geheim hielten.",
        "valuetext": "um 530 v. Chr.",
        "startvalue": -530,
        "endvalue": -530,
        "tags": [
            "Antike",
            "Zahlen"
        ],
        "furtherInformation": []
    },
    {
        "title": "Zenons Paradoxien",
        "fronttext": "Kann Achilles die Schildkröte jemals einholen? Ein Philosoph stellt die Logik von Raum und Zeit infrage.",
        "backtext": "Zenon von Elea formulierte Paradoxien über die Unendlichkeit, die Mathematiker erst Jahrtausende später mit der Analysis lösen konnten.",
        "valuetext": "um 450 v. Chr.",
        "startvalue": -450,
        "endvalue": -450,
        "tags": [
            "Antike",
            "Logik"
        ],
        "furtherInformation": []
    },
    {
        "title": "Euklids Elemente",
        "fronttext": "Eines der einflussreichsten Lehrbücher aller Zeiten fasste das gesamte geometrische Wissen der Antike in Axiomen zusammen.",
        "backtext": "Euklid von Alexandria schuf ein Werk, das über 2000 Jahre lang die Standardreferenz für Geometrie und mathematische Strenge blieb.",
        "valuetext": "um 300 v. Chr.",
        "startvalue": -300,
        "endvalue": -300,
        "tags": [
            "Antike",
            "Geometrie"
        ],
        "furtherInformation": []
    },
    {
        "title": "Das Sieb des Eratosthenes",
        "fronttext": "Wie findet man alle Primzahlen bis zu einer bestimmten Grenze? Ein Bibliothekar erfand ein effizientes Verfahren.",
        "backtext": "Eratosthenes von Kyrene entwickelte diesen Algorithmus, der bis heute im Informatikunterricht als Klassiker gelehrt wird.",
        "valuetext": "3. Jh. v. Chr.",
        "startvalue": -299,
        "endvalue": -200,
        "tags": [
            "Antike",
            "Zahlen"
        ],
        "furtherInformation": []
    },
    {
        "title": "Archimedes und die Zahl Pi",
        "fronttext": "Durch das Einschreiben und Umschreiben von Polygonen kam ein Genie dem wahren Wert von Pi verblüffend nahe.",
        "backtext": "Archimedes von Syrakus nutzte die Ausschöpfungsmethode, um den Umfang eines Kreises mathematisch präzise einzugrenzen.",
        "valuetext": "um 250 v. Chr.",
        "startvalue": -250,
        "endvalue": -250,
        "tags": [
            "Antike",
            "Geometrie"
        ],
        "furtherInformation": []
    },
    {
        "title": "Chinesischer Restsatz",
        "fronttext": "Wie bestimmt man eine Zahl, wenn man nur ihre Reste bei der Division durch verschiedene Teiler kennt?",
        "backtext": "Das Problem tauchte erstmals im Werk 'Sun Zi Suanjing' auf und ist heute ein Grundpfeiler der modernen Kryptographie.",
        "valuetext": "3. bis 5. Jh.",
        "startvalue": 200,
        "endvalue": 499,
        "tags": [
            "Antike",
            "Zahlentheorie"
        ],
        "furtherInformation": []
    },
    {
        "title": "Diophants Arithmetica",
        "fronttext": "Ein Werk, das sich mit Gleichungen beschäftigt, bei denen nur ganzzahlige Lösungen gesucht werden.",
        "backtext": "Diophantos von Alexandria gilt als 'Vater der Algebra', da er erste Ansätze für eine symbolische Schreibweise entwickelte.",
        "valuetext": "um 250",
        "startvalue": 250,
        "endvalue": 250,
        "tags": [
            "Antike",
            "Algebra"
        ],
        "furtherInformation": []
    },
    {
        "title": "Hypatia von Alexandria",
        "fronttext": "Die erste namentlich bekannte Mathematikerin der Geschichte lehrte Astronomie und Philosophie in einer unruhigen Zeit.",
        "backtext": "Hypatia schrieb Kommentare zu Diophantos und Apollonios, bevor sie Opfer religiöser Unruhen wurde.",
        "valuetext": "um 400",
        "startvalue": 350,
        "endvalue": 415,
        "tags": [
            "Antike",
            "Frauen"
        ],
        "furtherInformation": []
    },
    {
        "title": "Aryabhatas Sinustafeln",
        "fronttext": "In Indien wurden die Grundlagen der Trigonometrie gelegt, indem man Sehnen durch Halbhörner (Sinus) ersetzte.",
        "backtext": "Aryabhata definierte den Sinus und berechnete präzise Tabellen, die für die Astronomie unverzichtbar waren.",
        "valuetext": "499",
        "startvalue": 499,
        "endvalue": 499,
        "tags": [
            "Mittelalter",
            "Trigonometrie"
        ],
        "furtherInformation": []
    },
    {
        "title": "Die Erfindung der Null",
        "fronttext": "Nichts als eine Zahl? In Indien wurde das Konzept der Null als eigenständiger Wert revolutioniert.",
        "backtext": "Der indische Mathematiker Brahmagupta legte erstmals Regeln für das Rechnen mit Null fest. Ohne die Null als Platzhalter und Zahl wäre unser modernes Dezimalsystem und die Informatik undenkbar.",
        "valuetext": "7. Jh.",
        "startvalue": 600,
        "endvalue": 699,
        "tags": [
            "Mittelalter",
            "Zahlen"
        ],
        "furtherInformation": []
    },
    {
        "title": "Al-Khwarizmi und die Algebra",
        "fronttext": "Ein Buch über das 'Ergänzen und Ausgleichen' gab einer ganzen mathematischen Disziplin ihren Namen.",
        "backtext": "Al-Khwarizmis Werk 'Al-Kitab al-muhtasar fi hisab al-gabr' führte systematische Methoden zur Lösung linearer und quadratischer Gleichungen ein.",
        "valuetext": "um 820",
        "startvalue": 820,
        "endvalue": 820,
        "tags": [
            "Mittelalter",
            "Algebra"
        ],
        "furtherInformation": []
    },
    {
        "title": "Das Wort Algorithmus",
        "fronttext": "Der Name eines persischen Gelehrten wurde im Lateinischen so stark abgewandelt, dass er heute Rechenvorschriften bezeichnet.",
        "backtext": "Abgeleitet vom Namen al-Khwarizmi, bezeichnet 'Algorithmus' heute jede eindeutige Handlungsvorschrift zur Lösung eines Problems.",
        "valuetext": "9. Jh.",
        "startvalue": 800,
        "endvalue": 899,
        "tags": [
            "Mittelalter",
            "Informatik"
        ],
        "furtherInformation": []
    },
    {
        "title": "Omar Khayyam und Kubische Gleichungen",
        "fronttext": "Ein berühmter Dichter fand eine geometrische Lösung für Gleichungen dritten Grades durch den Schnitt von Kegelschnitten.",
        "backtext": "Khayyam war nicht nur Literat, sondern auch ein brillanter Mathematiker, der die Algebra über die quadratischen Gleichungen hinausführte.",
        "valuetext": "um 1070",
        "startvalue": 1070,
        "endvalue": 1070,
        "tags": [
            "Mittelalter",
            "Algebra"
        ],
        "furtherInformation": []
    },
    {
        "title": "Fibonaccis Liber Abaci",
        "fronttext": "Ein italienischer Kaufmann brachte das indisch-arabische Zahlensystem nach Europa und verdrängte die römischen Ziffern.",
        "backtext": "Leonardo von Pisa (Fibonacci) erklärte in seinem Buch das Rechnen mit dem Dezimalsystem, was den Handel revolutionierte.",
        "valuetext": "1202",
        "startvalue": 1202,
        "endvalue": 1202,
        "tags": [
            "Mittelalter",
            "Zahlen"
        ],
        "furtherInformation": []
    },
    {
        "title": "Fibonacci-Folge",
        "fronttext": "Ein Rätsel über die Vermehrung von Kaninchen führte zu einer Zahlenfolge, die überall in der Natur auftaucht.",
        "backtext": "1, 1, 2, 3, 5, 8, 13... Jede Zahl ist die Summe ihrer beiden Vorgänger. Das Verhältnis nähert sich dem Goldenen Schnitt an.",
        "valuetext": "1202",
        "startvalue": 1202,
        "endvalue": 1202,
        "tags": [
            "Mittelalter",
            "Zahlen"
        ],
        "furtherInformation": []
    },
    {
        "title": "Madhava und die Unendlichkeit",
        "fronttext": "In Südindien entdeckte ein Mathematiker unendliche Reihen für Pi, Jh.e vor den Europäern.",
        "backtext": "Madhava von Sangamagrama begründete die Kerala-Schule, die bereits Grundkonzepte der Analysis vorwegnahm.",
        "valuetext": "um 1400",
        "startvalue": 1350,
        "endvalue": 1425,
        "tags": [
            "Mittelalter",
            "Analysis"
        ],
        "furtherInformation": []
    },
    {
        "title": "Das Prozentzeichen",
        "fronttext": "Aus der Abkürzung 'per cento' entwickelte sich im Laufe der Zeit ein Symbol mit zwei kleinen Kreisen.",
        "backtext": "Ursprünglich wurde 'pc' mit einem kleinen Kreis geschrieben, woraus über die Jh.e das heutige %-Zeichen entstand.",
        "valuetext": "15. Jh.",
        "startvalue": 1400,
        "endvalue": 1499,
        "tags": [
            "Neuzeit",
            "Symbole"
        ],
        "furtherInformation": []
    },
    {
        "title": "Luca Pacioli und die Buchhaltung",
        "fronttext": "Ein Franziskanermönch systematisierte die doppelte Buchführung und arbeitete eng mit Leonardo da Vinci zusammen.",
        "backtext": "Paciolis Werk 'Summa de Arithmetica' war die erste gedruckte Zusammenfassung des mathematischen Wissens seiner Zeit.",
        "valuetext": "1494",
        "startvalue": 1494,
        "endvalue": 1494,
        "tags": [
            "Neuzeit",
            "Anwendung"
        ],
        "furtherInformation": []
    },
    {
        "title": "Das Wurzelzeichen",
        "fronttext": "Das Symbol für die Quadratwurzel sieht aus wie ein kleines 'r' – und das ist kein Zufall.",
        "backtext": "Christoph Rudolff führte das Zeichen $\\sqrt{}$ in seinem Buch 'Die Coss' ein, abgeleitet vom lateinischen Wort 'radix'.",
        "valuetext": "1525",
        "startvalue": 1525,
        "endvalue": 1525,
        "tags": [
            "Neuzeit",
            "Symbole"
        ],
        "furtherInformation": []
    },
    {
        "title": "Lösung der Gleichung 3. Grades",
        "fronttext": "In einem mathematischen Wettstreit knackte ein Gelehrter das Rätsel um die kubischen Gleichungen.",
        "backtext": "Niccolò Tartaglia fand die Lösung, die später von Gerolamo Cardano in der 'Ars Magna' veröffentlicht wurde.",
        "valuetext": "1535",
        "startvalue": 1535,
        "endvalue": 1535,
        "tags": [
            "Neuzeit",
            "Algebra"
        ],
        "furtherInformation": []
    },
    {
        "title": "Das Gleichheitszeichen",
        "fronttext": "Zwei parallele Striche gleicher Länge – denn nichts ist gleicher als das.",
        "backtext": "Robert Recorde führte das Symbol '=' ein, da er es leid war, ständig 'ist gleich' zu schreiben.",
        "valuetext": "1557",
        "startvalue": 1557,
        "endvalue": 1557,
        "tags": [
            "Neuzeit",
            "Symbole"
        ],
        "furtherInformation": []
    },
    {
        "title": "Symbolische Algebra",
        "fronttext": "Statt nur mit Zahlen zu rechnen, begann man, Buchstaben als Platzhalter für unbekannte Größen zu verwenden.",
        "backtext": "François Viète führte die konsequente Verwendung von Variablen ein und legte damit das Fundament der modernen Algebra.",
        "valuetext": "1591",
        "startvalue": 1591,
        "endvalue": 1591,
        "tags": [
            "Neuzeit",
            "Algebra"
        ],
        "furtherInformation": []
    },
    {
        "title": "Erfindung der Logarithmen",
        "fronttext": "Ein schottischer Lord erfand eine Methode, um Multiplikationen durch einfaches Addieren zu ersetzen.",
        "backtext": "John Napier veröffentlichte seine Logarithmentafeln, die astronomische Berechnungen massiv beschleunigten.",
        "valuetext": "1614",
        "startvalue": 1614,
        "endvalue": 1614,
        "tags": [
            "Neuzeit",
            "Zahlen"
        ],
        "furtherInformation": []
    },
    {
        "title": "Analytische Geometrie",
        "fronttext": "Die Verbindung von Geometrie und Algebra ermöglichte es, Formen durch Gleichungen in einem Koordinatensystem darzustellen.",
        "backtext": "René Descartes veröffentlichte 'La Géométrie' und schuf die Grundlage für das nach ihm benannte kartesische Koordinatensystem.",
        "valuetext": "1637",
        "startvalue": 1637,
        "endvalue": 1637,
        "tags": [
            "Neuzeit",
            "Geometrie"
        ],
        "furtherInformation": []
    },
    {
        "title": "Fermats letzter Satz",
        "fronttext": "Eine Randnotiz in einem Buch behauptete einen Beweis, der für über 350 Jahre unauffindbar blieb.",
        "backtext": "Pierre de Fermat schrieb: 'Ich habe hierfür einen wahrhaft wunderbaren Beweis gefunden, doch ist dieser Rand hier zu schmal, um ihn zu fassen.'",
        "valuetext": "um 1637",
        "startvalue": 1637,
        "endvalue": 1637,
        "tags": [
            "Neuzeit",
            "Zahlentheorie"
        ],
        "furtherInformation": []
    },
    {
        "title": "Die Geburtsstunde der Wahrscheinlichkeitsrechnung",
        "fronttext": "Ein Briefwechsel über ein abgebrochenes Glücksspiel führte zur mathematischen Analyse des Zufalls.",
        "backtext": "Blaise Pascal und Pierre de Fermat diskutierten das Problem der Punkteverteilung und begründeten die Stochastik.",
        "valuetext": "1654",
        "startvalue": 1654,
        "endvalue": 1654,
        "tags": [
            "Neuzeit",
            "Stochastik"
        ],
        "furtherInformation": []
    },
    {
        "title": "Das Unendlich-Zeichen",
        "fronttext": "Eine liegende Acht symbolisiert seither die Unendlichkeit in der Mathematik.",
        "backtext": "John Wallis führte die Lemniskate $\\infty$ in seinem Werk 'De sectionibus conicis' ein.",
        "valuetext": "1655",
        "startvalue": 1655,
        "endvalue": 1655,
        "tags": [
            "Neuzeit",
            "Symbole"
        ],
        "furtherInformation": []
    },
    {
        "title": "Infinitesimalrechnung (Leibniz)",
        "fronttext": "Ein deutsches Universalgenie entwickelte eine Notation mit einem langen S für das Integral, die wir noch heute nutzen.",
        "backtext": "Gottfried Wilhelm Leibniz erfand die Differential- und Integralrechnung unabhängig von Newton, aber mit der eleganteren Schreibweise.",
        "valuetext": "1675",
        "startvalue": 1675,
        "endvalue": 1675,
        "tags": [
            "Neuzeit",
            "Analysis"
        ],
        "furtherInformation": []
    },
    {
        "title": "Newtons Fluxionsrechnung",
        "fronttext": "Um die Bewegung der Planeten zu verstehen, erfand ein Physiker eine Methode zur Berechnung von Momentangeschwindigkeiten.",
        "backtext": "Isaac Newtons 'Method of Fluxions' war der englische Gegenwurf zur Leibniz'schen Analysis.",
        "valuetext": "um 1666",
        "startvalue": 1666,
        "endvalue": 1666,
        "tags": [
            "Neuzeit",
            "Analysis"
        ],
        "furtherInformation": []
    },
    {
        "title": "Gesetz der großen Zahlen",
        "fronttext": "Je öfter man ein Experiment wiederholt, desto näher rückt das Ergebnis an den Erwartungswert.",
        "backtext": "Jakob Bernoulli bewies dieses fundamentale Gesetz der Wahrscheinlichkeit in seinem Werk 'Ars Conjectandi'.",
        "valuetext": "1713",
        "startvalue": 1713,
        "endvalue": 1713,
        "tags": [
            "Neuzeit",
            "Stochastik"
        ],
        "furtherInformation": []
    },
    {
        "title": "Die Eulersche Zahl e",
        "fronttext": "Eine fundamentale Konstante der Analysis, die bei Zinseszinsen und Wachstumsprozessen auftaucht.",
        "backtext": "Leonhard Euler führte den Buchstaben 'e' für die Basis des natürlichen Logarithmus ein.",
        "valuetext": "1727",
        "startvalue": 1727,
        "endvalue": 1727,
        "tags": [
            "Neuzeit",
            "Analysis"
        ],
        "furtherInformation": []
    },
    {
        "title": "Königsberger Brückenproblem",
        "fronttext": "Kann man einen Rundgang machen, bei dem man jede der sieben Brücken genau einmal überquert?",
        "backtext": "Leonhard Euler bewies, dass dies unmöglich ist, und legte damit den Grundstein für die Graphentheorie.",
        "valuetext": "1736",
        "startvalue": 1736,
        "endvalue": 1736,
        "tags": [
            "Neuzeit",
            "Graphentheorie"
        ],
        "furtherInformation": []
    },
    {
        "title": "Maria Gaetana Agnesi",
        "fronttext": "Die Autorin des ersten umfassenden Lehrbuchs über Differential- und Integralrechnung.",
        "backtext": "Agnesi war eine italienische Mathematikerin und die erste Frau, die auf einen Lehrstuhl für Mathematik berufen wurde.",
        "valuetext": "1748",
        "startvalue": 1748,
        "endvalue": 1748,
        "tags": [
            "Neuzeit",
            "Frauen"
        ],
        "furtherInformation": []
    },
    {
        "title": "Eulersche Identität",
        "fronttext": "Eine Formel, die die fünf wichtigsten Konstanten der Mathematik in einer einfachen Gleichung vereint.",
        "backtext": "$e^{i\\pi} + 1 = 0$. Sie gilt als die schönste Formel der Mathematik.",
        "valuetext": "1748",
        "startvalue": 1748,
        "endvalue": 1748,
        "tags": [
            "Neuzeit",
            "Analysis"
        ],
        "furtherInformation": []
    },
    {
        "title": "Fundamentalsatz der Algebra",
        "fronttext": "Ein junges Genie bewies, dass jede Polynomgleichung mindestens eine komplexe Lösung hat.",
        "backtext": "Carl Friedrich Gauß lieferte den ersten allgemein anerkannten Beweis für diesen zentralen Satz.",
        "valuetext": "1799",
        "startvalue": 1799,
        "endvalue": 1799,
        "tags": [
            "Moderne",
            "Algebra"
        ],
        "furtherInformation": []
    },
    {
        "title": "Disquisitiones Arithmeticae",
        "fronttext": "Das 'Buch der sieben Siegel' revolutionierte die Zahlentheorie und führte die Modulo-Rechnung ein.",
        "backtext": "Carl Friedrich Gauß veröffentlichte dieses Werk mit nur 24 Jahren und prägte damit die moderne Zahlentheorie.",
        "valuetext": "1801",
        "startvalue": 1801,
        "endvalue": 1801,
        "tags": [
            "Moderne",
            "Zahlentheorie"
        ],
        "furtherInformation": []
    },
    {
        "title": "Die Normalverteilung",
        "fronttext": "Die berühmte Glockenkurve beschreibt die Verteilung vieler natürlicher Daten.",
        "backtext": "Oft nach Gauß benannt (Gauß-Verteilung), zierte sie früher sogar den 10-D-Mark-Schein.",
        "valuetext": "1809",
        "startvalue": 1809,
        "endvalue": 1809,
        "tags": [
            "Moderne",
            "Stochastik"
        ],
        "furtherInformation": []
    },
    {
        "title": "Sophie Germain und die Primzahlen",
        "fronttext": "Unter einem männlichen Pseudonym korrespondierte eine Frau mit Gauß über die Zahlentheorie.",
        "backtext": "Sophie Germain machte entscheidende Fortschritte beim Beweis von Fermats letztem Satz für eine bestimmte Klasse von Primzahlen.",
        "valuetext": "1816",
        "startvalue": 1816,
        "endvalue": 1816,
        "tags": [
            "Moderne",
            "Frauen",
            "Zahlentheorie"
        ],
        "furtherInformation": []
    },
    {
        "title": "Fourier-Analysis",
        "fronttext": "Jede periodische Funktion lässt sich als Summe von Sinus- und Kosinuswellen darstellen.",
        "backtext": "Joseph Fourier entwickelte diese Theorie, die heute die Grundlage für digitale Bild- und Tonverarbeitung (MP3, JPEG) ist.",
        "valuetext": "1822",
        "startvalue": 1822,
        "endvalue": 1822,
        "tags": [
            "Moderne",
            "Analysis"
        ],
        "furtherInformation": []
    },
    {
        "title": "Unmöglichkeit der Lösung 5. Grades",
        "fronttext": "Nach Jahrhunderten der Suche bewies ein junger Norweger, dass es keine allgemeine Lösungsformel für Gleichungen 5. Grades gibt.",
        "backtext": "Niels Henrik Abel erschütterte die Fachwelt mit diesem negativen Resultat.",
        "valuetext": "1824",
        "startvalue": 1824,
        "endvalue": 1824,
        "tags": [
            "Moderne",
            "Algebra"
        ],
        "furtherInformation": []
    },
    {
        "title": "Nichteuklidische Geometrie",
        "fronttext": "Ein russischer Mathematiker zeigte, dass es Welten gibt, in denen die Winkelsumme im Dreieck kleiner als 180 Grad ist.",
        "backtext": "Nikolai Lobatschewski entwickelte die hyperbolische Geometrie und brach damit das Dogma der euklidischen Ebene.",
        "valuetext": "1829",
        "startvalue": 1829,
        "endvalue": 1829,
        "tags": [
            "Moderne",
            "Geometrie"
        ],
        "furtherInformation": []
    },
    {
        "title": "Galois-Theorie",
        "fronttext": "Ein junger Mann entwickelte die Gruppentheorie in der Nacht vor einem tödlichen Duell.",
        "backtext": "Évariste Galois schuf die Verbindung zwischen Körpertheorie und Gruppentheorie, bevor er mit nur 20 Jahren starb.",
        "valuetext": "1832",
        "startvalue": 1832,
        "endvalue": 1832,
        "tags": [
            "Moderne",
            "Algebra"
        ],
        "furtherInformation": []
    },
    {
        "title": "Das erste Computerprogramm",
        "fronttext": "Eine Mathematikerin schrieb den ersten Algorithmus für eine mechanische Rechenmaschine, die noch gar nicht gebaut war.",
        "backtext": "Ada Lovelace erkannte das Potenzial von Babbages 'Analytical Engine' weit über das bloße Rechnen hinaus.",
        "valuetext": "1843",
        "startvalue": 1843,
        "endvalue": 1843,
        "tags": [
            "Moderne",
            "Frauen",
            "Informatik"
        ],
        "furtherInformation": []
    },
    {
        "title": "Entdeckung der Quaternionen",
        "fronttext": "Ein Gelehrter ritzte die Formel für eine neue Art von Zahlen in eine Brücke in Dublin ein.",
        "backtext": "William Rowan Hamilton erweiterte die komplexen Zahlen auf vier Dimensionen, was heute in der 3D-Grafik wichtig ist.",
        "valuetext": "1843",
        "startvalue": 1843,
        "endvalue": 1843,
        "tags": [
            "Moderne",
            "Algebra"
        ],
        "furtherInformation": []
    },
    {
        "title": "Boolesche Algebra",
        "fronttext": "Logisches Denken wurde in mathematische Formeln aus 0 und 1 (Wahr und Falsch) übersetzt.",
        "backtext": "George Boole schuf mit 'The Laws of Thought' das Fundament für die gesamte moderne Computerlogik.",
        "valuetext": "1854",
        "startvalue": 1854,
        "endvalue": 1854,
        "tags": [
            "Moderne",
            "Logik"
        ],
        "furtherInformation": []
    },
    {
        "title": "Riemannsche Vermutung",
        "fronttext": "Eines der größten ungelösten Rätsel der Mathematik betrifft die Verteilung der Primzahlen.",
        "backtext": "Bernhard Riemann formulierte eine Hypothese über die Nullstellen der Zeta-Funktion, die bis heute unbewiesen ist.",
        "valuetext": "1859",
        "startvalue": 1859,
        "endvalue": 1859,
        "tags": [
            "Moderne",
            "Zahlentheorie"
        ],
        "furtherInformation": []
    },
    {
        "title": "Mengenlehre",
        "fronttext": "Es gibt verschiedene Arten von Unendlichkeit – einige sind 'größer' als andere.",
        "backtext": "Georg Cantor begründete die Mengenlehre und zeigte, dass die Menge der reellen Zahlen mächtiger ist als die der natürlichen Zahlen.",
        "valuetext": "1874",
        "startvalue": 1874,
        "endvalue": 1874,
        "tags": [
            "Moderne",
            "Mengenlehre"
        ],
        "furtherInformation": []
    },
    {
        "title": "Sofia Kowalewskaja",
        "fronttext": "Sie erhielt als erste Frau in Europa eine Professur für Mathematik und löste ein Problem zur Rotation fester Körper.",
        "backtext": "Kowalewskaja war eine Pionierin, die trotz großer Vorurteile herausragende Beiträge zur Analysis leistete.",
        "valuetext": "1888",
        "startvalue": 1888,
        "endvalue": 1888,
        "tags": [
            "Moderne",
            "Frauen"
        ],
        "furtherInformation": []
    },
    {
        "title": "Peano-Axiome",
        "fronttext": "Die natürlichen Zahlen wurden erstmals auf ein minimales Set von logischen Grundregeln zurückgeführt.",
        "backtext": "Giuseppe Peano definierte die Zahlen 0, 1, 2... durch eine Nachfolger-Funktion und Induktion.",
        "valuetext": "1889",
        "startvalue": 1889,
        "endvalue": 1889,
        "tags": [
            "Moderne",
            "Logik"
        ],
        "furtherInformation": []
    },
    {
        "title": "Hilberts 23 Probleme",
        "fronttext": "Ein Mathematiker gab die Marschrichtung für das gesamte 20. Jh. vor, indem er die wichtigsten offenen Fragen auflistete.",
        "backtext": "David Hilbert präsentierte seine Liste auf dem internationalen Kongress in Paris und prägte Generationen von Forschern.",
        "valuetext": "1900",
        "startvalue": 1900,
        "endvalue": 1900,
        "tags": [
            "Moderne",
            "Zukunft"
        ],
        "furtherInformation": []
    },
    {
        "title": "Russells Paradoxon",
        "fronttext": "Enthält die Menge aller Mengen, die sich nicht selbst enthalten, sich selbst?",
        "backtext": "Bertrand Russell erschütterte die Grundlagen der Mathematik und zwang Logiker, die Mengenlehre neu zu definieren.",
        "valuetext": "1901",
        "startvalue": 1901,
        "endvalue": 1901,
        "tags": [
            "Moderne",
            "Logik"
        ],
        "furtherInformation": []
    },
    {
        "title": "Noether-Theorem",
        "fronttext": "Ein tiefer Zusammenhang zwischen Symmetrien in der Natur und Erhaltungsgrößen wie Energie wurde bewiesen.",
        "backtext": "Emmy Noether, von Einstein als das bedeutendste kreative mathematische Genie bezeichnet, revolutionierte die theoretische Physik.",
        "valuetext": "1915",
        "startvalue": 1915,
        "endvalue": 1915,
        "tags": [
            "Moderne",
            "Frauen",
            "Physik"
        ],
        "furtherInformation": []
    },
    {
        "title": "Ramanujan und die 1729",
        "fronttext": "Die kleinste Zahl, die man auf zwei verschiedene Arten als Summe von zwei Kubikzahlen schreiben kann.",
        "backtext": "Das indische Genie Srinivasa Ramanujan nannte diese Eigenschaft seinem Freund Hardy spontan bei einem Krankenbesuch.",
        "valuetext": "1918",
        "startvalue": 1918,
        "endvalue": 1918,
        "tags": [
            "Moderne",
            "Zahlentheorie"
        ],
        "furtherInformation": []
    },
    {
        "title": "Gödels Unvollständigkeitssatz",
        "fronttext": "Innerhalb eines hinreichend starken Systems gibt es wahre Aussagen, die niemals bewiesen werden können.",
        "backtext": "Kurt Gödel setzte dem Traum von einer vollständig beweisbaren Mathematik ein jähes Ende.",
        "valuetext": "1931",
        "startvalue": 1931,
        "endvalue": 1931,
        "tags": [
            "Moderne",
            "Logik"
        ],
        "furtherInformation": []
    },
    {
        "title": "Die Turing-Maschine",
        "fronttext": "Ein theoretisches Modell eines Apparats, der jede berechenbare Funktion ausführen kann.",
        "backtext": "Alan Turing schuf die theoretische Grundlage für den modernen Computer und die Informatik.",
        "valuetext": "1936",
        "startvalue": 1936,
        "endvalue": 1936,
        "tags": [
            "Moderne",
            "Informatik"
        ],
        "furtherInformation": []
    },
    {
        "title": "Spieltheorie",
        "fronttext": "Mathematische Analyse von Strategien in Situationen, in denen der Erfolg vom Verhalten anderer abhängt.",
        "backtext": "John von Neumann und Oskar Morgenstern begründeten dieses Feld, das heute in der Ökonomie unverzichtbar ist.",
        "valuetext": "1944",
        "startvalue": 1944,
        "endvalue": 1944,
        "tags": [
            "Moderne",
            "Anwendung"
        ],
        "furtherInformation": []
    },
    {
        "title": "Informationstheorie",
        "fronttext": "Die Entdeckung des 'Bit' als Maßeinheit für Information.",
        "backtext": "Claude Shannon definierte mathematisch, wie Informationen übertragen und komprimiert werden können.",
        "valuetext": "1948",
        "startvalue": 1948,
        "endvalue": 1948,
        "tags": [
            "Moderne",
            "Informatik"
        ],
        "furtherInformation": []
    },
    {
        "title": "Chaos-Theorie",
        "fronttext": "Der Flügelschlag eines Schmetterlings in Brasilien kann einen Tornado in Texas auslösen.",
        "backtext": "Edward Lorenz entdeckte bei Wettermodellen, dass winzige Änderungen der Anfangswerte zu völlig anderen Ergebnissen führen.",
        "valuetext": "1963",
        "startvalue": 1963,
        "endvalue": 1963,
        "tags": [
            "Gegenwart",
            "Physik"
        ],
        "furtherInformation": []
    },
    {
        "title": "Vier-Farben-Satz",
        "fronttext": "Jede Landkarte kann mit nur vier Farben so koloriert werden, dass keine zwei angrenzenden Länder die gleiche Farbe haben.",
        "backtext": "Kenneth Appel und Wolfgang Haken lieferten den ersten großen Beweis, der massiv auf Computerberechnungen angewiesen war.",
        "valuetext": "1976",
        "startvalue": 1976,
        "endvalue": 1976,
        "tags": [
            "Gegenwart",
            "Graphentheorie"
        ],
        "furtherInformation": []
    },
    {
        "title": "Fraktale und Mandelbrot",
        "fronttext": "Selbstähnliche geometrische Muster, die bei jeder Vergrößerung immer wieder neue Details offenbaren.",
        "backtext": "Benoît Mandelbrot prägte den Begriff und zeigte, dass viele komplexe Naturformen fraktal sind.",
        "valuetext": "1975",
        "startvalue": 1975,
        "endvalue": 1975,
        "tags": [
            "Gegenwart",
            "Geometrie"
        ],
        "furtherInformation": []
    },
    {
        "title": "Beweis von Fermats letztem Satz",
        "fronttext": "Nach 358 Jahren wurde das berühmteste Rätsel der Mathematik endlich gelöst.",
        "backtext": "Andrew Wiles präsentierte nach siebenjähriger isolierter Arbeit einen hunderte Seiten langen Beweis über elliptische Kurven.",
        "valuetext": "1994",
        "startvalue": 1994,
        "endvalue": 1994,
        "tags": [
            "Gegenwart",
            "Zahlentheorie"
        ],
        "furtherInformation": []
    },
    {
        "title": "Poincaré-Vermutung gelöst",
        "fronttext": "Ein russisches Genie löste eines der sieben Millennium-Probleme und lehnte das Preisgeld von einer Million Dollar ab.",
        "backtext": "Grigori Perelman bewies diese fundamentale Aussage über die Form des Raums (Topologie).",
        "valuetext": "2002",
        "startvalue": 2002,
        "endvalue": 2002,
        "tags": [
            "Gegenwart",
            "Topologie"
        ],
        "furtherInformation": []
    },
    {
        "title": "Erste Fields-Medaille für eine Frau",
        "fronttext": "Die höchste Auszeichnung der Mathematik (der 'Nobelpreis der Mathe') wurde erstmals an eine Frau verliehen.",
        "backtext": "Maryam Mirzakhani erhielt den Preis für ihre Arbeit über die Dynamik und Geometrie von Riemannschen Flächen.",
        "valuetext": "2014",
        "startvalue": 2014,
        "endvalue": 2014,
        "tags": [
            "Gegenwart",
            "Frauen"
        ],
        "furtherInformation": []
    },
    {
        "title": "Sumersches Sexagesimalsystem",
        "fronttext": "Warum hat eine Stunde 60 Minuten? Dieses Zahlensystem ist der Grund.",
        "backtext": "Die Sumerer nutzten die Basis 60, was wir noch heute bei Zeit und Winkeln beibehalten.",
        "valuetext": "um 3000 v. Chr.",
        "startvalue": -3000,
        "endvalue": -3000,
        "tags": [
            "Antike",
            "Zahlen"
        ],
        "furtherInformation": []
    },
    {
        "title": "Herons Formel",
        "fronttext": "Berechnung der Fläche eines Dreiecks allein aus seinen Seitenlängen.",
        "backtext": "Heron von Alexandria war ein Meister der angewandten Mathematik und Mechanik.",
        "valuetext": "1. Jh.",
        "startvalue": 1,
        "endvalue": 100,
        "tags": [
            "Antike",
            "Geometrie"
        ],
        "furtherInformation": []
    },
    {
        "title": "Ptolemäus' Almagest",
        "fronttext": "Ein monumentales Werk, das die Astronomie für über 1000 Jahre dominierte.",
        "backtext": "Claudius Ptolemäus lieferte umfangreiche trigonometrische Tabellen für die Sternbeobachtung.",
        "valuetext": "um 150",
        "startvalue": 150,
        "endvalue": 150,
        "tags": [
            "Antike",
            "Astronomie"
        ],
        "furtherInformation": []
    },
    {
        "title": "Liu Hui und das Pi-Polygon",
        "fronttext": "Ein chinesischer Mathematiker berechnete Pi mit einem 3072-Eck.",
        "backtext": "Liu Hui verbesserte die Genauigkeit von Pi erheblich durch eine iterative Methode.",
        "valuetext": "263",
        "startvalue": 263,
        "endvalue": 263,
        "tags": [
            "Antike",
            "Geometrie"
        ],
        "furtherInformation": []
    },
    {
        "title": "Pappos' Sechsecksatz",
        "fronttext": "Ein Satz über die Projektion von Punkten, der erst viel später in der Geometrie wichtig wurde.",
        "backtext": "Pappos von Alexandria war einer der letzten großen griechischen Mathematiker.",
        "valuetext": "um 320",
        "startvalue": 320,
        "endvalue": 320,
        "tags": [
            "Antike",
            "Geometrie"
        ],
        "furtherInformation": []
    },
    {
        "title": "Al-Kindi und die Kryptoanalyse",
        "fronttext": "Die Kunst, geheime Codes durch die Analyse von Buchstabenhäufigkeiten zu knacken.",
        "backtext": "Al-Kindi verfasste das erste bekannte Werk über Kryptographie und Statistik.",
        "valuetext": "9. Jh.",
        "startvalue": 800,
        "endvalue": 899,
        "tags": [
            "Mittelalter",
            "Kryptographie"
        ],
        "furtherInformation": []
    },
    {
        "title": "Thabit ibn Qurra",
        "fronttext": "Er fand eine Formel zur Entdeckung befreundeter Zahlenpaare.",
        "backtext": "Befreundete Zahlen sind solche, bei denen die Summe der Teiler der einen Zahl die andere Zahl ergibt.",
        "valuetext": "9. Jh.",
        "startvalue": 800,
        "endvalue": 899,
        "tags": [
            "Mittelalter",
            "Zahlentheorie"
        ],
        "furtherInformation": []
    },
    {
        "title": "Alhazen (Ibn al-Haytham)",
        "fronttext": "Begründer der wissenschaftlichen Optik und Pionier des mathematischen Beweises in der Physik.",
        "backtext": "Alhazens Problem beschäftigt sich mit dem Reflexionspunkt auf einem sphärischen Spiegel.",
        "valuetext": "1021",
        "startvalue": 1021,
        "endvalue": 1021,
        "tags": [
            "Mittelalter",
            "Geometrie"
        ],
        "furtherInformation": []
    },
    {
        "title": "Bhaskara II und das Division-durch-Null-Problem",
        "fronttext": "Er erkannte, dass eine Zahl geteilt durch Null unendlich ist.",
        "backtext": "In seinem Werk 'Lilavati' beschrieb er komplexe mathematische Konzepte in Versform.",
        "valuetext": "1150",
        "startvalue": 1150,
        "endvalue": 1150,
        "tags": [
            "Mittelalter",
            "Analysis"
        ],
        "furtherInformation": []
    },
    {
        "title": "Qin Jiushao und der Algorithmus",
        "fronttext": "Er systematisierte den chinesischen Restsatz in seinem Werk 'Mathematische Abhandlung in neun Sektionen'.",
        "backtext": "Qin Jiushao war ein bedeutender Mathematiker der Song-Dynastie.",
        "valuetext": "1247",
        "startvalue": 1247,
        "endvalue": 1247,
        "tags": [
            "Mittelalter",
            "Algebra"
        ],
        "furtherInformation": []
    },
    {
        "title": "Nicole Oresme",
        "fronttext": "Er nutzte als Erster Koordinaten, um die Änderung von Qualitäten über die Zeit darzustellen.",
        "backtext": "Oresme war ein Vorläufer der modernen graphischen Darstellung von Funktionen.",
        "valuetext": "um 1350",
        "startvalue": 1350,
        "endvalue": 1350,
        "tags": [
            "Mittelalter",
            "Analysis"
        ],
        "furtherInformation": []
    },
    {
        "title": "Regiomontanus",
        "fronttext": "Er machte die Trigonometrie zu einer eigenständigen mathematischen Disziplin in Europa.",
        "backtext": "Johannes Müller aus Königsberg (Regiomontanus) war entscheidend für die Navigation der Entdecker.",
        "valuetext": "1464",
        "startvalue": 1464,
        "endvalue": 1464,
        "tags": [
            "Neuzeit",
            "Trigonometrie"
        ],
        "furtherInformation": []
    },
    {
        "title": "Scipione del Ferro",
        "fronttext": "Der Mann, der als Erster das Geheimnis der kubischen Gleichungen knackte, es aber für sich behielt.",
        "backtext": "Del Ferro gab sein Wissen nur an wenige Schüler weiter, was später zum Streit zwischen Tartaglia und Cardano führte.",
        "valuetext": "um 1515",
        "startvalue": 1515,
        "endvalue": 1515,
        "tags": [
            "Neuzeit",
            "Algebra"
        ],
        "furtherInformation": []
    },
    {
        "title": "Johannes Kepler und die Weinfässer",
        "fronttext": "Durch die Berechnung des Volumens von Fässern trug er zur Entwicklung der Integralrechnung bei.",
        "backtext": "In 'Nova Stereometria Doliorum Vinariorum' nutzte Kepler infinitesimale Methoden.",
        "valuetext": "1615",
        "startvalue": 1615,
        "endvalue": 1615,
        "tags": [
            "Neuzeit",
            "Analysis"
        ],
        "furtherInformation": []
    },
    {
        "title": "Bonaventura Cavalieri",
        "fronttext": "Er behauptete, dass Flächen aus unendlich vielen Linien bestehen – das Prinzip der Indivisibilien.",
        "backtext": "Cavalieri war ein direkter Vorläufer der modernen Integralrechnung.",
        "valuetext": "1635",
        "startvalue": 1635,
        "endvalue": 1635,
        "tags": [
            "Neuzeit",
            "Analysis"
        ],
        "furtherInformation": []
    },
    {
        "title": "Pascaline",
        "fronttext": "Eine der ersten mechanischen Rechenmaschinen der Welt, gebaut für einen Steuerbeamten.",
        "backtext": "Blaise Pascal erfand diese Maschine mit nur 19 Jahren, um seinem Vater bei der Arbeit zu helfen.",
        "valuetext": "1642",
        "startvalue": 1642,
        "endvalue": 1642,
        "tags": [
            "Neuzeit",
            "Informatik"
        ],
        "furtherInformation": []
    },
    {
        "title": "Christian Huygens und die Wahrscheinlichkeit",
        "fronttext": "Das erste gedruckte Lehrbuch über Wahrscheinlichkeitsrechnung.",
        "backtext": "Huygens systematisierte die Ideen von Pascal und Fermat in 'Van Rekeningh in Spelen van Geluck'.",
        "valuetext": "1657",
        "startvalue": 1657,
        "endvalue": 1657,
        "tags": [
            "Neuzeit",
            "Stochastik"
        ],
        "furtherInformation": []
    },
    {
        "title": "Brook Taylor",
        "fronttext": "Er zeigte, wie man komplizierte Funktionen durch unendliche Polynomreihen annähern kann.",
        "backtext": "Die Taylor-Reihe ist heute ein Standardwerkzeug in der numerischen Mathematik.",
        "valuetext": "1715",
        "startvalue": 1715,
        "endvalue": 1715,
        "tags": [
            "Neuzeit",
            "Analysis"
        ],
        "furtherInformation": []
    },
    {
        "title": "Abraham de Moivre",
        "fronttext": "Er entdeckte die Normalverteilung bei der Untersuchung von Münzwürfen.",
        "backtext": "De Moivre war ein Pionier der Wahrscheinlichkeitsrechnung und Statistik.",
        "valuetext": "1733",
        "startvalue": 1733,
        "endvalue": 1733,
        "tags": [
            "Neuzeit",
            "Stochastik"
        ],
        "furtherInformation": []
    },
    {
        "title": "Jean d'Alembert",
        "fronttext": "Er formulierte die Wellengleichung, die die Ausbreitung von Schall und Licht beschreibt.",
        "backtext": "D'Alembert war ein führender Kopf der Aufklärung und Mitherausgeber der Encyclopédie.",
        "valuetext": "1747",
        "startvalue": 1747,
        "endvalue": 1747,
        "tags": [
            "Neuzeit",
            "Physik"
        ],
        "furtherInformation": []
    },
    {
        "title": "Joseph-Louis Lagrange",
        "fronttext": "Er reformierte die Mechanik und machte sie zu einer rein mathematischen Disziplin ohne Skizzen.",
        "backtext": "Lagrange leistete fundamentale Beiträge zur Variationsrechnung und Analysis.",
        "valuetext": "1788",
        "startvalue": 1788,
        "endvalue": 1788,
        "tags": [
            "Moderne",
            "Analysis"
        ],
        "furtherInformation": []
    },
    {
        "title": "Adrien-Marie Legendre",
        "fronttext": "Er veröffentlichte die Methode der kleinsten Quadrate zur Auswertung von Messdaten.",
        "backtext": "Legendre war ein bedeutender Analytiker und Geometer zur Zeit der Französischen Revolution.",
        "valuetext": "1805",
        "startvalue": 1805,
        "endvalue": 1805,
        "tags": [
            "Moderne",
            "Stochastik"
        ],
        "furtherInformation": []
    },
    {
        "title": "Jean-Victor Poncelet",
        "fronttext": "In russischer Kriegsgefangenschaft begründete er die projektive Geometrie.",
        "backtext": "Poncelet untersuchte Eigenschaften von Figuren, die bei Projektionen unverändert bleiben.",
        "valuetext": "1822",
        "startvalue": 1822,
        "endvalue": 1822,
        "tags": [
            "Moderne",
            "Geometrie"
        ],
        "furtherInformation": []
    },
    {
        "title": "Charles Babbage",
        "fronttext": "Der Entwurf der 'Analytical Engine', dem mechanischen Vorfahren des Computers.",
        "backtext": "Obwohl nie zu seinen Lebzeiten fertiggestellt, enthielt der Entwurf bereits Speicher und Rechenwerk.",
        "valuetext": "1837",
        "startvalue": 1837,
        "endvalue": 1837,
        "tags": [
            "Moderne",
            "Informatik"
        ],
        "furtherInformation": []
    },
    {
        "title": "Florence Nightingale",
        "fronttext": "Sie nutzte statistische Grafiken (Polar-Area-Diagramme), um die Hygiene in Krankenhäusern zu verbessern.",
        "backtext": "Nightingale war eine Pionierin der angewandten Statistik und Visualisierung.",
        "valuetext": "1858",
        "startvalue": 1858,
        "endvalue": 1858,
        "tags": [
            "Moderne",
            "Frauen",
            "Statistik"
        ],
        "furtherInformation": []
    },
    {
        "title": "Richard Dedekind",
        "fronttext": "Er definierte die reellen Zahlen durch 'Schnitte' in der Menge der rationalen Zahlen.",
        "backtext": "Dedekind gab der Analysis ein strenges logisches Fundament.",
        "valuetext": "1872",
        "startvalue": 1872,
        "endvalue": 1872,
        "tags": [
            "Moderne",
            "Analysis"
        ],
        "furtherInformation": []
    },
    {
        "title": "Henri Poincaré",
        "fronttext": "Er begründete die algebraische Topologie und untersuchte das Drei-Körper-Problem.",
        "backtext": "Poincaré war einer der letzten 'Universalisten', die fast alle Gebiete der Mathematik beherrschten.",
        "valuetext": "1895",
        "startvalue": 1895,
        "endvalue": 1895,
        "tags": [
            "Moderne",
            "Topologie"
        ],
        "furtherInformation": []
    },
    {
        "title": "Stefan Banach",
        "fronttext": "Er begründete die moderne Funktionalanalysis in einem Café in Lemberg.",
        "backtext": "Banach-Räume sind heute ein zentrales Konzept der höheren Mathematik.",
        "valuetext": "1922",
        "startvalue": 1922,
        "endvalue": 1922,
        "tags": [
            "Moderne",
            "Analysis"
        ],
        "furtherInformation": []
    },
    {
        "title": "Andrey Kolmogorov",
        "fronttext": "Er legte die Axiome fest, auf denen die gesamte moderne Wahrscheinlichkeitstheorie basiert.",
        "backtext": "Kolmogorov verknüpfte die Stochastik mit der Maßtheorie.",
        "valuetext": "1933",
        "startvalue": 1933,
        "endvalue": 1933,
        "tags": [
            "Moderne",
            "Stochastik"
        ],
        "furtherInformation": []
    },
    {
        "title": "Nicolas Bourbaki",
        "fronttext": "Ein fiktiver Mathematiker, hinter dem sich eine ganze Gruppe französischer Gelehrter verbarg.",
        "backtext": "Die Bourbaki-Gruppe wollte die gesamte Mathematik streng axiomatisch neu aufbauen.",
        "valuetext": "1935",
        "startvalue": 1935,
        "endvalue": 1935,
        "tags": [
            "Moderne",
            "Struktur"
        ],
        "furtherInformation": []
    },
    {
        "title": "Grace Hopper",
        "fronttext": "Sie erfand den ersten Compiler und prägte den Begriff 'Debugging'.",
        "backtext": "Hopper war maßgeblich an der Entwicklung der Programmiersprache COBOL beteiligt.",
        "valuetext": "1952",
        "startvalue": 1952,
        "endvalue": 1952,
        "tags": [
            "Moderne",
            "Frauen",
            "Informatik"
        ],
        "furtherInformation": []
    },
    {
        "title": "Katherine Johnson",
        "fronttext": "Ihre präzisen Berechnungen der Flugbahnen ermöglichten die ersten bemannten Raumflüge der USA.",
        "backtext": "Johnson war eine 'menschliche Computerin' bei der NASA, deren Arbeit für die Mondlandung entscheidend war.",
        "valuetext": "1962",
        "startvalue": 1962,
        "endvalue": 1962,
        "tags": [
            "Gegenwart",
            "Frauen",
            "Astronomie"
        ],
        "furtherInformation": []
    },
    {
        "title": "Robert Langlands",
        "fronttext": "Ein gewaltiges Programm zur Vereinigung von Zahlentheorie und Gruppentheorie wurde skizziert.",
        "backtext": "Das Langlands-Programm gilt oft als die 'Grand Unified Theory' der Mathematik.",
        "valuetext": "1967",
        "startvalue": 1967,
        "endvalue": 1967,
        "tags": [
            "Gegenwart",
            "Struktur"
        ],
        "furtherInformation": []
    },
    {
        "title": "John Conway und das Leben",
        "fronttext": "Ein mathematisches Spiel, das zeigt, wie aus einfachen Regeln hochkomplexe Strukturen entstehen.",
        "backtext": "Conways 'Game of Life' ist der bekannteste zelluläre Automat.",
        "valuetext": "1970",
        "startvalue": 1970,
        "endvalue": 1970,
        "tags": [
            "Gegenwart",
            "Informatik"
        ],
        "furtherInformation": []
    },
    {
        "title": "Julia Robinson und Hilberts 10. Problem",
        "fronttext": "Sie lieferte den entscheidenden Beitrag zum Beweis, dass es keinen Algorithmus für diophantische Gleichungen gibt.",
        "backtext": "Robinson war die erste Frau, die Präsidentin der American Mathematical Society wurde.",
        "valuetext": "1970",
        "startvalue": 1970,
        "endvalue": 1970,
        "tags": [
            "Gegenwart",
            "Frauen",
            "Logik"
        ],
        "furtherInformation": []
    },
    {
        "title": "Stephen Hawking und Schwarze Löcher",
        "fronttext": "Mathematische Beweise für Singularitäten im Universum.",
        "backtext": "Hawking nutzte komplexe Differentialgeometrie, um den Anfang und das Ende der Zeit zu beschreiben.",
        "valuetext": "1974",
        "startvalue": 1974,
        "endvalue": 1974,
        "tags": [
            "Gegenwart",
            "Physik"
        ],
        "furtherInformation": []
    },
    {
        "title": "Thomas Hales und die Orangen",
        "fronttext": "Der Beweis der Kepler-Vermutung über die dichteste Kugelpackung.",
        "backtext": "Hales nutzte Computerunterstützung, um zu zeigen, dass die Stapelung von Orangen im Supermarkt optimal ist.",
        "valuetext": "1998",
        "startvalue": 1998,
        "endvalue": 1998,
        "tags": [
            "Gegenwart",
            "Geometrie"
        ],
        "furtherInformation": []
    },
    {
        "title": "Terence Tao und Primzahl-Strukturen",
        "fronttext": "Der Beweis, dass es beliebig lange arithmetische Folgen von Primzahlen gibt.",
        "backtext": "Terence Tao gilt als eines der vielseitigsten mathematischen Genies der heutigen Zeit.",
        "valuetext": "2004",
        "startvalue": 2004,
        "endvalue": 2004,
        "tags": [
            "Gegenwart",
            "Zahlentheorie"
        ],
        "furtherInformation": []
    },
    {
        "title": "Yitang Zhang und die Primzahlzwillinge",
        "fronttext": "Ein Durchbruch bei der Frage, ob es unendlich viele Primzahlen gibt, die nah beieinander liegen.",
        "backtext": "Zhang bewies, dass es unendlich viele Primzahlpaare mit einem Abstand von höchstens 70 Millionen gibt.",
        "valuetext": "2013",
        "startvalue": 2013,
        "endvalue": 2013,
        "tags": [
            "Gegenwart",
            "Zahlentheorie"
        ],
        "furtherInformation": []
    },
    {
        "title": "Peter Scholze",
        "fronttext": "Ein deutscher Mathematiker revolutionierte die arithmetische Geometrie mit 'perfektoiden Räumen'.",
        "backtext": "Scholze wurde mit nur 30 Jahren einer der jüngsten Fields-Medaillenträger aller Zeiten.",
        "valuetext": "2018",
        "startvalue": 2018,
        "endvalue": 2018,
        "tags": [
            "Gegenwart",
            "Geometrie"
        ],
        "furtherInformation": []
    }
];