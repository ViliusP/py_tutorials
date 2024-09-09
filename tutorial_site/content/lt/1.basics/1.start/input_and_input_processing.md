---
title: 'Įvestis konsolėje ir apdorojimas'
description: 'Bla bla bla'
created_at: '2024-09-09'
updated_at: '2024-09-09'
authors:
  - 'Vilius Paliokas'
---

Išmoksite būdą, kaip įvesti duomenis į mūsų kuriamas programas, tai darysime per terminalą (juodą langą). Terminalas (dar vadinamas komandine eilute, kartais konsole) yra tekstu paremta naudotojo sąsaja. Kalbant apie kompiuterius, sąsaja tai komunikacijos taškas tarp naudotojo ir įrenginio. Sąsaja programavime gali turėti ir kitą reikšmę, bet apie tai sužinosite, kai mokysitės kitų programavimo kalbų.

Šioje juodo lango sąsajoje galima gauti informacija, o taip ir ją ir perduoti programai, ką čia ir išmoksite.

Nors ir terminalas atrodo neįprastai, gal šiek tiek bauginančiai pradedančiajam programuotojui, bet šis įrankis yra neišvengiama programuotojo darbo dalis. Vėliau išmoksite kurti ir kitokio tipo sąsajas.

## Įvedimas

### Funkcija `input()`{ lang=python }

Tereikia žinoti vieną funkciją duomenų įvedimui iš terminalo: `input()`{ lang=python }. Šios funkcijos rezultatas: `string`{ lang=python } tipo reikšmė. Pabandykite įvykdyti šį kodą:

```python
input()
```

Įvykdžius, šį kodą turėtų atsirasti galimybė rašyti terminale. Paspaudžius :keyboard-keys{:keys='["enter"]'} programa turėtų pasibaigti.

Kodą galima papildyti ir naudotojui pateikti žinutę, po kurios galima įrašyti tekstą:

```python
input("What is your name? ")
```

Kadangi `input()`{ lang=python } funkcijos gražina reikšmę, o ji yra `string`{ lang=python } tipo, ją galima priskirti kintamajam ir perpanaudoti.

```python
name = input("What is your name? ")
print("Hello, " + name)
```

Tokio kodo rezultatas:

```console
What is your name? Vilijus
Hello, Vilijus!
```

### Reikšmių apdorojimas

Sukurkime kodą, kuris sudėtų du skaičius įvestus iš terminalo:

```python
a=input("Input first number: ")
b=input("Input second number: ")
result=a+b
print("Result: " + result)
```

Toks kodas tokiai užduočiai neturėtų tikti, kadangi gaunamas rezultatas toks:

```console
Input first number: 15
Input second number: 23
Result: 1523
```

Tai atsitinka todėl, kad įvestis yra tipo `string`{ lang=python }, tą galima pamatyti su `typeof()` funkcija. Tai ankstesniame kode mes sudėjome su eilutės tipo kintamuosius.

```python
a=input("Input first number: ")
b=input("Input second number: ")

print("Type of a:")
print(type(a))

print("Type of b:")
print(type(b))

result=a+b
print("Type of result:")
print(type(result))
print("Result: " + result)
```

Kodo išvestis:

```console
Input first number: 12
Input second number: 5
Type of a:
<class 'str'>
Type of b:
<class 'str'>
Type of result:
<class 'str'>
Result: 125
```

Kaip ir daugelyje programavimo kalbų, taip ir mūsų naudojamoje yra būdas paversti eilutės tipo reikšmes į realių skaičių tipą. Python kalboje yra du realių skaičių tipai: `int`{ lang=python } (sveikieji) ir `float`{ lang=python } (slankiojo kablelio skaičiai - skaičiai su kableliais).

Reikšmės pakeitimoas iš vieno į kitą vadinimas vadinamas *type casting*. Tą darysime su trimis funkcijomis:

- `int()`{ lang=python } - reikšmės pavertimas į `int`{ lang=python } tipo reikšmę;
- `float()`{ lang=python } - reikšmės pavertimas į `float`{ lang=python } tipo reikšmę;
- `str()`{ lang=python } - reikšmės pavertimas į `str`{ lang=python } tipo reikšmę.

