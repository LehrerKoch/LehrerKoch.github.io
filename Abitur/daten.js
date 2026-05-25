// daten.js - Alle 16 Bundesländer mit gymnasialen und integrierten Schulformen
const abiturDaten = [];

// Hilfsfunktion, um die Datensätze konsistent zu generieren
function addState(bundesland, lks, gk_stunden, lk_stunden, themen, pflicht, hinweise, quelle, dauerGym, dauerInt = "3 Jahre") {
    abiturDaten.push({
        bundesland: bundesland,
        schulform: "Gymnasium",
        dauer: dauerGym,
        lks: lks,
        gk_stunden: gk_stunden,
        lk_stunden: lk_stunden,
        pflicht: pflicht,
        themen: themen,
        hinweise: hinweise,
        quelle: quelle
    });
    abiturDaten.push({
        bundesland: bundesland,
        schulform: "Integrierte Schulform (GesS./ISS/STS/GemS)",
        dauer: dauerInt,
        lks: lks,
        gk_stunden: gk_stunden,
        lk_stunden: lk_stunden,
        pflicht: pflicht,
        themen: themen,
        hinweise: hinweise,
        quelle: quelle
    });
}

// 1. Baden-Württemberg
addState("Baden-Württemberg", 3, 3, 5, 
    { analysis: true, geometrie: true, stochastik: true, linalg_matrizen: false }, 
    "Mathe, Deutsch + Fremdsprache durchgehend; zwei davon als Prüfungsfach", 
    "IQB-Aufgabenpool. Hilfsmittelfreier Teil obligatorisch.", 
    '<a href="https://km-bw.de/" target="_blank">Kultusministerium BW</a>', "2 Jahre");

// 2. Bayern
addState("Bayern", 2, 3, 5, 
    { analysis: true, geometrie: true, stochastik: true, linalg_matrizen: false }, 
    "Deutsch und Mathematik zwingend schriftlich.", 
    "Neues G9 (2026). Matrizen zugunsten Vektorgeometrie/Abstände gestrichen.", 
    '<a href="https://www.isb.bayern.de/" target="_blank">ISB Bayern</a>', "3 Jahre");

// 3. Berlin
addState("Berlin", 2, 3, 5, 
    { analysis: true, geometrie: true, stochastik: true, linalg_matrizen: false }, 
    "Deutsch, Mathematik, Fremdsprache (zwei davon Prüfungsfächer)", 
    "Kooperation mit Brandenburg beim Abitur.", 
    '<a href="https://www.berlin.de/sen/bildung/" target="_blank">SenBJF Berlin</a>', "2 Jahre");

// 4. Brandenburg
addState("Brandenburg", 2, 3, 5, 
    { analysis: true, geometrie: true, stochastik: true, linalg_matrizen: false }, 
    "Deutsch, Mathematik und eine Fremdsprache als Prüfungsfächer.", 
    "Kooperation mit Berlin (teilweise identische Aufgabenstellungen).", 
    '<a href="https://mbjs.brandenburg.de/" target="_blank">MBJS Brandenburg</a>', "2 Jahre");

// 5. Bremen
addState("Bremen", 2, 3, 5, 
    { analysis: true, geometrie: true, stochastik: true, linalg_matrizen: true }, 
    "Zwei Kernfächer (D, M, FS) als Prüfungsfächer.", 
    "Teilweise noch Matrizenrechnung in bestimmten Profilen.", 
    '<a href="https://www.bildung.bremen.de/" target="_blank">Bildungsserver Bremen</a>', "2 Jahre");

// 6. Hamburg
addState("Hamburg", 3, 4, 4, 
    { analysis: true, geometrie: true, stochastik: true, linalg_matrizen: false }, 
    "Zwei Kernfächer zwingend auf erhöhtem Niveau.", 
    "Kernfächer (inkl. Mathe) immer 4-stündig, egal ob GK oder LK.", 
    '<a href="https://www.hamburg.de/bsb/" target="_blank">Schulbehörde Hamburg</a>', "2 Jahre");

// 7. Hessen
addState("Hessen", 2, 3, 5, 
    { analysis: true, geometrie: true, stochastik: true, linalg_matrizen: true }, 
    "Mathematik und Deutsch zwingend unter den Prüfungsfächern.", 
    "Lineare Algebra mit Übergangsmatrizen ist fester Bestandteil im LK.", 
    '<a href="https://kultusministerium.hessen.de/" target="_blank">Kultusministerium Hessen</a>', "3 Jahre");

