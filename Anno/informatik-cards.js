const cardPool = [

    // ==========================================
    // 1. VORGESCHICHTE & MECHANIK
    // ==========================================
    {
        "title": "Abakus",
        "fronttext": "Eines der ältesten bekannten Rechenhilfsmittel der Menschheit, das auf verschiebbaren Kugeln basiert.",
        "backtext": "Obwohl mechanisch einfach, ermöglicht der Abakus geübten Nutzern extrem schnelle Grundrechenarten und sogar Wurzelberechnungen.",
        "valuetext": "um 2500 v. Chr.",
        "startvalue": -2700,
        "endvalue": -2300,
        "tags": [
            "Hardware",
            "Geschichte",
            "Speicher",
            "!einfach"
        ],
        "furtherInformation": []
    },
    {
        "title": "Antikythera-Mechanismus",
        "fronttext": "Ein antiker 'Analogcomputer' aus Bronze, der zur Vorhersage von Sonnenfinsternissen und Planetenbahnen diente.",
        "backtext": "Das Gerät aus dem 1. oder 2. Jahrhundert v. Chr. gilt als komplexeste Apparatur der Antike und nutzt ein präzises Differentialgetriebe.",
        "valuetext": "um 65 v. Chr.",
        "startvalue": -80,
        "endvalue": -50,
        "tags": [
            "Hardware",
            "Geschichte"
        ],
        "furtherInformation": []
    },
    {
        "title": "Rechenschieber",
        "fronttext": "Das Standard-Werkzeug für Ingenieure vor der Erfindung des Taschenrechners, basierend auf logarithmischen Skalen.",
        "backtext": "Er wurde für die Apollo-Mondmissionen genauso genutzt wie für den Bau von Brücken und Wolkenkratzern.",
        "valuetext": "1622",
        "startvalue": 1622,
        "endvalue": 1622,
        "tags": [
            "Hardware",
            "Geschichte",
            "Mathematik"
        ],
        "furtherInformation": []
    },
    {
        "title": "Rechenuhr von Wilhelm Schickard",
        "fronttext": "Der erste dokumentierte Entwurf einer mechanischen Rechenmaschine für die vier Grundrechenarten.",
        "backtext": "Sie nutzte Zahnräder und Zehnerüberträge. Schickard baute sie u.a. für Johannes Kepler, um dessen astronomische Rechnungen zu erleichtern.",
        "valuetext": "1623",
        "startvalue": 1623,
        "endvalue": 1623,
        "tags": [
            "Hardware",
            "Geschichte",
            "Pionier"
        ],
        "furtherInformation": []
    },
    {
        "title": "Stepped Reckoner",
        "fronttext": "Diese Maschine von Leibniz nutzte eine gestufte Walze ('Leibniz-Rad'), um Multiplikationen mechanisch durchzuführen.",
        "backtext": "Gottfried Wilhelm Leibniz' Erfindung legte die Basis für fast alle mechanischen Taschenrechner der folgenden 200 Jahre.",
        "valuetext": "1673",
        "startvalue": 1673,
        "endvalue": 1673,
        "tags": [
            "Hardware",
            "Geschichte",
            "Pionier"
        ],
        "furtherInformation": []
    },
    {
        "title": "Jacquard-Webstuhl",
        "fronttext": "Die erste Maschine, die durch Lochkarten gesteuert wurde, um komplexe Webmuster automatisiert herzustellen.",
        "backtext": "Joseph-Marie Jacquard bewies damit, dass Maschinen durch austauschbare 'Programme' (Lochkarten) gesteuert werden können.",
        "valuetext": "1805",
        "startvalue": 1805,
        "endvalue": 1805,
        "tags": [
            "Hardware",
            "Geschichte",
            "Speicher",
            "Pionier"
        ],
        "furtherInformation": []
    },
    {
        "title": "Difference Engine",
        "fronttext": "Ein gigantischer Entwurf für eine mechanische Maschine zur automatischen Berechnung von Logarithmentafeln.",
        "backtext": "Charles Babbage scheiterte zwar am Bau der kompletten Maschine, bewies aber die theoretische Machbarkeit automatischer Kalkulationen.",
        "valuetext": "1822",
        "startvalue": 1822,
        "endvalue": 1822,
        "tags": [
            "Hardware",
            "Geschichte",
            "Pionier"
        ],
        "furtherInformation": []
    },
    {
        "title": "Analytical Engine",
        "fronttext": "Der theoretische Entwurf des ersten universell programmierbaren Computers mit Recheneinheit, Speicher und Steuerung.",
        "backtext": "Babbages Entwurf enthielt bereits alle Kernkomponenten moderner Computer, wurde aber zu seinen Lebzeiten nie vollendet.",
        "valuetext": "1837",
        "startvalue": 1837,
        "endvalue": 1837,
        "tags": [
            "Hardware",
            "Theorie",
            "Pionier",
            "!wichtig"
        ],
        "furtherInformation": []
    },
    {
        "title": "Ada Lovelace und das erste Programm",
        "fronttext": "Eine britische Mathematikerin verfasste einen komplexen Algorithmus zur Berechnung von Bernoulli-Zahlen für eine mechanische Rechenmaschine und gilt damit als erste Programmiererin der Welt.",
        "backtext": "Sie arbeitete mit Charles Babbage zusammen und erkannte im Gegensatz zu ihm, dass seine 'Analytical Engine' nicht nur reine Zahlen, sondern auch Symbole, Musik oder Grafiken verarbeiten könnte, wenn man ihr logische Regeln füttert.",
        "valuetext": "1843",
        "startvalue": 1843,
        "endvalue": 1843,
        "tags": [
            "Frauen",
            "Pionier",
            "Algorithmen",
            "!einfach",
            "!wichtig"
        ],
        "furtherInformation": []
    },
    {
        "title": "Boolesche Algebra",
        "fronttext": "Er schuf ein logisches System, das alle Aussagen auf 'Wahr' oder 'Falsch' (1 oder 0) reduzierte.",
        "backtext": "George Booles Arbeit 'The Laws of Thought' bildet heute das mathematische Fundament der gesamten Digitaltechnik und Schaltlogik.",
        "valuetext": "1854",
        "startvalue": 1854,
        "endvalue": 1854,
        "tags": [
            "Logik",
            "Theorie",
            "Mathematik",
            "!wichtig",
            "!einfach"
        ],
        "furtherInformation": []
    },
    {
        "title": "Hollerith-Tabelliermaschine",
        "fronttext": "Für die US-Volkszählung entwickelte er ein System zur Datenverarbeitung mittels Lochkarten.",
        "backtext": "Herman Hollerith legte damit den Grundstein für die Firma IBM und bewies, dass Maschinen große Datenmengen analysieren können.",
        "valuetext": "1890",
        "startvalue": 1890,
        "endvalue": 1890,
        "tags": [
            "Hardware",
            "Geschichte",
            "Speicher",
            "!einfach",
            "!wichtig",
            "Pionier"
        ],
        "furtherInformation": []
    },
    {
        "title": "Curta-Rechenmaschine",
        "fronttext": "Die kleinste mechanische Rechenmaschine der Welt, die optisch an eine Pfeffermühle erinnert.",
        "backtext": "Curt Herzstark entwarf sie während seiner Haft im Konzentrationslager Buchenwald. Sie blieb bis in die 1970er der Goldstandard für mobiles Rechnen.",
        "valuetext": "1947",
        "startvalue": 1947,
        "endvalue": 1947,
        "tags": [
            "Hardware",
            "Geschichte",
            "Anekdote"
        ],
        "furtherInformation": []
    },

    // ==========================================
    // 2. THEORETISCHE INFORMATIK & ALGORITHMEN
    // ==========================================
    {
        "title": "Der Euklidische Algorithmus",
        "fronttext": "Einer der ältesten numerischen Algorithmen der Menschheit bestimmt hocheffizient den größten gemeinsamen Teiler (ggT) zweier natürlicher Zahlen.",
        "backtext": "Beschrieben in Euklids 'Elementen', basiert das Verfahren auf der wiederholten Subtraktion oder Division (Modulo-Rechnung). Es ist bis heute ein elementarer Baustein in der modernen Zahlentheorie und Kryptographie.",
        "valuetext": "um 300 v. Chr.",
        "startvalue": -310,
        "endvalue": -290,
        "tags": [
            "Algorithmen",
            "Geschichte",
            "Mathematik",
            "!einfach",
            "!wichtig"
        ],
        "furtherInformation": []
    },
    {
        "title": "Die Turing-Maschine",
        "fronttext": "Ein theoretisches Modell, das definiert, was 'Berechenbarkeit' eigentlich bedeutet.",
        "backtext": "Alan Turing zeigte, dass eine einfache Maschine mit einem endlosen Band jedes mathematische Problem lösen kann, für das es einen Algorithmus gibt.",
        "valuetext": "1936",
        "startvalue": 1936,
        "endvalue": 1936,
        "tags": [
            "Theorie",
            "Logik",
            "!wichtig"
        ],
        "furtherInformation": []
    },
    {
        "title": "Das Halteproblem",
        "fronttext": "Die Entdeckung, dass es unmöglich ist, ein Programm zu schreiben, das für jedes beliebige andere Programm vorhersagt, ob es jemals stoppt.",
        "backtext": "Alan Turing bewies damit, dass die Mathematik und Informatik Grenzen haben – nicht alles ist berechenbar.",
        "valuetext": "1936",
        "startvalue": 1936,
        "endvalue": 1936,
        "tags": [
            "Theorie",
            "Logik",
            "!wichtig"
        ],
        "furtherInformation": []
    },
    {
        "title": "Das Lambda-Kalkül",
        "fronttext": "Ein formales System zur Untersuchung von Funktionen, das zeitgleich mit der Turing-Maschine die mathematische Grenze der Berechenbarkeit definierte.",
        "backtext": "Alonzo Church entwickelte dieses System. Es verzichtet komplett auf Speicherzustände und bildet bis heute das mathematische Fundament aller funktionalen Programmiersprachen.",
        "valuetext": "1936",
        "startvalue": 1936,
        "endvalue": 1936,
        "tags": [
            "Theorie",
            "Logik",
            "Mathematik"
        ],
        "furtherInformation": []
    },
    {
        "title": "Die Church-Turing-These",
        "fronttext": "Zwei mathematische Genies formulieren unabhängig voneinander die fundamentale Annahme darüber, was auf dieser Welt überhaupt algorithmisch berechenbar ist.",
        "backtext": "Alonzo Church und Alan Turing zeigten 1936, dass alle intuitiv berechenbaren Funktionen exakt den Funktionen entsprechen, die eine Turing-Maschine berechnen kann. Bis heute bildet dies die absolute Grenze unserer Computer.",
        "valuetext": "1936",
        "startvalue": 1936,
        "endvalue": 1936,
        "tags": [
            "Theorie",
            "Logik",
            "Geschichte"
        ],
        "furtherInformation": []
    },
    {
        "title": "Symbolische Logik (Shannon)",
        "fronttext": "Die Entdeckung, dass elektrische Schaltkreise logische Operationen (UND, ODER, NICHT) ausführen können.",
        "backtext": "Claude Shannons Masterarbeit gilt als eine der wichtigsten der Geschichte, da sie die Brücke zwischen Boolescher Algebra und Elektronik schlug.",
        "valuetext": "1937",
        "startvalue": 1937,
        "endvalue": 1937,
        "tags": [
            "Logik",
            "Theorie",
            "Pionier",
            "!wichtig"
        ],
        "furtherInformation": []
    },
    {
        "title": "Memex-Konzept",
        "fronttext": "Ein theoretisches Gerät zur Speicherung und Verknüpfung von Wissen, das als Vorläufer des Hypertexts gilt.",
        "backtext": "Vannevar Bush beschrieb in 'As We May Think' ein System, das Informationen assoziativ verknüpft – genau wie das heutige World Wide Web.",
        "valuetext": "1945",
        "startvalue": 1945,
        "endvalue": 1945,
        "tags": [
            "Theorie",
            "Internet",
            "Geschichte"
        ],
        "furtherInformation": []
    },
    {
        "title": "Monte-Carlo-Simulation",
        "fronttext": "Wenn mathematische oder physikalische Probleme exakt zu komplex zu berechnen sind, hilft dieser Algorithmus, indem er tausende Zufallsexperimente simuliert und statistisch auswertet.",
        "backtext": "Stanislaw Ulam hatte die Idee beim Solitaire-Spielen während seiner Krankheitsphase im Manhattan-Projekt. Zusammen mit John von Neumann entwickelte er die Methode, benannt nach dem berühmten Casino in Monaco.",
        "valuetext": "1946",
        "startvalue": 1946,
        "endvalue": 1946,
        "tags": [
            "Algorithmen",
            "Mathematik",
            "Geschichte"
        ],
        "furtherInformation": []
    },
    {
        "title": "Informationstheorie",
        "fronttext": "Er definierte die 'Bit'-Einheit und wie Informationen effizient übertragen und komprimiert werden können.",
        "backtext": "Claude Shannons Arbeit 'A Mathematical Theory of Communication' begründete die gesamte moderne Kommunikationstechnik.",
        "valuetext": "1948",
        "startvalue": 1948,
        "endvalue": 1948,
        "tags": [
            "Theorie",
            "Mathematik"
        ],
        "furtherInformation": []
    },
    {
        "title": "Die Chomsky-Hierarchie",
        "fronttext": "Ein mathematisches Modell zur Klassifikation von formalen Grammatiken, das festlegt, wie komplex eine Sprache ist und welcher Automat sie verarbeiten kann.",
        "backtext": "Noam Chomsky teilte Sprachen in vier Klassen ein. Diese Automatentheorie ist bis heute das absolute Fundament für die Funktionsweise von Compilern und Parsern.",
        "valuetext": "1956",
        "startvalue": 1956,
        "endvalue": 1956,
        "tags": [
            "Theorie",
            "Sprachen",
            "Mathematik",
            "!wichtig"
        ],
        "furtherInformation": []
    },
    {
        "title": "Dijkstra-Algorithmus",
        "fronttext": "Ob Navigationssystem im Auto oder Datenrouting im Internet: Dieser klassische Graph-Algorithmus findet in kürzester Zeit den optimalen Pfad zwischen zwei Knoten.",
        "backtext": "Edsger W. Dijkstra konzipierte das Verfahren angeblich innerhalb von 20 Minuten bei einer Tasse Kaffee. Er arbeitet nach dem Greedy-Prinzip (Gierige Suche) und bewertet Pfadlängen Schritt für Schritt, um den mathematisch kürzesten Weg zu garantieren.",
        "valuetext": "1956",
        "startvalue": 1956,
        "endvalue": 1956,
        "tags": [
            "Algorithmen",
            "Theorie",
            "!wichtig",
            "!einfach"
        ],
        "furtherInformation": []
    },
    {
        "title": "QuickSort",
        "fronttext": "Ein extrem populärer und hocheffizienter Sortieralgorithmus arbeitet nach dem Prinzip 'Teile und herrsche' ($Divide\\;and\\;Conquer$), indem er Elemente um ein gewähltes Pivot-Element herum partitioniert.",
        "backtext": "Sir Tony Hoare entwickelte dieses Verfahren, das im durchschnittlichen Fall eine hervorragende Laufzeit von $O(n \\log n)$ aufweist. Es gehört heute zum festen Kernbestand fast jeder nativen Programmierbibliothek.",
        "valuetext": "1959",
        "startvalue": 1959,
        "endvalue": 1959,
        "tags": [
            "Algorithmen",
            "Theorie",
            "!wichtig",
        ],
        "furtherInformation": []
    },
    {
        "title": "Strukturiertes Programmieren",
        "fronttext": "Der Aufruf, auf 'GOTO'-Befehle zu verzichten und Programme sauber in Schleifen und Bedingungen zu gliedern.",
        "backtext": "Edsger W. Dijkstra veröffentlichte dazu den berühmten Artikel 'Go To Statement Considered Harmful'.",
        "valuetext": "1968",
        "startvalue": 1968,
        "endvalue": 1968,
        "tags": [
            "Software",
            "Theorie"
        ],
        "furtherInformation": []
    },
    {
        "title": "Relationale Datenbanken (Codd)",
        "fronttext": "Schluss mit dem hierarchischen Daten-Chaos: Ein Mathematiker schlägt vor, Daten strikt in Tabellen mit Zeilen und Spalten zu organisieren, die über Schlüssel verknüpft sind.",
        "backtext": "Edgar F. Codd veröffentlichte 1970 seine fundamentale Arbeit. Sie bildet das theoretische Fundament für SQL und fast alle modernen relationalen Datenbanksysteme (RDBMS), die heute die Wirtschaft antreiben.",
        "valuetext": "1970",
        "startvalue": 1970,
        "endvalue": 1970,
        "tags": [
            "Theorie",
            "Software",
            "Standard"
        ],
        "furtherInformation": []
    },
    {
        "title": "P-NP-Problem",
        "fronttext": "Die wichtigste ungelöste Frage der Informatik: Ist jedes Problem, dessen Lösung schnell überprüft werden kann, auch schnell lösbar?",
        "backtext": "Stephen Cook formulierte das Problem der Komplexitätstheorie. Wer es löst, erhält 1 Million Dollar vom Clay Mathematics Institute.",
        "valuetext": "1971",
        "startvalue": 1971,
        "endvalue": 1971,
        "tags": [
            "Theorie",
            "Mathematik",
            "!wichtig"
        ],
        "furtherInformation": ["YouTube-Video (engl.): <a href='https://www.youtube.com/watch?v=rz1INSahE68' target='_blank'>PurpleMind: Computer Science's Biggest Mystery | P vs NP #SoME4</a>"]
    },
    {
        "title": "PageRank-Algorithmus",
        "fronttext": "Ein mathematischer Algorithmus bewertete die Relevanz von Webseiten rein anhand ihrer strukturellen Verlinkungen und legte damit das Fundament für die erfolgreichste Suchmaschine der Welt.",
        "backtext": "Larry Page und Sergey Brin entwickelten das Verfahren an der Stanford University und legten damit den Grundstein für Google.",
        "valuetext": "1998",
        "startvalue": 1998,
        "endvalue": 1998,
        "tags": [
            "Algorithmen",
            "Internet",
            "!wichtig"
        ],
        "furtherInformation": []
    },

    // ==========================================
    // 3. KRYPTOGRAPHIE & SICHERHEIT
    // ==========================================
    {
        "title": "Caesar-Chiffre",
        "fronttext": "Eine der ältesten geheimen Verschlüsselungen der Welt verschiebt jeden Buchstaben des Alphabets um eine feste Anzahl von Plätzen.",
        "backtext": "Julius Caesar nutzte dieses symmetrische Substitutionsverfahren mit einer Verschiebung von drei Buchstaben für seine militärische Korrespondenz. Es ist durch einfache Häufigkeitsanalyse extrem leicht zu knacken.",
        "valuetext": "um 50 v. Chr.",
        "startvalue": -60,
        "endvalue": -40,
        "tags": [
            "Kryptographie",
            "Geschichte",
            "!einfach"
        ],
        "furtherInformation": []
    },
    {
        "title": "Vigenère-Chiffre",
        "fronttext": "Über Jahrhunderte galt diese polyalphabetische Verschlüsselung als absolut unknackbar ('le chiffre indéchiffrable'), da sie wechselnde Geheimalphabete anhand eines Schlüsselworts nutzt.",
        "backtext": "Das Verfahren wurde eigentlich von Giovan Battista Bellaso entwickelt, aber fälschlicherweise Blaise de Vigenère zugeschrieben. Erst im 19. Jahrhundert gelang es Friedrich Kasiski und Charles Babbage unabhängig voneinander, die Periode des Schlüssels mathematisch zu brechen.",
        "valuetext": "1553",
        "startvalue": 1553,
        "endvalue": 1553,
        "tags": [
            "Kryptographie",
            "Geschichte"
        ],
        "furtherInformation": []
    },
    {
        "title": "Kerckhoffs' Prinzip",
        "fronttext": "Ein fundamentales Kriterium der modernen Kryptographie besagt: Die Sicherheit eines Schutzes darf nicht auf der Geheimhaltung des Algorithmus beruhen, sondern einzig auf der Geheimhaltung des Schlüssels.",
        "backtext": "Auguste Kerckhoffs vom militärischen Aufklärungsdienst formulierte dieses Prinzip im 19. Jahrhundert. Es bildet das direkte Gegenkonzept zu 'Security through obscurity' (Sicherheit durch Unklarheit) und begründet offene Quelltext-Sicherheitsstandards.",
        "valuetext": "1883",
        "startvalue": 1883,
        "endvalue": 1883,
        "tags": [
            "Kryptographie",
            "Theorie",
            "!wichtig"
        ],
        "furtherInformation": []
    },
    {
        "title": "One-Time-Pad",
        "fronttext": "Das einzige nachweislich mathematisch absolut unknackbare Verschlüsselungsverfahren – unter der Bedingung, dass der Schlüssel rein zufällig generiert, absolut geheim gehalten und exakt so lang wie die Nachricht selbst ist.",
        "backtext": "Gilbert Vernam und Joseph Mauborgne erfanden dieses System. Claude Shannon bewies später im Rahmen der Informationstheorie dessen mathematisch perfekte Sicherheit. Größte Schwachstelle ist der logistische Austausch des riesigen Schlüssels.",
        "valuetext": "1917",
        "startvalue": 1917,
        "endvalue": 1917,
        "tags": [
            "Kryptographie",
            "Mathematik"
        ],
        "furtherInformation": []
    },
    {
        "title": "Enigma-Maschine",
        "fronttext": "Die elektromechanische Rotor-Schlüsselmaschine, deren Knackung den Zweiten Weltkrieg verkürzte.",
        "backtext": "Marian Rejewski und später das Team um Alan Turing nutzten frühe computerähnliche Maschinen ('Turing-Bombe'), um die Codes zu brechen.",
        "valuetext": "1939-1945",
        "startvalue": 1939,
        "endvalue": 1945,
        "tags": [
            "Kryptographie",
            "Hardware",
            "Geschichte",
            "Sicherheit",
            "!wichtig"
        ],
        "furtherInformation": []
    },
    {
        "title": "Colossus",
        "fronttext": "Der erste elektronische Computer, der im Zweiten Weltkrieg zur Entzifferung verschlüsselter deutscher Nachrichten diente.",
        "backtext": "Colossus wurde in Bletchley Park unter Mitwirkung von Tommy Flowers gebaut und knackte die Lorenz-Schlüsselmaschine.",
        "valuetext": "1943",
        "startvalue": 1943,
        "endvalue": 1943,
        "tags": [
            "Hardware",
            "Kryptographie",
            "Sicherheit",
            "Pionier"
        ],
        "furtherInformation": []
    },
    {
        "title": "Creeper – Das erste Computervirus",
        "fronttext": "Ein experimentelles, sich selbst replizierendes Programm wandert durch das ARPANET und gibt die Nachricht aus: 'I'm the creeper, catch me if you can!'",
        "backtext": "Bob Thomas schrieb 1971 den Code, um die Machbarkeit mobiler Anwendungen zu testen. Es beschädigte nichts, gilt aber als das allererste Computervirus der Geschichte.",
        "valuetext": "1971",
        "startvalue": 1971,
        "endvalue": 1971,
        "tags": [
            "Netzwerk",
            "Sicherheit",
            "Geschichte"
        ],
        "furtherInformation": []
    },
    {
        "title": "Diffie-Hellman-Schlüsselaustausch",
        "fronttext": "Wie können zwei Personen über eine öffentlich belauschte Leitung ein geheimes Kennwort vereinbaren, ohne dass der Lauscher es rekonstruieren kann? Dieser Algorithmus löste das fundamentale Problem.",
        "backtext": "Whitfield Diffie und Martin Hellman revolutionierten die digitale Welt mit dem ersten asymmetrischen kryptographischen Protokoll. Es basiert auf Einwegfunktionen, genauer gesagt auf der mathematischen Schwierigkeit des diskreten Logarithmus.",
        "valuetext": "1976",
        "startvalue": 1976,
        "endvalue": 1976,
        "tags": [
            "Kryptographie",
            "Mathematik",
            "Theorie",
            "!wichtig"
        ],
        "furtherInformation": []
    },
    {
        "title": "RSA-Kryptosystem",
        "fronttext": "Dieses Public-Key-Verfahren schützt bis heute den globalen Internetverkehr, indem es auf der extremen Schwierigkeit basiert, das Produkt zweier gigantischer Primzahlen zu zerlegen.",
        "backtext": "Entworfen von Ron Rivest, Adi Shamir und Leonard Adleman. Während das Multiplizieren zweier Primzahlen für Computer kinderleicht ist, ist das Zurückrechnen (Faktorisieren) ohne den geheimen privaten Schlüssel (die 'Falltür') faktisch unlösbar.",
        "valuetext": "1977",
        "startvalue": 1977,
        "endvalue": 1977,
        "tags": [
            "Kryptographie",
            "Mathematik",
            "Theorie",
            "!wichtig"
        ],
        "furtherInformation": []
    },
    {
        "title": "Der Morris-Wurm",
        "fronttext": "Das erste Computerprogramm, das sich massenhaft über das Internet verbreitete und tausende Rechner lahmlegte.",
        "backtext": "Robert Tappan Morris wollte eigentlich nur die Größe des Internets messen, doch ein Programmierfehler führte zur unkontrollierten Vermehrung.",
        "valuetext": "1988",
        "startvalue": 1988,
        "endvalue": 1988,
        "tags": [
            "Netzwerk",
            "Sicherheit",
            "Geschichte"
        ],
        "furtherInformation": []
    },
    {
        "title": "PGP (Pretty Good Privacy)",
        "fronttext": "Die erste Verschlüsselungssoftware für jedermann, die so stark war, dass die US-Regierung sie als Kriegswaffe einstufte.",
        "backtext": "Phil Zimmermann veröffentlichte den Quellcode, um die Privatsphäre im digitalen Zeitalter zu schützen, und riskierte dafür eine Gefängnisstrafe.",
        "valuetext": "1991",
        "startvalue": 1991,
        "endvalue": 1991,
        "tags": [
            "Kryptographie",
            "Software",
            "Sicherheit"
        ],
        "furtherInformation": []
    },
    {
        "title": "Shor-Algorithmus",
        "fronttext": "Ein theoretischer Quantencomputer-Algorithmus, der in der Lage wäre, gängige asymmetrische Verschlüsselungen wie RSA im Handumdrehen auszuhebeln.",
        "backtext": "Peter Shor bewies, dass ein hinreichend großer Quantencomputer die Primfaktorzerlegung in polynomieller Zeit ($O((\\log N)^3)$) lösen könnte. Diese Entdeckung treibt heute die globale Entwicklung der Post-Quanten-Kryptographie voran.",
        "valuetext": "1994",
        "startvalue": 1994,
        "endvalue": 1994,
        "tags": [
            "Kryptographie",
            "Algorithmen",
            "Theorie",
            "!wichtig"
        ],
        "furtherInformation": []
    },
    {
        "title": "Advanced Encryption Standard (AES)",
        "fronttext": "Der aktuelle, weltweit ungebrochene Standard für symmetrische Blockverschlüsselung wurde in einem jahrelangen, offenen Wettbewerb von zwei belgischen Kryptographen konzipiert und DES ablöste.",
        "backtext": "Joan Daemen und Vincent Rijmen entwickelten das 'Rijndael'-Verfahren, welches 2001 vom NIST standardisiert wurde. Es nutzt iterative Substitutions-Permutations-Netzwerke und schützt heutzutage sensible Regierungs-, VPN- und Bankdaten.",
        "valuetext": "2001",
        "startvalue": 2001,
        "endvalue": 2001,
        "tags": [
            "Kryptographie",
            "Theorie",
            "Standard"
        ],
        "furtherInformation": []
    },
    {
        "title": "Stuxnet",
        "fronttext": "Ein hochkomplexer Schadcode manipuliert gezielt industrielle Infrastrukturen und läutet die Ära der physisch zerstörerischen Cyber-Kriegsführung ein.",
        "backtext": "2010 entdeckt, infizierte dieser Wurm gezielt Siemens-Steuerungen (SPS) in iranischen Nuklearanlagen. Er beschädigte die Uran-Zentrifugen durch extreme Drehzahländerungen, während er den Überwachungssystemen normalen Betrieb vorgaukelte.",
        "valuetext": "2010",
        "startvalue": 2010,
        "endvalue": 2010,
        "tags": [
            "Sicherheit",
            "Software",
            "Geschichte"
        ],
        "furtherInformation": []
    },
    {
        "title": "Snowden-Enthüllungen & HTTPS-Boom",
        "fronttext": "Ein Whistleblower auf der Flucht deckt die lückenlose digitale Massenüberwachung globaler Geheimdienste auf und verändert das Sicherheitsbewusstsein des Internets nachhaltig.",
        "backtext": "Edward Snowdens Dokumente von 2013 zeigten, dass unverschlüsselter Web-Verkehr massenhaft abgefangen wurde. Dies stieß die weltweite, flächendeckende Umstellung von HTTP auf das verschlüsselte HTTPS an.",
        "valuetext": "2013",
        "startvalue": 2013,
        "endvalue": 2013,
        "tags": [
            "Internet",
            "Sicherheit",
            "Gesellschaft"
        ],
        "furtherInformation": []
    },
    {
        "title": "Der Heartbleed-Bug",
        "fronttext": "Ein unbemerktes Sicherheitsloch in einer extrem weit verbreiteten Verschlüsselungs-Bibliothek erlaubt es Angreifern, private Server-Schlüssel und Passwörter unbemerkt auszulesen.",
        "backtext": "Im Jahr 2014 wurde dieser kritische Bug in OpenSSL entdeckt. Durch einen fehlenden Validierungs-Check (Missing Bounds Check) bei einer Heartbeat-Anfrage gab der Server mehr Arbeitsspeicherpreis, als er sollte.",
        "valuetext": "2014",
        "startvalue": 2014,
        "endvalue": 2014,
        "tags": [
            "Sicherheit",
            "Software",
            "Internet"
        ],
        "furtherInformation": []
    },
    {
        "title": "WannaCry Ransomware-Krise",
        "fronttext": "Ein globaler Krypto-Trojaner verschlüsselt innerhalb weniger Stunden Hunderttausende Computer in Krankenhäusern, Behörden und Firmen und fordert Lösegeld in Bitcoin.",
        "backtext": "Im Mai 2017 nutzte der Exploit 'EternalBlue' (eine zuvor von der NSA entdeckte Windows-Sicherheitslücke) ein unverschlüsseltes Netzwerkprotokoll aus, um sich rasant und vollautomatisch weltweit zu verbreiten.",
        "valuetext": "2017",
        "startvalue": 2017,
        "endvalue": 2017,
        "tags": [
            "Kryptographie",
            "Sicherheit",
            "Modern"
        ],
        "furtherInformation": []
    },

    // ==========================================
    // 4. HARDWARE-MEILENSTEINE
    // ==========================================
    {
        "title": "Zuse Z3",
        "fronttext": "Der erste funktionsfähige, frei programmierbare und vollautomatische Rechenrechner der Welt.",
        "backtext": "Konrad Zuse baute den Z3 in Berlin. Er arbeitete bereits mit dem binären Gleitkommasystem statt des dezimalen Systems.",
        "valuetext": "1941",
        "startvalue": 1941,
        "endvalue": 1941,
        "tags": [
            "Hardware",
            "Pionier",
            "Geschichte",
            "!wichtig",
            "!einfach"
        ],
        "furtherInformation": []
    },
    {
        "title": "ENIAC",
        "fronttext": "Der erste elektronische Universalrechner (General Purpose Computer), der ohne mechanische Teile arbeitete.",
        "backtext": "Mit über 17.000 Elektronenröhren füllte er einen ganzen Raum und wurde u.a. zur Berechnung von Schusstafeln für die Artillerie genutzt.",
        "valuetext": "1945",
        "startvalue": 1945,
        "endvalue": 1945,
        "tags": [
            "Hardware",
            "Pionier",
            "Geschichte",
            "!wichtig"
        ],
        "furtherInformation": []
    },
    {
        "title": "Von-Neumann-Architektur",
        "fronttext": "Ein Konzept, bei dem Programmdaten und Befehle im selben Speicher abgelegt werden.",
        "backtext": "Dieses von John von Neumann beschriebene Modell ist bis heute die Basis für fast alle modernen Computer-CPUs.",
        "valuetext": "1945",
        "startvalue": 1945,
        "endvalue": 1945,
        "tags": [
            "Theorie",
            "Hardware",
            "Pionier",
            "!wichtig"
        ],
        "furtherInformation": []
    },
    {
        "title": "Erfindung des Transistors",
        "fronttext": "Das Bauteil, das die Elektronenröhre ersetzte und Computer klein, zuverlässig und effizient machte.",
        "backtext": "Bardeen, Brattain und Shockley erhielten für diese Revolution bei den Bell Labs den Nobelpreis für Physik.",
        "valuetext": "1947",
        "startvalue": 1947,
        "endvalue": 1947,
        "tags": [
            "Hardware",
            "Pionier",
            "!wichtig",
            "!einfach"
        ],
        "furtherInformation": []
    },
    {
        "title": "UNIVAC I",
        "fronttext": "Der erste kommerziell in Serie hergestellte Computer der USA erlangt Berühmtheit, als er den Ausgang einer US-Präsidentschaftswahl verblüffend präzise vorhersagt.",
        "backtext": "1951 von Eckert und Mauchly gebaut, prognostizierte die Maschine den Erdrutschsieg von Eisenhower im Fernsehen korrekt, obwohl menschliche Experten ein knappes Rennen erwarteten.",
        "valuetext": "1951",
        "startvalue": 1951,
        "endvalue": 1951,
        "tags": [
            "Hardware",
            "Geschichte"
        ],
        "furtherInformation": []
    },
    {
        "title": "Magnetkernspeicher (Core Memory)",
        "fronttext": "Die erste zuverlässige Form von Arbeitsspeicher (RAM) in Computern, die Daten über winzige magnetische Ringe speicherte.",
        "backtext": "Die Ringe wurden von Hand auf Drähte gefädelt. Der Speicher war nicht-flüchtig und behielt seine Daten auch nach dem Ausschalten des Stroms.",
        "valuetext": "1951",
        "startvalue": 1951,
        "endvalue": 1951,
        "tags": [
            "Hardware",
            "Speicher"
        ],
        "furtherInformation": []
    },
    {
        "title": "Die erste Festplatte (RAMAC 305)",
        "fronttext": "Ein riesiges Gerät von der Größe zweier Kühlschränke, das lediglich 5 Megabyte speichern konnte.",
        "backtext": "IBM vermietete das System für 3.200 Dollar pro Monat. Die Daten wurden auf 50 riesigen magnetischen Scheiben gespeichert.",
        "valuetext": "1956",
        "startvalue": 1956,
        "endvalue": 1956,
        "tags": [
            "Hardware",
            "Speicher",
            "Geschichte"
        ],
        "furtherInformation": []
    },
    {
        "title": "Integrierter Schaltkreis (Chip)",
        "fronttext": "Die Kombination vieler Transistoren auf einem einzigen Halbleiter-Plättchen.",
        "backtext": "Jack Kilby (Texas Instruments) und Robert Noyce (Fairchild Semiconductor) erfanden den Chip fast gleichzeitig.",
        "valuetext": "1958/59",
        "startvalue": 1958,
        "endvalue": 1959,
        "tags": [
            "Hardware",
            "Pionier",
            "!wichtig"
        ],
        "furtherInformation": []
    },
    {
        "title": "Sketchpad",
        "fronttext": "Ein Meilenstein der Mensch-Maschine-Interaktion: Das erste Programm, mit dem man mittels eines Lichtstifts direkt Grafiken auf einem Bildschirm zeichnen und manipulieren konnte.",
        "backtext": "Ivan Sutherlands Doktorarbeit von 1963 gilt als Urvater der grafischen Benutzeroberflächen (GUI) sowie von CAD-Software und der modernen Computergrafik.",
        "valuetext": "1963",
        "startvalue": 1963,
        "endvalue": 1963,
        "tags": [
            "Hardware",
            "Grafik",
            "Pionier"
        ],
        "furtherInformation": []
    },
    {
        "title": "IBM System/360",
        "fronttext": "Die erste Computer-Familie, bei der Software auf verschiedenen Modellen derselben Serie laufen konnte.",
        "backtext": "Zuvor musste für jeden neuen Computer die Software neu geschrieben werden. Das S/360 begründete das Konzept der Software-Kompatibilität.",
        "valuetext": "1964",
        "startvalue": 1964,
        "endvalue": 1964,
        "tags": [
            "Hardware",
            "Geschichte",
            "Software"
        ],
        "furtherInformation": []
    },
    {
        "title": "PDP-8 (Minicomputer)",
        "fronttext": "Der erste kommerziell erfolgreiche 'Minicomputer'. Er war klein genug, um auf einem Schreibtisch Platz zu finden.",
        "backtext": "Zuvor waren Computer schrankgroße Ungetüme für Millionen Dollar. Die PDP-8 von DEC öffnete die Computertechnik für kleinere Firmen und Labore.",
        "valuetext": "1965",
        "startvalue": 1965,
        "endvalue": 1965,
        "tags": [
            "Hardware",
            "Geschichte"
        ],
        "furtherInformation": []
    },
    {
        "title": "Mooresches Gesetz",
        "fronttext": "Die Vorhersage, dass sich die Anzahl der Transistoren auf einem Chip etwa alle zwei Jahre verdoppelt und damit auch die Rechenleistung.",
        "backtext": "Gordon Moore (Intel-Mitgründer) stellte diese Beobachtung auf, die fast 50 Jahre lang die Entwicklung der Hardware diktierte.",
        "valuetext": "1965",
        "startvalue": 1965,
        "endvalue": 1965,
        "tags": [
            "Hardware",
            "Geschichte",
            "!wichtig",
            "!einfach"
        ],
        "furtherInformation": []
    },
    {
        "title": "Die erste Computermaus",
        "fronttext": "Ein hölzernes Kästchen mit zwei Rädern, das die Interaktion mit Bildschirmen revolutionierte.",
        "backtext": "Douglas Engelbart präsentierte sie in der 'Mother of All Demos' zusammen mit Hypertext und Videokonferenzen.",
        "valuetext": "1968",
        "startvalue": 1968,
        "endvalue": 1968,
        "tags": [
            "Hardware",
            "Grafik",
            "Pionier",
            "!einfach"
        ],
        "furtherInformation": []
    },
    {
        "title": "Der erste Mikroprozessor (Intel 4004)",
        "fronttext": "Zum ersten Mal passte die gesamte Zentraleinheit (CPU) eines Computers auf einen einzigen Chip.",
        "backtext": "Dies ermöglichte den Bau von kleinen Geräten, die zuvor ganze Räume füllten.",
        "valuetext": "1971",
        "startvalue": 1971,
        "endvalue": 1971,
        "tags": [
            "Hardware",
            "Pionier",
            "!wichtig"
        ],
        "furtherInformation": []
    },
    {
        "title": "Floppy Disk (Disketten)",
        "fronttext": "Das erste populäre Medium zum Datenaustausch, erfunden von Alan Shugart bei IBM.",
        "backtext": "Die ersten Disketten waren 8 Zoll groß und biegsam (daher 'floppy'). Später folgten die 5,25-Zoll- und die starren 3,5-Zoll-Disketten und fassten nur 1,44 MB. Das 'Speichern'-Icon in Software hat noch heute ihre Form.",
        "valuetext": "1971",
        "startvalue": 1971,
        "endvalue": 1971,
        "tags": [
            "Hardware",
            "Speicher",
            "!wichtig",
            "!einfach"
        ],
        "furtherInformation": []
    },
    {
        "title": "Ethernet",
        "fronttext": "Die Technologie zur lokalen Vernetzung von Computern mittels Kabeln (LAN).",
        "backtext": "Robert Metcalfe entwickelte Ethernet bei Xerox PARC; es wurde zum weltweiten Standard für LAN-Verbindungen.",
        "valuetext": "1973",
        "startvalue": 1973,
        "endvalue": 1973,
        "tags": [
            "Hardware",
            "Netzwerk",
            "Standard",
            "Infrastruktur"
        ],
        "furtherInformation": []
    },
    {
        "title": "Xerox Alto",
        "fronttext": "Der erste Computer mit grafischer Benutzeroberfläche (GUI), Fenstern, Icons und einer Maus.",
        "backtext": "Obwohl nie kommerziell erfolgreich, inspirierte der Alto direkt den Apple Macintosh und Microsoft Windows.",
        "valuetext": "1973",
        "startvalue": 1973,
        "endvalue": 1973,
        "tags": [
            "Hardware",
            "Grafik",
            "Pionier"
        ],
        "furtherInformation": []
    },
    {
        "title": "Altair 8800",
        "fronttext": "Der Bausatz, der die Heimcomputer-Revolution auslöste und Bill Gates zur Gründung von Microsoft bewegte.",
        "backtext": "Der Computer hatte keinen Bildschirm und keine Tastatur, wurde aber zum Kultobjekt der ersten Hacker-Generation.",
        "valuetext": "1975",
        "startvalue": 1975,
        "endvalue": 1975,
        "tags": [
            "Hardware",
            "Geschichte",
            "Pionier"
        ],
        "furtherInformation": []
    },
    {
        "title": "Cray-1 Supercomputer",
        "fronttext": "Der schnellste Rechner seiner Zeit, berühmt für seine hufeisenförmige Bauweise zur Minimierung der Kabellängen.",
        "backtext": "Seymour Cray schuf eine Ikone des High-Performance-Computings, die 160 Millionen Rechenoperationen pro Sekunde (MFLOPS) schaffte.",
        "valuetext": "1976",
        "startvalue": 1976,
        "endvalue": 1976,
        "tags": [
            "Hardware",
            "Geschichte"
        ],
        "furtherInformation": []
    },
    {
        "title": "Apple I & II",
        "fronttext": "Die Computer, die Apple zum Erfolg führten und das Design von 'Computern für alle' prägten.",
        "backtext": "Steve Wozniak entwarf die Hardware, Steve Jobs vermarktete sie. Der Apple II war der erste PC, der fertig montiert im Gehäuse verkauft wurde.",
        "valuetext": "1976/77",
        "startvalue": 1976,
        "endvalue": 1977,
        "tags": [
            "Hardware",
            "Geschichte",
            "Pionier"
        ],
        "furtherInformation": []
    },
    {
        "title": "IBM PC",
        "fronttext": "Der Computer, der den Begriff 'PC' zum Standard machte und die Business-Welt digitalisierte.",
        "backtext": "Durch die offene Architektur und das Betriebssystem von Microsoft (MS-DOS) entstand ein riesiger Markt für kompatible Klone.",
        "valuetext": "1981",
        "startvalue": 1981,
        "endvalue": 1981,
        "tags": [
            "Hardware",
            "Geschichte",
            "!wichtig"
        ],
        "furtherInformation": []
    },
    {
        "title": "Compact Disc (CD)",
        "fronttext": "Der erste weltweit standardisierte optische Datenträger revolutioniert die Musikindustrie und verdrängt die Schallplatte durch digitale, laserschnittene Präzision.",
        "backtext": "Gemeinsam von Philips und Sony entwickelt, bot sie Platz für bis zu 700 MB bzw. bis zu 74 Minuten fehlerfreien digitalen Ton – eine Länge, die angeblich gewählt wurde, um Beethovens 9. Sinfonie am Stück abspielen zu können.",
        "valuetext": "1982",
        "startvalue": 1982,
        "endvalue": 1982,
        "tags": [
            "Hardware",
            "Speicher",
            "Medien"
        ],
        "furtherInformation": []
    },
    {
        "title": "Apple Macintosh",
        "fronttext": "Der erste erschwingliche Computer mit grafischer Benutzeroberfläche für den Massenmarkt.",
        "backtext": "Bekannt durch den '1984'-Werbespot, ersetzte der Mac Befehlszeilen durch Fenster und einen Papierkorb.",
        "valuetext": "1984",
        "startvalue": 1984,
        "endvalue": 1984,
        "tags": [
            "Hardware",
            "Grafik",
            "Geschichte"
        ],
        "furtherInformation": []
    },
    {
        "title": "Digital Versatile Disc (DVD)",
        "fronttext": "Der Nachfolger der CD erhöht die Speicherkapazität durch einen feineren Laser drastisch und läutet das Ende der klobigen VHS-Videokassetten im Heimkino ein.",
        "backtext": "Ein Konsortium aus Tech- und Medienriesen einigte sich auf diesen gemeinsamen Standard, um einen Formatkrieg zu verhindern. Mit anfangs 4,7 GB Speicherplatz wurde sie auch zum neuen Standardmedium für große PC-Software und Spiele.",
        "valuetext": "1995/96",
        "startvalue": 1995,
        "endvalue": 1996,
        "tags": [
            "Hardware",
            "Speicher",
            "Medien"
        ],
        "furtherInformation": []
    },
    {
        "title": "3dfx Voodoo Graphics",
        "fronttext": "Die legendäre Zusatzsteckkarte, die dedizierte 3D-Grafikbeschleunigung auf PCs massentauglich machte.",
        "backtext": "Sie berechnete Texturen und Polygone direkt in Hardware. Spiele wie 'Tomb Raider' sahen plötzlich flüssig aus und lösten einen PC-Aufrüst-Boom aus.",
        "valuetext": "1996",
        "startvalue": 1996,
        "endvalue": 1996,
        "tags": [
            "Hardware",
            "Gaming",
            "Grafik"
        ],
        "furtherInformation": []
    },
    {
        "title": "USB-Standard (Universal Serial Bus)",
        "fronttext": "Der Anschluss, der das Chaos auf der PC-Rückseite beendete, indem er serielle, parallele und PS/2-Stecker ersetzte.",
        "backtext": "Ein Konsortium um Intel erfand USB. Dank 'Plug and Play' erkannten Betriebssysteme Geräte nun im laufenden Betrieb ohne Neustart.",
        "valuetext": "1996",
        "startvalue": 1996,
        "endvalue": 1996,
        "tags": [
            "Hardware",
            "Standard",
            "!einfach",
            "!wichtig"
        ],
        "furtherInformation": []
    },
    {
        "title": "Wi-Fi Standard (IEEE 802.11)",
        "fronttext": "Die Geburtsstunde des modernen drahtlosen lokalen Netzwerks (WLAN).",
        "backtext": "Das Protokoll legte fest, wie Daten per Funk im 2,4-GHz-Band übertragen werden. Apple war 1999 mit 'AirPort' der erste große Hersteller, der es im Laptop verbaute.",
        "valuetext": "1997",
        "startvalue": 1997,
        "endvalue": 1997,
        "tags": [
            "Hardware",
            "Netzwerk",
            "Standard",
            "Infrastruktur"
        ],
        "furtherInformation": []
    },
    {
        "title": "Der erste iMac (G3)",
        "fronttext": "Ein radikal designter All-in-One-Computer in knallbuntem, transparentem Kunststoffgehäuse rettet einen Traditionshersteller vor dem Bankrott und läutet das Ende des Diskettenlaufwerks ein.",
        "backtext": "Apple präsentierte den iMac 1998. Er verzichtete komplett auf alte Legacy-Anschlüsse und setzte stattdessen radikal auf den neuen USB-Standard sowie ein integriertes Modem für den unkomplizierten Internetzugang.",
        "valuetext": "1998",
        "startvalue": 1998,
        "endvalue": 1998,
        "tags": [
            "Hardware",
            "Geschichte",
            "Gesellschaft"
        ],
        "furtherInformation": []
    },
    {
        "title": "Erster experimenteller Quantencomputer",
        "fronttext": "Forschern gelingt die weltweit erste praktische Demonstration eines Quantenalgorithmus auf einem System mit zwei Quantenbits (Qubits).",
        "backtext": "Isaac Chuang und Neil Gershenfeld nutzten am MIT Kernspinresonanz-Verfahren (NMR), um den Grover-Suchalgorithmus auf einem simplen Zwei-Qubit-System auszuführen. Es bewies, dass die theoretischen Konzepte der Quantenmechanik real in Hardware umsetzbar sind.",
        "valuetext": "1998",
        "startvalue": 1998,
        "endvalue": 1998,
        "tags": [
            "Hardware",
            "Geschichte",
            "Modern"
        ],
        "furtherInformation": []
    },
    {
        "title": "GPU (NVIDIA GeForce 256)",
        "fronttext": "Die Geburtsstunde der modernen Grafikkarte, die Berechnungen von der CPU übernahm.",
        "backtext": "NVIDIA prägte mit der GeForce 256 den Begriff 'Graphics Processing Unit' (GPU) für Prozessoren mit integrierter Transformation und Beleuchtung.",
        "valuetext": "1999",
        "startvalue": 1999,
        "endvalue": 1999,
        "tags": [
            "Hardware",
            "Grafik",
            "Gaming"
        ],
        "furtherInformation": []
    },
    {
        "title": "Blu-ray Disc",
        "fronttext": "Ein erbitterter Formatkrieg um das hochauflösende Heimkino der Zukunft wird durch einen technologischen Wechsel von roten zu blau-violetten Lasern entschieden.",
        "backtext": "Sony setzte sich mit der Blu-ray (25 bis 50 GB Speicher) gegen die HD-DVD von Toshiba durch – maßgeblich unterstützt durch die Integration des Laufwerks in die PlayStation 3. Die extrem feine Wellenlänge des blauen Lasers ermöglichte die gigantische Datendichte.",
        "valuetext": "2006",
        "startvalue": 2006,
        "endvalue": 2006,
        "tags": [
            "Hardware",
            "Speicher",
            "Medien",
            "Gaming"
        ],
        "furtherInformation": []
    },
    {
        "title": "iPhone & die Smartphone-Revolution",
        "fronttext": "Ein iPod, ein Telefon und ein Internet-Kommunikator in einem Gerät mit Multitouch-Display.",
        "backtext": "Steve Jobs präsentierte das iPhone; es machte das Internet mobil und schuf das Zeitalter der Apps.",
        "valuetext": "2007",
        "startvalue": 2007,
        "endvalue": 2007,
        "tags": [
            "Hardware",
            "Gesellschaft",
            "!wichtig",
            "!einfach"
        ],
        "furtherInformation": []
    },
    {
        "title": "Raspberry Pi",
        "fronttext": "Ein vollwertiger Computer für nur ca. 35 Euro, der entwickelt wurde, um Informatik-Bildung weltweit zu fördern.",
        "backtext": "Der Kreditkarten-große Rechner löste einen gewaltigen Boom in der Maker-Szene und im Bereich Internet of Things (IoT) aus.",
        "valuetext": "2012",
        "startvalue": 2012,
        "endvalue": 2012,
        "tags": [
            "Hardware",
            "Software",
            "Modern"
        ],
        "furtherInformation": []
    },
    {
        "title": "Quantenüberlegenheit (Quantum Supremacy)",
        "fronttext": "Der Moment, in dem ein Quantencomputer eine Aufgabe löst, für die ein klassischer Supercomputer Jahrtausende bräuchte.",
        "backtext": "Google behauptete 2019, diesen Meilenstein mit dem Sycamore-Prozessor erreicht zu haben, was jedoch in der Fachwelt noch debattiert wird.",
        "valuetext": "2019",
        "startvalue": 2019,
        "endvalue": 2019,
        "tags": [
            "Hardware",
            "Theorie",
            "Modern"
        ],
        "furtherInformation": []
    },

    // ==========================================
    // 5. PROGRAMMIERSPRACHEN
    // ==========================================
    {
        "title": "FORTRAN",
        "fronttext": "Die erste weit verbreitete Hochsprache, speziell für wissenschaftliches und technisches Rechnen entwickelt.",
        "backtext": "John Backus leitete das IBM-Team. FORTRAN (Formula Translation) wird in modernisierten Versionen bis heute für Supercomputer genutzt.",
        "valuetext": "1957",
        "startvalue": 1957,
        "endvalue": 1957,
        "tags": [
            "Sprachen",
            "Software",
            "!wichtig"
        ],
        "furtherInformation": []
    },
    {
        "title": "LISP",
        "fronttext": "Diese Sprache führte Listenverarbeitung und Rekursion ein und wurde zum Standard der frühen KI-Forschung.",
        "backtext": "John McCarthy entwickelte LISP; sie ist eine der ältesten noch verwendeten Programmiersprachen.",
        "valuetext": "1958",
        "startvalue": 1958,
        "endvalue": 1958,
        "tags": [
            "Sprachen",
            "KI"
        ],
        "furtherInformation": []
    },
    {
        "title": "COBOL",
        "fronttext": "Eine Sprache, die wie Englisch klingen sollte, um die Programmierung für die Geschäftswelt zu öffnen.",
        "backtext": "Grace Hopper war maßgeblich beteiligt. COBOL (Common Business Oriented Language) steuert noch heute viele Bankensysteme.",
        "valuetext": "1959",
        "startvalue": 1959,
        "endvalue": 1959,
        "tags": [
            "Sprachen",
            "Software",
            "Frauen"
        ],
        "furtherInformation": []
    },
    {
        "title": "ALGOL 60",
        "fronttext": "Die Sprache, die den Standard für die Syntax fast aller späteren imperativen Programmiersprachen (wie C, Pascal, Java) setzte.",
        "backtext": "ALGOL führte formale Codeblöcke (`begin` ... `end`) und lokale Variablen ein. Sie war die erste Sprache, die mit der Backus-Naur-Form beschrieben wurde.",
        "valuetext": "1960",
        "startvalue": 1960,
        "endvalue": 1960,
        "tags": [
            "Sprachen",
            "Theorie"
        ],
        "furtherInformation": []
    },
    {
        "title": "BASIC",
        "fronttext": "Eine Programmiersprache, die so einfach war, dass sie jedem Studenten das Programmieren ermöglichen sollte.",
        "backtext": "Kemeny und Kurtz entwickelten BASIC am Dartmouth College. Sie wurde die Standard-Sprache der Heimcomputer-Revolution.",
        "valuetext": "1964",
        "startvalue": 1964,
        "endvalue": 1964,
        "tags": [
            "Sprachen",
            "Geschichte"
        ],
        "furtherInformation": []
    },
    {
        "title": "Simula 67",
        "fronttext": "Die allererste Programmiersprache, die das Konzept der 'Klassen' und 'Objekte' einführte.",
        "backtext": "Entwickelt von Ole-Johan Dahl und Kristen Nygaard in Norwegen, um physikalische Systeme zu simulieren. Sie erfanden damit die objektorientierte Programmierung.",
        "valuetext": "1967",
        "startvalue": 1967,
        "endvalue": 1967,
        "tags": [
            "Sprachen",
            "Pionier"
        ],
        "furtherInformation": []
    },
    {
        "title": "Pascal",
        "fronttext": "Eine von Niklaus Wirth entwickelte Sprache, die speziell entworfen wurde, um Studenten sauberes und strukturiertes Programmieren beizubringen.",
        "backtext": "Sie erlangte durch ihre starke Typisierung und Übersichtlichkeit riesige Popularität in der akademischen Ausbildung der 1970er und 80er Jahre.",
        "valuetext": "1970",
        "startvalue": 1970,
        "endvalue": 1970,
        "tags": [
            "Sprachen",
            "Geschichte"
        ],
        "furtherInformation": []
    },
    {
        "title": "Programmiersprache C",
        "fronttext": "Eine Sprache, die Hardwarenähe mit Portabilität verband und zum Fundament moderner Software wurde.",
        "backtext": "Dennis Ritchie entwickelte C, um Unix neu zu schreiben. Fast alle modernen Sprachen (C++, Java, Python) sind von C beeinflusst.",
        "valuetext": "1972",
        "startvalue": 1972,
        "endvalue": 1972,
        "tags": [
            "Sprachen",
            "Software",
            "!wichtig"
        ],
        "furtherInformation": []
    },
    {
        "title": "Prolog",
        "fronttext": "Die wichtigste deklarative Programmiersprache, bei der man keine Lösungswege programmiert, sondern logische Fakten und Regeln definiert.",
        "backtext": "Ein eingebauter Algorithmus (Inferenzmaschine) zieht automatische Schlüsse aus den Daten. Extrem populär in der frühen KI-Forschung.",
        "valuetext": "1972",
        "startvalue": 1972,
        "endvalue": 1972,
        "tags": [
            "Sprachen",
            "Logik",
            "KI"
        ],
        "furtherInformation": []
    },
    {
        "title": "Smalltalk",
        "fronttext": "Die Sprache, die das Konzept der objektorientierten Programmierung (OOP) und grafische Oberflächen perfektionierte.",
        "backtext": "Entwickelt am Xerox PARC von Alan Kay und anderen, beeinflusste Smalltalk Sprachen wie Java, Python und Ruby massiv.",
        "valuetext": "1972",
        "startvalue": 1972,
        "endvalue": 1972,
        "tags": [
            "Sprachen",
            "Pionier"
        ],
        "furtherInformation": []
    },
    {
        "title": "SQL (Structured Query Language)",
        "fronttext": "Die Standardsprache für die Kommunikation mit relationalen Datenbanken.",
        "backtext": "Donald D. Chamberlin und Raymond F. Boyce entwickelten sie bei IBM auf Basis von Edgar F. Codds relationalem Modell.",
        "valuetext": "1974",
        "startvalue": 1974,
        "endvalue": 1974,
        "tags": [
            "Sprachen",
            "Software",
            "Standard",
            "!wichtig"
        ],
        "furtherInformation": []
    },
    {
        "title": "C++",
        "fronttext": "Die Erweiterung von C um Klassen und Objekte, die die objektorientierte Programmierung populär machte.",
        "backtext": "Bjarne Stroustrup entwickelte 'C with Classes', um komplexe Simulationen effizienter schreiben zu können.",
        "valuetext": "1983",
        "startvalue": 1983,
        "endvalue": 1983,
        "tags": [
            "Sprachen",
            "Software"
        ],
        "furtherInformation": []
    },
    {
        "title": "Perl",
        "fronttext": "Das 'Schweizer Taschenmesser' der Programmiersprachen, besonders stark in der Textverarbeitung.",
        "backtext": "Larry Wall entwarf Perl mit dem Motto: 'There's more than one way to do it'. Sie war die dominierende Sprache des frühen Webs (CGI).",
        "valuetext": "1987",
        "startvalue": 1987,
        "endvalue": 1987,
        "tags": [
            "Sprachen",
            "Internet"
        ],
        "furtherInformation": []
    },
    {
        "title": "Python",
        "fronttext": "Eine Sprache, die Lesbarkeit und Einfachheit über alles stellt und heute die KI-Welt dominiert.",
        "backtext": "Guido van Rossum benannte die Sprache nach 'Monty Python's Flying Circus'. Sie ist heute eine der meistgenutzten Sprachen.",
        "valuetext": "1991",
        "startvalue": 1991,
        "endvalue": 1991,
        "tags": [
            "Sprachen",
            "Software",
            "OpenSource",
            "!wichtig"
        ],
        "furtherInformation": []
    },
    {
        "title": "Java",
        "fronttext": "Das Versprechen: 'Write Once, Run Anywhere' – Programme laufen auf jedem Gerät mit einer Virtual Machine.",
        "backtext": "James Gosling (Sun Microsystems) entwickelte Java; sie wurde zur wichtigsten Sprache für Unternehmensanwendungen.",
        "valuetext": "1995",
        "startvalue": 1995,
        "endvalue": 1995,
        "tags": [
            "Sprachen",
            "Software"
        ],
        "furtherInformation": []
    },
    {
        "title": "JavaScript",
        "fronttext": "In nur 10 Tagen entwickelt, um Webseiten interaktiv zu machen, wurde sie zur Sprache des Webs.",
        "backtext": "Brendan Eich schuf sie für Netscape. Trotz des ähnlichen Namens hat sie fast nichts mit Java zu tun.",
        "valuetext": "1995",
        "startvalue": 1995,
        "endvalue": 1995,
        "tags": [
            "Sprachen",
            "Internet",
            "!wichtig"
        ],
        "furtherInformation": []
    },
    {
        "title": "PHP",
        "fronttext": "Die Sprache, die das Web dynamisch machte, indem sie Code direkt in HTML-Dokumente einbettete.",
        "backtext": "Rasmus Lerdorf erstellte PHP für seine 'Personal Home Page'; heute laufen Plattformen wie Wikipedia und WordPress damit.",
        "valuetext": "1995",
        "startvalue": 1995,
        "endvalue": 1995,
        "tags": [
            "Sprachen",
            "Internet"
        ],
        "furtherInformation": []
    },
    {
        "title": "Ruby (und Ruby on Rails)",
        "fronttext": "Eine Sprache aus Japan, die mit dem Fokus auf 'Entwickler-Glück' und intuitive, fast wie Englisch lesbare Syntax entworfen wurde.",
        "backtext": "Yukihiro Matsumoto erschuf Ruby. Das spätere Web-Framework 'Ruby on Rails' revolutionierte das schnelle Bauen von Internet-Startups radikal.",
        "valuetext": "1995",
        "startvalue": 1995,
        "endvalue": 1995,
        "tags": [
            "Sprachen",
            "Internet"
        ],
        "furtherInformation": []
    },
    {
        "title": "Rust",
        "fronttext": "Eine moderne Sprache, die Speichersicherheit ohne Garbage Collector garantiert und C++ Konkurrenz macht.",
        "backtext": "Rust wurde bei Mozilla entwickelt und führt seit Jahren die Liste der 'beliebtesten Sprachen' in Entwickler-Umfragen an.",
        "valuetext": "2010",
        "startvalue": 2010,
        "endvalue": 2010,
        "tags": [
            "Sprachen",
            "Software",
            "Modern"
        ],
        "furtherInformation": []
    },
    {
        "title": "TypeScript",
        "fronttext": "Microsofts Antwort auf das Chaos bei großen Web-Projekten: Eine Erweiterung, die JavaScript um statische Typisierung ergänzt.",
        "backtext": "Entworfen von Anders Hejlsberg. TypeScript-Code wird vor der Ausführung in normalen JavaScript-Code kompiliert und verhindert zahllose Fehler zur Laufzeit.",
        "valuetext": "2012",
        "startvalue": 2012,
        "endvalue": 2012,
        "tags": [
            "Sprachen",
            "Internet",
            "Modern"
        ],
        "furtherInformation": []
    },
    {
        "title": "Die Programmiersprache Rust",
        "fronttext": "Eine neuartige Systemsprache tritt an, um maximale Performance und Hardwarenähe mit absoluter Speichersicherheit zu verbinden, ganz ohne langsamen Garbage Collector.",
        "backtext": "Ursprünglich von Graydon Hoare bei Mozilla entwickelt und 2015 stabilisiert, verhindert Rust fundamentale Speicherfehler (wie Buffer Overflows) bereits zur Kompilierzeit durch ein strenges 'Ownership'-Modell.",
        "valuetext": "2015",
        "startvalue": 2010,
        "endvalue": 2015,
        "tags": [
            "Sprachen",
            "Software",
            "Modern"
        ],
        "furtherInformation": []
    },

    // ==========================================
    // 6. BETRIEBSSYSTEME & ANWENDUNGSSOFTWARE
    // ==========================================
    {
        "title": "Der erste Compiler",
        "fronttext": "Ein Programm, das menschenlesbaren Code in Maschinencode übersetzt, erfunden von einer Pionierin.",
        "backtext": "Grace Hopper entwickelte A-0, womit Programmierer nicht mehr nur in binären Nullen und Einsen schreiben mussten.",
        "valuetext": "1952",
        "startvalue": 1952,
        "endvalue": 1952,
        "tags": [
            "Software",
            "Pionier",
            "Frauen",
            "!wichtig"
        ],
        "furtherInformation": []
    },
    {
        "title": "Unix",
        "fronttext": "Das einflussreichste Betriebssystem, das auf Mehrbenutzerbetrieb und Modularität setzt.",
        "backtext": "Ken Thompson und Dennis Ritchie entwickelten Unix bei den Bell Labs. Seine Philosophie prägt macOS, Linux und Android bis heute.",
        "valuetext": "1969",
        "startvalue": 1969,
        "endvalue": 1969,
        "tags": [
            "Software",
            "Pionier",
            "!wichtig"
        ],
        "furtherInformation": []
    },
    {
        "title": "VisiCalc",
        "fronttext": "Die allererste Tabellenkalkulation der Welt. Sie machte den Apple II Computer schlagartig vom Spielzeug zum unverzichtbaren Büro-Werkzeug.",
        "backtext": "Dan Bricklin und Bob Frankston erfanden VisiCalc. Es gilt als die erste 'Killer-Applikation' der Softwaregeschichte – eine Software, die Hardware-Verkäufe antreibt.",
        "valuetext": "1979",
        "startvalue": 1979,
        "endvalue": 1979,
        "tags": [
            "Software",
            "Geschichte",
            "Pionier"
        ],
        "furtherInformation": []
    },
    {
        "title": "MS-DOS",
        "fronttext": "Das textbasierte Betriebssystem, das Microsoft zum Weltmarktführer machte.",
        "backtext": "Ursprünglich als QDOS gekauft, wurde es für den IBM PC lizenziert und bildete das Rückgrat der frühen PC-Ära.",
        "valuetext": "1981",
        "startvalue": 1981,
        "endvalue": 1981,
        "tags": [
            "Software",
            "Geschichte",
            "!wichtig"
        ],
        "furtherInformation": []
    },
    {
        "title": "GNU-Projekt & Free Software",
        "fronttext": "Die Bewegung, die forderte, dass Software-Quellcode für jeden frei verfügbar, veränderbar und teilbar sein muss.",
        "backtext": "Richard Stallman startete GNU ('GNU's Not Unix') und schrieb die GPL-Lizenz, die später die Basis für Linux wurde.",
        "valuetext": "1983",
        "startvalue": 1983,
        "endvalue": 1983,
        "tags": [
            "Software",
            "OpenSource",
            "Geschichte"
        ],
        "furtherInformation": []
    },
    {
        "title": "Windows 1.0",
        "fronttext": "Microsofts erster Versuch einer grafischen Benutzeroberfläche, die auf MS-DOS aufsetzte.",
        "backtext": "Anfangs belächelt, entwickelte sich Windows bis zur Version 3.1 und 95 zum dominierenden System auf Desktop-Rechnern.",
        "valuetext": "1985",
        "startvalue": 1985,
        "endvalue": 1985,
        "tags": [
            "Software",
            "Geschichte"
        ],
        "furtherInformation": []
    },
    {
        "title": "Adobe Photoshop",
        "fronttext": "Das Programm der Brüder Thomas und John Knoll, das digitale Bildbearbeitung so sehr dominierte, dass der Name zum Verb wurde.",
        "backtext": "Ursprünglich als 'Display' gestartet, kaufte Adobe die Lizenz. Es veränderte die Medien- und Designwelt sowie unsere Wahrnehmung von visueller Realität.",
        "valuetext": "1990",
        "startvalue": 1990,
        "endvalue": 1990,
        "tags": [
            "Software",
            "Grafik",
            "Geschichte",
            "Medien"
        ],
        "furtherInformation": []
    },
    {
        "title": "Linux-Kernel",
        "fronttext": "Ein Student aus Finnland schrieb ein freies, Unix-ähnliches Betriebssystem 'nur als Hobby'.",
        "backtext": "Linus Torvalds startete das Projekt, das heute fast alle Server, Supercomputer und Android-Telefone weltweit antreibt.",
        "valuetext": "1991",
        "startvalue": 1991,
        "endvalue": 1991,
        "tags": [
            "Software",
            "OpenSource",
            "!wichtig"
        ],
        "furtherInformation": []
    },
    {
        "title": "MP3-Format",
        "fronttext": "Die Audiokomprimierung, die Musikdateien auf ein Zehntel verkleinerte, ohne dass das menschliche Ohr einen großen Unterschied hört.",
        "backtext": "Entwickelt maßgeblich am Fraunhofer-Institut (IIS) in Erlangen, veränderte MP3 die gesamte Medienwelt.",
        "valuetext": "1991",
        "startvalue": 1991,
        "endvalue": 1991,
        "tags": [
            "Software",
            "Medien",
            "Standard"
        ],
        "furtherInformation": []
    },
    {
        "title": "Mosaic Browser",
        "fronttext": "Der erste Webbrowser, der Bilder direkt im Text anzeigen konnte und das Web grafisch machte.",
        "backtext": "Marc Andreessen entwickelte ihn am NCSA; daraus entstand später der Netscape Navigator und indirekt Firefox.",
        "valuetext": "1993",
        "startvalue": 1993,
        "endvalue": 1993,
        "tags": [
            "Software",
            "Internet",
            "Webseite",
            "Pionier"
        ],
        "furtherInformation": []
    },
    {
        "title": "Netscape Navigator",
        "fronttext": "Der erste kommerziell erfolgreiche Webbrowser, der den 'Browserkrieg' gegen Microsofts Internet Explorer auslöste.",
        "backtext": "Netscape verlor den Krieg zwar, begründete vor dem Untergang jedoch das Mozilla-Projekt und schenkte der Welt den Quellcode für den heutigen Firefox.",
        "valuetext": "1994",
        "startvalue": 1994,
        "endvalue": 1994,
        "tags": [
            "Software",
            "Internet",
            "Webseite"
        ],
        "furtherInformation": []
    },
    {
        "title": "Apache HTTP Server",
        "fronttext": "Die Open-Source-Software, die das frühe World Wide Web trug, indem sie Anfragen von Browsern beantwortete und Webseiten auslieferte.",
        "backtext": "Der Name entstand, weil die Entwickler ein bestehendes Programm immer wieder mit Software-Flicken ('a patchy server') versahen. Er dominierte jahrzehntelang den Server-Markt.",
        "valuetext": "1995",
        "startvalue": 1995,
        "endvalue": 1995,
        "tags": [
            "Software",
            "Internet",
            "OpenSource",
            "Infrastruktur"
        ],
        "furtherInformation": []
    },
    {
        "title": "Git & Versionskontrolle",
        "fronttext": "Ein Tool, das es Tausenden Entwicklern ermöglicht, gleichzeitig am selben Code zu arbeiten, ohne sich gegenseitig zu überschreiben.",
        "backtext": "Linus Torvalds entwickelte Git in nur wenigen Tagen, um die Arbeit am Linux-Kernel besser zu organisieren.",
        "valuetext": "2005",
        "startvalue": 2005,
        "endvalue": 2005,
        "tags": [
            "Software",
            "OpenSource",
            "Standard"
        ],
        "furtherInformation": []
    },
    {
        "title": "Docker & Container",
        "fronttext": "Software wird in isolierte Pakete verpackt, die überall exakt gleich laufen, egal auf welchem Server.",
        "backtext": "Docker machte Container-Technologie massentauglich und revolutionierte das Deployment von Webanwendungen.",
        "valuetext": "2013",
        "startvalue": 2013,
        "endvalue": 2013,
        "tags": [
            "Software",
            "Infrastruktur",
            "Modern",
            "OpenSource"
        ],
        "furtherInformation": []
    },
    {
        "title": "Kubernetes",
        "fronttext": "Ein von Google entwickeltes Open-Source-System zur automatischen Verwaltung und Skalierung von Tausenden Software-Containern.",
        "backtext": "Es stellt sicher, dass moderne Cloud-Dienste (wie Netflix oder Spotify) auch bei plötzlichen Millionen Nutzerzugriffen stabil laufen.",
        "valuetext": "2014",
        "startvalue": 2014,
        "endvalue": 2014,
        "tags": [
            "Software",
            "Infrastruktur",
            "Modern",
            "OpenSource"
        ],
        "furtherInformation": []
    },

    // ==========================================
    // 7. NETZWERK & INTERNET-INFRASTRUKTUR
    // ==========================================
    {
        "title": "ASCII-Standard",
        "fronttext": "Die erste standardisierte Methode, um Buchstaben und Symbole als Zahlenwerte (7-Bit) zu kodieren.",
        "backtext": "ASCII (American Standard Code for Information Interchange) ermöglichte den Datenaustausch zwischen verschiedenen Computersystemen.",
        "valuetext": "1963",
        "startvalue": 1963,
        "endvalue": 1963,
        "tags": [
            "Standard",
            "Theorie",
            "Internet",
            "!wichtig"
        ],
        "furtherInformation": []
    },
    {
        "title": "ARPANET",
        "fronttext": "Der Vorläufer des Internets: Die erste Vernetzung von Universitätsrechnern über weite Distanzen.",
        "backtext": "Die erste Nachricht 'LOGIN' führte zum Systemabsturz nach dem 'LO' – dennoch war die paketvermittelte Kommunikation geboren.",
        "valuetext": "1969",
        "startvalue": 1969,
        "endvalue": 1969,
        "tags": [
            "Netzwerk",
            "Internet",
            "Pionier",
            "!wichtig",
            "!einfach"
        ],
        "furtherInformation": []
    },
    {
        "title": "Die erste E-Mail",
        "fronttext": "Die Nachricht wurde zwischen zwei direkt nebeneinander stehenden Rechnern verschickt und nutzte erstmals das @-Symbol.",
        "backtext": "Ray Tomlinson wählte das @, um den Benutzernamen vom Namen des Computers zu trennen. Der Inhalt der Mail war wahrscheinlich nur Test-Buchstaben.",
        "valuetext": "1971",
        "startvalue": 1971,
        "endvalue": 1971,
        "tags": [
            "Internet",
            "Netzwerk",
            "Pionier",
            "!wichtig",
            "!einfach"
        ],
        "furtherInformation": []
    },
    {
        "title": "TCP/IP",
        "fronttext": "Das Protokoll-Duo, das festlegt, wie Datenpakete im Internet adressiert und transportiert werden.",
        "backtext": "Vint Cerf und Bob Kahn schufen die 'Sprache des Internets', die eine Vernetzung unterschiedlichster Netzwerke ermöglichte.",
        "valuetext": "1974",
        "startvalue": 1974,
        "endvalue": 1974,
        "tags": [
            "Netzwerk",
            "Internet",
            "Standard",
            "Infrastruktur",
            "!wichtig"
        ],
        "furtherInformation": []
    },
    {
        "title": "DNS (Domain Name System)",
        "fronttext": "Das 'Telefonbuch' des Internets, das lesbare Namen wie 'google.com' in IP-Adressen übersetzt.",
        "backtext": "Vor DNS mussten Administratoren manuell Listen (hosts.txt) pflegen und an jeden Rechner im Netzwerk verteilen.",
        "valuetext": "1983",
        "startvalue": 1983,
        "endvalue": 1983,
        "tags": [
            "Internet",
            "Netzwerk",
            "Standard",
            "Infrastruktur"
        ],
        "furtherInformation": []
    },
    {
        "title": "World Wide Web (WWW)",
        "fronttext": "Die Erfindung von HTTP, HTML und dem ersten Webbrowser am CERN.",
        "backtext": "Tim Berners-Lee wollte Informationen zwischen Wissenschaftlern vernetzen; er stellte seine Erfindung kostenlos der ganzen Welt zur Verfügung.",
        "valuetext": "1989/90",
        "startvalue": 1989,
        "endvalue": 1990,
        "tags": [
            "Internet",
            "Software",
            "Pionier",
            "!wichtig"
        ],
        "furtherInformation": []
    },
    {
        "title": "Die Geburt von Unicode",
        "fronttext": "Schluss mit dem Zeichensalat: Ein globaler Standard wird ins Leben gerufen, um alle Schriftzeichen der Menschheit einheitlich digital darzustellen.",
        "backtext": "Vor Unicode nutzten verschiedene Systeme inkompatible regionale Codierungen (wie ASCII-Erweiterungen), was beim Dateiaustausch zu kryptischen Fehlern führte. Das Unicode-Konsortium standardisiert seither Zeichen plattformübergreifend.",
        "valuetext": "1991",
        "startvalue": 1991,
        "endvalue": 1991,
        "tags": [
            "Internet",
            "Standard",
            "Geschichte"
        ],
        "furtherInformation": []
    },
    {
        "title": "Die erste Webcam",
        "fronttext": "Informatiker an der Universität Cambridge richteten eine Kamera auf eine Kaffeemaschine, um unnötige Wege zu vermeiden.",
        "backtext": "Die 'Trojan Room Coffee Pot' Bilder wurden ab 1993 weltweit ins Web gestreamt und wurden zum Kult-Phänomen.",
        "valuetext": "1991",
        "startvalue": 1991,
        "endvalue": 1991,
        "tags": [
            "Hardware",
            "Internet",
            "Anekdote"
        ],
        "furtherInformation": []
    },
    {
        "title": "Die Erfindung von UTF-8",
        "fronttext": "Auf einer Serviette in einem Diner entwerfen zwei Tech-Ikonen eine geniale, vollständig abwärtskompatible Codierung für Unicode-Zeichen.",
        "backtext": "Ken Thompson und Rob Pike entwickelten UTF-8. Es nutzt eine variable Anzahl von Bytes (1 bis 4). Da es für die klassischen ASCII-Zeichen nur ein Byte benötigt, sparte es massiven Speicherplatz und wurde zum dominanten Standard des World Wide Web.",
        "valuetext": "1992",
        "startvalue": 1992,
        "endvalue": 1992,
        "tags": [
            "Internet",
            "Standard",
            "Geschichte"
        ],
        "furtherInformation": []
    },
    {
        "title": "Die Erfindung von CSS",
        "fronttext": "Um das Web von reinen, starren Textseiten zu befreien, wird ein Standard vorgeschlagen, der Inhalt und visuelle Gestaltung von Webseiten strikt trennt.",
        "backtext": "Håkon Wium Lie schlug 1994 Cascading Style Sheets vor, die 1996 vom W3C standardisiert wurden. Es ermöglichte modernes Webdesign und dynamische Layouts.",
        "valuetext": "1996",
        "startvalue": 1996,
        "endvalue": 1996,
        "tags": [
            "Internet",
            "Software",
            "Standard"
        ],
        "furtherInformation": []
    },
    {
        "title": "Die Definition von REST-APIs",
        "fronttext": "In seiner Doktorarbeit beschreibt ein Informatiker ein Architekturmodell für verteilte Systeme, das die einfache, zustandslose Kommunikation über das HTTP-Protokoll standardisiert.",
        "backtext": "Roy Fielding stellte das REST-Modell (Representational State Transfer) im Jahr 2000 vor. Es wurde zum universellen Architektur-Paradigma, nach dem heute fast alle Webschnittstellen weltweit Daten austauschen.",
        "valuetext": "2000",
        "startvalue": 2000,
        "endvalue": 2000,
        "tags": [
            "Internet",
            "Software",
            "Standard"
        ],
        "furtherInformation": []
    },
    {
        "title": "JSON-Spezifikation",
        "fronttext": "Ein extrem leichtgewichtiges, auf JavaScript-Objekten basierendes Datenformat tritt an, um das sperrige XML im Datenaustausch über das Internet abzulösen.",
        "backtext": "Douglas Crockford spezifizierte JSON (JavaScript Object Notation) Anfang der 2000er Jahre. Es entwickelte sich rasch zum De-facto-Standard für REST-APIs und moderne Webanwendungen.",
        "valuetext": "2001",
        "startvalue": 2001,
        "endvalue": 2001,
        "tags": [
            "Internet",
            "Software",
            "Standard"
        ],
        "furtherInformation": []
    },
    {
        "title": "Cloud Computing (AWS)",
        "fronttext": "Die Idee, Rechenpower und Speicherplatz flexibel über das Internet zu mieten, statt eigene Server zu besitzen.",
        "backtext": "Amazon Web Services startete 2006 und veränderte radikal, wie Startups und Firmen Software entwickeln und skalieren.",
        "valuetext": "2006",
        "startvalue": 2006,
        "endvalue": 2006,
        "tags": [
            "Internet",
            "Infrastruktur",
            "Modern"
        ],
        "furtherInformation": []
    },
    {
        "title": "Das Bitcoin-Whitepaper",
        "fronttext": "Ein anonymes Genie veröffentlicht ein Konzept für ein dezentrales, kryptographisch abgesichertes Bezahlsystem, das ganz ohne Banken oder staatliche Kontrolle auskommt.",
        "backtext": "Unter dem Pseudonym Satoshi Nakamoto erschien das Paper, das die Blockchain-Technologie und den Proof-of-Work-Konsensmechanismus als Lösung für das Problem der doppelten Geldausgabe (Double-Spending) etablierte.",
        "valuetext": "2008",
        "startvalue": 2008,
        "endvalue": 2008,
        "tags": [
            "Internet",
            "Kryptographie",
            "Gesellschaft",
            "!einfach"
        ],
        "furtherInformation": []
    },
    {
        "title": "Der Fall von Adobe Flash",
        "fronttext": "Ein offener Brief eines einflussreichen Tech-Chefs besiegelt das langsame Ende einer proprietären Web-Technologie für Animationen und interaktive Spiele.",
        "backtext": "Steve Jobs begründete 2010 in 'Thoughts on Flash', warum das iPhone die Technologie nicht unterstützt (Sicherheit, Akku, Touch). Dies beschleunigte den Siegeszug offener Standards wie HTML5, Canvas und JavaScript.",
        "valuetext": "2010",
        "startvalue": 2010,
        "endvalue": 2010,
        "tags": [
            "Internet",
            "Geschichte",
            "Standard"
        ],
        "furtherInformation": []
    },
    {
        "title": "WebAssembly (Wasm)",
        "fronttext": "Ein neues Binärcode-Format für den Browser wird angekündigt, das die Ausführung von Code (z.B. C++ oder Rust) mit nahezu nativer Geschwindigkeit direkt im Web ermöglicht.",
        "backtext": "2015 gestartet und 2017 veröffentlicht, machte Wasm den Browser zu einer plattformunabhängigen Hochleistungs-Laufzeitumgebung für komplexe Spiele, Editoren und Lernwerkzeuge.",
        "valuetext": "2017",
        "startvalue": 2017,
        "endvalue": 2017,
        "tags": [
            "Internet",
            "Software",
            "Standard",
            "Modern",
            "!wichtig"
        ],
        "furtherInformation": []
    },

    // ==========================================
    // 8. INTERNET-DIENSTE & PLATTFORMEN
    // ==========================================
    {
        "title": "Yahoo!",
        "fronttext": "Das erste massenhaft genutzte Webverzeichnis, das das Internet in Kategorien wie 'Sport' oder 'Wissenschaft' ordnete.",
        "backtext": "Gegründet von Jerry Yang und David Filo. Bevor Suchmaschinen intelligent wurden, klickte man sich manuell durch diesen riesigen, von Menschen gepflegten Web-Katalog.",
        "valuetext": "1994",
        "startvalue": 1994,
        "endvalue": 1994,
        "tags": [
            "Internet",
            "Webseite",
            "Geschichte"
        ],
        "furtherInformation": []
    },
    {
        "title": "eBay (AuctionWeb)",
        "fronttext": "Die Plattform, die den Online-Flohmarkt erfand und bewies, dass Menschen im Internet Fremden vertrauen und handeln.",
        "backtext": "Pierre Omidyar programmierte die Seite. Das erste verkaufte Produkt war ein kaputter Laserpointer – für knapp 14 Dollar an einen Sammler kaputter Laserpointer.",
        "valuetext": "1995",
        "startvalue": 1995,
        "endvalue": 1995,
        "tags": [
            "Internet",
            "Webseite",
            "Gesellschaft"
        ],
        "furtherInformation": []
    },
    {
        "title": "Amazon Online-Shop",
        "fronttext": "Jeff Bezos startete dieses Portal in einer Garage als reine Online-Buchhandlung, um die expandierende Internetnutzung auszunutzen.",
        "backtext": "Das erste verkaufte Buch hieß 'Fluid Concepts and Creative Analogies'. Heute ist aus dem Buchladen das größte E-Commerce-Unternehmen der Welt geworden.",
        "valuetext": "1995",
        "startvalue": 1995,
        "endvalue": 1995,
        "tags": [
            "Internet",
            "Webseite",
            "Gesellschaft",
            "!einfach"
        ],
        "furtherInformation": []
    },
    {
        "title": "Netflix",
        "fronttext": "Ein Verleihdienst für DVDs per Post wandelt sich radikal und begründet die Ära des modernen On-Demand-Videostreamings.",
        "backtext": "Marc Randolph und Reed Hastings gründeten Netflix zunächst als Abo-Modell ohne Überziehungsgebühren für physische DVDs. 2007 schwenkte die Firma auf digitales Streaming um, veränderte mit dem Konzept des 'Binge-Watchings' das weltweite Mediennutzungsverhalten und zwang traditionelle Videotheken in den Ruin.",
        "valuetext": "1997",
        "startvalue": 1997,
        "endvalue": 1997,
        "tags": [
            "Internet",
            "Webseite",
            "Gesellschaft",
            "!einfach"
        ],
        "furtherInformation": []
    },
    {
        "title": "Gründung von Google",
        "fronttext": "Zwei Stanford-Studenten gründen eine Suchmaschinen-Firma, deren Name auf einem mathematischen Tippfehler basiert und die den Informationsfluss des Planeten revolutioniert.",
        "backtext": "Larry Page und Sergey Brin wollten ihre Firma eigentlich nach der Zahl Googol ($10^{100}$) benennen. Aus der Garage heraus wuchs Google schnell weit über die reine Suche hinaus und wurde durch Android, YouTube, Cloud-Infrastruktur und KI-Forschung zu einem der mächtigsten Tech-Giganten der Welt.",
        "valuetext": "1998",
        "startvalue": 1998,
        "endvalue": 1998,
        "tags": [
            "Internet",
            "Webseite",
            "Gesellschaft",
            "!einfach"
        ],
        "furtherInformation": []
    },
    {
        "title": "PayPal",
        "fronttext": "Ein Pionier des digitalen Bezahlens revolutioniert den Online-Handel und bringt ein Netzwerk von Gründern hervor, das das Silicon Valley jahrzehntelang prägt.",
        "backtext": "Entstanden aus der Fusion von Confinity (u.a. Max Levchin, Peter Thiel) und X.com (Elon Musk), ermöglichte PayPal einfaches Bezahlen per E-Mail. Nach dem Verkauf an eBay gründeten die Ex-Mitarbeiter Firmen wie YouTube, LinkedIn, Tesla und SpaceX.",
        "valuetext": "1998",
        "startvalue": 1998,
        "endvalue": 1998,
        "tags": [
            "Internet",
            "Webseite",
            "Gesellschaft"
        ],
        "furtherInformation": []
    },
    {
        "title": "Napster",
        "fronttext": "Die erste Musik-Tauschbörse, die die Musikindustrie erschütterte und das Peer-to-Peer-Prinzip (P2P) populär machte.",
        "backtext": "Shawn Fanning und Sean Parker lösten eine Revolution aus, die letztlich zum Siegeszug von Streaming-Diensten wie Spotify führte.",
        "valuetext": "1999",
        "startvalue": 1999,
        "endvalue": 1999,
        "tags": [
            "Internet",
            "SocialMedia",
            "Gesellschaft",
            "Medien"
        ],
        "furtherInformation": []
    },
    {
        "title": "Wikipedia",
        "fronttext": "Das Projekt, das gesamte Wissen der Welt in einer von Nutzern bearbeitbaren Online-Enzyklopädie zu sammeln.",
        "backtext": "Jimmy Wales und Larry Sanger starteten die Plattform, die das Konzept der 'Crowdsourced Intelligence' bewies.",
        "valuetext": "2001",
        "startvalue": 2001,
        "endvalue": 2001,
        "tags": [
            "Internet",
            "Webseite",
            "SocialMedia",
            "Gesellschaft",
            "!wichtig",
            "!einfach"
        ],
        "furtherInformation": []
    },
    {
        "title": "Facebook & Social Media",
        "fronttext": "Die Vernetzung von Milliarden Menschen in einem digitalen sozialen Graphen.",
        "backtext": "Mark Zuckerberg startete 'TheFacebook' an der Harvard University; es veränderte die Art, wie wir kommunizieren und uns informieren.",
        "valuetext": "2004",
        "startvalue": 2004,
        "endvalue": 2004,
        "tags": [
            "Internet",
            "SocialMedia",
            "Gesellschaft",
            "!einfach"
        ],
        "furtherInformation": []
    },
    {
        "title": "YouTube",
        "fronttext": "Drei ehemalige PayPal-Mitarbeiter gründeten diese Plattform, um das Teilen von Videos im Netz radikal zu vereinfachen.",
        "backtext": "Das erste Video überhaupt hieß 'Me at the zoo' und zeigt Mitgründer Jawed Karim vor den Elefanten. Google kaufte die Seite nur ein Jahr später für 1,65 Milliarden Dollar.",
        "valuetext": "2005",
        "startvalue": 2005,
        "endvalue": 2005,
        "tags": [
            "Internet",
            "Webseite",
            "SocialMedia",
            "Medien",
            "!wichtig",
            "!einfach"
        ],
        "furtherInformation": []
    },
    {
        "title": "Twitter (X)",
        "fronttext": "Ein Kurznachrichtendienst, der die weltweite Echtzeit-Kommunikation auf anfangs strikte 140 Zeichen pro Nachricht begrenzte.",
        "backtext": "Gegründet von Jack Dorsey, Biz Stone und Evan Williams. Es wurde zum zentralen Medium für Journalismus, Politik und digitale Bewegungen (Hashtag-Aktivismus), bevor es 2022 von Elon Musk übernommen und in 'X' umbenannt wurde.",
        "valuetext": "2006",
        "startvalue": 2006,
        "endvalue": 2006,
        "tags": [
            "Internet",
            "SocialMedia",
            "Gesellschaft"
        ],
        "furtherInformation": []
    },
    {
        "title": "Stack Overflow",
        "fronttext": "Die wichtigste Frage-und-Antwort-Plattform für Programmierer, die das Nachschlagen in dicken Handbüchern ersetzte.",
        "backtext": "Gegründet von Jeff Atwood und Joel Spolsky. Der Running-Gag der IT-Welt besagt, dass die Hälfte des modernen Softwarecodes per Copy-Paste von hier stammt.",
        "valuetext": "2008",
        "startvalue": 2008,
        "endvalue": 2008,
        "tags": [
            "Internet",
            "Webseite",
            "Software"
        ],
        "furtherInformation": []
    },
    {
        "title": "GitHub",
        "fronttext": "Die Plattform, die das Versionskontrollsystem Git ins Web brachte und zum globalen Zentrum für Open-Source-Software wurde.",
        "backtext": "Sie ermöglichte es Entwicklern weltweit, nahtlos an denselben Code-Projekten zu arbeiten, Issues zu tracken und Code-Reviews durchzuführen.",
        "valuetext": "2008",
        "startvalue": 2008,
        "endvalue": 2008,
        "tags": [
            "Internet",
            "Webseite",
            "Software",
            "OpenSource"
        ],
        "furtherInformation": []
    },
    {
        "title": "WhatsApp",
        "fronttext": "Der Messenger, der die klassische SMS fast vollständig verdrängte, indem er Nachrichten über das Internet-Datenvolumen verschickte.",
        "backtext": "Jan Koum und Brian Acton (beide Ex-Yahoo-Mitarbeiter) bauten die App extrem minimalistisch auf. 2014 übernahm Facebook das Unternehmen für die Rekordsumme von 19 Milliarden Dollar.",
        "valuetext": "2009",
        "startvalue": 2009,
        "endvalue": 2009,
        "tags": [
            "Internet",
            "SocialMedia",
            "Gesellschaft",
            "!einfach"
        ],
        "furtherInformation": []
    },
    {
        "title": "Instagram",
        "fronttext": "Die App, die das Teilen von quadratischen Fotos mit Vintage-Filtern zum Lifestyle machte und das moderne 'Influencer'-Zeitalter einläutete.",
        "backtext": "Kevin Systrom und Mike Krieger bauten die Plattform, die innerhalb kürzester Zeit so rasant wuchs, dass Facebook sie bereits 2012 für 1 Milliarde Dollar aufkaufte.",
        "valuetext": "2010",
        "startvalue": 2010,
        "endvalue": 2010,
        "tags": [
            "Internet",
            "SocialMedia",
            "Medien"
        ],
        "furtherInformation": []
    },
    {
        "title": "Twitch (Live-Streaming)",
        "fronttext": "Eine Plattform für das Live-Streaming von Videospielen revolutioniert die Gaming-Welt und schafft das neue Berufsbild des 'Streamers'.",
        "backtext": "Ursprünglich als Gaming-Ableger der Seite Justin.tv gestartet, wuchs Twitch extrem rasant und verlagerte den Fokus der Gaming-Community vom reinen Konsumieren von aufgezeichneten Videos hin zur Echtzeit-Interaktion via Chat. 2014 wurde die Plattform für knapp 1 Milliarde Dollar von Amazon übernommen.",
        "valuetext": "2011",
        "startvalue": 2011,
        "endvalue": 2011,
        "tags": [
            "Internet",
            "Medien",
            "Gaming"
        ],
        "furtherInformation": []
    },
    {
        "title": "Musical.ly als Vorläufer von TikTok",
        "fronttext": "Diese Plattform revolutionierte Kurzvideos mit Musik-Lip-Sync und fusionierte später mit einer chinesischen App zum weltweiten Phänomen.",
        "backtext": "Musical.ly wurde 2014 populär und 2017 vom chinesischen Konzern ByteDance aufgekauft. Durch die Verschmelzung mit der Schwester-App TikTok und den extrem präzisen Empfehlungs-Algorithmus veränderte sich die weltweite Aufmerksamkeitsökonomie radikal.",
        "valuetext": "2014",
        "startvalue": 2014,
        "endvalue": 2014,
        "tags": [
            "Internet",
            "SocialMedia",
            "Gesellschaft",
            "Modern"
        ],
        "furtherInformation": []
    },

    // ==========================================
    // 9. KÜNSTLICHE INTELLIGENZ
    // ==========================================
    {
        "title": "Der Turing-Test",
        "fronttext": "Ein Kriterium zur Feststellung, ob eine Maschine eine dem Menschen gleichwertige Intelligenz besitzt.",
        "backtext": "Alan Turing definierte den Test: Wenn ein Mensch in einem Chat nicht mehr unterscheiden kann, ob das Gegenüber ein Mensch oder eine Maschine ist, hat die Maschine den Test bestanden.",
        "valuetext": "1950",
        "startvalue": 1950,
        "endvalue": 1950,
        "tags": [
            "KI",
            "Theorie",
            "!einfach"
        ],
        "furtherInformation": []
    },
    {
        "title": "Dartmouth-Konferenz",
        "fronttext": "Das legendäre sommerliche Forschungsprojekt, das offiziell als Geburtsstunde der 'Künstlichen Intelligenz' gilt.",
        "backtext": "John McCarthy prägte hier das englische Wort 'Artificial Intelligence' (AI). Die Forscher glaubten optimistisch, das KI-Problem in wenigen Jahren lösen zu können.",
        "valuetext": "1956",
        "startvalue": 1956,
        "endvalue": 1956,
        "tags": [
            "KI",
            "Theorie",
            "Geschichte",
            "!wichtig"
        ],
        "furtherInformation": []
    },
    {
        "title": "Das Perzeptron",
        "fronttext": "Das erste mathematische Modell und Hardware-Gerät für ein künstliches Neuron, das lernen konnte, Muster zu klassifizieren.",
        "backtext": "Frank Rosenblatt erfand es. Als Forscher bewiesen, dass ein einzelnes Perzeptron logische XOR-Verknüpfungen nicht lernen kann, brach die Forschung vorerst ein.",
        "valuetext": "1958",
        "startvalue": 1958,
        "endvalue": 1958,
        "tags": [
            "KI",
            "Theorie",
            "NeuronaleNetze"
        ],
        "furtherInformation": []
    },
    {
        "title": "ELIZA",
        "fronttext": "Eines der ersten Programme zur Verarbeitung natürlicher Sprache, das einen Psychotherapeuten simulierte.",
        "backtext": "Joseph Weizenbaum war schockiert, wie sehr Nutzer dem einfachen Programm ('Was lässt Sie glauben, dass...') menschliche Gefühle zusprachen.",
        "valuetext": "1966",
        "startvalue": 1966,
        "endvalue": 1966,
        "tags": [
            "KI",
            "Software",
            "Geschichte"
        ],
        "furtherInformation": []
    },
    {
        "title": "Der erste 'KI-Winter'",
        "fronttext": "Eine Periode, in der staatliche Gelder und das akademische Interesse an KI wegen unerfüllter, übertriebener Versprechen dramatisch einbrachen.",
        "backtext": "Ausgelöst durch den britischen 'Lighthill-Report'. Es zeigte sich, dass die Rechenleistung der damaligen Computer für komplexe KI-Probleme absolut unzureichend war.",
        "valuetext": "1974",
        "startvalue": 1974,
        "endvalue": 1974,
        "tags": [
            "KI",
            "Geschichte"
        ],
        "furtherInformation": []
    },
    {
        "title": "Expertensysteme",
        "fronttext": "Ein riesiger KI-Trend der 1980er Jahre, bei dem das Wissen menschlicher Experten in gigantischen 'Wenn-Dann'-Regelwerken abgebildet wurde.",
        "backtext": "Systeme wie MYCIN diagnostizierten Krankheiten. Sie waren jedoch starr, konnten nicht selbstständig lernen und scheiterten bei Ausnahmen.",
        "valuetext": "1980er",
        "startvalue": 1980,
        "endvalue": 1989,
        "tags": [
            "KI",
            "Software",
            "Geschichte"
        ],
        "furtherInformation": []
    },
    {
        "title": "Backpropagation-Durchbruch",
        "fronttext": "Die Wiederentdeckung und Popularisierung des mathematischen Verfahrens, mit dem mehrschichtige neuronale Netze Fehler zurückrechnen und effektiv lernen können.",
        "backtext": "David Rumelhart, Geoffrey Hinton und Ronald Williams zeigten, dass tiefe Netzwerke dadurch interne Repräsentationen von Daten erlernen können.",
        "valuetext": "1986",
        "startvalue": 1986,
        "endvalue": 1986,
        "tags": [
            "KI",
            "Theorie",
            "NeuronaleNetze"
        ],
        "furtherInformation": []
    },
    {
        "title": "Deep Blue vs. Kasparov",
        "fronttext": "Zum ersten Mal besiegte ein Computer den amtierenden Schachweltmeister unter Turnierbedingungen.",
        "backtext": "Der IBM-Supercomputer Deep Blue nutzte Brute-Force-Berechnungen und spezialisierte Hardware für seine Züge.",
        "valuetext": "1997",
        "startvalue": 1997,
        "endvalue": 1997,
        "tags": [
            "KI",
            "Gaming",
            "Geschichte"
        ],
        "furtherInformation": []
    },
    {
        "title": "ImageNet & Deep Learning",
        "fronttext": "Ein Wettbewerb zur Bilderkennung, der den Durchbruch für künstliche neuronale Netze markierte.",
        "backtext": "Geoffrey Hintons Team zeigte 2012 mit 'AlexNet', dass Deep Learning herkömmliche Algorithmen weit übertrifft.",
        "valuetext": "2012",
        "startvalue": 2012,
        "endvalue": 2012,
        "tags": [
            "KI",
            "NeuronaleNetze",
            "Grafik"
        ],
        "furtherInformation": []
    },
    {
        "title": "Generative Adversarial Networks (GANs)",
        "fronttext": "Ein KI-Konzept, bei dem zwei neuronale Netze (ein Fälscher und ein Detektiv) gegeneinander antreten, um fotorealistische Medien zu erzeugen.",
        "backtext": "Ian Goodfellow erfand GANs. Der Generator erzeugt Bilder, der Diskriminator bewertet sie. Dieses Duell führte zur Explosion von Deepfakes.",
        "valuetext": "2014",
        "startvalue": 2014,
        "endvalue": 2014,
        "tags": [
            "KI",
            "NeuronaleNetze",
            "Modern"
        ],
        "furtherInformation": []
    },
    {
        "title": "AlphaGo",
        "fronttext": "Die KI, die den weltbesten Spieler im Brettspiel Go besiegte – eine Aufgabe, die als weitaus komplexer als Schach galt.",
        "backtext": "DeepMind (Google) nutzte Reinforcement Learning und neuronale Netze, um Strategien zu erlernen, die Menschen nie zuvor gesehen hatten.",
        "valuetext": "2016",
        "startvalue": 2016,
        "endvalue": 2016,
        "tags": [
            "KI",
            "NeuronaleNetze",
            "Gaming"
        ],
        "furtherInformation": []
    },
    {
        "title": "Transformer-Architektur",
        "fronttext": "Das neuronale Netzwerkmodell, das durch den Mechanismus der 'Attention' die Verarbeitung von Sprache revolutionierte.",
        "backtext": "Das Paper 'Attention Is All You Need' von Google-Forschern legte die Basis für alle modernen Sprachmodelle wie GPT.",
        "valuetext": "2017",
        "startvalue": 2017,
        "endvalue": 2017,
        "tags": [
            "KI",
            "NeuronaleNetze",
            "Theorie",
            "!wichtig"
        ],
        "furtherInformation": []
    },
    {
        "title": "AlphaFold",
        "fronttext": "DeepMinds KI-System, das eines der größten Rätsel der Biologie löste: Die exakte Vorhersage, wie sich Proteine dreidimensional falten.",
        "backtext": "Das System berechnete die Struktur von fast allen 200 Millionen bekannten Proteinen der Wissenschaft – eine Aufgabe, die zuvor Jahrzehnte Laborarbeit pro Protein erfordert hätte.",
        "valuetext": "2020",
        "startvalue": 2020,
        "endvalue": 2020,
        "tags": [
            "KI",
            "NeuronaleNetze",
            "Modern"
        ],
        "furtherInformation": []
    },
    {
        "title": "ChatGPT & Große Sprachmodelle (LLMs)",
        "fronttext": "KI-Systeme, die menschenähnliche Texte generieren, programmieren und komplexe Fragen beantworten können.",
        "backtext": "Die Veröffentlichung von ChatGPT Ende 2022 machte generative KI erstmals für die breite Öffentlichkeit direkt nutzbar.",
        "valuetext": "2022",
        "startvalue": 2022,
        "endvalue": 2022,
        "tags": [
            "KI",
            "NeuronaleNetze",
            "Software",
            "!wichtig",
            "!einfach"
        ],
        "furtherInformation": []
    },
    {
        "title": "Stable Diffusion",
        "fronttext": "Ein Open-Source-Modell für generative KI, das aus Textbeschreibungen hochdetaillierte Bilder erstellt.",
        "backtext": "Es demokratisierte den Zugang zu mächtiger Bild-KI und löste hitzige Debatten über Urheberrecht und Kunst aus.",
        "valuetext": "2022",
        "startvalue": 2022,
        "endvalue": 2022,
        "tags": [
            "KI",
            "NeuronaleNetze",
            "Grafik",
            "Modern"
        ],
        "furtherInformation": []
    },

    // ==========================================
    // 10. GAMING & GRAFIK
    // ==========================================
    {
        "title": "Das erste grafische Spiel",
        "fronttext": "Einer der ersten einsatzfähigen Computer EDSAC mit elektronischem Speicher führt ein Tic-Tac-Toe-Spiel aus, dessen Spielfeld visuell auf einer Kathodenstrahlröhre angezeigt wird.",
        "backtext": "Der EDSAC-Computer lief 1949 an der Universität Cambridge an. 1952 programmierte Alexander S. Douglas darauf 'OXO' – das historisch erste dokumentierte digitale Spiel mit einer grafischen Bildschirmausgabe.",
        "valuetext": "1952",
        "startvalue": 1952,
        "endvalue": 1952,
        "tags": [
            "Gaming",
            "Hardware",
            "Pionier"
        ],
        "furtherInformation": []
    },
    {
        "title": "Spacewar!",
        "fronttext": "Eines der ersten digitalen Videospiele überhaupt, entwickelt auf einem PDP-1 Mainframe.",
        "backtext": "Hacker am MIT nutzten den Rechner nachts, um zwei Raumschiffe gegeneinander kämpfen zu lassen – der Urvater der Gaming-Industrie.",
        "valuetext": "1962",
        "startvalue": 1962,
        "endvalue": 1962,
        "tags": [
            "Gaming",
            "Software",
            "Pionier"
        ],
        "furtherInformation": []
    },
    {
        "title": "Pong",
        "fronttext": "Das erste weltweit erfolgreiche Videospiel, das die Geburtsstunde der Gaming-Industrie markierte.",
        "backtext": "Atari-Gründer Nolan Bushnell ließ das Spiel von Allan Alcorn entwickeln; es war so simpel, dass keine Anleitung nötig war.",
        "valuetext": "1972",
        "startvalue": 1972,
        "endvalue": 1972,
        "tags": [
            "Gaming",
            "Hardware",
            "Pionier",
            "!einfach"
        ],
        "furtherInformation": []
    },
    {
        "title": "Atari 2600",
        "fronttext": "Die Konsole, die das Prinzip austauschbarer Spielemodule (Cartridges) im Massenmarkt etabliert und das Videospiel fest in den Wohnzimmern verankert.",
        "backtext": "Ursprünglich als 'Atari VCS' erschienen, löste das Gerät den ersten großen Videospiel-Boom aus. Durch die Flut an minderwertiger Software von Drittherstellern (symbolisiert durch das berüchtigte 'E.T.'-Spiel) wurde die Konsole 1983 aber auch zum Hauptauslöser des großen Video Game Crashs.",
        "valuetext": "1977",
        "startvalue": 1977,
        "endvalue": 1977,
        "tags": [
            "Hardware",
            "Gaming",
            "Geschichte"
        ],
        "furtherInformation": []
    },
    {
        "title": "Nintendo Entertainment System (NES)",
        "fronttext": "Die graue 8-Bit-Heimkonsole rettet die gesamte nordamerikanische Videospielindustrie im Alleingang aus den Trümmern des großen Crashs von 1983.",
        "backtext": "In Japan als 'Famicom' gestartet, etablierte das NES strenge Qualitätskontrollen für Dritthersteller (das 'Official Nintendo Seal of Quality') und schenkte der Welt fundamentale Popkultur-Ikonen wie *Super Mario Bros.* und *The Legend of Zelda*.",
        "valuetext": "1983-85",
        "startvalue": 1983,
        "endvalue": 1985,
        "tags": [
            "Hardware",
            "Gaming"
        ],
        "furtherInformation": []
    },
    {
        "title": "Tetris",
        "fronttext": "Das wohl bekannteste Puzzlespiel der Welt, entwickelt von einem sowjetischen Programmierer.",
        "backtext": "Alexei Paschitnow programmierte es auf einer Electronika 60. Es wurde zum später nochmal zum Welterfolg auf dem Nintendo Game Boy.",
        "valuetext": "1984",
        "startvalue": 1984,
        "endvalue": 1984,
        "tags": [
            "Gaming",
            "Anekdote",
            "Geschichte"
        ],
        "furtherInformation": []
    },{
        "title": "Commodore Amiga 500",
        "fronttext": "Ein legendärer 16-Bit-Heimcomputer revolutioniert durch seine überlegenen Custom-Chips für Grafik und Sound die Gaming- und Demoszene.",
        "backtext": "Der A500 wurde zum meistverkauften Modell der Amiga-Reihe. Mit dem Motorola-68000-Prozessor und bahnbrechenden Multimedia-Fähigkeiten degradierte er damalige PCs zu reinen Bürogeräten und prägte die europäische Gaming-Kultur der späten 1980er Jahre.",
        "valuetext": "1987",
        "startvalue": 1987,
        "endvalue": 1987,
        "tags": [
            "Hardware",
            "Gaming"
        ],
        "furtherInformation": []
    },
    {
        "title": "Nintendo Game Boy",
        "fronttext": "Eine klobige, grau-grüne Handheld-Konsole erobert trotz veralteter Monochrom-Grafik dank enormer Batterielaufzeit und eines Puzzle-Klassikers die Welt.",
        "backtext": "Von Gunpei Yokoi entwickelt, setzte sich der Game Boy gegen technisch überlegene, farbige Konkurrenten (wie den Atari Lynx) durch. Das Erfolgsgeheimnis lag im geringen Preis, der unzerstörbaren Bauweise und der genialen Entscheidung, die Konsole im Bundle mit 'Tetris' auszuliefern.",
        "valuetext": "1989",
        "startvalue": 1989,
        "endvalue": 1989,
        "tags": [
            "Hardware",
            "Gaming",
            "!wichtig"
        ],
        "furtherInformation": []
    },
    {
        "title": "Doom",
        "fronttext": "Der Ego-Shooter, der 3D-Grafik auf PCs revolutionierte und das Genre der 'First-Person-Shooter' definierte.",
        "backtext": "id Software nutzte bahnbrechende Techniken wie 'Binary Space Partitioning', um flüssige Grafik auf damaliger Hardware zu ermöglichen.",
        "valuetext": "1993",
        "startvalue": 1993,
        "endvalue": 1993,
        "tags": [
            "Gaming",
            "Grafik",
            "Software"
        ],
        "furtherInformation": []
    },
    {
        "title": "Sony PlayStation (PS1)",
        "fronttext": "Ein Elektronikriese steigt nach einem geplatzten Abkommen mit Nintendo in den Konsolenmarkt ein und bricht das traditionelle Modul-Monopol durch den Einsatz von CD-ROMs.",
        "backtext": "Unter Ken Kutaragi entwickelte Sony eine reine 3D-Polygon-Maschine. Die billige Produktion von CDs erlaubte es Entwicklern, riesige Welten mit FMV-Zwischensequenzen und CD-Audio zu erschaffen, was Videospiele endgültig aus der Kinderecke in die Popkultur katapultierte.",
        "valuetext": "1994",
        "startvalue": 1994,
        "endvalue": 1994,
        "tags": [
            "Hardware",
            "Gaming"
        ],
        "furtherInformation": []
    },
    {
        "title": "Pokémon (Rote & Blaue Edition)",
        "fronttext": "Zwei Editionen eines bahnbrechenden Rollenspiels erobern den Game Boy und lösen über das Tauschen von Monstern eine globale Popkultur-Welle aus.",
        "backtext": "Von Satoshi Tajiri und seiner Firma Game Freak entwickelt, startete das Phänomen in Japan als 'Rot & Grün'. Das clevere Konzept, bestimmte Taschenmonster nur in einer Edition fangbar zu machen, zwang Spieler dazu, sich über das Link-Kabel physisch zu vernetzen, und rettete Nintendos alternden Handheld.",
        "valuetext": "1996",
        "startvalue": 1996,
        "endvalue": 1996,
        "tags": [
            "Software",
            "Gaming",
            "Mobile",
            "!wichtig"
        ],
        "furtherInformation": []
    },
    {
        "title": "Nintendo 64 (N64)",
        "fronttext": "Eine extrem leistungsfähige Konsole definiert das Gameplay in drei Dimensionen völlig neu und führt den analogen Daumen-Stick als Standard ein.",
        "backtext": "Während die Konkurrenz bereits auf billige CD-ROMs setzte, blieb Nintendo starrsinnig bei den teuren Modulen (Cartridges). Das N64 glänzte dennoch durch wegweisende Meisterwerke wie *Super Mario 64* und *Ocarina of Time*, die zeigten, wie Kamerasteuerung und Bewegung in einer echten 3D-Welt funktionieren müssen.",
        "valuetext": "1996",
        "startvalue": 1996,
        "endvalue": 1996,
        "tags": ["Hardware", "Gaming", "Grafik", "!wichtig"],
        "furtherInformation": []
    },
    {
        "title": "Sega Dreamcast",
        "fronttext": "Die letzte Heimkonsole eines traditionsreichen Herstellers führt Online-Gaming via integriertem Modem ein, scheitert jedoch trotz Kultstatus am Markt.",
        "backtext": "Die Dreamcast war ihrer Zeit voraus und bot als erste Konsole der sechsten Generation echtes Internet-Surfen und Online-Multiplayer ab Werk. Sie unterlag jedoch im Marketing-Krieg gegen Sonys PlayStation 2 und zwang Sega dazu, sich komplett aus dem Hardware-Geschäft zurückzuziehen.",
        "valuetext": "1998",
        "startvalue": 1998,
        "endvalue": 1998,
        "tags": [
            "Hardware",
            "Gaming"
        ],
        "furtherInformation": []
    },
    {
        "title": "Nintendo Game Boy Color",
        "fronttext": "Der langersehnte Nachfolger des grauen Handheld-Klassikers bringt endlich Farbe ins mobile Spiel, ohne dabei die Abwärtskompatibilität zu opfern.",
        "backtext": "Ausgestattet mit einem doppelt so schnellen Prozessor und einem Display, das bis zu 56 Farben gleichzeitig darstellen konnte, befeuerte der Game Boy Color die weltweite Pokémon-Manie. Ein genialer Schachzug war, dass alte, schwarz-weiße Module auf dem neuen Gerät automatisch eingefärbt wurden.",
        "valuetext": "1998",
        "startvalue": 1998,
        "endvalue": 1998,
        "tags": [
            "Hardware",
            "Gaming"
        ],
        "furtherInformation": []
    },
    {
        "title": "Steam (Plattform)",
        "fronttext": "Ein Spieleentwickler startet eine Plattform für automatische Software-Updates, die sich zum unangefochtenen Giganten des rein digitalen Spielevertriebs entwickelt.",
        "backtext": "Valve führte Steam ein, um Patches für *Counter-Strike* zu verteilen. Anfangs von Spielern wegen des Online-Zwangs gehasst, revolutionierte die Plattform den PC-Spielemarkt grundlegend und machte physische Spieleboxen im Handel nahezu bedeutungslos.",
        "valuetext": "2003",
        "startvalue": 2003,
        "endvalue": 2003,
        "tags": [
            "Gaming",
            "Internet",
            "Gesellschaft",
            "!einfach"
        ],
        "furtherInformation": []
    },
    {
        "title": "Nintendo Wii",
        "fronttext": "Ein weißer Kasten verzichtet bewusst auf das Wettrüsten um hochauflösende Grafik und erobert den Weltmarkt stattdessen im Sturm über eine intuitive Bewegungssteuerung.",
        "backtext": "Unter dem Codenamen 'Revolution' entwickelt, sprach die Wii dank der Wii-Fernbedienung (Wiimote) und einfacher Bewegungssensoren völlig neue Zielgruppen wie Senioren und Gelegenheitsspieler an. Mit über 100 Millionen verkauften Einheiten wurde sie zu einem der größten kommerziellen Phänomene der Tech-Geschichte.",
        "valuetext": "2006",
        "startvalue": 2006,
        "endvalue": 2006,
        "tags": [
            "Hardware",
            "Gaming",
            "UX"
        ],
        "furtherInformation": []
    },
    {
        "title": "Nintendo 3DS",
        "fronttext": "Ein mobiler Doppelbildschirm-Handheld bringt echten, räumlichen Tiefeneffekt (3D) in die Hosentasche – und das völlig ohne Spezialbrille.",
        "backtext": "Der Nachfolger des extrem erfolgreichen Nintendo DS nutzte ein autostereoskopisches Display (Parallaxbarriere), um die Illusion von Tiefe zu erzeugen. Trotz eines holprigen Starts entwickelte sich der 3DS dank starker Software-Bibliothek zu einem langlebigen Eckpfeiler des portablen Spielens.",
        "valuetext": "2011",
        "startvalue": 2011,
        "endvalue": 2011,
        "tags": [
            "Hardware", 
            "Gaming"
        ],
        "furtherInformation": []
    },
    {
        "title": "Pokémon GO",
        "fronttext": "Eine Mobile-App verbindet die reale Welt über Satellitennavigation mit virtuellen Monstern und löst einen beispiellosen Augmented-Reality-Hype aus.",
        "backtext": "Von Niantic in Kooperation mit Nintendo entwickelt, lockte das Spiel im Sommer 2016 Millionen Menschen auf die Straßen, um Parks, Plätze und Sehenswürdigkeiten (PokéStops) zu belagern. Es markierte den endgültigen Durchbruch von standortbasierten AR-Anwendungen im weltweiten Massenmarkt.",
        "valuetext": "2016",
        "startvalue": 2016,
        "endvalue": 2016,
        "tags": [
            "Internet",
            "Software",
            "Gaming",
            "Mobile",
            "UX",
            "!wichtig"
        ],
        "furtherInformation": []
    },
    {
        "title": "Nintendo Switch",
        "fronttext": "Nach einem schweren Flop mit dem Vorgängersystem gelingt die perfekte Fusion aus stationärer Wohnzimmer-Konsole und portablem Handheld.",
        "backtext": "Die Switch löste das Konzept der klassischen Hardware-Trennung auf: Über eine simple Docking-Station wechselt das Bild nahtlos zwischen Fernseher und dem integrierten 6,2-Zoll-Bildschirm. Mit ihren abnehmbaren 'Joy-Con'-Controllern traf sie den Nerv der Zeit und stieg in die Top 3 der meistverkauften Konsolen aller Zeiten auf.",
        "valuetext": "2017",
        "startvalue": 2017,
        "endvalue": 2017,
        "tags": [
            "Hardware",
            "Gaming",
            "UX"
        ],
        "furtherInformation": []
    },

    // ==========================================
    // 11. PERSONEN
    // ==========================================
    {
        "title": "Geburt von John von Neumann",
        "fronttext": "Geburtsjahr des mathematischen Universalgenies, dessen Name bis heute untrennbar mit der Hardware-Grundarchitektur fast aller Computer verbunden ist.",
        "backtext": "Der in Budapest geborene Wissenschaftler beschrieb das Prinzip, Programmbefehle und Daten im selben Speicher abzulegen. Dies machte feste, unflexible Schaltungen überflüssig.",
        "valuetext": "1903",
        "startvalue": 1903,
        "endvalue": 1903,
        "tags": [
            "Person",
            "Theorie",
            "Pionier"
        ],
        "furtherInformation": []
    },
    {
        "title": "Geburt von Grace Hopper",
        "fronttext": "Geburtsjahr der 'Amazing Grace' – US-Marine-Admiralin, Compiler-Erfinderin und unermüdliche Wegbereiterin verständlicher Programmiersprachen.",
        "backtext": "Grace Hopper wurde in New York geboren. Sie überzeugte die Fachwelt davon, dass Computer über englische Textbefehle statt über reine Binärcodes oder mathematische Symbole gesteuert werden sollten.",
        "valuetext": "1906",
        "startvalue": 1906,
        "endvalue": 1906,
        "tags": [
            "Person",
            "Sprachen",
            "Frauen"
        ],
        "furtherInformation": []
    },
    {
        "title": "Konrad Zuse",
        "fronttext": "Geburtsjahr des deutschen Erfinders, der in den 1930er Jahren im elterlichen Wohnzimmer den ersten vollautomatischen, programmierbaren Computer der Welt baute.",
        "backtext": "Zuse wurde in Berlin geboren. Seine Z3 (1941) arbeitete im Gegensatz zu amerikanischen Entwicklungen der Zeit bereits konsequent mit dem dualen (binären) Zahlensystem.",
        "valuetext": "1910",
        "startvalue": 1910,
        "endvalue": 1910,
        "tags": [
            "Person",
            "Hardware",
            "Pionier"
        ],
        "furtherInformation": []
    },
    {
        "title": "Alan Turing",
        "fronttext": "Geburtsjahr des britischen Genies, das die theoretischen Fundamente der Informatik goss, die Enigma knackte und den Turing-Test erfand.",
        "backtext": "Alan Turing wurde in London geboren. Seine Definition von universeller Berechenbarkeit bildet das logische Gerüst, auf dem jeder Softwarecode bis heute basiert.",
        "valuetext": "1912",
        "startvalue": 1912,
        "endvalue": 1912,
        "tags": [
            "Person",
            "Theorie",
            "Logik"
        ],
        "furtherInformation": []
    },
    {
        "title": "Hedy Lamarr",
        "fronttext": "Geburtsjahr einer berühmten Hollywood-Schauspielerin, welche die technologische Basis für heutiges WLAN, Bluetooth und GPS erfand.",
        "backtext": "Sie entwickelte im Zweiten Weltkrieg ein störungssicheres Funkfernsteuerungssystem für Torpedos, das auf automatischen Frequenzwechseln basierte.",
        "valuetext": "1942",
        "startvalue": 1942,
        "endvalue": 1942,
        "tags": [
            "Person",
            "Netzwerk",
            "Frauen",
            "Pionier"
        ],
        "furtherInformation": []
    },
    {
        "title": "Tim Berners-Lee",
        "fronttext": "Geburtsjahr des Mannes, der das World Wide Web am CERN erfand und es als kostenloses Geschenk bedingungslos an die Menschheit übergab.",
        "backtext": "Der britische Physiker und Informatiker weigerte sich, seine Erfindungen (HTML, HTTP, URL) zu patentieren, da er überzeugt war, dass das Web offen zugänglich sein müsse.",
        "valuetext": "1955",
        "startvalue": 1955,
        "endvalue": 1955,
        "tags": [
            "Person",
            "Internet",
            "Pionier"
        ],
        "furtherInformation": []
    },
    {
        "title": "Donald Knuth",
        "fronttext": "Geburtsjahr des Autors von 'The Art of Computer Programming' und Schöpfer des mathematischen Textsatzsystems TeX.",
        "backtext": "Knuth gilt als Urvater der Algorithmenanalyse. Er weigerte sich jahrzehntelang, eine E-Mail-Adresse zu nutzen, um ungestört arbeiten zu können.",
        "valuetext": "1968",
        "startvalue": 1968,
        "endvalue": 1968,
        "tags": [
            "Person",
            "Theorie",
            "Mathematik"
        ],
        "furtherInformation": []
    },
    {
        "title": "Margaret Hamilton",
        "fronttext": "Geburtsjahr der Direktorin für Software-Entwicklung, deren Code die Mondlandung der Apollo-11-Mission rettete.",
        "backtext": "Sie prägte den Begriff 'Software Engineering'. Ihr asynchroner Code verhinderte den Abbruch der Mondlandung, als das Radar den Computer überlastete.",
        "valuetext": "1969",
        "startvalue": 1969,
        "endvalue": 1969,
        "tags": [
            "Person",
            "Software",
            "Frauen",
            "Pionier"
        ],
        "furtherInformation": []
    },
    {
        "title": "Barbara Liskov",
        "fronttext": "Geburtsjahr einer der ersten Frauen, die in den USA in Informatik promovierten, berühmt für ihre Beiträge zur objektorientierten Programmierung.",
        "backtext": "Sie entwickelte das 'Liskovsche Substitutionsprinzip' (das 'L' in den SOLID-Prinzipien), ein Grundpfeiler des modernen Software-Designs.",
        "valuetext": "1987",
        "startvalue": 1987,
        "endvalue": 1987,
        "tags": [
            "Person",
            "Theorie",
            "Frauen"
        ],
        "furtherInformation": []
    },
    {
        "title": "Linus Torvalds",
        "fronttext": "Geburtsjahr des Schöpfers von Linux und Git, der für seine kompromisslose Haltung zur Code-Qualität weltbekannt ist.",
        "backtext": "Obwohl er zwei der wichtigsten Technologien der modernen Welt erfunden hat, stellt er seine Projekte konsequent unter freie Open-Source-Lizenzen.",
        "valuetext": "1991",
        "startvalue": 1991,
        "endvalue": 1991,
        "tags": [
            "Person",
            "Software",
            "OpenSource"
        ],
        "furtherInformation": []
    },

    // ==========================================
    // 12. KRISEN & KATASTROPHEN
    // ==========================================
    {
        "title": "Die Softwarekrise",
        "fronttext": "Projekte versinken im Chaos: Software wird zu komplex, sprengt Budgets, verspätet sich chronisch und ist voller Fehler. Eine Konferenz sucht dringend nach Auswegen.",
        "backtext": "Der Begriff wurde 1968 auf einer historischen NATO-Konferenz geprägt. Die Krise markiert die Geburtsstunde des 'Software Engineering' – dem Versuch, die Softwareentwicklung von einer handwerklichen Kunst in eine strukturierte Ingenieursdisziplin zu überführen.",
        "valuetext": "1968",
        "startvalue": 1968,
        "endvalue": 1968,
        "tags": [
            "Software",
            "Geschichte",
            "Theorie"
        ],
        "furtherInformation": []
    },
    {
        "title": "Der Softwarefehler der Ariane 5",
        "fronttext": "Nur 37 Sekunden nach dem Start explodiert eine hunderte Millionen Dollar teure europäische Trägerrakete aufgrund eines Fehlers im Leitsystem.",
        "backtext": "Die Ursache war ein klassischer Integer-Overflow: Das System versuchte, eine 64-Bit-Gleitkommazahl in eine vorzeichenbehaftete 16-Bit-Ganzzahl umzuwandeln. Der Wert war zu groß, die Software stürzte ab, woraufhin die Rakete vom Kurs abkam und sich selbst zerstörte.",
        "valuetext": "1996",
        "startvalue": 1996,
        "endvalue": 1996,
        "tags": [
            "Software",
            "Geschichte",
            "Anekdote"
        ],
        "furtherInformation": []
    },
    {
        "title": "Der Millennium-Bug (Y2K)",
        "fronttext": "Die Angst, dass Computer am 1.1.2000 abstürzen, weil sie Jahre nur zweistellig speicherten.",
        "backtext": "Dank massiver Anstrengungen von Informatikern weltweit blieben die großen Katastrophen aus.",
        "valuetext": "2000",
        "startvalue": 2000,
        "endvalue": 2000,
        "tags": [
            "Software",
            "Anekdote",
            "Geschichte"
        ],
        "furtherInformation": []
    },
    {
        "title": "Das Platzen der Dotcom-Blase",
        "fronttext": "Blinde Euphorie um das junge Internet führt zu astronomischen Börsenbewertungen von Firmen ohne tragfähiges Geschäftsmodell – bis die Realität zuschlägt.",
        "backtext": "Im Frühjahr 2000 platzte die Spekulationsblase der Technologieaktien. Unzählige Internet-Startups gingen pleite und Milliarden an Börsenwert verpufften. Dennoch überlebten die stärksten Akteure und legten das Fundament für das Web 2.0.",
        "valuetext": "2000",
        "startvalue": 2000,
        "endvalue": 2000,
        "tags": [
            "Internet",
            "Geschichte",
            "Gesellschaft"
        ],
        "furtherInformation": []
    },
    {
        "title": "Der CrowdStrike-Ausfall",
        "fronttext": "Ein fehlerhaftes Update eines IT-Sicherheitsanbieters führt weltweit zum gleichzeitigen Absturz von Millionen Windows-Rechnern und legt globale Infrastrukturen lahm.",
        "backtext": "Im Juli 2024 verursachte ein fehlerhaftes Konfigurations-Update im 'Falcon'-Sensor von CrowdStrike weltweite Blue Screens (BSOD) an Flughäfen, in Banken und Krankenhäusern. Es gilt als einer der größten IT-Ausfälle der Geschichte.",
        "valuetext": "2024",
        "startvalue": 2024,
        "endvalue": 2024,
        "tags": [
            "Software",
            "Sicherheit",
            "Modern"
        ],
        "furtherInformation": []
    },
    {
        "title": "Das Jahr-2038-Problem (Y2K38)",
        "fronttext": "Die digitale Apokalypse der älteren Systeme: Wenn die gezählten Sekunden seit 1970 den maximalen Wert eines vorzeichenbehafteten 32-Bit-Integers überschreiten.",
        "backtext": "Am 19. Januar 2038 läuft die klassische 32-Bit-Unix-Zeit über und springt ins Negative (zum Jahr 1901). Systeme, die bis dahin nicht auf 64-Bit-Zeitstempel umgestellt sind, erleiden unvorhersehbare Software-Abstürze.",
        "valuetext": "2038",
        "startvalue": 2038,
        "endvalue": 2038,
        "tags": [
            "Software",
            "Theorie",
            "Geschichte"
        ],
        "furtherInformation": []
    },

    // ==========================================
    // 13. GESETZE, ZITATE & ANEKDOTEN
    // ==========================================
    {
        "title": "Das 'Fünf-Computer'-Zitat",
        "fronttext": "Ein berühmtes, historisch umstrittenes Fehlurteil eines IBM-Chefs, der den weltweiten Marktbedarf an Computern drastisch unterschätzte.",
        "backtext": "Thomas J. Watson wird der Satz aus dem Jahr 1943 zugeschrieben: 'Ich glaube, es gibt einen Weltmarkt für vielleicht fünf Computer.' Im Zeitalter von Milliarden Smartphones ein herrlicher Irrtum.",
        "valuetext": "1943",
        "startvalue": 1943,
        "endvalue": 1943,
        "tags": [
            "Anekdote",
            "Geschichte"
        ],
        "furtherInformation": []
    },
    {
        "title": "Der erste Bug",
        "fronttext": "Eine echte Motte im Relais eines Computers führte zur Prägung eines berühmten Informatik-Begriffs.",
        "backtext": "Grace Hopper fand die Motte im Mark II Computer und klebte sie in das Logbuch: 'First actual case of bug being found.'",
        "valuetext": "1947",
        "startvalue": 1947,
        "endvalue": 1947,
        "tags": [
            "Anekdote",
            "Geschichte",
            "Pionier",
            "!einfach"
        ],
        "furtherInformation": []
    },
    {
        "title": "Das Amdahlsche Gesetz",
        "fronttext": "Das mathematische Gesetz, das zeigt, dass man ein Programm nicht unendlich beschleunigen kann, indem man einfach immer mehr CPU-Kerne nutzt.",
        "backtext": "Gene Amdahl wies nach, dass die maximale Beschleunigung (Speedup) durch parallele Systeme immer durch den sequentiellen (nicht parallelisierbaren) Teil des Algorithmus strikt begrenzt wird.",
        "valuetext": "1967",
        "startvalue": 1967,
        "endvalue": 1967,
        "tags": [
            "Theorie",
            "Hardware",
            "Anekdote"
        ],
        "furtherInformation": []
    },
    {
        "title": "Das Brooks'sche Gesetz",
        "fronttext": "Die fundamentale Weisheit des IT-Projektmanagements: 'Ein spätes Softwareprojekt mit mehr Personal auszustatten, macht es nur noch später.'",
        "backtext": "Fred Brooks beschrieb in seinem Buch, dass neue Entwickler erhebliche Einarbeitungszeit benötigen und den Kommunikationsaufwand im bestehenden Team exponentiell in die Höhe treiben.",
        "valuetext": "1975",
        "startvalue": 1975,
        "endvalue": 1975,
        "tags": [
            "Software",
            "Anekdote",
            "Geschichte"
        ],
        "furtherInformation": []
    },
    {
        "title": "Das 'Kein Computer im Haus'-Zitat",
        "fronttext": "Das Urteil eines visionären Computer-Herstellers, der absolut keinen rationalen Grund sah, warum Privatleute eine Rechenmaschine daheim besitzen sollten.",
        "backtext": "Ken Olson, Gründer der Großrechner-Firma DEC, sagte dies auf einer Konferenz. Kurz darauf überrollte die Heimcomputer-Welle den Markt und drängte starre Großrechner ins Abseits.",
        "valuetext": "1977",
        "startvalue": 1977,
        "endvalue": 1977,
        "tags": [
            "Anekdote",
            "Hardware",
            "Geschichte"
        ],
        "furtherInformation": []
    },
    {
        "title": "Der '640 Kilobyte'-Mythos",
        "fronttext": "Ein legendärer Ausspruch über die Obergrenze des Arbeitsspeichers, der einem Tech-Milliardär zugeschrieben wird, obwohl er ihn vermutlich nie gesagt hat.",
        "backtext": "Sinnbildlich für den rasanten Fortschritt gilt der Satz: '640 Kilobyte Speicher sollten für jeden genug sein' (oft Bill Gates zugeordnet). Damals eine enorme Menge, heute verbraucht eine leere Website das Tausendfache.",
        "valuetext": "1981",
        "startvalue": 1981,
        "endvalue": 1981,
        "tags": [
            "Anekdote",
            "Software",
            "Geschichte"
        ],
        "furtherInformation": []
    },
    {
        "title": "Linus' Gesetz",
        "fronttext": "Das Mantra der Open-Source-Bewegung: 'Wenn genügend Augen hinschauen, sind alle Softwarefehler trivial.'",
        "backtext": "Formuliert von Eric S. Raymond in Anlehnung an Linus Torvalds. Es besagt, dass Code durch die Überprüfung einer großen, transparenten Community automatisch sicherer und stabiler wird.",
        "valuetext": "1999",
        "startvalue": 1999,
        "endvalue": 1999,
        "tags": [
            "OpenSource",
            "Anekdote",
            "Software"
        ],
        "furtherInformation": []
    },
    {
        "title": "Datenschutz-Grundverordnung (DSGVO)",
        "fronttext": "Das weitreichende EU-Gesetz, das die Verarbeitung personenbezogener Daten streng regulierte und Webseiten weltweit zu 'Cookie-Bannern' zwang.",
        "backtext": "Die Verordnung stärkte die digitalen Rechte von Individuen (z.B. Recht auf Vergessenwerden) massiv und drohte Tech-Konzernen bei Verstößen erstmals mit Strafen in Milliardenhöhe.",
        "valuetext": "2018",
        "startvalue": 2018,
        "endvalue": 2018,
        "tags": [
            "Internet",
            "Gesellschaft",
            "Standard",
            "!wichtig"
        ],
        "furtherInformation": []
    },

    // ==========================================
    // 14. SCHRIFTSATZ & DOKUMENTATION
    // ==========================================
    {
        "title": "TeX-Schriftsatzsystem",
        "fronttext": "Das hocheffiziente Schriftsatzsystem, das entwickelt wurde, um mathematische Formeln ästhetisch und fehlerfrei auf Papier und Bildschirme zu bringen.",
        "backtext": "Donald E. Knuth war so unzufrieden mit der Druckqualität seiner Bücher, dass er die Arbeit jahrelang pausierte, um dieses System zu programmieren. Es dominiert bis heute wissenschaftliche Publikationen.",
        "valuetext": "1978",
        "startvalue": 1978,
        "endvalue": 1978,
        "tags": [
            "Sprachen",
            "Mathematik",
            "Standard"
        ],
        "furtherInformation": []
    },
    {
        "title": "LaTeX",
        "fronttext": "Das populäre Makro-Paket, das das mächtige, aber komplexe TeX-System durch logische Dokumentstrukturen für Autoren und Wissenschaftler bedienbar machte.",
        "backtext": "Leslie Lamport entwickelte LaTeX (Lamport TeX). Statt des Prinzips 'What You See Is What You Get' setzt es konsequent auf die Trennung von Inhalt und Formatierung über Code-Strukturen.",
        "valuetext": "1984",
        "startvalue": 1984,
        "endvalue": 1984,
        "tags": [
            "Sprachen",
            "Mathematik",
            "Standard"
        ],
        "furtherInformation": []
    },
    {
        "title": "Markdown",
        "fronttext": "Eine extrem leichtgewichtige Auszeichnungssprache, die es erlaubt, formatierten Text zu schreiben, der ohne Konvertierung perfekt lesbar ist.",
        "backtext": "John Gruber und Aaron Swartz entwarfen Markdown. Es wurde zum absoluten Standard für technische Dokumentationen (z.B. README-Dateien auf GitHub) und moderne Chat-Plattformen.",
        "valuetext": "2004",
        "startvalue": 2004,
        "endvalue": 2004,
        "tags": [
            "Sprachen",
            "Internet",
            "Standard"
        ],
        "furtherInformation": []
    },
];