Šioms funkcijoms tereikia pateikti, kaip argumentą, reikšmę skliausteliuose:

```python
a_string="15"
print("Type of a_string:")
print(type(a_string))

a_int=int(a_string)
print("Type of a_int:")
print(type(a_int))

a_float=float(a_string)
print("Type of a_float:")
print(type(a_float))
```

Kodo išvestis:

```console
Type of a_string:
<class 'str'>
Type of a_int:
<class 'int'>
Type of a_float:
<class 'float'>
```

Pritaikykime šį kodą skaičių sudėjimui, kurie pateikia per terminalą:

```python
a_input=input("Input first number: ")
b_input=input("Input second number: ")

a=int(a_input)
b=int(b_input)

result=a+b
print("Result: " + str(result))
```

Kodo išvestis:

```console
Input first number: 15
Input second number: 200
Result: 215
```

### Netinkama įvestis

Pabandykite vietoje skaičiaus įvestis žodį. Programa turėtų sugriūti ir terminale atsirasti klaidos tekstos (gali būti šiek tiek kitoks):

```console {2, 22}
Input first number: 90
Input second number: kugelis
Traceback (most recent call last):
  File "/usr/lib/python3.10/runpy.py", line 196, in _run_module_as_main
    return _run_code(code, main_globals, None,
  File "/usr/lib/python3.10/runpy.py", line 86, in _run_code
    exec(code, run_globals)
  File "/home/pygame/.vscode/extensions/ms-python.debugpy-2024.10.0-linux-x64/bundled/libs/debugpy/adapter/../../debugpy/launcher/../../debugpy/__main__.py", line 39, in <module>
    cli.main()
  File "/home/pygame/.vscode/extensions/ms-python.debugpy-2024.10.0-linux-x64/bundled/libs/debugpy/adapter/../../debugpy/launcher/../../debugpy/../debugpy/server/cli.py", line 430, in main
    run()
  File "/home/pygame/.vscode/extensions/ms-python.debugpy-2024.10.0-linux-x64/bundled/libs/debugpy/adapter/../../debugpy/launcher/../../debugpy/../debugpy/server/cli.py", line 284, in run_file
    runpy.run_path(target, run_name="__main__")
  File "/home/pygame/.vscode/extensions/ms-python.debugpy-2024.10.0-linux-x64/bundled/libs/debugpy/_vendored/pydevd/_pydevd_bundle/pydevd_runpy.py", line 321, in run_path
    return _run_module_code(code, init_globals, run_name,
  File "/home/pygame/.vscode/extensions/ms-python.debugpy-2024.10.0-linux-x64/bundled/libs/debugpy/_vendored/pydevd/_pydevd_bundle/pydevd_runpy.py", line 135, in _run_module_code
    _run_code(code, mod_globals, init_globals,
  File "/home/pygame/.vscode/extensions/ms-python.debugpy-2024.10.0-linux-x64/bundled/libs/debugpy/_vendored/pydevd/_pydevd_bundle/pydevd_runpy.py", line 124, in _run_code
    exec(code, run_globals)
  File "/home/pygame/development/pyt.py", line 5, in <module>
    b=int(b_input)
ValueError: invalid literal for int() with base 10: 'kugelis'
```

Eilutė `ValueError: invalid literal for int() with base 10: 'kugelis'`{ lang=console } nurodo, kad `int()`{ lang=python } pateiktas blogas argumentas - ne dešimtainis skaičius.

Programavime tokios klaidos dar vadinamos išimtimis, o priemonės, kurių imamasi, kad jų būtų išvengta - išimčių tvarkymu. Apie tai giliau sužinosite kituose skyriuose. Dabar šią techniką naudokite, kaip šabloną. Padaryti taip, kad programa veiktų teisingia reikia naudoti raktažodžius `try/except`{ lang=python }:

```python
try:
  print(x) 
except:
  print("An exception occurred") # this will be executed if print(x) throws an error
```

