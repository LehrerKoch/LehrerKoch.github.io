# -*- coding: utf-8 -*-
"""vektor.py – Analytische Geometrie mit exakter Bruchrechnung.

Ein Modul für Punkte, Vektoren, Geraden und Ebenen im Mathematikunterricht.

Kurzübersicht
-------------
    from vektor import *

    A = Punkt(1, 2, 3)
    B = Punkt("B(4|0|-2)")
    g = Gerade(A, B)                      # Gerade durch zwei Punkte
    E = Ebene("E: 2x + 3y + 4z = 12")     # Koordinatenform als Text
    S = g & E                             # Schnittpunkt

    A.abstand(E)                          # nur das Ergebnis (exakt!)
    print(A.weg.abstand(E))               # derselbe Rechenweg, schön formatiert
    print(A.weg.abstand(E).tex())         # derselbe Rechenweg als LaTeX
    zeige(A, B, g, E, S)                  # Bild in analytische_geometrie.html

Drei Konventionen, die überall gelten
-------------------------------------
1. Jede Methode liefert das **mathematische Ergebnis** – nie einen Text.
2. Denselben Aufruf über ``.weg`` liefert eine ``Rechnung``:
   ``print(...)`` zeigt den Lösungsweg als Text, ``.tex()`` als LaTeX,
   ``.ergebnis`` ist wieder das Ergebnis.  ``dir(x.weg)`` listet alles,
   was einen Lösungsweg kennt.
3. Gerechnet wird **exakt**: ganze Zahlen und Brüche (``Bruch``), Längen als
   Wurzelterme (``Wurzel``).  Gerundet wird erst bei der Ausgabe – oder
   ausdrücklich mit ``gerundet(x)``.

Alles Weitere steht in ``hilfe()``.
"""

import math
import os
import re
import sys
from fractions import Fraction as Bruch

__version__ = '2.0'


# ====================================================================== #
#  1) Fehlermeldungen                                                    #
# ====================================================================== #

class GeometrieFehler(Exception):
    """Oberklasse aller Fehler dieses Moduls."""


class DimensionsFehler(GeometrieFehler, ValueError):
    """Die Objekte passen nicht zusammen (2D gegen 3D o. Ä.)."""


class EingabeFehler(GeometrieFehler, ValueError):
    """Eine Eingabe konnte nicht gelesen werden."""


class NichtExaktFehler(GeometrieFehler, ArithmeticError):
    """Das Ergebnis wäre kein exakter Bruch- oder Wurzelterm mehr."""


# ====================================================================== #
#  2) Zahlen: exakt rechnen mit Brüchen                                  #
# ====================================================================== #

_ZAHL_RE = re.compile(r"""^\s*
    (?P<vz>[+-]?)\s*
    (?P<fak>\d+(?:[.,]\d+)?)?\s*
    (?:\*?\s*(?:√|sqrt|wurzel)\s*
        (?:\(\s*(?P<radk>[^()]+?)\s*\)|(?P<rad>\d+(?:[.,]\d+)?)))?
    \s*$""", re.X | re.I)


def _dez(s):
    """'1,5' -> 3/2 – exakt, ohne Umweg über float."""
    return Zahl(str(s).strip().replace(',', '.'))


def _zahl_aus_text(s):
    """Liest eine Zahl: 3, -2/3, 1,5, √2, 3√2/4, -1/√2, sqrt(5)."""
    t = str(s).strip().replace('−', '-').replace('·', '*')
    if not t:
        raise EingabeFehler('leere Zahl')
    tiefe = 0
    teile, letzte = [], 0
    for i, c in enumerate(t):
        if c == '(':
            tiefe += 1
        elif c == ')':
            tiefe -= 1
        elif c == '/' and tiefe == 0:
            teile.append(t[letzte:i])
            letzte = i + 1
    teile.append(t[letzte:])
    if len(teile) > 2:
        raise EingabeFehler('zu viele Bruchstriche in %r' % s)
    werte = []
    for teil in teile:
        m = _ZAHL_RE.match(teil)
        if not m:
            raise EingabeFehler('»%s« ist keine Zahl' % teil.strip())
        vz = -1 if m.group('vz') == '-' else 1
        fak = _dez(m.group('fak')) if m.group('fak') else Bruch(1)
        rad = m.group('radk') or m.group('rad')
        if rad is None:
            werte.append(Zahl(vz * fak))
        else:
            werte.append(Wurzel(_zahl_aus_text(rad), vz * fak))
    if len(werte) == 1:
        return werte[0]
    if werte[1] == 0:
        raise ZeroDivisionError('Division durch 0 in %r' % s)
    return werte[0] / werte[1]


class Zahl(Bruch):
    """Eine Bruchzahl, die sich auch so zeigt: ``2/3`` statt ``Fraction(2, 3)``.

    Sonst ist es ein ganz gewöhnlicher ``Bruch`` (``fractions.Fraction``);
    alle Rechnungen des Moduls liefern diese Art von Zahl.
    """

    __slots__ = ()

    def __repr__(self):
        return zahl_text(self)

    def _repr_latex_(self):
        return '$%s$' % zahl_tex(self)

    def text(self, dez=False, stellen=None):
        return zahl_text(self, dez=dez, stellen=stellen)

    def tex(self, dez=False, stellen=None):
        return zahl_tex(self, dez=dez, stellen=stellen)

    latex = tex

    def gerundet(self, stellen=None):
        return gerundet(Bruch(self), stellen)


def _zahl_huelle(name):
    """Sorgt dafür, dass Rechnungen wieder eine Zahl (und keinen rohen
    Bruch) liefern – nur für die schönere Ausgabe."""
    alt = getattr(Bruch, name, None)
    if alt is None:
        return

    def neu(self, *args):
        erg = alt(self, *args)
        return Zahl(erg) if type(erg) is Bruch else erg

    neu.__name__ = name
    setattr(Zahl, name, neu)


for _name in ('__add__', '__radd__', '__sub__', '__rsub__', '__mul__',
              '__rmul__', '__truediv__', '__rtruediv__', '__floordiv__',
              '__rfloordiv__', '__mod__', '__rmod__', '__pow__', '__rpow__',
              '__neg__', '__pos__', '__abs__'):
    _zahl_huelle(_name)
del _name


def Q(x):
    """Macht aus x eine **exakte** Zahl (Bruch oder Wurzel).

    ``Q(0.1)`` ist genau 1/10 – die Dezimalschreibweise wird gelesen, nicht
    die binäre Näherung.  Texte wie ``'2/3'``, ``'1,5'`` oder ``'√2'`` gehen
    auch.
    """
    if isinstance(x, (Zahl, Wurzel)):
        return x
    if isinstance(x, Bruch):
        return Zahl(x)
    if isinstance(x, bool):
        raise TypeError('True/False ist keine Koordinate')
    if isinstance(x, int):
        return Zahl(x)
    if isinstance(x, float):
        if x != x or x in (float('inf'), float('-inf')):
            raise EingabeFehler('%r ist keine Zahl' % x)
        return Zahl(repr(x))
    if isinstance(x, str):
        return _zahl_aus_text(x)
    if hasattr(x, 'as_integer_ratio'):
        return Zahl(*x.as_integer_ratio())
    raise TypeError('%r lässt sich nicht als Zahl lesen' % (x,))


def ist_zahl(x):
    """Ist x eine Zahl, die dieses Modul als Koordinate akzeptiert?"""
    if isinstance(x, bool):
        return False
    if isinstance(x, (int, float, Bruch, Wurzel)):
        return True
    if isinstance(x, str):
        try:
            _zahl_aus_text(x)
            return True
        except Exception:
            return False
    return False


def ist_ganz(x):
    """Ist x eine ganze Zahl?"""
    q = Q(x)
    return isinstance(q, Bruch) and q.denominator == 1


def ganz(x):
    """Gibt x als int zurück, wenn es ganz ist, sonst unverändert."""
    q = Q(x)
    if isinstance(q, Bruch) and q.denominator == 1:
        return int(q)
    return q


def gerundet(x, stellen=None):
    """Rundet exakte Zahlen (und Vektoren) für die Ausgabe."""
    if stellen is None:
        stellen = STIL.stellen
    if hasattr(x, 'gerundet'):
        return x.gerundet(stellen)
    if isinstance(x, (list, tuple)):
        return type(x)(gerundet(e, stellen) for e in x)
    w = float(Q(x)) if not isinstance(x, float) else x
    r = round(w, stellen)
    return int(r) if float(r).is_integer() else r


def ggt(*zahlen):
    """Größter gemeinsamer Teiler – auch von Brüchen (das »Inhalt«-Maß).

    ``ggt(2/3, 4/9)`` ist 2/9: die größte Zahl, durch die beide Brüche ein
    ganzzahliges Vielfaches werden.
    """
    zahlen = _flach(zahlen)
    brueche = [Q(z) for z in zahlen]
    if any(isinstance(b, Wurzel) for b in brueche):
        raise NichtExaktFehler('ggT von Wurzeltermen ist nicht definiert')
    if not brueche:
        return Zahl(0)
    z = 0
    n = 1
    for b in brueche:
        z = math.gcd(z, abs(b.numerator))
        n = n * b.denominator // math.gcd(n, b.denominator)
    return Zahl(z, n)


def kgv(*zahlen):
    """Kleinstes gemeinsames Vielfaches ganzer Zahlen."""
    zahlen = [int(Q(z)) for z in _flach(zahlen)]
    k = 1
    for z in zahlen:
        if z == 0:
            return 0
        k = k * abs(z) // math.gcd(k, abs(z))
    return k


def _flach(args):
    """(([1,2,3],),) -> [1,2,3] – entwirrt verschachtelte Argumentlisten."""
    while isinstance(args, (tuple, list)) and len(args) == 1:
        innen = args[0]
        if isinstance(innen, (tuple, list)):
            args = list(innen)
        elif hasattr(innen, 'koordinaten'):
            args = list(innen.koordinaten)
        else:
            break
    return list(args)


# ---------------------------------------------------------------------- #
#  Quadratwurzeln: k·√r mit k, r aus Q  (exakte Längen!)                 #
# ---------------------------------------------------------------------- #

def _quadrat_raus(m):
    """m = s²·rest mit rest quadratfrei -> (s, rest) für ganze m > 0."""
    s, rest, d = 1, int(m), 2
    while d * d <= rest:
        q, r = divmod(rest, d * d)
        if r == 0:
            s *= d
            rest = q
        else:
            d += 1 if d == 2 else 2
    return s, rest


class Wurzel(object):
    """Ein exakter Wurzelterm ``faktor·√radikand``.

    Wird automatisch zu einem ``Bruch``, wenn die Wurzel aufgeht::

        Wurzel(9)        ->  3            (ein Bruch, keine Wurzel)
        Wurzel(8)        ->  2√2
        Wurzel(2, 3)     ->  3√2
        Wurzel(1, 1) / 2 ->  1/2

    Gerechnet wird exakt: ``*``, ``/``, ``**``, Vergleiche und – bei
    gleichem Radikanden – auch ``+`` und ``-``.
    """

    __slots__ = ('_k', '_r')

    def __new__(cls, radikand, faktor=1):
        r = Q(radikand)
        k = Q(faktor)
        if isinstance(r, Wurzel):
            # √(a·√b) kommt in der Schule nicht vor
            raise NichtExaktFehler('Wurzel aus einem Wurzelterm')
        if isinstance(k, Wurzel):
            return k * Wurzel(r)
        if r < 0:
            raise NichtExaktFehler('Wurzel aus der negativen Zahl %s' % zahl_text(r))
        if r == 0 or k == 0:
            return Zahl(0)
        # √(p/q) = √(p·q)/q
        m = r.numerator * r.denominator
        k = k / r.denominator
        s, rest = _quadrat_raus(m)
        k = k * s
        if rest == 1:
            return Zahl(k) if type(k) is Bruch else k
        w = object.__new__(cls)
        w._k = Zahl(k)
        w._r = Zahl(rest)
        return w

    def __init__(self, radikand, faktor=1):
        pass

    # ---- Bestandteile ------------------------------------------------ #
    @property
    def faktor(self):
        """Der Vorfaktor k in k·√r."""
        return self._k

    @property
    def radikand(self):
        """Der Radikand r in k·√r (quadratfrei und > 1)."""
        return self._r

    def quadrat(self):
        """Das Quadrat – immer ein Bruch."""
        return self._k * self._k * self._r

    def gerundet(self, stellen=None):
        if stellen is None:
            stellen = STIL.stellen
        r = round(float(self), stellen)
        return int(r) if float(r).is_integer() else r

    # ---- Rechnen ----------------------------------------------------- #
    def _wie(self, other):
        if isinstance(other, Wurzel):
            return other
        if ist_zahl(other):
            return Q(other)
        return None

    def __mul__(self, other):
        o = self._wie(other)
        if o is None:
            return NotImplemented
        if isinstance(o, Wurzel):
            return Wurzel(self._r * o._r, self._k * o._k)
        return Wurzel(self._r, self._k * o)

    __rmul__ = __mul__

    def __truediv__(self, other):
        o = self._wie(other)
        if o is None:
            return NotImplemented
        if isinstance(o, Wurzel):
            return Wurzel(self._r / o._r, self._k / o._k)
        if o == 0:
            raise ZeroDivisionError('Division durch 0')
        return Wurzel(self._r, self._k / o)

    def __rtruediv__(self, other):
        o = self._wie(other)
        if o is None or isinstance(o, Wurzel):
            return NotImplemented
        # a / (k√r) = a/(k·r) · √r
        return Wurzel(self._r, o / (self._k * self._r))

    def __add__(self, other):
        o = self._wie(other)
        if o is None:
            return NotImplemented
        if isinstance(o, Wurzel):
            if o._r == self._r:
                return Wurzel(self._r, self._k + o._k)
            raise NichtExaktFehler(
                'Summe von %s und %s ist kein Wurzelterm – mit gerundet(...) rechnen'
                % (self, o))
        if o == 0:
            return self
        raise NichtExaktFehler(
            'Summe von %s und %s ist kein Wurzelterm – mit gerundet(...) rechnen'
            % (self, zahl_text(o)))

    __radd__ = __add__

    def __sub__(self, other):
        return self + (-Q(other) if not isinstance(other, Wurzel) else -other)

    def __rsub__(self, other):
        return (-self) + other

    def __neg__(self):
        return Wurzel(self._r, -self._k)

    def __pos__(self):
        return self

    def __abs__(self):
        return Wurzel(self._r, abs(self._k))

    def __pow__(self, n):
        if not ist_ganz(n):
            raise NichtExaktFehler('nur ganze Exponenten')
        n = int(Q(n))
        if n == 0:
            return Bruch(1)
        if n < 0:
            return Bruch(1) / (self ** (-n))
        erg = Bruch(1)
        for _ in range(n):
            erg = erg * self if not isinstance(erg, Wurzel) else erg * self
        return erg

    def __float__(self):
        return float(self._k) * math.sqrt(float(self._r))

    def __int__(self):
        return int(float(self))

    def __round__(self, stellen=0):
        return round(float(self), stellen)

    def __bool__(self):
        return self._k != 0

    # ---- Vergleiche (exakt) ------------------------------------------ #
    def _vergleich(self, other):
        """-1, 0, +1 – ohne Rundungsfehler."""
        o = self._wie(other)
        if o is None:
            return None
        if isinstance(o, Wurzel):
            a, b = self, o
        else:
            a, b = self, None
            # Vergleich mit Bruch: Vorzeichen, dann Quadrate
            if self._k > 0 and o <= 0:
                return 1
            if self._k < 0 and o >= 0:
                return -1
            links = self.quadrat()
            rechts = o * o
            vz = 1 if self._k > 0 else -1
            if links == rechts:
                return 0
            return vz if links > rechts else -vz
        if (a._k > 0) != (b._k > 0):
            return 1 if a._k > 0 else -1
        vz = 1 if a._k > 0 else -1
        la, lb = a.quadrat(), b.quadrat()
        if la == lb:
            return 0
        return vz if la > lb else -vz

    def __eq__(self, other):
        v = self._vergleich(other)
        return False if v is None else v == 0

    def __ne__(self, other):
        return not self.__eq__(other)

    def __lt__(self, other):
        v = self._vergleich(other)
        if v is None:
            return NotImplemented
        return v < 0

    def __le__(self, other):
        v = self._vergleich(other)
        if v is None:
            return NotImplemented
        return v <= 0

    def __gt__(self, other):
        v = self._vergleich(other)
        if v is None:
            return NotImplemented
        return v > 0

    def __ge__(self, other):
        v = self._vergleich(other)
        if v is None:
            return NotImplemented
        return v >= 0

    def __hash__(self):
        return hash(('Wurzel', self._k, self._r))

    # ---- Ausgabe ----------------------------------------------------- #
    def text(self, dez=False):
        if dez:
            return zahl_text(self.gerundet(), dez=True)
        z, n = self._k.numerator, self._k.denominator
        kern = '√%s' % self._r.numerator
        if z == 1:
            vorn = ''
        elif z == -1:
            vorn = '-'
        else:
            vorn = str(z)
        hinten = '' if n == 1 else '/%s' % n
        return vorn + kern + hinten

    def tex(self):
        z, n = self._k.numerator, self._k.denominator
        kern = r'\sqrt{%s}' % self._r.numerator
        vz = '-' if z < 0 else ''
        az = abs(z)
        if n == 1:
            return vz + ('' if az == 1 else str(az)) + kern
        oben = ('' if az == 1 else str(az)) + kern
        return vz + r'\frac{%s}{%s}' % (oben, n)

    latex = tex

    def __str__(self):
        return self.text()

    def __repr__(self):
        return self.text()


def wurzel(x):
    """Exakte Quadratwurzel: ``wurzel(18)`` ist ``3√2``, ``wurzel(9)`` ist ``3``."""
    return Wurzel(x)


# ---------------------------------------------------------------------- #
#  Zahlen schreiben                                                      #
# ---------------------------------------------------------------------- #

def _dez_text(x, stellen=None):
    """Eine Dezimalzahl mit höchstens so vielen Stellen, wie nötig."""
    if stellen is None:
        stellen = STIL.stellen
    w = float(x)
    s = ('%.*f' % (max(0, stellen), w)).rstrip('0').rstrip('.')
    return s if s not in ('', '-') else '0'


def zahl_text(x, dez=False, stellen=None):
    """Eine Zahl als Text: ``3``, ``-2/3``, ``1,5``, ``2√3``."""
    if isinstance(x, str):
        return x
    if isinstance(x, Wurzel):
        return x.text(dez=dez)
    if isinstance(x, float):
        s = _dez_text(x, stellen)
        return s.replace('.', ',') if STIL.komma else s
    if isinstance(x, int):
        return str(x)
    q = Q(x)
    if dez:
        s = _dez_text(q, stellen)
    elif not isinstance(q, Bruch):
        s = zahl_text(q, dez=dez, stellen=stellen)
    elif q.denominator == 1:
        s = str(q.numerator)
    else:
        s = '%s/%s' % (q.numerator, q.denominator)
    return s.replace('.', ',') if STIL.komma else s


def zahl_tex(x, dez=False, stellen=None):
    """Eine Zahl als LaTeX: ``3``, ``-\\frac{2}{3}``, ``2\\sqrt{3}``."""
    if isinstance(x, str):
        return x
    if isinstance(x, Wurzel):
        return x.tex()
    if isinstance(x, float):
        s = _dez_text(x, stellen)
        return s.replace('.', '{,}') if STIL.komma else s
    if isinstance(x, int):
        return str(x)
    q = Q(x)
    if dez:
        s = _dez_text(q, stellen)
        return s.replace('.', '{,}') if STIL.komma else s
    if q.denominator == 1:
        return str(q.numerator)
    vz = '-' if q.numerator < 0 else ''
    return r'%s\frac{%s}{%s}' % (vz, abs(q.numerator), q.denominator)
# ====================================================================== #
#  3) Ausgabe: Lösungswege als Text und als LaTeX                        #
# ====================================================================== #

class STIL(object):
    """Voreinstellungen für alle Ausgaben – mit ``einstellen(...)`` ändern.

    ================  ======================================================
    ``komma``         Dezimaltrennzeichen Komma (statt Punkt)
    ``stellen``       Rundungsstellen für Näherungswerte
    ``trenner``       Trennzeichen in Koordinaten: ``(1|2|3)``
    ``spalten``       LaTeX: Vektoren als Spaltenvektoren (statt ``(1|2|3)``)
    ``kurz``          LaTeX: eigene Kurzmakros ``\\vecto`` / ``\\pppt``
    ``umgebung``      LaTeX-Umgebung mehrzeiliger Rechnungen (``align*``,
                      ``aligned``, ``gather*`` oder ``None``)
    ``vektorpfeil``   LaTeX: ``\\vec`` für Vektornamen
    ``seite``         Pfad oder Adresse von analytische_geometrie.html
    ================  ======================================================
    """

    komma = True
    stellen = 2
    trenner = '|'
    spalten = True
    kurz = False
    umgebung = 'align*'
    vektorpfeil = True
    seite = None


_STIL_FELDER = ('komma', 'stellen', 'trenner', 'spalten', 'kurz',
                'umgebung', 'vektorpfeil', 'seite')


