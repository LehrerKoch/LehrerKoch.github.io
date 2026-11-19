# -*- coding: utf-8 -*-
"""polynom.py – Ganzrationale Funktionen mit exakter Bruchrechnung.

Das Gegenstück zu ``vektor.py`` für die Analysis: Polynome eingeben,
ableiten, Nullstellen, Extrem- und Wendepunkte, Tangenten, Monotonie,
Symmetrie, Grenzverhalten, Steckbriefaufgaben – jeweils mit Lösungsweg als
Text und als LaTeX und mit einem Verweis auf die passende Aufgabenseite der
Mathe-Tools.

Kurzübersicht
-------------
    from polynom import *

    f = Polynom("f(x) = -x^4 + 5x^3 + 6")    # wie im Heft
    g = Polynom("x^(3) - 12x^(2) + 44x - 48") # wie GeoGebra es ausgibt
    h = Polynom("2(x-1)(x+3)^2")             # Klammern werden ausmultipliziert
    k = aus_nullstellen(-2, 0, 2)            # über die Nullstellen: x³ - 4x
    p = 3*x**2 - 2*x + 1                     # mit der Variablen x rechnen

    f(2)                          # Funktionswert, exakt: 30
    f.ableitung()                 # f'(x) = -4x³ + 15x²
    f.nullstellen()               # exakt – oder als Näherung, wenn es nicht geht
    f.extrempunkte()              # [H(15/4 | 18411/256)]
    print(f.weg.extrempunkte())         # derselbe Aufruf, mit Lösungsweg
    print(f.weg.extrempunkte().tex())   # … als LaTeX
    f.weg.extrempunkte().link()         # dieselbe Aufgabe auf der Webseite
    f.zeichne()                   # Graph mit allen besonderen Punkten

Drei Konventionen, die überall gelten (wie bei vektor.py)
--------------------------------------------------------
1. Jede Methode liefert das **mathematische Ergebnis** – nie einen Text.
2. Derselbe Aufruf über ``.weg`` liefert eine ``Rechnung``:
   ``print(...)`` zeigt den Lösungsweg als Text, ``.tex()`` als LaTeX,
   ``.ergebnis`` ist wieder das Ergebnis, ``.link()`` die passende
   Aufgabenseite.  ``dir(f.weg)`` listet alles, was einen Lösungsweg kennt.
3. Gerechnet wird **exakt**: ganze Zahlen und Brüche (``Bruch``),
   Quadratwurzeln als ``Wurzelzahl`` (etwa 2√3/3).  Nur wo es exakt nicht
   geht (etwa die Nullstelle von x³ - 6x² + 6x - 6), entsteht eine
   ``Naeherung`` – sie wird immer mit ≈ ausgegeben.

Alles Weitere steht in ``hilfe()`` und in polynom_doku.html.
"""

import json
import math
import os
import re
import sys
from fractions import Fraction as Bruch

__version__ = '1.0'


# ====================================================================== #
#  1) Fehlermeldungen                                                    #
# ====================================================================== #

class PolynomFehler(Exception):
    """Oberbegriff aller Fehler dieses Moduls."""


class EingabeFehler(PolynomFehler, ValueError):
    """Eine Eingabe ließ sich nicht lesen."""


class NichtExaktFehler(PolynomFehler, ArithmeticError):
    """Das Ergebnis wäre kein exakter Bruch- oder Wurzelterm mehr."""


# ====================================================================== #
#  2) Zahlen: exakt mit Brüchen, Wurzeln – und ehrliche Näherungen       #
# ====================================================================== #

