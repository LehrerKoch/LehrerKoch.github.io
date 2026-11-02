const cardPool = [

    // ==========================================
    // 1. VORGESCHICHTE & MECHANIK
    // ==========================================
    {
        "title": "Abakus",
        "title_en": "The Abacus",
        "fronttext": "Eines der ältesten bekannten Rechenhilfsmittel der Menschheit, das auf verschiebbaren Kugeln basiert.",
        "fronttext_en": "One of humanity's oldest known calculating aids, based on sliding beads.",
        "backtext": "Obwohl mechanisch einfach, ermöglicht der Abakus geübten Nutzern extrem schnelle Grundrechenarten und sogar Wurzelberechnungen.",
        "backtext_en": "Although mechanically simple, the abacus lets practised users perform basic arithmetic extremely quickly – and even extract roots.",
        "valuetext": "um 2500 v. Chr.",
        "valuetext_en": "c. 2500 BC",
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
        "title_en": "The Antikythera Mechanism",
        "fronttext": "Ein antiker 'Analogcomputer' aus Bronze, der zur Vorhersage von Sonnenfinsternissen und Planetenbahnen diente.",
        "fronttext_en": "An ancient bronze 'analogue computer' used to predict solar eclipses and planetary orbits.",
        "backtext": "Das Gerät aus dem 1. oder 2. Jahrhundert v. Chr. gilt als komplexeste Apparatur der Antike und nutzt ein präzises Differentialgetriebe.",
        "backtext_en": "The device from the 1st or 2nd century BC is considered the most complex apparatus of antiquity and uses a precise differential gear.",
        "valuetext": "um 65 v. Chr.",
        "valuetext_en": "c. 65 BC",
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
        "title_en": "The Slide Rule",
        "fronttext": "Das Standard-Werkzeug für Ingenieure vor der Erfindung des Taschenrechners, basierend auf logarithmischen Skalen.",
        "fronttext_en": "The standard tool for engineers before the invention of the pocket calculator, based on logarithmic scales.",
        "backtext": "Er wurde für die Apollo-Mondmissionen genauso genutzt wie für den Bau von Brücken und Wolkenkratzern.",
        "backtext_en": "It was used for the Apollo Moon missions just as much as for building bridges and skyscrapers.",
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
        "title_en": "Wilhelm Schickard's Calculating Clock",
        "fronttext": "Der erste dokumentierte Entwurf einer mechanischen Rechenmaschine für die vier Grundrechenarten.",
        "fronttext_en": "The first documented design of a mechanical calculating machine for the four basic arithmetic operations.",
        "backtext": "Sie nutzte Zahnräder und Zehnerüberträge. Schickard baute sie u.a. für Johannes Kepler, um dessen astronomische Rechnungen zu erleichtern.",
        "backtext_en": "It used gears and tens-carry mechanisms. Schickard built it, among other things, for Johannes Kepler, to ease his astronomical calculations.",
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
        "title_en": "The Stepped Reckoner",
        "fronttext": "Diese Maschine von Leibniz nutzte eine gestufte Walze ('Leibniz-Rad'), um Multiplikationen mechanisch durchzuführen.",
        "fronttext_en": "This machine by Leibniz used a stepped drum (the 'Leibniz wheel') to perform multiplication mechanically.",
        "backtext": "Gottfried Wilhelm Leibniz' Erfindung legte die Basis für fast alle mechanischen Taschenrechner der folgenden 200 Jahre.",
        "backtext_en": "Gottfried Wilhelm Leibniz's invention laid the basis for almost all mechanical calculators of the following 200 years.",
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
        "title_en": "The Jacquard Loom",
        "fronttext": "Die erste Maschine, die durch Lochkarten gesteuert wurde, um komplexe Webmuster automatisiert herzustellen.",
        "fronttext_en": "The first machine controlled by punched cards, used to weave complex patterns automatically.",
        "backtext": "Joseph-Marie Jacquard bewies damit, dass Maschinen durch austauschbare 'Programme' (Lochkarten) gesteuert werden können.",
        "backtext_en": "Joseph-Marie Jacquard thereby proved that machines can be controlled by interchangeable 'programs' (punched cards).",
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
        "title_en": "The Difference Engine",
        "fronttext": "Ein gigantischer Entwurf für eine mechanische Maschine zur automatischen Berechnung von Logarithmentafeln.",
        "fronttext_en": "A gigantic design for a mechanical machine to compute logarithm tables automatically.",
        "backtext": "Charles Babbage scheiterte zwar am Bau der kompletten Maschine, bewies aber die theoretische Machbarkeit automatischer Kalkulationen.",
        "backtext_en": "Charles Babbage failed to build the complete machine, but proved the theoretical feasibility of automatic calculation.",
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
        "title_en": "The Analytical Engine",
        "fronttext": "Der theoretische Entwurf des ersten universell programmierbaren Computers mit Recheneinheit, Speicher und Steuerung.",
        "fronttext_en": "The theoretical design of the first universally programmable computer with an arithmetic unit, memory and control.",
        "backtext": "Babbages Entwurf enthielt bereits alle Kernkomponenten moderner Computer, wurde aber zu seinen Lebzeiten nie vollendet.",
        "backtext_en": "Babbage's design already contained all the core components of modern computers, but was never completed in his lifetime.",
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
        "title_en": "Ada Lovelace and the First Program",
        "fronttext": "Eine britische Mathematikerin verfasste einen komplexen Algorithmus zur Berechnung von Bernoulli-Zahlen für eine mechanische Rechenmaschine und gilt damit als erste Programmiererin der Welt.",
        "fronttext_en": "A British mathematician wrote a complex algorithm for computing Bernoulli numbers on a mechanical calculating machine, making her the world's first programmer.",
        "backtext": "Sie arbeitete mit Charles Babbage zusammen und erkannte im Gegensatz zu ihm, dass seine 'Analytical Engine' nicht nur reine Zahlen, sondern auch Symbole, Musik oder Grafiken verarbeiten könnte, wenn man ihr logische Regeln füttert.",
        "backtext_en": "She worked with Charles Babbage and, unlike him, realised that his 'Analytical Engine' could process not just numbers but also symbols, music or graphics, if fed logical rules.",
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
        "title_en": "Boolean Algebra",
        "fronttext": "Er schuf ein logisches System, das alle Aussagen auf 'Wahr' oder 'Falsch' (1 oder 0) reduzierte.",
        "fronttext_en": "He created a logical system that reduced all statements to 'true' or 'false' (1 or 0).",
        "backtext": "George Booles Arbeit 'The Laws of Thought' bildet heute das mathematische Fundament der gesamten Digitaltechnik und Schaltlogik.",
        "backtext_en": "George Boole's work 'The Laws of Thought' forms the mathematical foundation of all modern digital technology and switching logic.",
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
        "title_en": "The Hollerith Tabulating Machine",
        "fronttext": "Für die US-Volkszählung entwickelte er ein System zur Datenverarbeitung mittels Lochkarten.",
        "fronttext_en": "For the US census he developed a system for processing data using punched cards.",
        "backtext": "Herman Hollerith legte damit den Grundstein für die Firma IBM und bewies, dass Maschinen große Datenmengen analysieren können.",
        "backtext_en": "Herman Hollerith thereby laid the foundation of the company IBM and proved that machines can analyse large amounts of data.",
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
        "title_en": "The Curta Calculator",
        "fronttext": "Die kleinste mechanische Rechenmaschine der Welt, die optisch an eine Pfeffermühle erinnert.",
        "fronttext_en": "The smallest mechanical calculating machine in the world, visually reminiscent of a pepper mill.",
        "backtext": "Curt Herzstark entwarf sie während seiner Haft im Konzentrationslager Buchenwald. Sie blieb bis in die 1970er der Goldstandard für mobiles Rechnen.",
        "backtext_en": "Curt Herzstark designed it during his imprisonment in the Buchenwald concentration camp. It remained the gold standard for mobile calculation into the 1970s.",
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
        "title_en": "The Euclidean Algorithm",
        "fronttext": "Einer der ältesten numerischen Algorithmen der Menschheit bestimmt hocheffizient den größten gemeinsamen Teiler (ggT) zweier natürlicher Zahlen.",
        "fronttext_en": "One of humanity's oldest numerical algorithms determines the greatest common divisor (gcd) of two natural numbers with great efficiency.",
        "backtext": "Beschrieben in Euklids 'Elementen', basiert das Verfahren auf der wiederholten Subtraktion oder Division (Modulo-Rechnung). Es ist bis heute ein elementarer Baustein in der modernen Zahlentheorie und Kryptographie.",
        "backtext_en": "Described in Euclid's 'Elements', the method is based on repeated subtraction or division (modular arithmetic). It remains an elementary building block of modern number theory and cryptography.",
        "valuetext": "um 300 v. Chr.",
        "valuetext_en": "c. 300 BC",
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
        "title_en": "The Turing Machine",
        "fronttext": "Ein theoretisches Modell, das definiert, was 'Berechenbarkeit' eigentlich bedeutet.",
        "fronttext_en": "A theoretical model that defines what 'computability' actually means.",
        "backtext": "Alan Turing zeigte, dass eine einfache Maschine mit einem endlosen Band jedes mathematische Problem lösen kann, für das es einen Algorithmus gibt.",
        "backtext_en": "Alan Turing showed that a simple machine with an endless tape can solve any mathematical problem for which an algorithm exists.",
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
        "title_en": "The Halting Problem",
        "fronttext": "Die Entdeckung, dass es unmöglich ist, ein Programm zu schreiben, das für jedes beliebige andere Programm vorhersagt, ob es jemals stoppt.",
        "fronttext_en": "The discovery that it is impossible to write a program that predicts, for any other program, whether it will ever stop.",
        "backtext": "Alan Turing bewies damit, dass die Mathematik und Informatik Grenzen haben – nicht alles ist berechenbar.",
        "backtext_en": "Alan Turing thereby proved that mathematics and computer science have limits – not everything is computable.",
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
        "title_en": "The Lambda Calculus",
        "fronttext": "Ein formales System zur Untersuchung von Funktionen, das zeitgleich mit der Turing-Maschine die mathematische Grenze der Berechenbarkeit definierte.",
        "fronttext_en": "A formal system for studying functions which, at the same time as the Turing machine, defined the mathematical limits of computability.",
        "backtext": "Alonzo Church entwickelte dieses System. Es verzichtet komplett auf Speicherzustände und bildet bis heute das mathematische Fundament aller funktionalen Programmiersprachen.",
        "backtext_en": "Alonzo Church developed this system. It does entirely without memory states and remains the mathematical foundation of all functional programming languages.",
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
        "title_en": "The Church–Turing Thesis",
        "fronttext": "Zwei mathematische Genies formulieren unabhängig voneinander die fundamentale Annahme darüber, was auf dieser Welt überhaupt algorithmisch berechenbar ist.",
        "fronttext_en": "Two mathematical geniuses independently formulated the fundamental assumption about what in this world can be computed algorithmically at all.",
        "backtext": "Alonzo Church und Alan Turing zeigten 1936, dass alle intuitiv berechenbaren Funktionen exakt den Funktionen entsprechen, die eine Turing-Maschine berechnen kann. Bis heute bildet dies die absolute Grenze unserer Computer.",
        "backtext_en": "In 1936, Alonzo Church and Alan Turing showed that all intuitively computable functions correspond exactly to those a Turing machine can compute. To this day this marks the absolute limit of our computers.",
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
        "title_en": "Symbolic Logic (Shannon)",
        "fronttext": "Die Entdeckung, dass elektrische Schaltkreise logische Operationen (UND, ODER, NICHT) ausführen können.",
        "fronttext_en": "The discovery that electrical circuits can perform logical operations (AND, OR, NOT).",
        "backtext": "Claude Shannons Masterarbeit gilt als eine der wichtigsten der Geschichte, da sie die Brücke zwischen Boolescher Algebra und Elektronik schlug.",
        "backtext_en": "Claude Shannon's master's thesis is considered one of the most important in history, as it built the bridge between Boolean algebra and electronics.",
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
        "title_en": "The Memex Concept",
        "fronttext": "Ein theoretisches Gerät zur Speicherung und Verknüpfung von Wissen, das als Vorläufer des Hypertexts gilt.",
        "fronttext_en": "A theoretical device for storing and linking knowledge, regarded as the forerunner of hypertext.",
        "backtext": "Vannevar Bush beschrieb in 'As We May Think' ein System, das Informationen assoziativ verknüpft – genau wie das heutige World Wide Web.",
        "backtext_en": "In 'As We May Think', Vannevar Bush described a system that links information associatively – just like today's World Wide Web.",
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
        "title_en": "Monte Carlo Simulation",
        "fronttext": "Wenn mathematische oder physikalische Probleme exakt zu komplex zu berechnen sind, hilft dieser Algorithmus, indem er tausende Zufallsexperimente simuliert und statistisch auswertet.",
        "fronttext_en": "When mathematical or physical problems are too complex to compute exactly, this algorithm helps by simulating thousands of random experiments and evaluating them statistically.",
        "backtext": "Stanislaw Ulam hatte die Idee beim Solitaire-Spielen während seiner Krankheitsphase im Manhattan-Projekt. Zusammen mit John von Neumann entwickelte er die Methode, benannt nach dem berühmten Casino in Monaco.",
        "backtext_en": "Stanislaw Ulam had the idea while playing solitaire during an illness in the Manhattan Project. Together with John von Neumann he developed the method, named after the famous casino in Monaco.",
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
        "title_en": "Information Theory",
        "fronttext": "Er definierte die 'Bit'-Einheit und wie Informationen effizient übertragen und komprimiert werden können.",
        "fronttext_en": "He defined the unit 'bit' and how information can be transmitted and compressed efficiently.",
        "backtext": "Claude Shannons Arbeit 'A Mathematical Theory of Communication' begründete die gesamte moderne Kommunikationstechnik.",
        "backtext_en": "Claude Shannon's paper 'A Mathematical Theory of Communication' founded all of modern communications technology.",
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
        "title_en": "The Chomsky Hierarchy",
        "fronttext": "Ein mathematisches Modell zur Klassifikation von formalen Grammatiken, das festlegt, wie komplex eine Sprache ist und welcher Automat sie verarbeiten kann.",
        "fronttext_en": "A mathematical model for classifying formal grammars, defining how complex a language is and which automaton can process it.",
        "backtext": "Noam Chomsky teilte Sprachen in vier Klassen ein. Diese Automatentheorie ist bis heute das absolute Fundament für die Funktionsweise von Compilern und Parsern.",
        "backtext_en": "Noam Chomsky divided languages into four classes. This automata theory remains the absolute foundation of how compilers and parsers work.",
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
        "title_en": "Dijkstra's Algorithm",
        "fronttext": "Ob Navigationssystem im Auto oder Datenrouting im Internet: Dieser klassische Graph-Algorithmus findet in kürzester Zeit den optimalen Pfad zwischen zwei Knoten.",
        "fronttext_en": "Whether a car's navigation system or data routing on the internet: this classic graph algorithm finds the optimal path between two nodes in no time.",
        "backtext": "Edsger W. Dijkstra konzipierte das Verfahren angeblich innerhalb von 20 Minuten bei einer Tasse Kaffee. Er arbeitet nach dem Greedy-Prinzip (Gierige Suche) und bewertet Pfadlängen Schritt für Schritt, um den mathematisch kürzesten Weg zu garantieren.",
        "backtext_en": "Edsger W. Dijkstra reportedly conceived the method within 20 minutes over a cup of coffee. It works on the greedy principle, evaluating path lengths step by step to guarantee the mathematically shortest route.",
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
        "title_en": "QuickSort",
        "fronttext": "Ein extrem populärer und hocheffizienter Sortieralgorithmus arbeitet nach dem Prinzip 'Teile und herrsche' ($Divide\\;and\\;Conquer$), indem er Elemente um ein gewähltes Pivot-Element herum partitioniert.",
        "fronttext_en": "An extremely popular and highly efficient sorting algorithm works on the 'divide and conquer' principle by partitioning elements around a chosen pivot element.",
        "backtext": "Sir Tony Hoare entwickelte dieses Verfahren, das im durchschnittlichen Fall eine hervorragende Laufzeit von $O(n \\log n)$ aufweist. Es gehört heute zum festen Kernbestand fast jeder nativen Programmierbibliothek.",
        "backtext_en": "Sir Tony Hoare developed this method, which has an excellent average running time of $O(n \\log n)$. It is now part of the core of almost every native programming library.",
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
        "title_en": "Structured Programming",
        "fronttext": "Der Aufruf, auf 'GOTO'-Befehle zu verzichten und Programme sauber in Schleifen und Bedingungen zu gliedern.",
        "fronttext_en": "The call to abandon 'GOTO' statements and organise programs cleanly into loops and conditions.",
        "backtext": "Edsger W. Dijkstra veröffentlichte dazu den berühmten Artikel 'Go To Statement Considered Harmful'.",
        "backtext_en": "Edsger W. Dijkstra published the famous article 'Go To Statement Considered Harmful' on the subject.",
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
        "title_en": "Relational Databases (Codd)",
        "fronttext": "Schluss mit dem hierarchischen Daten-Chaos: Ein Mathematiker schlägt vor, Daten strikt in Tabellen mit Zeilen und Spalten zu organisieren, die über Schlüssel verknüpft sind.",
        "fronttext_en": "An end to hierarchical data chaos: a mathematician proposes organising data strictly in tables with rows and columns, linked by keys.",
        "backtext": "Edgar F. Codd veröffentlichte 1970 seine fundamentale Arbeit. Sie bildet das theoretische Fundament für SQL und fast alle modernen relationalen Datenbanksysteme (RDBMS), die heute die Wirtschaft antreiben.",
        "backtext_en": "Edgar F. Codd published his seminal paper in 1970. It forms the theoretical foundation of SQL and almost all modern relational database systems (RDBMS) that power business today.",
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
        "title_en": "The P vs NP Problem",
        "fronttext": "Die wichtigste ungelöste Frage der Informatik: Ist jedes Problem, dessen Lösung schnell überprüft werden kann, auch schnell lösbar?",
        "fronttext_en": "The most important unsolved question in computer science: can every problem whose solution can be checked quickly also be solved quickly?",
        "backtext": "Stephen Cook formulierte das Problem der Komplexitätstheorie. Wer es löst, erhält 1 Million Dollar vom Clay Mathematics Institute.",
        "backtext_en": "Stephen Cook formulated this problem of complexity theory. Whoever solves it receives one million dollars from the Clay Mathematics Institute.",
        "valuetext": "1971",
        "startvalue": 1971,
        "endvalue": 1971,
        "tags": [
            "Theorie",
            "Mathematik",
            "!wichtig"
        ],
        "furtherInformation": ["YouTube-Video (engl.): <a href='https://www.youtube.com/watch?v=rz1INSahE68' target='_blank'>PurpleMind: Computer Science's Biggest Mystery | P vs NP #SoME4</a>"],
        "furtherInformation_en": ["YouTube video: <a href='https://www.youtube.com/watch?v=rz1INSahE68' target='_blank'>PurpleMind: Computer Science's Biggest Mystery | P vs NP #SoME4</a>"]
    },
    {
        "title": "PageRank-Algorithmus",
        "title_en": "The PageRank Algorithm",
        "fronttext": "Ein mathematischer Algorithmus bewertete die Relevanz von Webseiten rein anhand ihrer strukturellen Verlinkungen und legte damit das Fundament für die erfolgreichste Suchmaschine der Welt.",
        "fronttext_en": "A mathematical algorithm rated the relevance of web pages purely by their link structure, laying the foundation for the world's most successful search engine.",
        "backtext": "Larry Page und Sergey Brin entwickelten das Verfahren an der Stanford University und legten damit den Grundstein für Google.",
        "backtext_en": "Larry Page and Sergey Brin developed the method at Stanford University, laying the cornerstone of Google.",
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
        "title_en": "The Caesar Cipher",
        "fronttext": "Eine der ältesten geheimen Verschlüsselungen der Welt verschiebt jeden Buchstaben des Alphabets um eine feste Anzahl von Plätzen.",
        "fronttext_en": "One of the world's oldest secret encryption methods shifts every letter of the alphabet by a fixed number of places.",
        "backtext": "Julius Caesar nutzte dieses symmetrische Substitutionsverfahren mit einer Verschiebung von drei Buchstaben für seine militärische Korrespondenz. Es ist durch einfache Häufigkeitsanalyse extrem leicht zu knacken.",
        "backtext_en": "Julius Caesar used this symmetric substitution cipher with a shift of three letters for his military correspondence. It is extremely easy to crack using simple frequency analysis.",
        "valuetext": "um 50 v. Chr.",
        "valuetext_en": "c. 50 BC",
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
        "title_en": "The Vigenère Cipher",
        "fronttext": "Über Jahrhunderte galt diese polyalphabetische Verschlüsselung als absolut unknackbar ('le chiffre indéchiffrable'), da sie wechselnde Geheimalphabete anhand eines Schlüsselworts nutzt.",
        "fronttext_en": "For centuries this polyalphabetic cipher was considered absolutely unbreakable ('le chiffre indéchiffrable'), as it uses changing secret alphabets based on a keyword.",
        "backtext": "Das Verfahren wurde eigentlich von Giovan Battista Bellaso entwickelt, aber fälschlicherweise Blaise de Vigenère zugeschrieben. Erst im 19. Jahrhundert gelang es Friedrich Kasiski und Charles Babbage unabhängig voneinander, die Periode des Schlüssels mathematisch zu brechen.",
        "backtext_en": "The method was actually invented by Giovan Battista Bellaso but wrongly attributed to Blaise de Vigenère. Only in the 19th century did Friedrich Kasiski and Charles Babbage independently manage to break the key's period mathematically.",
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
    "title": "Maria Stuart & Mathematik",
    "title_en": "Mary, Queen of Scots & Mathematics",
    "fronttext": "In ihrer Gefangenschaft nutzte Maria Stuart die Mathematik (insbesondere Chiffren) als Überlebensstrategie.",
    "fronttext_en": "During her imprisonment, Mary Stuart used mathematics (especially ciphers) as a survival strategy.",
    "backtext": "Die Entschlüsselung ihres verschlüsselten Briefwechsels durch Francis Walsingham mittels mathematischer Kryptanalyse führte zu ihrer Verurteilung.",
    "backtext_en": "The decryption of her enciphered correspondence by Francis Walsingham using mathematical cryptanalysis led to her conviction.",
    "valuetext": "1586",
    "startvalue": 1586,
    "endvalue": 1586,
    "tags": [
        "Geschichte",
        "Kryptographie",
        "Politik"
    ],
    "furtherInformation": [
            "<a href='https://detektor.fm/wissen/geschichten-aus-der-mathematik-maryna-viazovska'>Podcast: <em>Geschichten aus der Mathematik</em> | Maryna Viazovska: Das Problem mit den achtdimensionalen Pralinen</a>"
        ],
    "furtherInformation_en": [
        "<a href='https://detektor.fm/wissen/geschichten-aus-der-mathematik-maryna-viazovska'>Podcast (German): <em>Geschichten aus der Mathematik</em> | Maryna Viazovska: Das Problem mit den achtdimensionalen Pralinen</a>"
    ]
  },
    {
        "title": "Kerckhoffs' Prinzip",
        "title_en": "Kerckhoffs's Principle",
        "fronttext": "Ein fundamentales Kriterium der modernen Kryptographie besagt: Die Sicherheit eines Schutzes darf nicht auf der Geheimhaltung des Algorithmus beruhen, sondern einzig auf der Geheimhaltung des Schlüssels.",
        "fronttext_en": "A fundamental criterion of modern cryptography states: the security of a system must not depend on keeping the algorithm secret, but solely on keeping the key secret.",
        "backtext": "Auguste Kerckhoffs vom militärischen Aufklärungsdienst formulierte dieses Prinzip im 19. Jahrhundert. Es bildet das direkte Gegenkonzept zu 'Security through obscurity' (Sicherheit durch Unklarheit) und begründet offene Quelltext-Sicherheitsstandards.",
        "backtext_en": "Auguste Kerckhoffs of the military intelligence service formulated this principle in the 19th century. It is the direct counter-concept to 'security through obscurity' and underpins open-source security standards.",
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
        "title_en": "The One-Time Pad",
        "fronttext": "Das einzige nachweislich mathematisch absolut unknackbare Verschlüsselungsverfahren – unter der Bedingung, dass der Schlüssel rein zufällig generiert, absolut geheim gehalten und exakt so lang wie die Nachricht selbst ist.",
        "fronttext_en": "The only encryption method proven to be mathematically unbreakable – provided the key is generated purely at random, kept absolutely secret and is exactly as long as the message itself.",
        "backtext": "Gilbert Vernam und Joseph Mauborgne erfanden dieses System. Claude Shannon bewies später im Rahmen der Informationstheorie dessen mathematisch perfekte Sicherheit. Größte Schwachstelle ist der logistische Austausch des riesigen Schlüssels.",
        "backtext_en": "Gilbert Vernam and Joseph Mauborgne invented this system. Claude Shannon later proved its mathematically perfect security within information theory. Its greatest weakness is the logistics of exchanging the huge key.",
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
        "title_en": "The Enigma Machine",
        "fronttext": "Die elektromechanische Rotor-Schlüsselmaschine, deren Knackung den Zweiten Weltkrieg verkürzte.",
        "fronttext_en": "The electromechanical rotor cipher machine whose cracking shortened the Second World War.",
        "backtext": "Marian Rejewski und später das Team um Alan Turing nutzten frühe computerähnliche Maschinen ('Turing-Bombe'), um die Codes zu brechen.",
        "backtext_en": "Marian Rejewski and later the team around Alan Turing used early computer-like machines (the 'Turing Bombe') to break the codes.",
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
        "title_en": "Colossus",
        "fronttext": "Der erste elektronische Computer, der im Zweiten Weltkrieg zur Entzifferung verschlüsselter deutscher Nachrichten diente.",
        "fronttext_en": "The first electronic computer, used in the Second World War to decipher encrypted German messages.",
        "backtext": "Colossus wurde in Bletchley Park unter Mitwirkung von Tommy Flowers gebaut und knackte die Lorenz-Schlüsselmaschine.",
        "backtext_en": "Colossus was built at Bletchley Park with the involvement of Tommy Flowers and cracked the Lorenz cipher machine.",
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
        "title_en": "Creeper – The First Computer Virus",
        "fronttext": "Ein experimentelles, sich selbst replizierendes Programm wandert durch das ARPANET und gibt die Nachricht aus: 'I'm the creeper, catch me if you can!'",
        "fronttext_en": "An experimental self-replicating program wanders through the ARPANET displaying the message: 'I'm the creeper, catch me if you can!'",
        "backtext": "Bob Thomas schrieb 1971 den Code, um die Machbarkeit mobiler Anwendungen zu testen. Es beschädigte nichts, gilt aber als das allererste Computervirus der Geschichte.",
        "backtext_en": "Bob Thomas wrote the code in 1971 to test the feasibility of mobile applications. It damaged nothing, but is considered the very first computer virus in history.",
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
        "title_en": "The Diffie–Hellman Key Exchange",
        "fronttext": "Wie können zwei Personen über eine öffentlich belauschte Leitung ein geheimes Kennwort vereinbaren, ohne dass der Lauscher es rekonstruieren kann? Dieser Algorithmus löste das fundamentale Problem.",
        "fronttext_en": "How can two people agree on a secret password over a publicly monitored line without the eavesdropper being able to reconstruct it? This algorithm solved that fundamental problem.",
        "backtext": "Whitfield Diffie und Martin Hellman revolutionierten die digitale Welt mit dem ersten asymmetrischen kryptographischen Protokoll. Es basiert auf Einwegfunktionen, genauer gesagt auf der mathematischen Schwierigkeit des diskreten Logarithmus.",
        "backtext_en": "Whitfield Diffie and Martin Hellman revolutionised the digital world with the first asymmetric cryptographic protocol. It is based on one-way functions – more precisely, on the mathematical difficulty of the discrete logarithm.",
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
        "title_en": "The RSA Cryptosystem",
        "fronttext": "Dieses Public-Key-Verfahren schützt bis heute den globalen Internetverkehr, indem es auf der extremen Schwierigkeit basiert, das Produkt zweier gigantischer Primzahlen zu zerlegen.",
        "fronttext_en": "This public-key method still protects global internet traffic today, based on the extreme difficulty of factoring the product of two gigantic prime numbers.",
        "backtext": "Entworfen von Ron Rivest, Adi Shamir und Leonard Adleman. Während das Multiplizieren zweier Primzahlen für Computer kinderleicht ist, ist das Zurückrechnen (Faktorisieren) ohne den geheimen privaten Schlüssel (die 'Falltür') faktisch unlösbar.",
        "backtext_en": "Designed by Ron Rivest, Adi Shamir and Leonard Adleman. While multiplying two primes is child's play for computers, reversing the calculation (factoring) without the secret private key (the 'trapdoor') is practically impossible.",
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
        "title_en": "The Morris Worm",
        "fronttext": "Das erste Computerprogramm, das sich massenhaft über das Internet verbreitete und tausende Rechner lahmlegte.",
        "fronttext_en": "The first computer program to spread massively across the internet, paralysing thousands of machines.",
        "backtext": "Robert Tappan Morris wollte eigentlich nur die Größe des Internets messen, doch ein Programmierfehler führte zur unkontrollierten Vermehrung.",
        "backtext_en": "Robert Tappan Morris actually only wanted to measure the size of the internet, but a programming error led to uncontrolled replication.",
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
        "title_en": "PGP (Pretty Good Privacy)",
        "fronttext": "Die erste Verschlüsselungssoftware für jedermann, die so stark war, dass die US-Regierung sie als Kriegswaffe einstufte.",
        "fronttext_en": "The first encryption software for everyone – so strong that the US government classified it as a weapon of war.",
        "backtext": "Phil Zimmermann veröffentlichte den Quellcode, um die Privatsphäre im digitalen Zeitalter zu schützen, und riskierte dafür eine Gefängnisstrafe.",
        "backtext_en": "Phil Zimmermann published the source code to protect privacy in the digital age, risking a prison sentence to do so.",
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
        "title_en": "Shor's Algorithm",
        "fronttext": "Ein theoretischer Quantencomputer-Algorithmus, der in der Lage wäre, gängige asymmetrische Verschlüsselungen wie RSA im Handumdrehen auszuhebeln.",
        "fronttext_en": "A theoretical quantum-computer algorithm that would be able to break common asymmetric encryption schemes such as RSA in no time.",
        "backtext": "Peter Shor bewies, dass ein hinreichend großer Quantencomputer die Primfaktorzerlegung in polynomieller Zeit ($O((\\log N)^3)$) lösen könnte. Diese Entdeckung treibt heute die globale Entwicklung der Post-Quanten-Kryptographie voran.",
        "backtext_en": "Peter Shor proved that a sufficiently large quantum computer could solve prime factorisation in polynomial time ($O((\\log N)^3)$). This discovery now drives the global development of post-quantum cryptography.",
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
        "title_en": "The Advanced Encryption Standard (AES)",
        "fronttext": "Der aktuelle, weltweit ungebrochene Standard für symmetrische Blockverschlüsselung wurde in einem jahrelangen, offenen Wettbewerb von zwei belgischen Kryptographen konzipiert und DES ablöste.",
        "fronttext_en": "The current, still unbroken worldwide standard for symmetric block encryption was designed by two Belgian cryptographers in a years-long open competition, replacing DES.",
        "backtext": "Joan Daemen und Vincent Rijmen entwickelten das 'Rijndael'-Verfahren, welches 2001 vom NIST standardisiert wurde. Es nutzt iterative Substitutions-Permutations-Netzwerke und schützt heutzutage sensible Regierungs-, VPN- und Bankdaten.",
        "backtext_en": "Joan Daemen and Vincent Rijmen developed the 'Rijndael' method, standardised by NIST in 2001. It uses iterative substitution–permutation networks and today protects sensitive government, VPN and banking data.",
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
        "title_en": "Stuxnet",
        "fronttext": "Ein hochkomplexer Schadcode manipuliert gezielt industrielle Infrastrukturen und läutet die Ära der physisch zerstörerischen Cyber-Kriegsführung ein.",
        "fronttext_en": "A highly complex piece of malware deliberately manipulates industrial infrastructure, ushering in the era of physically destructive cyber warfare.",
        "backtext": "2010 entdeckt, infizierte dieser Wurm gezielt Siemens-Steuerungen (SPS) in iranischen Nuklearanlagen. Er beschädigte die Uran-Zentrifugen durch extreme Drehzahländerungen, während er den Überwachungssystemen normalen Betrieb vorgaukelte.",
        "backtext_en": "Discovered in 2010, this worm specifically infected Siemens control systems (PLCs) in Iranian nuclear facilities. It damaged the uranium centrifuges through extreme speed changes while faking normal operation to the monitoring systems.",
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
        "title_en": "The Snowden Revelations & the HTTPS Boom",
        "fronttext": "Ein Whistleblower auf der Flucht deckt die lückenlose digitale Massenüberwachung globaler Geheimdienste auf und verändert das Sicherheitsbewusstsein des Internets nachhaltig.",
        "fronttext_en": "A whistleblower on the run exposes the seamless digital mass surveillance by global intelligence agencies, permanently changing the internet's security awareness.",
        "backtext": "Edward Snowdens Dokumente von 2013 zeigten, dass unverschlüsselter Web-Verkehr massenhaft abgefangen wurde. Dies stieß die weltweite, flächendeckende Umstellung von HTTP auf das verschlüsselte HTTPS an.",
        "backtext_en": "Edward Snowden's documents from 2013 showed that unencrypted web traffic was being intercepted en masse. This triggered the worldwide, wholesale switch from HTTP to encrypted HTTPS.",
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
        "title_en": "The Heartbleed Bug",
        "fronttext": "Ein unbemerktes Sicherheitsloch in einer extrem weit verbreiteten Verschlüsselungs-Bibliothek erlaubt es Angreifern, private Server-Schlüssel und Passwörter unbemerkt auszulesen.",
        "fronttext_en": "An unnoticed security hole in an extremely widespread encryption library allows attackers to read private server keys and passwords undetected.",
        "backtext": "Im Jahr 2014 wurde dieser kritische Bug in OpenSSL entdeckt. Durch einen fehlenden Validierungs-Check (Missing Bounds Check) bei einer Heartbeat-Anfrage gab der Server mehr Arbeitsspeicherpreis, als er sollte.",
        "backtext_en": "This critical bug in OpenSSL was discovered in 2014. Due to a missing bounds check in a heartbeat request, the server revealed more working memory than it should have.",
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
        "title_en": "The WannaCry Ransomware Crisis",
        "fronttext": "Ein globaler Krypto-Trojaner verschlüsselt innerhalb weniger Stunden Hunderttausende Computer in Krankenhäusern, Behörden und Firmen und fordert Lösegeld in Bitcoin.",
        "fronttext_en": "Within a few hours, a global crypto-trojan encrypts hundreds of thousands of computers in hospitals, government offices and companies, demanding ransom in Bitcoin.",
        "backtext": "Im Mai 2017 nutzte der Exploit 'EternalBlue' (eine zuvor von der NSA entdeckte Windows-Sicherheitslücke) ein unverschlüsseltes Netzwerkprotokoll aus, um sich rasant und vollautomatisch weltweit zu verbreiten.",
        "backtext_en": "In May 2017 the 'EternalBlue' exploit (a Windows vulnerability previously discovered by the NSA) abused an unencrypted network protocol to spread rapidly and fully automatically around the world.",
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
        "title_en": "The Zuse Z3",
        "fronttext": "Der erste funktionsfähige, frei programmierbare und vollautomatische Rechenrechner der Welt.",
        "fronttext_en": "The world's first working, freely programmable, fully automatic computer.",
        "backtext": "Konrad Zuse baute den Z3 in Berlin. Er arbeitete bereits mit dem binären Gleitkommasystem statt des dezimalen Systems.",
        "backtext_en": "Konrad Zuse built the Z3 in Berlin. It already worked with the binary floating-point system instead of the decimal system.",
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
        "title_en": "ENIAC",
        "fronttext": "Der erste elektronische Universalrechner (General Purpose Computer), der ohne mechanische Teile arbeitete.",
        "fronttext_en": "The first electronic general-purpose computer that worked without mechanical parts.",
        "backtext": "Mit über 17.000 Elektronenröhren füllte er einen ganzen Raum und wurde u.a. zur Berechnung von Schusstafeln für die Artillerie genutzt.",
        "backtext_en": "With over 17,000 vacuum tubes it filled an entire room and was used, among other things, to compute artillery firing tables.",
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
        "title_en": "The Von Neumann Architecture",
        "fronttext": "Ein Konzept, bei dem Programmdaten und Befehle im selben Speicher abgelegt werden.",
        "fronttext_en": "A concept in which program data and instructions are stored in the same memory.",
        "backtext": "Dieses von John von Neumann beschriebene Modell ist bis heute die Basis für fast alle modernen Computer-CPUs.",
        "backtext_en": "This model, described by John von Neumann, remains the basis of almost all modern computer CPUs.",
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
        "title_en": "The Invention of the Transistor",
        "fronttext": "Das Bauteil, das die Elektronenröhre ersetzte und Computer klein, zuverlässig und effizient machte.",
        "fronttext_en": "The component that replaced the vacuum tube and made computers small, reliable and efficient.",
        "backtext": "Bardeen, Brattain und Shockley erhielten für diese Revolution bei den Bell Labs den Nobelpreis für Physik.",
        "backtext_en": "Bardeen, Brattain and Shockley received the Nobel Prize in Physics for this revolution at Bell Labs.",
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
        "title_en": "UNIVAC I",
        "fronttext": "Der erste kommerziell in Serie hergestellte Computer der USA erlangt Berühmtheit, als er den Ausgang einer US-Präsidentschaftswahl verblüffend präzise vorhersagt.",
        "fronttext_en": "The first commercially mass-produced computer in the USA becomes famous when it predicts the outcome of a US presidential election with astonishing precision.",
        "backtext": "1951 von Eckert und Mauchly gebaut, prognostizierte die Maschine den Erdrutschsieg von Eisenhower im Fernsehen korrekt, obwohl menschliche Experten ein knappes Rennen erwarteten.",
        "backtext_en": "Built in 1951 by Eckert and Mauchly, the machine correctly forecast Eisenhower's landslide victory on television, even though human experts expected a close race.",
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
        "title_en": "Magnetic-Core Memory",
        "fronttext": "Die erste zuverlässige Form von Arbeitsspeicher (RAM) in Computern, die Daten über winzige magnetische Ringe speicherte.",
        "fronttext_en": "The first reliable form of working memory (RAM) in computers, storing data in tiny magnetic rings.",
        "backtext": "Die Ringe wurden von Hand auf Drähte gefädelt. Der Speicher war nicht-flüchtig und behielt seine Daten auch nach dem Ausschalten des Stroms.",
        "backtext_en": "The rings were threaded onto wires by hand. The memory was non-volatile, retaining its data even after the power was switched off.",
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
        "title_en": "The First Hard Disk (RAMAC 305)",
        "fronttext": "Ein riesiges Gerät von der Größe zweier Kühlschränke, das lediglich 5 Megabyte speichern konnte.",
        "fronttext_en": "A huge device the size of two refrigerators that could store just 5 megabytes.",
        "backtext": "IBM vermietete das System für 3.200 Dollar pro Monat. Die Daten wurden auf 50 riesigen magnetischen Scheiben gespeichert.",
        "backtext_en": "IBM leased the system for 3,200 dollars a month. The data was stored on 50 enormous magnetic platters.",
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
        "title_en": "The Integrated Circuit (Chip)",
        "fronttext": "Die Kombination vieler Transistoren auf einem einzigen Halbleiter-Plättchen.",
        "fronttext_en": "The combination of many transistors on a single sliver of semiconductor.",
        "backtext": "Jack Kilby (Texas Instruments) und Robert Noyce (Fairchild Semiconductor) erfanden den Chip fast gleichzeitig.",
        "backtext_en": "Jack Kilby (Texas Instruments) and Robert Noyce (Fairchild Semiconductor) invented the chip almost simultaneously.",
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
        "title_en": "Sketchpad",
        "fronttext": "Ein Meilenstein der Mensch-Maschine-Interaktion: Das erste Programm, mit dem man mittels eines Lichtstifts direkt Grafiken auf einem Bildschirm zeichnen und manipulieren konnte.",
        "fronttext_en": "A milestone of human–computer interaction: the first program that let you draw and manipulate graphics directly on a screen using a light pen.",
        "backtext": "Ivan Sutherlands Doktorarbeit von 1963 gilt als Urvater der grafischen Benutzeroberflächen (GUI) sowie von CAD-Software und der modernen Computergrafik.",
        "backtext_en": "Ivan Sutherland's 1963 doctoral thesis is regarded as the ancestor of graphical user interfaces (GUIs), CAD software and modern computer graphics.",
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
        "title_en": "The IBM System/360",
        "fronttext": "Die erste Computer-Familie, bei der Software auf verschiedenen Modellen derselben Serie laufen konnte.",
        "fronttext_en": "The first family of computers in which software could run on different models of the same series.",
        "backtext": "Zuvor musste für jeden neuen Computer die Software neu geschrieben werden. Das S/360 begründete das Konzept der Software-Kompatibilität.",
        "backtext_en": "Previously, software had to be rewritten for every new computer. The S/360 established the concept of software compatibility.",
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
        "title_en": "The PDP-8 (Minicomputer)",
        "fronttext": "Der erste kommerziell erfolgreiche 'Minicomputer'. Er war klein genug, um auf einem Schreibtisch Platz zu finden.",
        "fronttext_en": "The first commercially successful 'minicomputer'. It was small enough to fit on a desk.",
        "backtext": "Zuvor waren Computer schrankgroße Ungetüme für Millionen Dollar. Die PDP-8 von DEC öffnete die Computertechnik für kleinere Firmen und Labore.",
        "backtext_en": "Before it, computers were cabinet-sized monsters costing millions of dollars. DEC's PDP-8 opened up computing to smaller companies and laboratories.",
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
        "title_en": "Moore's Law",
        "fronttext": "Die Vorhersage, dass sich die Anzahl der Transistoren auf einem Chip etwa alle zwei Jahre verdoppelt und damit auch die Rechenleistung.",
        "fronttext_en": "The prediction that the number of transistors on a chip doubles roughly every two years – and with it, computing power.",
        "backtext": "Gordon Moore (Intel-Mitgründer) stellte diese Beobachtung auf, die fast 50 Jahre lang die Entwicklung der Hardware diktierte.",
        "backtext_en": "Gordon Moore (co-founder of Intel) made this observation, which dictated hardware development for almost 50 years.",
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
        "title_en": "The First Computer Mouse",
        "fronttext": "Ein hölzernes Kästchen mit zwei Rädern, das die Interaktion mit Bildschirmen revolutionierte.",
        "fronttext_en": "A wooden box with two wheels that revolutionised interaction with screens.",
        "backtext": "Douglas Engelbart präsentierte sie in der 'Mother of All Demos' zusammen mit Hypertext und Videokonferenzen.",
        "backtext_en": "Douglas Engelbart presented it in the 'Mother of All Demos' together with hypertext and video conferencing.",
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
        "title_en": "The First Microprocessor (Intel 4004)",
        "fronttext": "Zum ersten Mal passte die gesamte Zentraleinheit (CPU) eines Computers auf einen einzigen Chip.",
        "fronttext_en": "For the first time, a computer's entire central processing unit (CPU) fitted on a single chip.",
        "backtext": "Dies ermöglichte den Bau von kleinen Geräten, die zuvor ganze Räume füllten.",
        "backtext_en": "This made it possible to build small devices that had previously filled entire rooms.",
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
        "title_en": "The Floppy Disk",
        "fronttext": "Das erste populäre Medium zum Datenaustausch, erfunden von Alan Shugart bei IBM.",
        "fronttext_en": "The first popular medium for exchanging data, invented by Alan Shugart at IBM.",
        "backtext": "Die ersten Disketten waren 8 Zoll groß und biegsam (daher 'floppy'). Später folgten die 5,25-Zoll- und die starren 3,5-Zoll-Disketten und fassten nur 1,44 MB. Das 'Speichern'-Icon in Software hat noch heute ihre Form.",
        "backtext_en": "The first floppies were 8 inches across and bendable (hence 'floppy'). They were followed by the 5.25-inch and the rigid 3.5-inch disks, which held just 1.44 MB. The 'save' icon in software still has their shape today.",
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
        "title_en": "Ethernet",
        "fronttext": "Die Technologie zur lokalen Vernetzung von Computern mittels Kabeln (LAN).",
        "fronttext_en": "The technology for connecting computers locally using cables (LAN).",
        "backtext": "Robert Metcalfe entwickelte Ethernet bei Xerox PARC; es wurde zum weltweiten Standard für LAN-Verbindungen.",
        "backtext_en": "Robert Metcalfe developed Ethernet at Xerox PARC; it became the worldwide standard for LAN connections.",
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
        "title_en": "The Xerox Alto",
        "fronttext": "Der erste Computer mit grafischer Benutzeroberfläche (GUI), Fenstern, Icons und einer Maus.",
        "fronttext_en": "The first computer with a graphical user interface (GUI), windows, icons and a mouse.",
        "backtext": "Obwohl nie kommerziell erfolgreich, inspirierte der Alto direkt den Apple Macintosh und Microsoft Windows.",
        "backtext_en": "Although never a commercial success, the Alto directly inspired the Apple Macintosh and Microsoft Windows.",
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
        "title_en": "The Altair 8800",
        "fronttext": "Der Bausatz, der die Heimcomputer-Revolution auslöste und Bill Gates zur Gründung von Microsoft bewegte.",
        "fronttext_en": "The kit that sparked the home-computer revolution and prompted Bill Gates to found Microsoft.",
        "backtext": "Der Computer hatte keinen Bildschirm und keine Tastatur, wurde aber zum Kultobjekt der ersten Hacker-Generation.",
        "backtext_en": "The computer had no screen and no keyboard, but became a cult object for the first generation of hackers.",
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
        "title_en": "The Cray-1 Supercomputer",
        "fronttext": "Der schnellste Rechner seiner Zeit, berühmt für seine hufeisenförmige Bauweise zur Minimierung der Kabellängen.",
        "fronttext_en": "The fastest computer of its time, famous for its horseshoe-shaped design that minimised cable lengths.",
        "backtext": "Seymour Cray schuf eine Ikone des High-Performance-Computings, die 160 Millionen Rechenoperationen pro Sekunde (MFLOPS) schaffte.",
        "backtext_en": "Seymour Cray created an icon of high-performance computing that managed 160 million operations per second (MFLOPS).",
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
        "title_en": "The Apple I & II",
        "fronttext": "Die Computer, die Apple zum Erfolg führten und das Design von 'Computern für alle' prägten.",
        "fronttext_en": "The computers that made Apple successful and shaped the idea of 'computers for everyone'.",
        "backtext": "Steve Wozniak entwarf die Hardware, Steve Jobs vermarktete sie. Der Apple II war der erste PC, der fertig montiert im Gehäuse verkauft wurde.",
        "backtext_en": "Steve Wozniak designed the hardware, Steve Jobs marketed it. The Apple II was the first PC sold fully assembled in a case.",
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
        "title_en": "The IBM PC",
        "fronttext": "Der Computer, der den Begriff 'PC' zum Standard machte und die Business-Welt digitalisierte.",
        "fronttext_en": "The computer that made the term 'PC' the standard and digitalised the business world.",
        "backtext": "Durch die offene Architektur und das Betriebssystem von Microsoft (MS-DOS) entstand ein riesiger Markt für kompatible Klone.",
        "backtext_en": "Its open architecture and Microsoft's operating system (MS-DOS) created a huge market for compatible clones.",
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
        "title_en": "The Compact Disc (CD)",
        "fronttext": "Der erste weltweit standardisierte optische Datenträger revolutioniert die Musikindustrie und verdrängt die Schallplatte durch digitale, laserschnittene Präzision.",
        "fronttext_en": "The first globally standardised optical storage medium revolutionises the music industry, displacing vinyl with digital, laser-cut precision.",
        "backtext": "Gemeinsam von Philips und Sony entwickelt, bot sie Platz für bis zu 700 MB bzw. bis zu 74 Minuten fehlerfreien digitalen Ton – eine Länge, die angeblich gewählt wurde, um Beethovens 9. Sinfonie am Stück abspielen zu können.",
        "backtext_en": "Developed jointly by Philips and Sony, it held up to 700 MB or up to 74 minutes of flawless digital sound – a length supposedly chosen so that Beethoven's Ninth Symphony could be played without interruption.",
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
        "title_en": "The Apple Macintosh",
        "fronttext": "Der erste erschwingliche Computer mit grafischer Benutzeroberfläche für den Massenmarkt.",
        "fronttext_en": "The first affordable computer with a graphical user interface for the mass market.",
        "backtext": "Bekannt durch den '1984'-Werbespot, ersetzte der Mac Befehlszeilen durch Fenster und einen Papierkorb.",
        "backtext_en": "Famous for its '1984' commercial, the Mac replaced command lines with windows and a wastebasket.",
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
        "title_en": "The Digital Versatile Disc (DVD)",
        "fronttext": "Der Nachfolger der CD erhöht die Speicherkapazität durch einen feineren Laser drastisch und läutet das Ende der klobigen VHS-Videokassetten im Heimkino ein.",
        "fronttext_en": "The CD's successor drastically increases storage capacity with a finer laser, heralding the end of bulky VHS cassettes in home cinema.",
        "backtext": "Ein Konsortium aus Tech- und Medienriesen einigte sich auf diesen gemeinsamen Standard, um einen Formatkrieg zu verhindern. Mit anfangs 4,7 GB Speicherplatz wurde sie auch zum neuen Standardmedium für große PC-Software und Spiele.",
        "backtext_en": "A consortium of tech and media giants agreed on this common standard to prevent a format war. With an initial 4.7 GB of storage, it also became the new standard medium for large PC software and games.",
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
        "title_en": "3dfx Voodoo Graphics",
        "fronttext": "Die legendäre Zusatzsteckkarte, die dedizierte 3D-Grafikbeschleunigung auf PCs massentauglich machte.",
        "fronttext_en": "The legendary add-in card that brought dedicated 3D graphics acceleration to the PC mass market.",
        "backtext": "Sie berechnete Texturen und Polygone direkt in Hardware. Spiele wie 'Tomb Raider' sahen plötzlich flüssig aus und lösten einen PC-Aufrüst-Boom aus.",
        "backtext_en": "It computed textures and polygons directly in hardware. Games like 'Tomb Raider' suddenly looked smooth, triggering a PC upgrade boom.",
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
        "title_en": "The USB Standard (Universal Serial Bus)",
        "fronttext": "Der Anschluss, der das Chaos auf der PC-Rückseite beendete, indem er serielle, parallele und PS/2-Stecker ersetzte.",
        "fronttext_en": "The connector that ended the chaos on the back of the PC by replacing serial, parallel and PS/2 plugs.",
        "backtext": "Ein Konsortium um Intel erfand USB. Dank 'Plug and Play' erkannten Betriebssysteme Geräte nun im laufenden Betrieb ohne Neustart.",
        "backtext_en": "A consortium around Intel invented USB. Thanks to 'plug and play', operating systems now recognised devices on the fly, without a restart.",
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
        "title_en": "The Wi-Fi Standard (IEEE 802.11)",
        "fronttext": "Die Geburtsstunde des modernen drahtlosen lokalen Netzwerks (WLAN).",
        "fronttext_en": "The birth of the modern wireless local area network (WLAN).",
        "backtext": "Das Protokoll legte fest, wie Daten per Funk im 2,4-GHz-Band übertragen werden. Apple war 1999 mit 'AirPort' der erste große Hersteller, der es im Laptop verbaute.",
        "backtext_en": "The protocol defined how data is transmitted by radio in the 2.4 GHz band. In 1999 Apple became the first major manufacturer to build it into a laptop, with 'AirPort'.",
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
        "title_en": "The First iMac (G3)",
        "fronttext": "Ein radikal designter All-in-One-Computer in knallbuntem, transparentem Kunststoffgehäuse rettet einen Traditionshersteller vor dem Bankrott und läutet das Ende des Diskettenlaufwerks ein.",
        "fronttext_en": "A radically designed all-in-one computer in brightly coloured, translucent plastic saves a storied manufacturer from bankruptcy and heralds the end of the floppy drive.",
        "backtext": "Apple präsentierte den iMac 1998. Er verzichtete komplett auf alte Legacy-Anschlüsse und setzte stattdessen radikal auf den neuen USB-Standard sowie ein integriertes Modem für den unkomplizierten Internetzugang.",
        "backtext_en": "Apple presented the iMac in 1998. It dropped all the old legacy ports entirely, betting radically on the new USB standard and an integrated modem for easy internet access.",
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
        "title_en": "The First Experimental Quantum Computer",
        "fronttext": "Forschern gelingt die weltweit erste praktische Demonstration eines Quantenalgorithmus auf einem System mit zwei Quantenbits (Qubits).",
        "fronttext_en": "Researchers achieve the world's first practical demonstration of a quantum algorithm on a system with two quantum bits (qubits).",
        "backtext": "Isaac Chuang und Neil Gershenfeld nutzten am MIT Kernspinresonanz-Verfahren (NMR), um den Grover-Suchalgorithmus auf einem simplen Zwei-Qubit-System auszuführen. Es bewies, dass die theoretischen Konzepte der Quantenmechanik real in Hardware umsetzbar sind.",
        "backtext_en": "At MIT, Isaac Chuang and Neil Gershenfeld used nuclear magnetic resonance (NMR) to run Grover's search algorithm on a simple two-qubit system. It proved that the theoretical concepts of quantum mechanics can really be implemented in hardware.",
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
        "title_en": "The GPU (NVIDIA GeForce 256)",
        "fronttext": "Die Geburtsstunde der modernen Grafikkarte, die Berechnungen von der CPU übernahm.",
        "fronttext_en": "The birth of the modern graphics card, which took computations off the CPU.",
        "backtext": "NVIDIA prägte mit der GeForce 256 den Begriff 'Graphics Processing Unit' (GPU) für Prozessoren mit integrierter Transformation und Beleuchtung.",
        "backtext_en": "With the GeForce 256, NVIDIA coined the term 'graphics processing unit' (GPU) for processors with integrated transform and lighting.",
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
        "title_en": "The Blu-ray Disc",
        "fronttext": "Ein erbitterter Formatkrieg um das hochauflösende Heimkino der Zukunft wird durch einen technologischen Wechsel von roten zu blau-violetten Lasern entschieden.",
        "fronttext_en": "A bitter format war over the high-definition home cinema of the future is decided by a technological switch from red to blue-violet lasers.",
        "backtext": "Sony setzte sich mit der Blu-ray (25 bis 50 GB Speicher) gegen die HD-DVD von Toshiba durch – maßgeblich unterstützt durch die Integration des Laufwerks in die PlayStation 3. Die extrem feine Wellenlänge des blauen Lasers ermöglichte die gigantische Datendichte.",
        "backtext_en": "Sony's Blu-ray (25 to 50 GB of storage) prevailed over Toshiba's HD DVD – helped decisively by the drive's integration into the PlayStation 3. The extremely fine wavelength of the blue laser made the enormous data density possible.",
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
        "title_en": "The iPhone & the Smartphone Revolution",
        "fronttext": "Ein iPod, ein Telefon und ein Internet-Kommunikator in einem Gerät mit Multitouch-Display.",
        "fronttext_en": "An iPod, a phone and an internet communicator in one device with a multi-touch display.",
        "backtext": "Steve Jobs präsentierte das iPhone; es machte das Internet mobil und schuf das Zeitalter der Apps.",
        "backtext_en": "Steve Jobs presented the iPhone; it made the internet mobile and created the age of apps.",
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
        "title_en": "The Raspberry Pi",
        "fronttext": "Ein vollwertiger Computer für nur ca. 35 Euro, der entwickelt wurde, um Informatik-Bildung weltweit zu fördern.",
        "fronttext_en": "A fully-fledged computer for only about 35 euros, developed to promote computer science education worldwide.",
        "backtext": "Der Kreditkarten-große Rechner löste einen gewaltigen Boom in der Maker-Szene und im Bereich Internet of Things (IoT) aus.",
        "backtext_en": "The credit-card-sized computer triggered an enormous boom in the maker scene and in the Internet of Things (IoT).",
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
        "title_en": "Quantum Supremacy",
        "fronttext": "Der Moment, in dem ein Quantencomputer eine Aufgabe löst, für die ein klassischer Supercomputer Jahrtausende bräuchte.",
        "fronttext_en": "The moment a quantum computer solves a task that would take a classical supercomputer millennia.",
        "backtext": "Google behauptete 2019, diesen Meilenstein mit dem Sycamore-Prozessor erreicht zu haben, was jedoch in der Fachwelt noch debattiert wird.",
        "backtext_en": "Google claimed to have reached this milestone in 2019 with its Sycamore processor – though this is still debated in the field.",
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
        "title_en": "FORTRAN",
        "fronttext": "Die erste weit verbreitete Hochsprache, speziell für wissenschaftliches und technisches Rechnen entwickelt.",
        "fronttext_en": "The first widely used high-level language, developed specifically for scientific and technical computing.",
        "backtext": "John Backus leitete das IBM-Team. FORTRAN (Formula Translation) wird in modernisierten Versionen bis heute für Supercomputer genutzt.",
        "backtext_en": "John Backus led the IBM team. FORTRAN (Formula Translation) is still used in modernised versions on supercomputers today.",
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
        "title_en": "LISP",
        "fronttext": "Diese Sprache führte Listenverarbeitung und Rekursion ein und wurde zum Standard der frühen KI-Forschung.",
        "fronttext_en": "This language introduced list processing and recursion and became the standard of early AI research.",
        "backtext": "John McCarthy entwickelte LISP; sie ist eine der ältesten noch verwendeten Programmiersprachen.",
        "backtext_en": "John McCarthy developed LISP; it is one of the oldest programming languages still in use.",
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
        "title_en": "COBOL",
        "fronttext": "Eine Sprache, die wie Englisch klingen sollte, um die Programmierung für die Geschäftswelt zu öffnen.",
        "fronttext_en": "A language meant to sound like English, to open up programming to the business world.",
        "backtext": "Grace Hopper war maßgeblich beteiligt. COBOL (Common Business Oriented Language) steuert noch heute viele Bankensysteme.",
        "backtext_en": "Grace Hopper played a key role. COBOL (Common Business Oriented Language) still runs many banking systems today.",
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
        "title_en": "ALGOL 60",
        "fronttext": "Die Sprache, die den Standard für die Syntax fast aller späteren imperativen Programmiersprachen (wie C, Pascal, Java) setzte.",
        "fronttext_en": "The language that set the standard for the syntax of almost all later imperative programming languages (such as C, Pascal, Java).",
        "backtext": "ALGOL führte formale Codeblöcke (`begin` ... `end`) und lokale Variablen ein. Sie war die erste Sprache, die mit der Backus-Naur-Form beschrieben wurde.",
        "backtext_en": "ALGOL introduced formal code blocks (`begin` ... `end`) and local variables. It was the first language described using Backus–Naur form.",
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
        "title_en": "BASIC",
        "fronttext": "Eine Programmiersprache, die so einfach war, dass sie jedem Studenten das Programmieren ermöglichen sollte.",
        "fronttext_en": "A programming language so simple that it was meant to enable every student to program.",
        "backtext": "Kemeny und Kurtz entwickelten BASIC am Dartmouth College. Sie wurde die Standard-Sprache der Heimcomputer-Revolution.",
        "backtext_en": "Kemeny and Kurtz developed BASIC at Dartmouth College. It became the standard language of the home-computer revolution.",
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
        "title_en": "Simula 67",
        "fronttext": "Die allererste Programmiersprache, die das Konzept der 'Klassen' und 'Objekte' einführte.",
        "fronttext_en": "The very first programming language to introduce the concepts of 'classes' and 'objects'.",
        "backtext": "Entwickelt von Ole-Johan Dahl und Kristen Nygaard in Norwegen, um physikalische Systeme zu simulieren. Sie erfanden damit die objektorientierte Programmierung.",
        "backtext_en": "Developed by Ole-Johan Dahl and Kristen Nygaard in Norway to simulate physical systems. In doing so, they invented object-oriented programming.",
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
        "title_en": "Pascal",
        "fronttext": "Eine von Niklaus Wirth entwickelte Sprache, die speziell entworfen wurde, um Studenten sauberes und strukturiertes Programmieren beizubringen.",
        "fronttext_en": "A language developed by Niklaus Wirth, designed specifically to teach students clean, structured programming.",
        "backtext": "Sie erlangte durch ihre starke Typisierung und Übersichtlichkeit riesige Popularität in der akademischen Ausbildung der 1970er und 80er Jahre.",
        "backtext_en": "Its strong typing and clarity made it hugely popular in academic education in the 1970s and 80s.",
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
        "title_en": "The C Programming Language",
        "fronttext": "Eine Sprache, die Hardwarenähe mit Portabilität verband und zum Fundament moderner Software wurde.",
        "fronttext_en": "A language that combined closeness to the hardware with portability and became the foundation of modern software.",
        "backtext": "Dennis Ritchie entwickelte C, um Unix neu zu schreiben. Fast alle modernen Sprachen (C++, Java, Python) sind von C beeinflusst.",
        "backtext_en": "Dennis Ritchie developed C in order to rewrite Unix. Almost all modern languages (C++, Java, Python) are influenced by C.",
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
        "title_en": "Prolog",
        "fronttext": "Die wichtigste deklarative Programmiersprache, bei der man keine Lösungswege programmiert, sondern logische Fakten und Regeln definiert.",
        "fronttext_en": "The most important declarative programming language, in which you do not program solution steps but define logical facts and rules.",
        "backtext": "Ein eingebauter Algorithmus (Inferenzmaschine) zieht automatische Schlüsse aus den Daten. Extrem populär in der frühen KI-Forschung.",
        "backtext_en": "A built-in algorithm (inference engine) draws automatic conclusions from the data. Extremely popular in early AI research.",
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
        "title_en": "Smalltalk",
        "fronttext": "Die Sprache, die das Konzept der objektorientierten Programmierung (OOP) und grafische Oberflächen perfektionierte.",
        "fronttext_en": "The language that perfected the concept of object-oriented programming (OOP) and graphical interfaces.",
        "backtext": "Entwickelt am Xerox PARC von Alan Kay und anderen, beeinflusste Smalltalk Sprachen wie Java, Python und Ruby massiv.",
        "backtext_en": "Developed at Xerox PARC by Alan Kay and others, Smalltalk massively influenced languages such as Java, Python and Ruby.",
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
        "title_en": "SQL (Structured Query Language)",
        "fronttext": "Die Standardsprache für die Kommunikation mit relationalen Datenbanken.",
        "fronttext_en": "The standard language for communicating with relational databases.",
        "backtext": "Donald D. Chamberlin und Raymond F. Boyce entwickelten sie bei IBM auf Basis von Edgar F. Codds relationalem Modell.",
        "backtext_en": "Donald D. Chamberlin and Raymond F. Boyce developed it at IBM, based on Edgar F. Codd's relational model.",
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
        "title_en": "C++",
        "fronttext": "Die Erweiterung von C um Klassen und Objekte, die die objektorientierte Programmierung populär machte.",
        "fronttext_en": "The extension of C with classes and objects that made object-oriented programming popular.",
        "backtext": "Bjarne Stroustrup entwickelte 'C with Classes', um komplexe Simulationen effizienter schreiben zu können.",
        "backtext_en": "Bjarne Stroustrup developed 'C with Classes' to write complex simulations more efficiently.",
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
        "title_en": "Perl",
        "fronttext": "Das 'Schweizer Taschenmesser' der Programmiersprachen, besonders stark in der Textverarbeitung.",
        "fronttext_en": "The 'Swiss army knife' of programming languages, especially strong at text processing.",
        "backtext": "Larry Wall entwarf Perl mit dem Motto: 'There's more than one way to do it'. Sie war die dominierende Sprache des frühen Webs (CGI).",
        "backtext_en": "Larry Wall designed Perl with the motto: 'There's more than one way to do it'. It was the dominant language of the early web (CGI).",
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
        "title_en": "Python",
        "fronttext": "Eine Sprache, die Lesbarkeit und Einfachheit über alles stellt und heute die KI-Welt dominiert.",
        "fronttext_en": "A language that puts readability and simplicity above all else and dominates the AI world today.",
        "backtext": "Guido van Rossum benannte die Sprache nach 'Monty Python's Flying Circus'. Sie ist heute eine der meistgenutzten Sprachen.",
        "backtext_en": "Guido van Rossum named the language after 'Monty Python's Flying Circus'. It is now one of the most widely used languages.",
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
        "title_en": "Java",
        "fronttext": "Das Versprechen: 'Write Once, Run Anywhere' – Programme laufen auf jedem Gerät mit einer Virtual Machine.",
        "fronttext_en": "The promise: 'Write once, run anywhere' – programs run on any device with a virtual machine.",
        "backtext": "James Gosling (Sun Microsystems) entwickelte Java; sie wurde zur wichtigsten Sprache für Unternehmensanwendungen.",
        "backtext_en": "James Gosling (Sun Microsystems) developed Java; it became the most important language for enterprise applications.",
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
        "title_en": "JavaScript",
        "fronttext": "In nur 10 Tagen entwickelt, um Webseiten interaktiv zu machen, wurde sie zur Sprache des Webs.",
        "fronttext_en": "Developed in just 10 days to make websites interactive, it became the language of the web.",
        "backtext": "Brendan Eich schuf sie für Netscape. Trotz des ähnlichen Namens hat sie fast nichts mit Java zu tun.",
        "backtext_en": "Brendan Eich created it for Netscape. Despite the similar name, it has almost nothing to do with Java.",
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
        "title_en": "PHP",
        "fronttext": "Die Sprache, die das Web dynamisch machte, indem sie Code direkt in HTML-Dokumente einbettete.",
        "fronttext_en": "The language that made the web dynamic by embedding code directly in HTML documents.",
        "backtext": "Rasmus Lerdorf erstellte PHP für seine 'Personal Home Page'; heute laufen Plattformen wie Wikipedia und WordPress damit.",
        "backtext_en": "Rasmus Lerdorf created PHP for his 'Personal Home Page'; today platforms like Wikipedia and WordPress run on it.",
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
        "title_en": "Ruby (and Ruby on Rails)",
        "fronttext": "Eine Sprache aus Japan, die mit dem Fokus auf 'Entwickler-Glück' und intuitive, fast wie Englisch lesbare Syntax entworfen wurde.",
        "fronttext_en": "A language from Japan, designed with a focus on 'developer happiness' and an intuitive syntax that reads almost like English.",
        "backtext": "Yukihiro Matsumoto erschuf Ruby. Das spätere Web-Framework 'Ruby on Rails' revolutionierte das schnelle Bauen von Internet-Startups radikal.",
        "backtext_en": "Yukihiro Matsumoto created Ruby. The later web framework 'Ruby on Rails' radically revolutionised the rapid building of internet start-ups.",
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
        "title_en": "Rust",
        "fronttext": "Eine moderne Sprache, die Speichersicherheit ohne Garbage Collector garantiert und C++ Konkurrenz macht.",
        "fronttext_en": "A modern language that guarantees memory safety without a garbage collector, rivalling C++.",
        "backtext": "Rust wurde bei Mozilla entwickelt und führt seit Jahren die Liste der 'beliebtesten Sprachen' in Entwickler-Umfragen an.",
        "backtext_en": "Rust was developed at Mozilla and has topped the list of 'most loved languages' in developer surveys for years.",
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
        "title_en": "TypeScript",
        "fronttext": "Microsofts Antwort auf das Chaos bei großen Web-Projekten: Eine Erweiterung, die JavaScript um statische Typisierung ergänzt.",
        "fronttext_en": "Microsoft's answer to the chaos of large web projects: an extension that adds static typing to JavaScript.",
        "backtext": "Entworfen von Anders Hejlsberg. TypeScript-Code wird vor der Ausführung in normalen JavaScript-Code kompiliert und verhindert zahllose Fehler zur Laufzeit.",
        "backtext_en": "Designed by Anders Hejlsberg. TypeScript code is compiled into ordinary JavaScript before execution, preventing countless runtime errors.",
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
        "title_en": "The Rust Programming Language",
        "fronttext": "Eine neuartige Systemsprache tritt an, um maximale Performance und Hardwarenähe mit absoluter Speichersicherheit zu verbinden, ganz ohne langsamen Garbage Collector.",
        "fronttext_en": "A new kind of systems language sets out to combine maximum performance and hardware closeness with absolute memory safety – entirely without a slow garbage collector.",
        "backtext": "Ursprünglich von Graydon Hoare bei Mozilla entwickelt und 2015 stabilisiert, verhindert Rust fundamentale Speicherfehler (wie Buffer Overflows) bereits zur Kompilierzeit durch ein strenges 'Ownership'-Modell.",
        "backtext_en": "Originally developed by Graydon Hoare at Mozilla and stabilised in 2015, Rust prevents fundamental memory errors (such as buffer overflows) at compile time through a strict 'ownership' model.",
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
        "title_en": "The First Compiler",
        "fronttext": "Ein Programm, das menschenlesbaren Code in Maschinencode übersetzt, erfunden von einer Pionierin.",
        "fronttext_en": "A program that translates human-readable code into machine code, invented by a pioneer.",
        "backtext": "Grace Hopper entwickelte A-0, womit Programmierer nicht mehr nur in binären Nullen und Einsen schreiben mussten.",
        "backtext_en": "Grace Hopper developed A-0, freeing programmers from having to write only in binary zeros and ones.",
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
        "title_en": "Unix",
        "fronttext": "Das einflussreichste Betriebssystem, das auf Mehrbenutzerbetrieb und Modularität setzt.",
        "fronttext_en": "The most influential operating system, built on multi-user operation and modularity.",
        "backtext": "Ken Thompson und Dennis Ritchie entwickelten Unix bei den Bell Labs. Seine Philosophie prägt macOS, Linux und Android bis heute.",
        "backtext_en": "Ken Thompson and Dennis Ritchie developed Unix at Bell Labs. Its philosophy shapes macOS, Linux and Android to this day.",
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
        "title_en": "VisiCalc",
        "fronttext": "Die allererste Tabellenkalkulation der Welt. Sie machte den Apple II Computer schlagartig vom Spielzeug zum unverzichtbaren Büro-Werkzeug.",
        "fronttext_en": "The world's very first spreadsheet. It instantly turned the Apple II from a toy into an indispensable office tool.",
        "backtext": "Dan Bricklin und Bob Frankston erfanden VisiCalc. Es gilt als die erste 'Killer-Applikation' der Softwaregeschichte – eine Software, die Hardware-Verkäufe antreibt.",
        "backtext_en": "Dan Bricklin and Bob Frankston invented VisiCalc. It is considered the first 'killer application' in software history – software that drives hardware sales.",
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
        "title_en": "MS-DOS",
        "fronttext": "Das textbasierte Betriebssystem, das Microsoft zum Weltmarktführer machte.",
        "fronttext_en": "The text-based operating system that made Microsoft the world market leader.",
        "backtext": "Ursprünglich als QDOS gekauft, wurde es für den IBM PC lizenziert und bildete das Rückgrat der frühen PC-Ära.",
        "backtext_en": "Originally bought as QDOS, it was licensed for the IBM PC and formed the backbone of the early PC era.",
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
        "title_en": "The GNU Project & Free Software",
        "fronttext": "Die Bewegung, die forderte, dass Software-Quellcode für jeden frei verfügbar, veränderbar und teilbar sein muss.",
        "fronttext_en": "The movement demanding that software source code must be freely available, modifiable and shareable for everyone.",
        "backtext": "Richard Stallman startete GNU ('GNU's Not Unix') und schrieb die GPL-Lizenz, die später die Basis für Linux wurde.",
        "backtext_en": "Richard Stallman started GNU ('GNU's Not Unix') and wrote the GPL licence, which later became the basis for Linux.",
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
        "title_en": "Windows 1.0",
        "fronttext": "Microsofts erster Versuch einer grafischen Benutzeroberfläche, die auf MS-DOS aufsetzte.",
        "fronttext_en": "Microsoft's first attempt at a graphical user interface, built on top of MS-DOS.",
        "backtext": "Anfangs belächelt, entwickelte sich Windows bis zur Version 3.1 und 95 zum dominierenden System auf Desktop-Rechnern.",
        "backtext_en": "Initially ridiculed, Windows evolved into the dominant desktop system with versions 3.1 and 95.",
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
        "title_en": "Adobe Photoshop",
        "fronttext": "Das Programm der Brüder Thomas und John Knoll, das digitale Bildbearbeitung so sehr dominierte, dass der Name zum Verb wurde.",
        "fronttext_en": "The program by brothers Thomas and John Knoll that dominated digital image editing so completely that its name became a verb.",
        "backtext": "Ursprünglich als 'Display' gestartet, kaufte Adobe die Lizenz. Es veränderte die Medien- und Designwelt sowie unsere Wahrnehmung von visueller Realität.",
        "backtext_en": "Originally started as 'Display', Adobe bought the licence. It transformed the media and design world – and our perception of visual reality.",
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
        "title_en": "The Linux Kernel",
        "fronttext": "Ein Student aus Finnland schrieb ein freies, Unix-ähnliches Betriebssystem 'nur als Hobby'.",
        "fronttext_en": "A student from Finland wrote a free, Unix-like operating system 'just as a hobby'.",
        "backtext": "Linus Torvalds startete das Projekt, das heute fast alle Server, Supercomputer und Android-Telefone weltweit antreibt.",
        "backtext_en": "Linus Torvalds started the project that today powers almost all servers, supercomputers and Android phones worldwide.",
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
        "title_en": "The MP3 Format",
        "fronttext": "Die Audiokomprimierung, die Musikdateien auf ein Zehntel verkleinerte, ohne dass das menschliche Ohr einen großen Unterschied hört.",
        "fronttext_en": "The audio compression that shrank music files to a tenth of their size without the human ear noticing much difference.",
        "backtext": "Entwickelt maßgeblich am Fraunhofer-Institut (IIS) in Erlangen, veränderte MP3 die gesamte Medienwelt.",
        "backtext_en": "Developed largely at the Fraunhofer Institute (IIS) in Erlangen, MP3 changed the entire media world.",
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
        "title_en": "The Mosaic Browser",
        "fronttext": "Der erste Webbrowser, der Bilder direkt im Text anzeigen konnte und das Web grafisch machte.",
        "fronttext_en": "The first web browser that could display images inline with text, making the web graphical.",
        "backtext": "Marc Andreessen entwickelte ihn am NCSA; daraus entstand später der Netscape Navigator und indirekt Firefox.",
        "backtext_en": "Marc Andreessen developed it at the NCSA; it later gave rise to Netscape Navigator and, indirectly, Firefox.",
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
        "title_en": "Netscape Navigator",
        "fronttext": "Der erste kommerziell erfolgreiche Webbrowser, der den 'Browserkrieg' gegen Microsofts Internet Explorer auslöste.",
        "fronttext_en": "The first commercially successful web browser, which triggered the 'browser war' against Microsoft's Internet Explorer.",
        "backtext": "Netscape verlor den Krieg zwar, begründete vor dem Untergang jedoch das Mozilla-Projekt und schenkte der Welt den Quellcode für den heutigen Firefox.",
        "backtext_en": "Netscape lost the war, but before going under it founded the Mozilla project and gave the world the source code behind today's Firefox.",
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
        "title_en": "The Apache HTTP Server",
        "fronttext": "Die Open-Source-Software, die das frühe World Wide Web trug, indem sie Anfragen von Browsern beantwortete und Webseiten auslieferte.",
        "fronttext_en": "The open-source software that carried the early World Wide Web by answering browser requests and delivering web pages.",
        "backtext": "Der Name entstand, weil die Entwickler ein bestehendes Programm immer wieder mit Software-Flicken ('a patchy server') versahen. Er dominierte jahrzehntelang den Server-Markt.",
        "backtext_en": "The name arose because the developers kept mending an existing program with software patches ('a patchy server'). It dominated the server market for decades.",
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
        "title_en": "Git & Version Control",
        "fronttext": "Ein Tool, das es Tausenden Entwicklern ermöglicht, gleichzeitig am selben Code zu arbeiten, ohne sich gegenseitig zu überschreiben.",
        "fronttext_en": "A tool that lets thousands of developers work on the same code simultaneously without overwriting each other.",
        "backtext": "Linus Torvalds entwickelte Git in nur wenigen Tagen, um die Arbeit am Linux-Kernel besser zu organisieren.",
        "backtext_en": "Linus Torvalds developed Git in just a few days to better organise work on the Linux kernel.",
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
        "title_en": "Docker & Containers",
        "fronttext": "Software wird in isolierte Pakete verpackt, die überall exakt gleich laufen, egal auf welchem Server.",
        "fronttext_en": "Software is packaged into isolated units that run exactly the same everywhere, no matter which server.",
        "backtext": "Docker machte Container-Technologie massentauglich und revolutionierte das Deployment von Webanwendungen.",
        "backtext_en": "Docker made container technology mainstream and revolutionised the deployment of web applications.",
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
        "title_en": "Kubernetes",
        "fronttext": "Ein von Google entwickeltes Open-Source-System zur automatischen Verwaltung und Skalierung von Tausenden Software-Containern.",
        "fronttext_en": "An open-source system developed by Google for automatically managing and scaling thousands of software containers.",
        "backtext": "Es stellt sicher, dass moderne Cloud-Dienste (wie Netflix oder Spotify) auch bei plötzlichen Millionen Nutzerzugriffen stabil laufen.",
        "backtext_en": "It ensures that modern cloud services (such as Netflix or Spotify) stay stable even when millions of users arrive at once.",
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
        "title_en": "The ASCII Standard",
        "fronttext": "Die erste standardisierte Methode, um Buchstaben und Symbole als Zahlenwerte (7-Bit) zu kodieren.",
        "fronttext_en": "The first standardised method for encoding letters and symbols as numeric values (7-bit).",
        "backtext": "ASCII (American Standard Code for Information Interchange) ermöglichte den Datenaustausch zwischen verschiedenen Computersystemen.",
        "backtext_en": "ASCII (American Standard Code for Information Interchange) made data exchange between different computer systems possible.",
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
        "title_en": "ARPANET",
        "fronttext": "Der Vorläufer des Internets: Die erste Vernetzung von Universitätsrechnern über weite Distanzen.",
        "fronttext_en": "The forerunner of the internet: the first long-distance networking of university computers.",
        "backtext": "Die erste Nachricht 'LOGIN' führte zum Systemabsturz nach dem 'LO' – dennoch war die paketvermittelte Kommunikation geboren.",
        "backtext_en": "The first message, 'LOGIN', crashed the system after 'LO' – yet packet-switched communication was born.",
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
        "title_en": "The First Email",
        "fronttext": "Die Nachricht wurde zwischen zwei direkt nebeneinander stehenden Rechnern verschickt und nutzte erstmals das @-Symbol.",
        "fronttext_en": "The message was sent between two computers standing right next to each other and used the @ symbol for the first time.",
        "backtext": "Ray Tomlinson wählte das @, um den Benutzernamen vom Namen des Computers zu trennen. Der Inhalt der Mail war wahrscheinlich nur Test-Buchstaben.",
        "backtext_en": "Ray Tomlinson chose the @ to separate the user name from the name of the computer. The content of the mail was probably just test characters.",
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
        "title_en": "TCP/IP",
        "fronttext": "Das Protokoll-Duo, das festlegt, wie Datenpakete im Internet adressiert und transportiert werden.",
        "fronttext_en": "The protocol duo that defines how data packets are addressed and transported on the internet.",
        "backtext": "Vint Cerf und Bob Kahn schufen die 'Sprache des Internets', die eine Vernetzung unterschiedlichster Netzwerke ermöglichte.",
        "backtext_en": "Vint Cerf and Bob Kahn created the 'language of the internet', enabling the interconnection of very different networks.",
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
        "title_en": "DNS (Domain Name System)",
        "fronttext": "Das 'Telefonbuch' des Internets, das lesbare Namen wie 'google.com' in IP-Adressen übersetzt.",
        "fronttext_en": "The internet's 'phone book', translating readable names like 'google.com' into IP addresses.",
        "backtext": "Vor DNS mussten Administratoren manuell Listen (hosts.txt) pflegen und an jeden Rechner im Netzwerk verteilen.",
        "backtext_en": "Before DNS, administrators had to maintain lists (hosts.txt) manually and distribute them to every computer on the network.",
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
        "title_en": "The World Wide Web (WWW)",
        "fronttext": "Die Erfindung von HTTP, HTML und dem ersten Webbrowser am CERN.",
        "fronttext_en": "The invention of HTTP, HTML and the first web browser at CERN.",
        "backtext": "Tim Berners-Lee wollte Informationen zwischen Wissenschaftlern vernetzen; er stellte seine Erfindung kostenlos der ganzen Welt zur Verfügung.",
        "backtext_en": "Tim Berners-Lee wanted to link information between scientists; he made his invention available to the whole world free of charge.",
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
        "title_en": "The Birth of Unicode",
        "fronttext": "Schluss mit dem Zeichensalat: Ein globaler Standard wird ins Leben gerufen, um alle Schriftzeichen der Menschheit einheitlich digital darzustellen.",
        "fronttext_en": "An end to garbled characters: a global standard is created to represent all of humanity's writing systems digitally and uniformly.",
        "backtext": "Vor Unicode nutzten verschiedene Systeme inkompatible regionale Codierungen (wie ASCII-Erweiterungen), was beim Dateiaustausch zu kryptischen Fehlern führte. Das Unicode-Konsortium standardisiert seither Zeichen plattformübergreifend.",
        "backtext_en": "Before Unicode, different systems used incompatible regional encodings (such as ASCII extensions), leading to cryptic errors when exchanging files. The Unicode Consortium has standardised characters across platforms ever since.",
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
        "title_en": "The First Webcam",
        "fronttext": "Informatiker an der Universität Cambridge richteten eine Kamera auf eine Kaffeemaschine, um unnötige Wege zu vermeiden.",
        "fronttext_en": "Computer scientists at the University of Cambridge pointed a camera at a coffee machine to avoid unnecessary trips.",
        "backtext": "Die 'Trojan Room Coffee Pot' Bilder wurden ab 1993 weltweit ins Web gestreamt und wurden zum Kult-Phänomen.",
        "backtext_en": "The 'Trojan Room Coffee Pot' images were streamed to the web worldwide from 1993 and became a cult phenomenon.",
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
        "title_en": "The Invention of UTF-8",
        "fronttext": "Auf einer Serviette in einem Diner entwerfen zwei Tech-Ikonen eine geniale, vollständig abwärtskompatible Codierung für Unicode-Zeichen.",
        "fronttext_en": "On a napkin in a diner, two tech icons design an ingenious, fully backwards-compatible encoding for Unicode characters.",
        "backtext": "Ken Thompson und Rob Pike entwickelten UTF-8. Es nutzt eine variable Anzahl von Bytes (1 bis 4). Da es für die klassischen ASCII-Zeichen nur ein Byte benötigt, sparte es massiven Speicherplatz und wurde zum dominanten Standard des World Wide Web.",
        "backtext_en": "Ken Thompson and Rob Pike developed UTF-8. It uses a variable number of bytes (1 to 4). Since it needs only one byte for classic ASCII characters, it saved massive amounts of storage and became the dominant standard of the World Wide Web.",
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
        "title_en": "The Invention of CSS",
        "fronttext": "Um das Web von reinen, starren Textseiten zu befreien, wird ein Standard vorgeschlagen, der Inhalt und visuelle Gestaltung von Webseiten strikt trennt.",
        "fronttext_en": "To free the web from plain, rigid text pages, a standard is proposed that strictly separates a page's content from its visual design.",
        "backtext": "Håkon Wium Lie schlug 1994 Cascading Style Sheets vor, die 1996 vom W3C standardisiert wurden. Es ermöglichte modernes Webdesign und dynamische Layouts.",
        "backtext_en": "Håkon Wium Lie proposed Cascading Style Sheets in 1994; they were standardised by the W3C in 1996. CSS made modern web design and dynamic layouts possible.",
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
        "title_en": "The Definition of REST APIs",
        "fronttext": "In seiner Doktorarbeit beschreibt ein Informatiker ein Architekturmodell für verteilte Systeme, das die einfache, zustandslose Kommunikation über das HTTP-Protokoll standardisiert.",
        "fronttext_en": "In his doctoral thesis, a computer scientist describes an architectural model for distributed systems that standardises simple, stateless communication over the HTTP protocol.",
        "backtext": "Roy Fielding stellte das REST-Modell (Representational State Transfer) im Jahr 2000 vor. Es wurde zum universellen Architektur-Paradigma, nach dem heute fast alle Webschnittstellen weltweit Daten austauschen.",
        "backtext_en": "Roy Fielding presented the REST model (Representational State Transfer) in 2000. It became the universal architectural paradigm by which almost all web interfaces worldwide exchange data today.",
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
        "title_en": "The JSON Specification",
        "fronttext": "Ein extrem leichtgewichtiges, auf JavaScript-Objekten basierendes Datenformat tritt an, um das sperrige XML im Datenaustausch über das Internet abzulösen.",
        "fronttext_en": "An extremely lightweight data format based on JavaScript objects sets out to replace bulky XML for data exchange over the internet.",
        "backtext": "Douglas Crockford spezifizierte JSON (JavaScript Object Notation) Anfang der 2000er Jahre. Es entwickelte sich rasch zum De-facto-Standard für REST-APIs und moderne Webanwendungen.",
        "backtext_en": "Douglas Crockford specified JSON (JavaScript Object Notation) in the early 2000s. It quickly became the de facto standard for REST APIs and modern web applications.",
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
        "title_en": "Cloud Computing (AWS)",
        "fronttext": "Die Idee, Rechenpower und Speicherplatz flexibel über das Internet zu mieten, statt eigene Server zu besitzen.",
        "fronttext_en": "The idea of renting computing power and storage flexibly over the internet instead of owning your own servers.",
        "backtext": "Amazon Web Services startete 2006 und veränderte radikal, wie Startups und Firmen Software entwickeln und skalieren.",
        "backtext_en": "Amazon Web Services launched in 2006 and radically changed how start-ups and companies develop and scale software.",
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
        "title_en": "The Bitcoin White Paper",
        "fronttext": "Ein anonymes Genie veröffentlicht ein Konzept für ein dezentrales, kryptographisch abgesichertes Bezahlsystem, das ganz ohne Banken oder staatliche Kontrolle auskommt.",
        "fronttext_en": "An anonymous genius publishes a concept for a decentralised, cryptographically secured payment system that works entirely without banks or state control.",
        "backtext": "Unter dem Pseudonym Satoshi Nakamoto erschien das Paper, das die Blockchain-Technologie und den Proof-of-Work-Konsensmechanismus als Lösung für das Problem der doppelten Geldausgabe (Double-Spending) etablierte.",
        "backtext_en": "Published under the pseudonym Satoshi Nakamoto, the paper established blockchain technology and the proof-of-work consensus mechanism as the solution to the double-spending problem.",
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
        "title_en": "The Fall of Adobe Flash",
        "fronttext": "Ein offener Brief eines einflussreichen Tech-Chefs besiegelt das langsame Ende einer proprietären Web-Technologie für Animationen und interaktive Spiele.",
        "fronttext_en": "An open letter from an influential tech boss seals the slow demise of a proprietary web technology for animations and interactive games.",
        "backtext": "Steve Jobs begründete 2010 in 'Thoughts on Flash', warum das iPhone die Technologie nicht unterstützt (Sicherheit, Akku, Touch). Dies beschleunigte den Siegeszug offener Standards wie HTML5, Canvas und JavaScript.",
        "backtext_en": "In 'Thoughts on Flash' (2010), Steve Jobs explained why the iPhone would not support the technology (security, battery, touch). This accelerated the triumph of open standards such as HTML5, Canvas and JavaScript.",
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
        "title_en": "WebAssembly (Wasm)",
        "fronttext": "Ein neues Binärcode-Format für den Browser wird angekündigt, das die Ausführung von Code (z.B. C++ oder Rust) mit nahezu nativer Geschwindigkeit direkt im Web ermöglicht.",
        "fronttext_en": "A new binary code format for the browser is announced, allowing code (e.g. C++ or Rust) to run directly on the web at near-native speed.",
        "backtext": "2015 gestartet und 2017 veröffentlicht, machte Wasm den Browser zu einer plattformunabhängigen Hochleistungs-Laufzeitumgebung für komplexe Spiele, Editoren und Lernwerkzeuge.",
        "backtext_en": "Started in 2015 and released in 2017, Wasm turned the browser into a platform-independent high-performance runtime for complex games, editors and learning tools.",
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
        "title_en": "Yahoo!",
        "fronttext": "Das erste massenhaft genutzte Webverzeichnis, das das Internet in Kategorien wie 'Sport' oder 'Wissenschaft' ordnete.",
        "fronttext_en": "The first mass-market web directory, organising the internet into categories such as 'Sport' or 'Science'.",
        "backtext": "Gegründet von Jerry Yang und David Filo. Bevor Suchmaschinen intelligent wurden, klickte man sich manuell durch diesen riesigen, von Menschen gepflegten Web-Katalog.",
        "backtext_en": "Founded by Jerry Yang and David Filo. Before search engines became intelligent, people clicked their way through this huge, human-curated web catalogue.",
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
        "title_en": "eBay (AuctionWeb)",
        "fronttext": "Die Plattform, die den Online-Flohmarkt erfand und bewies, dass Menschen im Internet Fremden vertrauen und handeln.",
        "fronttext_en": "The platform that invented the online flea market and proved that people will trust and trade with strangers on the internet.",
        "backtext": "Pierre Omidyar programmierte die Seite. Das erste verkaufte Produkt war ein kaputter Laserpointer – für knapp 14 Dollar an einen Sammler kaputter Laserpointer.",
        "backtext_en": "Pierre Omidyar programmed the site. The first item sold was a broken laser pointer – for almost 14 dollars, to a collector of broken laser pointers.",
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
        "title_en": "The Amazon Online Shop",
        "fronttext": "Jeff Bezos startete dieses Portal in einer Garage als reine Online-Buchhandlung, um die expandierende Internetnutzung auszunutzen.",
        "fronttext_en": "Jeff Bezos launched this portal in a garage as a pure online bookshop, to capitalise on the expanding use of the internet.",
        "backtext": "Das erste verkaufte Buch hieß 'Fluid Concepts and Creative Analogies'. Heute ist aus dem Buchladen das größte E-Commerce-Unternehmen der Welt geworden.",
        "backtext_en": "The first book sold was called 'Fluid Concepts and Creative Analogies'. The bookshop has since become the largest e-commerce company in the world.",
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
        "title_en": "Netflix",
        "fronttext": "Ein Verleihdienst für DVDs per Post wandelt sich radikal und begründet die Ära des modernen On-Demand-Videostreamings.",
        "fronttext_en": "A DVD-by-post rental service radically reinvents itself and founds the era of modern on-demand video streaming.",
        "backtext": "Marc Randolph und Reed Hastings gründeten Netflix zunächst als Abo-Modell ohne Überziehungsgebühren für physische DVDs. 2007 schwenkte die Firma auf digitales Streaming um, veränderte mit dem Konzept des 'Binge-Watchings' das weltweite Mediennutzungsverhalten und zwang traditionelle Videotheken in den Ruin.",
        "backtext_en": "Marc Randolph and Reed Hastings first founded Netflix as a subscription model without late fees for physical DVDs. In 2007 the company switched to digital streaming, changed global media habits with the concept of 'binge-watching' and drove traditional video shops out of business.",
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
        "title_en": "The Founding of Google",
        "fronttext": "Zwei Stanford-Studenten gründen eine Suchmaschinen-Firma, deren Name auf einem mathematischen Tippfehler basiert und die den Informationsfluss des Planeten revolutioniert.",
        "fronttext_en": "Two Stanford students found a search-engine company whose name is based on a mathematical typo – and revolutionise the planet's flow of information.",
        "backtext": "Larry Page und Sergey Brin wollten ihre Firma eigentlich nach der Zahl Googol ($10^{100}$) benennen. Aus der Garage heraus wuchs Google schnell weit über die reine Suche hinaus und wurde durch Android, YouTube, Cloud-Infrastruktur und KI-Forschung zu einem der mächtigsten Tech-Giganten der Welt.",
        "backtext_en": "Larry Page and Sergey Brin actually wanted to name their company after the number googol ($10^{100}$). From its garage beginnings, Google quickly grew far beyond search, becoming one of the world's most powerful tech giants through Android, YouTube, cloud infrastructure and AI research.",
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
        "title_en": "PayPal",
        "fronttext": "Ein Pionier des digitalen Bezahlens revolutioniert den Online-Handel und bringt ein Netzwerk von Gründern hervor, das das Silicon Valley jahrzehntelang prägt.",
        "fronttext_en": "A pioneer of digital payments revolutionises online commerce and produces a network of founders that shapes Silicon Valley for decades.",
        "backtext": "Entstanden aus der Fusion von Confinity (u.a. Max Levchin, Peter Thiel) und X.com (Elon Musk), ermöglichte PayPal einfaches Bezahlen per E-Mail. Nach dem Verkauf an eBay gründeten die Ex-Mitarbeiter Firmen wie YouTube, LinkedIn, Tesla und SpaceX.",
        "backtext_en": "Born from the merger of Confinity (including Max Levchin and Peter Thiel) and X.com (Elon Musk), PayPal made paying by email simple. After the sale to eBay, its ex-employees founded companies such as YouTube, LinkedIn, Tesla and SpaceX.",
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
        "title_en": "Napster",
        "fronttext": "Die erste Musik-Tauschbörse, die die Musikindustrie erschütterte und das Peer-to-Peer-Prinzip (P2P) populär machte.",
        "fronttext_en": "The first music-sharing service, which shook the music industry and popularised the peer-to-peer (P2P) principle.",
        "backtext": "Shawn Fanning und Sean Parker lösten eine Revolution aus, die letztlich zum Siegeszug von Streaming-Diensten wie Spotify führte.",
        "backtext_en": "Shawn Fanning and Sean Parker triggered a revolution that ultimately led to the triumph of streaming services like Spotify.",
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
        "title_en": "Wikipedia",
        "fronttext": "Das Projekt, das gesamte Wissen der Welt in einer von Nutzern bearbeitbaren Online-Enzyklopädie zu sammeln.",
        "fronttext_en": "The project to gather all the world's knowledge in an online encyclopaedia that users can edit.",
        "backtext": "Jimmy Wales und Larry Sanger starteten die Plattform, die das Konzept der 'Crowdsourced Intelligence' bewies.",
        "backtext_en": "Jimmy Wales and Larry Sanger launched the platform, which proved the concept of crowdsourced intelligence.",
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
        "title_en": "Facebook & Social Media",
        "fronttext": "Die Vernetzung von Milliarden Menschen in einem digitalen sozialen Graphen.",
        "fronttext_en": "Connecting billions of people in a digital social graph.",
        "backtext": "Mark Zuckerberg startete 'TheFacebook' an der Harvard University; es veränderte die Art, wie wir kommunizieren und uns informieren.",
        "backtext_en": "Mark Zuckerberg launched 'TheFacebook' at Harvard University; it changed the way we communicate and inform ourselves.",
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
        "title_en": "YouTube",
        "fronttext": "Drei ehemalige PayPal-Mitarbeiter gründeten diese Plattform, um das Teilen von Videos im Netz radikal zu vereinfachen.",
        "fronttext_en": "Three former PayPal employees founded this platform to radically simplify sharing videos online.",
        "backtext": "Das erste Video überhaupt hieß 'Me at the zoo' und zeigt Mitgründer Jawed Karim vor den Elefanten. Google kaufte die Seite nur ein Jahr später für 1,65 Milliarden Dollar.",
        "backtext_en": "The very first video was called 'Me at the zoo' and shows co-founder Jawed Karim in front of the elephants. Google bought the site just one year later for 1.65 billion dollars.",
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
        "title_en": "Twitter (X)",
        "fronttext": "Ein Kurznachrichtendienst, der die weltweite Echtzeit-Kommunikation auf anfangs strikte 140 Zeichen pro Nachricht begrenzte.",
        "fronttext_en": "A short-message service that initially limited worldwide real-time communication to a strict 140 characters per message.",
        "backtext": "Gegründet von Jack Dorsey, Biz Stone und Evan Williams. Es wurde zum zentralen Medium für Journalismus, Politik und digitale Bewegungen (Hashtag-Aktivismus), bevor es 2022 von Elon Musk übernommen und in 'X' umbenannt wurde.",
        "backtext_en": "Founded by Jack Dorsey, Biz Stone and Evan Williams. It became the central medium for journalism, politics and digital movements (hashtag activism), before being taken over by Elon Musk in 2022 and renamed 'X'.",
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
        "title_en": "Stack Overflow",
        "fronttext": "Die wichtigste Frage-und-Antwort-Plattform für Programmierer, die das Nachschlagen in dicken Handbüchern ersetzte.",
        "fronttext_en": "The most important question-and-answer platform for programmers, replacing the need to consult thick manuals.",
        "backtext": "Gegründet von Jeff Atwood und Joel Spolsky. Der Running-Gag der IT-Welt besagt, dass die Hälfte des modernen Softwarecodes per Copy-Paste von hier stammt.",
        "backtext_en": "Founded by Jeff Atwood and Joel Spolsky. The running joke in IT is that half of all modern software code is copy-pasted from here.",
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
        "title_en": "GitHub",
        "fronttext": "Die Plattform, die das Versionskontrollsystem Git ins Web brachte und zum globalen Zentrum für Open-Source-Software wurde.",
        "fronttext_en": "The platform that brought the version control system Git to the web and became the global hub of open-source software.",
        "backtext": "Sie ermöglichte es Entwicklern weltweit, nahtlos an denselben Code-Projekten zu arbeiten, Issues zu tracken und Code-Reviews durchzuführen.",
        "backtext_en": "It enabled developers worldwide to work seamlessly on the same code projects, track issues and carry out code reviews.",
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
        "title_en": "WhatsApp",
        "fronttext": "Der Messenger, der die klassische SMS fast vollständig verdrängte, indem er Nachrichten über das Internet-Datenvolumen verschickte.",
        "fronttext_en": "The messenger that almost completely displaced the classic SMS by sending messages over the internet data connection.",
        "backtext": "Jan Koum und Brian Acton (beide Ex-Yahoo-Mitarbeiter) bauten die App extrem minimalistisch auf. 2014 übernahm Facebook das Unternehmen für die Rekordsumme von 19 Milliarden Dollar.",
        "backtext_en": "Jan Koum and Brian Acton (both ex-Yahoo employees) built the app to be extremely minimalist. In 2014 Facebook bought the company for a record 19 billion dollars.",
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
        "title_en": "Instagram",
        "fronttext": "Die App, die das Teilen von quadratischen Fotos mit Vintage-Filtern zum Lifestyle machte und das moderne 'Influencer'-Zeitalter einläutete.",
        "fronttext_en": "The app that turned sharing square photos with vintage filters into a lifestyle, ushering in the modern 'influencer' age.",
        "backtext": "Kevin Systrom und Mike Krieger bauten die Plattform, die innerhalb kürzester Zeit so rasant wuchs, dass Facebook sie bereits 2012 für 1 Milliarde Dollar aufkaufte.",
        "backtext_en": "Kevin Systrom and Mike Krieger built the platform, which grew so rapidly that Facebook bought it for 1 billion dollars as early as 2012.",
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
        "title_en": "Twitch (Live Streaming)",
        "fronttext": "Eine Plattform für das Live-Streaming von Videospielen revolutioniert die Gaming-Welt und schafft das neue Berufsbild des 'Streamers'.",
        "fronttext_en": "A platform for live-streaming video games revolutionises the gaming world and creates the new profession of 'streamer'.",
        "backtext": "Ursprünglich als Gaming-Ableger der Seite Justin.tv gestartet, wuchs Twitch extrem rasant und verlagerte den Fokus der Gaming-Community vom reinen Konsumieren von aufgezeichneten Videos hin zur Echtzeit-Interaktion via Chat. 2014 wurde die Plattform für knapp 1 Milliarde Dollar von Amazon übernommen.",
        "backtext_en": "Originally launched as the gaming spin-off of the site Justin.tv, Twitch grew at breakneck speed, shifting the gaming community's focus from watching recorded videos to real-time interaction via chat. In 2014 Amazon bought the platform for almost 1 billion dollars.",
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
        "title_en": "Musical.ly, the Forerunner of TikTok",
        "fronttext": "Diese Plattform revolutionierte Kurzvideos mit Musik-Lip-Sync und fusionierte später mit einer chinesischen App zum weltweiten Phänomen.",
        "fronttext_en": "This platform revolutionised short videos with music lip-syncs and later merged with a Chinese app into a worldwide phenomenon.",
        "backtext": "Musical.ly wurde 2014 populär und 2017 vom chinesischen Konzern ByteDance aufgekauft. Durch die Verschmelzung mit der Schwester-App TikTok und den extrem präzisen Empfehlungs-Algorithmus veränderte sich die weltweite Aufmerksamkeitsökonomie radikal.",
        "backtext_en": "Musical.ly became popular in 2014 and was bought by the Chinese company ByteDance in 2017. Its merger with sister app TikTok and the extremely precise recommendation algorithm radically changed the global attention economy.",
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
        "title_en": "The Turing Test",
        "fronttext": "Ein Kriterium zur Feststellung, ob eine Maschine eine dem Menschen gleichwertige Intelligenz besitzt.",
        "fronttext_en": "A criterion for determining whether a machine possesses intelligence equal to a human's.",
        "backtext": "Alan Turing definierte den Test: Wenn ein Mensch in einem Chat nicht mehr unterscheiden kann, ob das Gegenüber ein Mensch oder eine Maschine ist, hat die Maschine den Test bestanden.",
        "backtext_en": "Alan Turing defined the test: if a person chatting can no longer tell whether their counterpart is a human or a machine, the machine has passed.",
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
        "title_en": "The Dartmouth Conference",
        "fronttext": "Das legendäre sommerliche Forschungsprojekt, das offiziell als Geburtsstunde der 'Künstlichen Intelligenz' gilt.",
        "fronttext_en": "The legendary summer research project officially regarded as the birth of 'artificial intelligence'.",
        "backtext": "John McCarthy prägte hier das englische Wort 'Artificial Intelligence' (AI). Die Forscher glaubten optimistisch, das KI-Problem in wenigen Jahren lösen zu können.",
        "backtext_en": "It was here that John McCarthy coined the term 'artificial intelligence' (AI). The researchers optimistically believed they could solve the AI problem within a few years.",
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
        "title_en": "The Perceptron",
        "fronttext": "Das erste mathematische Modell und Hardware-Gerät für ein künstliches Neuron, das lernen konnte, Muster zu klassifizieren.",
        "fronttext_en": "The first mathematical model and hardware device for an artificial neuron that could learn to classify patterns.",
        "backtext": "Frank Rosenblatt erfand es. Als Forscher bewiesen, dass ein einzelnes Perzeptron logische XOR-Verknüpfungen nicht lernen kann, brach die Forschung vorerst ein.",
        "backtext_en": "Frank Rosenblatt invented it. When researchers proved that a single perceptron cannot learn logical XOR operations, the field collapsed for a time.",
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
        "title_en": "ELIZA",
        "fronttext": "Eines der ersten Programme zur Verarbeitung natürlicher Sprache, das einen Psychotherapeuten simulierte.",
        "fronttext_en": "One of the first natural-language-processing programs, simulating a psychotherapist.",
        "backtext": "Joseph Weizenbaum war schockiert, wie sehr Nutzer dem einfachen Programm ('Was lässt Sie glauben, dass...') menschliche Gefühle zusprachen.",
        "backtext_en": "Joseph Weizenbaum was shocked at how readily users attributed human feelings to the simple program ('What makes you believe that...').",
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
        "title_en": "The First 'AI Winter'",
        "fronttext": "Eine Periode, in der staatliche Gelder und das akademische Interesse an KI wegen unerfüllter, übertriebener Versprechen dramatisch einbrachen.",
        "fronttext_en": "A period in which government funding and academic interest in AI collapsed dramatically because of unfulfilled, exaggerated promises.",
        "backtext": "Ausgelöst durch den britischen 'Lighthill-Report'. Es zeigte sich, dass die Rechenleistung der damaligen Computer für komplexe KI-Probleme absolut unzureichend war.",
        "backtext_en": "Triggered by the British 'Lighthill Report'. It became clear that the computing power of the time was utterly insufficient for complex AI problems.",
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
        "title_en": "Expert Systems",
        "fronttext": "Ein riesiger KI-Trend der 1980er Jahre, bei dem das Wissen menschlicher Experten in gigantischen 'Wenn-Dann'-Regelwerken abgebildet wurde.",
        "fronttext_en": "A huge AI trend of the 1980s, in which the knowledge of human experts was captured in gigantic 'if–then' rule bases.",
        "backtext": "Systeme wie MYCIN diagnostizierten Krankheiten. Sie waren jedoch starr, konnten nicht selbstständig lernen und scheiterten bei Ausnahmen.",
        "backtext_en": "Systems like MYCIN diagnosed diseases. But they were rigid, could not learn on their own, and failed on exceptions.",
        "valuetext": "1980er",
        "valuetext_en": "1980s",
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
        "title_en": "The Backpropagation Breakthrough",
        "fronttext": "Die Wiederentdeckung und Popularisierung des mathematischen Verfahrens, mit dem mehrschichtige neuronale Netze Fehler zurückrechnen und effektiv lernen können.",
        "fronttext_en": "The rediscovery and popularisation of the mathematical method by which multi-layer neural networks propagate errors backwards and learn effectively.",
        "backtext": "David Rumelhart, Geoffrey Hinton und Ronald Williams zeigten, dass tiefe Netzwerke dadurch interne Repräsentationen von Daten erlernen können.",
        "backtext_en": "David Rumelhart, Geoffrey Hinton and Ronald Williams showed that deep networks can thereby learn internal representations of data.",
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
        "title_en": "Deep Blue vs. Kasparov",
        "fronttext": "Zum ersten Mal besiegte ein Computer den amtierenden Schachweltmeister unter Turnierbedingungen.",
        "fronttext_en": "For the first time, a computer defeated the reigning world chess champion under tournament conditions.",
        "backtext": "Der IBM-Supercomputer Deep Blue nutzte Brute-Force-Berechnungen und spezialisierte Hardware für seine Züge.",
        "backtext_en": "IBM's supercomputer Deep Blue used brute-force calculation and specialised hardware for its moves.",
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
        "title_en": "ImageNet & Deep Learning",
        "fronttext": "Ein Wettbewerb zur Bilderkennung, der den Durchbruch für künstliche neuronale Netze markierte.",
        "fronttext_en": "An image-recognition competition that marked the breakthrough for artificial neural networks.",
        "backtext": "Geoffrey Hintons Team zeigte 2012 mit 'AlexNet', dass Deep Learning herkömmliche Algorithmen weit übertrifft.",
        "backtext_en": "In 2012, Geoffrey Hinton's team showed with 'AlexNet' that deep learning far outperforms conventional algorithms.",
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
        "title_en": "Generative Adversarial Networks (GANs)",
        "fronttext": "Ein KI-Konzept, bei dem zwei neuronale Netze (ein Fälscher und ein Detektiv) gegeneinander antreten, um fotorealistische Medien zu erzeugen.",
        "fronttext_en": "An AI concept in which two neural networks (a forger and a detective) compete against each other to produce photorealistic media.",
        "backtext": "Ian Goodfellow erfand GANs. Der Generator erzeugt Bilder, der Diskriminator bewertet sie. Dieses Duell führte zur Explosion von Deepfakes.",
        "backtext_en": "Ian Goodfellow invented GANs. The generator creates images, the discriminator judges them. This duel led to the explosion of deepfakes.",
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
        "title_en": "AlphaGo",
        "fronttext": "Die KI, die den weltbesten Spieler im Brettspiel Go besiegte – eine Aufgabe, die als weitaus komplexer als Schach galt.",
        "fronttext_en": "The AI that defeated the world's best player at the board game Go – a task considered far more complex than chess.",
        "backtext": "DeepMind (Google) nutzte Reinforcement Learning und neuronale Netze, um Strategien zu erlernen, die Menschen nie zuvor gesehen hatten.",
        "backtext_en": "DeepMind (Google) used reinforcement learning and neural networks to learn strategies no human had ever seen.",
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
        "title_en": "The Transformer Architecture",
        "fronttext": "Das neuronale Netzwerkmodell, das durch den Mechanismus der 'Attention' die Verarbeitung von Sprache revolutionierte.",
        "fronttext_en": "The neural network model that revolutionised language processing through the 'attention' mechanism.",
        "backtext": "Das Paper 'Attention Is All You Need' von Google-Forschern legte die Basis für alle modernen Sprachmodelle wie GPT.",
        "backtext_en": "The paper 'Attention Is All You Need' by Google researchers laid the foundation for all modern language models such as GPT.",
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
        "title_en": "AlphaFold",
        "fronttext": "DeepMinds KI-System, das eines der größten Rätsel der Biologie löste: Die exakte Vorhersage, wie sich Proteine dreidimensional falten.",
        "fronttext_en": "DeepMind's AI system solved one of biology's greatest riddles: precisely predicting how proteins fold in three dimensions.",
        "backtext": "Das System berechnete die Struktur von fast allen 200 Millionen bekannten Proteinen der Wissenschaft – eine Aufgabe, die zuvor Jahrzehnte Laborarbeit pro Protein erfordert hätte.",
        "backtext_en": "The system computed the structure of almost all 200 million proteins known to science – a task that would previously have required decades of lab work per protein.",
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
        "title_en": "ChatGPT & Large Language Models (LLMs)",
        "fronttext": "KI-Systeme, die menschenähnliche Texte generieren, programmieren und komplexe Fragen beantworten können.",
        "fronttext_en": "AI systems that can generate human-like text, write code and answer complex questions.",
        "backtext": "Die Veröffentlichung von ChatGPT Ende 2022 machte generative KI erstmals für die breite Öffentlichkeit direkt nutzbar.",
        "backtext_en": "The release of ChatGPT at the end of 2022 made generative AI directly usable by the general public for the first time.",
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
        "title_en": "Stable Diffusion",
        "fronttext": "Ein Open-Source-Modell für generative KI, das aus Textbeschreibungen hochdetaillierte Bilder erstellt.",
        "fronttext_en": "An open-source model for generative AI that creates highly detailed images from text descriptions.",
        "backtext": "Es demokratisierte den Zugang zu mächtiger Bild-KI und löste hitzige Debatten über Urheberrecht und Kunst aus.",
        "backtext_en": "It democratised access to powerful image AI and sparked heated debates about copyright and art.",
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
        "title_en": "The First Graphical Game",
        "fronttext": "Einer der ersten einsatzfähigen Computer EDSAC mit elektronischem Speicher führt ein Tic-Tac-Toe-Spiel aus, dessen Spielfeld visuell auf einer Kathodenstrahlröhre angezeigt wird.",
        "fronttext_en": "EDSAC, one of the first operational computers with electronic memory, runs a tic-tac-toe game whose board is displayed visually on a cathode-ray tube.",
        "backtext": "Der EDSAC-Computer lief 1949 an der Universität Cambridge an. 1952 programmierte Alexander S. Douglas darauf 'OXO' – das historisch erste dokumentierte digitale Spiel mit einer grafischen Bildschirmausgabe.",
        "backtext_en": "The EDSAC computer went into operation at the University of Cambridge in 1949. In 1952 Alexander S. Douglas programmed 'OXO' on it – historically the first documented digital game with graphical screen output.",
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
        "title_en": "Spacewar!",
        "fronttext": "Eines der ersten digitalen Videospiele überhaupt, entwickelt auf einem PDP-1 Mainframe.",
        "fronttext_en": "One of the very first digital video games, developed on a PDP-1 mainframe.",
        "backtext": "Hacker am MIT nutzten den Rechner nachts, um zwei Raumschiffe gegeneinander kämpfen zu lassen – der Urvater der Gaming-Industrie.",
        "backtext_en": "Hackers at MIT used the machine at night to pit two spaceships against each other – the ancestor of the gaming industry.",
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
        "title_en": "Pong",
        "fronttext": "Das erste weltweit erfolgreiche Videospiel, das die Geburtsstunde der Gaming-Industrie markierte.",
        "fronttext_en": "The first globally successful video game, marking the birth of the gaming industry.",
        "backtext": "Atari-Gründer Nolan Bushnell ließ das Spiel von Allan Alcorn entwickeln; es war so simpel, dass keine Anleitung nötig war.",
        "backtext_en": "Atari founder Nolan Bushnell had Allan Alcorn develop the game; it was so simple that no instructions were needed.",
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
        "title_en": "The Atari 2600",
        "fronttext": "Die Konsole, die das Prinzip austauschbarer Spielemodule (Cartridges) im Massenmarkt etabliert und das Videospiel fest in den Wohnzimmern verankert.",
        "fronttext_en": "The console that established the principle of interchangeable game cartridges in the mass market, planting video games firmly in living rooms.",
        "backtext": "Ursprünglich als 'Atari VCS' erschienen, löste das Gerät den ersten großen Videospiel-Boom aus. Durch die Flut an minderwertiger Software von Drittherstellern (symbolisiert durch das berüchtigte 'E.T.'-Spiel) wurde die Konsole 1983 aber auch zum Hauptauslöser des großen Video Game Crashs.",
        "backtext_en": "Originally released as the 'Atari VCS', the device set off the first great video-game boom. But the flood of shoddy third-party software (symbolised by the infamous 'E.T.' game) also made the console the main trigger of the great video game crash of 1983.",
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
        "title_en": "The Nintendo Entertainment System (NES)",
        "fronttext": "Die graue 8-Bit-Heimkonsole rettet die gesamte nordamerikanische Videospielindustrie im Alleingang aus den Trümmern des großen Crashs von 1983.",
        "fronttext_en": "The grey 8-bit home console single-handedly rescues the entire North American video-game industry from the rubble of the great crash of 1983.",
        "backtext": "In Japan als 'Famicom' gestartet, etablierte das NES strenge Qualitätskontrollen für Dritthersteller (das 'Official Nintendo Seal of Quality') und schenkte der Welt fundamentale Popkultur-Ikonen wie *Super Mario Bros.* und *The Legend of Zelda*.",
        "backtext_en": "Launched in Japan as the 'Famicom', the NES established strict quality controls for third-party developers (the 'Official Nintendo Seal of Quality') and gave the world fundamental pop-culture icons such as *Super Mario Bros.* and *The Legend of Zelda*.",
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
        "title_en": "Tetris",
        "fronttext": "Das wohl bekannteste Puzzlespiel der Welt, entwickelt von einem sowjetischen Programmierer.",
        "fronttext_en": "Probably the best-known puzzle game in the world, developed by a Soviet programmer.",
        "backtext": "Alexei Paschitnow programmierte es auf einer Electronika 60. Es wurde zum später nochmal zum Welterfolg auf dem Nintendo Game Boy.",
        "backtext_en": "Alexey Pajitnov programmed it on an Electronika 60. It later became a worldwide success all over again on the Nintendo Game Boy.",
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
        "title_en": "The Commodore Amiga 500",
        "fronttext": "Ein legendärer 16-Bit-Heimcomputer revolutioniert durch seine überlegenen Custom-Chips für Grafik und Sound die Gaming- und Demoszene.",
        "fronttext_en": "A legendary 16-bit home computer revolutionises the gaming and demo scene with its superior custom chips for graphics and sound.",
        "backtext": "Der A500 wurde zum meistverkauften Modell der Amiga-Reihe. Mit dem Motorola-68000-Prozessor und bahnbrechenden Multimedia-Fähigkeiten degradierte er damalige PCs zu reinen Bürogeräten und prägte die europäische Gaming-Kultur der späten 1980er Jahre.",
        "backtext_en": "The A500 became the best-selling model of the Amiga line. With its Motorola 68000 processor and groundbreaking multimedia capabilities, it made the PCs of the day look like mere office machines and shaped European gaming culture of the late 1980s.",
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
        "title_en": "The Nintendo Game Boy",
        "fronttext": "Eine klobige, grau-grüne Handheld-Konsole erobert trotz veralteter Monochrom-Grafik dank enormer Batterielaufzeit und eines Puzzle-Klassikers die Welt.",
        "fronttext_en": "A chunky, grey-green handheld console conquers the world despite outdated monochrome graphics, thanks to enormous battery life and a classic puzzle game.",
        "backtext": "Von Gunpei Yokoi entwickelt, setzte sich der Game Boy gegen technisch überlegene, farbige Konkurrenten (wie den Atari Lynx) durch. Das Erfolgsgeheimnis lag im geringen Preis, der unzerstörbaren Bauweise und der genialen Entscheidung, die Konsole im Bundle mit 'Tetris' auszuliefern.",
        "backtext_en": "Developed by Gunpei Yokoi, the Game Boy prevailed over technically superior, colour rivals (such as the Atari Lynx). The secret of its success lay in the low price, the indestructible build and the ingenious decision to bundle the console with 'Tetris'.",
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
        "title_en": "Doom",
        "fronttext": "Der Ego-Shooter, der 3D-Grafik auf PCs revolutionierte und das Genre der 'First-Person-Shooter' definierte.",
        "fronttext_en": "The shooter that revolutionised 3D graphics on PCs and defined the 'first-person shooter' genre.",
        "backtext": "id Software nutzte bahnbrechende Techniken wie 'Binary Space Partitioning', um flüssige Grafik auf damaliger Hardware zu ermöglichen.",
        "backtext_en": "id Software used groundbreaking techniques such as binary space partitioning to achieve smooth graphics on the hardware of the day.",
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
        "title_en": "The Sony PlayStation (PS1)",
        "fronttext": "Ein Elektronikriese steigt nach einem geplatzten Abkommen mit Nintendo in den Konsolenmarkt ein und bricht das traditionelle Modul-Monopol durch den Einsatz von CD-ROMs.",
        "fronttext_en": "After a deal with Nintendo falls through, an electronics giant enters the console market and breaks the traditional cartridge monopoly by using CD-ROMs.",
        "backtext": "Unter Ken Kutaragi entwickelte Sony eine reine 3D-Polygon-Maschine. Die billige Produktion von CDs erlaubte es Entwicklern, riesige Welten mit Zwischensequenzen und CD-Audio zu erschaffen. Ihr Nachfolger PS2 ist bis heute die meistverkaufte Konsole aller Zeiten.",
        "backtext_en": "Under Ken Kutaragi, Sony developed a pure 3D polygon machine. Cheap CD production allowed developers to create huge worlds with cutscenes and CD audio. Its successor, the PS2, remains the best-selling console of all time.",
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
        "title_en": "Pokémon (Red & Blue Editions)",
        "fronttext": "Zwei Editionen eines bahnbrechenden Rollenspiels erobern den Game Boy und lösen über das Tauschen von Monstern eine globale Popkultur-Welle aus.",
        "fronttext_en": "Two editions of a groundbreaking role-playing game conquer the Game Boy and, through monster trading, trigger a global pop-culture wave.",
        "backtext": "Von Satoshi Tajiri und seiner Firma Game Freak entwickelt, startete das Phänomen in Japan als 'Rot & Grün'. Das clevere Konzept, bestimmte Taschenmonster nur in einer Edition fangbar zu machen, zwang Spieler dazu, sich über das Link-Kabel physisch zu vernetzen, und rettete Nintendos alternden Handheld.",
        "backtext_en": "Developed by Satoshi Tajiri and his company Game Freak, the phenomenon started in Japan as 'Red & Green'. The clever idea of making certain pocket monsters catchable in only one edition forced players to physically connect via link cable – and saved Nintendo's ageing handheld.",
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
        "title_en": "The Nintendo 64 (N64)",
        "fronttext": "Eine extrem leistungsfähige Konsole definiert das Gameplay in drei Dimensionen völlig neu und führt den analogen Daumen-Stick als Standard ein.",
        "fronttext_en": "An extremely powerful console completely redefines gameplay in three dimensions and introduces the analogue thumb stick as standard.",
        "backtext": "Während die Konkurrenz bereits auf billige CD-ROMs setzte, blieb Nintendo starrsinnig bei den teuren Modulen (Cartridges). Das N64 glänzte dennoch durch wegweisende Meisterwerke wie *Super Mario 64* und *Ocarina of Time*, die zeigten, wie Kamerasteuerung und Bewegung in einer echten 3D-Welt funktionieren müssen.",
        "backtext_en": "While the competition had already switched to cheap CD-ROMs, Nintendo stubbornly stuck with expensive cartridges. The N64 nevertheless shone with pioneering masterpieces such as *Super Mario 64* and *Ocarina of Time*, which showed how camera control and movement must work in a true 3D world.",
        "valuetext": "1996",
        "startvalue": 1996,
        "endvalue": 1996,
        "tags": ["Hardware", "Gaming", "Grafik", "!wichtig"],
        "furtherInformation": []
    },
    {
        "title": "Sega Dreamcast",
        "title_en": "The Sega Dreamcast",
        "fronttext": "Die letzte Heimkonsole eines traditionsreichen Herstellers führt Online-Gaming via integriertem Modem ein, scheitert jedoch trotz Kultstatus am Markt.",
        "fronttext_en": "The last home console of a storied manufacturer introduces online gaming via a built-in modem, but fails in the market despite cult status.",
        "backtext": "Die Dreamcast war ihrer Zeit voraus und bot als erste Konsole der sechsten Generation echtes Internet-Surfen und Online-Multiplayer ab Werk. Sie unterlag jedoch im Marketing-Krieg gegen Sonys PlayStation 2 und zwang Sega dazu, sich komplett aus dem Hardware-Geschäft zurückzuziehen.",
        "backtext_en": "The Dreamcast was ahead of its time, the first sixth-generation console to offer real web browsing and online multiplayer out of the box. Yet it lost the marketing war against Sony's PlayStation 2, forcing Sega to withdraw from the hardware business entirely.",
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
        "title_en": "The Nintendo Game Boy Color",
        "fronttext": "Der langersehnte Nachfolger des grauen Handheld-Klassikers bringt endlich Farbe ins mobile Spiel, ohne dabei die Abwärtskompatibilität zu opfern.",
        "fronttext_en": "The long-awaited successor to the grey handheld classic finally brings colour to mobile gaming – without sacrificing backwards compatibility.",
        "backtext": "Ausgestattet mit einem doppelt so schnellen Prozessor und einem Display, das bis zu 56 Farben gleichzeitig darstellen konnte, befeuerte der Game Boy Color die weltweite Pokémon-Manie. Ein genialer Schachzug war, dass alte, schwarz-weiße Module auf dem neuen Gerät automatisch eingefärbt wurden.",
        "backtext_en": "Equipped with a processor twice as fast and a display showing up to 56 colours at once, the Game Boy Color fuelled the worldwide Pokémon mania. A stroke of genius: old black-and-white cartridges were automatically colourised on the new device.",
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
        "title_en": "Steam (the Platform)",
        "fronttext": "Ein Spieleentwickler startet eine Plattform für automatische Software-Updates, die sich zum unangefochtenen Giganten des rein digitalen Spielevertriebs entwickelt.",
        "fronttext_en": "A game developer launches a platform for automatic software updates that grows into the undisputed giant of purely digital game distribution.",
        "backtext": "Valve führte Steam ein, um Patches für *Counter-Strike* zu verteilen. Anfangs von Spielern wegen des Online-Zwangs gehasst, revolutionierte die Plattform den PC-Spielemarkt grundlegend und machte physische Spieleboxen im Handel nahezu bedeutungslos.",
        "backtext_en": "Valve introduced Steam to distribute patches for *Counter-Strike*. Initially hated by players for its online requirement, the platform fundamentally revolutionised the PC games market and made boxed games in shops almost irrelevant.",
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
        "title_en": "The Nintendo Wii",
        "fronttext": "Ein weißer Kasten verzichtet bewusst auf das Wettrüsten um hochauflösende Grafik und erobert den Weltmarkt stattdessen im Sturm über eine intuitive Bewegungssteuerung.",
        "fronttext_en": "A white box deliberately opts out of the arms race for high-resolution graphics and instead takes the world market by storm with intuitive motion controls.",
        "backtext": "Unter dem Codenamen 'Revolution' entwickelt, sprach die Wii dank der Wii-Fernbedienung (Wiimote) und einfacher Bewegungssensoren völlig neue Zielgruppen wie Senioren und Gelegenheitsspieler an. Mit über 100 Millionen verkauften Einheiten wurde sie zu einem der größten kommerziellen Phänomene der Tech-Geschichte.",
        "backtext_en": "Developed under the codename 'Revolution', the Wii reached entirely new audiences – senior citizens and casual players – thanks to the Wii Remote (Wiimote) and simple motion sensors. With over 100 million units sold, it became one of the greatest commercial phenomena in tech history.",
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
        "title_en": "The Nintendo 3DS",
        "fronttext": "Ein mobiler Doppelbildschirm-Handheld bringt echten, räumlichen Tiefeneffekt (3D) in die Hosentasche – und das völlig ohne Spezialbrille.",
        "fronttext_en": "A dual-screen mobile handheld puts a real sense of spatial depth (3D) in your pocket – with no special glasses required.",
        "backtext": "Der Nachfolger des extrem erfolgreichen Nintendo DS nutzte ein autostereoskopisches Display (Parallaxbarriere), um die Illusion von Tiefe zu erzeugen. Trotz eines holprigen Starts entwickelte sich der 3DS dank starker Software-Bibliothek zu einem langlebigen Eckpfeiler des portablen Spielens.",
        "backtext_en": "The successor to the hugely successful Nintendo DS used an autostereoscopic display (parallax barrier) to create the illusion of depth. Despite a bumpy launch, the 3DS became a long-lived cornerstone of portable gaming thanks to a strong software library.",
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
        "title_en": "Pokémon GO",
        "fronttext": "Eine Mobile-App verbindet die reale Welt über Satellitennavigation mit virtuellen Monstern und löst einen beispiellosen Augmented-Reality-Hype aus.",
        "fronttext_en": "A mobile app links the real world with virtual monsters via satellite navigation, triggering an unprecedented augmented-reality craze.",
        "backtext": "Von Niantic in Kooperation mit Nintendo entwickelt, lockte das Spiel im Sommer 2016 Millionen Menschen auf die Straßen, um Parks, Plätze und Sehenswürdigkeiten (PokéStops) zu belagern. Es markierte den endgültigen Durchbruch von standortbasierten AR-Anwendungen im weltweiten Massenmarkt.",
        "backtext_en": "Developed by Niantic in cooperation with Nintendo, the game drew millions of people onto the streets in the summer of 2016 to besiege parks, squares and landmarks (PokéStops). It marked the definitive breakthrough of location-based AR applications in the global mass market.",
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
        "title_en": "The Nintendo Switch",
        "fronttext": "Nach einem schweren Flop mit dem Vorgängersystem gelingt die perfekte Fusion aus stationärer Wohnzimmer-Konsole und portablem Handheld.",
        "fronttext_en": "After a painful flop with its predecessor, the perfect fusion of living-room console and portable handheld succeeds.",
        "backtext": "Die Switch löste das Konzept der klassischen Hardware-Trennung auf: Über eine simple Docking-Station wechselt das Bild nahtlos zwischen Fernseher und dem integrierten 6,2-Zoll-Bildschirm. Mit ihren abnehmbaren 'Joy-Con'-Controllern traf sie den Nerv der Zeit und stieg in die Top 3 der meistverkauften Konsolen aller Zeiten auf.",
        "backtext_en": "The Switch dissolved the classic hardware divide: via a simple docking station, the picture moves seamlessly between the TV and the built-in 6.2-inch screen. With its detachable 'Joy-Con' controllers it captured the spirit of the times and rose into the top 3 best-selling consoles of all time.",
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
        "title_en": "Birth of John von Neumann",
        "fronttext": "Geburtsjahr des mathematischen Universalgenies, dessen Name bis heute untrennbar mit der Hardware-Grundarchitektur fast aller Computer verbunden ist.",
        "fronttext_en": "Birth year of the mathematical polymath whose name remains inseparable from the basic hardware architecture of almost every computer.",
        "backtext": "Der in Budapest geborene Wissenschaftler beschrieb das Prinzip, Programmbefehle und Daten im selben Speicher abzulegen. Dies machte feste, unflexible Schaltungen überflüssig.",
        "backtext_en": "Born in Budapest, the scientist described the principle of storing program instructions and data in the same memory. This made fixed, inflexible circuitry obsolete.",
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
        "title_en": "Birth of Grace Hopper",
        "fronttext": "Geburtsjahr der 'Amazing Grace' – US-Marine-Admiralin, Compiler-Erfinderin und unermüdliche Wegbereiterin verständlicher Programmiersprachen.",
        "fronttext_en": "Birth year of 'Amazing Grace' – US Navy admiral, inventor of the compiler and tireless champion of understandable programming languages.",
        "backtext": "Grace Hopper wurde in New York geboren. Sie überzeugte die Fachwelt davon, dass Computer über englische Textbefehle statt über reine Binärcodes oder mathematische Symbole gesteuert werden sollten.",
        "backtext_en": "Grace Hopper was born in New York. She convinced the profession that computers should be controlled with English text commands rather than pure binary codes or mathematical symbols.",
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
        "title_en": "Konrad Zuse",
        "fronttext": "Geburtsjahr des deutschen Erfinders, der in den 1930er Jahren im elterlichen Wohnzimmer den ersten vollautomatischen, programmierbaren Computer der Welt baute.",
        "fronttext_en": "Birth year of the German inventor who, in the 1930s, built the world's first fully automatic programmable computer in his parents' living room.",
        "backtext": "Zuse wurde in Berlin geboren. Seine Z3 (1941) arbeitete im Gegensatz zu amerikanischen Entwicklungen der Zeit bereits konsequent mit dem dualen (binären) Zahlensystem.",
        "backtext_en": "Zuse was born in Berlin. Unlike the American developments of the time, his Z3 (1941) already worked consistently with the binary number system.",
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
        "title_en": "Alan Turing",
        "fronttext": "Geburtsjahr des britischen Genies, das die theoretischen Fundamente der Informatik goss, die Enigma knackte und den Turing-Test erfand.",
        "fronttext_en": "Birth year of the British genius who poured the theoretical foundations of computer science, cracked the Enigma and invented the Turing test.",
        "backtext": "Alan Turing wurde in London geboren. Seine Definition von universeller Berechenbarkeit bildet das logische Gerüst, auf dem jeder Softwarecode bis heute basiert.",
        "backtext_en": "Alan Turing was born in London. His definition of universal computability forms the logical scaffolding on which all software code rests to this day.",
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
        "title_en": "Hedy Lamarr",
        "fronttext": "Geburtsjahr einer berühmten Hollywood-Schauspielerin, welche die technologische Basis für heutiges WLAN, Bluetooth und GPS erfand.",
        "fronttext_en": "Birth year of a famous Hollywood actress who invented the technological basis of today's Wi-Fi, Bluetooth and GPS.",
        "backtext": "Sie entwickelte im Zweiten Weltkrieg ein störungssicheres Funkfernsteuerungssystem für Torpedos, das auf automatischen Frequenzwechseln basierte.",
        "backtext_en": "During the Second World War she developed a jam-proof radio control system for torpedoes based on automatic frequency hopping.",
        "valuetext": "1914",
        "startvalue": 1914,
        "endvalue": 1914,
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
        "title_en": "Tim Berners-Lee",
        "fronttext": "Geburtsjahr des Mannes, der das World Wide Web am CERN erfand und es als kostenloses Geschenk bedingungslos an die Menschheit übergab.",
        "fronttext_en": "Birth year of the man who invented the World Wide Web at CERN and handed it to humanity unconditionally, as a free gift.",
        "backtext": "Der britische Physiker und Informatiker weigerte sich, seine Erfindungen (HTML, HTTP, URL) zu patentieren, da er überzeugt war, dass das Web offen zugänglich sein müsse.",
        "backtext_en": "The British physicist and computer scientist refused to patent his inventions (HTML, HTTP, URL), convinced that the web had to be openly accessible.",
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
        "title_en": "Donald Knuth",
        "fronttext": "Geburtsjahr des Autors von 'The Art of Computer Programming' und Schöpfer des mathematischen Textsatzsystems TeX.",
        "fronttext_en": "Birth year of the author of 'The Art of Computer Programming' and creator of the mathematical typesetting system TeX.",
        "backtext": "Knuth gilt als Urvater der Algorithmenanalyse. Er weigerte sich jahrzehntelang, eine E-Mail-Adresse zu nutzen, um ungestört arbeiten zu können.",
        "backtext_en": "Knuth is regarded as the father of algorithm analysis. For decades he refused to use an email address so he could work undisturbed.",
        "valuetext": "1938",
        "startvalue": 1938,
        "endvalue": 1938,
        "tags": [
            "Person",
            "Theorie",
            "Mathematik"
        ],
        "furtherInformation": []
    },
    {
        "title": "Margaret Hamilton",
        "title_en": "Margaret Hamilton",
        "fronttext": "Geburtsjahr der Direktorin für Software-Entwicklung, deren Code die Mondlandung der Apollo-11-Mission rettete.",
        "fronttext_en": "Birth year of the director of software engineering whose code saved the Moon landing of the Apollo 11 mission.",
        "backtext": "Sie prägte den Begriff 'Software Engineering'. Ihr asynchroner Code verhinderte den Abbruch der Mondlandung, als das Radar den Computer überlastete.",
        "backtext_en": "She coined the term 'software engineering'. Her asynchronous code prevented the landing from being aborted when the radar overloaded the computer.",
        "valuetext": "1936",
        "startvalue": 1936,
        "endvalue": 1936,
        "tags": [
            "Person",
            "Software",
            "Frauen",
            "Pionier"
        ],
        "furtherInformation": [
            "<a href='https://detektor.fm/wissen/geschichten-aus-der-mathematik-margaret-hamilton' target='_blank'>Podcast: <em>Geschichten aus der Mathematik</em> | Margaret Hamilton: Die Rettung der Mondlandung</a>",
        ],
        "furtherInformation_en": [
            "<a href='https://detektor.fm/wissen/geschichten-aus-der-mathematik-margaret-hamilton' target='_blank'>Podcast (German): <em>Geschichten aus der Mathematik</em> | Margaret Hamilton: Die Rettung der Mondlandung</a>"
        ]
    },
    // {
    //     "title": "Barbara Liskov",
    //     "fronttext": "Geburtsjahr einer der ersten Frauen, die in den USA in Informatik promovierten, berühmt für ihre Beiträge zur objektorientierten Programmierung.",
    //     "backtext": "Sie entwickelte das 'Liskovsche Substitutionsprinzip' (das 'L' in den SOLID-Prinzipien), ein Grundpfeiler des modernen Software-Designs.",
    //     "valuetext": "1987",
    //     "startvalue": 1987,
    //     "endvalue": 1987,
    //     "tags": [
    //         "Person",
    //         "Theorie",
    //         "Frauen"
    //     ],
    //     "furtherInformation": []
    // },
    {
        "title": "Linus Torvalds",
        "title_en": "Linus Torvalds",
        "fronttext": "Geburtsjahr des Schöpfers von Linux und Git, der für seine kompromisslose Haltung zur Code-Qualität weltbekannt ist.",
        "fronttext_en": "Birth year of the creator of Linux and Git, world-famous for his uncompromising stance on code quality.",
        "backtext": "Obwohl er zwei der wichtigsten Technologien der modernen Welt erfunden hat, stellt er seine Projekte konsequent unter freie Open-Source-Lizenzen.",
        "backtext_en": "Although he invented two of the most important technologies of the modern world, he consistently places his projects under free open-source licences.",
        "valuetext": "1969",
        "startvalue": 1969,
        "endvalue": 1969,
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
        "title_en": "The Software Crisis",
        "fronttext": "Projekte versinken im Chaos: Software wird zu komplex, sprengt Budgets, verspätet sich chronisch und ist voller Fehler. Eine Konferenz sucht dringend nach Auswegen.",
        "fronttext_en": "Projects sink into chaos: software becomes too complex, blows budgets, is chronically late and full of errors. A conference urgently seeks a way out.",
        "backtext": "Der Begriff wurde 1968 auf einer historischen NATO-Konferenz geprägt. Die Krise markiert die Geburtsstunde des 'Software Engineering' – dem Versuch, die Softwareentwicklung von einer handwerklichen Kunst in eine strukturierte Ingenieursdisziplin zu überführen.",
        "backtext_en": "The term was coined at a historic NATO conference in 1968. The crisis marks the birth of 'software engineering' – the attempt to turn software development from a craft into a structured engineering discipline.",
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
        "title_en": "The Ariane 5 Software Error",
        "fronttext": "Nur 37 Sekunden nach dem Start explodiert eine hunderte Millionen Dollar teure europäische Trägerrakete aufgrund eines Fehlers im Leitsystem.",
        "fronttext_en": "Just 37 seconds after lift-off, a European launch vehicle worth hundreds of millions of dollars explodes because of an error in its guidance system.",
        "backtext": "Die Ursache war ein klassischer Integer-Overflow: Das System versuchte, eine 64-Bit-Gleitkommazahl in eine vorzeichenbehaftete 16-Bit-Ganzzahl umzuwandeln. Der Wert war zu groß, die Software stürzte ab, woraufhin die Rakete vom Kurs abkam und sich selbst zerstörte.",
        "backtext_en": "The cause was a classic integer overflow: the system tried to convert a 64-bit floating-point number into a signed 16-bit integer. The value was too large, the software crashed, the rocket veered off course and self-destructed.",
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
        "title_en": "The Millennium Bug (Y2K)",
        "fronttext": "Die Angst, dass Computer am 1.1.2000 abstürzen, weil sie Jahre nur zweistellig speicherten.",
        "fronttext_en": "The fear that computers would crash on 1 January 2000 because they stored years with only two digits.",
        "backtext": "Dank massiver Anstrengungen von Informatikern weltweit blieben die großen Katastrophen aus.",
        "backtext_en": "Thanks to massive efforts by computer scientists worldwide, the great catastrophes never materialised.",
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
        "title_en": "The Bursting of the Dotcom Bubble",
        "fronttext": "Blinde Euphorie um das junge Internet führt zu astronomischen Börsenbewertungen von Firmen ohne tragfähiges Geschäftsmodell – bis die Realität zuschlägt.",
        "fronttext_en": "Blind euphoria about the young internet leads to astronomical stock valuations of companies without viable business models – until reality strikes.",
        "backtext": "Im Frühjahr 2000 platzte die Spekulationsblase der Technologieaktien. Unzählige Internet-Startups gingen pleite und Milliarden an Börsenwert verpufften. Dennoch überlebten die stärksten Akteure und legten das Fundament für das Web 2.0.",
        "backtext_en": "In spring 2000 the tech-stock bubble burst. Countless internet start-ups went bankrupt and billions in market value evaporated. Yet the strongest players survived and laid the foundation for Web 2.0.",
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
        "title_en": "The CrowdStrike Outage",
        "fronttext": "Ein fehlerhaftes Update eines IT-Sicherheitsanbieters führt weltweit zum gleichzeitigen Absturz von Millionen Windows-Rechnern und legt globale Infrastrukturen lahm.",
        "fronttext_en": "A faulty update from an IT security provider crashes millions of Windows machines around the world simultaneously, paralysing global infrastructure.",
        "backtext": "Im Juli 2024 verursachte ein fehlerhaftes Konfigurations-Update im 'Falcon'-Sensor von CrowdStrike weltweite Blue Screens (BSOD) an Flughäfen, in Banken und Krankenhäusern. Es gilt als einer der größten IT-Ausfälle der Geschichte.",
        "backtext_en": "In July 2024, a faulty configuration update in CrowdStrike's 'Falcon' sensor caused worldwide blue screens (BSOD) at airports, banks and hospitals. It is considered one of the largest IT outages in history.",
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
        "title_en": "The Year 2038 Problem (Y2K38)",
        "fronttext": "Die digitale Apokalypse der älteren Systeme: Wenn die gezählten Sekunden seit 1970 den maximalen Wert eines vorzeichenbehafteten 32-Bit-Integers überschreiten.",
        "fronttext_en": "The digital apocalypse of older systems: when the seconds counted since 1970 exceed the maximum value of a signed 32-bit integer.",
        "backtext": "Am 19. Januar 2038 läuft die klassische 32-Bit-Unix-Zeit über und springt ins Negative (zum Jahr 1901). Systeme, die bis dahin nicht auf 64-Bit-Zeitstempel umgestellt sind, erleiden unvorhersehbare Software-Abstürze.",
        "backtext_en": "On 19 January 2038, classic 32-bit Unix time overflows and jumps negative (to the year 1901). Systems not converted to 64-bit timestamps by then will suffer unpredictable software crashes.",
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
        "title_en": "The 'Five Computers' Quote",
        "fronttext": "Ein berühmtes, historisch umstrittenes Fehlurteil eines IBM-Chefs, der den weltweiten Marktbedarf an Computern drastisch unterschätzte.",
        "fronttext_en": "A famous, historically disputed misjudgement by an IBM boss who drastically underestimated worldwide demand for computers.",
        "backtext": "Thomas J. Watson wird der Satz aus dem Jahr 1943 zugeschrieben: 'Ich glaube, es gibt einen Weltmarkt für vielleicht fünf Computer.' Im Zeitalter von Milliarden Smartphones ein herrlicher Irrtum.",
        "backtext_en": "Thomas J. Watson is credited with the 1943 sentence: 'I think there is a world market for maybe five computers.' In the age of billions of smartphones, a glorious error.",
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
        "title_en": "The First Bug",
        "fronttext": "Eine echte Motte im Relais eines Computers führte zur Prägung eines berühmten Informatik-Begriffs.",
        "fronttext_en": "A real moth in a computer relay led to the coining of a famous computer science term.",
        "backtext": "Grace Hopper fand die Motte im Mark II Computer und klebte sie in das Logbuch: 'First actual case of bug being found.'",
        "backtext_en": "Grace Hopper found the moth in the Mark II computer and taped it into the logbook: 'First actual case of bug being found.'",
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
        "title_en": "Amdahl's Law",
        "fronttext": "Das mathematische Gesetz, das zeigt, dass man ein Programm nicht unendlich beschleunigen kann, indem man einfach immer mehr CPU-Kerne nutzt.",
        "fronttext_en": "The mathematical law showing that you cannot speed up a program indefinitely just by using ever more CPU cores.",
        "backtext": "Gene Amdahl wies nach, dass die maximale Beschleunigung (Speedup) durch parallele Systeme immer durch den sequentiellen (nicht parallelisierbaren) Teil des Algorithmus strikt begrenzt wird.",
        "backtext_en": "Gene Amdahl proved that the maximum speed-up from parallel systems is always strictly limited by the sequential (non-parallelisable) part of the algorithm.",
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
        "title_en": "Brooks's Law",
        "fronttext": "Die fundamentale Weisheit des IT-Projektmanagements: 'Ein spätes Softwareprojekt mit mehr Personal auszustatten, macht es nur noch später.'",
        "fronttext_en": "The fundamental wisdom of IT project management: 'Adding manpower to a late software project makes it later.'",
        "backtext": "Fred Brooks beschrieb in seinem Buch, dass neue Entwickler erhebliche Einarbeitungszeit benötigen und den Kommunikationsaufwand im bestehenden Team exponentiell in die Höhe treiben.",
        "backtext_en": "In his book, Fred Brooks described how new developers need considerable onboarding time and drive up the communication overhead in the existing team exponentially.",
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
        "title_en": "The 'No Computer at Home' Quote",
        "fronttext": "Das Urteil eines visionären Computer-Herstellers, der absolut keinen rationalen Grund sah, warum Privatleute eine Rechenmaschine daheim besitzen sollten.",
        "fronttext_en": "The verdict of a visionary computer manufacturer who saw absolutely no rational reason why private individuals should own a computing machine at home.",
        "backtext": "Ken Olson, Gründer der Großrechner-Firma DEC, sagte dies auf einer Konferenz. Kurz darauf überrollte die Heimcomputer-Welle den Markt und drängte starre Großrechner ins Abseits.",
        "backtext_en": "Ken Olsen, founder of the mainframe company DEC, said this at a conference. Shortly afterwards, the home-computer wave swept the market and pushed rigid mainframes aside.",
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
        "title_en": "The '640 Kilobytes' Myth",
        "fronttext": "Ein legendärer Ausspruch über die Obergrenze des Arbeitsspeichers, der einem Tech-Milliardär zugeschrieben wird, obwohl er ihn vermutlich nie gesagt hat.",
        "fronttext_en": "A legendary remark about the upper limit of working memory, attributed to a tech billionaire even though he probably never said it.",
        "backtext": "Sinnbildlich für den rasanten Fortschritt gilt der Satz: '640 Kilobyte Speicher sollten für jeden genug sein' (oft Bill Gates zugeordnet). Damals eine enorme Menge, heute verbraucht eine leere Website das Tausendfache.",
        "backtext_en": "Emblematic of rapid progress is the sentence: '640 kilobytes of memory ought to be enough for anybody' (often attributed to Bill Gates). An enormous amount back then – today an empty website uses a thousand times as much.",
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
        "title_en": "Linus's Law",
        "fronttext": "Das Mantra der Open-Source-Bewegung: 'Wenn genügend Augen hinschauen, sind alle Softwarefehler trivial.'",
        "fronttext_en": "The mantra of the open-source movement: 'Given enough eyeballs, all bugs are shallow.'",
        "backtext": "Formuliert von Eric S. Raymond in Anlehnung an Linus Torvalds. Es besagt, dass Code durch die Überprüfung einer großen, transparenten Community automatisch sicherer und stabiler wird.",
        "backtext_en": "Formulated by Eric S. Raymond in reference to Linus Torvalds. It states that code automatically becomes safer and more stable through review by a large, transparent community.",
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
        "title_en": "The General Data Protection Regulation (GDPR)",
        "fronttext": "Das weitreichende EU-Gesetz, das die Verarbeitung personenbezogener Daten streng regulierte und Webseiten weltweit zu 'Cookie-Bannern' zwang.",
        "fronttext_en": "The far-reaching EU law that strictly regulated the processing of personal data and forced websites worldwide to show 'cookie banners'.",
        "backtext": "Die Verordnung stärkte die digitalen Rechte von Individuen (z.B. Recht auf Vergessenwerden) massiv und drohte Tech-Konzernen bei Verstößen erstmals mit Strafen in Milliardenhöhe.",
        "backtext_en": "The regulation massively strengthened individuals' digital rights (e.g. the right to be forgotten) and, for the first time, threatened tech corporations with fines in the billions for violations.",
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
        "title_en": "The TeX Typesetting System",
        "fronttext": "Das hocheffiziente Schriftsatzsystem, das entwickelt wurde, um mathematische Formeln ästhetisch und fehlerfrei auf Papier und Bildschirme zu bringen.",
        "fronttext_en": "The highly efficient typesetting system developed to render mathematical formulas aesthetically and flawlessly on paper and screen.",
        "backtext": "Donald E. Knuth war so unzufrieden mit der Druckqualität seiner Bücher, dass er die Arbeit jahrelang pausierte, um dieses System zu programmieren. Es dominiert bis heute wissenschaftliche Publikationen.",
        "backtext_en": "Donald E. Knuth was so dissatisfied with the print quality of his books that he paused his work for years to program this system. It still dominates scientific publishing today.",
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
        "title_en": "LaTeX",
        "fronttext": "Das populäre Makro-Paket, das das mächtige, aber komplexe TeX-System durch logische Dokumentstrukturen für Autoren und Wissenschaftler bedienbar machte.",
        "fronttext_en": "The popular macro package that made the powerful but complex TeX system usable for authors and scientists through logical document structures.",
        "backtext": "Leslie Lamport entwickelte LaTeX (Lamport TeX). Statt des Prinzips 'What You See Is What You Get' setzt es konsequent auf die Trennung von Inhalt und Formatierung über Code-Strukturen.",
        "backtext_en": "Leslie Lamport developed LaTeX (Lamport TeX). Instead of 'what you see is what you get', it relies consistently on separating content from formatting via code structures.",
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
        "title_en": "Markdown",
        "fronttext": "Eine extrem leichtgewichtige Auszeichnungssprache, die es erlaubt, formatierten Text zu schreiben, der ohne Konvertierung perfekt lesbar ist.",
        "fronttext_en": "An extremely lightweight markup language that lets you write formatted text which reads perfectly even without conversion.",
        "backtext": "John Gruber und Aaron Swartz entwarfen Markdown. Es wurde zum absoluten Standard für technische Dokumentationen (z.B. README-Dateien auf GitHub) und moderne Chat-Plattformen.",
        "backtext_en": "John Gruber and Aaron Swartz designed Markdown. It became the absolute standard for technical documentation (e.g. README files on GitHub) and modern chat platforms.",
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