def einstellen(**felder):
    """Ändert Voreinstellungen dauerhaft: ``einstellen(kurz=True)``."""
    for k, v in felder.items():
        if k not in _STIL_FELDER:
            raise EingabeFehler('unbekannte Einstellung »%s« (erlaubt: %s)'
                                % (k, ', '.join(_STIL_FELDER)))
        setattr(STIL, k, v)
    return {k: getattr(STIL, k) for k in _STIL_FELDER}


class stil(object):
    """Einstellungen nur für einen Block: ``with stil(kurz=True): ...``"""

    def __init__(self, **felder):
        self.neu = {k: v for k, v in felder.items() if v is not None}
        for k in self.neu:
            if k not in _STIL_FELDER:
                raise EingabeFehler('unbekannte Einstellung »%s«' % k)
        self.alt = {}

    def __enter__(self):
        for k, v in self.neu.items():
            self.alt[k] = getattr(STIL, k)
            setattr(STIL, k, v)
        return STIL

    def __exit__(self, *_):
        for k, v in self.alt.items():
            setattr(STIL, k, v)
        return False


# ---------------------------------------------------------------------- #
#  Bausteine einer Formel – jedes Stück kennt Text und LaTeX             #
# ---------------------------------------------------------------------- #

_VOREIN = object()        # "nicht angegeben" – anders als None


class Teil(object):
    """Ein festes Stück Formel mit eigener Text- und LaTeX-Schreibweise."""

    __slots__ = ('t', 'x')

    def __init__(self, t, x=None):
        self.t = t
        self.x = t if x is None else x

    def text(self, **_):
        return self.t

    def tex(self, **_):
        return self.x

    def __str__(self):
        return self.t


class Ausdruck(object):
    """Eine Formel aus mehreren Stücken; wird erst beim Ausgeben gesetzt."""

    __slots__ = ('teile',)

    def __init__(self, *teile):
        self.teile = list(teile)

    def text(self):
        return ''.join(_text_von(p) for p in self.teile)

    def tex(self):
        return ''.join(_tex_von(p) for p in self.teile)

    def __add__(self, other):
        return Ausdruck(*(self.teile + [other]))

    def __radd__(self, other):
        return Ausdruck(*([other] + self.teile))

    def __str__(self):
        return self.text()

    def __repr__(self):
        return self.text()


def _text_von(p):
    if isinstance(p, str):
        return p
    if isinstance(p, (Teil, Ausdruck)):
        return p.text()
    if hasattr(p, '_IST_PUNKT') and p._IST_PUNKT:
        return p.text(mit_name=False)   # in Formeln nur die Koordinaten
    if hasattr(p, 'text') and callable(p.text):
        return p.text()
    if p is None:
        return ''
    return zahl_text(p)


def _tex_von(p):
    if isinstance(p, str):
        return p
    if isinstance(p, (Teil, Ausdruck)):
        return p.tex()
    if hasattr(p, '_IST_PUNKT') and p._IST_PUNKT:
        return p.ortsvektor.tex(mit_name=False)   # Spaltenvektor in Formeln
    if hasattr(p, 'tex') and callable(p.tex):
        return p.tex()
    if p is None:
        return ''
    return zahl_tex(p)


# Verbindungsstücke
MAL = Teil('·', r'\cdot ')
PLUS = Teil(' + ')
MINUS = Teil(' - ')
KREUZ = Teil(' × ', r'\times ')
GRAD = Teil('°', r'^\circ')
PFEIL = Teil(' → ', r'\;\rightarrow\;')
NAEH = Teil(' ≈ ', r'\approx ')


def mal(*teile):
    """``a·b·c`` – negative Zahlen werden geklammert."""
    raus = []
    for i, t in enumerate(teile):
        if i:
            raus.append(MAL)
        raus.append(klammer(t) if _negativ(t) else t)
    return Ausdruck(*raus)


def _negativ(x):
    try:
        return Q(x) < 0
    except Exception:
        return False


def klammer(x, gross=False):
    """``(x)`` – in LaTeX mit ``\\left(…\\right)``."""
    if gross:
        return Ausdruck(Teil('(', r'\left('), x, Teil(')', r'\right)'))
    return Ausdruck(Teil('(', '('), x, Teil(')', ')'))


def betrag(x):
    """``|x|``"""
    return Ausdruck(Teil('|', r'\left|'), x, Teil('|', r'\right|'))


def wurzel_aus(x):
    """``√(x)`` bzw. ``\\sqrt{x}``"""
    innen = _text_von(x)
    offen = '√(' if len(innen) > 1 else '√'
    zu = ')' if len(innen) > 1 else ''
    return Ausdruck(Teil(offen, r'\sqrt{'), x, Teil(zu, '}'))


def quadrat(x):
    """``x²``"""
    k = klammer(x) if _negativ(x) or len(_text_von(x)) > 1 else x
    return Ausdruck(k, Teil('²', '^{2}'))


def hoch(x, n):
    k = klammer(x) if _negativ(x) else x
    return Ausdruck(k, Teil('^%s' % zahl_text(n), '^{%s}' % zahl_tex(n)))


def _klammer_text(x):
    """Klammern nur im Text – in LaTeX erledigt das \\frac selbst."""
    return Ausdruck(Teil('(', ''), x, Teil(')', ''))


def _atom(s):
    """Steht der Text ohne Klammern für sich (kein Operator außen)?"""
    tiefe, balken = 0, False
    for i, c in enumerate(s):
        if c in '([{':
            tiefe += 1
        elif c in ')]}':
            tiefe -= 1
        elif tiefe == 0 and c == '|':
            balken = not balken
        elif tiefe == 0 and not balken and c in '+-·*/ ' and i > 0:
            return False
    return True


def bruchteil(z, n):
    """Ein Bruch aus zwei Formelstücken (im Text mit Klammern)."""
    zt, nt = _text_von(z), _text_von(n)
    zo = z if _atom(zt) else _klammer_text(z)
    no = n if _atom(nt) else _klammer_text(n)
    return Ausdruck(Teil('', r'\frac{'), zo, Teil('/', r'}{'), no, Teil('', r'}'))


def summe(*teile):
    """``a + b - c`` – negative Summanden werden zu Minuszeichen."""
    raus = []
    for i, t in enumerate(teile):
        if i == 0:
            raus.append(t)
            continue
        if _negativ(t):
            raus.append(MINUS)
            raus.append(-Q(t) if not isinstance(t, (Teil, Ausdruck)) else t)
        else:
            raus.append(PLUS)
            raus.append(t)
    return Ausdruck(*raus)


def text_teil(s, kursiv=False):
    """Erklärender Text innerhalb einer Formel."""
    return Teil(s, (r'\text{%s}' if not kursiv else r'\textit{%s}') % s)


# ---------------------------------------------------------------------- #
#  Schritt und Rechnung                                                  #
# ---------------------------------------------------------------------- #

class Schritt(object):
    """Eine Zeile eines Lösungswegs: ``links = glied1 = glied2 ≈ glied3``.

    ``glieder`` ist eine Liste von Formelstücken; ein Paar ``('≈', x)``
    setzt ein anderes Zeichen vor das Glied.
    """

    __slots__ = ('links', 'glieder', 'hinweis')

    def __init__(self, links=None, glieder=(), hinweis=None):
        self.links = links
        self.glieder = []
        for g in glieder:
            if isinstance(g, tuple) and len(g) == 2 and isinstance(g[0], str) \
                    and g[0] in ('=', '≈', '⇔', '≠', '<', '>', '≤', '≥', '|'):
                self.glieder.append((g[0], g[1]))
            else:
                self.glieder.append(('=', g))
        self.hinweis = hinweis

    _TEX_REL = {'=': '=', '≈': r'\approx', '⇔': r'\Leftrightarrow',
                '≠': r'\neq', '<': '<', '>': '>', '≤': r'\le', '≥': r'\ge',
                '|': r'\mid'}

    def _laenge(self):
        n = len(_text_von(self.links)) if self.links is not None else 0
        return n + sum(len(_text_von(g)) + 3 for _, g in self._glieder())

    def _umbruch(self):
        return len(self._glieder()) >= 3 or self._laenge() > 72

    def _glieder(self):
        """Ohne ein erstes Glied, das nur die linke Seite wiederholt."""
        if self.links is None or not self.glieder:
            return self.glieder
        if _text_von(self.links) == _text_von(self.glieder[0][1]):
            return self.glieder[1:] or self.glieder
        return self.glieder

    def zeilen(self):
        """Der Schritt als Liste von Textzeilen."""
        if not self.glieder:
            return [self.hinweis] if self.hinweis else []
        links = _text_von(self.links) if self.links is not None else ''
        stuecke = [(rel, _text_von(g)) for rel, g in self._glieder()]
        raus = []
        if self.hinweis:
            raus.append(self.hinweis)
        if not self._umbruch():
            z = links
            for i, (rel, s) in enumerate(stuecke):
                z += (' %s ' % rel if (i or links) else '') + s
            raus.append(z)
            return raus
        einzug = ' ' * (len(links) + 1)
        for i, (rel, s) in enumerate(stuecke):
            if i == 0 and links:
                raus.append('%s %s %s' % (links, rel, s))
            elif i == 0:
                raus.append(s)
            else:
                raus.append('%s%s %s' % (einzug, rel, s))
        return raus

    def text(self):
        return '\n'.join(self.zeilen())

    def tex_zeilen(self):
        """Der Schritt als Liste von LaTeX-Zeilen (ohne ``\\\\``)."""
        raus = []
        if self.hinweis:
            raus.append(r'&\text{%s}' % _tex_schutz(self.hinweis))
        if not self.glieder:
            return raus
        links = _tex_von(self.links) if self.links is not None else ''
        rel = lambda r: self._TEX_REL.get(r, r)
        if not self._umbruch():
            z = links + ' &'
            for i, (r, g) in enumerate(self._glieder()):
                z += ('%s ' % rel(r) if i == 0 else ' %s ' % rel(r)) + _tex_von(g)
            raus.append(z)
            return raus
        for i, (r, g) in enumerate(self._glieder()):
            if i == 0:
                raus.append('%s &%s %s' % (links, rel(r), _tex_von(g)))
            else:
                raus.append('&%s %s' % (rel(r), _tex_von(g)))
        return raus

    def __str__(self):
        return self.text()

    def __repr__(self):
        return 'Schritt(%s)' % self.text().replace('\n', ' ')


def hinweis(satz):
    """Ein reiner Erklärsatz im Lösungsweg."""
    return Schritt(hinweis=satz)


_TEX_ERSATZ = (('&', r'\&'), ('%', r'\%'), ('#', r'\#'), ('_', r'\_'),
               ('$', r'\$'), ('−', '-'),
               ('·', r'$\cdot$'), ('×', r'$\times$'),
               ('²', '$^2$'), ('³', '$^3$'),
               ('₁', '$_1$'), ('₂', '$_2$'), ('₃', '$_3$'),
               ('√', r'$\sqrt{\;}$'), ('≤', r'$\le$'),
               ('≥', r'$\ge$'), ('≠', r'$\neq$'),
               ('≈', r'$\approx$'), ('⇔', r'$\Leftrightarrow$'),
               ('∈', r'$\in$'), ('ℝ', r'$\mathbb{R}$'),
               ('⊥', r'$\perp$'), ('∥', r'$\parallel$'))


def _tex_schutz(s):
    """Macht einen Erklärsatz für \\text{...} tauglich."""
    for a, b in _TEX_ERSATZ:
        s = s.replace(a, b)
    return s


class Rechnung(object):
    """Ergebnis **und** Lösungsweg.

    ``print(r)`` zeigt den Weg als Text, ``r.tex()`` als LaTeX,
    ``r.ergebnis`` ist das mathematische Ergebnis.
    """

    __slots__ = ('ergebnis', 'schritte', 'titel')

    def __init__(self, ergebnis=None, schritte=(), titel=None):
        self.ergebnis = ergebnis
        self.schritte = [s for s in schritte if s is not None]
        self.titel = titel

    # ---- Zugriff ----------------------------------------------------- #
    @property
    def wert(self):
        """Wie ``.ergebnis``."""
        return self.ergebnis

    def __float__(self):
        return float(self.ergebnis)

    def __int__(self):
        return int(self.ergebnis)

    def __eq__(self, other):
        if isinstance(other, Rechnung):
            return self.ergebnis == other.ergebnis
        return self.ergebnis == other

    def __ne__(self, other):
        return not self.__eq__(other)

    def __bool__(self):
        return bool(self.ergebnis)

    def __hash__(self):
        return hash(self.ergebnis)

    def __len__(self):
        return len(self.schritte)

    def __iter__(self):
        return iter(self.schritte)

    def __getitem__(self, i):
        return self.schritte[i]

    def dazu(self, *schritte):
        """Hängt weitere Schritte an (für eigene Rechnungen)."""
        for s in schritte:
            if s is not None:
                self.schritte.append(s)
        return self

    # ---- Ausgabe ----------------------------------------------------- #
    def text(self, titel=True, einzug=''):
        """Der Lösungsweg als Text."""
        zeilen = []
        if titel and self.titel:
            zeilen.append(self.titel)
            zeilen.append('-' * len(self.titel))
        for s in self.schritte:
            zeilen.extend(s.zeilen())
        if einzug:
            zeilen = [einzug + z for z in zeilen]
        return '\n'.join(zeilen)

    def tex(self, umgebung=_VOREIN, spalten=None, kurz=None, titel=False,
            komma=None, stellen=None):
        """Der Lösungsweg als LaTeX – fertig zum Einfügen.

        ``umgebung`` ist voreingestellt ``align*``; ``'aligned'`` klammert
        zusätzlich in ``\\[ … \\]``, ``None`` liefert nur die Zeilen.
        """
        umg = STIL.umgebung if umgebung is _VOREIN else umgebung
        with stil(spalten=spalten, kurz=kurz, komma=komma, stellen=stellen):
            zeilen = []
            for s in self.schritte:
                zeilen.extend(s.tex_zeilen())
            koerper = ' \\\\\n'.join(zeilen)
            if titel and self.titel:
                koerper = r'\text{%s}\\[2pt]' % _tex_schutz(self.titel) + '\n' + koerper
        if not umg:
            return koerper
        if umg == 'aligned':
            return '\\[\n\\begin{aligned}\n%s\n\\end{aligned}\n\\]' % koerper
        return '\\begin{%s}\n%s\n\\end{%s}' % (umg, koerper, umg)

    latex = tex

    def _repr_latex_(self):
        return '$$\n%s\n$$' % self.tex(umgebung='aligned').strip('\\[]\n ')

    def __str__(self):
        return self.text()

    def __repr__(self):
        return self.text()


# ---------------------------------------------------------------------- #
#  .weg – derselbe Aufruf, aber mit Lösungsweg                           #
# ---------------------------------------------------------------------- #

def mit_weg(f):
    """Kennzeichnet eine Methode, die über ``.weg`` einen Weg liefert."""
    f._mit_weg = True
    return f


class Weg(object):
    """``x.weg.methode(...)`` liefert eine :class:`Rechnung` statt des Werts."""

    __slots__ = ('_obj',)

    def __init__(self, obj):
        self._obj = obj

    def _namen(self):
        raus = []
        for k in dir(type(self._obj)):
            try:
                f = getattr(type(self._obj), k)
            except Exception:
                continue
            if getattr(f, '_mit_weg', False):
                raus.append(k)
        return sorted(raus)

    def __getattr__(self, name):
        if name.startswith('_'):
            raise AttributeError(name)
        f = getattr(type(self._obj), name, None)
        if f is None:
            raise AttributeError(
                '%s kennt keine Methode »%s«' % (type(self._obj).__name__, name))
        if not getattr(f, '_mit_weg', False):
            raise AttributeError(
                '»%s« hat keinen Lösungsweg. Mit Weg: %s'
                % (name, ', '.join(self._namen())))
        obj = self._obj

        def mit_lösungsweg(*args, **kwargs):
            kwargs['_weg'] = True
            return f(obj, *args, **kwargs)

        mit_lösungsweg.__name__ = name
        mit_lösungsweg.__doc__ = f.__doc__
        return mit_lösungsweg

    def __dir__(self):
        return self._namen()

    def __repr__(self):
        return 'Lösungswege von %s: %s' % (self._obj, ', '.join(self._namen()))


def _ausgabe(rechnung, _weg=False, rechnung_alt=False, latex=False):
    """Die eine Stelle, an der über die Rückgabe entschieden wird."""
    if _weg:
        return rechnung
    if latex:
        return rechnung.tex()
    if rechnung_alt:
        return rechnung
    return rechnung.ergebnis
# ====================================================================== #
#  4) Eingabe: Objekte aus Text lesen                                    #
# ====================================================================== #

_LEER = re.compile(r'\s+')


def _putzen(s):
    """Vereinheitlicht Sonderzeichen einer Eingabe."""
    s = str(s)
    for a, b in (('−', '-'), ('–', '-'), ('·', '*'), ('×', 'x'), ('⋅', '*'),
                 ('₁', '1'), ('₂', '2'), ('₃', '3'), ('∘', '*'),
                 (' ', ' '), ('⃗', ''), ('→', ''), ('≠', '!=')):
        s = s.replace(a, b)
    return s.strip()


def _teile_oben(s, trenner):
    """Zerlegt s an trenner, aber nicht innerhalb von Klammern."""
    raus, tiefe, letzte = [], 0, 0
    i = 0
    n = len(trenner)
    while i < len(s):
        c = s[i]
        if c in '([{':
            tiefe += 1
        elif c in ')]}':
            tiefe -= 1
        elif tiefe == 0 and s[i:i + n] == trenner:
            raus.append(s[letzte:i])
            letzte = i + n
            i += n
            continue
        i += 1
    raus.append(s[letzte:])
    return raus


def _name_abtrennen(s):
    """'g: x = ...' -> ('g', 'x = ...');  'a = (1|2)' -> ('a', '(1|2)')."""
    s = _putzen(s)
    m = re.match(r"^([A-Za-zÄÖÜäöüß][A-Za-z0-9_']{0,3})\s*:\s*(.+)$", s, re.S)
    if m:
        return m.group(1), m.group(2).strip()
    # Name = ... (aber nicht die Gleichung x = ... selbst)
    m = re.match(r"^([A-Za-zÄÖÜäöüß][A-Za-z0-9_']{0,3})\s*=\s*(.+)$", s, re.S)
    if m and not re.match(r'^(x|y|z|vec)$', m.group(1), re.I):
        return m.group(1), m.group(2).strip()
    return None, s


def koordinaten_lesen(s):
    """``'(1|2|-3)'``, ``'1;2;3'``, ``'1 2 3'`` -> Liste exakter Zahlen."""
    t = _putzen(s)
    t = re.sub(r'^\s*[\[\(]\s*|\s*[\]\)]\s*$', '', t)
    if not t:
        raise EingabeFehler('keine Koordinaten in %r' % s)
    for tr in ('|', ';'):
        if tr in t:
            teile = _teile_oben(t, tr)
            break
    else:
        teile = _LEER.split(t) if _LEER.search(t) else [t]
    if len(teile) == 1 and ',' in t and t.count(',') >= 2:
        teile = _teile_oben(t, ',')
    werte = []
    for p in teile:
        p = p.strip()
        if p == '':
            raise EingabeFehler('leere Koordinate in %r' % s)
        werte.append(Q(p))
    if len(werte) < 2:
        raise EingabeFehler('%r hat nur eine Koordinate' % s)
    return werte


_PUNKT_RE = re.compile(r"^([A-Za-zÄÖÜäöüß][A-Za-z0-9_']*)?\s*\(([^()]*)\)$")


def punkt_lesen(s):
    """``'A(1|2|3)'`` -> ``('A', [1, 2, 3])``."""
    t = _putzen(s)
    name, rest = None, t
    m = _PUNKT_RE.match(t)
    if m:
        name, rest = m.group(1), m.group(2)
    else:
        name, rest = _name_abtrennen(t)
    return name, koordinaten_lesen(rest)


# --- Koordinatenform: a·x + b·y + c·z = d ----------------------------- #

_KO_TERM = re.compile(r'([+-])'
                      r'(\d+(?:[.,]\d+)?)?'
                      r'(?:/(\d+(?:[.,]\d+)?))?'
                      r'\*?'
                      r'(x1|x2|x3|x|y|z)?'
                      r'(?:/(\d+(?:[.,]\d+)?))?')
_KO_VAR = {'x': 0, 'y': 1, 'z': 2, 'x1': 0, 'x2': 1, 'x3': 2}


def koordinatenform_lesen(s):
    """``'E: 2x + 3y - z = 12'`` -> ``('E', [2, 3, -1], 12)``."""
    name, rest = _name_abtrennen(s)
    t = _putzen(rest).replace('_', '').replace(' ', '')
    seiten = _teile_oben(t, '=')
    if len(seiten) != 2:
        raise EingabeFehler('»%s« ist keine Koordinatenform (ein = nötig)' % s)
    koef = [Bruch(0), Bruch(0), Bruch(0)]
    kon = [Bruch(0), Bruch(0)]
    for nr, seite in enumerate(seiten):
        if not seite:
            raise EingabeFehler('leere Seite in »%s«' % s)
        if seite[0] not in '+-':
            seite = '+' + seite
        pos = 0
        while pos < len(seite):
            m = _KO_TERM.match(seite, pos)
            if not m or m.end() == pos:
                raise EingabeFehler('»%s« in »%s« wird nicht verstanden'
                                    % (seite[pos:], s))
            pos = m.end()
            vz = Bruch(-1) if m.group(1) == '-' else Bruch(1)
            wert = _dez(m.group(2)) if m.group(2) else Bruch(1)
            if m.group(3):
                wert /= _dez(m.group(3))
            if m.group(5):
                wert /= _dez(m.group(5))
            v = m.group(4)
            if not v:
                if not m.group(2) and not m.group(3):
                    raise EingabeFehler('»%s« wird nicht verstanden' % s)
                kon[nr] += vz * wert
            else:
                k = _KO_VAR[v]
                koef[k] += (1 if nr == 0 else -1) * vz * wert
    d = kon[1] - kon[0]
    if all(k == 0 for k in koef):
        raise EingabeFehler('»%s« enthält keine Variable x, y, z' % s)
    return name, koef, d