class Zahl(Bruch):
    """Eine Bruchzahl, die sich auch so zeigt: ``2/3`` statt ``Fraction(2, 3)``.

    Sonst ist es ein ganz gewöhnlicher ``Bruch`` (``fractions.Fraction``).
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
    """Rechnungen mit einer Zahl liefern wieder eine Zahl (schönere Ausgabe)."""
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


def _quadrat_raus(m):
    """m = s²·rest mit quadratfreiem rest -> (s, rest) für ganze m > 0."""
    s, rest, d = 1, int(m), 2
    while d * d <= rest:
        q, r = divmod(rest, d * d)
        if r == 0:
            s *= d
            rest = q
        else:
            d += 1 if d == 2 else 2
    return s, rest


def _ist_rational(x):
    return isinstance(x, (int, Bruch)) and not isinstance(x, bool)


def _ganzwurzel(n, k):
    """Die ganze k-te Wurzel von n >= 0 – oder None, wenn sie nicht aufgeht."""
    if n < 0:
        return None
    if n in (0, 1):
        return n
    w = int(round(n ** (1.0 / k)))
    for c in (w - 1, w, w + 1):
        if c >= 0 and c ** k == n:
            return c
    return None


class Wurzelzahl(object):
    """Eine exakte Zahl ``a + b·√r`` (a, b Brüche, r > 1 quadratfrei).

    So kommen die Lösungen quadratischer Gleichungen heraus::

        Wurzelzahl(1, 1, 2)      ->  1 + √2
        Wurzelzahl(0, 2, 12)     ->  4√3
        Wurzelzahl(3, 0, 5)      ->  3        (eine gewöhnliche Zahl)

    Gerechnet wird exakt (+, -, *, /, **, Vergleiche), solange nur eine
    Wurzel √r im Spiel ist – genau das braucht man, um etwa f(2√3/3)
    auszurechnen.
    """

    __slots__ = ('a', 'b', 'r')

    def __new__(cls, a=0, b=1, r=2):
        a, b = Q(a), Q(b)
        if not (_ist_rational(a) and _ist_rational(b)):
            raise NichtExaktFehler('a und b müssen Brüche sein')
        r = Q(r)
        if r < 0:
            raise NichtExaktFehler('Wurzel aus der negativen Zahl %s' % zahl_text(r))
        # √(p/q) = √(p·q)/q
        n = r.numerator * r.denominator
        b = b / r.denominator
        if n == 0 or b == 0:
            return Zahl(a)
        s, rest = _quadrat_raus(n)
        b = b * s
        if rest == 1:
            return Zahl(a + b)
        w = object.__new__(cls)
        w.a, w.b, w.r = Zahl(a), Zahl(b), rest
        return w

    # ---- Rechnen ------------------------------------------------------- #
    def _paar(self, o):
        """(a, b) von o zum selben √r – oder None (dann wird genähert)."""
        if isinstance(o, Wurzelzahl):
            if o.r != self.r:
                return None
            return o.a, o.b
        if _ist_rational(o):
            return Zahl(o), Zahl(0)
        return None

    def _naeherung(self, o, op):
        return Naeherung(op(float(self), float(o)))

    def __add__(self, o):
        p = self._paar(o)
        if p is None:
            if isinstance(o, (float, Naeherung, Wurzelzahl)):
                return self._naeherung(o, lambda u, v: u + v)
            return NotImplemented
        return Wurzelzahl(self.a + p[0], self.b + p[1], self.r)

    __radd__ = __add__

    def __neg__(self):
        return Wurzelzahl(-self.a, -self.b, self.r)

    def __pos__(self):
        return self

    def __sub__(self, o):
        return self + (-o)

    def __rsub__(self, o):
        return (-self) + o

    def __mul__(self, o):
        p = self._paar(o)
        if p is None:
            if isinstance(o, (float, Naeherung, Wurzelzahl)):
                return self._naeherung(o, lambda u, v: u * v)
            return NotImplemented
        c, d = p
        return Wurzelzahl(self.a * c + self.b * d * self.r,
                          self.a * d + self.b * c, self.r)

    __rmul__ = __mul__

    def _kehrwert(self):
        n = self.a * self.a - self.b * self.b * self.r
        return Wurzelzahl(self.a / n, -self.b / n, self.r)

    def __truediv__(self, o):
        if _ist_rational(o):
            if o == 0:
                raise ZeroDivisionError('Division durch 0')
            return Wurzelzahl(self.a / o, self.b / o, self.r)
        if isinstance(o, Wurzelzahl) and o.r == self.r:
            return self * o._kehrwert()
        if isinstance(o, (float, Naeherung, Wurzelzahl)):
            return self._naeherung(o, lambda u, v: u / v)
        return NotImplemented

    def __rtruediv__(self, o):
        if _ist_rational(o):
            return self._kehrwert() * o
        if isinstance(o, (float, Naeherung)):
            return Naeherung(float(o) / float(self))
        return NotImplemented

    def __pow__(self, n):
        if not isinstance(n, int):
            return Naeherung(float(self) ** float(n))
        if n < 0:
            return self._kehrwert() ** (-n)
        erg = Zahl(1)
        for _ in range(n):
            erg = erg * self
        return erg

    def __abs__(self):
        return -self if self._vz() < 0 else self

    # ---- Vergleichen (exakt) -------------------------------------------- #
    def _vz(self):
        sa = (self.a > 0) - (self.a < 0)
        sb = (self.b > 0) - (self.b < 0)
        if sa == 0 or sa == sb:
            return sb
        if sb == 0:
            return sa
        d = self.a * self.a - self.b * self.b * self.r
        return sa if d > 0 else sb

    def _differenz_vz(self, o):
        p = self._paar(o)
        if p is None:
            d = float(self) - float(o)
            return (d > 0) - (d < 0)
        diff = Wurzelzahl(self.a - p[0], self.b - p[1], self.r)
        if _ist_rational(diff):
            return (diff > 0) - (diff < 0)
        return diff._vz()

    def __eq__(self, o):
        if isinstance(o, Wurzelzahl):
            return (self.r, self.a, self.b) == (o.r, o.a, o.b)
        if _ist_rational(o):
            return False                 # eine echte Wurzelzahl ist irrational
        if isinstance(o, (float, Naeherung)):
            return abs(float(self) - float(o)) < 1e-12
        return NotImplemented

    def __ne__(self, o):
        e = self.__eq__(o)
        return e if e is NotImplemented else not e

    def __lt__(self, o):
        return self._differenz_vz(o) < 0

    def __le__(self, o):
        return self._differenz_vz(o) <= 0

    def __gt__(self, o):
        return self._differenz_vz(o) > 0

    def __ge__(self, o):
        return self._differenz_vz(o) >= 0

    def __hash__(self):
        return hash((self.a, self.b, self.r))

    def __bool__(self):
        return True

    def __float__(self):
        return float(self.a) + float(self.b) * math.sqrt(self.r)

    def __int__(self):
        return int(float(self))

    def __round__(self, stellen=0):
        return round(float(self), stellen)

    def gerundet(self, stellen=None):
        return gerundet(float(self), stellen)

    # ---- Schreiben ------------------------------------------------------ #
    def _gemeinsam(self):
        n = self.a.denominator * self.b.denominator // math.gcd(
            self.a.denominator, self.b.denominator)
        return int(self.a * n), int(self.b * n), n

    def text(self, dez=False, stellen=None):
        if dez:
            return zahl_text(float(self), stellen=stellen)
        A, B, n = self._gemeinsam()
        kern = ('√%d' % self.r) if abs(B) == 1 else ('%d√%d' % (abs(B), self.r))
        if A == 0:
            s = ('-' if B < 0 else '') + kern
            return s if n == 1 else '%s/%d' % (s, n)
        s = '%d %s %s' % (A, '-' if B < 0 else '+', kern)
        return s if n == 1 else '(%s)/%d' % (s, n)

    def tex(self, dez=False, stellen=None):
        if dez:
            return zahl_tex(float(self), stellen=stellen)
        A, B, n = self._gemeinsam()
        kern = (r'\sqrt{%d}' % self.r) if abs(B) == 1 else (r'%d\sqrt{%d}' % (abs(B), self.r))
        if A == 0:
            if n == 1:
                return ('-' if B < 0 else '') + kern
            return ('-' if B < 0 else '') + r'\frac{%s}{%d}' % (kern, n)
        z = '%d%s%s' % (A, '-' if B < 0 else '+', kern)
        return z if n == 1 else r'\frac{%s}{%d}' % (z, n)

    latex = tex

    def __str__(self):
        return self.text()

    def __repr__(self):
        return self.text()

    def _repr_latex_(self):
        return '$%s$' % self.tex()


class Naeherung(object):
    """Eine Zahl, die sich nicht exakt als Bruch oder Wurzelterm schreiben
    lässt – etwa die Nullstelle von x³ - 6x² + 6x - 6 oder ∛2.

    ``wert`` ist die Dezimalzahl (float).  Manche Näherungen kennen eine
    exakte Schreibweise (``∛2``, ``√(3 + √5)``) – dann zeigen sie diese.
    Alles, was man mit einer Näherung rechnet, ist wieder eine Näherung.
    """

    __slots__ = ('wert', '_text', '_tex')

    def __init__(self, wert, text=None, tex=None):
        self.wert = float(wert)
        self._text = text
        self._tex = tex if tex is not None else text

    @property
    def symbolisch(self):
        """Gibt es eine exakte Schreibweise (etwa ∛2)?"""
        return self._text is not None

    def _f(self, o):
        if isinstance(o, (int, float, Bruch, Wurzelzahl, Naeherung)) and not isinstance(o, bool):
            return float(o)
        return None

    def _op(self, o, op):
        v = self._f(o)
        if v is None:
            return NotImplemented
        return Naeherung(op(self.wert, v))

    def __add__(self, o):
        return self._op(o, lambda u, v: u + v)

    def __radd__(self, o):
        return self._op(o, lambda u, v: v + u)

    def __sub__(self, o):
        return self._op(o, lambda u, v: u - v)

    def __rsub__(self, o):
        return self._op(o, lambda u, v: v - u)

    def __mul__(self, o):
        return self._op(o, lambda u, v: u * v)

    def __rmul__(self, o):
        return self._op(o, lambda u, v: v * u)

    def __truediv__(self, o):
        return self._op(o, lambda u, v: u / v)

    def __rtruediv__(self, o):
        return self._op(o, lambda u, v: v / u)

    def __pow__(self, n):
        return Naeherung(self.wert ** float(n))

    def __neg__(self):
        t = None
        if self._text:
            t = self._text[1:] if self._text.startswith('-') else '-' + self._text
            x = self._tex[1:] if self._tex.startswith('-') else '-' + self._tex
            return Naeherung(-self.wert, t, x)
        return Naeherung(-self.wert)

    def __pos__(self):
        return self

    def __abs__(self):
        return -self if self.wert < 0 else self

    def __float__(self):
        return self.wert

    def __int__(self):
        return int(self.wert)

    def __round__(self, stellen=0):
        return round(self.wert, stellen)

    def __bool__(self):
        return self.wert != 0

    def _vgl(self, o):
        v = self._f(o)
        if v is None:
            return None
        return self.wert - v

    def __eq__(self, o):
        d = self._vgl(o)
        return NotImplemented if d is None else abs(d) < 1e-12

    def __ne__(self, o):
        e = self.__eq__(o)
        return e if e is NotImplemented else not e

    def __lt__(self, o):
        return self._vgl(o) < 0

    def __le__(self, o):
        return self._vgl(o) <= 0

    def __gt__(self, o):
        return self._vgl(o) > 0

    def __ge__(self, o):
        return self._vgl(o) >= 0

    def __hash__(self):
        return hash(round(self.wert, 12))

    def gerundet(self, stellen=None):
        return gerundet(self.wert, stellen)

    def text(self, dez=False, stellen=None):
        if self._text and not dez:
            return self._text
        return zahl_text(self.wert, stellen=stellen)

    def tex(self, dez=False, stellen=None):
        if self._tex and not dez:
            return self._tex
        return zahl_tex(self.wert, stellen=stellen)

    latex = tex

    def __str__(self):
        return self.text()

    def __repr__(self):
        if self._text:
            return '%s ≈ %s' % (self._text, zahl_text(self.wert))
        return '≈' + zahl_text(self.wert)


def ist_exakt(x):
    """Ist x exakt bekannt (Bruch, Wurzelzahl, exakte Schreibweise)?"""
    if isinstance(x, Naeherung):
        return x.symbolisch
    return isinstance(x, (int, Bruch, Wurzelzahl)) and not isinstance(x, bool)


def _ist_naeherung(x):
    return isinstance(x, float) or (isinstance(x, Naeherung) and not x.symbolisch)


def wurzel(x):
    """Exakte Quadratwurzel: ``wurzel(18)`` ist ``3√2``, ``wurzel(9/4)`` ist 3/2."""
    q = Q(x)
    if isinstance(q, Naeherung) or isinstance(q, float):
        if float(q) < 0:
            raise NichtExaktFehler('Wurzel aus einer negativen Zahl')
        return Naeherung(math.sqrt(float(q)), '√(%s)' % zahl_text(q), r'\sqrt{%s}' % zahl_tex(q))
    if isinstance(q, Wurzelzahl):
        return _wurzel_aus_wurzelzahl(q)
    if q < 0:
        raise NichtExaktFehler('Wurzel aus der negativen Zahl %s' % zahl_text(q))
    return Wurzelzahl(0, 1, q)


def _wurzel_aus_wurzelzahl(w):
    """√(a + b√r): entschachteln, wenn es geht (√(3 + 2√2) = 1 + √2)."""
    a, b, r = w.a, w.b, w.r
    if float(w) < 0:
        raise NichtExaktFehler('Wurzel aus einer negativen Zahl')
    # √(a + b√r) = √p + √q  mit p + q = a und 4pq = b²r
    d = a * a - b * b * r
    if d >= 0:
        s = Wurzelzahl(0, 1, d)
        if _ist_rational(s):
            p, q = (a + s) / 2, (a - s) / 2
            if p >= 0 and q >= 0:
                wp, wq = Wurzelzahl(0, 1, p), Wurzelzahl(0, 1, q)
                vz = 1 if b > 0 else -1
                try:
                    erg = wp + vz * wq
                    if not isinstance(erg, Naeherung):
                        return erg
                except Exception:
                    pass
    return Naeherung(math.sqrt(float(w)), '√(%s)' % w.text(), r'\sqrt{%s}' % w.tex())


def nte_wurzel(x, n):
    """Exakte n-te Wurzel, wenn sie aufgeht (``nte_wurzel(27/8, 3)`` = 3/2),
    sonst eine Näherung mit exakter Schreibweise (∛2)."""
    q = Q(x)
    n = int(n)
    if n == 2:
        return wurzel(q)
    if not _ist_rational(q):
        v = float(q)
        return Naeherung(math.copysign(abs(v) ** (1.0 / n), v))
    if q < 0 and n % 2 == 0:
        raise NichtExaktFehler('gerade Wurzel aus einer negativen Zahl')
    vz = -1 if q < 0 else 1
    z = _ganzwurzel(abs(q.numerator), n)
    m = _ganzwurzel(q.denominator, n)
    if z is not None and m is not None:
        return Zahl(vz * z, m)
    zeichen = {3: '∛', 4: '∜'}.get(n)
    innen = zahl_text(abs(q))
    if zeichen:
        t = zeichen + (innen if '/' not in innen else '(%s)' % innen)
    else:
        t = '%d√(%s)' % (n, innen)
    t = ('-' if vz < 0 else '') + t
    x_tex = ('-' if vz < 0 else '') + r'\sqrt[%d]{%s}' % (n, zahl_tex(abs(q)))
    return Naeherung(vz * abs(float(q)) ** (1.0 / n), t, x_tex)


def Q(x):
    """Macht aus x eine **exakte** Zahl.

    ``Q(0.1)`` ist genau 1/10 – die Dezimalschreibweise wird gelesen, nicht
    die binäre Näherung.  Texte wie ``'2/3'``, ``'1,5'`` oder ``'-3/4'``
    gehen auch.
    """
    if isinstance(x, (Zahl, Wurzelzahl, Naeherung)):
        return x
    if isinstance(x, Bruch):
        return Zahl(x)
    if isinstance(x, bool):
        raise TypeError('True/False ist keine Zahl')
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


def _zahl_aus_text(s):
    """'2/3', '-1,5', '3/4' – über denselben Leser wie die Polynome."""
    t = str(s).strip()
    m = re.match(r'^\s*([+-]?)\s*(\d*(?:[.,]\d+)?)\s*\*?\s*(?:√|sqrt)\s*\(?\s*(\d+(?:[.,]\d+)?)\s*\)?\s*$', t)
    if m:                                    # 2√3, -√5, sqrt(2)
        fak = Zahl(m.group(2).replace(',', '.')) if m.group(2) else Zahl(1)
        if m.group(1) == '-':
            fak = -fak
        return Wurzelzahl(0, fak, Zahl(m.group(3).replace(',', '.')))
    p = _lies_polynom(t)[0]
    if len(p) > 1:
        raise EingabeFehler('»%s« ist keine Zahl' % s)
    return Zahl(p[0])


def gerundet(x, stellen=None):
    """Rundet eine Zahl für die Ausgabe (exakte Zahlen bleiben sonst exakt)."""
    if stellen is None:
        stellen = STIL.stellen
    if isinstance(x, (list, tuple)):
        return type(x)(gerundet(e, stellen) for e in x)
    if hasattr(x, 'gerundet') and not isinstance(x, (Bruch, float, int)):
        return x.gerundet(stellen)
    w = float(x)
    r = round(w, stellen)
    return int(r) if float(r).is_integer() else r


def _dez_text(x, stellen=None):
    """Eine Dezimalzahl mit höchstens so vielen Stellen wie nötig."""
    if stellen is None:
        stellen = STIL.stellen
    w = float(x)
    s = ('%.*f' % (max(0, stellen), w)).rstrip('0').rstrip('.')
    if s in ('', '-', '-0'):
        s = '0'
    return s


def zahl_text(x, dez=False, stellen=None):
    """Eine Zahl als Text: ``3``, ``-2/3``, ``1,5``, ``2√3/3``."""
    if isinstance(x, str):
        return x
    if isinstance(x, (Wurzelzahl, Naeherung)):
        return x.text(dez=dez, stellen=stellen)
    if isinstance(x, float):
        s = _dez_text(x, stellen)
        return s.replace('.', ',') if STIL.komma else s
    if isinstance(x, bool):
        return str(x)
    if isinstance(x, int):
        return str(x)
    q = Q(x)
    if dez:
        s = _dez_text(q, stellen)
        return s.replace('.', ',') if STIL.komma else s
    if q.denominator == 1:
        return str(q.numerator)
    return '%s/%s' % (q.numerator, q.denominator)


def zahl_tex(x, dez=False, stellen=None):
    """Eine Zahl als LaTeX: ``3``, ``-\\frac{2}{3}``, ``\\frac{2\\sqrt{3}}{3}``."""
    if isinstance(x, str):
        return x
    if isinstance(x, (Wurzelzahl, Naeherung)):
        return x.tex(dez=dez, stellen=stellen)
    if isinstance(x, float):
        s = _dez_text(x, stellen)
        return s.replace('.', '{,}') if STIL.komma else s
    if isinstance(x, int) and not isinstance(x, bool):
        return str(x)
    q = Q(x)
    if dez:
        s = _dez_text(q, stellen)
        return s.replace('.', '{,}') if STIL.komma else s
    if q.denominator == 1:
        return str(q.numerator)
    vz = '-' if q.numerator < 0 else ''
    return r'%s\frac{%s}{%s}' % (vz, abs(q.numerator), q.denominator)


def _mit_dez(x):
    """``18411/256 ≈ 71,92`` – exakter Wert und, wenn nötig, die Näherung."""
    if _ist_rational(x) and Q(x).denominator == 1:
        return zahl_text(x)
    if _ist_naeherung(x):
        return '≈ ' + zahl_text(x)
    return '%s ≈ %s' % (zahl_text(x), zahl_text(float(x)))


# ====================================================================== #
#  3) Ausgabe: Lösungswege als Text und als LaTeX                        #
# ====================================================================== #

class STIL(object):
    """Voreinstellungen für alle Ausgaben – mit ``einstellen(...)`` ändern.

    ================  ======================================================
    ``komma``         Dezimaltrennzeichen Komma (statt Punkt)
    ``stellen``       Rundungsstellen für Näherungswerte
    ``hoch``          Hochzahlen im Text: ``'unicode'`` (x³) oder ``'^'``
                      (x^3, zum Weiterkopieren nach GeoGebra)
    ``quadratisch``   Lösungsformel: ``'pq'`` (p-q-Formel) oder ``'abc'``
    ``intervall``     ``'eckig'`` (]a; b[) oder ``'rund'`` ((a; b))
    ``umgebung``      LaTeX-Umgebung der Lösungswege (``align*``,
                      ``aligned`` oder ``None``)
    ``webseite``      Adresse der Mathe-Tools im Netz
    ================  ======================================================
    """

    komma = True
    stellen = 2
    hoch = 'unicode'
    quadratisch = 'pq'
    intervall = 'eckig'
    umgebung = 'align*'
    webseite = 'https://lehrerkoch.github.io/'


_STIL_FELDER = ('komma', 'stellen', 'hoch', 'quadratisch', 'intervall',
                'umgebung', 'webseite')


def einstellen(**felder):
    """Ändert Voreinstellungen dauerhaft: ``einstellen(hoch='^')``."""
    for k, v in felder.items():
        if k not in _STIL_FELDER:
            raise EingabeFehler('unbekannte Einstellung »%s« (erlaubt: %s)'
                                % (k, ', '.join(_STIL_FELDER)))
        setattr(STIL, k, v)
    return {k: getattr(STIL, k) for k in _STIL_FELDER}


class stil(object):
    """Einstellungen nur für einen Block: ``with stil(quadratisch='abc'): ...``"""

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


_VOREIN = object()        # "nicht angegeben" – anders als None


class Teil(object):
    """Ein Stück Formel mit eigener Text- und LaTeX-Schreibweise."""

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

    def __repr__(self):
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
    if p is None:
        return ''
    if isinstance(p, (Teil, Ausdruck)):
        return p.text()
    if isinstance(p, (int, float, Bruch, Wurzelzahl, Naeherung)):
        return zahl_text(p)
    if hasattr(p, 'text') and callable(p.text):
        return p.text()
    return str(p)


def _tex_von(p):
    if isinstance(p, str):
        return p
    if p is None:
        return ''
    if isinstance(p, (Teil, Ausdruck)):
        return p.tex()
    if isinstance(p, (int, float, Bruch, Wurzelzahl, Naeherung)):
        return zahl_tex(p)
    if hasattr(p, 'tex') and callable(p.tex):
        return p.tex()
    return str(p)


MAL = Teil('·', r'\cdot ')
PFEIL = Teil(' ⇒ ', r'\;\Rightarrow\;')
UND = Teil(', ', r',\quad ')


def F(t, x=None):
    """Kurzform für ein Formelstück: ``F("f'(x) = 0", "f'(x) = 0")``."""
    return Teil(t, x)


def _neg_zahl(x):
    try:
        return float(x) < 0
    except Exception:
        return False


def _in_klammern(x):
    """Zahl zum Einsetzen: negative Zahlen, Brüche und Wurzeln in Klammern."""
    t = zahl_text(x)
    x_tex = zahl_tex(x)
    braucht = _neg_zahl(x) or any(z in t for z in '/√+ ') or (
        isinstance(x, float) or (isinstance(x, Naeherung) and not x.symbolisch))
    if braucht:
        return Teil('(%s)' % t, r'\left(%s\right)' % x_tex)
    return Teil(t, x_tex)


# ---------------------------------------------------------------------- #
#  Schritt und Rechnung                                                  #
# ---------------------------------------------------------------------- #

class Schritt(object):
    """Eine Zeile eines Lösungswegs: ``links = glied1 = glied2 ≈ glied3``.

    ``glieder`` ist eine Liste von Formelstücken; ein Paar ``('≈', x)``
    setzt ein anderes Zeichen vor das Glied (``=``, ``≈``, ``⇔``, ``≠``,
    ``<``, ``>``, ``≤``, ``≥``, ``⇒``).
    """

    __slots__ = ('links', 'glieder', 'hinweis', 'einzug')

    _REL = ('=', '≈', '⇔', '≠', '<', '>', '≤', '≥', '⇒', '|')

    def __init__(self, links=None, glieder=(), hinweis=None, einzug=0):
        self.links = links
        self.glieder = []
        for g in glieder:
            if isinstance(g, tuple) and len(g) == 2 and isinstance(g[0], str) \
                    and g[0] in self._REL:
                self.glieder.append((g[0], g[1]))
            else:
                self.glieder.append(('=', g))
        self.hinweis = hinweis          # Text oder Liste aus Text und Formeln
        self.einzug = einzug

    _TEX_REL = {'=': '=', '≈': r'\approx', '⇔': r'\Leftrightarrow',
                '≠': r'\neq', '<': '<', '>': '>', '≤': r'\le', '≥': r'\ge',
                '⇒': r'\Rightarrow', '|': r'\mid'}

    def _laenge(self):
        n = len(_text_von(self.links)) if self.links is not None else 0
        return n + sum(len(_text_von(g)) + 3 for _, g in self._glieder())

    def _umbruch(self):
        return len(self._glieder()) >= 4 or self._laenge() > 76

    def _glieder(self):
        if self.links is None or not self.glieder:
            return self.glieder
        if _text_von(self.links) == _text_von(self.glieder[0][1]):
            return self.glieder[1:] or self.glieder
        return self.glieder

    def _hinweis_text(self):
        h = self.hinweis
        if h is None:
            return None
        if isinstance(h, (list, tuple)):
            return ''.join(_text_von(p) for p in h)
        return _text_von(h)

    def _hinweis_tex(self):
        h = self.hinweis
        if h is None:
            return None
        if not isinstance(h, (list, tuple)):
            h = [h]
        raus = ''
        for p in h:
            if isinstance(p, str):
                if p:
                    raus += r'\text{%s}' % _tex_schutz(p)
            else:
                raus += _tex_von(p)
        return raus

    def zeilen(self):
        """Der Schritt als Liste von Textzeilen."""
        vorn = '  ' * self.einzug
        raus = []
        ht = self._hinweis_text()
        if ht:
            raus.append(vorn + ht)
        if not self.glieder:
            return raus
        links = _text_von(self.links) if self.links is not None else ''
        stuecke = [(rel, _text_von(g)) for rel, g in self._glieder()]
        vorn2 = vorn + ('  ' if ht else '')
        if not self._umbruch():
            z = links
            for i, (rel, s) in enumerate(stuecke):
                z += (' %s ' % rel if (i or links) else '') + s
            raus.append(vorn2 + z)
            return raus
        einzug = ' ' * (len(links) + 1)
        for i, (rel, s) in enumerate(stuecke):
            if i == 0 and links:
                raus.append(vorn2 + '%s %s %s' % (links, rel, s))
            elif i == 0:
                raus.append(vorn2 + s)
            else:
                raus.append(vorn2 + '%s%s %s' % (einzug, rel, s))
        return raus

    def text(self):
        return '\n'.join(self.zeilen())

    def tex_zeilen(self):
        """Der Schritt als Liste von LaTeX-Zeilen (ohne ``\\\\``)."""
        raus = []
        ht = self._hinweis_tex()
        if ht:
            raus.append('&' + (r'\quad ' * self.einzug) + ht)
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


def hinweis(*teile, **kw):
    """Ein Erklärsatz im Lösungsweg – Text und Formeln gemischt:
    ``hinweis('Notwendige Bedingung: ', F("f'(x) = 0"))``."""
    return Schritt(hinweis=list(teile) if len(teile) != 1 else teile[0],
                   einzug=kw.get('einzug', 0))


_TEX_ERSATZ = (('\\', r'\textbackslash{}'), ('&', r'\&'), ('%', r'\%'), ('#', r'\#'),
               ('_', r'\_'), ('$', r'\$'), ('−', '-'), ('{', r'\{'), ('}', r'\}'),
               ('·', r'$\cdot$'), ('×', r'$\times$'),
               ('⁰', '$^0$'), ('¹', '$^1$'), ('²', '$^2$'), ('³', '$^3$'),
               ('⁴', '$^4$'), ('⁵', '$^5$'), ('⁶', '$^6$'), ('⁷', '$^7$'),
               ('⁸', '$^8$'), ('⁹', '$^9$'), ('ⁿ', '$^n$'),
               ('₀', '$_0$'), ('₁', '$_1$'), ('₂', '$_2$'), ('₃', '$_3$'),
               ('₄', '$_4$'), ('₅', '$_5$'), ('ₙ', '$_n$'), ('ₑ', '$_E$'),
               ('√', r'$\sqrt{\;}$'), ('∛', r'$\sqrt[3]{\;}$'), ('≤', r'$\le$'),
               ('≥', r'$\ge$'), ('≠', r'$\neq$'), ('±', r'$\pm$'),
               ('≈', r'$\approx$'), ('⇔', r'$\Leftrightarrow$'),
               ('⇒', r'$\Rightarrow$'), ('→', r'$\to$'), ('∞', r'$\infty$'),
               ('∈', r'$\in$'), ('ℝ', r'$\mathbb{R}$'), ('✓', r'$\checkmark$'),
               ('°', r'$^\circ$'), ('∣', '|'), ('…', r'\dots{}'), ('α', r'$\alpha$'))


def _tex_schutz(s):
    """Macht einen Erklärsatz für \\text{...} tauglich."""
    raus = []
    for c in s:
        for a, b in _TEX_ERSATZ:
            if c == a:
                c = b
                break
        raus.append(c)
    return ''.join(raus)


class Rechnung(object):
    """Ergebnis **und** Lösungsweg.

    ``print(r)`` zeigt den Weg als Text, ``r.tex()`` als LaTeX,
    ``r.ergebnis`` ist das mathematische Ergebnis, ``r.link()`` die Adresse
    der passenden Aufgabenseite der Mathe-Tools mit genau dieser Aufgabe.
    """

    __slots__ = ('ergebnis', 'schritte', 'titel', 'aufgabe')

    def __init__(self, ergebnis=None, schritte=(), titel=None, aufgabe=None):
        self.ergebnis = ergebnis
        self.schritte = [s for s in schritte if s is not None]
        self.titel = titel
        self.aufgabe = aufgabe      # (Adresse relativ zur Webseite, Beschreibung)

    @property
    def wert(self):
        """Wie ``.ergebnis``."""
        return self.ergebnis

    def __float__(self):
        return float(self.ergebnis)

    def __eq__(self, other):
        if isinstance(other, Rechnung):
            return self.ergebnis == other.ergebnis
        return self.ergebnis == other

    def __ne__(self, other):
        return not self.__eq__(other)

    def __bool__(self):
        return bool(self.ergebnis)

    def __hash__(self):
        return id(self)

    def __len__(self):
        return len(self.schritte)

    def __iter__(self):
        return iter(self.schritte)

    def __getitem__(self, i):
        return self.schritte[i]

    def dazu(self, *schritte):
        """Hängt weitere Schritte an (für eigene Rechnungen)."""
        for s in schritte:
            if isinstance(s, Rechnung):
                self.schritte.extend(s.schritte)
            elif s is not None:
                self.schritte.append(s)
        return self

    # ---- Aufgabenseite ------------------------------------------------- #
    def link(self):
        """Die passende Aufgabenseite der Mathe-Tools – mit genau dieser
        Aufgabe: dort gibt es denselben Lösungsweg Schritt für Schritt,
        ein Quiz und das Bild dazu.  ``r.link().oeffnen()`` öffnet sie."""
        if not self.aufgabe:
            raise PolynomFehler('Zu dieser Rechnung gibt es keine passende Aufgabenseite.')
        pfad, text = self.aufgabe
        return Link(_webadresse(pfad), text or self.titel or pfad,
                    titel='Aufgabe auf der Webseite öffnen')

    aufgabenlink = link

    def oeffnen(self):
        """Öffnet die passende Aufgabenseite im Browser."""
        return self.link().oeffnen()

    # ---- Ausgabe ------------------------------------------------------- #
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

    def tex(self, umgebung=_VOREIN, titel=False, komma=None, stellen=None):
        """Der Lösungsweg als LaTeX – fertig zum Einfügen.

        ``umgebung`` ist voreingestellt ``align*``; ``'aligned'`` klammert
        zusätzlich in ``\\[ … \\]``, ``None`` liefert nur die Zeilen.
        """
        umg = STIL.umgebung if umgebung is _VOREIN else umgebung
        with stil(komma=komma, stellen=stellen):
            zeilen = []
            for s in self.schritte:
                zeilen.extend(s.tex_zeilen())
            koerper = ' \\\\\n'.join(zeilen)
            if titel and self.titel:
                koerper = r'&\textbf{%s}\\[2pt]' % _tex_schutz(self.titel) + '\n' + koerper
        if not umg:
            return koerper
        if umg == 'aligned':
            return '\\[\n\\begin{aligned}\n%s\n\\end{aligned}\n\\]' % koerper
        return '\\begin{%s}\n%s\n\\end{%s}' % (umg, koerper, umg)

    latex = tex

    def _repr_latex_(self):
        return '$$\n\\begin{aligned}\n%s\n\\end{aligned}\n$$' % self.tex(umgebung=None)

    def __str__(self):
        return self.text()

    def __repr__(self):
        return self.text()


# ---------------------------------------------------------------------- #
#  .weg – derselbe Aufruf, aber mit Lösungsweg                           #
# ---------------------------------------------------------------------- #

def mit_weg(f):
    """Kennzeichnet eine Methode, die über ``.weg`` einen Lösungsweg liefert."""
    f._mit_weg = True
    return f


class Weg(object):
    """``f.weg.methode(...)`` liefert eine :class:`Rechnung` statt des Werts."""

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
            raise AttributeError('%s kennt keine Methode »%s«'
                                 % (type(self._obj).__name__, name))
        if not getattr(f, '_mit_weg', False):
            raise AttributeError('»%s« hat keinen Lösungsweg. Mit Weg: %s'
                                 % (name, ', '.join(self._namen())))
        obj = self._obj

        def mit_loesungsweg(*args, **kwargs):
            kwargs['_weg'] = True
            return f(obj, *args, **kwargs)

        mit_loesungsweg.__name__ = name
        mit_loesungsweg.__doc__ = f.__doc__
        return mit_loesungsweg

    def __dir__(self):
        return self._namen()

    def __repr__(self):
        return 'Lösungswege: %s' % ', '.join(self._namen())


def _ausgabe(rechnung, _weg=False):
    """Die eine Stelle, an der über die Rückgabe entschieden wird."""
    return rechnung if _weg else rechnung.ergebnis


# ---------------------------------------------------------------------- #
#  Verweise auf die Webseite                                             #
# ---------------------------------------------------------------------- #

def _webadresse(pfad):
    basis = str(STIL.webseite or 'https://lehrerkoch.github.io/')
    if not basis.endswith('/'):
        basis += '/'
    return basis + pfad


class Link(object):
    """Eine Adresse der Mathe-Tools – mit ``.oeffnen()``."""

    __slots__ = ('url', 'text', 'titel')

    def __init__(self, url, text='', titel=None):
        self.url = url
        self.text = text
        self.titel = titel or 'Seite öffnen'

    def oeffnen(self):
        """Öffnet die Seite im Browser."""
        import webbrowser
        try:
            if webbrowser.open(self.url):
                return self
        except Exception:
            pass
        try:                                   # Windows ohne Standardbrowser
            os.startfile(self.url)             # pylint: disable=no-member
        except Exception:
            print('Konnte den Browser nicht öffnen. Adresse:\n%s' % self.url)
        return self

    anzeigen = oeffnen

    def __str__(self):
        return self.url

    def __repr__(self):
        return self.url

    def _repr_html_(self):
        from html import escape
        return '<a href="%s" target="_blank">%s</a> <small>%s</small>' % (
            escape(self.url), escape(self.titel), escape(self.text))


# ---------------------------------------------------------------------- #
#  Punkte, Intervalle, Tabellen                                          #
# ---------------------------------------------------------------------- #

def _index_text(i):
    return ''.join('₀₁₂₃₄₅₆₇₈₉'[int(c)] for c in str(i))


class Punkt(object):
    """Ein Punkt des Graphen: ``H(15/4 | 18411/256)``.

    ``p.x``, ``p.y`` (exakt), ``p.art`` ('Hochpunkt', 'Tiefpunkt',
    'Sattelpunkt', 'Wendepunkt', 'Nullstelle', …), ``p.name``.
    ``x, y = p`` geht auch.
    """

    __slots__ = ('x', 'y', 'name', 'art', 'index')

    def __init__(self, x, y, name='P', art=None, index=None):
        self.x = x
        self.y = y
        self.name = name
        self.art = art
        self.index = index

    def __iter__(self):
        return iter((self.x, self.y))

    def __getitem__(self, i):
        return (self.x, self.y)[i]

    def __len__(self):
        return 2

    def __eq__(self, other):
        if isinstance(other, Punkt):
            return self.x == other.x and self.y == other.y
        if isinstance(other, (tuple, list)) and len(other) == 2:
            return self.x == other[0] and self.y == other[1]
        return NotImplemented

    def __hash__(self):
        return hash((self.x, self.y))

    def _name_text(self):
        return (self.name or '') + (_index_text(self.index) if self.index else '')

    def _name_tex(self):
        n = self.name or ''
        return n + ('_{%s}' % self.index if self.index else '')

    def text(self, dez=False):
        return '%s(%s | %s)' % (self._name_text(), zahl_text(self.x, dez=dez),
                                zahl_text(self.y, dez=dez))

    def tex(self, dez=False):
        return r'%s\left(%s\,\middle|\,%s\right)' % (
            self._name_tex(), zahl_tex(self.x, dez=dez), zahl_tex(self.y, dez=dez))

    def naeherung(self):
        """Der Punkt mit gerundeten Koordinaten (Text)."""
        return self.text(dez=True)

    def _braucht_naeherung(self):
        return any(not (_ist_rational(k) and Q(k).denominator == 1) for k in (self.x, self.y))

    def __str__(self):
        return self.text()

    def __repr__(self):
        if self._braucht_naeherung():
            if all(_ist_naeherung(k) or (_ist_rational(k) and Q(k).denominator == 1)
                   for k in (self.x, self.y)):
                return '%s(%s | %s)' % (self._name_text(), _ung(self.x), _ung(self.y))
            return '%s ≈ %s' % (self.text(), self.text(dez=True))
        return self.text()

    def _repr_latex_(self):
        return '$%s$' % self.tex()


def _ung(x):
    """Für Näherungen: ≈ davor schreiben."""
    return ('≈' + zahl_text(x)) if _ist_naeherung(x) else zahl_text(x)


class Intervall(object):
    """Ein Intervall ``]a; b[`` – ``None`` als Grenze heißt ±∞."""

    __slots__ = ('von', 'bis', 'links_zu', 'rechts_zu', 'art')

    def __init__(self, von=None, bis=None, links_zu=False, rechts_zu=False, art=None):
        self.von, self.bis = von, bis
        self.links_zu = links_zu and von is not None
        self.rechts_zu = rechts_zu and bis is not None
        self.art = art          # etwa 'steigend' oder 'linksgekrümmt'

    def enthaelt(self, x):
        if self.von is not None:
            if x < self.von or (x == self.von and not self.links_zu):
                return False
        if self.bis is not None:
            if x > self.bis or (x == self.bis and not self.rechts_zu):
                return False
        return True

    __contains__ = enthaelt

    def text(self, dez=False):
        eckig = STIL.intervall != 'rund'
        l = '-∞' if self.von is None else zahl_text(self.von, dez=dez)
        r = '∞' if self.bis is None else zahl_text(self.bis, dez=dez)
        if eckig:
            a = '[' if self.links_zu else ']'
            b = ']' if self.rechts_zu else '['
        else:
            a = '[' if self.links_zu else '('
            b = ']' if self.rechts_zu else ')'
        return '%s%s; %s%s' % (a, l, r, b)

    def tex(self, dez=False):
        eckig = STIL.intervall != 'rund'
        l = r'-\infty' if self.von is None else zahl_tex(self.von, dez=dez)
        r = r'\infty' if self.bis is None else zahl_tex(self.bis, dez=dez)
        if eckig:
            a = '[' if self.links_zu else ']'
            b = ']' if self.rechts_zu else '['
        else:
            a = '[' if self.links_zu else '('
            b = ']' if self.rechts_zu else ')'
        return r'\left%s %s;\, %s \right%s' % (a, l, r, b)

    def __str__(self):
        return self.text()

    def __repr__(self):
        s = self.text()
        if any(g is not None and not (_ist_rational(g) and Q(g).denominator == 1)
               for g in (self.von, self.bis)):
            s += ' ≈ ' + self.text(dez=True)
        return s + (' (%s)' % self.art if self.art else '')


class Tabelle(object):
    """Eine Wertetabelle – ``print(t)``, ``t.tex()``, ``t.paare``."""

    __slots__ = ('kopf', 'paare')

    def __init__(self, kopf, paare):
        self.kopf = kopf            # (Text 'x', Text 'f(x)', TeX 'x', TeX 'f(x)')
        self.paare = paare

    def text(self, dez=False):
        z1 = [self.kopf[0]] + [zahl_text(a) for a, _ in self.paare]
        z2 = [self.kopf[1]] + [zahl_text(b, dez=dez) if not _ist_rational(b) or dez
                               else zahl_text(b) for _, b in self.paare]
        breite = [max(len(a), len(b)) for a, b in zip(z1, z2)]
        zeile = lambda z: ' | '.join(s.rjust(w) for s, w in zip(z, breite))
        return zeile(z1) + '\n' + '-+-'.join('-' * w for w in breite) + '\n' + zeile(z2)

    def tex(self):
        sp = 'c|' + 'c' * len(self.paare)
        z1 = ' & '.join([self.kopf[2]] + [zahl_tex(a) for a, _ in self.paare])
        z2 = ' & '.join([self.kopf[3]] + [zahl_tex(b) for _, b in self.paare])
        return '\\begin{array}{%s}\n%s \\\\ \\hline\n%s\n\\end{array}' % (sp, z1, z2)

    def __iter__(self):
        return iter(self.paare)

    def __len__(self):
        return len(self.paare)

    def __str__(self):
        return self.text()

    def __repr__(self):
        return self.text()


# ====================================================================== #
#  4) Rechnen mit Koeffizientenlisten (aufsteigend: a0, a1, a2, …)       #
# ====================================================================== #

def _kurz(k):
    k = [Zahl(c) for c in k] or [Zahl(0)]
    while len(k) > 1 and k[-1] == 0:
        k.pop()
    return k


def _grad(k):
    k = _kurz(k)
    return -1 if (len(k) == 1 and k[0] == 0) else len(k) - 1


def _plus(p, q):
    n = max(len(p), len(q))
    return _kurz([(p[i] if i < len(p) else 0) + (q[i] if i < len(q) else 0) for i in range(n)])


def _minus(p, q):
    return _plus(p, [-c for c in q])


def _mal(p, q):
    erg = [Zahl(0)] * (len(p) + len(q) - 1)
    for i, a in enumerate(p):
        if a == 0:
            continue
        for j, b in enumerate(q):
            erg[i + j] += a * b
    return _kurz(erg)


def _skal(p, c):
    return _kurz([a * c for a in p])


def _hoch(p, n):
    erg = [Zahl(1)]
    for _ in range(n):
        erg = _mal(erg, p)
    return erg


def _teilen(p, q):
    """Polynomdivision p : q -> (Quotient, Rest), exakt."""
    p, q = _kurz(p), _kurz(q)
    if _grad(q) < 0:
        raise ZeroDivisionError('Division durch das Nullpolynom')
    rest = list(p)
    dq = len(q) - 1
    quot = [Zahl(0)] * max(1, len(p) - dq)
    while _grad(rest) >= dq and _grad(rest) >= 0:
        dr = len(rest) - 1
        c = rest[-1] / q[-1]
        quot[dr - dq] = c
        for i in range(len(q)):
            rest[dr - dq + i] -= c * q[i]
        rest = _kurz(rest)
        if dr == 0:
            break
    return _kurz(quot), _kurz(rest)


def _abl(p):
    return _kurz([i * p[i] for i in range(1, len(p))]) if len(p) > 1 else [Zahl(0)]


def _wert(p, x):
    """Horner-Schema – exakt für Brüche und Wurzelzahlen."""
    erg = Zahl(0)
    for c in reversed(p):
        erg = erg * x + c
    if isinstance(erg, Bruch) and not isinstance(erg, Zahl):
        erg = Zahl(erg)
    return erg


def _verketten(p, q):
    """p(q(x))"""
    erg = [Zahl(0)]
    for c in reversed(p):
        erg = _plus(_mal(erg, q), [c])
    return erg


def _ggt(p, q):
    """Größter gemeinsamer Teiler zweier Polynome (normiert)."""
    p, q = _kurz(p), _kurz(q)
    while _grad(q) >= 0:
        p, q = q, _teilen(p, q)[1]
    if _grad(p) < 0:
        return [Zahl(0)]
    return _skal(p, 1 / p[-1])


def _quadratfrei_zerlegen(p):
    """Yun: p = c·∏ teil_i^i – Liste von (teil, i) mit quadratfreien Teilen."""
    p = _kurz(p)
    if _grad(p) <= 0:
        return []
    a = _skal(p, 1 / p[-1])
    b = _abl(a)
    c = _ggt(a, b)
    w = _teilen(a, c)[0]
    y = _teilen(b, c)[0]
    raus = []
    i = 1
    while _grad(w) > 0:
        z = _minus(y, _abl(w))
        g = _ggt(w, z) if _grad(z) >= 0 else w
        if _grad(g) > 0:
            raus.append((g, i))
        w = _teilen(w, g)[0]
        y = _teilen(z, g)[0] if _grad(z) >= 0 else [Zahl(0)]
        i += 1
    return raus


def _ganzzahlig(p):
    """Dasselbe Polynom mit teilerfremden ganzen Koeffizienten (Leitkoeffizient > 0
    bleibt erhalten, wie er ist) – und der Faktor, mit dem multipliziert wurde."""
    p = _kurz(p)
    n = 1
    for c in p:
        n = n * c.denominator // math.gcd(n, c.denominator)
    g = 0
    for c in p:
        g = math.gcd(g, int(c * n))
    g = g or 1
    return [Zahl(int(c * n) // g) for c in p], Zahl(n, g)


def _teiler(n):
    n = abs(int(n))
    if n == 0:
        return [0]
    klein, gross = [], []
    d = 1
    while d * d <= n:
        if n % d == 0:
            klein.append(d)
            if d * d != n:
                gross.append(n // d)
        d += 1
    return klein + gross[::-1]


def _kandidaten(k):
    """Mögliche rationale Nullstellen ±p/q (p | a0, q | an) – ganze zuerst."""
    k = _ganzzahlig(k)[0]
    a0, an = k[0], k[-1]
    ps, qs = _teiler(a0), _teiler(an)
    ganz = [Zahl(s * p) for p in ps for s in (1, -1)]
    bruch = sorted({Zahl(s * p, q) for p in ps for q in qs if q > 1 for s in (1, -1)}
                   - set(ganz), key=lambda c: (abs(c), c < 0))
    return ganz + bruch


# ====================================================================== #
#  5) Eingabe: Polynome aus Text lesen                                   #
# ====================================================================== #

_HOCHZ = '⁰¹²³⁴⁵⁶⁷⁸⁹'
_HOCH_RE = re.compile('[%s]+' % _HOCHZ)
_HOCH_TAB = {ord(c): str(i) for i, c in enumerate(_HOCHZ)}


def _vorbereiten(s):
    """Vereinheitlicht eine Eingabe: Sonderzeichen, LaTeX, Hochzahlen, Komma."""
    s = str(s)
    for a, b in (('−', '-'), ('–', '-'), ('—', '-'), ('·', '*'), ('⋅', '*'),
                 ('×', '*'), ('∙', '*'), ('÷', '/'), ('\u00a0', ' '), ('\u202f', ' '),
                 ('$', ''), ('**', '^')):
        s = s.replace(a, b)
    # LaTeX: \frac{a}{b}, \left( \right), \cdot, \, …
    alt = None
    while alt != s:
        alt = s
        s = re.sub(r'\\[dt]?frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}', r'((\1)/(\2))', s)
    s = s.replace('\\left', '').replace('\\right', '')
    s = s.replace('\\cdot', '*').replace('\\times', '*')
    s = re.sub(r'\\[,;:! ]', ' ', s)
    s = s.replace('{', '(').replace('}', ')').replace('[', '(').replace(']', ')')
    s = _HOCH_RE.sub(lambda m: '^(' + m.group(0).translate(_HOCH_TAB) + ')', s)
    s = re.sub(r'(\d)\s*,\s*(\d)', r'\1.\2', s)          # Dezimalkomma
    return s.strip()


_KOPF_RE = re.compile(r"^\s*([A-Za-z][A-Za-z0-9_]*'*)\s*\(\s*([A-Za-z])\s*\)\s*:?=\s*(.*)$", re.S)
_Y_RE = re.compile(r'^\s*y\s*=\s*(.*)$', re.S)

_TOKEN_RE = re.compile(r'\s*(?:(\d+\.\d*|\.\d+|\d+)|([A-Za-z])|(\^|\*|/|\+|-|\(|\)))')


def _zerlegen(s):
    raus = []
    i = 0
    s = s.rstrip()
    while i < len(s):
        m = _TOKEN_RE.match(s, i)
        if not m or m.end() == i:
            rest = s[i:].strip()
            if not rest:
                break
            raise EingabeFehler('Das Zeichen »%s« kann ich nicht lesen.' % rest[0])
        if m.group(1) is not None:
            raus.append(('zahl', Zahl(m.group(1))))
        elif m.group(2) is not None:
            raus.append(('var', m.group(2)))
        else:
            raus.append(('op', m.group(3)))
        i = m.end()
    return raus


class _Leser(object):
    """Rekursiver Abstieg: Summe > Produkt > Vorzeichen > Potenz > Atom."""

    def __init__(self, token, var):
        self.t = token
        self.i = 0
        self.var = var

    def guck(self):
        return self.t[self.i] if self.i < len(self.t) else (None, None)

    def nimm(self):
        tok = self.guck()
        self.i += 1
        return tok

    def fertig(self):
        p = self.summe()
        if self.i < len(self.t):
            art, w = self.t[self.i]
            if (art, w) == ('op', ')'):
                raise EingabeFehler('Zu viele schließende Klammern.')
            raise EingabeFehler('Unerwartet: »%s«' % w)
        return p

    def summe(self):
        p = self.produkt()
        while self.guck() in (('op', '+'), ('op', '-')):
            op = self.nimm()[1]
            q = self.produkt()
            p = _plus(p, q) if op == '+' else _minus(p, q)
        return p

    def produkt(self):
        p = self.vorzeichen()
        while True:
            art, w = self.guck()
            if (art, w) == ('op', '*'):
                self.nimm()
                p = _mal(p, self.vorzeichen())
            elif (art, w) == ('op', '/'):
                self.nimm()
                q = self.vorzeichen()
                p = self._durch(p, q)
            elif art in ('zahl', 'var') or (art, w) == ('op', '('):
                vor = self.t[self.i - 1] if self.i else (None, None)
                if art == 'zahl' and vor[0] in ('var', 'zahl'):
                    raise EingabeFehler('»%s%s« – fehlt ein Rechenzeichen? (meinst du %s^%s?)'
                                        % (vor[1], zahl_text(w), vor[1], zahl_text(w)))
                p = _mal(p, self.potenz())          # 2x, 3(x+1), (x-1)(x+2)
            else:
                return p

    def _durch(self, p, q):
        if _grad(q) < 0:
            raise ZeroDivisionError('Division durch 0')
        if _grad(q) == 0:
            return _skal(p, 1 / q[0])
        quot, rest = _teilen(p, q)
        if _grad(rest) >= 0:
            raise EingabeFehler('Teilen durch einen Term mit %s ergibt kein Polynom.' % self.var)
        return quot

    def vorzeichen(self):
        art, w = self.guck()
        if (art, w) == ('op', '-'):
            self.nimm()
            return _skal(self.vorzeichen(), -1)
        if (art, w) == ('op', '+'):
            self.nimm()
            return self.vorzeichen()
        return self.potenz()

    def potenz(self):
        basis = self.atom()
        if self.guck() == ('op', '^'):
            self.nimm()
            e = self.hochzahl()
            if _grad(basis) <= 0:
                c = basis[0]
                if c == 0 and e < 0:
                    raise ZeroDivisionError('0 hoch eine negative Zahl')
                return [Zahl(c) ** e]
            if e < 0:
                raise EingabeFehler('Negative Hochzahlen ergeben kein Polynom.')
            if e > 200:
                raise EingabeFehler('Die Hochzahl %d ist zu groß.' % e)
            return _hoch(basis, e)
        return basis

    def hochzahl(self):
        art, w = self.guck()
        vz = 1
        while (art, w) in (('op', '-'), ('op', '+')):
            if w == '-':
                vz = -vz
            self.nimm()
            art, w = self.guck()
        p = self.potenz()
        if _grad(p) > 0:
            raise EingabeFehler('In der Hochzahl darf kein %s stehen.' % self.var)
        e = vz * p[0]
        if Q(e).denominator != 1:
            raise EingabeFehler('Die Hochzahl %s ist keine ganze Zahl.' % zahl_text(e))
        return int(e)

    def atom(self):
        art, w = self.nimm()
        if art is None:
            raise EingabeFehler('Die Eingabe hört mitten in der Rechnung auf.')
        if art == 'zahl':
            return [w]
        if art == 'var':
            if w != self.var:
                raise EingabeFehler('Nur eine Variable erlaubt (%s) – »%s« kenne ich nicht.'
                                    % (self.var, w))
            return [Zahl(0), Zahl(1)]
        if w == '(':
            if self.guck() == ('op', ')'):
                raise EingabeFehler('Leere Klammer.')
            p = self.summe()
            if self.nimm() != ('op', ')'):
                raise EingabeFehler('Eine Klammer wird nicht geschlossen.')
            return p
        raise EingabeFehler('Unerwartet: »%s«' % w)


def _lies_polynom(text, variable=None):
    """Text -> (Koeffizienten aufsteigend, Name, Variable)."""
    s = _vorbereiten(text)
    name = None
    m = _KOPF_RE.match(s)
    if m:
        name, var, s = m.group(1), m.group(2), m.group(3)
        variable = variable or var
    else:
        m = _Y_RE.match(s)
        if m:
            s = m.group(1)
    if '=' in s:
        raise EingabeFehler('Ein Polynom ist ein Term ohne Gleichheitszeichen – '
                            'für Gleichungen gibt es loese("…").')
    if not s.strip():
        raise EingabeFehler('Leere Eingabe.')
    token = _zerlegen(s)
    buchstaben = sorted({w for art, w in token if art == 'var'})
    if variable is None:
        if len(buchstaben) > 1:
            raise EingabeFehler('Mehrere Variablen (%s) – ein Polynom hat nur eine.'
                                % ', '.join(buchstaben))
        variable = buchstaben[0] if buchstaben else 'x'
    return _Leser(token, variable).fertig(), name, variable


def _hochzahl_text(n):
    if STIL.hoch == '^':
        return '^%d' % n
    return ''.join(_HOCHZ[int(c)] for c in str(n))


def _term_text(k, var='x'):
    """Ein Polynom als Text: ``-x⁴ + 5x³ + 6`` bzw. ``1/3 x³ - 5x²``."""
    k = _kurz(k)
    teile = []
    for e in range(len(k) - 1, -1, -1):
        c = k[e]
        if c == 0:
            continue
        vz = '-' if c < 0 else '+'
        a = abs(c)
        if e == 0:
            kern = zahl_text(a)
        else:
            pot = var if e == 1 else var + _hochzahl_text(e)
            if a == 1:
                kern = pot
            else:
                z = zahl_text(a)
                kern = z + (' ' if '/' in z else '') + pot
        teile.append((vz, kern))
    if not teile:
        return '0'
    s = ('-' if teile[0][0] == '-' else '') + teile[0][1]
    for vz, kern in teile[1:]:
        s += ' %s %s' % (vz, kern)
    return s


def _term_tex(k, var='x'):
    """Ein Polynom als LaTeX: ``-x^4+5x^3+6`` bzw. ``\\frac{1}{3}x^3-5x^2``."""
    k = _kurz(k)
    s = ''
    for e in range(len(k) - 1, -1, -1):
        c = k[e]
        if c == 0:
            continue
        a = abs(c)
        vz = '-' if c < 0 else ('+' if s else '')
        if e == 0:
            kern = zahl_tex(a)
        else:
            pot = var if e == 1 else (var + '^{%d}' % e if e > 9 else var + '^%d' % e)
            kern = pot if a == 1 else zahl_tex(a) + pot
        s += vz + kern
    return s or '0'


def _seiten_term(k):
    """Ein Polynom so, wie die Aufgabenseiten es lesen (Brüche als a/b, x^n)."""
    k = _kurz(k)
    s = ''
    for e in range(len(k) - 1, -1, -1):
        c = k[e]
        if c == 0:
            continue
        a = abs(c)
        vz = '-' if c < 0 else ('+' if s else '')
        z = '%d/%d' % (a.numerator, a.denominator) if a.denominator != 1 else str(a.numerator)
        if e == 0:
            kern = z
        else:
            pot = 'x' if e == 1 else 'x^%d' % e
            kern = pot if a == 1 else z + pot
        s += vz + kern
    return s or '0'


# ====================================================================== #
#  6) Nullstellen: exakt, wo es geht – sonst ehrlich genähert            #
# ====================================================================== #

def _quadratisch_exakt(k):
    """Lösungen von a·x² + b·x + c = 0 als Brüche oder Wurzelzahlen."""
    c, b, a = k[0], k[1], k[2]
    d = b * b - 4 * a * c
    if d < 0:
        return []
    if d == 0:
        return [Zahl(-b / (2 * a))]
    w1 = Wurzelzahl(-b / (2 * a), -1 / (2 * a), d)
    w2 = Wurzelzahl(-b / (2 * a), 1 / (2 * a), d)
    return sorted([w1, w2], key=float)


def _exponenten_ggt(k):
    g = 0
    for e in range(1, len(k)):
        if k[e] != 0:
            g = math.gcd(g, e)
    return g


def _halbieren(k, a, b, schritte=80):
    """Intervallhalbierung mit exakten Brüchen auf [a; b] (Vorzeichenwechsel)."""
    fa = _wert(k, a)
    for _ in range(schritte):
        m = (a + b) / 2
        fm = _wert(k, m)
        if fm == 0:
            return m
        if (fm > 0) == (fa > 0):
            a, fa = m, fm
        else:
            b = m
    return (a + b) / 2


def _numerisch(k):
    """Reelle Nullstellen eines quadratfreien Polynoms (Näherungen).

    Zwischen zwei Nullstellen der Ableitung ist k monoton – dort liegt
    höchstens eine Nullstelle, die Intervallhalbierung findet sie sicher.
    """
    k = _kurz(k)
    d = _grad(k)
    if d < 1:
        return []
    if d == 1:
        return [Zahl(-k[0] / k[1])]
    schranke = 1 + max(abs(c / k[-1]) for c in k[:-1])
    krit = []
    for teil, _ in _quadratfrei_zerlegen(_abl(k)):
        krit.extend(float(z) for z in _numerisch(teil))
    s = float(schranke)
    punkte = sorted({-s, s} | {c for c in krit if -s < c < s})
    raus = []
    for u, v in zip(punkte, punkte[1:]):
        qu, qv = Q(u), Q(v)
        fu, fv = _wert(k, qu), _wert(k, qv)
        if fu == 0:
            raus.append(qu)
            continue
        if fv != 0 and (fu > 0) != (fv > 0):
            raus.append(_halbieren(k, qu, qv))
    if _wert(k, Q(punkte[-1])) == 0:
        raus.append(Q(punkte[-1]))
    return [Naeherung(float(z)) for z in raus]


def _nicht_rational(k):
    """Nullstellen ohne rationale Lösung: Substitution, sonst Näherung."""
    m = _exponenten_ggt(k)
    if m >= 2:
        z_poly = [k[e] for e in range(0, len(k), m)]
        raus = []
        for z in _nullstellen_quadratfrei(z_poly):
            if m % 2 == 0:
                if z > 0:
                    w = nte_wurzel(z, m) if _ist_rational(z) else (
                        _wurzel_aus_wurzelzahl(z) if (m == 2 and isinstance(z, Wurzelzahl))
                        else Naeherung(float(z) ** (1.0 / m)))
                    raus.extend([-w, w])
            else:
                raus.append(nte_wurzel(z, m) if _ist_rational(z)
                            else Naeherung(math.copysign(abs(float(z)) ** (1.0 / m), float(z))))
        return raus
    return _numerisch(k)


def _nullstellen_quadratfrei(k):
    """Alle reellen Nullstellen eines quadratfreien Polynoms."""
    k = _kurz(k)
    if _grad(k) <= 0:
        return []
    k = _ganzzahlig(k)[0]
    raus = []
    if k[0] == 0:
        raus.append(Zahl(0))
        k = _teilen(k, [0, 1])[0]
    if _grad(k) >= 1:
        for r in _kandidaten(k):
            if _grad(k) < 1:
                break
            if _wert(k, r) == 0:
                raus.append(r)
                k = _teilen(k, [-r, 1])[0]
    d = _grad(k)
    if d == 2:
        raus.extend(_quadratisch_exakt(k))
    elif d >= 3:
        raus.extend(_nicht_rational(k))
    return raus


def _nullstellen_mit_vielfachheit(k):
    """[(x, Vielfachheit), …] aufsteigend."""
    k = _kurz(k)
    if _grad(k) < 0:
        raise PolynomFehler('Die Nullfunktion ist überall null.')
    raus = []
    for teil, m in _quadratfrei_zerlegen(k):
        for z in _nullstellen_quadratfrei(teil):
            raus.append((z, m))
    raus.sort(key=lambda p: float(p[0]))
    return raus


# ---------------------------------------------------------------------- #
#  Formelstücke für die Lösungswege                                      #
# ---------------------------------------------------------------------- #

def _T(k, var='x'):
    """Ein Polynom als Formelstück."""
    return Teil(_term_text(k, var), _term_tex(k, var))


def _fn(name, n=0, var='x'):
    """``f''(x)`` als Formelstück."""
    return Teil('%s%s(%s)' % (name, "'" * n, var), '%s%s(%s)' % (name, "'" * n, var))


def _fn_an(name, x0, n=0):
    """``f''(15/4)`` als Formelstück."""
    return Teil('%s%s(%s)' % (name, "'" * n, zahl_text(x0)),
                '%s%s\\left(%s\\right)' % (name, "'" * n, zahl_tex(x0))
                if not (_ist_rational(x0) and Q(x0).denominator == 1 and x0 >= 0)
                else '%s%s(%s)' % (name, "'" * n, zahl_tex(x0)))


def _gleich(x):
    """Relationszeichen vor einem Ergebnis: = (exakt) oder ≈ (Näherung)."""
    return '≈' if _ist_naeherung(x) else '='


def _abbrechend(x):
    """Ist x ein Bruch mit endlicher Dezimaldarstellung in den Anzeigestellen?"""
    if not _ist_rational(x):
        return False
    n = Q(x).denominator
    for p in (2, 5):
        while n % p == 0:
            n //= p
    if n != 1:
        return False
    return Q(x) * 10 ** STIL.stellen == int(Q(x) * 10 ** STIL.stellen)


def _wert_glieder(x):
    """Glieder für einen Wert: exakt und – wenn nötig – gerundet."""
    if _ist_naeherung(x):
        return [('≈', x)]
    if _ist_rational(x) and Q(x).denominator == 1:
        return [x]
    if _abbrechend(x):
        return [x, ('=', float(x))]
    return [x, ('≈', float(x))]


def _eingesetzt(k, x0, var='x'):
    """Das Polynom mit eingesetzter Zahl: ``-(15/4)⁴ + 5·(15/4)³ + 6``."""
    k = _kurz(k)
    tt, tx = [], []
    z = _in_klammern(x0)
    for e in range(len(k) - 1, -1, -1):
        c = k[e]
        if c == 0:
            continue
        vz = '-' if c < 0 else '+'
        a = abs(c)
        if e == 0:
            st, sx = zahl_text(a), zahl_tex(a)
        else:
            pt = z.t if e == 1 else z.t + _hochzahl_text(e)
            px = z.x if e == 1 else z.x + ('^{%d}' % e)
            if a == 1:
                st, sx = pt, px
            else:
                st, sx = zahl_text(a) + '·' + pt, zahl_tex(a) + r'\cdot ' + px
        if not tt:
            tt.append(('-' if vz == '-' else '') + st)
            tx.append(('-' if vz == '-' else '') + sx)
        else:
            tt.append(' %s %s' % (vz, st))
            tx.append('%s%s' % (vz, sx))
    if not tt:
        return Teil('0')
    return Teil(''.join(tt), ''.join(tx))


def _summanden(k, x0):
    """Die einzelnen Summanden nach dem Einsetzen: ``-16 + 40 + 6``."""
    k = _kurz(k)
    werte = [k[e] * x0 ** e for e in range(len(k) - 1, -1, -1) if k[e] != 0]
    if len(werte) <= 1:
        return None
    if any(not _ist_rational(w) for w in werte):
        return None
    tt, tx = [], []
    for i, w in enumerate(werte):
        if i == 0:
            tt.append(zahl_text(w))
            tx.append(zahl_tex(w))
        else:
            tt.append(' %s %s' % ('-' if w < 0 else '+', zahl_text(abs(w))))
            tx.append('%s%s' % ('-' if w < 0 else '+', zahl_tex(abs(w))))
    return Teil(''.join(tt), ''.join(tx))


def _einsetzen_schritt(k, x0, name, n=0, var='x', hinw=None, einzug=0, mit_summen=True):
    """Schritt ``f(2) = 2³ - 4·2 = 8 - 8 = 0`` – Rückgabe (Schritt, Wert)."""
    w = _wert(k, x0)
    glieder = []
    ein = _eingesetzt(k, x0, var)
    if ein.t != zahl_text(w):
        glieder.append(ein)
        if mit_summen and x0 != 0:
            s = _summanden(k, x0)
            if s is not None and s.t != ein.t and s.t != zahl_text(w):
                glieder.append(s)
    glieder.extend(_wert_glieder(w))
    return Schritt(_fn_an(name, x0, n), glieder, hinweis=hinw, einzug=einzug), w


def _loesungen_text(loes, var='x'):
    """``x₁ = -1, x₂ ≈ 5,05`` als Formelstück."""
    if not loes:
        return Teil('keine Lösung', r'\text{keine Lösung}')
    tt, tx = [], []
    mehr = len(loes) > 1
    for i, (z, m) in enumerate(loes):
        name_t = var + (_index_text(i + 1) if mehr else '')
        name_x = var + ('_{%d}' % (i + 1) if mehr else '')
        rel = _gleich(z)
        rel_x = r'\approx' if rel == '≈' else '='
        zus_t = {2: ' (doppelt)', 3: ' (dreifach)'}.get(m, ' (%d-fach)' % m if m > 3 else '')
        zus_x = r'\ \text{(%s)}' % zus_t.strip(' ()') if zus_t else ''
        tt.append('%s %s %s%s' % (name_t, rel, zahl_text(z), zus_t))
        tx.append('%s %s %s%s' % (name_x, rel_x, zahl_tex(z), zus_x))
    return Teil(', '.join(tt), r',\quad '.join(tx))


def _zusammen(loes):
    """Gleiche Lösungen zusammenfassen (Vielfachheiten addieren), sortieren."""
    raus = []
    for z, m in loes:
        for i, (w, n) in enumerate(raus):
            if (ist_exakt(z) and ist_exakt(w) and z == w) or (
                    not (ist_exakt(z) and ist_exakt(w)) and abs(float(z) - float(w)) < 1e-12):
                raus[i] = (w, n + m)
                break
        else:
            raus.append((z, m))
    raus.sort(key=lambda p: float(p[0]))
    return raus


# ---------------------------------------------------------------------- #
#  Lösungsweg für p(x) = 0                                               #
# ---------------------------------------------------------------------- #

def _loese(k, var='x', name='f', einzug=0):
    """Löst p(x) = 0 wie im Unterricht: (Lösungen mit Vielfachheit, Schritte, Weg).

    ``Weg`` ist der Name des Verfahrens (für den Verweis auf die Webseite).
    """
    k = _kurz(k)
    d = _grad(k)
    S = []
    E = einzug
    if d < 0:
        S.append(hinweis('0 = 0 gilt für jedes %s.' % var, einzug=E))
        return [], S, None
    if d == 0:
        S.append(hinweis('%s = 0 ist falsch – keine Lösung.' % zahl_text(k[0]), einzug=E))
        return [], S, None
    if d == 1:
        a, b = k[1], k[0]
        x0 = Zahl(-b / a)
        if b != 0 or a != 1:
            S.append(hinweis('Nach %s auflösen:' % var, einzug=E))
        if b != 0:
            S.append(Schritt(_T([0, a], var), [-b], einzug=E + 1))
        if a != 1:
            bf = bruchform(-b, a)
            S.append(Schritt(Teil(var), [bf, x0] if (bf.t != zahl_text(x0) and b != 0) else [x0],
                             einzug=E + 1))
        return [(x0, 1)], S, 'linear'

    # --- 1) x ausklammern ------------------------------------------------ #
    if k[0] == 0:
        j = next(i for i, c in enumerate(k) if c != 0)
        rest = k[j:]
        pot_t = var if j == 1 else var + _hochzahl_text(j)
        pot_x = var if j == 1 else var + '^%d' % j
        S.append(Schritt(Ausdruck(Teil(pot_t, pot_x), MAL, Teil('(', r'\left('), _T(rest, var),
                                  Teil(')', r'\right)')), [0],
                         hinweis=[pot_t + ' ausklammern:'], einzug=E))
        S.append(hinweis('Satz vom Nullprodukt: Ein Produkt ist null, wenn ein Faktor null ist.',
                         einzug=E))
        loes = [(Zahl(0), j)]
        if j == 1:
            S.append(Schritt(Teil(var), [0], einzug=E + 1))
        else:
            wort = _vielfach_wort(j)
            S.append(Schritt(Teil(pot_t, pot_x), [0, ('⇒', Teil('%s = 0 (%s)' % (var, wort),
                                                               r'%s = 0\ \text{(%s)}' % (var, wort)))],
                             einzug=E + 1))
        if _grad(rest) >= 1:
            S.append(Schritt(_T(rest, var), [0], hinweis='oder:', einzug=E + 1))
            l2, s2, _ = _loese(rest, var, name, E + 2)
            S.extend(s2)
            loes += l2
        loes = _zusammen(loes)
        return loes, S, 'ausklammern'

    nz = [e for e in range(1, d + 1) if k[e] != 0]
    # --- 2) reine Potenz a·xⁿ + c = 0 ----------------------------------- #
    if nz == [d] and d >= 2:
        a, c = k[d], k[0]
        q = Zahl(-c / a)
        pot_t, pot_x = var + _hochzahl_text(d), var + '^%d' % d
        S.append(Schritt(Teil(pot_t, pot_x), [q], hinweis='Nach %s auflösen:' % pot_t, einzug=E))
        if d % 2 == 0:
            if q < 0:
                S.append(hinweis('Eine gerade Potenz ist nie negativ – keine Lösung.', einzug=E))
                return [], S, 'potenz'
            w = nte_wurzel(q, d)
            wt = '√' if d == 2 else {4: '∜'}.get(d, '%d√' % d)
            S.append(Schritt(Teil(var + '₁,₂', var + '_{1,2}'),
                             [Teil('±%s%s' % (wt, _klammer_wenn(q)),
                                   r'\pm\sqrt%s{%s}' % ('' if d == 2 else '[%d]' % d, zahl_tex(q))),
                              Teil('±' + zahl_text(w), r'\pm ' + zahl_tex(w))]
                             + ([('≈', Teil('±' + zahl_text(float(w)), r'\pm ' + zahl_tex(float(w))))]
                                if not _ist_rational(w) else []),
                             hinweis='Wurzel ziehen – zwei Lösungen:', einzug=E))
            return [(-w, 1), (w, 1)], S, 'potenz'
        w = nte_wurzel(q, d)
        glieder = [Teil('%d√%s' % (d, _klammer_wenn(q)) if d > 3 else '∛' + _klammer_wenn(q),
                        r'\sqrt[%d]{%s}' % (d, zahl_tex(q)))]
        if _ist_rational(w):
            glieder.append(w)
        else:
            glieder.append(('≈', float(w)))
        S.append(Schritt(Teil(var), glieder, hinweis='Wurzel ziehen (ungerade Hochzahl: eine Lösung):',
                         einzug=E))
        return [(w, 1)], S, 'potenz'

    # --- 3) quadratische Gleichung -------------------------------------- #
    if d == 2:
        loes, s2 = _quadratisch_weg(k, var, E)
        return loes, S + s2, 'quadratisch'

    # --- 4) Substitution (biquadratisch: nur x⁴, x², Zahl) --------------- #
    m = _exponenten_ggt(k)
    if m >= 2 and set(nz) == {m, 2 * m}:
        zk = [k[0], k[m], k[2 * m]]
        pot_t, pot_x = var + _hochzahl_text(m), var + '^%d' % m
        S.append(hinweis('Substitution ', Teil('z = %s' % pot_t, 'z = %s' % pot_x),
                         ' – es entsteht eine quadratische Gleichung:', einzug=E))
        S.append(Schritt(_T(zk, 'z'), [0], einzug=E))
        zl, s2 = _quadratisch_weg(zk, 'z', E + 1)
        S.extend(s2)
        S.append(hinweis('Rücksubstitution ', Teil('%s = z' % pot_t, '%s = z' % pot_x), ':',
                         einzug=E))
        loes = []
        for z, _ in zl:
            S.append(Schritt(Teil(pot_t, pot_x), [z], einzug=E + 1))
            if m % 2 == 0 and z < 0:
                S.append(hinweis('negativ – keine Lösung', einzug=E + 2))
                continue
            if z == 0:
                S.append(Schritt(Teil(var), [0], einzug=E + 2))
                loes.append((Zahl(0), m))
                continue
            if m % 2 == 0:
                w = nte_wurzel(z, m) if _ist_rational(z) else _wurzel_aus_wurzelzahl(z) \
                    if (m == 2 and isinstance(z, Wurzelzahl)) else Naeherung(float(z) ** (1.0 / m))
                gl = [Teil('±' + zahl_text(w), r'\pm ' + zahl_tex(w))]
                if not _ist_rational(w):
                    gl.append(('≈', Teil('±' + zahl_text(float(w)), r'\pm ' + zahl_tex(float(w)))))
                S.append(Schritt(Teil(var), gl, einzug=E + 2))
                loes += [(-w, 1), (w, 1)]
            else:
                w = nte_wurzel(z, m) if _ist_rational(z) else Naeherung(
                    math.copysign(abs(float(z)) ** (1.0 / m), float(z)))
                S.append(Schritt(Teil(var), _wert_glieder(w), einzug=E + 2))
                loes.append((w, 1))
        return _zusammen(loes), S, 'biquadratisch'

    # --- 5) Nullstelle raten + Polynomdivision -------------------------- #
    loes, s2, ok = _raten_weg(k, var, name, E)
    return loes, S + s2, 'raten'


def _vielfach_wort(m):
    return {1: 'einfach', 2: 'doppelt', 3: 'dreifach', 4: 'vierfach'}.get(m, '%d-fach' % m)


def _klammer_wenn(q):
    t = zahl_text(q)
    return '(%s)' % t if ('/' in t or len(t) > 1 and not t.isdigit()) else t


def bruchform(z, n):
    """Ein Bruch z/n als Formelstück – ungekürzt, wie er beim Rechnen entsteht."""
    z, n = Q(z), Q(n)
    if n < 0:
        z, n = -z, -n
    if _ist_rational(z) and _ist_rational(n) and z.denominator == 1 and n.denominator == 1:
        return Teil('%s/%s' % (zahl_text(z), zahl_text(n)),
                    r'%s\frac{%s}{%s}' % ('-' if z < 0 else '', zahl_text(abs(z)), zahl_text(n)))
    return Teil('(%s)/(%s)' % (zahl_text(z), zahl_text(n)),
                r'\frac{%s}{%s}' % (zahl_tex(z), zahl_tex(n)))


def _quadratisch_weg(k, var='x', einzug=0):
    """a·x² + b·x + c = 0 mit der p-q-Formel (oder der abc-Formel)."""
    E = einzug
    c, b, a = k[0], k[1], k[2]
    S = []
    if STIL.quadratisch == 'abc':
        d = b * b - 4 * a * c
        S.append(hinweis('abc-Formel mit a = %s, b = %s, c = %s:'
                         % (zahl_text(a), zahl_text(b), zahl_text(c)), einzug=E))
        wur_t = '√(%s² - 4·%s·%s)' % (_klammer_neg(b), _klammer_neg(a), _klammer_neg(c))
        wur_x = r'\sqrt{%s^2-4\cdot %s\cdot %s}' % (_tex_klammer_neg(b), _tex_klammer_neg(a),
                                                    _tex_klammer_neg(c))
        glieder = [Teil('(%s ± %s)/%s' % (zahl_text(-b), wur_t, zahl_text(2 * a)),
                        r'\frac{%s\pm %s}{%s}' % (zahl_tex(-b), wur_x, zahl_tex(2 * a))),
                   Teil('(%s ± √%s)/%s' % (zahl_text(-b), _klammer_wenn(d), zahl_text(2 * a)),
                        r'\frac{%s\pm\sqrt{%s}}{%s}' % (zahl_tex(-b), zahl_tex(d), zahl_tex(2 * a)))]
        S.append(Schritt(Teil(var + '₁,₂', var + '_{1,2}'), glieder, einzug=E))
        D, mitte, halb = d, -b / (2 * a), None
    else:
        p, q = b / a, c / a
        if a != 1:
            S.append(Schritt(_T([q, p, 1], var), [0],
                             hinweis='Durch %s teilen (Normalform):' % zahl_text(a), einzug=E))
        S.append(hinweis('p-q-Formel mit p = %s und q = %s:' % (zahl_text(p), zahl_text(q)),
                         einzug=E))
        mitte = -p / 2
        D = (p / 2) ** 2 - q
        rad_t = '%s %s %s' % (zahl_text((p / 2) ** 2), '-' if q > 0 else '+', zahl_text(abs(q)))
        rad_x = '%s%s%s' % (zahl_tex((p / 2) ** 2), '-' if q > 0 else '+', zahl_tex(abs(q)))
        glieder = [Teil('%s ± √(%s)' % (zahl_text(mitte), rad_t),
                        r'%s\pm\sqrt{%s}' % (zahl_tex(mitte), rad_x))]
        if q != 0:
            glieder.append(Teil('%s ± √%s' % (zahl_text(mitte), _klammer_wenn(D)),
                                r'%s\pm\sqrt{%s}' % (zahl_tex(mitte), zahl_tex(D))))
        S.append(Schritt(Teil(var + '₁,₂', var + '_{1,2}'), glieder, einzug=E))
    if D < 0:
        S.append(hinweis('Unter der Wurzel steht eine negative Zahl – keine Lösung.', einzug=E))
        return [], S
    if D == 0:
        x0 = Zahl(-b / (2 * a))
        S.append(Schritt(Teil(var), [x0], hinweis='Die Wurzel ist 0 – eine (doppelte) Lösung:',
                         einzug=E))
        return [(x0, 2)], S
    l1, l2 = _quadratisch_exakt(k)
    w = wurzel(D)
    if _ist_rational(w) and STIL.quadratisch != 'abc':
        S.append(Schritt(Teil(var + '₁,₂', var + '_{1,2}'),
                         [Teil('%s ± %s' % (zahl_text(mitte), zahl_text(w)),
                               r'%s\pm %s' % (zahl_tex(mitte), zahl_tex(w)))], einzug=E))
    elif _ist_rational(w):
        S.append(Schritt(Teil(var + '₁,₂', var + '_{1,2}'),
                         [Teil('(%s ± %s)/%s' % (zahl_text(-b), zahl_text(w), zahl_text(2 * a)),
                               r'\frac{%s\pm %s}{%s}' % (zahl_tex(-b), zahl_tex(w), zahl_tex(2 * a)))],
                         einzug=E))
    S.append(Schritt(Teil(var + '₁', var + '_1'), _wert_glieder(l1), einzug=E))
    S.append(Schritt(Teil(var + '₂', var + '_2'), _wert_glieder(l2), einzug=E))
    return [(l1, 1), (l2, 1)], S


def _klammer_neg(x):
    return '(%s)' % zahl_text(x) if x < 0 else zahl_text(x)


def _tex_klammer_neg(x):
    return r'\left(%s\right)' % zahl_tex(x) if x < 0 else zahl_tex(x)


def _horner_tex(k, r, quot):
    """Das Horner-Schema als LaTeX-Tabelle."""
    oben = ' & '.join(zahl_tex(c) for c in reversed(k))
    mitte = ' & '.join([''] + [zahl_tex(r * c) for c in reversed(quot)])
    unten = ' & '.join([zahl_tex(c) for c in reversed(quot)] + ['0'])
    sp = 'r|' + 'r' * len(k)
    return (r'\begin{array}{%s} & %s \\ %s & %s \\ \hline & %s\end{array}'
            % (sp, oben, zahl_tex(r), mitte, unten))


def _raten_weg(k, var, name, E):
    """Nullstelle raten, Polynomdivision, Rest lösen."""
    S = []
    ki, fak = _ganzzahlig(k)
    if fak != 1 and fak != -1:
        S.append(Schritt(_T(ki, var), [0], hinweis='Mit %s multiplizieren – ganze Koeffizienten:'
                         % zahl_text(fak), einzug=E))
    a0 = ki[0]
    tl = _teiler(a0)
    S.append(hinweis('Nullstelle raten: Ganzzahlige Lösungen sind Teiler von %s: %s'
                     % (zahl_text(abs(a0)), ', '.join('±%d' % t for t in tl)), einzug=E))
    gefunden = None
    versuche = 0
    pn = name or 'p'
    for r in _kandidaten(ki):
        wert = _wert(k, r)
        if r.denominator != 1 and gefunden is None and versuche == len(tl) * 2:
            S.append(hinweis('Keine ganze Zahl passt – auch Brüche ±p/q prüfen (p teilt %s, q teilt %s):'
                             % (zahl_text(abs(a0)), zahl_text(abs(ki[-1]))), einzug=E))
        versuche += 1
        if wert == 0:
            S.append(Schritt(_fn_an(pn, r), [_eingesetzt(k, r, var), 0], einzug=E + 1))
            S.append(hinweis('Gefunden: ', Teil('%s = %s' % (var, zahl_text(r)),
                                                 '%s = %s' % (var, zahl_tex(r))), einzug=E))
            gefunden = r
            break
        if versuche <= 12:
            S.append(Schritt(_fn_an(pn, r), [wert, ('≠', 0)], einzug=E + 1))
    if gefunden is None:
        S.append(hinweis('Keine dieser Zahlen ist eine Lösung – exakt lässt sich die Gleichung '
                         'mit Schulmitteln nicht lösen.', einzug=E))
        S.append(hinweis('Näherung über Vorzeichenwechsel (Intervallhalbierung bzw. Taschenrechner):',
                         einzug=E))
        loes = []
        for teil, m in _quadratfrei_zerlegen(ki):
            for z in _numerisch(teil):
                loes.append((z, m))
        loes = _zusammen(loes)
        for z, _ in loes:
            u, v = math.floor(float(z)), math.floor(float(z)) + 1
            fu, fv = _wert(k, Zahl(u)), _wert(k, Zahl(v))
            if fu != 0 and fv != 0 and (fu > 0) != (fv > 0):
                S.append(Schritt(Teil('%s(%d) = %s, %s(%d) = %s' % (pn, u, zahl_text(fu),
                                                                    pn, v, zahl_text(fv)),
                                      r'%s(%d) = %s,\ %s(%d) = %s' % (pn, u, zahl_tex(fu),
                                                                      pn, v, zahl_tex(fv))),
                                 [('⇒', Teil('Lösung zwischen %d und %d: %s ≈ %s'
                                             % (u, v, var, zahl_text(z)),
                                             r'\text{Lösung zwischen %d und %d: } %s \approx %s'
                                             % (u, v, var, zahl_tex(z))))], einzug=E + 1))
            else:
                S.append(Schritt(Teil(var), [('≈', z)], einzug=E + 1))
        if not loes:
            S.append(hinweis('Kein Vorzeichenwechsel – keine Lösung.', einzug=E))
        return loes, S, False
    quot, rest = _teilen(ki, [-gefunden, 1])
    lin = _T([-gefunden, 1], var) if gefunden.denominator == 1 else _T(
        [-gefunden.numerator, gefunden.denominator], var)
    if gefunden.denominator != 1:
        quot = _teilen(ki, [-gefunden.numerator, gefunden.denominator])[0]
    S.append(Schritt(Ausdruck(Teil('(', r'\left('), _T(ki, var), Teil(') : (', r'\right):\left('),
                              lin, Teil(')', r'\right)')), [_T(quot, var)],
                     hinweis='Polynomdivision (oder Horner-Schema):', einzug=E))
    S.append(Schritt(_T(quot, var), [0], hinweis='Restgleichung lösen:', einzug=E))
    l2, s2, _ = _loese(quot, var, None, E + 1)
    S.extend(s2)
    return _zusammen([(gefunden, 1)] + l2), S, True


# ====================================================================== #
#  7) Das Polynom                                                        #
# ====================================================================== #

def _testpunkt(a, b):
    """Eine einfache Zahl echt zwischen a und b (None heißt ±∞) – zum Prüfen
    von Vorzeichen.  Ganze Zahlen werden bevorzugt, dann Halbe, Viertel, …"""
    if a is None and b is None:
        return Zahl(0)
    if a is None:
        n = math.ceil(float(b)) - 1
        while not Zahl(n) < b:
            n -= 1
        return Zahl(n)
    if b is None:
        n = math.floor(float(a)) + 1
        while not Zahl(n) > a:
            n += 1
        return Zahl(n)
    fa, fb = float(a), float(b)
    mitte = (fa + fb) / 2
    for nenner in (1, 2, 4, 5, 10, 8, 16, 20, 100, 1000, 10 ** 6):
        lo = math.floor(fa * nenner) + 1
        hi = math.ceil(fb * nenner) - 1
        if lo <= hi:
            n = min(range(lo, hi + 1), key=lambda z: (abs(z / nenner - mitte), abs(z)))
            for kand in sorted(range(lo, hi + 1), key=lambda z: (abs(z / nenner - mitte), abs(z)))[:3]:
                c = Zahl(kand, nenner)
                if a < c < b:
                    return c
    return Q(mitte)


def _js(x):
    """Eine Zahl für die Webseite: ganz bleibt ganz, sonst Dezimalzahl."""
    if _ist_rational(x) and Q(x).denominator == 1:
        return int(x)
    return float(x)


def _mt(datei, art, werte):
    from urllib.parse import quote
    mt = json.dumps({'id': art, 'v': werte}, separators=(',', ':'), ensure_ascii=False)
    return '%s?mt=%s' % (datei, quote(mt, safe=''))


def _aus_liste(k, name=None, variable='x'):
    """Polynom aus aufsteigender Koeffizientenliste."""
    p = Polynom(0, name=name, variable=variable)
    p._k = _kurz(k)
    return p


def _bruch_text(c):
    c = Q(c)
    return str(c.numerator) if c.denominator == 1 else '%d/%d' % (c.numerator, c.denominator)


class Polynom(object):
    """Eine ganzrationale Funktion mit exakten Koeffizienten.

    Eingabe::

        Polynom("f(x) = -x^4 + 5x^3 + 6")      Text wie im Heft
        Polynom("x^(3) - 6x^(2) + 44x - 48")   GeoGebra-Schreibweise
        Polynom("x² + 3x²")                     Hochzahlen, kleine Rechnungen
        Polynom("2(x-1)(x+3)^2")                Produkte und Potenzen
        Polynom("1/3 x^3 - 5x^2 - 24x")         Brüche (auch 0,5x² mit Komma)
        Polynom(1, 0, -4, 0)                    Koeffizienten wie geschrieben: x³ - 4x
        aus_nullstellen(-2, 0, 2, faktor=1)     über die Nullstellen
        2*x**3 - 4*x + 1                        mit der Variablen x rechnen

    ``name`` (``'f'``) und ``variable`` (``'x'``) lassen sich angeben; bei
    ``"h(t) = …"`` werden sie aus dem Text gelesen.
    """

    __slots__ = ('_k', 'name', 'variable')

    def __init__(self, *args, **kw):
        name = kw.pop('name', None)
        variable = kw.pop('variable', None)
        if kw:
            raise EingabeFehler('unbekannte Angabe: %s' % ', '.join(kw))
        if len(args) == 0:
            k = [Zahl(0)]
        elif len(args) == 1:
            a = args[0]
            if isinstance(a, Polynom):
                k = list(a._k)
                name = name if name is not None else a.name
                variable = variable or a.variable
            elif isinstance(a, str):
                k, n2, v2 = _lies_polynom(a, variable)
                name = name if name is not None else n2
                variable = variable or v2
            elif isinstance(a, (list, tuple)):
                k = [Q(c) for c in reversed(a)]
            else:
                k = [Q(a)]
        else:
            k = [Q(c) for c in reversed(args)]
        if any(not _ist_rational(c) for c in k):
            raise NichtExaktFehler('Koeffizienten müssen Brüche sein (keine Wurzeln/Näherungen).')
        self._k = _kurz(k)
        self.name = name if name is not None else 'f'
        self.variable = variable or 'x'

    # ---- Bestandteile ------------------------------------------------- #
    @classmethod
    def aus_koeffizienten(cls, liste, aufsteigend=False, **kw):
        """Koeffizienten als Liste – absteigend wie geschrieben (Voreinstellung)
        oder aufsteigend ``[a0, a1, a2, …]``."""
        liste = list(liste)
        return cls(*(reversed(liste) if aufsteigend else liste), **kw) if len(liste) > 1 \
            else cls(liste[0] if liste else 0, **kw)

    @property
    def grad(self):
        """Der Grad (die höchste Hochzahl); das Nullpolynom hat Grad -1."""
        return _grad(self._k)

    @property
    def koeffizienten(self):
        """Koeffizienten absteigend, wie geschrieben: ``[-1, 5, 0, 0, 6]``."""
        return list(reversed(self._k))

    @property
    def aufsteigend(self):
        """Koeffizienten aufsteigend: ``[a0, a1, a2, …]``."""
        return list(self._k)

    def koeffizient(self, n):
        """Der Faktor vor xⁿ."""
        return self._k[n] if 0 <= n < len(self._k) else Zahl(0)

    a = koeffizient

    @property
    def leitkoeffizient(self):
        return self._k[-1]

    @property
    def absolutglied(self):
        return self._k[0]

    def benannt(self, name):
        """Dasselbe Polynom unter anderem Namen: ``f.benannt('g')``."""
        return Polynom(self, name=name)

    def _nm(self):
        return self.name or 'f'

    @property
    def weg(self):
        """``f.weg.methode(...)`` liefert den Lösungsweg (siehe ``dir(f.weg)``)."""
        return Weg(self)

    # ---- Schreiben ---------------------------------------------------- #
    def text(self):
        """Nur der Term: ``-x⁴ + 5x³ + 6``."""
        return _term_text(self._k, self.variable)

    def tex(self):
        """Nur der Term als LaTeX: ``-x^4+5x^3+6``."""
        return _term_tex(self._k, self.variable)

    latex = tex

    def gleichung(self):
        """``f(x) = -x⁴ + 5x³ + 6``"""
        return '%s(%s) = %s' % (self._nm(), self.variable, self.text())

    def gleichung_tex(self):
        return '%s(%s) = %s' % (self._nm(), self.variable, self.tex())

    def geogebra(self):
        """Für GeoGebra: ``f(x) = -x^4 + 5x^3 + 6``."""
        with stil(hoch='^', komma=False):
            return '%s(%s) = %s' % (self._nm(), self.variable, self.text().replace(' x', 'x'))

    def __str__(self):
        return self.gleichung()

    def __repr__(self):
        return self.gleichung()

    def _repr_latex_(self):
        return '$%s$' % self.gleichung_tex()

    def faktorisiert(self):
        """Zerlegung in Linearfaktoren, soweit es mit Brüchen geht (Text)."""
        return self._faktoren()[0]

    def faktorisiert_tex(self):
        return self._faktoren()[1]

    def _faktoren(self):
        k = self._k
        if _grad(k) < 1:
            return _term_text(k, self.variable), _term_tex(k, self.variable)
        lk = k[-1]
        rest = _skal(k, 1 / lk)
        teile = []
        for r in _kandidaten(rest) if rest[0] != 0 else [Zahl(0)] + _kandidaten(
                rest[next(i for i, c in enumerate(rest) if c != 0):]):
            m = 0
            while _grad(rest) >= 1 and _wert(rest, r) == 0:
                rest = _teilen(rest, [-r, 1])[0]
                m += 1
            if m:
                teile.append((r, m))
        v = self.variable
        tt, tx = [], []
        for r, m in teile:
            if r == 0:
                f_t, f_x = v, v
            else:
                f_t = '(%s %s %s)' % (v, '-' if r > 0 else '+', zahl_text(abs(r)))
                f_x = r'\left(%s%s%s\right)' % (v, '-' if r > 0 else '+', zahl_tex(abs(r)))
            if m > 1:
                f_t += _hochzahl_text(m)
                f_x += '^%d' % m
            tt.append(f_t)
            tx.append(f_x)
        if _grad(rest) >= 1:
            tt.append('(%s)' % _term_text(rest, v))
            tx.append(r'\left(%s\right)' % _term_tex(rest, v))
        vor_t = '' if lk == 1 else ('-' if lk == -1 else zahl_text(lk) + '·')
        vor_x = '' if lk == 1 else ('-' if lk == -1 else zahl_tex(lk) + r'\cdot ')
        if len(tt) == 1 and tt[0].startswith('(') and not vor_t:
            tt[0], tx[0] = tt[0][1:-1], tx[0][6:-7]
        return vor_t + ''.join(tt), vor_x + ''.join(tx)

    # ---- Rechnen ------------------------------------------------------ #
    def _anderes(self, o):
        if isinstance(o, Polynom):
            return o._k
        if _ist_rational(o) or isinstance(o, str):
            return [Q(o)]
        if isinstance(o, float):
            return [Q(o)]
        return None

    def _neu(self, k, name=None):
        return _aus_liste(k, name, self.variable)

    def __add__(self, o):
        q = self._anderes(o)
        return NotImplemented if q is None else self._neu(_plus(self._k, q))

    __radd__ = __add__

    def __sub__(self, o):
        q = self._anderes(o)
        return NotImplemented if q is None else self._neu(_minus(self._k, q))

    def __rsub__(self, o):
        q = self._anderes(o)
        return NotImplemented if q is None else self._neu(_minus(q, self._k))

    def __mul__(self, o):
        q = self._anderes(o)
        return NotImplemented if q is None else self._neu(_mal(self._k, q))

    __rmul__ = __mul__

    def __neg__(self):
        return self._neu(_skal(self._k, -1))

    def __pos__(self):
        return self

    def __pow__(self, n):
        if not isinstance(n, int) or n < 0:
            raise EingabeFehler('Nur natürliche Hochzahlen ergeben wieder ein Polynom.')
        return self._neu(_hoch(self._k, n))

    def __truediv__(self, o):
        q = self._anderes(o)
        if q is None:
            return NotImplemented
        quot, rest = _teilen(self._k, q)
        if _grad(rest) >= 0:
            raise EingabeFehler('Die Division geht nicht auf (Rest %s) – divmod(f, g) liefert '
                                'Quotient und Rest.' % _term_text(rest, self.variable))
        return self._neu(quot)

    def __floordiv__(self, o):
        q = self._anderes(o)
        return NotImplemented if q is None else self._neu(_teilen(self._k, q)[0], 'q')

    def __mod__(self, o):
        q = self._anderes(o)
        return NotImplemented if q is None else self._neu(_teilen(self._k, q)[1], 'r')

    def __divmod__(self, o):
        """Polynomdivision: (Quotient q, Rest r)."""
        q = self._anderes(o)
        if q is None:
            return NotImplemented
        a, b = _teilen(self._k, q)
        return self._neu(a, 'q'), self._neu(b, 'r')

    def __eq__(self, o):
        q = self._anderes(o)
        if q is None:
            return NotImplemented
        return _kurz(self._k) == _kurz(q)

    def __ne__(self, o):
        e = self.__eq__(o)
        return e if e is NotImplemented else not e

    def __hash__(self):
        return hash(tuple(self._k))

    def __call__(self, x0):
        """Funktionswert (exakt) – oder Verkettung, wenn x0 ein Polynom ist."""
        if isinstance(x0, Polynom):
            return _aus_liste(_verketten(self._k, x0._k), None, x0.variable)
        if isinstance(x0, (list, tuple)):
            return type(x0)(self(z) for z in x0)
        if isinstance(x0, float):
            return float(_wert([float(c) for c in self._k], x0))
        if isinstance(x0, str):
            x0 = Q(x0)
        return _wert(self._k, x0 if isinstance(x0, (Wurzelzahl, Naeherung)) else Q(x0))

    # ---- Funktionswert und Ableitung ----------------------------------- #
    @mit_weg
    def wert(self, x0, _weg=False):
        """Funktionswert f(x0), exakt."""
        x0 = Q(x0) if not isinstance(x0, (Wurzelzahl, Naeherung)) else x0
        s, w = _einsetzen_schritt(self._k, x0, self._nm(), 0, self.variable)
        r = Rechnung(w, [s], 'Funktionswert %s(%s)' % (self._nm(), zahl_text(x0)))
        return _ausgabe(r, _weg)

    @mit_weg
    def ableitung(self, n=1, _weg=False):
        """Die n-te Ableitung (Voreinstellung: die erste) – wieder ein Polynom."""
        v = self.variable
        S = [hinweis('Potenzregel ', F("(a·xⁿ)' = n·a·xⁿ⁻¹", r"(a\cdot x^n)' = n\cdot a\cdot x^{n-1}"),
                     ' für jeden Summanden; eine Zahl allein fällt weg.')]
        k = self._k
        for i in range(1, n + 1):
            neu = _abl(k)
            tt, tx = [], []
            for e in range(len(k) - 1, 0, -1):
                c = k[e]
                if c == 0:
                    continue
                pot_t = '' if e == 1 else (v if e == 2 else v + _hochzahl_text(e - 1))
                pot_x = '' if e == 1 else (v if e == 2 else v + '^%d' % (e - 1))
                ct = _klammer_neg(c) if c.denominator == 1 else '(%s)' % zahl_text(c)
                cx = _tex_klammer_neg(c) if c.denominator == 1 else r'\left(%s\right)' % zahl_tex(c)
                st = '%d·%s%s' % (e, ct, pot_t)
                sx = r'%d\cdot %s%s' % (e, cx, pot_x)
                tt.append(st)
                tx.append(sx)
            glieder = []
            if tt and ' + '.join(tt) != _term_text(neu, v):
                glieder.append(Teil(' + '.join(tt), ' + '.join(tx)))
            glieder.append(_T(neu, v))
            S.append(Schritt(_fn(self._nm(), i, v), glieder))
            k = neu
        erg = Polynom(*reversed(k), name=self._nm() + "'" * n, variable=v) if len(k) > 1 else \
            Polynom(k[0], name=self._nm() + "'" * n, variable=v)
        r = Rechnung(erg, S, '%d. Ableitung von %s' % (n, self._nm()) if n > 1
                     else 'Ableitung von %s' % self._nm(),
                     aufgabe=('polynom-ableitung.html?f=' + ','.join(_bruch_text(c) for c in self._k),
                              'Polynome ableiten'))
        return _ausgabe(r, _weg)

    def abl(self, n=1):
        """Kurzform von ``ableitung``."""
        return self.ableitung(n)

    @mit_weg
    def stammfunktion(self, c=0, _weg=False):
        """Eine Stammfunktion F (mit Konstante c, Voreinstellung 0)."""
        k = self._k
        neu = [Q(c)] + [k[i] / (i + 1) for i in range(len(k))]
        name = self._nm().upper() if len(self._nm()) == 1 else 'F'
        erg = Polynom(*reversed(_kurz(neu)), name=name, variable=self.variable) \
            if len(_kurz(neu)) > 1 else Polynom(_kurz(neu)[0], name=name)
        S = [hinweis('Potenzregel rückwärts: ', F('xⁿ → xⁿ⁺¹/(n+1)', r'x^n\to\frac{x^{n+1}}{n+1}'),
                     ' für jeden Summanden.'),
             Schritt(_fn(name, 0, self.variable), [_T(_kurz(neu), self.variable)])]
        return _ausgabe(Rechnung(erg, S, 'Stammfunktion von %s' % self._nm()), _weg)

    @mit_weg
    def integral(self, a, b, _weg=False):
        """Das bestimmte Integral von a bis b – exakt."""
        a, b = Q(a), Q(b)
        F_ = self.stammfunktion()
        n = F_.name
        S = [Schritt(_fn(n, 0, self.variable), [_T(F_._k, self.variable)],
                     hinweis='Stammfunktion bilden:')]
        s1, wb = _einsetzen_schritt(F_._k, b, n, 0, self.variable, mit_summen=False)
        s2, wa = _einsetzen_schritt(F_._k, a, n, 0, self.variable, mit_summen=False)
        S += [s1, s2]
        w = wb - wa
        S.append(Schritt(Teil('∫ von %s bis %s' % (zahl_text(a), zahl_text(b)),
                              r'\int_{%s}^{%s} %s(%s)\,\mathrm{d}%s' % (zahl_tex(a), zahl_tex(b),
                                                                        self._nm(), self.variable,
                                                                        self.variable)),
                         [Teil('%s - %s' % (zahl_text(wb), _klammer_neg(wa)),
                               '%s-%s' % (zahl_tex(wb), _tex_klammer_neg(wa)))] + _wert_glieder(w),
                         hinweis='Obere minus untere Grenze:'))
        return _ausgabe(Rechnung(w, S, 'Integral von %s bis %s' % (zahl_text(a), zahl_text(b))), _weg)

    # ---- Nullstellen und Schnittpunkte ------------------------------- #
    def nullstellen_vielfach(self):
        """[(x, Vielfachheit), …] – etwa ``[(0, 2), (-3, 1), (3, 1)]``."""
        return _nullstellen_mit_vielfachheit(self._k)

    def _link_gleichung(self, k, verfahren=None):
        ki = _ganzzahlig(k)[0]
        if verfahren in ('ausklammern', 'quadratisch', 'biquadratisch', 'potenz', 'raten'):
            seite = {'ausklammern': 'ausklammern.html', 'quadratisch': 'quadratische_gleichungen.html',
                     'biquadratisch': 'biquadratische_gleichungen.html',
                     'potenz': 'potenzgleichungen.html', 'raten': 'nullstelle_raten.html'}[verfahren]
            from urllib.parse import quote
            return (seite + '?gl=' + quote(_seiten_term(ki) + '=0', safe=''),
                    'Gleichung lösen (%s)' % seite.replace('.html', ''))
        return ('gleichungart.html?t=' + 'eigen_' + '.'.join(str(int(c)) for c in ki),
                'Gleichungsart erkennen')

    @mit_weg
    def nullstellen(self, _weg=False):
        """Alle reellen Nullstellen, aufsteigend (exakt, sonst als Näherung)."""
        if not _weg:
            return [z for z, _ in _nullstellen_mit_vielfachheit(self._k)]
        v, n = self.variable, self._nm()
        S = [Schritt(_fn(n, 0, v), [0], hinweis='Ansatz: Funktionsterm gleich null setzen.'),
             Schritt(_T(self._k, v), [0])]
        loes, s2, verfahren = _loese(self._k, v, n, 0)
        S += s2
        S.append(hinweis('Nullstellen: ', _loesungen_text(loes, v)))
        pk = self._punkte([z for z, _ in loes], 'N', 'Nullstelle', y_null=True)
        if pk:
            S.append(hinweis('Schnittpunkte mit der x-Achse: ', _punkte_teil(pk)))
        r = Rechnung([z for z, _ in loes], S, 'Nullstellen von %s' % n,
                     aufgabe=self._link_gleichung(self._k, verfahren))
        return r

    def nullstellenpunkte(self):
        """Die Schnittpunkte mit der x-Achse als Punkte N₁, N₂, …"""
        return self._punkte(self.nullstellen(), 'N', 'Nullstelle', y_null=True)

    @mit_weg
    def y_achsenabschnitt(self, _weg=False):
        """Schnittpunkt mit der y-Achse: Sy(0 | f(0))."""
        p = Punkt(Zahl(0), self._k[0], 'Sy', 'y-Achsenabschnitt')
        s, _ = _einsetzen_schritt(self._k, Zahl(0), self._nm(), 0, self.variable,
                                  hinw='Schnittpunkt mit der y-Achse: x = 0 einsetzen.')
        return _ausgabe(Rechnung(p, [s, hinweis('Ergebnis: ', p)], 'Schnittpunkt mit der y-Achse'),
                        _weg)

    def _punkte(self, xs, name, art, y_null=False):
        mehr = len(xs) > 1
        raus = []
        for i, x0 in enumerate(xs):
            y = Zahl(0) if y_null else self(x0)
            raus.append(Punkt(x0, y, name, art, (i + 1) if mehr else None))
        return raus

    @mit_weg
    def schnittpunkte(self, g, _weg=False):
        """Schnittpunkte der Graphen von f und g (Polynom oder Zahl)."""
        gk = self._anderes(g)
        gname = g._nm() if isinstance(g, Polynom) else None
        if gname == self._nm():
            gname = None
        v, n = self.variable, self._nm()
        d = _minus(self._k, gk)
        S = [Schritt(_fn(n, 0, v), [_fn(gname, 0, v) if gname else _T(gk, v)],
                     hinweis='Ansatz: Funktionsterme gleichsetzen.'),
             Schritt(_T(self._k, v), [_T(gk, v)]),
             Schritt(_T(d, v), [0], hinweis='Alles auf eine Seite bringen:')]
        if _grad(d) < 0:
            S.append(hinweis('Die Graphen sind gleich – unendlich viele gemeinsame Punkte.'))
            return _ausgabe(Rechnung(None, S, 'Schnittpunkte'), _weg)
        loes, s2, verfahren = _loese(d, v, None, 0)
        S += s2
        xs = [z for z, _ in loes]
        pk = self._punkte(xs, 'S', 'Schnittpunkt')
        if pk:
            S.append(hinweis('y-Koordinaten (in %s einsetzen):' % n))
            for p in pk:
                s, _ = _einsetzen_schritt(self._k, p.x, n, 0, v, einzug=1)
                S.append(s)
            S.append(hinweis('Schnittpunkte: ', _punkte_teil(pk)))
        else:
            S.append(hinweis('Keine Lösung – die Graphen schneiden sich nicht.'))
        return _ausgabe(Rechnung(pk, S, 'Schnittpunkte von %s und %s' % (n, gname or _term_text(gk, v)),
                                 aufgabe=self._link_gleichung(d, verfahren)), _weg)

    # ---- Steigung, Tangente, Normale, Sekante ------------------------- #
    def _abl_schritte(self, n=1, einzug=0):
        """Schritte f'(x) = …, f''(x) = … (bis zur n-ten Ableitung)."""
        S = []
        k = self._k
        for i in range(1, n + 1):
            k = _abl(k)
            S.append(Schritt(_fn(self._nm(), i, self.variable), [_T(k, self.variable)],
                             einzug=einzug))
        return S

    def _ak(self, n):
        k = self._k
        for _ in range(n):
            k = _abl(k)
        return k

    @mit_weg
    def steigung(self, x0, _weg=False):
        """Die Steigung des Graphen an der Stelle x0: f'(x0)."""
        x0 = self._zahl(x0)
        S = [hinweis('Die Ableitung gibt die Steigung an:')] + self._abl_schritte(1)
        s, m = _einsetzen_schritt(self._ak(1), x0, self._nm(), 1, self.variable,
                                  hinw='Stelle einsetzen:')
        S.append(s)
        return _ausgabe(Rechnung(m, S, 'Steigung von %s an der Stelle %s' % (self._nm(), zahl_text(x0)),
                                 aufgabe=(_mt('steigung_tangenten.html', 'abl.mx',
                                              {'P': _seiten_term(self._k), 'x0': _js(x0)}),
                                          'Steigung an einer Stelle')), _weg)

    def _zahl(self, x0):
        return x0 if isinstance(x0, (Wurzelzahl, Naeherung)) else Q(x0)

    @mit_weg
    def steigungswinkel(self, x0, _weg=False):
        """Der Steigungswinkel α an der Stelle x0 in Grad (tan α = f'(x0))."""
        x0 = self._zahl(x0)
        S = self._abl_schritte(1)
        s, m = _einsetzen_schritt(self._ak(1), x0, self._nm(), 1, self.variable,
                                  hinw='Steigung an der Stelle:')
        S.append(s)
        besondere = {0: 0, 1: 45, -1: -45}
        if _ist_rational(m) and m in besondere:
            alpha = Zahl(besondere[m])
        else:
            alpha = Naeherung(math.degrees(math.atan(float(m))))
        S.append(Schritt(Teil('α', r'\alpha'), [Teil('arctan(%s)' % zahl_text(m), r'\arctan\left(%s\right)' % zahl_tex(m)),
                                     (_gleich(alpha), Teil(zahl_text(alpha) + '°',
                                                            zahl_tex(alpha) + r'^\circ'))],
                         hinweis=['Aus ', F('tan α = m', r'\tan\alpha = m'), ' folgt:']))
        if m < 0:
            S.append(hinweis('Der Graph fällt dort; der Winkel zur x-Achse beträgt %s°.'
                             % zahl_text(abs(alpha))))
        return _ausgabe(Rechnung(alpha, S, 'Steigungswinkel an der Stelle %s' % zahl_text(x0),
                                 aufgabe=(_mt('steigung_tangenten.html', 'abl.wink',
                                              {'P': _seiten_term(self._k), 'x0': _js(x0)}),
                                          'Steigungswinkel')), _weg)

    @mit_weg
    def stellen_mit_steigung(self, m, _weg=False):
        """Alle Stellen, an denen der Graph die Steigung m hat: f'(x) = m."""
        m = Q(m)
        v, n = self.variable, self._nm()
        a1 = self._ak(1)
        S = self._abl_schritte(1)
        S.append(Schritt(_fn(n, 1, v), [m], hinweis='Ansatz: Ableitung gleich der Steigung setzen.'))
        d = _minus(a1, [m])
        S.append(Schritt(_T(a1, v), [m]))
        if m != 0:
            S.append(Schritt(_T(d, v), [0]))
        loes, s2, _ = _loese(d, v, None, 0)
        S += s2
        xs = [z for z, _ in loes]
        S.append(hinweis('Stellen mit Steigung %s: ' % zahl_text(m), _loesungen_text(loes, v)))
        return _ausgabe(Rechnung(xs, S, 'Stellen mit der Steigung %s' % zahl_text(m),
                                 aufgabe=(_mt('steigung_tangenten.html', 'abl.stelle',
                                              {'P': _seiten_term(self._k), 'm': _js(m)}),
                                          'Stelle zu gegebener Steigung')), _weg)

    def _gname(self, name):
        """Name einer Geraden – nicht derselbe Buchstabe wie die Variable."""
        return name if name != self.variable else {'t': 'g', 'n': 'g', 's': 'g'}.get(name, 'g')

    def _gerade(self, m, b, name):
        name = self._gname(name)
        if m == 0:
            return Polynom(b, name=name, variable=self.variable)
        return Polynom(m, b, name=name, variable=self.variable)

    @mit_weg
    def tangente(self, x0, _weg=False):
        """Die Tangente an den Graphen an der Stelle x0 (als Polynom t)."""
        x0 = self._zahl(x0)
        v, n = self.variable, self._nm()
        s1, y0 = _einsetzen_schritt(self._k, x0, n, 0, v, hinw='Berührpunkt: y-Koordinate')
        S = [s1, hinweis('Steigung der Tangente: ', F("m = %s'(%s)" % (n, zahl_text(x0)),
                                                    "m = %s'(%s)" % (n, zahl_tex(x0))))]
        S += self._abl_schritte(1, einzug=1)
        s2, m = _einsetzen_schritt(self._ak(1), x0, n, 1, v, einzug=1)
        S.append(s2)
        b = y0 - m * x0
        tn = self._gname('t')
        S.append(hinweis('Ansatz ', F('%s(%s) = m·%s + b' % (tn, v, v), r'%s(%s) = m\cdot %s + b' % (tn, v, v)),
                         ' – Punkt einsetzen und nach b auflösen:'))
        S.append(Schritt(Teil(zahl_text(y0), zahl_tex(y0)),
                         [Ausdruck(Teil(zahl_text(m) + '·', zahl_tex(m) + r'\cdot '),
                                   _in_klammern(x0), Teil(' + b', '+b'))], einzug=1))
        S.append(Schritt(Teil('b'), [b] if _ist_rational(b) or isinstance(b, Wurzelzahl)
                         else [('≈', b)], einzug=1))
        t = self._gerade(m, b, 't') if _ist_rational(m) and _ist_rational(b) else None
        if t is not None:
            S.append(Schritt(Teil('%s(%s)' % (tn, v)), [_T(t._k, v)], hinweis='Tangentengleichung:'))
        else:
            S.append(Schritt(Teil('%s(%s)' % (tn, v)),
                             [Teil('%s·%s + %s' % (zahl_text(m), v, zahl_text(b)),
                                   r'%s\cdot %s + %s' % (zahl_tex(m), v, zahl_tex(b)))],
                             hinweis='Tangentengleichung:'))
        erg = t if t is not None else (m, b)
        return _ausgabe(Rechnung(erg, S, 'Tangente an %s bei %s = %s' % (n, v, zahl_text(x0)),
                                 aufgabe=(_mt('steigung_tangenten.html', 'tan.gl',
                                              {'P': _seiten_term(self._k), 'x0': _js(x0)}),
                                          'Tangentengleichung')), _weg)

    @mit_weg
    def normale(self, x0, _weg=False):
        """Die Normale (senkrecht zur Tangente) an der Stelle x0 – oder None,
        wenn die Tangente waagerecht ist (dann ist die Normale x = x0)."""
        x0 = self._zahl(x0)
        v, n = self.variable, self._nm()
        s1, y0 = _einsetzen_schritt(self._k, x0, n, 0, v, hinw='Kurvenpunkt: y-Koordinate')
        S = [s1] + self._abl_schritte(1)
        s2, m = _einsetzen_schritt(self._ak(1), x0, n, 1, v, hinw='Steigung der Tangente:')
        S.append(s2)
        if m == 0:
            S.append(hinweis('Die Tangente ist waagerecht – die Normale ist die senkrechte '
                             'Gerade %s = %s (keine Funktion).' % (v, zahl_text(x0))))
            return _ausgabe(Rechnung(None, S, 'Normale'), _weg)
        mn = -1 / m
        S.append(Schritt(Teil('mₙ', 'm_n'), [Teil('-1/%s' % _klammer_wenn(m), r'-\frac{1}{%s}' % zahl_tex(m)),
                                            mn], hinweis=['Normalensteigung: ', F('mₙ = -1/m', r'm_n = -\frac{1}{m}')]))
        b = y0 - mn * x0
        S.append(Schritt(Teil(zahl_text(y0), zahl_tex(y0)),
                         [Ausdruck(Teil(zahl_text(mn) + '·', zahl_tex(mn) + r'\cdot '),
                                   _in_klammern(x0), Teil(' + b', '+b'))],
                         hinweis='Punkt einsetzen und nach b auflösen:'))
        S.append(Schritt(Teil('b'), [b]))
        nn = self._gerade(mn, b, 'n') if _ist_rational(mn) and _ist_rational(b) else None
        if nn is not None:
            S.append(Schritt(Teil('%s(%s)' % (nn.name, v)), [_T(nn._k, v)], hinweis='Normalengleichung:'))
        return _ausgabe(Rechnung(nn if nn is not None else (mn, b), S,
                                 'Normale an %s bei %s = %s' % (n, v, zahl_text(x0)),
                                 aufgabe=(_mt('steigung_tangenten.html', 'nor.gl',
                                              {'P': _seiten_term(self._k), 'x0': _js(x0)}),
                                          'Normalengleichung')), _weg)

    @mit_weg
    def sekantensteigung(self, a, b, _weg=False):
        """Die mittlere Änderungsrate (f(b) - f(a))/(b - a)."""
        a, b = Q(a), Q(b)
        v, n = self.variable, self._nm()
        s1, fa = _einsetzen_schritt(self._k, a, n, 0, v, mit_summen=False)
        s2, fb = _einsetzen_schritt(self._k, b, n, 0, v, mit_summen=False)
        m = (fb - fa) / (b - a)
        S = [hinweis('Funktionswerte an den Rändern:'), s1, s2,
             Schritt(Teil('m'), [Teil('(%s - %s)/(%s - %s)' % (zahl_text(fb), _klammer_neg(fa),
                                                               zahl_text(b), _klammer_neg(a)),
                                      r'\frac{%s-%s}{%s-%s}' % (zahl_tex(fb), _tex_klammer_neg(fa),
                                                                zahl_tex(b), _tex_klammer_neg(a))),
                                 Teil('%s/%s' % (zahl_text(fb - fa), _klammer_wenn(b - a)),
                                      r'\frac{%s}{%s}' % (zahl_tex(fb - fa), zahl_tex(b - a)))]
                     + _wert_glieder(m),
                     hinweis=['Differenzenquotient ', F('m = (%s(b) - %s(a))/(b - a)' % (n, n),
                                                        r'm = \frac{%s(b)-%s(a)}{b-a}' % (n, n)), ':'])]
        return _ausgabe(Rechnung(m, S, 'Mittlere Änderungsrate auf [%s; %s]' % (zahl_text(a), zahl_text(b)),
                                 aufgabe=(_mt('steigung_tangenten.html', 'mitt.sek',
                                              {'P': _seiten_term(self._k), 'xa': _js(a), 'xb': _js(b)}),
                                          'Sekantensteigung')), _weg)

    mittlere_aenderungsrate = sekantensteigung

    @mit_weg
    def sekante(self, a, b, _weg=False):
        """Die Sekante durch (a | f(a)) und (b | f(b))."""
        r = self.weg.sekantensteigung(a, b)
        a, b = Q(a), Q(b)
        m = r.ergebnis
        fa = self(a)
        c = fa - m * a
        s = self._gerade(m, c, 's')
        S = list(r.schritte) + [
            Schritt(Teil(zahl_text(fa), zahl_tex(fa)),
                    [Ausdruck(Teil(zahl_text(m) + '·', zahl_tex(m) + r'\cdot '), _in_klammern(a),
                              Teil(' + b', '+b'))],
                    hinweis='Punkt (a | %s(a)) in %s(%s) = m·%s + b einsetzen:'
                    % (self._nm(), self._gname('s'), self.variable, self.variable)),
            Schritt(Teil('b'), [c]),
            Schritt(Teil('%s(%s)' % (s.name, self.variable)), [_T(s._k, self.variable)],
                    hinweis='Sekantengleichung:')]
        return _ausgabe(Rechnung(s, S, 'Sekante durch die Stellen %s und %s' % (zahl_text(a), zahl_text(b)),
                                 aufgabe=(_mt('steigung_tangenten.html', 'mitt.gl',
                                              {'P': _seiten_term(self._k), 'xa': _js(a), 'xb': _js(b)}),
                                          'Sekantengleichung')), _weg)


    # ---- Extrempunkte ------------------------------------------------- #
    def _stationaer(self):
        """[(x0, Vielfachheit als Nullstelle von f', Art)]"""
        a1 = self._ak(1)
        if _grad(a1) <= 0:
            return []
        raus = []
        for x0, m in _nullstellen_mit_vielfachheit(a1):
            if m % 2 == 0:
                art = 'Sattelpunkt'
            else:
                h = a1
                for _ in range(m):
                    h = _abl(h)
                art = 'Tiefpunkt' if _wert(h, x0) > 0 else 'Hochpunkt'
            raus.append((x0, m, art))
        return raus

    def extremstellen(self):
        """Die Stellen der lokalen Hoch- und Tiefpunkte."""
        return [x0 for x0, _, art in self._stationaer() if art != 'Sattelpunkt']

    def _benennen(self, liste):
        """[(x, art)] -> Punkte H, T, S, W mit Index, wenn eine Art mehrfach vorkommt."""
        buchst = {'Hochpunkt': 'H', 'Tiefpunkt': 'T', 'Sattelpunkt': 'S', 'Wendepunkt': 'W'}
        zahl = {}
        for _, art in liste:
            zahl[art] = zahl.get(art, 0) + 1
        nr = {}
        raus = []
        for x0, art in liste:
            nr[art] = nr.get(art, 0) + 1
            raus.append(Punkt(x0, self(x0), buchst.get(art, 'P'), art,
                              nr[art] if zahl[art] > 1 else None))
        return raus

    @mit_weg
    def extrempunkte(self, _weg=False):
        """Die lokalen Hoch- und Tiefpunkte (Sattelpunkte: ``sattelpunkte()``)."""
        st = self._stationaer()
        pk = self._benennen([(x0, art) for x0, _, art in st if art != 'Sattelpunkt'])
        if not _weg:
            return pk
        v, n = self.variable, self._nm()
        a1, a2 = self._ak(1), self._ak(2)
        S = [hinweis('1. Ableitungen bilden:')] + self._abl_schritte(2, einzug=1)
        S.append(hinweis('2. Notwendige Bedingung ', F("%s'(%s) = 0" % (n, v)), ':'))
        if _grad(a1) <= 0:
            S.append(hinweis('Die Ableitung ist konstant – es gibt keine Extrempunkte.', einzug=1))
            return Rechnung([], S, 'Extrempunkte von %s' % n)
        S.append(Schritt(_T(a1, v), [0], einzug=1))
        loes, s2, _ = _loese(a1, v, n + "'", 1)
        S += s2
        if not loes:
            S.append(hinweis('Keine Lösung – der Graph hat keine waagerechte Tangente, also '
                             'keine Extrempunkte.', einzug=1))
            return Rechnung([], S, 'Extrempunkte von %s' % n)
        S.append(hinweis('3. Hinreichende Bedingung ', F("%s''(%s) ≠ 0" % (n, v),
                                                        "%s''(%s) \\neq 0" % (n, v)),
                         ' (sonst Vorzeichenwechsel von %s\' prüfen):' % n))
        xs = [z for z, _ in loes]
        arten = []
        for i, (x0, m) in enumerate(loes):
            w2 = _wert(a2, x0)
            if w2 != 0 and not (_ist_naeherung(w2) and abs(float(w2)) < 1e-9):
                art = 'Tiefpunkt' if w2 > 0 else 'Hochpunkt'
                s, _ = _einsetzen_schritt(a2, x0, n, 2, v, einzug=1, mit_summen=False)
                s.glieder.append(('>' if w2 > 0 else '<', 0))
                s.glieder.append(('⇒', Teil('%s bei %s = %s' % (art, v, zahl_text(x0)),
                                            r'\text{%s bei } %s = %s' % (art, v, zahl_tex(x0)))))
                S.append(s)
            else:
                s, _ = _einsetzen_schritt(a2, x0, n, 2, v, einzug=1, mit_summen=False)
                S.append(s)
                S.append(hinweis('Keine Entscheidung – Vorzeichen von %s\' links und rechts prüfen:'
                                 % n, einzug=1))
                links = _testpunkt(xs[i - 1] if i > 0 else None, x0)
                rechts = _testpunkt(x0, xs[i + 1] if i + 1 < len(xs) else None)
                sl, wl = _einsetzen_schritt(a1, links, n, 1, v, einzug=2, mit_summen=False)
                sl.glieder.append(('>' if wl > 0 else '<', 0))
                sr, wr = _einsetzen_schritt(a1, rechts, n, 1, v, einzug=2, mit_summen=False)
                sr.glieder.append(('>' if wr > 0 else '<', 0))
                S += [sl, sr]
                if (wl > 0) == (wr > 0):
                    art = 'Sattelpunkt'
                    S.append(hinweis('Kein Vorzeichenwechsel ⇒ kein Extrempunkt, sondern ein '
                                     'Sattelpunkt bei %s = %s.' % (v, zahl_text(x0)), einzug=1))
                else:
                    art = 'Hochpunkt' if wl > 0 else 'Tiefpunkt'
                    S.append(hinweis('Vorzeichenwechsel von %s nach %s ⇒ %s bei %s = %s.'
                                     % ('+' if wl > 0 else '-', '-' if wl > 0 else '+', art, v,
                                        zahl_text(x0)), einzug=1))
            arten.append((x0, art))
        S.append(hinweis('4. y-Koordinaten (in %s einsetzen):' % n))
        for x0, art in arten:
            s, _ = _einsetzen_schritt(self._k, x0, n, 0, v, einzug=1)
            S.append(s)
        alle = self._benennen(arten)
        ext = [p for p in alle if p.art != 'Sattelpunkt']
        satt = [p for p in alle if p.art == 'Sattelpunkt']
        if ext:
            S.append(hinweis('Extrempunkte: ', _punkte_teil(ext)))
        else:
            S.append(hinweis('Keine Extrempunkte.'))
        if satt:
            S.append(hinweis('Sattelpunkt: ', _punkte_teil(satt)))
        return Rechnung(ext, S, 'Extrempunkte von %s' % n,
                        aufgabe=(_mt('extremstellen.html', 'pkt.koo', {'P': _seiten_term(self._k)}),
                                 'Extrempunkte ermitteln'))

    def hochpunkte(self):
        return [p for p in self.extrempunkte() if p.art == 'Hochpunkt']

    def tiefpunkte(self):
        return [p for p in self.extrempunkte() if p.art == 'Tiefpunkt']

    def sattelpunkte(self):
        """Stellen mit waagerechter Tangente ohne Vorzeichenwechsel von f'."""
        st = self._stationaer()
        return self._benennen([(x0, art) for x0, _, art in st if art == 'Sattelpunkt'])

    @mit_weg
    def art(self, x0, _weg=False):
        """Was liegt bei x0 vor? 'Hochpunkt', 'Tiefpunkt', 'Sattelpunkt' oder
        None (keine waagerechte Tangente)."""
        x0 = self._zahl(x0)
        v, n = self.variable, self._nm()
        a1, a2 = self._ak(1), self._ak(2)
        S = self._abl_schritte(2)
        s1, w1 = _einsetzen_schritt(a1, x0, n, 1, v, hinw='Waagerechte Tangente?', mit_summen=False)
        S.append(s1)
        if w1 != 0:
            S.append(hinweis('Nicht null – an dieser Stelle liegt kein Extrem- oder Sattelpunkt.'))
            return _ausgabe(Rechnung(None, S, 'Art der Stelle %s' % zahl_text(x0)), _weg)
        art = dict((z, a) for z, _, a in self._stationaer()).get(x0)
        if art is None:
            for z, _, a in self._stationaer():
                if abs(float(z) - float(x0)) < 1e-9:
                    art = a
        s2, w2 = _einsetzen_schritt(a2, x0, n, 2, v, hinw='Zweite Ableitung:', mit_summen=False)
        S.append(s2)
        if w2 != 0:
            s2.glieder.append(('>' if w2 > 0 else '<', 0))
            s2.glieder.append(('⇒', Teil(art, r'\text{%s}' % art)))
        else:
            S.append(hinweis('Keine Entscheidung mit der zweiten Ableitung – der Vorzeichenwechsel '
                             'von %s\' entscheidet: %s.' % (n, art)))
        return _ausgabe(Rechnung(art, S, 'Art der Stelle %s = %s' % (v, zahl_text(x0)),
                                 aufgabe=(_mt('extremstellen.html', 'art.f2' if w2 != 0 else 'art.satt',
                                              {'P': _seiten_term(self._k), 'x0': _js(x0)}),
                                          'Art einer Stelle')), _weg)

    # ---- Wendepunkte -------------------------------------------------- #
    def _wende(self):
        """[(x0, Richtung)] – Richtung 'rl' (rechts→links) oder 'lr'."""
        a2 = self._ak(2)
        if _grad(a2) <= 0:
            return []
        raus = []
        for x0, m in _nullstellen_mit_vielfachheit(a2):
            if m % 2 == 0:
                continue
            h = a2
            for _ in range(m):
                h = _abl(h)
            raus.append((x0, 'rl' if _wert(h, x0) > 0 else 'lr'))
        return raus

    def wendestellen(self):
        return [x0 for x0, _ in self._wende()]

    @mit_weg
    def wendepunkte(self, _weg=False):
        """Die Wendepunkte (Sattelpunkte sind besondere Wendepunkte)."""
        pk = self._benennen([(x0, 'Wendepunkt') for x0, _ in self._wende()])
        a1 = self._ak(1)
        for p in pk:
            p.art = 'Sattelpunkt' if _wert(a1, p.x) == 0 else 'Wendepunkt'
        if not _weg:
            return pk
        v, n = self.variable, self._nm()
        a2, a3 = self._ak(2), self._ak(3)
        S = [hinweis('1. Ableitungen bilden:')] + self._abl_schritte(3, einzug=1)
        S.append(hinweis('2. Notwendige Bedingung ', F("%s''(%s) = 0" % (n, v)), ':'))
        if _grad(a2) <= 0:
            S.append(hinweis('Die zweite Ableitung ist konstant – keine Wendepunkte.', einzug=1))
            return Rechnung([], S, 'Wendepunkte von %s' % n)
        S.append(Schritt(_T(a2, v), [0], einzug=1))
        loes, s2, _ = _loese(a2, v, n + "''", 1)
        S += s2
        if not loes:
            S.append(hinweis('Keine Lösung – keine Wendepunkte.', einzug=1))
            return Rechnung([], S, 'Wendepunkte von %s' % n)
        S.append(hinweis('3. Hinreichende Bedingung ', F("%s'''(%s) ≠ 0" % (n, v),
                                                        "%s'''(%s) \\neq 0" % (n, v)),
                         " (sonst Vorzeichenwechsel von %s'' prüfen):" % n))
        xs = [z for z, _ in loes]
        wende = []
        for i, (x0, m) in enumerate(loes):
            w3 = _wert(a3, x0)
            s, _ = _einsetzen_schritt(a3, x0, n, 3, v, einzug=1, mit_summen=False)
            if w3 != 0:
                s.glieder.append(('≠', 0))
                rl = w3 > 0
                s.glieder.append(('⇒', Teil('Wendestelle (%s)' % ('rechts → links gekrümmt' if rl
                                                                  else 'links → rechts gekrümmt'),
                                            r'\text{Wendestelle (%s)}' % ('rechts $\to$ links gekrümmt'
                                                                          if rl else
                                                                          'links $\to$ rechts gekrümmt'))))
                S.append(s)
                wende.append(x0)
            else:
                S.append(s)
                S.append(hinweis("Keine Entscheidung – Vorzeichen von %s'' links und rechts prüfen:" % n,
                                 einzug=1))
                links = _testpunkt(xs[i - 1] if i > 0 else None, x0)
                rechts = _testpunkt(x0, xs[i + 1] if i + 1 < len(xs) else None)
                sl, wl = _einsetzen_schritt(a2, links, n, 2, v, einzug=2, mit_summen=False)
                sr, wr = _einsetzen_schritt(a2, rechts, n, 2, v, einzug=2, mit_summen=False)
                sl.glieder.append(('>' if wl > 0 else '<', 0))
                sr.glieder.append(('>' if wr > 0 else '<', 0))
                S += [sl, sr]
                if (wl > 0) != (wr > 0):
                    S.append(hinweis('Vorzeichenwechsel ⇒ Wendestelle bei %s = %s.' % (v, zahl_text(x0)),
                                     einzug=1))
                    wende.append(x0)
                else:
                    S.append(hinweis('Kein Vorzeichenwechsel ⇒ keine Wendestelle bei %s = %s.'
                                     % (v, zahl_text(x0)), einzug=1))
        S.append(hinweis('4. y-Koordinaten (in %s einsetzen):' % n))
        for x0 in wende:
            s, _ = _einsetzen_schritt(self._k, x0, n, 0, v, einzug=1)
            S.append(s)
        pk = self._benennen([(x0, 'Wendepunkt') for x0 in wende])
        for p in pk:
            if _wert(a1, p.x) == 0:
                p.art = 'Sattelpunkt'
        if pk:
            S.append(hinweis('Wendepunkte: ', _punkte_teil(pk)))
            satt = [p for p in pk if p.art == 'Sattelpunkt']
            if satt:
                S.append(hinweis('Waagerechte Tangente (%s\' = 0) ⇒ Sattelpunkt: ' % n, _punkte_teil(satt)))
        else:
            S.append(hinweis('Keine Wendepunkte.'))
        return Rechnung(pk, S, 'Wendepunkte von %s' % n,
                        aufgabe=(_mt('wendestellen.html', 'pkt.koo', {'P': _seiten_term(self._k)}),
                                 'Wendepunkte bestimmen'))

    @mit_weg
    def wendetangenten(self, _weg=False):
        """Die Tangenten in allen Wendepunkten."""
        pk = self.wendepunkte()
        S, erg = [], []
        for p in pk:
            r = self.weg.tangente(p.x)
            S.append(hinweis('Wendetangente in %s:' % p.text()))
            S += r.schritte
            erg.append(r.ergebnis)
        return _ausgabe(Rechnung(erg, S, 'Wendetangenten von %s' % self._nm(),
                                 aufgabe=(_mt('wendestellen.html', 'tang.gl', {'P': _seiten_term(self._k)}),
                                          'Gleichung der Wendetangente')), _weg)

    # ---- Monotonie und Krümmung ---------------------------------------- #
    def _abschnitte(self, k_abl, von, bis):
        """Teilintervalle zwischen den Nullstellen (mit Vorzeichenwechsel) von k_abl."""
        grenzen = []
        if _grad(k_abl) >= 1:
            for z, m in _nullstellen_mit_vielfachheit(k_abl):
                if (von is None or z > von) and (bis is None or z < bis):
                    grenzen.append((z, m))
        punkte = [von] + [z for z, _ in grenzen] + [bis]
        teile = []
        for a, b in zip(punkte, punkte[1:]):
            t = _testpunkt(a, b)
            teile.append((a, b, t, _wert(k_abl, t)))
        return grenzen, teile

    def _intervalle(self, k_abl, von, bis, plus, minus):
        grenzen, teile = self._abschnitte(k_abl, von, bis)
        zu = von is not None or bis is not None
        raus = []
        for a, b, t, w in teile:
            art = plus if w > 0 else minus
            if raus and raus[-1].art == art:
                raus[-1].bis = b
                raus[-1].rechts_zu = zu and b is not None
                continue
            raus.append(Intervall(a, b, zu and a is not None, zu and b is not None, art))
        return grenzen, teile, raus

    @mit_weg
    def monotonie(self, von=None, bis=None, _weg=False):
        """Monotonie-Intervalle: [Intervall(…, art='steigend'|'fallend'), …].

        Ohne Grenzen auf ganz ℝ (offene Intervalle wie auf der Webseite),
        mit ``von``/``bis`` nur in diesem Bereich (geschlossene Intervalle).
        """
        von = None if von is None else Q(von)
        bis = None if bis is None else Q(bis)
        a1 = self._ak(1)
        grenzen, teile, iv = self._intervalle(a1, von, bis, 'steigend', 'fallend')
        if not _weg:
            return iv
        v, n = self.variable, self._nm()
        S = [hinweis('Ableitung bilden:')] + self._abl_schritte(1, einzug=1)
        S.append(hinweis('Nullstellen von %s\' (dort kann sich das Monotonieverhalten ändern):' % n))
        if _grad(a1) >= 1:
            S.append(Schritt(_T(a1, v), [0], einzug=1))
            loes, s2, _ = _loese(a1, v, n + "'", 1)
            S += s2
        else:
            S.append(hinweis('keine', einzug=1))
        S.append(hinweis('Vorzeichen von %s\' in jedem Abschnitt (Probe einsetzen):' % n))
        zu = von is not None or bis is not None
        for a, b, t, w in teile:
            s, _ = _einsetzen_schritt(a1, t, n, 1, v, einzug=1, mit_summen=False)
            s.glieder.append(('>' if w > 0 else '<', 0))
            ab = Intervall(a, b, zu, zu)
            s.glieder.append(('⇒', Teil('%s auf %s' % ('steigend' if w > 0 else 'fallend', ab.text()),
                                        r'\text{%s auf } %s' % ('steigend' if w > 0 else 'fallend',
                                                                ab.tex()))))
            S.append(s)
        tt = []
        for i in iv:
            tt.append('streng monoton %s auf %s' % (i.art, i.text()))
        S.append(hinweis('Ergebnis: %s ist %s.' % (n, ' und '.join(tt))))
        doppelt = [z for z, m in grenzen if m % 2 == 0]
        if doppelt:
            S.append(hinweis('(An %s ändert sich das Vorzeichen von %s\' nicht – dort liegt ein '
                             'Sattelpunkt, die Monotonie bleibt.)'
                             % (', '.join('%s = %s' % (v, zahl_text(z)) for z in doppelt), n)))
        return Rechnung(iv, S, 'Monotonie von %s' % n,
                        aufgabe=(_mt('extremstellen.html', 'mono.int', {'P': _seiten_term(self._k)}),
                                 'Monotonie-Intervalle'))

    @mit_weg
    def kruemmung(self, von=None, bis=None, _weg=False):
        """Krümmungsintervalle: art='linksgekrümmt' (f'' > 0) bzw. 'rechtsgekrümmt'."""
        von = None if von is None else Q(von)
        bis = None if bis is None else Q(bis)
        a2 = self._ak(2)
        grenzen, teile, iv = self._intervalle(a2, von, bis, 'linksgekrümmt', 'rechtsgekrümmt')
        if not _weg:
            return iv
        v, n = self.variable, self._nm()
        S = [hinweis('Ableitungen bilden:')] + self._abl_schritte(2, einzug=1)
        if _grad(a2) >= 1:
            S.append(hinweis("Nullstellen von %s'':" % n))
            S.append(Schritt(_T(a2, v), [0], einzug=1))
            S += _loese(a2, v, n + "''", 1)[1]
        S.append(hinweis("Vorzeichen von %s'' in jedem Abschnitt:" % n))
        zu = von is not None or bis is not None
        for a, b, t, w in teile:
            s, _ = _einsetzen_schritt(a2, t, n, 2, v, einzug=1, mit_summen=False)
            s.glieder.append(('>' if w > 0 else '<', 0))
            ab = Intervall(a, b, zu, zu)
            s.glieder.append(('⇒', Teil('%s auf %s' % ('linksgekrümmt' if w > 0 else 'rechtsgekrümmt',
                                                        ab.text()),
                                        r'\text{%s auf } %s' % ('linksgekrümmt' if w > 0
                                                                else 'rechtsgekrümmt', ab.tex()))))
            S.append(s)
        S.append(hinweis('Ergebnis: ' + ', '.join('%s auf %s' % (i.art, i.text()) for i in iv)))
        return Rechnung(iv, S, 'Krümmungsverhalten von %s' % n,
                        aufgabe=(_mt('wendestellen.html', 'pkt.koo', {'P': _seiten_term(self._k)}),
                                 'Wendepunkte bestimmen'))

    @mit_weg
    def kruemmung_an(self, x0, _weg=False):
        """f''(x0) mit Deutung: > 0 linksgekrümmt, < 0 rechtsgekrümmt."""
        x0 = self._zahl(x0)
        S = self._abl_schritte(2)
        s, w = _einsetzen_schritt(self._ak(2), x0, self._nm(), 2, self.variable)
        if w != 0:
            s.glieder.append(('>' if w > 0 else '<', 0))
            s.glieder.append(('⇒', Teil('linksgekrümmt' if w > 0 else 'rechtsgekrümmt',
                                        r'\text{%s}' % ('linksgekrümmt' if w > 0 else 'rechtsgekrümmt'))))
        S.append(s)
        return _ausgabe(Rechnung(w, S, 'Krümmung an der Stelle %s' % zahl_text(x0),
                                 aufgabe=(_mt('wendestellen.html', 'kr.rech',
                                              {'P': _seiten_term(self._k), 'x0': _js(x0)}),
                                          'Krümmung berechnen')), _weg)

    # ---- Symmetrie und Grenzverhalten ---------------------------------- #
    @mit_weg
    def symmetrie(self, _weg=False):
        """'achsensymmetrisch' (zur y-Achse), 'punktsymmetrisch' (zum Ursprung)
        oder 'keine'."""
        k = self._k
        ex = [e for e, c in enumerate(k) if c != 0]
        if all(e % 2 == 0 for e in ex):
            erg = 'achsensymmetrisch'
        elif all(e % 2 == 1 for e in ex):
            erg = 'punktsymmetrisch'
        else:
            erg = 'keine'
        if not _weg:
            return erg
        v, n = self.variable, self._nm()
        hz = ', '.join(str(e) for e in reversed(ex))
        S = [hinweis('Hochzahlen der Summanden (eine Zahl allein zählt als %s⁰): %s' % (v, hz))]
        if erg == 'achsensymmetrisch':
            S.append(hinweis('Nur gerade Hochzahlen ⇒ achsensymmetrisch zur y-Achse.'))
        elif erg == 'punktsymmetrisch':
            S.append(hinweis('Nur ungerade Hochzahlen ⇒ punktsymmetrisch zum Ursprung.'))
        else:
            S.append(hinweis('Gerade und ungerade Hochzahlen gemischt ⇒ weder achsensymmetrisch '
                             'zur y-Achse noch punktsymmetrisch zum Ursprung.'))
        neg = [c * (-1) ** e for e, c in enumerate(k)]
        S.append(Schritt(_fn(n, 0, '-' + v), [_T(neg, v)], hinweis='Probe mit ' + n + '(-' + v + '):'))
        if erg == 'achsensymmetrisch':
            S.append(Schritt(_fn(n, 0, '-' + v), [_fn(n, 0, v)], einzug=1))
        elif erg == 'punktsymmetrisch':
            S.append(Schritt(_fn(n, 0, '-' + v), [Teil('-' + _fn(n, 0, v).t)], einzug=1))
        else:
            S.append(hinweis('weder %s(%s) noch -%s(%s)' % (n, v, n, v), einzug=1))
        return Rechnung(erg, S, 'Symmetrie von %s' % n,
                        aufgabe=('symmetrie.html?t=gleichung_' + ','.join(str(_js(c)) for c in k),
                                 'Symmetrie bei Polynomen'))

    @mit_weg
    def grenzverhalten(self, _weg=False):
        """Verhalten für x → -∞ und x → +∞: etwa ``('-∞', '-∞')``."""
        k = self._k
        g = _grad(k)
        if g <= 0:
            erg = (k[0], k[0])
        else:
            a = k[-1]
            rechts = '+∞' if a > 0 else '-∞'
            links = rechts if g % 2 == 0 else ('-∞' if a > 0 else '+∞')
            erg = (links, rechts)
        if not _weg:
            return erg
        v, n = self.variable, self._nm()
        S = []
        if g <= 0:
            S.append(hinweis('Konstante Funktion – sie bleibt überall %s.' % zahl_text(k[0])))
        else:
            lt = _T([0] * g + [k[-1]], v)
            S.append(hinweis('Für betragsmäßig große %s bestimmt der Summand mit der höchsten '
                             'Hochzahl das Verhalten: ' % v, lt))
            S.append(hinweis('Grad %d (%s), Leitkoeffizient %s (%s):'
                             % (g, 'gerade' if g % 2 == 0 else 'ungerade', zahl_text(k[-1]),
                                'positiv' if k[-1] > 0 else 'negativ')))
            tx = lambda s: s.replace('∞', r'\infty')
            S.append(Schritt(Teil('%s → -∞' % v, r'%s\to -\infty' % v),
                             [('⇒', Teil('%s(%s) → %s' % (n, v, erg[0]),
                                         r'%s(%s)\to %s' % (n, v, tx(erg[0]))))], einzug=1))
            S.append(Schritt(Teil('%s → +∞' % v, r'%s\to +\infty' % v),
                             [('⇒', Teil('%s(%s) → %s' % (n, v, erg[1]),
                                         r'%s(%s)\to %s' % (n, v, tx(erg[1]))))], einzug=1))
        desc = [_bruch_text(c) for c in reversed(k)]
        return Rechnung(erg, S, 'Grenzverhalten von %s' % n,
                        aufgabe=('grenzverhalten-poly.html?t=gBestimmen_l_%d_%s_' % (max(g, 1), ','.join(desc))
                                 if g >= 1 else None, 'Grenzverhalten bestimmen') if g >= 1 else None)

    # ---- Größter und kleinster Wert ------------------------------------- #
    @mit_weg
    def globale_extrema(self, a=None, b=None, _weg=False):
        """Globales Maximum und Minimum – auf [a; b] oder (ohne Grenzen) auf ℝ.

        Ergebnis: ``{'maximum': Punkt oder None, 'minimum': Punkt oder None}``.
        """
        v, n = self.variable, self._nm()
        S = []
        if (a is None) != (b is None):
            raise EingabeFehler('Bitte beide Grenzen angeben – oder keine (dann ganz ℝ).')
        lokal = self._benennen([(x0, art) for x0, _, art in self._stationaer() if art != 'Sattelpunkt'])
        if a is None:
            g = self.grad
            links, rechts = self.grenzverhalten()
            S.append(hinweis('Grenzverhalten: für %s → -∞ geht %s(%s) → %s, für %s → +∞ geht %s(%s) → %s.'
                             % (v, n, v, zahl_text(links), v, n, v, zahl_text(rechts))))
            erg = {'maximum': None, 'minimum': None}
            if g >= 1 and g % 2 == 0:
                if self._k[-1] > 0:
                    tiefe = [p for p in lokal if p.art == 'Tiefpunkt']
                    best = min(tiefe, key=lambda p: float(p.y))
                    erg['minimum'] = best
                    gleich = [p for p in tiefe if abs(float(p.y) - float(best.y)) < 1e-12]
                    S.append(hinweis('Beide Äste gehen nach +∞: kein globales Maximum; das globale '
                                     'Minimum ist der tiefste Tiefpunkt: ', _punkte_teil(gleich)))
                else:
                    hohe = [p for p in lokal if p.art == 'Hochpunkt']
                    best = max(hohe, key=lambda p: float(p.y))
                    erg['maximum'] = best
                    gleich = [p for p in hohe if abs(float(p.y) - float(best.y)) < 1e-12]
                    S.append(hinweis('Beide Äste gehen nach -∞: kein globales Minimum; das globale '
                                     'Maximum ist der höchste Hochpunkt: ', _punkte_teil(gleich)))
            elif g >= 1:
                S.append(hinweis('Ungerader Grad: die Funktionswerte werden beliebig groß und beliebig '
                                 'klein – es gibt weder ein globales Maximum noch ein globales Minimum.'))
            return _ausgabe(Rechnung(erg, S, 'Globale Extrema von %s auf ℝ' % n), _weg)
        a, b = Q(a), Q(b)
        S.append(hinweis('Kandidaten: lokale Extremstellen im Inneren von [%s; %s] und die Ränder.'
                         % (zahl_text(a), zahl_text(b))))
        innen = [p for p in lokal if a < p.x < b]
        kand = []
        for p in innen:
            s, _ = _einsetzen_schritt(self._k, p.x, n, 0, v, einzug=1, mit_summen=False)
            S.append(s)
            kand.append(p)
        for x0, nm in ((a, 'linker Rand'), (b, 'rechter Rand')):
            s, w = _einsetzen_schritt(self._k, x0, n, 0, v, einzug=1, mit_summen=False)
            s.hinweis = nm + ':'
            S.append(s)
            kand.append(Punkt(x0, w, 'R', 'Randpunkt'))
        hoch = max(kand, key=lambda p: float(p.y))
        tief = min(kand, key=lambda p: float(p.y))
        stellen = lambda w: ' und '.join('%s = %s' % (v, zahl_text(p.x)) for p in kand
                                         if abs(float(p.y) - float(w.y)) < 1e-12)
        S.append(hinweis('Größter Wert %s bei %s, kleinster Wert %s bei %s.'
                         % (zahl_text(hoch.y), stellen(hoch), zahl_text(tief.y), stellen(tief))))
        erg = {'maximum': hoch, 'minimum': tief}
        return _ausgabe(Rechnung(erg, S, 'Größter und kleinster Wert auf [%s; %s]'
                                 % (zahl_text(a), zahl_text(b)),
                                 aufgabe=(_mt('extremstellen.html', 'anw.glob',
                                              {'P': _seiten_term(self._k), 'a': _js(a), 'b': _js(b)}),
                                          'Größter und kleinster Wert')), _weg)

    # ---- Tabellen, Bilder, Verweise --------------------------------------- #
    def wertetabelle(self, von=-3, bis=3, schritt=1):
        """Wertetabelle von ``von`` bis ``bis`` – ``print(f.wertetabelle(-2, 2, 0.5))``."""
        von, bis, schritt = Q(von), Q(bis), Q(schritt)
        if schritt <= 0:
            raise EingabeFehler('Die Schrittweite muss positiv sein.')
        xs = []
        z = von
        while z <= bis:
            xs.append(z)
            z += schritt
        n, v = self._nm(), self.variable
        return Tabelle((v, '%s(%s)' % (n, v), v, '%s(%s)' % (n, v)), [(z, self(z)) for z in xs])

    def besondere_punkte(self):
        """Alle besonderen Punkte: Nullstellen, Sy, Extrem-, Sattel- und Wendepunkte
        (ein Punkt, der mehreres ist, kommt nur einmal vor – mit allen Namen)."""
        raus = []
        if self.grad >= 1:
            raus += self.nullstellenpunkte()
        raus.append(Punkt(Zahl(0), self._k[0], 'Sy', 'y-Achsenabschnitt'))
        raus += self.extrempunkte()
        raus += self.sattelpunkte()
        satt = [float(p.x) for p in raus if p.art == 'Sattelpunkt']
        raus += [p for p in self.wendepunkte() if all(abs(float(p.x) - z) > 1e-12 for z in satt)]
        rang = {'Hochpunkt': 4, 'Tiefpunkt': 4, 'Sattelpunkt': 4, 'Wendepunkt': 3,
                'Nullstelle': 2, 'y-Achsenabschnitt': 1}
        zusammen = []
        for p in sorted(raus, key=lambda q: -rang.get(q.art, 0)):
            for q in zusammen:
                if abs(float(q.x) - float(p.x)) < 1e-12 and abs(float(q.y) - float(p.y)) < 1e-12:
                    q.name = q._name_text() + ' = ' + p._name_text()
                    q.index = None
                    break
            else:
                zusammen.append(Punkt(p.x, p.y, p.name, p.art, p.index))
        return sorted(zusammen, key=lambda q: float(q.x))

    def zeichne(self, *weitere, **kw):
        """Zeichnet den Graphen mit allen besonderen Punkten (matplotlib).

        Siehe ``zeichne(...)``: ``f.zeichne(ableitungen=1, datei='f.png')``.
        """
        return zeichne(self, *weitere, **kw)

    def skizze(self, von=None, bis=None, breite=64, hoehe=21):
        """Eine kleine Skizze aus Zeichen – für die Konsole."""
        return skizze(self, von=von, bis=bis, breite=breite, hoehe=hoehe)

    def link(self, art='extrempunkte'):
        """Die Aufgabenseite zu dieser Funktion: ``f.link('wendepunkte')``.

        Arten: nullstellen, gleichungsart, ableitung, extrempunkte, monotonie,
        wendepunkte, wendetangente, symmetrie, grenzverhalten."""
        seiten = self.aufgabenseiten()
        if art not in seiten:
            raise EingabeFehler('Unbekannt: %s (möglich: %s)' % (art, ', '.join(seiten)))
        return seiten[art]

    def aufgabenseiten(self):
        """Alle passenden Aufgabenseiten der Mathe-Tools zu dieser Funktion."""
        P = _seiten_term(self._k)
        raus = {}
        if self.grad >= 1:
            r = self.weg.nullstellen()
            raus['nullstellen'] = r.link()
            pf, tx = self._link_gleichung(self._k, None)
            raus['gleichungsart'] = Link(_webadresse(pf), tx)
        if self.grad >= 1:
            raus['ableitung'] = Link(_webadresse('polynom-ableitung.html?f=' + ','.join(
                _bruch_text(c) for c in self._k)), 'Polynome ableiten')
        if self.grad >= 2:
            raus['extrempunkte'] = Link(_webadresse(_mt('extremstellen.html', 'pkt.koo', {'P': P})),
                                        'Extrempunkte ermitteln')
            raus['monotonie'] = Link(_webadresse(_mt('extremstellen.html', 'mono.int', {'P': P})),
                                     'Monotonie-Intervalle')
        if self.grad >= 3:
            raus['wendepunkte'] = Link(_webadresse(_mt('wendestellen.html', 'pkt.koo', {'P': P})),
                                       'Wendepunkte bestimmen')
            raus['wendetangente'] = Link(_webadresse(_mt('wendestellen.html', 'tang.gl', {'P': P})),
                                         'Gleichung der Wendetangente')
        raus['symmetrie'] = Link(_webadresse('symmetrie.html?t=gleichung_' + ','.join(
            str(_js(c)) for c in self._k)), 'Symmetrie bei Polynomen')
        if self.grad >= 1:
            raus['grenzverhalten'] = Link(_webadresse('grenzverhalten-poly.html?t=gBestimmen_l_%d_%s_'
                                                      % (self.grad, ','.join(_bruch_text(c) for c in
                                                                             reversed(self._k)))),
                                          'Grenzverhalten bestimmen')
        return raus


def _punkte_teil(pk):
    """Punkte als Formelstück: ``H(15/4 | 18411/256) ≈ H(3,75 | 71,92)``."""
    tt, tx = [], []
    for p in pk:
        t = p.text()
        x = p.tex()
        if p._braucht_naeherung():
            if all(_ist_naeherung(k) or (_ist_rational(k) and Q(k).denominator == 1) for k in p):
                t = '%s(%s | %s)' % (p._name_text(), _ung(p.x), _ung(p.y))
                x = r'%s\left(%s\,\middle|\,%s\right)' % (
                    p._name_tex(), (r'\approx ' if _ist_naeherung(p.x) else '') + zahl_tex(p.x),
                    (r'\approx ' if _ist_naeherung(p.y) else '') + zahl_tex(p.y))
            else:
                t += ' ≈ ' + p.text(dez=True)
                x += r'\approx ' + p.tex(dez=True)
        tt.append(t)
        tx.append(x)
    return Teil(', '.join(tt), r',\quad '.join(tx))


def aus_nullstellen(*nullstellen, **kw):
    """Polynom über seine Nullstellen: ``aus_nullstellen(-1, 2, 2, faktor=3)``
    ist 3(x + 1)(x - 2)².  Mehrfache Nullstellen mehrfach angeben (oder als
    Wörterbuch ``{2: 2}``: Nullstelle 2, doppelt)."""
    faktor = Q(kw.pop('faktor', 1))
    name = kw.pop('name', None)
    variable = kw.pop('variable', 'x')
    if kw:
        raise EingabeFehler('unbekannte Angabe: %s' % ', '.join(kw))
    liste = []
    for z in nullstellen:
        if isinstance(z, dict):
            for w, m in z.items():
                liste += [w] * int(m)
        elif isinstance(z, (list, tuple)):
            liste += list(z)
        else:
            liste.append(z)
    k = [faktor]
    for z in liste:
        z = Q(z)
        if not _ist_rational(z):
            raise NichtExaktFehler('Nullstellen bitte als Brüche angeben.')
        k = _mal(k, [-z, Zahl(1)])
    return _aus_liste(k, name, variable)


def variable(name='x'):
    """Die Variable als Polynom – zum Rechnen: ``t = variable('t'); h = 3*t**2``."""
    return _aus_liste([Zahl(0), Zahl(1)], None, name)


x = variable('x')


def loese(gleichung, variable_=None, _weg=False):
    """Löst eine Polynomgleichung exakt: ``loese("x^4 - 9x^2 = 0")`` → [-3, 0, 3].

    ``loese(..., _weg=True)`` liefert den Lösungsweg (wie ``.weg``)."""
    s = _vorbereiten(gleichung)
    if '=' in s:
        l, r = s.split('=', 1)
    else:
        l, r = s, '0'
    kl, _, v = _lies_polynom(l, variable_)
    kr, _, _ = _lies_polynom(r, v)
    d = _minus(kl, kr)
    S = [Schritt(_T(kl, v), [_T(kr, v)], hinweis='Gleichung:')]
    if _grad(kr) >= 0 and not (len(kr) == 1 and kr[0] == 0):
        S.append(Schritt(_T(d, v), [0], hinweis='Alles auf eine Seite:'))
    loes, s2, verfahren = _loese(d, v, None, 0)
    S += s2
    S.append(hinweis('Lösungen: ', _loesungen_text(loes, v)))
    p = _aus_liste(d, None, v)
    r = Rechnung([z for z, _ in loes], S, 'Gleichung lösen', aufgabe=p._link_gleichung(d, verfahren))
    return _ausgabe(r, _weg)


# ====================================================================== #
#  8) Bilder: matplotlib – und eine Skizze aus Zeichen                   #
# ====================================================================== #

def _bereich(funktionen, punkte, von, bis):
    xs = [float(p.x) for p in punkte]
    if von is None or bis is None:
        if xs:
            lo, hi = min(xs), max(xs)
        else:
            lo, hi = -3.0, 3.0
        if hi - lo < 2:
            m = (lo + hi) / 2
            lo, hi = m - 1, m + 1
        rand = 0.1 * (hi - lo) + 0.35
        lo, hi = lo - rand, hi + rand
        von = lo if von is None else float(von)
        bis = hi if bis is None else float(bis)
    return float(von), float(bis)


def _y_bereich(kurven, punkte, unten, oben):
    ys = [float(p.y) for p in punkte] + [0.0]
    lo, hi = min(ys), max(ys)
    spanne = max(hi - lo, 1.0)
    alle = [y for _, Y in kurven for y in Y if y == y]
    klo, khi = (min(alle), max(alle)) if alle else (lo, hi)
    lo2 = max(klo, lo - 0.6 * spanne)
    hi2 = min(khi, hi + 0.6 * spanne)
    lo, hi = min(lo, lo2), max(hi, hi2)
    rand = 0.08 * (hi - lo or 1)
    lo, hi = lo - rand, hi + rand
    return (lo if unten is None else float(unten)), (hi if oben is None else float(oben))


def _punkt_label(p):
    t = lambda z: zahl_text(gerundet(z, 2) if not (_ist_rational(z) and Q(z).denominator == 1) else z)
    return '%s(%s | %s)' % (p._name_text(), t(p.x), t(p.y))


def zeichne(*objekte, **kw):
    """Zeichnet Polynome mit ihren besonderen Punkten (matplotlib).

    ::

        zeichne(f)                         Nullstellen, Sy, H/T, S, W markiert
        zeichne(f, g, von=-2, bis=6)       mehrere Funktionen, fester Bereich
        zeichne(f, ableitungen=2)          dazu f' (gestrichelt) und f''
        zeichne(f, tangenten=[1])          Tangente an der Stelle 1
        zeichne(f, Punkt(1, 3, 'Q'))       eigene Punkte
        zeichne(f, datei='bild.png')       als Datei speichern

    Besondere Punkte werden bei mehreren Funktionen nur für die erste markiert
    (``punkte='alle'``: für alle, ``punkte=False``: gar nicht).
    Eine Funktion nur auf [a; b] zeichnen: ``zeichne((f, -2, 2), (g, 2, 6))``.

    Weitere Angaben: ``unten``/``oben`` (y-Bereich),
    ``titel``, ``groesse=(7, 4.5)``, ``zeigen`` (Fenster öffnen).
    Rückgabe: der Dateiname (wenn gespeichert) oder die Abbildung.
    """
    von = kw.pop('von', None)
    bis = kw.pop('bis', None)
    unten = kw.pop('unten', None)
    oben = kw.pop('oben', None)
    mit_punkten = kw.pop('punkte', True)
    ableitungen = int(kw.pop('ableitungen', 0))
    datei = kw.pop('datei', None)
    zeigen = kw.pop('zeigen', None)
    titel = kw.pop('titel', None)
    tangenten = kw.pop('tangenten', ())
    groesse = kw.pop('groesse', (7, 4.5))
    if kw:
        raise EingabeFehler('unbekannte Angabe: %s' % ', '.join(kw))
    try:
        import matplotlib
        if zeigen is None and datei is None and not os.environ.get('DISPLAY') \
                and sys.platform.startswith('linux') and 'ipykernel' not in sys.modules:
            matplotlib.use('Agg')
        import matplotlib.pyplot as plt
    except ImportError:
        print('matplotlib fehlt – hier eine Skizze:')
        for o in objekte:
            if isinstance(o, Polynom):
                print(skizze(o, von=von, bis=bis))
        return None
    abschnitt = {}
    funktionen = []
    eigene = []
    for o in objekte:
        if isinstance(o, Polynom):
            funktionen.append(o)
        elif isinstance(o, (tuple, list)) and o and isinstance(o[0], Polynom):
            funktionen.append(o[0])                        # (f, a, b): nur auf [a; b]
            abschnitt[id(o[0])] = (float(o[1]), float(o[2]))
        elif isinstance(o, Punkt):
            eigene.append(o)
        elif isinstance(o, (tuple, list)) and len(o) in (2, 3):
            eigene.append(Punkt(Q(o[0]), Q(o[1]), o[2] if len(o) == 3 else 'P'))
    besondere = []
    if mit_punkten:
        markiert = funktionen if (mit_punkten == 'alle' or len(funktionen) == 1) else funktionen[:1]
        for f in markiert:
            bp = f.besondere_punkte()
            if id(f) in abschnitt:
                a, b = abschnitt[id(f)]
                bp = [p for p in bp if a - 1e-12 <= float(p.x) <= b + 1e-12]
            if len(markiert) > 1:
                for p in bp:
                    p.name = '%s: %s' % (f.name, p._name_text())
                    p.index = None
            besondere += bp
    von, bis = _bereich(funktionen, besondere + eigene, von, bis)
    besondere = [p for p in besondere if von <= float(p.x) <= bis]
    n = 500
    X = [von + (bis - von) * i / (n - 1) for i in range(n)]
    kurven = []
    def _im(f, z):
        if id(f) not in abschnitt:
            return True
        a, b = abschnitt[id(f)]
        return a - 1e-12 <= z <= b + 1e-12

    for f in funktionen:
        kf = [float(c) for c in f._k]
        kurven.append((f, [_wert(kf, z) if _im(f, z) else float('nan') for z in X]))
        for j in range(1, ableitungen + 1):
            a = f.ableitung(j)
            ka = [float(c) for c in a._k]
            kurven.append((a, [_wert(ka, z) if _im(f, z) else float('nan') for z in X]))
    unten, oben = _y_bereich(kurven[:max(1, len(funktionen))] if not ableitungen else kurven,
                             besondere + eigene, unten, oben)
    fig, ax = plt.subplots(figsize=groesse)
    farben = ['#1f5fa8', '#c0392b', '#2e8b57', '#8e44ad', '#d35400']
    for i, (f, Y) in enumerate(kurven):
        stufe = f.name.count("'") if f.name else 0
        stil_ = ['-', '--', ':', '-.'][min(stufe, 3)]
        farbe = farben[i % len(farben)] if stufe == 0 else '#777777'
        Yc = [y if (y == y and unten - (oben - unten) <= y <= oben + (oben - unten)) else float('nan')
              for y in Y]
        ax.plot(X, Yc, stil_, color=farbe, lw=2 if stufe == 0 else 1.4,
                label='$%s$' % f.gleichung_tex())
    for x0 in tangenten:
        f = funktionen[0]
        t = f.tangente(x0)
        if isinstance(t, Polynom):
            kt = [float(c) for c in t._k]
            ax.plot(X, [_wert(kt, z) for z in X], '-', color='#e67e22', lw=1.2,
                    label='Tangente: $%s$' % t.gleichung_tex())
    ax.set_xlim(von, bis)
    ax.set_ylim(unten, oben)
    ax.axhline(0, color='black', lw=0.8)
    ax.axvline(0, color='black', lw=0.8)
    ax.grid(True, alpha=0.3)
    stile = {'Nullstelle': ('o', '#555555'), 'y-Achsenabschnitt': ('s', '#555555'),
             'Hochpunkt': ('^', '#c0392b'), 'Tiefpunkt': ('v', '#2e8b57'),
             'Sattelpunkt': ('D', '#8e44ad'), 'Wendepunkt': ('D', '#d35400')}
    gesehen = set()
    for p in besondere + eigene:
        key = (round(float(p.x), 9), round(float(p.y), 9), p.name)
        if key in gesehen:
            continue
        gesehen.add(key)
        if not (unten <= float(p.y) <= oben):
            continue
        m, c = stile.get(p.art, ('o', '#000000'))
        ax.plot([float(p.x)], [float(p.y)], m, color=c, ms=6, zorder=5)
        ax.annotate(_punkt_label(p), (float(p.x), float(p.y)), textcoords='offset points',
                    xytext=(5, 6 if p.art != 'Tiefpunkt' else -14), fontsize=8, color=c)
    ax.legend(fontsize=8, loc='best')
    if titel:
        ax.set_title(titel)
    fig.tight_layout()
    if datei:
        fig.savefig(datei, dpi=150)
    interaktiv = 'agg' not in matplotlib.get_backend().lower()
    if zeigen or (zeigen is None and interaktiv):
        plt.show()
    elif not datei:
        datei = 'graph_%s.png' % re.sub(r'\W', '', (funktionen[0].name if funktionen else 'f')) \
            .replace("'", 's')
        fig.savefig(datei, dpi=150)
        print('Bild gespeichert: %s' % os.path.abspath(datei))
    plt.close(fig)
    return datei or fig


def skizze(f, von=None, bis=None, breite=64, hoehe=21):
    """Der Graph als Zeichenbild (ohne matplotlib) – mit H, T, W, S, N."""
    punkte = f.besondere_punkte()
    von, bis = _bereich([f], punkte, von, bis)
    kf = [float(c) for c in f._k]
    X = [von + (bis - von) * i / (breite - 1) for i in range(breite)]
    Y = [_wert(kf, z) for z in X]
    unten, oben = _y_bereich([(f, Y)], [p for p in punkte if von <= float(p.x) <= bis], None, None)
    feld = [[' '] * breite for _ in range(hoehe)]
    zeile = lambda y: int(round((oben - y) / (oben - unten) * (hoehe - 1)))
    spalte = lambda z: int(round((z - von) / (bis - von) * (breite - 1)))
    if unten <= 0 <= oben:
        r0 = zeile(0)
        for c in range(breite):
            feld[r0][c] = '-'
    if von <= 0 <= bis:
        c0 = spalte(0)
        for r in range(hoehe):
            feld[r][c0] = '|' if feld[r][c0] != '-' else '+'
    alt = None
    for c, y in enumerate(Y):
        if not (unten <= y <= oben):
            alt = None
            continue
        r = zeile(y)
        if alt is not None and abs(r - alt) > 1:
            for rr in range(min(r, alt) + 1, max(r, alt)):
                feld[rr][c] = '*'
        feld[r][c] = '*'
        alt = r
    for p in punkte:
        if von <= float(p.x) <= bis and unten <= float(p.y) <= oben:
            feld[zeile(float(p.y))][spalte(float(p.x))] = (p.name or 'P')[0]
    kopf = '%s   (x von %s bis %s, y von %s bis %s)' % (
        f.gleichung(), zahl_text(round(von, 2)), zahl_text(round(bis, 2)),
        zahl_text(round(unten, 2)), zahl_text(round(oben, 2)))
    return kopf + '\n' + '\n'.join(''.join(z).rstrip() for z in feld)


# ====================================================================== #
#  9) Steckbriefaufgaben (Rekonstruktion)                                #
# ====================================================================== #

_BED_RE = re.compile(r"^\s*([A-Za-z])('*)\s*\(\s*([^()]+?)\s*\)\s*=\s*(.+?)\s*$")
_PKT_RE = re.compile(r"^\s*(Hochpunkt|Tiefpunkt|Extrempunkt|Wendepunkt|Sattelpunkt|Punkt)?\s*"
                     r"([A-Za-z][A-Za-z0-9]*)?\s*\(\s*([^|;()]+?)\s*[|;]\s*([^|;()]+?)\s*\)\s*$", re.I)
_STELLE_RE = re.compile(r'^\s*(Nullstelle|Extremstelle|Wendestelle)\s*(?:bei)?\s*(?:[a-z]\s*=)?\s*(.+?)\s*$', re.I)
_STEIG_RE = re.compile(r'^\s*Steigung\s+(.+?)\s+(?:bei|an der Stelle)\s*(?:[a-z]\s*=)?\s*(.+?)\s*$', re.I)


def _bedingungen(texte):
    """Bedingungen -> Liste von (Ableitung n, Stelle x0, Wert y0, Beschreibung)."""
    raus = []
    for b in texte:
        if isinstance(b, (tuple, list)) and len(b) == 3:
            n, x0, y0 = int(b[0]), Q(b[1]), Q(b[2])
            raus.append((n, x0, y0, "f%s(%s) = %s" % ("'" * n, zahl_text(x0), zahl_text(y0))))
            continue
        s = str(b).replace('−', '-').strip()
        m = _BED_RE.match(s)
        if m:
            raus.append((len(m.group(2)), Q(m.group(3)), Q(m.group(4)), s))
            continue
        m = _PKT_RE.match(s)
        if m:
            wort = (m.group(1) or '').lower()
            buch = (m.group(2) or '').upper()
            x0, y0 = Q(m.group(3)), Q(m.group(4))
            raus.append((0, x0, y0, s))
            if wort in ('hochpunkt', 'tiefpunkt', 'extrempunkt', 'sattelpunkt') or \
                    (not wort and buch in ('H', 'T', 'E')):
                raus.append((1, x0, Zahl(0), s + ' (waagerechte Tangente)'))
            if wort in ('wendepunkt', 'sattelpunkt') or (not wort and buch == 'W'):
                raus.append((2, x0, Zahl(0), s + " (f'' = 0)"))
            continue
        m = _STELLE_RE.match(s)
        if m:
            n = {'nullstelle': 0, 'extremstelle': 1, 'wendestelle': 2}[m.group(1).lower()]
            raus.append((n, Q(m.group(2)), Zahl(0), s))
            continue
        m = _STEIG_RE.match(s)
        if m:
            raus.append((1, Q(m.group(2)), Q(m.group(1)), s))
            continue
        raise EingabeFehler('Diese Bedingung verstehe ich nicht: »%s« – Beispiele: "f(0) = -6", '
                            '"f\'(2) = 0", "H(2|5)", "W(1|0)", "Nullstelle bei 3".' % s)
    return raus


def _lgs(A, b):
    """Gauß-Jordan mit Brüchen -> Lösung oder Fehler."""
    n = len(A[0])
    M = [list(map(Zahl, z)) + [Zahl(w)] for z, w in zip(A, b)]
    zeile = 0
    piv = []
    for sp in range(n):
        p = next((i for i in range(zeile, len(M)) if M[i][sp] != 0), None)
        if p is None:
            continue
        M[zeile], M[p] = M[p], M[zeile]
        f = M[zeile][sp]
        M[zeile] = [c / f for c in M[zeile]]
        for i in range(len(M)):
            if i != zeile and M[i][sp] != 0:
                g = M[i][sp]
                M[i] = [a - g * c for a, c in zip(M[i], M[zeile])]
        piv.append(sp)
        zeile += 1
    for z in M[zeile:]:
        if z[-1] != 0:
            raise PolynomFehler('Die Bedingungen widersprechen sich – kein solches Polynom.')
    if len(piv) < n:
        raise PolynomFehler('Die Bedingungen reichen nicht aus – es gibt mehrere Polynome '
                            '(%d Unbekannte, nur %d unabhängige Gleichungen).' % (n, len(piv)))
    return [M[i][-1] for i in range(n)]


def steckbrief(grad, *bedingungen, **kw):
    """Steckbriefaufgabe: das Polynom vom Grad ``grad`` mit diesen Eigenschaften.

    ::

        steckbrief(2, "f(0) = -6", "f(1) = 0", "f'(2) = 0")      -> -2x² + 8x - 6
        steckbrief(3, "H(0|4)", "W(1|2)")                       Punkte mit Bedeutung
        steckbrief(3, "Nullstelle bei 2", "Steigung 3 bei 0", …)
        steckbrief(2, …, weg=True)                              mit Lösungsweg
    """
    weg = kw.pop('weg', False) or kw.pop('_weg', False)
    name = kw.pop('name', 'f')
    var = kw.pop('variable', 'x')
    if kw:
        raise EingabeFehler('unbekannte Angabe: %s' % ', '.join(kw))
    bed = _bedingungen(bedingungen)
    g = int(grad)
    buch = 'abcdefghijklmnopqrstuvw'[:g + 1]            # a·xᵍ + b·xᵍ⁻¹ + …
    A, rhs = [], []
    for n, x0, y0, _ in bed:
        zeile = []
        for j in range(g + 1):
            e = g - j                                   # Hochzahl zu Buchstabe j
            if e < n:
                zeile.append(Zahl(0))
            else:
                fak = math.factorial(e) // math.factorial(e - n)
                zeile.append(Zahl(fak) * x0 ** (e - n))
        A.append(zeile)
        rhs.append(y0)
    werte = _lgs(A, rhs)
    k = list(reversed(werte))
    erg = _aus_liste(k, name, var)
    if not weg:
        return erg

    def ansatz(n):
        tt, tx = [], []
        for j in range(g + 1):
            e = g - j
            if e < n:
                continue
            fak = math.factorial(e) // math.factorial(e - n)
            pe = e - n
            pot_t = '' if pe == 0 else (var if pe == 1 else var + _hochzahl_text(pe))
            pot_x = '' if pe == 0 else (var if pe == 1 else var + '^%d' % pe)
            ft = '' if fak == 1 else '%d' % fak
            tt.append(ft + buch[j] + pot_t)
            tx.append(ft + buch[j] + pot_x)
        return Teil(' + '.join(tt) or '0', '+'.join(tx) or '0')

    def gleichung(zeile, y0):
        tt, tx = '', ''
        for c, bb in zip(zeile, buch):
            if c == 0:
                continue
            vz = '-' if c < 0 else '+'
            a = abs(c)
            ct = '' if a == 1 else zahl_text(a)
            cx = '' if a == 1 else zahl_tex(a)
            if not tt:
                tt += ('-' if vz == '-' else '') + ct + bb
                tx += ('-' if vz == '-' else '') + cx + bb
            else:
                tt += ' %s %s%s' % (vz, ct, bb)
                tx += '%s%s%s' % (vz, cx, bb)
        return Teil('%s = %s' % (tt or '0', zahl_text(y0)), '%s = %s' % (tx or '0', zahl_tex(y0)))

    nmax = max([n for n, _, _, _ in bed] + [0])
    S = [hinweis('Ansatz (Grad %d):' % g)]
    for n in range(nmax + 1):
        S.append(Schritt(_fn(name, n, var), [ansatz(n)], einzug=1))
    S.append(hinweis('Bedingungen in Gleichungen übersetzen:'))
    for (n, x0, y0, txt), zeile in zip(bed, A):
        S.append(Schritt(Teil('%s%s(%s) = %s' % (name, "'" * n, zahl_text(x0), zahl_text(y0)),
                              "%s%s(%s) = %s" % (name, "'" * n, zahl_tex(x0), zahl_tex(y0))),
                         [('⇒', gleichung(zeile, y0))], einzug=1))
    S.append(hinweis('Lineares Gleichungssystem lösen (Einsetzen bzw. Gauß-Verfahren):'))
    S.append(hinweis(Teil(', '.join('%s = %s' % (bb, zahl_text(w)) for bb, w in zip(buch, werte)),
                         r',\quad '.join('%s = %s' % (bb, zahl_tex(w)) for bb, w in zip(buch, werte))),
                     einzug=1))
    S.append(Schritt(_fn(name, 0, var), [_T(k, var)], hinweis='Ergebnis:'))
    return Rechnung(erg, S, 'Steckbriefaufgabe (Grad %d)' % g)


# ====================================================================== #
#  10) Hilfe                                                             #
# ====================================================================== #

_HILFE = """
polynom.py – Ganzrationale Funktionen mit exakter Bruchrechnung
================================================================

Eingeben
  f = Polynom("f(x) = -x^4 + 5x^3 + 6")    auch x², x^(2), 0,5x, 1/3 x^3
  f = Polynom("2(x-1)(x+3)^2")             Klammern, Produkte, Potenzen
  h = Polynom("h(t) = -27t^3 + 270t^2")    Name und Variable aus dem Text
  f = Polynom(1, 0, -4, 0)                 Koeffizienten wie geschrieben
  f = aus_nullstellen(-2, 0, 2, faktor=3)  über die Nullstellen
  f = 2*x**3 - 4*x + 1                     mit der Variablen x rechnen
  g = f(x - 4)                             verschieben (Verkettung)

Ergebnisse (exakt)                        mit Lösungsweg: f.weg.…
  f(2), f.wert(2)                          Funktionswert
  f.ableitung(), f.ableitung(2)            Ableitungen (Polynome)
  f.nullstellen(), f.nullstellen_vielfach()
  f.y_achsenabschnitt()
  f.symmetrie(), f.grenzverhalten()
  f.steigung(x0), f.steigungswinkel(x0), f.stellen_mit_steigung(m)
  f.tangente(x0), f.normale(x0), f.sekante(a, b), f.sekantensteigung(a, b)
  f.extrempunkte(), f.sattelpunkte(), f.art(x0)
  f.wendepunkte(), f.wendetangenten(), f.kruemmung_an(x0)
  f.monotonie(), f.monotonie(0, 9), f.kruemmung()
  f.globale_extrema(), f.globale_extrema(0, 9)
  f.schnittpunkte(g), f.integral(a, b), f.stammfunktion()
  loese("x^4 - 9x^2 = 0")                  Gleichungen
  steckbrief(2, "f(0)=-6", "f(1)=0", "f'(2)=0")

Lösungswege
  r = f.weg.extrempunkte()
  print(r)            als Text            r.tex()     als LaTeX (align*)
  r.ergebnis          das Ergebnis        r.link()    dieselbe Aufgabe auf der Webseite
  dir(f.weg)          alles mit Lösungsweg

Bilder und Tabellen
  f.zeichne()                              besondere Punkte markiert
  zeichne(f, g, von=-2, bis=6, ableitungen=1, datei='bild.png')
  print(f.skizze())                        Bild aus Zeichen (ohne matplotlib)
  print(f.wertetabelle(-2, 2, 0.5))

Webseite
  f.aufgabenseiten()                       alle passenden Aufgabenseiten
  f.link('wendepunkte').oeffnen()

Einstellungen
  einstellen(hoch='^')                     x^3 statt x³ (zum Kopieren)
  einstellen(quadratisch='abc')            abc- statt p-q-Formel
  einstellen(stellen=3, komma=False)
"""


def hilfe():
    """Zeigt eine Übersicht aller Möglichkeiten."""
    print(_HILFE)


__all__ = [
    'Polynom', 'x', 'variable', 'aus_nullstellen', 'loese', 'steckbrief', 'zeichne', 'skizze',
    'Punkt', 'Intervall', 'Tabelle', 'Rechnung', 'Schritt', 'hinweis', 'Link', 'F', 'Teil',
    'Ausdruck', 'Zahl', 'Bruch', 'Q', 'Wurzelzahl', 'wurzel', 'nte_wurzel', 'Naeherung',
    'ist_exakt', 'gerundet', 'zahl_text', 'zahl_tex', 'einstellen', 'stil', 'STIL', 'hilfe',
    'PolynomFehler', 'EingabeFehler', 'NichtExaktFehler',
]