// 8. Mecklenburg-Vorpommern
addState("Mecklenburg-Vorpommern", 2, 3, 5, 
    { analysis: true, geometrie: true, stochastik: true, linalg_matrizen: false }, 
    "Deutsch, Mathematik und eine Fremdsprache müssen abgedeckt werden.", 
    "Einsatz von länderspezifischen Profilschwerpunkten.", 
    '<a href="https://www.regierung-mv.de/" target="_blank">Bildungsministerium MV</a>', "2 Jahre");

// 9. Niedersachsen
addState("Niedersachsen", 3, 3, 5, 
    { analysis: true, geometrie: true, stochastik: true, linalg_matrizen: true }, 
    "Kernfächer regeln die Prüfungsstruktur (D, M, FS zwingend).", 
    "Matrizenrechnung (stochastische Prozesse) ist Teil des Kerncurriculums.", 
    '<a href="https://www.mk.niedersachsen.de/" target="_blank">Kultusministerium NI</a>', "3 Jahre");

// 10. Nordrhein-Westfalen
addState("Nordrhein-Westfalen", 2, 3, 5, 
    { analysis: true, geometrie: true, stochastik: true, linalg_matrizen: true }, 
    "Zwei Fächer aus Deutsch, Mathe, Fremdsprache zwingend als Prüfungsfach.", 
    "Lineare Algebra (stochastische Matrizen/Übergänge) fest verankert.", 
    '<a href="https://www.standardsicherung.schulministerium.nrw.de/" target="_blank">Standardsicherung NRW</a>', "3 Jahre");

// 11. Rheinland-Pfalz
addState("Rheinland-Pfalz", 3, 3, 4, 
    { analysis: true, geometrie: true, stochastik: true, linalg_matrizen: false }, 
    "Deutsch, Mathematik oder eine Fremdsprache müssen unter den LKs sein.", 
    "Besonderheit der Mainzer Studienstufe: 3 LKs (meist 4-stündig).", 
    '<a href="https://gymnasium.bildung-rp.de/" target="_blank">Bildungsserver RLP</a>', "3 Jahre");

// 12. Saarland
addState("Saarland", 2, 3, 5, 
    { analysis: true, geometrie: true, stochastik: true, linalg_matrizen: false }, 
    "Mathematik und Deutsch sind verpflichtende Fächer.", 
    "Orientiert am standardisierten IQB-Aufgabenpool.", 
    '<a href="https://www.saarland.de/mbk/" target="_blank">Saarland Bildungsportal</a>', "2 Jahre");

// 13. Sachsen
addState("Sachsen", 2, 3, 5, 
    { analysis: true, geometrie: true, stochastik: true, linalg_matrizen: false }, 
    "Deutsch und Mathematik zwingend schriftlich oder mündlich.", 
    "Hohes Anforderungsniveau in den MINT-Fächern.", 
    '<a href="https://www.schule.sachsen.de/" target="_blank">Sächsischer Bildungsserver</a>', "2 Jahre");

// 14. Sachsen-Anhalt
addState("Sachsen-Anhalt", 2, 3, 5, 
    { analysis: true, geometrie: true, stochastik: true, linalg_matrizen: false }, 
    "Zwei der drei Kernfächer müssen schriftlich geprüft werden.", 
    "Nutzt ebenfalls den gemeinsamen Aufgabenpool der Länder.", 
    '<a href="https://mb.sachsen-anhalt.de/" target="_blank">Bildungsministerium ST</a>', "2 Jahre");

// 15. Schleswig-Holstein
addState("Schleswig-Holstein", 1, 4, 4, 
    { analysis: true, geometrie: true, stochastik: true, linalg_matrizen: false }, 
    "Kernfach-Modell (M, D, FS) dominiert.", 
    "Profiloberstufe: Kernfächer durchgehend vierstündig.", 
    '<a href="https://www.schleswig-holstein.de/" target="_blank">Landesportal SH</a>', "3 Jahre");

// 16. Thüringen
addState("Thüringen", 2, 3, 5, 
    { analysis: true, geometrie: true, stochastik: true, linalg_matrizen: false }, 
    "Deutsch und Mathematik sind verpflichtende Prüfungsfächer.", 
    "Keine Matrizenrechnung im Kerncurriculum verankert.", 
    '<a href="https://bildung.thueringen.de/" target="_blank">Bildungsministerium TH</a>', "2 Jahre");