# --- Normalenform:  [x - (1|2|3)] · (2|3|4) = 0 ----------------------- #

_NF_RE = re.compile(r'^\s*[\[\(]?\s*(?:vec)?x\s*([+-])\s*(\([^()]*\))\s*[\]\)]?'
                    r'\s*\*?\s*(\([^()]*\))\s*=\s*0\s*$', re.I)


def normalenform_lesen(s):
    """``'[x - (1|2|3)]·(2|3|4) = 0'`` -> ``('E', stütz, normale)``."""
    name, rest = _name_abtrennen(s)
    m = _NF_RE.match(_putzen(rest).replace(' ', ''))
    if not m:
        raise EingabeFehler('»%s« ist keine Normalenform' % s)
    stuetz = koordinaten_lesen(m.group(2))
    if m.group(1) == '+':
        stuetz = [-k for k in stuetz]
    return name, stuetz, koordinaten_lesen(m.group(3))


# --- Parameterform: x = (1|2|3) + r·(4|5|6) [+ s·(7|8|9)] ------------- #

def parameterform_lesen(s):
    """-> ``(name, stützpunkt, [richtungen], [parameternamen])``"""
    name, rest = _name_abtrennen(s)
    t = _putzen(rest).replace(' ', '')
    seiten = _teile_oben(t, '=')
    if len(seiten) == 2:
        links = seiten[0].lower().replace('vec', '').replace('{', '').replace('}', '')
        if links not in ('x', 'y', 'ox', ''):
            raise EingabeFehler('»%s« sollte mit x = beginnen' % s)
        t = seiten[1]
    elif len(seiten) != 1:
        raise EingabeFehler('»%s« ist keine Parameterform' % s)
    # an + und - zerlegen, Vorzeichen behalten
    stuecke, vz, letzte, tiefe = [], 1, 0, 0
    for i, c in enumerate(t):
        if c in '([{':
            tiefe += 1
        elif c in ')]}':
            tiefe -= 1
        elif tiefe == 0 and c in '+-' and i > 0 and t[i - 1] not in '*/(,|;':
            stuecke.append((vz, t[letzte:i]))
            vz = -1 if c == '-' else 1
            letzte = i + 1
    stuecke.append((vz, t[letzte:]))
    stuetz, richtungen, parameter = None, [], []
    for sign, stueck in stuecke:
        stueck = stueck.strip()
        if not stueck:
            continue
        m = re.match(r"^([A-Za-z][A-Za-z0-9_']*)?\*?(\([^()]*\))$", stueck)
        if m and m.group(1):
            par = m.group(1)
            v = [sign * k for k in koordinaten_lesen(m.group(2))]
            richtungen.append(v)
            parameter.append(par)
            continue
        m = re.match(r"^(\([^()]*\))\*?([A-Za-z][A-Za-z0-9_']*)?$", stueck)
        if m and m.group(2):
            richtungen.append([sign * k for k in koordinaten_lesen(m.group(1))])
            parameter.append(m.group(2))
            continue
        werte = [sign * k for k in koordinaten_lesen(stueck)]
        if stuetz is None:
            stuetz = werte
        else:
            stuetz = [a + b for a, b in zip(stuetz, werte)]
    if not richtungen:
        raise EingabeFehler('»%s« hat keinen Richtungsvektor' % s)
    if stuetz is None:
        stuetz = [Bruch(0)] * len(richtungen[0])
    return name, stuetz, richtungen, parameter


# --- Alles in einem: lese() ------------------------------------------- #

def lese(text):
    """Liest Punkte, Vektoren, Geraden und Ebenen aus Text.

    Mehrere Zeilen ergeben eine Liste::

        lese("A(1|2|3)")                      -> Punkt
        lese("a = (1|2|3)")                   -> Vektor
        lese("g: x = (1|0|0) + r*(0|1|1)")    -> Gerade
        lese("E: 2x + 3y + 4z = 12")          -> Ebene
        lese("[x - (1|2|3)]*(2|3|4) = 0")     -> Ebene
        lese("E: x = (1|0|0)+r*(0|1|0)+s*(0|0|1)")  -> Ebene
    """
    roh = str(text)
    zeilen = [z for z in re.split(r'[\n\r]+', roh) if z.strip() and
              not z.strip().startswith('#') and not z.strip().startswith('//')]
    if len(zeilen) > 1:
        return [lese(z) for z in zeilen]
    if not zeilen:
        raise EingabeFehler('leere Eingabe')
    s = _putzen(zeilen[0])
    name, rest = _name_abtrennen(s)
    ohne = rest.replace(' ', '')
    # Parameterform?
    if '(' in ohne and (re.match(r'^(vec)?x\s*=', ohne, re.I) or
                        re.match(r'^\(?[^=]*\)\s*\+\s*[a-z]\*?\(', ohne, re.I)):
        nm, stuetz, richtungen, par = parameterform_lesen(s)
        if len(richtungen) == 1:
            return Gerade(stuetz, richtung=richtungen[0], name=name or nm,
                          variable=par[0] if par else None)
        if len(richtungen) >= 2:
            return Ebene(stuetz, rv1=richtungen[0], rv2=richtungen[1],
                         name=name or nm, form='PF')
    # Normalenform?
    if '=' in ohne and re.search(r'x\s*[+-]\s*\(', ohne, re.I) and ohne.rstrip().endswith('0'):
        try:
            nm, stuetz, normale = normalenform_lesen(s)
            return Ebene(stuetz, n=normale, name=name or nm, form='NF')
        except EingabeFehler:
            pass
    # Koordinatenform?
    if '=' in ohne and re.search(r'(x1|x2|x3|[xyz])', ohne, re.I):
        nm, koef, d = koordinatenform_lesen(s)
        return Ebene.aus_koordinatenform(koef, d, name=name or nm)
    # Punkt oder Vektor?
    nm, werte = punkt_lesen(s)
    nm = name or nm
    if nm and nm[0].isupper():
        return Punkt(werte, name=nm)
    return Vektor(werte, name=nm or '')


def objekte_lesen(text):
    """Immer eine Liste – auch bei einer einzigen Zeile."""
    erg = lese(text)
    return erg if isinstance(erg, list) else [erg]
# ====================================================================== #
#  5) Namen und Bezeichnungen                                            #
# ====================================================================== #

def _variablenname(obj, tiefe=1):
    """Sucht den Variablennamen, unter dem obj beim Aufrufer bekannt ist."""
    try:
        f = sys._getframe(tiefe)
    except Exception:
        return None
    while f is not None:
        if f.f_globals.get('__name__') != __name__:
            for k, v in list(f.f_locals.items()):
                if v is obj and not k.startswith('_'):
                    return k
            for k, v in list(f.f_globals.items()):
                if v is obj and not k.startswith('_'):
                    return k
        f = f.f_back
    return None


def _name_tex(name, vektor=True):
    """'a' -> \\vec{a}, 'AB' -> \\overrightarrow{AB}, 'n_1' -> n_1."""
    if not name:
        return ''
    if not vektor:
        return name
    if len(name) == 1 and name.isalpha():
        if STIL.kurz:
            return r'\vec %s' % name
        return r'\vec{%s}' % name if STIL.vektorpfeil else name
    if len(name) == 2 and name.isalpha() and name[0].isupper() and name[1].isupper():
        if STIL.kurz:
            return r'\vecp{%s}' % name
        return r'\overrightarrow{%s}' % name if STIL.vektorpfeil else name
    return name


def _bez(obj, mit_koordinaten=True, vektor=None):
    """Bezeichnung eines Objekts für Lösungswege: Name, sonst Koordinaten."""
    name = getattr(obj, 'name', '') or ''
    if name:
        ist_vek = vektor if vektor is not None else not isinstance(obj, Punkt)
        return Teil(name, _name_tex(name, ist_vek))
    if mit_koordinaten:
        return obj
    return Teil('', '')


def _bez_oder(obj, ersatz):
    name = getattr(obj, 'name', '') or ''
    if name:
        return _bez(obj)
    return Teil(ersatz, ersatz)


# ====================================================================== #
#  6) Vektor                                                             #
# ====================================================================== #