Sakiniai po `try`{ lang=python } vykdomi tokia tvarka įprastai. Jeigu nors vienoje eilutėje įvyksta klaida, iš karto pradedami vykdyti  visi sakiniai, kurie yra po `except`{ lang=python } raktažodžiu. Panaudokimi šiuos principus sutvarkant dviejų skaičių sudėjimo programą:

```python
a=0
b=0

a_input=input("Input first number: ")
b_input=input("Input second number: ")

try:
    a=int(a_input)
except: 
    print("The first input is not a number, it will be considered as 0")

try:
    b=int(b_input)
except: 
    print("The second input is not a number, it will be considered as 0")

result=a+b
print("Result: " + str(result))
```

Įrašius vietoje antro skaičiaus ne skaičių, gauname tokią išvestį:

```console
Input first number: 9009 
Input second number: two
Second input is not a number, it will be considered as 0
Result: 9009
```

Šiuo atveju, jeigu įvedamas žodis, skaičius nekeičia reikšmės iš numatytos (0), kurios nustatomos pirmose eilutėse. Klaidos apdorojimą būdą dažnai nusprendžia pats programuotojas pagal situaciją. Tokią situaciją galima spręsti ir kitaip - išjungiant programą gavus blogą įvestį. Tai galima padaryti su `quit()`{ lang=python }(jeigu įdomu - [yra ir kitokių būdų](https://stackoverflow.com/questions/73663/how-do-i-terminate-a-script)):

```python
a_input=input("Input first number: ")
b_input=input("Input second number: ")

try:
    a=int(a_input)
except: 
    print("The first input is not a number; the program will exit")
    quit()

try:
    b=int(b_input)
except: 
    print("The second input is not a number; the program will exit")
    quit()

result=a+b
print("Result: " + str(result))
```

## Užduotys

### 1. Temperatūros konvertavimas

Parašykite programa, kuri pateiktą temperatūrą paverstų iš celsijaus į farenheitus. Formulė: $ ^\circ{C}=(^\circ{F}-32)\cdot \frac{5}{9}$.

### 2. Skaičiaus tipas

Paraškite programa, kuri patikrintų, ar įvesti yra sveikasis skaičius, ar slankiojo kablelio.

Programos pavyzdinės išvestys:

```console
Enter a number: 54
The input is an integer.
```

```console
Enter a number: 14.4
The input is a float.
```

```console
Enter a number: not a number
Input is neither an integer nor a float.
```

::ProseAlert{ type="info" }

Kodui sukurti galite panaudoti `int_number = int(float(input))`{lang=python} techniką, kuri tekstą, kuriame yra dešimtainis skaičius, paverčia į sveikąjį: `"16.44"`{ lang=python } **=>** `16.44`{ lang=python } **=>** `16`{ lang=python }.

#title
Patarimas
::

### 3. Didesnis skaičius

Parašykite programa, kuri patikrintų, kuris tarp dviejų įvestų skaičių yra didesnis

Pavyzdinė programos eiga:

```console
Enter the first number: 7
Enter the second number: 10
The first number is bigger than the second number.
```

### 4. Lyginis ar nelyginis

Parašykite programa, kuri patikrintų, ar įvestas skaičius yra lyginis ar nelyginis:

Pavyzdinė programos eiga:

```console
Enter a number: 5
The number is odd.
```

::ProseAlert{ type="info" }

Šiai užduočiai padaryti reikės naudoti modulo `%`{ lang=python } operatorių. Daugiau ieškokite internete - pavyzdžiui, galite įvesti į paieškos variklį tokią užklausą: "python even or odd".

#title
Patarimas
::

### 5. Skaičiuotuvas

Sukurkite skaičiuotuvą, kuris naudojantis 4 operatoriais (+, -, *, /) galėtų atlikti veiksmus tarp dviejų skaičių.

Pavyzdinė programos eiga:

```console
Enter the first number: 8
Enter the second number: 4
Enter operation (+, -, *, /): /

The result is 2.
```
