---
title: 'Python sąrašai'
description: 'Pradžiamokslis apie Python sąrašus'
---

(*angl. list*)

## Apie sąrašus

Iš principo, sąrašas programavime yra tas pats, kas sąrašas yra realiame gyvenime: tai „kas tam tikra eile surašyta“ (iš [zodis.eu](https://zodis.eu/reiksme/sarasas)).

Sąrašai naudojami tada, kai daug reikšmių (pvz. spalvos, pažymiai, mėnesio temperatūra) yra susijusios, o saugoti pavieniuose kintamuosiuose yra neefektyvu. Pavyzdžiui:

```python
n=15 # number of grades
grade_1=10
grade_2=5
grade_3=7
grade_4=8
# ...
# ...
# ...
grade_15=5

# average = sum of grade / number of grades
average=(grade_1+grade_2+grade_3 + ... + grade_15)/n
print(average)
```

O jeigu būtų pažymių daugiau? Jeigu turėtume skirtingų asmenų pažymius?

## Pirmasis sąrašas

Sąrašas yra reikšmė, sąrašo kintamasis sukuriamas, kaip ir visi kiti kintamieji: kairėje lygybės pusėje nurodant kintamojo vardą, o dešinėje reikšmę. Sąrašo reikšmė aprašoma su laužtiniais skliaustais, reikšmes skiriant kableliu:

```python
grades = [10, 5, 7, 8, ..., 5]
```

Sąraše galima saugoti įvairių tipų reikšmes:

```python
# List of strings
students = ["Vilius", "Vilijus", "William", "Vilhelm", "Villem", "Guilherme"] 

# Boolean list
passed_exam = [True, False, True, True, True, False]

# List of float number
exam_scores = [14.3, 20.1, 19.5, 22.5, 23.9, 25.0, 12.5]

# List of mixed values: integer, float, string, another list, boolean
# Such list is used rarely
list_of_almost_everything = [42, 3, "Hello, World!", [1, 2, 3], True]
```

Dažnai reikės pradėti sąrašą nuo balto lapo. Tokiam atvejui galima sukurti tuščia sąrašą:

```python
empty_list = []
print(empty_list) # prints: []
```

## Sąrašo dydis

Jau anksčiau susipažinome su `len()`{lang="python"} funkcija, su šia mes galima sužinoti String type kintamojo dydį arba kitaip - kiek simolių sudaro tekstą. Šią funkciją taip pat galima panaudoti sužinant kiek elementų sudaro sąrašą. Tam tereikia, kaip funkcijos `len()`{lang="python"} argumentą pateikti sąrašą.

Prieš pateikiant pavyzdį, dar susipažinkime su kita funkcija: `sum()`{lang="python"}. Šios funkcijos vardas išduoda, jos veikimą - sumuoja sąrašo skaičius. Kaip argumentą pateikus sąrašą su skaičiais (*int* arba *float* reikšmėmis), gausime to sąrašo visų elementų suma. Toliau pavyzdys su `len()`{lang="python"} ir `sum()`{lang="python"} funkcijomis.

```python
hourly_temperatures = [
    14.5,  # 00:00
    14.0,  # 01:00
    13.5,  # 02:00
    13.0,  # 03:00
    12.8,  # 04:00
    12.5,  # 05:00
    12.0,  # 06:00
    12.2,  # 07:00
    13.0,  # 08:00
    15.0,  # 09:00
    17.5,  # 10:00
    20.0,  # 11:00
    22.0,  # 12:00
    23.5,  # 13:00
    24.0,  # 14:00
    23.8,  # 15:00
    22.5,  # 16:00
    21.0,  # 17:00
    19.5,  # 18:00
    18.0,  # 19:00
    17.0,  # 20:00
    16.5,  # 21:00
    15.5,  # 22:00
    15.0   # 23:00
]

temperatures_sum = sum(hourly_temperatures)
temperatures_count = len(hourly_temperatures)
average = temperatures_sum/temperatures_count
print("Average temperature of a day") # prints: Average temperature of a day
print(average) # prints: 17.0125
```

## Priega prie elementų

### Indeksavimas

Atliekant veiksmus su pavieniais sąrašo elementais, pirmiausia turime juos pasiekti (*angl. access*). Jeigu norime sudėti skaičius, turinti du kintamuosius, tai padaryti yra intuityvu:

```python
grade_1=10
grade_2=5
grades_sum=grade_1+grade_2
print(grade_sum) # prints: 15
```

Jeigu turime sąrašą su dviem skaičiais, tai būtų galima padaryti šitaip:

```python
grades=[10, 5]
grades_sum=grades[0]+grades[1]
print(grade_sum) # prints: 15
```

Pavieniai sąrašo kintamieji pasiekiami naudojant jo sąrašo eilės numerį - **indeksą**. Dažniausiai programavime sąrašo elementus pradedame skaičiuoti nuo 0, kitaip negu įpratę realiame gyvenime.
Sukurkime spalvų sąrašą.

```python
pink_hues = [
    "Pink",
    "Light Pink",
    "Hot Pink",
    "Deep Pink",
    "Baby pink",
    "Fuschia"
]
```

Tai kiekvieną spalvą galime pasiekti naudojantis indeksu:

| **Indeksas** | 0    | 1          | 2        | 3         | 4         | 5       |
| ------------ | ---- | ---------- | -------- | --------- | --------- | ------- |
| **Spalva**   | Pink | Light Pink | Hot Pink | Deep Pink | Baby Pink | Fuchsia |

Pavyzdys su kodu:

```python
# ...
print(pink_hues[0]) # prints: Pink
print(pink_hues[1]) # prints: Light Pink
print(pink_hues[0]) # prints: Pink
print(pink_hues[5]) # prints: Fuschia
```

Atkreipkite dėmesį, kad nors turime spalvų sąrašą su 6 elementais. Paskutinis elementas nurodomas 5, o bendru atveju $n-1$ (čia n - sąrašo ilgis).

### Neigiami indeksai

Praplėskite anksčiau naudotą spalvų sąrašą, kad šio sąrašo dydis nebūtų akivaizdus:

```python
pink_hues = [
    "Pink",
    "Light Pink",
    "Hot Pink",
    "Deep Pink",
    "Baby Pink",
    "Fuchsia",
    "Blush Pink",
    "Rose Pink",
    "Salmon Pink",
    "Coral Pink",
    "Mauve Pink",
    "Magenta",
    "Carnation Pink",
    "Cherry Blossom Pink",
    "Bubblegum Pink",
    "Lavender Pink",
    "Peach Pink",
    "Flamingo Pink",
    "Watermelon Pink"
]
```

Nesuskaičiavus, sunku vizualiai nusakyti šio sąrašo dydį. Programuojant dažniausiai nežinome, kiek sąraše bus reikšmių:

- Kiek laiškų yra el.pašte - vieną dieną 5, kitą 12, o po metų ir 300;
- Kiek žinučių yra jūsų susirašinėjime - su kiekviena diena vis daugiau;
- Kiek jūsų naujajame bloge yra vartotojų;
- ir kt.

Todėl programuojant, konkrečiais skaičiais, o naudojant sąrašus - indeksais, nėra naudojamasi. Dažnai naudojame relatyvius indeksus - paskutinis indeksas, priešpaskutinis indeksas, pirmasis indeksas, 2-asis indeksas, 20 indeksas nuo galo ir t.t.

Prisiminkime, kad bendru atveju paskutinį sąrašo elementą galime pasiekti $n-1$ (čia n - sąrašo ilgis). Naudojant python tai galima užrašyti šitaip:

```python
# ...
# In this situation
# len(pink_hues) = 18
# last_element_index = 18 - 1 = 17
last_element_index = len(pink_hues) - 1
# Takes 17th element of pink_hues list
print(pink_hues[last_element_index]) # prints: Watermelon Pink

# without new variable
print(pink_hues[len(pink_hues) - 1]) # prints: Watermelon Pink
```

Kadangi programuotojai mėgsta pasilengvinti savo darbą ir išvengti nereikalingų rašymų, *Python* kalboje atsirado nauja sintaksė - neigiami indeksai. Šiais nurodomi elementai nuo galo:

| **Indeksas** | 0    | ... | -6                  | -5             | -4            | -3         | -2            | -1              |
| ------------ | ---- | --- | ------------------- | -------------- | ------------- | ---------- | ------------- | --------------- |
| **Spalva**   | Pink | ... | Cherry Blossom Pink | Bubblegum Pink | Lavender Pink | Peach Pink | Flamingo Pink | Watermelon Pink |

Tai anksčiau rašyta kodą galima modifikuoti naudojant neigiamus indeksus:

```python
# ...
print(pink_hues[-1]) # prints: Watermelon Pink
```

### Pjūviai

#### Nuo a iki b

Dabar apie pjūvius. Šiame skyrelyje sužinosime atsakymą į klausimą: „kaip, turint sąrašą, gauti mažesnį sąrašą, kuris sudarytas iš pradinio sąrašo elemenetų, kurio indeksai *a* iki indekso *b*“. Vėl panaudokime spalvų sąrašą:

| **Indeksas**        | 0    | **1**          | **2**        | **3**         | **4**         | 5       | ... | `len(pink_hues)-1`{lang="python"} |
| ------------------- | ---- | -------------- | ------------ | ------------- | ------------- | ------- | --- | --------------------------------- |
| **Spalva**          | Pink | **Light Pink** | **Hot Pink** | **Deep Pink** | **Baby Pink** | Fuchsia | ... | Watermelon Pink                   |
| **Pjūvio reikšmės** |      | **a**          | -            | -             | **b**         |         |     |                                   |

Tarkime, reikia sudaryti sąrašą iš keletos visų spalvų sąrašo elementų:  `["Light Pink", "Hot Pink", "Deep Pink", "Baby Pink"]`{lang="python"}. Šitam problemai spręsti panaudosime *Python* pjūvio sintaksę:

```python
# ...
a=1
b=4
new_pink_hues = pink_hues[a:b+1]
print(new_pink_hues) # prints: ['Light Pink', 'Hot Pink', 'Deep Pink', 'Baby Pink']
```

Naujame sąraše turime visas spalvų reikšmes, kurių indeksai nuo 1 iki 4. Reikia atkreipti dėmesį, kad indeksas, iki kurio paimami elementai, yra neįskaitant. Todėl buvo nurodomas galinis indeksas pridedant vienetą.

#### Pirmi *n* elementai

Jeigu norime paimti pirmus *n* n elementus iš sąrašo, tereikia pirmąjį skaičių pjūvyje nurodyti **0**:

```python
print("First five pink hues:") # prints: First five pink hues
print(pink_hues[0:5]) # prints: ['Pink', 'Light Pink', 'Hot Pink', 'Deep Pink', 'Baby Pink']
```

Bet ir šitoje sintaksė galima pasinaudoti programuotojų tingėjimo vaisiais. Jeigu nenurodysime jokio skaičiaus, pagal nutylėjimą atvejį, pjūvis bus nurodamas nuo 0:

```python
print("Still first five pink hues:") # prints: Still first pink hues
print(pink_hues[:5]) # prints: ['Pink', 'Light Pink', 'Hot Pink', 'Deep Pink', 'Baby Pink']
```

O kas bus jeigu nurodysime pirmąją pjūvio reikšmę, bet antrąją paliksime tuščią? Pavyzdžiui `pink_hues[3:]`{lang="python"}?

#### Paskutiniai *n* elementai

Kaip ir visur programavime yra begalė būdų atlikti tą patį dalyką. Paskutinius *n* elementų galima paimti primityviai - nurodant indeksus su `len()`{lang="python"} funkcija:

```python
print("Last three pink hues:") # prints: Last three pink hues
print(pink_hues[n-3:n])  # prints: ['Pink', 'Light Pink', 'Hot Pink', 'Deep Pink', 'Baby Pink']
```

Pirmiausia galima sužinoti, kiek sąraše yra elementų. Konkrečiu atveju - 19. Tada paimami elementai nuo $16$ ($=19-3$) iki sąrašo galo ($19$). Kadangi paskutinio elemento indeksas yra $18$ (indeksai skačiuojami nuo $0$), o pjūvyje nurodomas skaičius iki neįskaitant, tai todėl viskas veikia gerai.

Toks principas dažnai naudojamas kitose programavimo kalbose. *Python* vėl galima pasilengvinti ir panaudoti anksčiau sužinotus neigiamus indeksus:

```python
print("Last three pink hues:") # prints: Last three pink hues
print(pink_hues[-3:])  # prints: ['Peach Pink', 'Flamingo Pink', 'Watermelon Pink']
```

#### Kitos pjūvių galimybės

- Kas n sąrašo elementų paėmimas (sintaksė `your_list[start:end:jump]`{lang="python"})

```python
print("Every 3rd pink hue from index 3 to 15:") # prints: Every 3rd pink hue from index 3 to 15
print(pink_hues[3:15-1:3])  # prints: ['Deep Pink', 'Blush Pink', 'Coral Pink', 'Carnation Pink']
```

- Sąrašo apsukimas

```python
pink_hues_every_3=pink_hues[3:15-1:3]
print("Every 3rd pink hue from index 3 to 15:") # prints: Every 3rd pink hue from index 3 to 15
print(pink_hues_every_3)  # prints: ['Deep Pink', 'Blush Pink', 'Coral Pink', 'Carnation Pink']
print("Reversed result:") # prints: Reversed result:
print(pink_hues_every_3[::-1]) # prints: ['Carnation Pink', 'Coral Pink', 'Blush Pink', 'Deep Pink']
```

- Visų elementai, išskyrus *n* paskutinius:

```python
whole_list_but_15_last=pink_hues[:-15]
print("Whole list but 15 last") # prints: Whole list but 15 last
print(whole_list_but_15_last)  # prints: ['Pink', 'Light Pink', 'Hot Pink', 'Deep Pink']
```

- ir daug kitų galimybių...

## Metodas `index()`{ lang=python }

Pirmasis sąrašo tipo kintamųjų metodas, kurį aptarsime yra `index()`{ lang=python }. Šiuo galima sužinoti konkretaus elemento vietą (indeksą) sąraše. 

Tarkime vėl turime žalios spalvos atspalvių sąrašą:

```python
forest_green_hues = [
    "Dark Green",      
    "Sea Green",       
    "Medium Sea Green",
    "Olive Drab",
    "Forest Green",      
    "Dark Olive Green",
]
```

Norime sužinoti, koks indeksas `"Forest Green"`{lang=python} spalvos. Tokiu atveju galima panaudoti anksčiau minėtą metodą:

```python
# ...
forest_green_index = forest_green_hues.index("Forest Green")
print(forest_green_index) # prints: 4
```

Šią reikšmę galima panaudoti manipuliuojant sąrašo reikšmės:

```python {16, 20}
forest_green_hues = [
    "Dark Green",      
    "Sea Green",       
    "Medium Sea Green",
    "Olive Drab",
    "Forest Green",      
    "Dark Olive Green",
]

forest_green_index = forest_green_hues.index("Forest Green")
print(forest_green_index) # prints: 4

print("List before modifications") # prints: List before modifications
print(forest_green_hues) # prints: ['Dark Green', 'Sea Green', 'Medium Sea Green', 'Olive Drab', 'Forest Green', 'Dark Olive Green']

forest_green_hues[forest_green_index] = "Pink" # Change color of forest_green_index
print("List after changing color") # prints: List before modifications
print(forest_green_hues) # prints: ['Dark Green', 'Sea Green', 'Medium Sea Green', 'Olive Drab', 'Pink', 'Dark Olive Green']

del(forest_green_hues[forest_green_index]) # Delete color at forest_green_index
print("List after deletion") # prints: List after deletion
print(forest_green_hues) # prints: ['Dark Green', 'Sea Green', 'Medium Sea Green', 'Olive Drab', 'Dark Olive Green']
print("Length of list after modifications") # prints: Length of list after modifications
print(len(forest_green_hues)) # prints 5
```

Sąrašų modifikacimas giliau analizuosime kitose pamokose.

### Kiti metodo argumentai

Šis metodas turi neprivalomus argumentus. Galima nurodyti du papildomus argumentus:

1. Nuo kurio indekso ieškoti elemento `start`;
2. Iki kurio indekso ieškoti elemento `end`;

Šio metodo pilna sintaksė `list.index(element, start, end)`{ lang=python }. Tarkime turime pažymių sąrašą, jo ilgis 10, ir norime sužinoti, koks pažymio `10`{ lang=python } indeksas, bet jo ieškoma tarp indeksų 3, 7.

::ProseAlert{ icon="mdi-exclamation-thick" type="warning"}

Jeigu sąraše (ar jo dalyje) yra daugiau negu viena tokia pati reikšmė, kaip ieškoma, metodas `index()`{ lang=python } parodo tik pirmo rasto elemento indeksą.  

#title
Metodo specifika
::

```python
grades=[2, 10, 5, 6, 9, 10, 10, 10, 7, 9]
print(grades.index(10, 2, 7)) # prints: 5
```

### Neegzistuojančio elemento indeksas

O kas bus jeigu sąraše nėra tokio elemento, kurio indekso ieškoma?

```python
numbers=[1, 2, 3, 4, 5, 6, 7, 8, 9]
print(numbers.index(10))
```

Išbandę tokį kodą turėtumėte gauti klaidą:

```text
ValueError: 10 is not in list
```

Šitą problemą galima sutvarkyti naudojanti išimčių tvarkymu (*angl. Exception Handling*). Šia technika naudojasi labiau pažengę progmuotojai, todėl apie ją plačiau išmoksite vėliau.

```python
numbers=[1, 2, 3, 4, 5, 6, 7, 8, 9]
try:
    print(numbers.index(10)) # raises exception
except ValueError:
    print("Value of 10 does not exist in numbers list") # prints: Value of 10 does not exist in numbers list
```

Taip pat galima surasti indeksą, prieš tai patikrinę, ar elementas egzistuoja sąraše. Tai taip pat plačiau panagrinėsime vėliau.

```python
numbers=[1, 2, 3, 4, 5, 6, 7, 8, 9]
if(10 in numbers):
    print(numbers.index(10)) # raises exception
else:
    print("Value of 10 does not exist in numbers list") # prints: Value of 10 does not exist in numbers list
```

## Rikiavimas

Norint išdėstyti duomenis tam tikra tvarka, reikialingas rikiavimas. Kompiuteriuose rikiavimas atliekamas daugelyje vietų:

- Elektroniniame pašte laiškai surikiuoti chronologine tvarka;
- Internetinėse parduotuvėse prekės išdėstytos pagal populiarumą, kainą ar nuolaidą;
- Žodyne sąvokos pateiktos pagal abecėle.
- ir kt.

*Python* sąrašus rikiuoti galima 2 būdais (yra ir *n* kitų būdų): `sort()`{lang="python"} metodu ir `sorted()`{lang="python"} funkcija.
Šie būdai beveik identiški. Yra vienas ryškus principas: su `sort()`{lang="python"} metodu keičiamas sąrašo reikšmė, su `sorted()`{lang="python"} funkcija sąrašo reikšmė nekinta, sukuriamas kitas sąrašas.

::ProseAlert{ icon="mdi-exclamation-thick" type="info"}

Šios sąvokos panaudotos neatsitiktinai skirtingos, bet jų skirtumus išmoksite vėliau. Dabar šias sąvokas galite laikyti vienodomis.

#title
Metodas ir funkcija
::


| **Savybė**                         | **`sort()`{lang="python"} metodas** | **`sorted()`{lang="python"} funkcija**           |
| ---------------------------------- | ----------------------------------- | ------------------------------------------------ |
| Grąžinama reikšmė                  | Niekas                              | Naujas sąrašas                                   |
| Pradinis sąrašas                   | Pakeičiamas                         | Nepakeičiamas                                    |
| Panaudojimas                       | Tik sąrašams                        | Kitoms duomenų struktūroms (sužinosite ateityje) |
| Sintaksė                           | `list.sort()`                       | `sorted(list)`                                   |
| Rakto parametras                   | +                                   | +                                                |
| Atvirkštinio rikiavimio parametras | +                                   | +                                                |
| Pavyzdys                           | `numbers.sort()`                    | `sorted(numbers)`                                |
| Pavyzdys su atvirkštiniu rikiavimu | `numbers.sort(reverse=True)`        | `sorted(numbers, reverse=True)`                  |

Skirtumai tarp dviejų būdų aiškiau pasimatys kode.

Rikiavimas su `sort()`{lang="python"} metodu:

```python {6}
student_1_grades = [10, 5, 6, 7, 10, 9, 2, 6]

print("Before sorting") # prints: Before sorting
print(student_1_grades) # prints: [10, 5, 6, 7, 10, 9, 2, 6]

student_1_grades.sort()

print("After sorting") # prints: After sorting
print(student_1_grades) # prints: [2, 5, 6, 6, 7, 9, 10, 10]
```

Rikiavimas su `sorted()`{lang="python"} funkcija:

```python {6}
student_2_grades = [3, 5, 6, 4, 3, 7, 2, 2]

print("Before sorting") # prints: Before sorting
print(student_2_grades) # prints: [3, 5, 6, 4, 3, 7, 2, 2]

sorted(student_2_grades)

print("After sorting") # prints: After sorting
print(student_2_grades) # prints: [3, 5, 6, 4, 3, 7, 2, 2]
```

Antru atveju sąrašas liko nesurikiuotas, nes mes spausdiname pradinį kintamąjį, kuris nėra modifikuojamas su `sorted()`{lang="python"} funkcija. Tokiu atveju mes turime priskirti naują kintamąjį, nes ši funkcija turi grąžinama (nukopijuoja sąrašo reikšmę ir tada surikiuoja) reikšmę:

```python {6, 9}
student_2_grades = [3, 5, 6, 4, 3, 7, 2, 2]

print("Before sorting") # prints: Before sorting
print(student_2_grades) # prints: [3, 5, 6, 4, 3, 7, 2, 2]

sorted_grades = sorted(student_2_grades)

print("After sorting") # prints: After sorting
print(sorted_grades) # prints: [2, 2, 3, 3, 4, 5, 6, 7]
```

### Numatytasis rikiavimas

Tiesiog naudojant rikiavimą, šis atliekamas pagal numatytus atvejus. Žemiau pateikiama lentelė, kurioje matysite, kaip priklauso rikiavimas

| **Sąrašo duomenų tipas**    | **Rikiavimo tvarka (didėjanti)**                                           |           **Pavyzdinė įvestis** |                                            **Pavyzdinė išvestis** |
| --------------------------- | -------------------------------------------------------------------------- | ------------------------------: | ----------------------------------------------------------------: |
| Sveikieji (integers)        | Pagal skaitine reikšme                                                     |         `[3, 1, 4, 1, 5, 9, 2]` |                                           `[1, 1, 2, 3, 4, 5, 9]` |
| Slankiojo kablelio (floats) | Pagal skaitine reikšme                                                     |     `[3.1, 2.2, 5.5, 1.1, 4.4]` |                                       `[1.1, 2.2, 3.1, 4.4, 5.5]` |
| Eilutės (strings)           | Leksikografinė (pagal abecėle) tvarka                                      | `["banana", "apple", "cherry"]` |                                   `["apple", "banana", "cherry"]` |
| Loginės (boolean)           | Pirmiau `False` (0) nei `True` (1)                                         |    `[True, False, True, False]` |                                      `[False, False, True, True]` |
| Mišrūs tipai**              | Duomenų tipas turi būti palyginimas, kitu atveju įvyksta klaida: TypeError |                 `[1, "2", 3.0]` | TypeError: '<' not supported between instances of 'str' and 'int' |

**Pastaba**: Maišant skirtingus duomenų tipus sąraše (pavyzdžiui, sveikuosius ir eilutės tipo) rikiuojant sukels `TypeError` klaidą, nebent bus imtasi priemonių, kurias sužinosite vėliau.

### Atvirkštinis rikiavimas

Pagal nutylėjimą, sąrašai rikiuojami didėjančia tvarka. Jeigu norime pakeisti tvarką iš didėjančios į mažėjančią, rikiavimo funkcijai galima pateikti neprivalomą (*angl. optional*) argumentą.

```python {9, 23}
# ------------------------------------------
# First student
# ------------------------------------------
student_1_grades = [10, 5, 6, 7, 10, 9, 2, 6]

print("Before sorting") # prints: Before sorting
print(student_1_grades) # prints: [10, 5, 6, 7, 10, 9, 2, 6]

student_1_grades.sort(reverse=True)

print("After sorting") # prints: After sorting
print(student_1_grades) # prints: [10, 10, 9, 7, 6, 6, 5, 2]


# ------------------------------------------
# Second student
# ------------------------------------------
student_2_grades = [3, 5, 6, 4, 3, 7, 2, 2]

print("Before sorting") # prints: Before sorting
print(student_2_grades) # prints: [3, 5, 6, 4, 3, 7, 2, 2]

sorted_student_2_grades = sorted(student_2_grades, reverse=True)

print("After sorting") # prints: After sorting
print(sorted_student_2_grades) # prints: [7, 6, 5, 4, 3, 3, 2, 2]
```

## Užduotys

Visoms užduotims atlikti rekomenduojama naudotis rikiavimu, indeksavimu ir `index()`{lang=python} metodu.

### Kritulių temperatūra

- Sukurkite sąrašą `rainfall_temperatures`{ lang=python } su reikšmėmis:

```text
0.8, 1.6, 5.5, 8.2, 9.8, 14.3, 16.4, 14.6, 13.4, 9.6, 4.5, -1.2, 1.52, 7.85, 15.08, 9.17, 8.16, 3.1, 5.4, 6, 10.7, 11.5, 13.5, 14.4, 14.6, 14.3, 11.4, 8.5, 4.5, 2.34, 9.38
```

Duomenys iš [data.europa.eu](https://data.europa.eu/data/datasets/average-rainfall-temperature?locale=en).

- Šį sąrašą perskelkite į dvi dalis per pusę, sukurdami du naujus sąrašo kintamuosius (jeigu duomenų imties dydis nelyginis, vidurinės reikšmės neįtraukite nei į vieną sąrašą);
- Išveskite, kokie šių dviejų naujų sąrašų vidurkiai;
- Išveskite žinutę, kuri nurodytų, kurios sąrašo dalies vidurkis didesnis;
- Panaudokite pradinį sąrašą ir padalinkite šį sąrašą į du sarašius: vienas su visomis reikšmėmis mažesnėmis negu 10, kitą su visomis reikšmėmis didesnėmis negu 10. Žinoma, kad pirmoji temperatūra didesnė negu 10 yra `10.7`{ lang=python }.
- Išveskite sąrašų ilgius. Taip pat išveskite žinutę, kuri nurodytų, kuris iš dviejų sąrašų didesnis - pirmasis ar antrasis.
- Išveskite mažiausią ir didžiausią temperatūras.
- Išveskite temperatūrų medianą.

### Skaitmenų simbolių sąrašo rikiavimas

- Sukurkite sąrašą `string_numbers`{ lang=python } su reikšmėmis:

```text
"2", "4", "10", "44,", "5", "11", "1", "20", "3", "100", "99", "0"
```

- Išrikiuokite sąrašą (galima ir didėjančia, ir mažėjančia tvarka);
- Paaiškinkite komentare, kodėl sąrašas surikiuotas taip, kaip surikiuotas.