class Vektor(object):
    """Ein Vektor mit exakten Koordinaten.

    ::

        Vektor(1, 2, 3)            Vektor([1, 2, 3])        Vektor("(1|2|3)")
        Vektor(A, B)               Vektor von A nach B (auch mit Punkten)
        Vektor(1, "2/3", 0.25)     exakt: 1, 2/3, 1/4

    Rechnen: ``a + b``, ``a - b``, ``3*a``, ``a/2``, ``a*b`` (Skalarprodukt),
    ``a @ b`` (Kreuzprodukt), ``abs(a)`` (Länge), ``a == b``.
    """

    namen = {'x': 0, 'y': 1, 'z': 2}
    _IST_PUNKT = False

    # ---- Bauen ------------------------------------------------------- #
    def __init__(self, *args, **kwargs):
        name = kwargs.pop('name', '')
        opt = kwargs.pop('opt', None)
        if kwargs:
            raise EingabeFehler('unbekannte Angabe: %s' % ', '.join(kwargs))
        if len(args) == 1 and isinstance(args[0], str):
            nm, werte = punkt_lesen(args[0])
            name = name or nm or ''
            args = (werte,)
        werte = self._koordinaten_aus(args)
        self.__dict__['_koo'] = werte
        self.__dict__['name'] = name or ''
        self.__dict__['_opt'] = dict(opt) if opt else {}

    @classmethod
    def _koordinaten_aus(cls, args):
        args = tuple(args)
        if len(args) == 0:
            return [Bruch(0)] * 3
        if len(args) == 1:
            a = args[0]
            if isinstance(a, Vektor):
                return list(a._koo)
            if isinstance(a, str):
                return [Q(k) for k in koordinaten_lesen(a)]
            if isinstance(a, (list, tuple)):
                if len(a) and all(isinstance(e, (list, tuple, Vektor)) for e in a) and len(a) == 2:
                    return cls._differenz(a[0], a[1])
                return [Q(k) for k in a]
            if ist_zahl(a):
                return [Q(a)]
            raise EingabeFehler('%r lässt sich nicht als Vektor lesen' % (a,))
        if len(args) == 2 and all(isinstance(e, (list, tuple, Vektor, str)) for e in args):
            return cls._differenz(args[0], args[1])
        if all(ist_zahl(a) for a in args):
            return [Q(a) for a in args]
        raise EingabeFehler('%r lässt sich nicht als Vektor lesen' % (args,))

    @staticmethod
    def _differenz(a, b):
        va = Vektor(a) if not isinstance(a, Vektor) else a
        vb = Vektor(b) if not isinstance(b, Vektor) else b
        if va.dimension != vb.dimension:
            raise DimensionsFehler('Start und Ziel haben verschiedene Dimensionen')
        return [y - x for x, y in zip(va._koo, vb._koo)]

    def kopie(self, name=None):
        """Eine unabhängige Kopie."""
        return type(self)(list(self._koo),
                          name=self.name if name is None else name,
                          opt=self._opt)

    copy = kopie

    def benannt(self, name):
        """Dasselbe Objekt mit Namen – praktisch für Lösungswege."""
        return self.kopie(name=name)

    def aussehen(self, **opt):
        """Darstellung auf der Visualisierungsseite: ``farbe``, ``breite`` …"""
        neu = self.kopie()
        neu._opt.update(opt)
        return neu

    # ---- Zugriff ----------------------------------------------------- #
    @property
    def koordinaten(self):
        """Die Koordinaten als Liste (Kopie)."""
        return list(self._koo)

    @property
    def dimension(self):
        return len(self._koo)

    def __len__(self):
        return len(self._koo)

    def __iter__(self):
        return iter(self._koo)

    def __getitem__(self, i):
        if isinstance(i, slice):
            return type(self)(self._koo[i])
        return self._koo[i]

    def __setitem__(self, i, wert):
        self._koo[i] = Q(wert)

    def __getattr__(self, name):
        if name.startswith('_') or name in ('name',):
            raise AttributeError(name)
        if name in Vektor.namen:
            i = Vektor.namen[name]
            koo = self.__dict__.get('_koo')
            if koo is None:
                raise AttributeError(name)
            if i < len(koo):
                return koo[i]
            raise AttributeError(
                'Es gibt keine %s-Koordinate (nur %d Dimensionen)' % (name, len(koo)))
        raise AttributeError('%s hat kein Attribut »%s«'
                             % (type(self).__name__, name))

    def __setattr__(self, name, wert):
        if name in Vektor.namen and '_koo' in self.__dict__:
            i = Vektor.namen[name]
            if i >= len(self._koo):
                raise AttributeError('Es gibt keine %s-Koordinate' % name)
            self._koo[i] = Q(wert)
            return
        object.__setattr__(self, name, wert)

    @property
    def weg(self):
        """Dieselben Methoden, aber mit Lösungsweg."""
        return Weg(self)

    # ---- Grundrechenarten -------------------------------------------- #
    def _gleich_dim(self, other):
        o = other if isinstance(other, Vektor) else Vektor(other)
        if o.dimension != self.dimension:
            raise DimensionsFehler(
                'Die Vektoren haben verschiedene Dimensionen (%d und %d)'
                % (self.dimension, o.dimension))
        return o

    def __add__(self, other):
        if isinstance(other, Gerade):
            return Gerade(other.stuetz + self, richtung=other.rv, name=other.name)
        if isinstance(other, Punkt):
            return Punkt([a + b for a, b in zip(self._koo, other._koo)])
        o = self._gleich_dim(other)
        return Vektor([a + b for a, b in zip(self._koo, o._koo)])

    def __radd__(self, other):
        return self.__add__(other)

    def __sub__(self, other):
        if isinstance(other, Gerade):
            return Gerade(self - other.stuetz, richtung=other.rv, name=other.name)
        o = self._gleich_dim(other)
        return Vektor([a - b for a, b in zip(self._koo, o._koo)])

    def __rsub__(self, other):
        o = self._gleich_dim(other)
        return Vektor([b - a for a, b in zip(self._koo, o._koo)])

    def __mul__(self, other):
        if isinstance(other, Vektor):
            return self.dot(other)
        if ist_zahl(other):
            k = Q(other)
            return Vektor([k * a for a in self._koo])
        return NotImplemented

    def __rmul__(self, other):
        return self.__mul__(other)

    def __truediv__(self, other):
        if ist_zahl(other):
            k = Q(other)
            if k == 0:
                raise ZeroDivisionError('Division eines Vektors durch 0')
            return Vektor([a / k for a in self._koo])
        o = self._gleich_dim(other)
        return self.faktor_zu(o)

    def __matmul__(self, other):
        """``a @ b`` ist das Kreuzprodukt."""
        return self.kreuz(other)

    def __pow__(self, n):
        if not ist_ganz(n):
            raise EingabeFehler('nur ganze Exponenten')
        n = int(Q(n))
        return Vektor([a ** n for a in self._koo])

    def __neg__(self):
        return Vektor([-a for a in self._koo], name='')

    def __pos__(self):
        return self

    def __abs__(self):
        """Die Länge – exakt (z. B. ``3√2``)."""
        return self.laenge()

    def __bool__(self):
        return not self.ist_nullvektor()

    def __eq__(self, other):
        if other is None:
            return False
        if not isinstance(other, Vektor):
            if not isinstance(other, (list, tuple, str)):
                return NotImplemented
            try:
                other = Vektor(other)
            except Exception:
                return False
        if other.dimension != self.dimension:
            return False
        return all(a == b for a, b in zip(self._koo, other._koo))

    def __ne__(self, other):
        g = self.__eq__(other)
        return g if g is NotImplemented else not g

    def __hash__(self):
        return hash(('Vektor', tuple(self._koo)))

    def __int__(self):
        if self.dimension == 1:
            return int(Q(self._koo[0]))
        raise DimensionsFehler('nur eindimensionale Vektoren sind Zahlen')

    def __float__(self):
        if self.dimension == 1:
            return float(self._koo[0])
        raise DimensionsFehler('nur eindimensionale Vektoren sind Zahlen')

    def __round__(self, stellen=0):
        return Vektor([gerundet(a, stellen) for a in self._koo], name=self.name)

    def gerundet(self, stellen=None):
        """Alle Koordinaten gerundet (nur für die Ausgabe!)."""
        return Vektor([gerundet(a, stellen) for a in self._koo], name=self.name)

    # ---- Produkte ---------------------------------------------------- #
    @mit_weg
    def dot(self, *other, **kw):
        """Skalarprodukt ``a·b``."""
        o = self._gleich_dim(_eins(other))
        erg = Bruch(0)
        for a, b in zip(self._koo, o._koo):
            erg = erg + a * b
        s = Schritt(Ausdruck(_bez(self), MAL, _bez(o)),
                    [Ausdruck(self, MAL, o),
                     summe(*[mal(a, b) for a, b in zip(self._koo, o._koo)]),
                     summe(*[a * b for a, b in zip(self._koo, o._koo)]),
                     erg])
        return _ausgabe(Rechnung(erg, [s], 'Skalarprodukt'), **_kw(kw))

    skalarprodukt = dot

    @mit_weg
    def kreuz(self, *other, **kw):
        """Kreuzprodukt ``a × b`` – nur im Raum."""
        o = self._gleich_dim(_eins(other))
        if self.dimension != 3:
            raise DimensionsFehler('Das Kreuzprodukt gibt es nur für 3 Dimensionen')
        a, b = self._koo, o._koo
        erg = Vektor([a[1] * b[2] - a[2] * b[1],
                      a[2] * b[0] - a[0] * b[2],
                      a[0] * b[1] - a[1] * b[0]])
        schritte = _kreuz_zeilen(a, b, erg,
                                 links=Ausdruck(_bez(self), KREUZ, _bez(o)))
        return _ausgabe(Rechnung(erg, schritte, 'Kreuzprodukt'), **_kw(kw))

    kreuzprodukt = kreuz
    cross = kreuz

    def spat(self, b, c):
        """Spatprodukt ``(a × b) · c`` – das Volumen mit Vorzeichen."""
        return self.kreuz(b).dot(c)

    spatprodukt = spat

    @mit_weg
    def volumen(self, b, c, **kw):
        """Volumen des Spats aus drei Vektoren."""
        b = Vektor(b)
        c = Vektor(c)
        kp = self.kreuz(b)
        wert = kp.dot(c)
        erg = abs(Q(wert)) if not isinstance(wert, Wurzel) else abs(wert)
        schritte = [hinweis('Volumen des Spats: V = |(a × b) · c|')]
        schritte += _kreuz_zeilen(self._koo, b._koo, kp, links=Ausdruck(
            _bez(self), KREUZ, _bez(b)))
        schritte.append(Schritt(betrag(Ausdruck(klammer(Ausdruck(
            _bez(self), KREUZ, _bez(b))), MAL, _bez(c))),
            [betrag(Ausdruck(kp, MAL, c)), erg]))
        return _ausgabe(Rechnung(erg, schritte, 'Volumen'), **_kw(kw))

    @mit_weg
    def flaeche(self, other, **kw):
        """Flächeninhalt des Parallelogramms aus zwei Vektoren."""
        o = Vektor(other)
        kp = self.kreuz(o)
        erg = kp.laenge()
        schritte = [hinweis('Flächeninhalt des Parallelogramms: A = |a × b|')]
        schritte += _kreuz_zeilen(self._koo, o._koo, kp, links=Ausdruck(
            _bez(self), KREUZ, _bez(o)))
        schritte.append(_s_laenge(kp, links=betrag(Ausdruck(
            _bez(self), KREUZ, _bez(o)))))
        return _ausgabe(Rechnung(erg, schritte, 'Flächeninhalt'), **_kw(kw))

    def dreiecksflaeche(self, other):
        """Halbe Parallelogrammfläche."""
        return self.flaeche(other) / 2

    # ---- Länge, Richtung --------------------------------------------- #
    @mit_weg
    def laenge(self, **kw):
        """Die Länge – exakt als Bruch oder Wurzelterm."""
        erg = wurzel(sum((a * a for a in self._koo), Bruch(0)))
        return _ausgabe(Rechnung(erg, [_s_laenge(self)], 'Länge'), **_kw(kw))

    betrag = laenge

    @mit_weg
    def normiert(self, **kw):
        """Der Einheitsvektor in dieselbe Richtung – exakt."""
        if self.ist_nullvektor():
            raise GeometrieFehler('Der Nullvektor hat keine Richtung')
        L = self.laenge()
        erg = Vektor([a / L for a in self._koo])
        schritte = [_s_laenge(self),
                    Schritt(Ausdruck(Teil('e', 'e'), Teil('', '')),
                            [Ausdruck(bruchteil(Teil('1'), betrag(_bez(self))), MAL,
                                      _bez(self)),
                             Ausdruck(bruchteil(Teil('1'), L), MAL, self),
                             erg])]
        return _ausgabe(Rechnung(erg, schritte, 'Normierter Vektor'), **_kw(kw))

    def normieren(self):
        """Verändert den Vektor selbst zum Einheitsvektor."""
        self.__dict__['_koo'] = list(self.normiert()._koo)
        return self

    def ist_einheitsvektor(self):
        return self.laenge() == 1

    def gekuerzt(self):
        """Der kürzeste gleich gerichtete Vektor mit ganzen Koordinaten.

        ``(2|4|6)`` -> ``(1|2|3)``,  ``(1/2|1/3|0)`` -> ``(3|2|0)``
        """
        if self.ist_nullvektor():
            return self.kopie()
        if any(isinstance(a, Wurzel) for a in self._koo):
            raise NichtExaktFehler('Wurzelterme lassen sich nicht kürzen')
        g = ggt(*self._koo)
        v = Vektor([a / g for a in self._koo], name=self.name)
        plus = sum(1 for a in v if a > 0)
        minus = sum(1 for a in v if a < 0)
        if minus > plus or (minus == plus and next((a for a in v if a != 0), 0) < 0):
            v = Vektor([-a for a in v._koo], name=self.name)
        return v

    def skaliert(self, faktor=None):
        """Mit faktor gestreckt; ohne Angabe: gekürzt."""
        if faktor is None:
            return self.gekuerzt()
        return self * Q(faktor)

    def skalieren(self, faktor=None):
        """Streckt den Vektor selbst."""
        self.__dict__['_koo'] = list(self.skaliert(faktor)._koo)
        return self

    def orthogonal_zu(self):
        """Irgendein Vektor, der auf diesem senkrecht steht."""
        if self.ist_nullvektor():
            raise GeometrieFehler('Der Nullvektor hat keine Richtung')
        if self.dimension == 2:
            return Vektor(-self._koo[1], self._koo[0]).gekuerzt()
        for i in range(3):
            if self._koo[i] != 0:
                j = (i + 1) % 3
                v = [Bruch(0)] * 3
                v[i] = -self._koo[j]
                v[j] = self._koo[i]
                return Vektor(v).gekuerzt()

    @property
    def in2D(self):
        """Schrägbild-Koordinaten (x nach vorn, halbe Länge)."""
        return Vektor(self.y - Bruch(1, 2) * self.x, self.z - Bruch(1, 2) * self.x)

    # ---- Lagebeziehungen --------------------------------------------- #
    def ist_nullvektor(self):
        return all(a == 0 for a in self._koo)

    def faktor_zu(self, other):
        """Das k mit ``self = k · other`` – oder None."""
        o = self._gleich_dim(other)
        k = None
        for a, b in zip(self._koo, o._koo):
            if b == 0:
                if a != 0:
                    return None
                continue
            q = a / b
            if k is None:
                k = q
            elif k != q:
                return None
        return Bruch(0) if k is None else k

    @mit_weg
    def ist_kollinear(self, other, **kw):
        """Sind die Vektoren parallel (Vielfache voneinander)?"""
        if isinstance(other, Ebene):
            return self.ist_orthogonal(other.n, **kw)
        o = self._gleich_dim(other)
        if self.ist_nullvektor() or o.ist_nullvektor():
            k = Bruch(0)
            erg = True
        else:
            k = self.faktor_zu(o)
            erg = k is not None
        if erg and not o.ist_nullvektor() and k is not None:
            s = Schritt(_bez(self), [mal(k, _bez(o)) if k != 1 else _bez(o)],
                        hinweis='Es gibt ein Vielfaches – die Vektoren sind parallel.')
            schritte = [Schritt(_bez(self), [self]), Schritt(_bez(o), [o]), s]
        else:
            schritte = [Schritt(_bez(self), [self]), Schritt(_bez(o), [o]),
                        hinweis('Es gibt kein k mit %s = k·%s – '
                                'die Vektoren sind nicht parallel.'
                                % (_text_von(_bez(self)), _text_von(_bez(o))))]
        return _ausgabe(Rechnung(erg, schritte, 'Kollinear?'), **_kw(kw))

    ist_parallel = ist_kollinear

    @mit_weg
    def ist_orthogonal(self, other, **kw):
        """Stehen die Vektoren senkrecht aufeinander?"""
        if isinstance(other, Ebene):
            return self.ist_kollinear(other.n, **kw)
        if isinstance(other, Gerade):
            other = other.rv
        o = self._gleich_dim(other)
        sk = self.dot(o)
        erg = (sk == 0)
        schritte = [_s_dot(self, o, sk),
                    hinweis('Das Skalarprodukt ist %s0 – die Vektoren stehen %s'
                            'senkrecht aufeinander.'
                            % ('' if erg else 'nicht ', '' if erg else 'nicht '))]
        return _ausgabe(Rechnung(erg, schritte, 'Orthogonal?'), **_kw(kw))

    @mit_weg
    def ist_komplanar(self, other1, other2, **kw):
        """Liegen die drei Vektoren in einer Ebene?"""
        a = Vektor(other1)
        b = Vektor(other2)
        if len({self.dimension, a.dimension, b.dimension}) != 1:
            raise DimensionsFehler('verschiedene Dimensionen')
        if self.dimension == 3:
            kp = a.kreuz(b)
            sp = kp.dot(self)
            erg = (sp == 0)
            schritte = _kreuz_zeilen(a._koo, b._koo, kp,
                                     links=Ausdruck(_bez(a), KREUZ, _bez(b)))
            schritte.append(_s_dot(kp, self, sp,
                                   links=Ausdruck(klammer(Ausdruck(
                                       _bez(a), KREUZ, _bez(b))), MAL, _bez(self))))
            schritte.append(hinweis(
                'Das Spatprodukt ist %s0 – die Vektoren sind %skomplanar.'
                % ('' if erg else 'nicht ', '' if erg else 'nicht ')))
            return _ausgabe(Rechnung(erg, schritte, 'Komplanar?'), **_kw(kw))
        return _ausgabe(Rechnung(True, [hinweis('In der Ebene sind je drei '
                                                'Vektoren komplanar.')]), **_kw(kw))

    @mit_weg
    def als_linearkombination(self, other1, other2, **kw):
        """Schreibt den Vektor als ``r·u + s·v`` (oder None)."""
        u = Vektor(other1)
        v = Vektor(other2)
        lg = loese([u, v], self, _weg=True)
        if lg.ergebnis.art != 'eindeutig':
            erg = None
        else:
            r, s = lg.ergebnis.werte[0], lg.ergebnis.werte[1]
            erg = (r, s)
        schritte = [hinweis('Ansatz: %s = r·%s + s·%s'
                            % (_text_von(_bez(self)), _text_von(_bez(u)),
                               _text_von(_bez(v))))]
        schritte += lg.schritte
        if erg is not None:
            schritte.append(Schritt(_bez(self),
                                    [summe(mal(erg[0], _bez(u)), mal(erg[1], _bez(v)))]))
        else:
            schritte.append(hinweis('Das Gleichungssystem ist nicht eindeutig '
                                    'lösbar – keine Linearkombination.'))
        return _ausgabe(Rechnung(erg, schritte, 'Linearkombination'), **_kw(kw))

    als_vektorzug = als_linearkombination

    @mit_weg
    def projektion(self, other, **kw):
        """Die Projektion dieses Vektors auf einen anderen."""
        o = self._gleich_dim(other)
        if o.ist_nullvektor():
            raise GeometrieFehler('Projektion auf den Nullvektor')
        sk = self.dot(o)
        nn = o.dot(o)
        k = sk / nn
        erg = o * k
        schritte = [hinweis('Projektion: p = (a·b)/(b·b) · b'),
                    _s_dot(self, o, sk), _s_dot(o, o, nn),
                    Schritt(Teil('p'), [Ausdruck(bruchteil(sk, nn), MAL, _bez(o)),
                                        Ausdruck(bruchteil(sk, nn), MAL, o), erg])]
        return _ausgabe(Rechnung(erg, schritte, 'Projektion'), **_kw(kw))

    @mit_weg
    def winkel(self, other, kann_stumpf=True, gegenwinkel=False,
               to_degree=True, grad=None, **kw):
        """Der Winkel zu einem Vektor, einer Geraden oder einer Ebene (in Grad)."""
        if grad is not None:
            to_degree = grad
        if isinstance(other, Ebene):
            o = other.n
            gegenwinkel = True
            kann_stumpf = False
        elif isinstance(other, Gerade):
            o = other.rv
            kann_stumpf = False
        else:
            o = self._gleich_dim(other)
        if self.ist_nullvektor() or o.ist_nullvektor():
            raise GeometrieFehler('Der Nullvektor hat keine Richtung')
        sk = self.dot(o)
        la, lb = self.laenge(), o.laenge()
        zaehler = sk if kann_stumpf else abs(sk)
        kos = zaehler / (la * lb)
        bogen = math.asin(float(kos)) if gegenwinkel else math.acos(float(kos))
        wert = math.degrees(bogen) if to_degree else bogen
        erg = gerundet(wert, 2)
        op = 'sin' if gegenwinkel else 'cos'
        innen = betrag(Ausdruck(_bez(self), MAL, _bez(o))) if not kann_stumpf \
            else Ausdruck(_bez(self), MAL, _bez(o))
        innen2 = betrag(sk) if not kann_stumpf else sk
        schritte = [_s_dot(self, o, sk), _s_laenge(self), _s_laenge(o),
                    Schritt(Teil('%s(α)' % op, r'\%s(\alpha)' % op),
                            [bruchteil(innen, Ausdruck(betrag(_bez(self)), MAL,
                                                       betrag(_bez(o)))),
                             bruchteil(innen2, Ausdruck(la, MAL, lb)),
                             kos, ('≈', gerundet(kos, 4))]),
                    Schritt(Teil('α', r'\alpha'),
                            [('≈', Ausdruck(erg, GRAD) if to_degree else erg)])]
        if gegenwinkel:
            schritte.insert(0, hinweis('Der Winkel zur Ebene ergänzt den Winkel '
                                       'zum Normalenvektor zu 90° – daher sin.'))
        return _ausgabe(Rechnung(erg, schritte, 'Winkel'), **_kw(kw))

    def kosinus(self, other):
        """Der Kosinus des Winkels – exakt."""
        o = other.rv if isinstance(other, Gerade) else (
            other.n if isinstance(other, Ebene) else self._gleich_dim(other))
        return self.dot(o) / (self.laenge() * o.laenge())

    @mit_weg
    def mittelpunkt(self, other, **kw):
        """Der Mittelpunkt zweier Punkte/Ortsvektoren."""
        o = self._gleich_dim(other)
        erg = (self + o) / 2 if not isinstance(self, Punkt) else \
            Punkt([(a + b) / 2 for a, b in zip(self._koo, o._koo)])
        s = Schritt(Teil('M', 'M'),
                    [Ausdruck(Teil('½', r'\tfrac{1}{2}'), MAL,
                              klammer(summe(_bez(self), _bez(o)), gross=True)),
                     Ausdruck(Teil('½', r'\tfrac{1}{2}'), MAL,
                              klammer(summe(self, o), gross=True)),
                     erg])
        return _ausgabe(Rechnung(erg, [s], 'Mittelpunkt'), **_kw(kw))

    mitte = mittelpunkt

    # ---- Kreuzdivision ----------------------------------------------- #
    def kreuzdivision(self, other, fest_wert=1):
        """Ein Vektor b mit ``a × b = n`` (n ist dieser Vektor)."""
        n = self
        a = Vektor(other)
        if a.ist_nullvektor():
            raise GeometrieFehler('Der Vektor darf nicht der Nullvektor sein')
        if fest_wert is None:
            erg = self.ganzzahlige_kreuzdivision(a)
            if erg:
                return erg
            fest_wert = 1
        fest = Q(fest_wert)
        for i in range(3):
            if a[i] != 0:
                erg = [Bruch(0)] * 3
                erg[i] = fest
                erg[(i + 1) % 3] = (a[(i + 1) % 3] * fest + n[(i + 2) % 3]) / a[i]
                erg[(i + 2) % 3] = (a[(i + 2) % 3] * fest - n[(i + 1) % 3]) / a[i]
                return Vektor(erg)

    def ganzzahlige_kreuzdivision(self, other, max_n=10, gib_alle=False):
        """Sucht ein b mit ganzen Koordinaten und ``a × b = n``."""
        ergebnisse = []
        for i in range(2 * max_n):
            fest = -((i + 1) // 2) if i % 2 else i // 2 + 1
            erg = self.kreuzdivision(other, fest_wert=fest)
            if erg is not None and all(ist_ganz(k) for k in erg):
                if not gib_alle:
                    return erg
                ergebnisse.append(erg)
        return ergebnisse

    @staticmethod
    def ggT(*args):
        """Größter gemeinsamer Teiler der Koordinaten."""
        return ganz(ggt(*_flach(args)))

    # ---- Ausgabe ----------------------------------------------------- #
    def text(self, trenner=None, dez=False, mit_name=False, latex=False,
             sep=None):
        """``(1|2|3)`` – mit ``mit_name=True`` auch ``a = (1|2|3)``."""
        if latex:
            return self.tex(dez=dez, mit_name=mit_name)
        if sep is not None:
            trenner = sep
        tr = STIL.trenner if trenner is None else trenner
        kern = '(' + tr.join(zahl_text(k, dez=dez) for k in self._koo) + ')'
        if mit_name and self.name:
            return '%s = %s' % (self.name, kern)
        return kern

    def tex(self, spalten=None, kurz=None, dez=False, mit_name=False,
            big=None, shortmath=None):
        """LaTeX – Spaltenvektor oder ``(1|2|3)``."""
        if big is not None and spalten is None:
            spalten = big
        if shortmath is not None and kurz is None:
            kurz = shortmath
        sp = STIL.spalten if spalten is None else spalten
        kz = STIL.kurz if kurz is None else kurz
        werte = [zahl_tex(k, dez=dez) for k in self._koo]
        if kz:
            bef = {2: 'vect', 3: 'vecto'}.get(len(werte)) if sp else \
                {2: 'ppt', 3: 'pppt'}.get(len(werte))
            if bef:
                kern = '\\%s{%s}' % (bef, '}{'.join(werte))
            else:
                sp = True
                kern = None
        else:
            kern = None
        if kern is None:
            if sp:
                kern = r'\begin{pmatrix}%s\end{pmatrix}' % r'\\'.join(werte)
            else:
                kern = r'\left(%s\right)' % r'\mid '.join(werte)
        if mit_name and self.name:
            return '%s = %s' % (_name_tex(self.name), kern)
        return kern

    latex = tex

    def als_text(self, *args):
        """Nur die Koordinaten als Text (alte Schreibweise)."""
        if args:
            return Vektor(*args).text()
        return self.text()

    def der_name(self, latex=False, shortmath=None):
        """Der Name des Vektors – notfalls aus dem Variablennamen."""
        name = self.name or _variablenname(self) or ''
        if not latex:
            return name
        with stil(kurz=STIL.kurz if shortmath is None else shortmath):
            return _name_tex(name)

    @property
    def n(self):
        """Name und Koordinaten: ``a(1|2|3)``."""
        return '%s%s' % (self.name, self.text())

    def __str__(self):
        return self.text(mit_name=bool(self.name))

    def __repr__(self):
        return self.text(mit_name=bool(self.name))

    def _repr_latex_(self):
        return '$%s$' % self.tex(mit_name=bool(self.name))

    # ---- Bild -------------------------------------------------------- #
    def seitentext(self, name=None):
        """Die Zeile für analytische_geometrie.html."""
        nm = name or self.name or ''
        kern = 'Vektor(%s)' % _koo_text(self._koo)
        return _zeile(nm, kern, self._opt)

    def zeige(self, *weitere, **kw):
        """Zeigt den Vektor auf der Visualisierungsseite."""
        return zeige(self, *weitere, **kw)

    def zeichnen(self, voll_link=True, dim=3, oeffnen=False, **kw):
        """Alt: Adresse der Visualisierungsseite (früher matheretter)."""
        l = link(self, **kw)
        if oeffnen:
            l.oeffnen()
        return str(l)


def _eins(args):
    """Hilft bei Methoden, die ``f(b)`` und ``f(1,2,3)`` erlauben."""
    if len(args) == 1:
        return args[0]
    return Vektor(*args)


def _kw(kw):
    """Holt die Ausgabe-Schalter aus den Schlüsselwörtern."""
    unbekannt = set(kw) - {'_weg', 'rechnung', 'latex'}
    if unbekannt:
        raise EingabeFehler('unbekannte Angabe: %s' % ', '.join(sorted(unbekannt)))
    return {'_weg': kw.get('_weg', False),
            'rechnung_alt': kw.get('rechnung', False),
            'latex': kw.get('latex', False)}


def _koo_text(koo):
    """Koordinaten für die Visualisierungsseite (Brüche bleiben Brüche)."""
    if len(koo) != 3:
        raise EingabeFehler('Die Visualisierungsseite zeichnet nur räumliche '
                            'Objekte mit 3 Koordinaten (hier: %d)' % len(koo))
    teile = []
    for k in koo:
        if isinstance(k, Wurzel):
            teile.append('%s*sqrt(%s)' % (zahl_text(k.faktor).replace(',', '.'),
                                          k.radikand.numerator))
        else:
            q = Q(k)
            teile.append(str(q.numerator) if q.denominator == 1
                         else '%s/%s' % (q.numerator, q.denominator))
    return '|'.join(teile)


def _zeile(name, kern, opt=None):
    vorn = '%s = ' % name if name else ''
    hinten = ''
    if opt:
        teile = []
        for k, v in opt.items():
            teile.append('%s' % k if v is True else '%s:%s' % (k, v))
        hinten = ' {%s}' % '; '.join(teile)
    return vorn + kern + hinten


# ---------------------------------------------------------------------- #
#  Standard-Teilschritte, die viele Rechnungen brauchen                  #
# ---------------------------------------------------------------------- #

def _s_laenge(v, links=None):
    """``|a| = |(1|2|3)| = √(1²+2²+3²) = √14 ≈ 3,74``"""
    L = wurzel(sum((a * a for a in v._koo), Bruch(0)))
    glieder = [betrag(v),
               wurzel_aus(summe(*[quadrat(a) for a in v._koo])),
               wurzel_aus(summe(*[a * a for a in v._koo])),
               L]
    if not ist_ganz(L) or isinstance(L, Wurzel):
        glieder.append(('≈', gerundet(L)))
    return Schritt(links if links is not None else betrag(_bez(v)), glieder)


def _s_dot(a, b, erg=None, links=None):
    """Ein Skalarprodukt-Schritt."""
    if erg is None:
        erg = a.dot(b)
    return Schritt(links if links is not None else Ausdruck(_bez(a), MAL, _bez(b)),
                   [Ausdruck(a, MAL, b),
                    summe(*[mal(x, y) for x, y in zip(a._koo, b._koo)]),
                    erg])


def _kreuz_zeilen(a, b, erg, links=None):
    """Das Kreuzprodukt als Schema: drei Zeilen plus Ergebnis."""
    paare = [(1, 2), (2, 0), (0, 1)]
    inhalt = []
    for i, j in paare:
        inhalt.append(Ausdruck(mal(a[i], b[j]), Teil(' - ', '-'),
                               mal(a[j], b[i])))
    s1 = Schritt(links if links is not None else None,
                 [Ausdruck(Vektor(a), KREUZ, Vektor(b)),
                  Teil('(%s)' % ' | '.join(_text_von(x) for x in inhalt),
                       r'\begin{pmatrix}%s\end{pmatrix}'
                       % r'\\'.join(_tex_von(x) for x in inhalt)),
                  erg])
    return [s1]
# ====================================================================== #
#  7) Punkt                                                              #
# ====================================================================== #

class Punkt(Vektor):
    """Ein Punkt – rechnet wie ein Ortsvektor, schreibt sich aber als Punkt.

    ::

        A = Punkt(1, 2, 3)        B = Punkt("B(4|0|-2)")
        A + Vektor(1, 0, 0)       verschiebt A        -> Punkt
        B - A                     Verbindungsvektor   -> Vektor
        A.abstand(B)              Abstand             -> exakt

    Alle Rechnungen gibt es über ``A.weg...`` auch mit Lösungsweg.
    """

    _IST_PUNKT = True

    # ---- Rechnen ----------------------------------------------------- #
    def __add__(self, other):
        if isinstance(other, Punkt):
            raise TypeError(
                'Punkte lassen sich nicht addieren. Gemeint ist vielleicht '
                'A.mitte(B) oder A.ortsvektor + B.ortsvektor.')
        if isinstance(other, Gerade):
            return Gerade(other.stuetz + self.ortsvektor, richtung=other.rv)
        o = self._gleich_dim(other)
        return Punkt([a + b for a, b in zip(self._koo, o._koo)])

    __radd__ = __add__

    def __sub__(self, other):
        if isinstance(other, Punkt):
            v = Vektor([b - a for a, b in zip(other._koo, self._koo)])
            if other.name and self.name:
                v = v.benannt('%s%s' % (other.name, self.name))
            return v
        o = self._gleich_dim(other)
        return Punkt([a - b for a, b in zip(self._koo, o._koo)])

    def __rsub__(self, other):
        o = self._gleich_dim(other)
        if isinstance(other, Punkt):
            return Vektor([b - a for a, b in zip(self._koo, o._koo)])
        return Punkt([b - a for a, b in zip(self._koo, o._koo)])

    def __mul__(self, other):
        if isinstance(other, Vektor) and not isinstance(other, Punkt):
            return self.ortsvektor.dot(other)
        if isinstance(other, Punkt):
            return self.ortsvektor.dot(other.ortsvektor)
        if ist_zahl(other):
            return Punkt([Q(other) * a for a in self._koo])
        return NotImplemented

    __rmul__ = __mul__

    def __neg__(self):
        return Punkt([-a for a in self._koo])

    # ---- Umwandeln --------------------------------------------------- #
    @property
    def ortsvektor(self):
        """Der Ortsvektor – heißt ``OA``, wenn der Punkt ``A`` heißt."""
        name = 'O%s' % self.name if self.name else ''
        return Vektor(list(self._koo), name=name)

    ov = ortsvektor

    @property
    def punkt(self):
        return self

    def verbindung(self, other):
        """Der Vektor von diesem Punkt zu einem anderen (heißt ``AB``)."""
        b = other if isinstance(other, Punkt) else Punkt(other)
        return b - self

    vektor_zu = verbindung

    # ---- Abstände und Lote ------------------------------------------- #
    @mit_weg
    def abstand(self, other, **kw):
        """Abstand zu einem Punkt, einer Geraden oder einer Ebene – exakt."""
        if isinstance(other, Gerade):
            return other.abstand(self, **kw)
        if isinstance(other, Ebene):
            return other.abstand(self, **kw)
        b = other if isinstance(other, Punkt) else Punkt(other)
        v = self.verbindung(b)
        erg = v.laenge()
        nm = _bez_oder(v, '%s%s' % (self.name or 'A', b.name or 'B'))
        schritte = [Schritt(nm, [Ausdruck(_bez(b), Teil(' - ', '-'), _bez(self)),
                                 Ausdruck(b, Teil(' - ', '-'), self), v]),
                    _s_laenge(v, links=betrag(nm))]
        return _ausgabe(Rechnung(erg, schritte, 'Abstand zweier Punkte'), **_kw(kw))

    @mit_weg
    def lotfusspunkt(self, other, **kw):
        """Der Fußpunkt des Lots auf eine Gerade oder Ebene."""
        if isinstance(other, (Gerade, Ebene)):
            return other.lotfusspunkt(self, **kw)
        raise EingabeFehler('Lotfußpunkt gibt es nur zu Geraden und Ebenen')

    def lot_auf(self, other):
        """Die Lotgerade von diesem Punkt auf eine Gerade oder Ebene."""
        if isinstance(other, Ebene):
            return Gerade(self, richtung=other.n, name='l')
        if isinstance(other, Gerade):
            f = other.lotfusspunkt(self)
            if f == self:
                raise GeometrieFehler('Der Punkt liegt auf der Geraden – '
                                      'das Lot ist nicht eindeutig')
            return Gerade(self, f, name='l')
        raise EingabeFehler('Lot gibt es nur zu Geraden und Ebenen')

    @mit_weg
    def spiegeln(self, other, **kw):
        """Spiegelt den Punkt an einem Punkt, einer Geraden oder einer Ebene."""
        if isinstance(other, Punkt):
            erg = Punkt([2 * b - a for a, b in zip(self._koo, other._koo)])
            s = Schritt(Teil("A'", "A'"),
                        [Ausdruck(_bez(self), Teil(' + 2', '+2'), MAL,
                                  klammer(Ausdruck(_bez(other), Teil(' - ', '-'),
                                                   _bez(self)), gross=True)),
                         Ausdruck(Teil('2', '2'), MAL, other, Teil(' - ', '-'), self),
                         erg])
            return _ausgabe(Rechnung(erg, [s], 'Punktspiegelung'), **_kw(kw))
        if isinstance(other, (Gerade, Ebene)):
            lf = other.lotfusspunkt(self, _weg=True)
            f = lf.ergebnis
            erg = Punkt([2 * b - a for a, b in zip(self._koo, f._koo)])
            schritte = list(lf.schritte)
            schritte.append(hinweis('Der Lotfußpunkt ist der Mittelpunkt von '
                                    'Punkt und Spiegelpunkt.'))
            schritte.append(Schritt(
                Teil("A'", "A'"),
                [Ausdruck(_bez(self), Teil(' + 2', '+2'), MAL,
                          klammer(Ausdruck(Teil('F', 'F'), Teil(' - ', '-'),
                                           _bez(self)), gross=True)),
                 Ausdruck(Teil('2', '2'), MAL, f, Teil(' - ', '-'), self), erg]))
            return _ausgabe(Rechnung(erg, schritte, 'Spiegelung'), **_kw(kw))
        raise EingabeFehler('Spiegeln geht an Punkten, Geraden und Ebenen')

    def liegt_auf(self, other):
        """Liegt der Punkt auf der Geraden/Ebene?"""
        if isinstance(other, (Gerade, Ebene)):
            return other.hat_punkt(self)
        if isinstance(other, Punkt):
            return self == other
        raise EingabeFehler('liegt_auf braucht eine Gerade oder Ebene')

    @mit_weg
    def teilpunkt(self, other, verhaeltnis, **kw):
        """Der Punkt, der die Strecke im Verhältnis t teilt (t aus [0;1])."""
        b = other if isinstance(other, Punkt) else Punkt(other)
        t = Q(verhaeltnis)
        v = self.verbindung(b)
        erg = Punkt([a + t * d for a, d in zip(self._koo, v._koo)])
        s = Schritt(Teil('T', 'T'),
                    [Ausdruck(_bez(self), PLUS, mal(t, _bez(v))),
                     Ausdruck(self, PLUS, mal(t, v)), erg])
        return _ausgabe(Rechnung(erg, [s], 'Teilpunkt'), **_kw(kw))

    # ---- Ausgabe ----------------------------------------------------- #
    def text(self, trenner=None, dez=False, mit_name=True):
        tr = STIL.trenner if trenner is None else trenner
        kern = '(' + tr.join(zahl_text(k, dez=dez) for k in self._koo) + ')'
        return '%s%s' % (self.name, kern) if (mit_name and self.name) else kern

    def tex(self, spalten=None, kurz=None, dez=False, mit_name=True):
        werte = [zahl_tex(k, dez=dez) for k in self._koo]
        kern = r'\left(%s\right)' % r'\mid '.join(werte)
        return '%s%s' % (self.name, kern) if (mit_name and self.name) else kern

    latex = tex

    def __str__(self):
        return self.text()

    def __repr__(self):
        return self.text()

    def seitentext(self, name=None):
        nm = name or self.name or ''
        return _zeile(nm, 'Punkt(%s)' % _koo_text(self._koo), self._opt)


def punkte(text):
    """Liest mehrere Punkte: ``punkte("A(1|2|3) B(0|0|1)")``."""
    teile = re.split(r'[\n;]+|(?<=\))\s+', str(text).strip())
    return [Punkt(t) for t in teile if t.strip()]
# ====================================================================== #
#  8) Lineare Gleichungssysteme – exakt, mit Rechenweg                   #
# ====================================================================== #

class Block(object):
    """Mehrzeiliger Teil eines Lösungswegs (z. B. eine Matrix)."""

    __slots__ = ('ztext', 'ztex', 'hinweis')

    def __init__(self, ztext, ztex, hinweis=None):
        self.ztext = list(ztext)
        self.ztex = list(ztex)
        self.hinweis = hinweis

    def zeilen(self):
        raus = [self.hinweis] if self.hinweis else []
        return raus + self.ztext

    def tex_zeilen(self):
        raus = [r'&\text{%s}' % _tex_schutz(self.hinweis)] if self.hinweis else []
        return raus + self.ztex

    def text(self):
        return '\n'.join(self.zeilen())

    def __str__(self):
        return self.text()


def _matrix_block(M, hinweis=None, spalten=None):
    """Eine erweiterte Koeffizientenmatrix als Block."""
    n = len(M[0]) - 1 if spalten is None else spalten
    zellen = [[zahl_text(w) for w in zeile] for zeile in M]
    breite = [max(len(z[s]) for z in zellen) for s in range(len(zellen[0]))]
    ztext = []
    for z in zellen:
        links = '  '.join(z[s].rjust(breite[s]) for s in range(n))
        rechts = '  '.join(z[s].rjust(breite[s]) for s in range(n, len(z)))
        ztext.append('[ %s | %s ]' % (links, rechts))
    kopf = 'r' * n + '|' + 'r' * (len(zellen[0]) - n)
    zeilen_tex = r'\\'.join(' & '.join(zahl_tex(w) for w in z) for z in M)
    ztex = [r'&\left(\begin{array}{%s}%s\end{array}\right)' % (kopf, zeilen_tex)]
    return Block(ztext, ztex, hinweis)


class Loesung(object):
    """Die Lösungsmenge eines linearen Gleichungssystems.

    ``art`` ist ``'eindeutig'``, ``'unendlich'`` oder ``'keine'``.
    Bei ``'eindeutig'`` stehen die Werte in ``werte`` (und das Objekt
    verhält sich wie diese Liste).
    """

    def __init__(self, art, werte=None, spezial=None, richtungen=None,
                 frei=None, anzahl=0, namen=None):
        self.art = art
        self.werte = list(werte) if werte else []
        self.spezial = spezial
        self.richtungen = list(richtungen) if richtungen else []
        self.frei = list(frei) if frei else []
        self.anzahl = anzahl
        self.namen = list(namen) if namen else ['r', 's', 't', 'u', 'v'][:anzahl]

    def __bool__(self):
        return self.art != 'keine'

    def __len__(self):
        return len(self.werte)

    def __iter__(self):
        return iter(self.werte)

    def __getitem__(self, i):
        if self.art != 'eindeutig':
            raise GeometrieFehler('Die Lösung ist nicht eindeutig (%s)' % self.art)
        return self.werte[i]

    def __eq__(self, other):
        if isinstance(other, Loesung):
            return (self.art, self.werte) == (other.art, other.werte)
        if isinstance(other, (list, tuple)):
            return self.art == 'eindeutig' and \
                list(self.werte) == [Q(x) for x in other]
        return NotImplemented

    def __hash__(self):
        return hash((self.art, tuple(self.werte)))

    def text(self):
        if self.art == 'keine':
            return 'keine Lösung'
        if self.art == 'eindeutig':
            return ';  '.join('%s = %s' % (n, zahl_text(w))
                              for n, w in zip(self.namen, self.werte))
        teile = [_text_von(self.spezial)]
        for i, r in enumerate(self.richtungen):
            teile.append('%s·%s' % ('tuvw'[i % 4], _text_von(r)))
        return 'x = ' + ' + '.join(teile)

    def tex(self):
        if self.art == 'keine':
            return r'\text{keine Lösung}'
        if self.art == 'eindeutig':
            return r';\quad '.join('%s = %s' % (n, zahl_tex(w))
                                   for n, w in zip(self.namen, self.werte))
        teile = [_tex_von(self.spezial)]
        for i, r in enumerate(self.richtungen):
            teile.append('%s\\cdot %s' % ('tuvw'[i % 4], _tex_von(r)))
        return r'\vec x = ' + ' + '.join(teile)

    def __str__(self):
        return self.text()

    def __repr__(self):
        return self.text()


def _rref(M):
    """Gauß-Jordan, exakt. Gibt (Matrix, Pivotspalten, Protokoll) zurück."""
    M = [[Q(w) for w in zeile] for zeile in M]
    zeilen = len(M)
    spalten = len(M[0]) - 1
    protokoll = []
    pivots = []
    z = 0
    for s in range(spalten):
        wahl = None
        for i in range(z, zeilen):
            if M[i][s] != 0:
                wahl = i
                break
        if wahl is None:
            continue
        if wahl != z:
            M[z], M[wahl] = M[wahl], M[z]
            protokoll.append(('Zeile %d und Zeile %d tauschen' % (z + 1, wahl + 1),
                              [list(r) for r in M]))
        p = M[z][s]
        if p != 1:
            M[z] = [w / p for w in M[z]]
        aenderung = []
        for i in range(zeilen):
            if i != z and M[i][s] != 0:
                f = M[i][s]
                M[i] = [a - f * b for a, b in zip(M[i], M[z])]
                aenderung.append(i + 1)
        if p != 1 or aenderung:
            was = []
            if p != 1:
                was.append('Zeile %d durch %s teilen' % (z + 1, zahl_text(p)))
            if aenderung:
                was.append('Zeile %s mit Zeile %d bereinigen'
                           % (' und '.join(str(a) for a in aenderung), z + 1))
            protokoll.append((', '.join(was), [list(r) for r in M]))
        pivots.append(s)
        z += 1
        if z == zeilen:
            break
    return M, pivots, protokoll


def loese(spalten, rechte=None, namen=None, **kw):
    """Löst ein lineares Gleichungssystem **exakt**.

    ``spalten`` sind die Spalten der Koeffizientenmatrix (so, wie sie in der
    analytischen Geometrie entstehen: die Vektoren, deren Vielfache gesucht
    sind), ``rechte`` ist die rechte Seite::

        loese([u, v], w)        # w = r·u + s·v

    Ergebnis ist eine :class:`Loesung`; mit ``.weg`` bzw.
    ``loese(..., rechnung=True)`` gibt es den Rechenweg mit allen
    Matrizen.
    """
    if isinstance(spalten, Vektor):
        spalten = [spalten]
    spalten = [s if isinstance(s, Vektor) else Vektor(s) for s in spalten]
    hoehe = max(s.dimension for s in spalten)
    if rechte is None:
        b = [Bruch(0)] * hoehe
    else:
        b = list((rechte if isinstance(rechte, Vektor) else Vektor(rechte))._koo)
    if len(b) != hoehe:
        raise DimensionsFehler('Die rechte Seite passt nicht zur Matrix')
    for s in spalten:
        if s.dimension != hoehe:
            raise DimensionsFehler('Die Spalten haben verschiedene Längen')
    M0 = [[s[i] for s in spalten] + [b[i]] for i in range(hoehe)]
    M, pivots, protokoll = _rref(M0)
    n = len(spalten)
    namen = list(namen) if namen else (
        ['r', 's', 't', 'u', 'v', 'w'][:n] if n <= 6
        else ['x%d' % (i + 1) for i in range(n)])
    # Widerspruchszeile?
    art = 'eindeutig'
    for zeile in M:
        if all(w == 0 for w in zeile[:n]) and zeile[n] != 0:
            art = 'keine'
            break
    if art != 'keine' and len(pivots) < n:
        art = 'unendlich'
    if art == 'eindeutig':
        werte = [Bruch(0)] * n
        for z, s in enumerate(pivots):
            werte[s] = M[z][n]
        erg = Loesung('eindeutig', werte=werte, anzahl=n, namen=namen)
    elif art == 'keine':
        erg = Loesung('keine', anzahl=n, namen=namen)
    else:
        frei = [s for s in range(n) if s not in pivots]
        spez = [Bruch(0)] * n
        for z, s in enumerate(pivots):
            spez[s] = M[z][n]
        richtungen = []
        for f in frei:
            r = [Bruch(0)] * n
            r[f] = Bruch(1)
            for z, s in enumerate(pivots):
                r[s] = -M[z][f]
            richtungen.append(Vektor(r))
        erg = Loesung('unendlich', spezial=Vektor(spez), richtungen=richtungen,
                      frei=frei, anzahl=n, namen=namen)
    schritte = [_matrix_block(M0, 'Erweiterte Koeffizientenmatrix (Spalten: %s)'
                              % ', '.join(namen))]
    for was, Mi in protokoll:
        schritte.append(_matrix_block(Mi, was))
    if art == 'eindeutig':
        schritte.append(Schritt(None, [Teil(erg.text(), erg.tex())]))
    elif art == 'keine':
        schritte.append(hinweis('Eine Zeile lautet 0 = c mit c ≠ 0 – '
                                'das System hat keine Lösung.'))
    else:
        schritte.append(hinweis('Es bleiben freie Variablen – '
                                'unendlich viele Lösungen:'))
        schritte.append(Schritt(None, [Teil(erg.text(), erg.tex())]))
    return _ausgabe(Rechnung(erg, schritte, 'Lineares Gleichungssystem'), **_kw(kw))


def lgs_loesen(linke_seite, rechte_seite=None, rechnung=False):
    """Alt: liefert die Werte als Tupel (oder None).

    Neuere Rechnungen benutzen besser :func:`loese`.
    """
    erg = loese(linke_seite, rechte_seite)
    if rechnung:
        print(loese(linke_seite, rechte_seite, rechnung=True).text())
    if erg.art == 'eindeutig':
        return tuple(ganz(w) for w in erg.werte)
    if erg.art == 'keine':
        return None
    return erg
# ====================================================================== #
#  9) Gerade                                                             #
# ====================================================================== #

class Gerade(object):
    """Eine Gerade in Parameterform ``x = p + r·u``.

    ::

        Gerade(A, B)                       durch zwei Punkte
        Gerade(A, richtung=(1|2|3))        Stützpunkt und Richtung
        Gerade("g: x = (1|0|0) + r*(0|1|1)")

    ``g.punkt(2)`` ist der Punkt zum Parameter 2, ``g & h`` der Schnitt.
    """

    namen = {'x': 0, 'y': 1, 'z': 2}

    def __init__(self, startpunkt=None, endpunkt=None, richtung=None,
                 name=None, variable=None, opt=None, **kwargs):
        for alt, neu in (('sv', 'startpunkt'), ('start', 'startpunkt'),
                         ('stuetz', 'startpunkt'), ('p', 'startpunkt'),
                         ('ende', 'endpunkt'), ('rv', 'richtung'),
                         ('u', 'richtung')):
            if alt in kwargs:
                wert = kwargs.pop(alt)
                if neu == 'startpunkt' and startpunkt is None:
                    startpunkt = wert
                elif neu == 'endpunkt' and endpunkt is None:
                    endpunkt = wert
                elif neu == 'richtung' and richtung is None:
                    richtung = wert
        if kwargs:
            raise EingabeFehler('unbekannte Angabe: %s' % ', '.join(kwargs))
        if isinstance(startpunkt, str):
            nm, stuetz, richtungen, par = parameterform_lesen(startpunkt)
            if len(richtungen) != 1:
                raise EingabeFehler('»%s« ist keine Geradengleichung' % startpunkt)
            startpunkt, richtung = stuetz, richtungen[0]
            name = name or nm
            if par and variable is None:
                variable = par[0]
        if isinstance(startpunkt, Gerade):
            g = startpunkt
            startpunkt, richtung = g.stuetz, g.rv
            name = name or g.name
            variable = variable or g.variable
        if richtung is None and endpunkt is None:
            raise EingabeFehler('Endpunkt oder Richtungsvektor angeben')
        dims = {len(e) for e in (startpunkt, endpunkt, richtung) if e is not None}
        if len(dims) != 1:
            raise DimensionsFehler('Die Angaben haben verschiedene Dimensionen')
        dim = dims.pop()
        p = Punkt([0] * dim) if startpunkt is None else _als_punkt(startpunkt)
        if richtung is not None:
            u = Vektor(richtung)
            if endpunkt is not None:
                if not u.ist_kollinear(_als_punkt(endpunkt) - p):
                    raise EingabeFehler('Endpunkt und Richtungsvektor passen '
                                        'nicht zusammen')
        else:
            u = _als_punkt(endpunkt) - p
        if u.ist_nullvektor():
            raise GeometrieFehler('Der Richtungsvektor darf nicht der '
                                  'Nullvektor sein')
        self.stuetz = p
        self.rv = u
        self.variable = variable or 'r'
        self.name = name
        self._opt = dict(opt) if opt else {}

    # ---- Zugriff ----------------------------------------------------- #
    @property
    def sv(self):
        """Der Stützpunkt (alter Name)."""
        return self.stuetz

    @property
    def richtung(self):
        return self.rv

    @property
    def dimension(self):
        return self.rv.dimension

    @property
    def weg(self):
        return Weg(self)

    def __len__(self):
        return self.rv.dimension

    def kopie(self, name=None):
        return Gerade(self.stuetz, richtung=self.rv,
                      name=self.name if name is None else name,
                      variable=self.variable, opt=self._opt)

    copy = kopie

    def benannt(self, name):
        return self.kopie(name=name)

    def aussehen(self, **opt):
        neu = self.kopie()
        neu._opt.update(opt)
        return neu

    # ---- Punkte auf der Geraden -------------------------------------- #
    @mit_weg
    def punkt(self, parameter=1, **kw):
        """Der Punkt zum Parameter."""
        t = Q(parameter)
        erg = self.stuetz + self.rv * t
        s = Schritt(Teil('x', r'\vec x'),
                    [Ausdruck(self.stuetz, PLUS, mal(t, self.rv)),
                     Ausdruck(self.stuetz, PLUS, self.rv * t),
                     erg])
        return _ausgabe(Rechnung(erg, [s], 'Punkt auf der Geraden'), **_kw(kw))

    wert = punkt

    @mit_weg
    def hat_punkt(self, other, **kw):
        """Punktprobe."""
        p = _als_punkt(other)
        if p.dimension != self.dimension:
            raise DimensionsFehler('verschiedene Dimensionen')
        d = p - self.stuetz
        t = d.faktor_zu(self.rv) if not d.ist_nullvektor() else Bruch(0)
        erg = t is not None
        zeilen = ['%s = %s' % (zahl_text(p[i]), self._koordinate(i))
                  for i in range(self.dimension)]
        ztex = [r'%s &= %s' % (zahl_tex(p[i]), self._koordinate(i, tex=True))
                for i in range(self.dimension)]
        schritte = [Schritt(Teil('Ansatz:', r'\text{Ansatz: }'),
                            [Ausdruck(p, Teil(' = ', '='), self.stuetz, PLUS,
                                      Teil(self.variable), MAL, self.rv)]),
                    Block(zeilen, ztex)]
        if erg:
            schritte.append(Schritt(Teil(self.variable),
                                    [t], hinweis='In allen Zeilen derselbe Wert – '
                                                 'der Punkt liegt auf der Geraden.'))
        else:
            schritte.append(hinweis('Die Zeilen liefern verschiedene Werte für %s – '
                                    'der Punkt liegt nicht auf der Geraden.'
                                    % self.variable))
        return _ausgabe(Rechnung(erg, schritte, 'Punktprobe'), **_kw(kw))

    def wann_punkt(self, *args, **kwargs):
        """Der Parameter zu einem Punkt – oder zu einer Bedingung wie ``z=0``.

        ``g.wann_punkt(P)`` oder ``g.wann_punkt(z=0)``.
        Ohne Lösung ``None``, bei beliebigem Parameter ``float('inf')``.
        """
        if len(args) == 1 and not kwargs:
            p = _als_punkt(args[0])
            if p.dimension != self.dimension:
                raise DimensionsFehler('verschiedene Dimensionen')
            d = p - self.stuetz
            if d.ist_nullvektor():
                return Bruch(0)
            return d.faktor_zu(self.rv)
        if kwargs:
            t = None
            echt = False
            for koord, wert in kwargs.items():
                if koord not in Vektor.namen or Vektor.namen[koord] >= self.dimension:
                    raise EingabeFehler('Ungültige Koordinate »%s«' % koord)
                i = Vektor.namen[koord]
                sv_i, rv_i = self.stuetz[i], self.rv[i]
                wert = Q(wert)
                if rv_i == 0:
                    if sv_i != wert:
                        return None
                    continue
                echt = True
                neu = (wert - sv_i) / rv_i
                if t is None:
                    t = neu
                elif t != neu:
                    return None
            return t if echt else float('inf')
        raise EingabeFehler('Punkt oder Bedingung wie z=0 angeben')

    def spurpunkte(self):
        """Die Durchstoßpunkte durch die Koordinatenebenen.

        Ergebnis ist ein Wörterbuch mit den Schlüsseln ``'xy'`` (z = 0),
        ``'xz'`` (y = 0) und ``'yz'`` (x = 0).
        """
        if self.dimension != 3:
            raise DimensionsFehler('Spurpunkte gibt es nur im Raum')
        raus = {}
        for schluessel, koord in (('xy', 'z'), ('xz', 'y'), ('yz', 'x')):
            t = self.wann_punkt(**{koord: 0})
            if t is None or t == float('inf'):
                raus[schluessel] = None
            else:
                raus[schluessel] = self.punkt(t)
        return raus

    # ---- Lagebeziehungen --------------------------------------------- #
    def ist_parallel(self, other):
        """Ist die Gerade parallel (auch: identisch) zu … ?"""
        if isinstance(other, Gerade):
            return self.rv.ist_kollinear(other.rv)
        if isinstance(other, Ebene):
            return self.rv.ist_orthogonal(other.n)
        return self.rv.ist_kollinear(other)

    def ist_echt_parallel(self, other):
        """Parallel, aber nicht identisch."""
        return self.ist_parallel(other) and not self.ist_identisch(other)

    def ist_identisch(self, other):
        if isinstance(other, Gerade):
            return self.rv.ist_kollinear(other.rv) and self.hat_punkt(other.stuetz)
        if isinstance(other, Ebene):
            return other.hat_punkt(self.stuetz) and self.rv.ist_orthogonal(other.n)
        return False

    def ist_orthogonal(self, other):
        if isinstance(other, Ebene):
            return self.rv.ist_kollinear(other.n)
        if isinstance(other, Gerade):
            return self.rv.ist_orthogonal(other.rv)
        return self.rv.ist_orthogonal(other)

    @mit_weg
    def lage(self, other, **kw):
        """Die Lagebeziehung zu einer Geraden oder Ebene als Wort.

        Geraden: ``'identisch'``, ``'parallel'``, ``'schneidend'`` oder
        ``'windschief'``.  Ebenen: ``'in der Ebene'``, ``'parallel'`` oder
        ``'schneidend'``.
        """
        if isinstance(other, Ebene):
            return other.lage(self, **kw)
        if not isinstance(other, Gerade):
            raise EingabeFehler('Lage zu Geraden oder Ebenen')
        g, h = self, other
        par = g.rv.ist_kollinear(h.rv)
        schritte = [Schritt(_bez_oder(g.rv, 'u'), [g.rv]),
                    Schritt(_bez_oder(h.rv, 'v'), [h.rv])]
        if par:
            k = h.rv.faktor_zu(g.rv)
            schritte.append(hinweis('Die Richtungsvektoren sind Vielfache '
                                    '(Faktor %s) – die Geraden sind parallel.'
                                    % zahl_text(k)))
            probe = g.hat_punkt(h.stuetz, _weg=True)
            schritte += probe.schritte
            erg = 'identisch' if probe.ergebnis else 'parallel'
            schritte.append(hinweis('Die Geraden sind %s.' % erg))
        else:
            schritte.append(hinweis('Die Richtungsvektoren sind keine Vielfachen – '
                                    'gleichsetzen:'))
            lg = loese([g.rv, -h.rv], h.stuetz - g.stuetz, _weg=True)
            schritte += lg.schritte
            if lg.ergebnis.art == 'keine':
                erg = 'windschief'
                schritte.append(hinweis('Das Gleichungssystem ist unlösbar – '
                                        'die Geraden sind windschief.'))
            else:
                erg = 'schneidend'
                s = g.punkt(lg.ergebnis.werte[0])
                schritte.append(Schritt(Teil('S', 'S'), [s],
                                        hinweis='Die Geraden schneiden sich.'))
        return _ausgabe(Rechnung(erg, schritte, 'Lage zweier Geraden'), **_kw(kw))

    @mit_weg
    def schneide(self, other, **kw):
        """Schnitt mit Gerade, Ebene oder Punkt.

        Ergebnis: Punkt, Gerade (bei Identität), ``None`` (kein Schnitt).
        """
        if isinstance(other, Ebene):
            return other.schneide(self, **kw)
        if isinstance(other, Punkt) or (isinstance(other, Vektor) and
                                        not isinstance(other, Gerade)):
            p = _als_punkt(other)
            probe = self.hat_punkt(p, _weg=True)
            return _ausgabe(Rechnung(p if probe.ergebnis else None, probe.schritte,
                                     'Punktprobe'), **_kw(kw))
        if not isinstance(other, Gerade):
            raise EingabeFehler('Schnitt mit Geraden, Ebenen oder Punkten')
        g, h = self, other
        if g.rv.ist_kollinear(h.rv):
            if g.hat_punkt(h.stuetz):
                schritte = [hinweis('Die Geraden sind identisch – '
                                    'alle Punkte sind gemeinsam.')]
                return _ausgabe(Rechnung(g, schritte, 'Schnitt'), **_kw(kw))
            schritte = [hinweis('Die Geraden sind echt parallel – kein Schnittpunkt.')]
            return _ausgabe(Rechnung(None, schritte, 'Schnitt'), **_kw(kw))
        lg = loese([g.rv, -h.rv], h.stuetz - g.stuetz, _weg=True)
        schritte = [Schritt(Teil('Ansatz:', r'\text{Ansatz: }'),
                            [Ausdruck(g.stuetz, PLUS, Teil(g.variable), MAL, g.rv,
                                      Teil(' = ', '='), h.stuetz, PLUS,
                                      Teil(h.variable if h.variable != g.variable
                                           else 's'), MAL, h.rv)])]
        schritte += lg.schritte
        if lg.ergebnis.art == 'keine':
            schritte.append(hinweis('Unlösbar – die Geraden sind windschief.'))
            return _ausgabe(Rechnung(None, schritte, 'Schnitt'), **_kw(kw))
        t = lg.ergebnis.werte[0]
        s = g.punkt(t)
        schritte.append(Schritt(Teil('S', 'S'),
                                [Ausdruck(g.stuetz, PLUS, mal(t, g.rv)), s]))
        return _ausgabe(Rechnung(s, schritte, 'Schnittpunkt'), **_kw(kw))

    def __and__(self, other):
        return self.schneide(other)

    def __rand__(self, other):
        return self.schneide(other)

    # ---- Winkel, Abstände -------------------------------------------- #
    @mit_weg
    def winkel(self, other, **kw):
        """Schnittwinkel mit Gerade, Ebene oder Vektor (in Grad)."""
        return self.rv.winkel(other, kann_stumpf=False, **kw)

    @mit_weg
    def abstand(self, other, **kw):
        """Abstand zu Punkt, Gerade oder Ebene – exakt."""
        if isinstance(other, Ebene):
            return other.abstand(self, **kw)
        if isinstance(other, Gerade):
            return self._abstand_gerade(other, **kw)
        p = _als_punkt(other)
        ap = p - self.stuetz
        kp = ap.kreuz(self.rv) if self.dimension == 3 else None
        if self.dimension == 3:
            zaehler = kp.laenge()
            nenner = self.rv.laenge()
            erg = zaehler / nenner
            schritte = [hinweis('Abstand Punkt–Gerade: d = |AP × u| / |u|'),
                        Schritt(_bez_oder(ap, 'AP'),
                                [Ausdruck(p, Teil(' - ', '-'), self.stuetz), ap]),
                        ]
            schritte += _kreuz_zeilen(ap._koo, self.rv._koo, kp,
                                      links=Ausdruck(_bez_oder(ap, 'AP'), KREUZ,
                                                     _bez_oder(self.rv, 'u')))
            schritte.append(_s_laenge(kp, links=betrag(Ausdruck(
                _bez_oder(ap, 'AP'), KREUZ, _bez_oder(self.rv, 'u')))))
            schritte.append(_s_laenge(self.rv, links=betrag(_bez_oder(self.rv, 'u'))))
            schritte.append(Schritt(Teil('d'), [bruchteil(zaehler, nenner), erg] +
                                    ([('≈', gerundet(erg))] if not ist_ganz(erg) else [])))
            return _ausgabe(Rechnung(erg, schritte, 'Abstand Punkt–Gerade'), **_kw(kw))
        f = self.lotfusspunkt(p)
        erg = (p - f).laenge()
        return _ausgabe(Rechnung(erg, [Schritt(Teil('F'), [f]),
                                       _s_laenge(p - f, links=Teil('d'))],
                                 'Abstand Punkt–Gerade'), **_kw(kw))

    def _abstand_gerade(self, other, **kw):
        g, h = self, other
        if g.rv.ist_kollinear(h.rv):
            if g.hat_punkt(h.stuetz):
                return _ausgabe(Rechnung(Bruch(0), [hinweis(
                    'Die Geraden sind identisch – der Abstand ist 0.')],
                    'Abstand zweier Geraden'), **_kw(kw))
            r = g.abstand(h.stuetz, _weg=True)
            schritte = [hinweis('Die Geraden sind parallel – es genügt der '
                                'Abstand eines Punktes der einen Geraden.')]
            schritte += r.schritte
            return _ausgabe(Rechnung(r.ergebnis, schritte,
                                     'Abstand paralleler Geraden'), **_kw(kw))
        kp = g.rv.kreuz(h.rv)
        ab = h.stuetz - g.stuetz
        sk = kp.dot(ab)
        if sk == 0:
            return _ausgabe(Rechnung(Bruch(0), [hinweis(
                'Die Geraden schneiden sich – der Abstand ist 0.')],
                'Abstand zweier Geraden'), **_kw(kw))
        zaehler = abs(Q(sk)) if not isinstance(sk, Wurzel) else abs(sk)
        nenner = kp.laenge()
        erg = zaehler / nenner
        schritte = [hinweis('Windschiefe Geraden: d = |(u × v)·AB| / |u × v|')]
        schritte += _kreuz_zeilen(g.rv._koo, h.rv._koo, kp,
                                  links=Ausdruck(_bez_oder(g.rv, 'u'), KREUZ,
                                                 _bez_oder(h.rv, 'v')))
        schritte.append(Schritt(_bez_oder(ab, 'AB'),
                                [Ausdruck(h.stuetz, Teil(' - ', '-'), g.stuetz), ab]))
        schritte.append(_s_dot(kp, ab, sk, links=Ausdruck(
            klammer(Ausdruck(_bez_oder(g.rv, 'u'), KREUZ, _bez_oder(h.rv, 'v'))),
            MAL, _bez_oder(ab, 'AB'))))
        schritte.append(_s_laenge(kp, links=betrag(Ausdruck(
            _bez_oder(g.rv, 'u'), KREUZ, _bez_oder(h.rv, 'v')))))
        schritte.append(Schritt(Teil('d'), [bruchteil(zaehler, nenner), erg] +
                                ([('≈', gerundet(erg))] if not ist_ganz(erg) else [])))
        return _ausgabe(Rechnung(erg, schritte, 'Abstand windschiefer Geraden'),
                        **_kw(kw))

    @mit_weg
    def lotfusspunkt(self, other, **kw):
        """Der Fußpunkt des Lots von einem Punkt auf diese Gerade."""
        p = _als_punkt(other)
        ap = p - self.stuetz
        sk1 = ap.dot(self.rv)
        sk2 = self.rv.dot(self.rv)
        t = sk1 / sk2
        erg = self.stuetz + self.rv * t
        schritte = [hinweis('Ansatz: (P − X(%s)) · u = 0' % self.variable),
                    Schritt(_bez_oder(ap, 'AP'),
                            [Ausdruck(p, Teil(' - ', '-'), self.stuetz), ap]),
                    _s_dot(ap, self.rv, sk1, links=Ausdruck(
                        _bez_oder(ap, 'AP'), MAL, _bez_oder(self.rv, 'u'))),
                    _s_dot(self.rv, self.rv, sk2, links=Ausdruck(
                        _bez_oder(self.rv, 'u'), MAL, _bez_oder(self.rv, 'u'))),
                    Schritt(Teil(self.variable), [bruchteil(sk1, sk2), t]),
                    Schritt(Teil('F'), [Ausdruck(self.stuetz, PLUS,
                                                 mal(t, self.rv)), erg])]
        return _ausgabe(Rechnung(erg, schritte, 'Lotfußpunkt'), **_kw(kw))

    def lot_von(self, punkt):
        """Die Lotgerade von einem Punkt auf diese Gerade."""
        return _als_punkt(punkt).lot_auf(self)

    # ---- Rechnen mit Geraden ----------------------------------------- #
    def __add__(self, other):
        v = Vektor(other)
        if v.dimension != self.dimension:
            raise DimensionsFehler('Der Vektor passt nicht zur Geraden')
        return Gerade(self.stuetz + v, richtung=self.rv, name=self.name,
                      variable=self.variable)

    __radd__ = __add__

    def __sub__(self, other):
        return self.__add__(-Vektor(other))

    def __mul__(self, other):
        if not ist_zahl(other):
            return NotImplemented
        k = Q(other)
        if k == 0:
            raise GeometrieFehler('Der Richtungsvektor darf nicht 0 werden')
        return Gerade(self.stuetz, richtung=self.rv * k, name=self.name,
                      variable=self.variable)

    __rmul__ = __mul__

    def __truediv__(self, other):
        if not ist_zahl(other):
            return NotImplemented
        if Q(other) == 0:
            raise ZeroDivisionError('Division durch 0')
        return self.__mul__(Bruch(1) / Q(other))

    def __neg__(self):
        return Gerade(self.stuetz, richtung=-self.rv, name=self.name,
                      variable=self.variable)

    def __pos__(self):
        return self

    def __eq__(self, other):
        if not isinstance(other, Gerade):
            return NotImplemented
        if other.dimension != self.dimension:
            return False
        return self.ist_identisch(other)

    def __ne__(self, other):
        g = self.__eq__(other)
        return g if g is NotImplemented else not g

    def __hash__(self):
        return hash(('Gerade', tuple(self.rv.gekuerzt()._koo)))

    def __getitem__(self, i):
        """Die i-te Koordinatengleichung als Text: ``1 + 3r``."""
        return self._koordinate(i)

    def _koordinate(self, i, tex=False):
        p, rv = self.stuetz[i], self.rv[i]
        zahl = zahl_tex if tex else zahl_text
        v = self.variable
        if rv == 0:
            return zahl(p)
        kern = ('' if abs(Q(rv)) == 1 else zahl(abs(Q(rv)))) + v
        if p == 0:
            return ('-' if rv < 0 else '') + kern
        return '%s %s %s' % (zahl(p), '+' if rv > 0 else '-', kern)

    def __getattr__(self, name):
        if name.startswith('_'):
            raise AttributeError(name)
        if name in Gerade.namen:
            i = Gerade.namen[name]
            if i < self.dimension:
                return self[i]
            raise AttributeError('Es gibt keine %s-Koordinate' % name)
        raise AttributeError('Gerade hat kein Attribut »%s«' % name)

    # ---- Ausgabe ----------------------------------------------------- #
    def parameterform(self, mit_name=True, mit_menge=False, latex=False, **kw):
        """``g: x = (1|2|3) + r·(4|5|6)``"""
        if latex:
            return self.tex(mit_name=mit_name, mit_menge=mit_menge, **kw)
        vorn = '%s: ' % self.name if (mit_name and self.name) else ''
        s = '%sx = %s + %s·%s' % (vorn, self.stuetz.text(mit_name=False),
                                  self.variable, self.rv.text())
        if mit_menge:
            s += ',  %s ∈ ℝ' % self.variable
        return s

    def text(self, mit_name=True, **kw):
        return self.parameterform(mit_name=mit_name, **kw)

    def tex(self, mit_name=True, mit_menge=False, spalten=None, kurz=None):
        vorn = '%s\\colon\\; ' % self.name if (mit_name and self.name) else ''
        s = r'%s\vec x = %s + %s\cdot %s' % (
            vorn, self.stuetz.ortsvektor.tex(spalten=spalten, kurz=kurz, mit_name=False),
            self.variable, self.rv.tex(spalten=spalten, kurz=kurz))
        if mit_menge:
            s += r',\; %s\in\mathbb{R}' % self.variable
        return s

    latex = tex

    def __str__(self):
        return self.parameterform()

    def __repr__(self):
        return self.parameterform()

    def _repr_latex_(self):
        return '$%s$' % self.tex()

    # ---- Bild -------------------------------------------------------- #
    def seitentext(self, name=None):
        nm = name or self.name or ''
        kern = 'Gerade(%s; %s)' % (_koo_text(self.stuetz._koo),
                                   _koo_text(self.rv._koo))
        return _zeile(nm, kern, self._opt)

    def zeige(self, *weitere, **kw):
        return zeige(self, *weitere, **kw)

    def zeichnen(self, voll_link=True, dim=3, oeffnen=False, **kw):
        l = link(self, **kw)
        if oeffnen:
            l.oeffnen()
        return str(l)


def _als_punkt(x):
    """Macht aus (1|2|3), [1,2,3], Vektor oder Punkt einen Punkt."""
    if isinstance(x, Punkt):
        return x
    if isinstance(x, Vektor):
        return Punkt(list(x._koo), name=x.name if len(x.name or '') <= 2 else '')
    return Punkt(x)
# ====================================================================== #
# 10) Ebene                                                              #
# ====================================================================== #

class Ebene(object):
    """Eine Ebene – intern immer über Stützpunkt und Normalenvektor.

    ::

        Ebene(A, B, C)                          durch drei Punkte
        Ebene(A, n=(2|3|4))                     Normalenform
        Ebene(A, rv1=(1|0|0), rv2=(0|1|0))      Parameterform
        Ebene("E: 2x + 3y + 4z = 12")           Koordinatenform als Text
        Ebene("[x - (1|2|3)]*(2|3|4) = 0")      Normalenform als Text

    ``E.form`` merkt sich, in welcher Form die Ebene ausgegeben wird
    (``'KF'``, ``'NF'`` oder ``'PF'``).
    """

    def __init__(self, *args, **kwargs):
        name = kwargs.pop('name', None)
        form = kwargs.pop('form', None)
        opt = kwargs.pop('opt', None)
        n = _erstes(kwargs, 'n', 'nv', 'normale', 'normalenvektor')
        rv1 = _erstes(kwargs, 'rv1', 'richtung1', 'spann1', 'u')
        rv2 = _erstes(kwargs, 'rv2', 'richtung2', 'spann2', 'v')
        sv = _erstes(kwargs, 'sv', 'start', 'stuetz', 'stuetzpunkt', 'p')
        d = _erstes(kwargs, 'd')
        if kwargs:
            raise EingabeFehler('unbekannte Angabe: %s' % ', '.join(kwargs))
        args = list(args)
        if len(args) == 1 and isinstance(args[0], str):
            e = lese(args[0])
            if not isinstance(e, Ebene):
                raise EingabeFehler('»%s« ist keine Ebenengleichung' % args[0])
            args = []
            sv, n = e.stuetz, e.n
            name = name or e.name
            form = form or e.form
        if len(args) == 1 and isinstance(args[0], Ebene):
            e = args[0]
            args = []
            sv, n = e.stuetz, e.n
            rv1, rv2 = e._rv1, e._rv2
            name = name or e.name
            form = form or e.form
        if args and sv is None:
            sv = args.pop(0)
        if len(args) == 2:
            # drei Punkte (so wie Ebene(A, B, C))
            A = _als_punkt(sv)
            B, C = _als_punkt(args[0]), _als_punkt(args[1])
            rv1, rv2 = B - A, C - A
            if rv1.ist_kollinear(rv2):
                raise GeometrieFehler('Die drei Punkte liegen auf einer Geraden')
            sv = A
            form = form or 'PF'
            args = []
        elif len(args) == 1:
            if rv1 is None:
                rv1 = args.pop(0)
            else:
                rv2 = args.pop(0)
        if args:
            raise EingabeFehler('zu viele Angaben für eine Ebene')
        if sv is None and n is not None and d is not None:
            sv = _stuetz_aus_kf(Vektor(n), Q(d))
        if sv is None:
            raise EingabeFehler('Stützpunkt (oder Normale und d) angeben')
        self.stuetz = _als_punkt(sv)
        if n is not None:
            self.n = Vektor(n)
            self._rv1 = Vektor(rv1) if rv1 is not None else None
            self._rv2 = Vektor(rv2) if rv2 is not None else None
            self.form = form or 'KF'
        else:
            if rv1 is None or rv2 is None:
                raise EingabeFehler('Zwei Spannvektoren oder einen '
                                    'Normalenvektor angeben')
            self._rv1 = Vektor(rv1)
            self._rv2 = Vektor(rv2)
            if self._rv1.ist_kollinear(self._rv2):
                raise GeometrieFehler('Die Spannvektoren sind parallel')
            self.n = self._rv1.kreuz(self._rv2).gekuerzt()
            self.form = form or 'PF'
        if self.n.ist_nullvektor():
            raise GeometrieFehler('Der Normalenvektor darf nicht 0 sein')
        self.name = name
        self._opt = dict(opt) if opt else {}
        self.variable1 = 'r'
        self.variable2 = 's'

    # ---- Bauen ------------------------------------------------------- #
    @classmethod
    def aus_punkten(cls, A, B, C, name=None):
        """Ebene durch drei Punkte."""
        return cls(A, B, C, name=name, form='PF')

    @classmethod
    def aus_parameterform(cls, stuetz, rv1, rv2, name=None):
        return cls(stuetz, rv1=rv1, rv2=rv2, name=name, form='PF')

    @classmethod
    def aus_normalenform(cls, stuetz, n, name=None):
        return cls(stuetz, n=n, name=name, form='NF')

    @classmethod
    def aus_koordinatenform(cls, koeffizienten, d=None, name=None):
        """``Ebene.aus_koordinatenform([2,3,4], 12)`` oder mit Text."""
        if isinstance(koeffizienten, str):
            nm, koef, dd = koordinatenform_lesen(koeffizienten)
            return cls(_stuetz_aus_kf(Vektor(koef), dd), n=koef,
                       name=name or nm, form='KF')
        n = Vektor(koeffizienten)
        d = Q(0 if d is None else d)
        return cls(_stuetz_aus_kf(n, d), n=n, name=name, form='KF')

    def kopie(self, name=None):
        e = Ebene(self.stuetz, n=self.n, rv1=self._rv1, rv2=self._rv2,
                  name=self.name if name is None else name, form=self.form,
                  opt=self._opt)
        return e

    copy = kopie

    def benannt(self, name):
        return self.kopie(name=name)

    def aussehen(self, **opt):
        neu = self.kopie()
        neu._opt.update(opt)
        return neu

    def als_form(self, form):
        """Dieselbe Ebene, aber in anderer Ausgabeform ('KF', 'NF', 'PF')."""
        if form not in ('KF', 'NF', 'PF'):
            raise EingabeFehler("form ist 'KF', 'NF' oder 'PF'")
        neu = self.kopie()
        neu.form = form
        return neu

    # ---- Zugriff ----------------------------------------------------- #
    @property
    def d(self):
        """Die rechte Seite der Koordinatenform ``n·x = d``."""
        return self.n.dot(self.stuetz.ortsvektor)

    @property
    def normale(self):
        return self.n

    @property
    def sv(self):
        return self.stuetz

    @property
    def rv1(self):
        """Erster Spannvektor (wird notfalls aus der Normale bestimmt)."""
        if self._rv1 is None:
            self._rv1, self._rv2 = _spannvektoren(self.n)
        return self._rv1

    @property
    def rv2(self):
        if self._rv2 is None:
            if self._rv1 is None:
                self._rv1, self._rv2 = _spannvektoren(self.n)
            else:
                self._rv2 = self.n.kreuz(self._rv1).gekuerzt()
        return self._rv2

    @property
    def dimension(self):
        return self.n.dimension

    @property
    def weg(self):
        return Weg(self)

    def gekuerzt(self):
        """Mit möglichst kleinem ganzzahligem Normalenvektor."""
        neu = self.kopie()
        neu.n = self.n.gekuerzt()
        return neu

    def punkt(self, r=0, s=0):
        """Ein Punkt der Ebene zu den beiden Parametern."""
        return self.stuetz + self.rv1 * Q(r) + self.rv2 * Q(s)

    # ---- Punktprobe und Lage ----------------------------------------- #
    @mit_weg
    def hat_punkt(self, other, **kw):
        """Liegt der Punkt in der Ebene?"""
        p = _als_punkt(other)
        links = self.n.dot(p.ortsvektor)
        erg = (links == self.d)
        schritte = [hinweis('Punktprobe in der Koordinatenform:'),
                    Schritt(Teil(self._kf_links(), self._kf_links(tex=True)),
                            [summe(*[mal(self.n[i], p[i])
                                     for i in range(self.dimension)]),
                             links]),
                    hinweis('Rechte Seite: %s – der Punkt liegt %sin der Ebene.'
                            % (zahl_text(self.d), '' if erg else 'nicht '))]
        return _ausgabe(Rechnung(erg, schritte, 'Punktprobe'), **_kw(kw))

    def __contains__(self, other):
        if isinstance(other, Gerade):
            return self.hat_punkt(other.stuetz) and other.rv.ist_orthogonal(self.n)
        return self.hat_punkt(other)

    def ist_parallel(self, other):
        """Parallel zu Ebene, Gerade oder Vektor."""
        if isinstance(other, Ebene):
            return self.n.ist_kollinear(other.n)
        if isinstance(other, Gerade):
            return self.n.ist_orthogonal(other.rv)
        return self.n.ist_orthogonal(other)

    def ist_echt_parallel(self, other):
        return self.ist_parallel(other) and not self.ist_identisch(other)

    def ist_identisch(self, other):
        if isinstance(other, Ebene):
            return self.n.ist_kollinear(other.n) and self.hat_punkt(other.stuetz)
        if isinstance(other, Gerade):
            return other in self
        return False

    def ist_orthogonal(self, other):
        if isinstance(other, Ebene):
            return self.n.ist_orthogonal(other.n)
        if isinstance(other, Gerade):
            return self.n.ist_kollinear(other.rv)
        return self.n.ist_kollinear(other)

    @mit_weg
    def lage(self, other, **kw):
        """Lagebeziehung zu einer Geraden oder Ebene (als Wort)."""
        if isinstance(other, Gerade):
            g = other
            sk = self.n.dot(g.rv)
            schritte = [_s_dot(self.n, g.rv, sk,
                               links=Ausdruck(_bez_oder(self.n, 'n'), MAL,
                                              _bez_oder(g.rv, 'u')))]
            if sk == 0:
                probe = self.hat_punkt(g.stuetz, _weg=True)
                schritte.append(hinweis('Das Skalarprodukt ist 0 – die Gerade '
                                        'ist parallel zur Ebene.'))
                schritte += probe.schritte
                erg = 'in der Ebene' if probe.ergebnis else 'parallel'
            else:
                schritte.append(hinweis('Das Skalarprodukt ist nicht 0 – '
                                        'die Gerade schneidet die Ebene.'))
                erg = 'schneidend'
            return _ausgabe(Rechnung(erg, schritte, 'Lage Gerade–Ebene'), **_kw(kw))
        if isinstance(other, Ebene):
            kol = self.n.ist_kollinear(other.n, _weg=True)
            schritte = list(kol.schritte)
            if kol.ergebnis:
                probe = self.hat_punkt(other.stuetz, _weg=True)
                schritte += probe.schritte
                erg = 'identisch' if probe.ergebnis else 'parallel'
                schritte.append(hinweis('Die Ebenen sind %s.' % erg))
            else:
                erg = 'schneidend'
                schritte.append(hinweis('Die Normalenvektoren sind nicht parallel – '
                                        'die Ebenen schneiden sich in einer Geraden.'))
            return _ausgabe(Rechnung(erg, schritte, 'Lage zweier Ebenen'), **_kw(kw))
        raise EingabeFehler('Lage zu Geraden oder Ebenen')

    # ---- Schnitte ---------------------------------------------------- #
    @mit_weg
    def schneide(self, other, **kw):
        """Schnitt mit Gerade, Ebene oder Punkt."""
        if isinstance(other, Gerade):
            return self._schnitt_gerade(other, **kw)
        if isinstance(other, Ebene):
            return self._schnitt_ebene(other, **kw)
        p = _als_punkt(other)
        probe = self.hat_punkt(p, _weg=True)
        return _ausgabe(Rechnung(p if probe.ergebnis else None, probe.schritte,
                                 'Punktprobe'), **_kw(kw))

    def _schnitt_gerade(self, g, **kw):
        sk = self.n.dot(g.rv)
        if sk == 0:
            if self.hat_punkt(g.stuetz):
                return _ausgabe(Rechnung(g, [hinweis(
                    'Die Gerade liegt in der Ebene.')], 'Schnitt'), **_kw(kw))
            return _ausgabe(Rechnung(None, [hinweis(
                'Die Gerade ist echt parallel zur Ebene – kein Schnittpunkt.')],
                'Schnitt'), **_kw(kw))
        # n·(p + t·u) = d
        sk0 = self.n.dot(g.stuetz.ortsvektor)
        t = (self.d - sk0) / sk
        erg = g.punkt(t)
        v = g.variable
        zeilen, ztex = [], []
        for i in range(self.dimension):
            if self.n[i] == 0:
                continue
            c = zahl_text(self.n[i])
            cx = zahl_tex(self.n[i])
            kern, kernx = g._koordinate(i), g._koordinate(i, tex=True)
            if _atom(kern):
                zeilen.append('%s·%s' % (c, kern))
                ztex.append(r'%s\cdot %s' % (cx, kernx))
            else:
                zeilen.append('%s·(%s)' % (c, kern))
                ztex.append(r'%s\cdot\left(%s\right)' % (cx, kernx))
        links2 = '%s%s' % (zahl_text(sk) if sk != 1 else '', v)
        links2x = '%s%s' % (zahl_tex(sk) if sk != 1 else '', v)
        if sk0 != 0:
            links2 += ' %s %s' % ('+' if sk0 > 0 else '-',
                                  zahl_text(abs(Q(sk0))))
            links2x += ' %s %s' % ('+' if sk0 > 0 else '-',
                                   zahl_tex(abs(Q(sk0))))
        schritte = [hinweis('Geradengleichung in die Koordinatenform einsetzen:'),
                    Schritt(Teil(' + '.join(zeilen), ' + '.join(ztex)), [self.d]),
                    Schritt(Teil(links2, links2x), [self.d]),
                    Schritt(Teil(v), [bruchteil(self.d - sk0, sk), t]),
                    Schritt(Teil('S'), [Ausdruck(g.stuetz, PLUS, mal(t, g.rv)), erg])]
        return _ausgabe(Rechnung(erg, schritte, 'Schnittpunkt Gerade–Ebene'),
                        **_kw(kw))

    def _schnitt_ebene(self, other, **kw):
        if self.n.ist_kollinear(other.n):
            if self.hat_punkt(other.stuetz):
                return _ausgabe(Rechnung(self, [hinweis(
                    'Die Ebenen sind identisch.')], 'Schnitt'), **_kw(kw))
            return _ausgabe(Rechnung(None, [hinweis(
                'Die Ebenen sind echt parallel – keine Schnittgerade.')],
                'Schnitt'), **_kw(kw))
        u = self.n.kreuz(other.n).gekuerzt()
        # eine Koordinate auf 0 setzen, die übrigen zwei bestimmen
        i = next(k for k in range(3) if u[k] != 0)
        rest = [k for k in range(3) if k != i]
        spalten = [Vektor(self.n[k], other.n[k]) for k in rest]
        lg = loese(spalten, Vektor(self.d, other.d),
                   namen=['xyz'[k] for k in rest], _weg=True)
        werte = lg.ergebnis.werte if lg.ergebnis.art == 'eindeutig' else \
            (lg.ergebnis.spezial if lg.ergebnis.art == 'unendlich' else None)
        koo = [Bruch(0)] * 3
        for nr, k in enumerate(rest):
            koo[k] = werte[nr]
        p = Punkt(koo)
        erg = Gerade(p, richtung=u, name='s')
        schritte = [hinweis('Richtungsvektor der Schnittgeraden: n₁ × n₂')]
        schritte += _kreuz_zeilen(self.n._koo, other.n._koo, u,
                                  links=Ausdruck(Teil('n₁', 'n_1'), KREUZ,
                                                 Teil('n₂', 'n_2')))
        schritte.append(hinweis('Ein gemeinsamer Punkt: %s = 0 setzen und das '
                                'Gleichungssystem der beiden Koordinatenformen '
                                'lösen.' % 'xyz'[i]))
        schritte += lg.schritte
        schritte.append(Schritt(None, [Teil(erg.parameterform(),
                                            erg.tex())]))
        return _ausgabe(Rechnung(erg, schritte, 'Schnittgerade zweier Ebenen'),
                        **_kw(kw))

    def __and__(self, other):
        return self.schneide(other)

    def __rand__(self, other):
        return self.schneide(other)

    # ---- Abstände, Lote, Winkel -------------------------------------- #
    @mit_weg
    def abstand(self, other, **kw):
        """Abstand zu Punkt, Gerade oder Ebene – exakt (Hesse)."""
        if isinstance(other, Gerade):
            if not self.n.ist_orthogonal(other.rv):
                return _ausgabe(Rechnung(Bruch(0), [hinweis(
                    'Die Gerade schneidet die Ebene – der Abstand ist 0.')],
                    'Abstand Gerade–Ebene'), **_kw(kw))
            r = self.abstand(other.stuetz, _weg=True)
            schritte = [hinweis('Die Gerade ist parallel zur Ebene – es genügt '
                                'der Abstand ihres Stützpunktes.')] + r.schritte
            return _ausgabe(Rechnung(r.ergebnis, schritte,
                                     'Abstand Gerade–Ebene'), **_kw(kw))
        if isinstance(other, Ebene):
            if not self.n.ist_kollinear(other.n):
                return _ausgabe(Rechnung(Bruch(0), [hinweis(
                    'Die Ebenen schneiden sich – der Abstand ist 0.')],
                    'Abstand zweier Ebenen'), **_kw(kw))
            r = self.abstand(other.stuetz, _weg=True)
            schritte = [hinweis('Die Ebenen sind parallel – es genügt der '
                                'Abstand eines Punktes der zweiten Ebene.')] \
                + r.schritte
            return _ausgabe(Rechnung(r.ergebnis, schritte,
                                     'Abstand zweier Ebenen'), **_kw(kw))
        p = _als_punkt(other)
        np_ = self.n.dot(p.ortsvektor)
        L = self.n.laenge()
        zaehler = np_ - self.d
        erg = (abs(Q(zaehler)) if not isinstance(zaehler, Wurzel)
               else abs(zaehler)) / L
        schritte = [hinweis('Hesse’sche Normalform: d = |n·x − %s| / |n|'
                            % zahl_text(self.d)),
                    _s_laenge(self.n, links=betrag(_bez_oder(self.n, 'n'))),
                    Schritt(Teil('d'),
                            [bruchteil(betrag(Ausdruck(
                                summe(*[mal(self.n[i], p[i])
                                        for i in range(self.dimension)]),
                                Teil(' - ', '-'), self.d)), L),
                             bruchteil(betrag(zaehler), L),
                             erg] + ([('≈', gerundet(erg))]
                                     if not ist_ganz(erg) else []))]
        return _ausgabe(Rechnung(erg, schritte, 'Abstand Punkt–Ebene'), **_kw(kw))

    @mit_weg
    def lotfusspunkt(self, other, **kw):
        """Der Fußpunkt des Lots von einem Punkt auf die Ebene."""
        p = _als_punkt(other)
        np_ = self.n.dot(p.ortsvektor)
        nn = self.n.dot(self.n)
        t = (self.d - np_) / nn
        erg = p + self.n * t
        schritte = [hinweis('Lotgerade: x = P + t·n, dann in die '
                            'Koordinatenform einsetzen.'),
                    _s_dot(self.n, p.ortsvektor, np_,
                           links=Ausdruck(_bez_oder(self.n, 'n'), MAL,
                                          Teil('OP', r'\overrightarrow{OP}'))),
                    _s_dot(self.n, self.n, nn,
                           links=Ausdruck(_bez_oder(self.n, 'n'), MAL,
                                          _bez_oder(self.n, 'n'))),
                    Schritt(Teil('t'), [bruchteil(Ausdruck(
                        self.d, Teil(' - ', '-'), np_) if np_ != 0 else self.d,
                        nn), t]),
                    Schritt(Teil('F'), [Ausdruck(p, PLUS, mal(t, self.n)), erg])]
        return _ausgabe(Rechnung(erg, schritte, 'Lotfußpunkt'), **_kw(kw))

    def lot_von(self, punkt):
        """Die Lotgerade von einem Punkt auf die Ebene."""
        return _als_punkt(punkt).lot_auf(self)

    @mit_weg
    def spiegeln(self, other, **kw):
        """Spiegelt einen Punkt an der Ebene."""
        p = _als_punkt(other)
        return p.spiegeln(self, **kw)

    @mit_weg
    def winkel(self, other, **kw):
        """Winkel zu Gerade, Ebene oder Vektor (in Grad)."""
        if isinstance(other, Ebene):
            return self.n.winkel(other.n, kann_stumpf=False, **kw)
        if isinstance(other, Gerade):
            return self.n.winkel(other.rv, kann_stumpf=False,
                                 gegenwinkel=True, **kw)
        return self.n.winkel(Vektor(other), kann_stumpf=False,
                             gegenwinkel=True, **kw)

    def spurpunkte(self):
        """Die Schnittpunkte mit den Koordinatenachsen (oder None)."""
        raus = {}
        for i, k in enumerate('xyz'[:self.dimension]):
            if self.n[i] == 0:
                raus[k] = None
            else:
                koo = [Bruch(0)] * self.dimension
                koo[i] = self.d / self.n[i]
                raus[k] = Punkt(koo)
        return raus

    def spurgeraden(self):
        """Die Schnittgeraden mit den Koordinatenebenen (oder None)."""
        raus = {}
        for schluessel, i in (('xy', 2), ('xz', 1), ('yz', 0)):
            koo = [Bruch(0)] * 3
            koo[i] = Bruch(1)
            ebene = Ebene.aus_koordinatenform(koo, 0)
            raus[schluessel] = self.schneide(ebene)
        return raus

    # ---- Rechnen ----------------------------------------------------- #
    def __add__(self, other):
        v = Vektor(other)
        return Ebene(self.stuetz + v, n=self.n, rv1=self._rv1, rv2=self._rv2,
                     name=self.name, form=self.form)

    __radd__ = __add__

    def __sub__(self, other):
        return self.__add__(-Vektor(other))

    def __eq__(self, other):
        if not isinstance(other, Ebene):
            return NotImplemented
        return self.ist_identisch(other)

    def __ne__(self, other):
        g = self.__eq__(other)
        return g if g is NotImplemented else not g

    def __hash__(self):
        n = self.n.gekuerzt()
        return hash(('Ebene', tuple(n._koo)))

    # ---- Ausgabe ----------------------------------------------------- #
    def _kf_links(self, tex=False):
        teile = []
        namen = 'xyz'[:self.dimension]
        for i, k in enumerate(namen):
            c = self.n[i]
            if c == 0:
                continue
            vz = '-' if c < 0 else ('+' if teile else '')
            betrag_c = abs(Q(c)) if not isinstance(c, Wurzel) else abs(c)
            cs = '' if betrag_c == 1 else (zahl_tex(betrag_c) if tex
                                           else zahl_text(betrag_c))
            if teile:
                teile.append(' %s ' % vz)
            elif vz:
                teile.append(vz)
            teile.append('%s%s' % (cs, k))
        return ''.join(teile) if teile else '0'

    def koordinatenform(self, mit_name=True, latex=False, **kw):
        """``E: 2x + 3y + 4z = 12``"""
        if latex:
            return self.tex(form='KF', mit_name=mit_name, **kw)
        vorn = '%s: ' % self.name if (mit_name and self.name) else ''
        return '%s%s = %s' % (vorn, self._kf_links(), zahl_text(self.d))

    def normalenform(self, mit_name=True, latex=False, **kw):
        """``E: [x - (1|2|3)]·(2|3|4) = 0``"""
        if latex:
            return self.tex(form='NF', mit_name=mit_name, **kw)
        vorn = '%s: ' % self.name if (mit_name and self.name) else ''
        return '%s[x - %s]·%s = 0' % (vorn, self.stuetz.text(mit_name=False),
                                      self.n.text())

    def parameterform(self, mit_name=True, mit_menge=False, latex=False, **kw):
        """``E: x = (1|2|3) + r·(1|0|0) + s·(0|1|0)``"""
        if latex:
            return self.tex(form='PF', mit_name=mit_name, mit_menge=mit_menge, **kw)
        vorn = '%s: ' % self.name if (mit_name and self.name) else ''
        s = '%sx = %s + %s·%s + %s·%s' % (
            vorn, self.stuetz.text(mit_name=False), self.variable1,
            self.rv1.text(), self.variable2, self.rv2.text())
        if mit_menge:
            s += ',  %s, %s ∈ ℝ' % (self.variable1, self.variable2)
        return s

    def hessesche_normalform(self, mit_name=True, latex=False, **kw):
        """Die Hesse'sche Normalform (Koordinatenform durch |n|)."""
        if latex:
            return self.tex(form='HNF', mit_name=mit_name, **kw)
        vorn = '%s: ' % self.name if (mit_name and self.name) else ''
        L = self.n.laenge()
        return '%s(%s - %s) / %s = 0' % (vorn, self._kf_links(),
                                         zahl_text(self.d), zahl_text(L))

    hesse = hessesche_normalform

    def text(self, form=None, mit_name=True, latex=False, **kw):
        if latex:
            return self.tex(form=form, mit_name=mit_name, **kw)
        f = form or self.form
        if f == 'PF':
            return self.parameterform(mit_name=mit_name, **kw)
        if f == 'NF':
            return self.normalenform(mit_name=mit_name)
        if f == 'HNF':
            return self.hessesche_normalform(mit_name=mit_name)
        return self.koordinatenform(mit_name=mit_name)

    def tex(self, form=None, mit_name=True, mit_menge=False, spalten=None,
            kurz=None):
        f = form or self.form
        vorn = '%s\\colon\\; ' % self.name if (mit_name and self.name) else ''
        if f == 'PF':
            s = r'%s\vec x = %s + %s\cdot %s + %s\cdot %s' % (
                vorn, self.stuetz.ortsvektor.tex(spalten=spalten, kurz=kurz, mit_name=False), self.variable1,
                self.rv1.tex(spalten=spalten, kurz=kurz), self.variable2,
                self.rv2.tex(spalten=spalten, kurz=kurz))
            if mit_menge:
                s += r',\; %s,%s\in\mathbb{R}' % (self.variable1, self.variable2)
            return s
        if f == 'NF':
            return r'%s\left[\vec x - %s\right]\cdot %s = 0' % (
                vorn, self.stuetz.ortsvektor.tex(spalten=spalten, kurz=kurz, mit_name=False),
                self.n.tex(spalten=spalten, kurz=kurz))
        if f == 'HNF':
            return r'%s\frac{%s - %s}{%s} = 0' % (
                vorn, self._kf_links(tex=True), zahl_tex(self.d),
                zahl_tex(self.n.laenge()))
        return '%s%s = %s' % (vorn, self._kf_links(tex=True), zahl_tex(self.d))

    latex = tex

    def __str__(self):
        return self.text()

    def __repr__(self):
        return self.text()

    def _repr_latex_(self):
        return '$%s$' % self.tex()

    # ---- Bild -------------------------------------------------------- #
    def kf_ganzzahlig(self):
        """Dieselbe Ebene mit ganzzahliger Koordinatenform: ``(n, d)``."""
        werte = list(self.n._koo) + [self.d]
        if any(isinstance(w, Wurzel) for w in werte):
            return self.n, self.d
        f = kgv(*[Q(w).denominator for w in werte])
        n = Vektor([Q(w) * f for w in self.n._koo])
        d = Q(self.d) * f
        g = ggt(*(list(n._koo) + [d]))
        if g != 0 and g != 1:
            n = Vektor([w / g for w in n._koo])
            d = d / g
        if sum(1 for w in n if w < 0) > sum(1 for w in n if w > 0):
            n, d = Vektor([-w for w in n._koo]), -d
        return n, d

    def seitentext(self, name=None):
        nm = name or self.name or ''
        if self.form == 'PF' and self._rv1 is not None and self._rv2 is not None:
            kern = 'Ebene(%s; %s; %s)' % (_koo_text(self.stuetz._koo),
                                          _koo_text(self._rv1._koo),
                                          _koo_text(self._rv2._koo))
        elif self.form == 'NF':
            kern = 'Ebene(%s; %s)' % (_koo_text(self.stuetz._koo),
                                      _koo_text(self.n._koo))
        else:
            n, d = self.kf_ganzzahlig()
            kf = Ebene(_stuetz_aus_kf(n, d), n=n, form='KF')
            kern = 'Ebene(%s)' % kf.koordinatenform(mit_name=False).replace(
                '·', '*').replace(' ', '')
        return _zeile(nm, kern, self._opt)

    def zeige(self, *weitere, **kw):
        return zeige(self, *weitere, **kw)

    def zeichnen(self, voll_link=True, dim=3, oeffnen=False, **kw):
        l = link(self, **kw)
        if oeffnen:
            l.oeffnen()
        return str(l)


def _erstes(kwargs, *namen):
    """Holt den ersten vorhandenen Schlüsselwortwert (und entfernt alle)."""
    wert = None
    for n in namen:
        if n in kwargs:
            w = kwargs.pop(n)
            if wert is None:
                wert = w
    return wert


def _spannvektoren(n):
    """Zwei möglichst einfache Vektoren, die auf n senkrecht stehen."""
    kandidaten = []
    for i in range(3):
        j = (i + 1) % 3
        if n[i] != 0 or n[j] != 0:
            koo = [Bruch(0)] * 3
            koo[i] = -n[j]
            koo[j] = n[i]
            v = Vektor(koo)
            if not v.ist_nullvektor():
                kandidaten.append(v.gekuerzt())
    if not kandidaten:
        raise GeometrieFehler('Der Normalenvektor darf nicht 0 sein')
    erster = kandidaten[0]
    for v in kandidaten[1:]:
        if not v.ist_kollinear(erster):
            return erster, v
    return erster, n.kreuz(erster).gekuerzt()


def _stuetz_aus_kf(n, d):
    """Irgendein Punkt der Ebene n·x = d."""
    for i in range(n.dimension):
        if n[i] != 0:
            koo = [Bruch(0)] * n.dimension
            koo[i] = Q(d) / n[i]
            return Punkt(koo)
    raise GeometrieFehler('Der Normalenvektor darf nicht 0 sein')
# ====================================================================== #
# 11) Bild: Ausgabe über analytische_geometrie.html                      #
# ====================================================================== #

_SEITE_DATEI = 'analytische_geometrie.html'

# Welche Parameter der Visualisierungsseite man mitgeben darf
_SEITEN_PARAMETER = {
    'ansicht': ('v', {'2d': '2d', '3d': '3d', 'schraegbild': '2d'}),
    'eingabe': ('ed', {'liste': 'liste', 'text': 'text'}),
    'zahlen': ('nf', {'auto': 'auto', 'bruch': 'bruch', 'dezimal': 'dez',
                      'dez': 'dez'}),
    'stellen': ('nd', None),
    'achsen': ('an', None),
    'projektion': ('pj', None),
}


def seite(pfad=None):
    """Legt die Visualisierungsseite fest oder gibt sie zurück.

    Ohne Angabe wird ``analytische_geometrie.html`` neben ``vektor.py``
    gesucht, sonst im aktuellen Ordner.
    """
    if pfad is not None:
        STIL.seite = pfad
        return STIL.seite
    if STIL.seite:
        return STIL.seite
    hier = os.path.dirname(os.path.abspath(__file__))
    for kandidat in (os.path.join(hier, _SEITE_DATEI),
                     os.path.abspath(_SEITE_DATEI)):
        if os.path.exists(kandidat):
            return kandidat
    return _SEITE_DATEI


def _basis_adresse():
    p = seite()
    if re.match(r'^(https?|file)://', str(p)):
        return p
    p = os.path.abspath(p)
    try:
        import pathlib
        return pathlib.Path(p).as_uri()
    except Exception:
        from urllib.request import pathname2url
        return 'file:' + pathname2url(p)


class Link(object):
    """Eine Adresse der Visualisierungsseite – mit ``.oeffnen()``."""

    __slots__ = ('url', 'text')

    def __init__(self, url, text=''):
        self.url = url
        self.text = text

    def oeffnen(self):
        """Öffnet die Seite im Browser."""
        import webbrowser
        try:
            if webbrowser.open(self.url):
                return self
        except Exception:
            pass
        try:                                  # Windows ohne Standardbrowser
            os.startfile(self.url)            # pylint: disable=no-member
        except Exception:
            print('Konnte den Browser nicht öffnen. Adresse:\n%s' % self.url)
        return self

    anzeigen = oeffnen

    def __str__(self):
        return self.url

    def __repr__(self):
        return self.url

    def _repr_html_(self):
        return '<a href="%s" target="_blank">Bild in analytische_geometrie.html ' \
               '\u00f6ffnen</a><pre style="margin-top:4px">%s</pre>' \
               % (self.url, self.text)


_AUTONAMEN = {'Punkt': list('ABCDPQRS'), 'Vektor': list('abcuvw'),
              'Gerade': list('ghkl'), 'Ebene': list('EFGH')}


def seitentext(*objekte, **kw):
    """Die Zeilen für die Textansicht von analytische_geometrie.html.

    ``zeige`` und ``link`` benutzen dieselbe Funktion; so kann man den Text
    auch einfach in die Seite kopieren.
    """
    namen = dict(kw.pop('namen', {}) or {})
    if kw:
        raise EingabeFehler('unbekannte Angabe: %s' % ', '.join(kw))
    flach = []
    for o in objekte:
        if isinstance(o, (list, tuple, set)):
            flach.extend(o)
        elif isinstance(o, dict):
            for n, v in o.items():
                namen[id(v)] = n
                flach.append(v)
        else:
            flach.append(o)
    vergeben = set()
    for o in flach:
        n = getattr(o, 'name', None)
        if n:
            vergeben.add(n)
    zaehler = {}
    zeilen = []
    for o in flach:
        if isinstance(o, str):
            zeilen.append(o)
            continue
        if isinstance(o, Rechnung):
            o = o.ergebnis
        if isinstance(o, Loesung):
            o = o.spezial if o.spezial is not None else None
        if o is None:
            continue
        if not hasattr(o, 'seitentext'):
            raise EingabeFehler('%r lässt sich nicht zeichnen' % (o,))
        name = namen.get(id(o)) or getattr(o, 'name', '') or ''
        if not name:
            name = _variablenname(o) or ''
            if name in vergeben:
                name = ''
        if not name:
            art = type(o).__name__
            vorrat = _AUTONAMEN.get(art, list('pqrstu'))
            i = zaehler.get(art, 0)
            while i < len(vorrat) and vorrat[i] in vergeben:
                i += 1
            if i < len(vorrat):
                name = vorrat[i]
                zaehler[art] = i + 1
        if name:
            vergeben.add(name)
        zeilen.append(o.seitentext(name=name))
    return '\n'.join(zeilen)


def link(*objekte, **kw):
    """Die Adresse der Visualisierungsseite mit diesen Objekten.

    Zusätzliche Einstellungen der Seite sind möglich::

        link(A, g, E, eingabe='text', zahlen='bruch')
    """
    namen = kw.pop('namen', None)
    parameter = dict(kw.pop('parameter', {}) or {})
    for k in list(kw):
        if k in _SEITEN_PARAMETER:
            par, werte = _SEITEN_PARAMETER[k]
            v = kw.pop(k)
            if werte:
                if str(v) not in werte:
                    raise EingabeFehler('%s: erlaubt sind %s'
                                        % (k, ', '.join(sorted(werte))))
                v = werte[str(v)]
            parameter[par] = v
    if kw:
        raise EingabeFehler('unbekannte Angabe: %s' % ', '.join(kw))
    text = seitentext(*objekte, namen=namen)
    if 'nf' not in parameter and re.search(r'\d/\d', text):
        parameter['nf'] = 'bruch'
    teile = ['o=' + _url_text(text)]
    for k, v in parameter.items():
        teile.append('%s=%s' % (k, _url_text(str(v))))
    return Link('%s?%s' % (_basis_adresse(), '&'.join(teile)), text)


def _url_text(s):
    from urllib.parse import quote
    return quote(str(s), safe='|*/-:;.,()')


def zeige(*objekte, **kw):
    """Zeigt Punkte, Vektoren, Geraden und Ebenen im Browser.

    ::

        zeige(A, B, g, E)
        zeige(A, B, g, E, oeffnen=False)      nur die Adresse
        zeige(g, farben={'g': 'rot'})         (oder g.aussehen(farbe='rot'))

    Die Objekte behalten ihre Namen; unbenannte Objekte erhalten den Namen
    der Variablen, unter der sie beim Aufruf bekannt sind.
    """
    oeffnen = kw.pop('oeffnen', True)
    farben = kw.pop('farben', None) or {}
    if farben:
        neu = []
        for o in objekte:
            n = getattr(o, 'name', '') or _variablenname(o)
            if n in farben and hasattr(o, 'aussehen'):
                o = o.aussehen(farbe=farben[n])
                o.name = o.name or n
            neu.append(o)
        objekte = tuple(neu)
    l = link(*objekte, **kw)
    if oeffnen:
        l.oeffnen()
    return l


def zeichnen(*objekte, **kw):
    """Alt: Adresse der Visualisierungsseite (früher matheretter)."""
    kw.pop('dim', None)
    kw.pop('voll_link', None)
    oeffnen = kw.pop('oeffnen', False)
    return str(zeige(*objekte, oeffnen=oeffnen, **kw))


# ====================================================================== #
# 12) Kurzschreibweisen, Konstanten, Hilfe                               #
# ====================================================================== #

def tex(objekt, **kw):
    """LaTeX von allem: Zahl, Vektor, Punkt, Gerade, Ebene, Rechnung."""
    if hasattr(objekt, 'tex'):
        return objekt.tex(**kw)
    if isinstance(objekt, (list, tuple)):
        return ',\\;'.join(tex(o, **kw) for o in objekt)
    return zahl_tex(objekt, **kw)


latex = tex


def text(objekt, **kw):
    """Text von allem."""
    if hasattr(objekt, 'text'):
        return objekt.text(**kw)
    if isinstance(objekt, (list, tuple)):
        return ', '.join(text(o, **kw) for o in objekt)
    return zahl_text(objekt, **kw)


def abstand(a, b):
    """Abstand zweier Objekte – in beliebiger Reihenfolge."""
    for x, y in ((a, b), (b, a)):
        if isinstance(x, (Ebene, Gerade)):
            return x.abstand(y)
    return _als_punkt(a).abstand(_als_punkt(b))


def winkel(a, b, **kw):
    """Winkel zwischen Vektoren, Geraden und Ebenen (in Grad)."""
    if isinstance(a, (Gerade, Ebene)):
        return a.winkel(b, **kw)
    if isinstance(b, (Gerade, Ebene)):
        return b.winkel(a, **kw)
    return Vektor(a).winkel(Vektor(b), **kw)


def schneide(a, b):
    """Schnitt zweier Objekte."""
    if hasattr(a, 'schneide'):
        return a.schneide(b)
    if hasattr(b, 'schneide'):
        return b.schneide(a)
    raise EingabeFehler('Schnitt nur für Geraden, Ebenen und Punkte')


def mitte(a, b):
    """Der Mittelpunkt zweier Punkte."""
    return _als_punkt(a).mitte(_als_punkt(b))


URSPRUNG = Punkt(0, 0, 0, name='O')
xACHSE = Gerade(Punkt(0, 0, 0), richtung=(1, 0, 0), name='x')
yACHSE = Gerade(Punkt(0, 0, 0), richtung=(0, 1, 0), name='y')
zACHSE = Gerade(Punkt(0, 0, 0), richtung=(0, 0, 1), name='z')
xyEBENE = Ebene.aus_koordinatenform([0, 0, 1], 0, name='xy')
xzEBENE = Ebene.aus_koordinatenform([0, 1, 0], 0, name='xz')
yzEBENE = Ebene.aus_koordinatenform([1, 0, 0], 0, name='yz')


_HILFE = """
vektor.py – analytische Geometrie, exakt gerechnet
==================================================

Objekte bauen
-------------
  A = Punkt(1, 2, 3)                 Punkt("A(1|2|-3)")
  a = Vektor(1, 2, 3)                Vektor("(1|2|3)")      Vektor(A, B)
  g = Gerade(A, B)                   Gerade(A, richtung=a)
  g = Gerade("g: x = (1|0|0) + r*(0|1|1)")
  E = Ebene(A, B, C)                 Ebene(A, n=(2|3|4))
  E = Ebene(A, rv1=(1|0|0), rv2=(0|1|0))
  E = Ebene("E: 2x + 3y + 4z = 12")  Ebene("[x - (1|2|3)]*(2|3|4) = 0")
  lese("...")                        erkennt die Form selbst

Rechnen (immer exakt: Brüche und Wurzeln)
-----------------------------------------
  a + b   a - b   3*a   a/2   a*b (Skalarprodukt)   a @ b (Kreuzprodukt)
  abs(a)  a.laenge()  a.normiert()  a.gekuerzt()  a.winkel(b)
  A + a -> Punkt      B - A -> Vektor      A.mitte(B)   A.abstand(E)
  g & h   g.schneide(E)   g.lage(h)   E.schneide(F)
  A.spiegeln(E)   A.lot_auf(g)   g.lotfusspunkt(A)   E.spurpunkte()
  loese([u, v], w)                   lineares Gleichungssystem

Lösungswege
-----------
  A.abstand(E)                 nur das Ergebnis
  print(A.weg.abstand(E))      Rechenweg als Text
  A.weg.abstand(E).tex()       Rechenweg als LaTeX
  A.weg.abstand(E).ergebnis    das Ergebnis dazu
  dir(A.weg)                   alles, was einen Weg kennt
  einstellen(kurz=True, umgebung='aligned', stellen=3)

Bild
----
  zeige(A, B, g, E)            öffnet analytische_geometrie.html
  link(A, g, E)                nur die Adresse
  seitentext(A, g, E)          Text für die Textansicht der Seite
  seite("C:/.../analytische_geometrie.html")     Seite festlegen
  g.aussehen(farbe='rot')      Darstellung auf der Seite
"""


def hilfe():
    """Zeigt die Kurzanleitung."""
    print(_HILFE.strip())


# ---------------------------------------------------------------------- #
#  Alte Namen – damit frühere Skripte weiterlaufen                       #
# ---------------------------------------------------------------------- #

def clean_args(args):
    """Alt: entwirrt verschachtelte Argumentlisten."""
    while isinstance(args, tuple) and len(args) == 1 and not ist_zahl(args[0]):
        args = args[0]
    return args


def as_int(*args):
    """Alt: gibt Werte als ganze Zahlen zurück, wenn das exakt möglich ist."""
    if not args:
        raise EingabeFehler('keine Zahl angegeben')
    werte = clean_args(args)
    if isinstance(werte, Vektor):
        return Vektor([ganz(k) for k in werte.koordinaten], name=werte.name)
    if isinstance(werte, (list, tuple)):
        if len(werte) == 1:
            return ganz(werte[0])
        return type(werte)(ganz(w) for w in werte)
    return ganz(werte)


als_int = as_int


def als_str_mit_evtl_klammer(n):
    """Alt: negative Zahlen in Klammern."""
    s = zahl_text(n)
    return '(%s)' % s if s.startswith('-') else s


__all__ = [
    # Zahlen
    'Bruch', 'Zahl', 'Q', 'Wurzel', 'wurzel', 'ggt', 'kgv', 'gerundet', 'ganz',
    'ist_ganz', 'ist_zahl', 'zahl_text', 'zahl_tex',
    # Objekte
    'Vektor', 'Punkt', 'Gerade', 'Ebene', 'Loesung',
    # Lesen
    'lese', 'objekte_lesen', 'punkte', 'koordinaten_lesen', 'punkt_lesen',
    'koordinatenform_lesen', 'normalenform_lesen', 'parameterform_lesen',
    # Rechnen
    'loese', 'lgs_loesen', 'abstand', 'winkel', 'schneide', 'mitte',
    # Ausgabe
    'Rechnung', 'Schritt', 'Block', 'STIL', 'einstellen', 'stil', 'tex',
    'latex', 'text', 'hilfe',
    # Bild
    'zeige', 'link', 'seitentext', 'seite', 'zeichnen', 'Link',
    # Konstanten
    'URSPRUNG', 'xACHSE', 'yACHSE', 'zACHSE', 'xyEBENE', 'xzEBENE', 'yzEBENE',
    # Fehler
    'GeometrieFehler', 'DimensionsFehler', 'EingabeFehler', 'NichtExaktFehler',
    # alte Namen
    'as_int', 'als_int', 'clean_args', 'als_str_mit_evtl_klammer',
]
