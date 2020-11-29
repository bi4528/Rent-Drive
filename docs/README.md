# Spletno programiranje 2020/2021

Lastni projekt pri predmetu **Spletno programiranje** v študijskem letu **2020/2021**.

## 1. LP - Osnutek aplikacije in wireframe model

Ideja projekta je porazdeljeni *Rent-a-car*. Kdorkoli se lahko v aplikacijo brezplačno registrira. Vsak uporabnik lahko najame vozilo za izbrani termin in lahko nudi svoja vozila za najem. Ogled vozil je možen vsem, najem pa le registriranim uporabnikom.

Vse strani vsebujejo favicon, footer, navbar pa vsebujejo vse strani razen register.html, login.html, forgotpassword.html in resetpassword.html.

Navbar se razlikuje, če je uporabnik prijavljen ali ne. Če uporabnik ni prijavljen, navbar vsebuje gumbe **Home**, **Nearby**, **List your car**, **Register/Login**, **Search**.
Če pa uporabnik je prijavljen navbar vsebuje gumbe **Home**, **Nearby**, **List your car**, **Profile**, **Search**. Za 1.LP bomo prikazali strani, kot da je uporabnik prijavljen v sistem.

Navbar in footer ves čas omogočajo uporabnikom prehod na prej naštete strani **Home**, **Nearby**, **List your car**, **Profile**, **Search**.

Strani so sledeče:

## [home.html](home.html): 
Home.html je glavna stran aplikacije. Uporabnik lahko poišče aute za najem. Uporabnik filtrira aute s pomočjo kraja (npr. Ljubljana), datuma ter s klikom na zaželeno kategorijo auta. Kategorije so Hatchback, Saloon, Caravan, Coupe, SUV in Pick-up. Auti so prikazani v spodnji polovici strani z uporabo
cards znotraj carousel strukture. Uporabnik z klikom na puščice se premika levo in desno. Po določenem času bo se animacija automatsko zagnala in prikazala aute na naslednji (desni) strani. S klikom na izbrani auto se prikaže nova stran s podatki tega (Master/detail).

## [nearby.html](nearby.html):
Nearby.html omogoča uporabniku ogled autov, ki so v bližini z uporabo mape. S klikom na zaželeni auto se odpre profil tega auta. Stran tudi omogoča ogled vremenske napovedi za izbrano lokacijo. Ti dve funkcionalnosti bosta implementirani v prihodnjih fazah projekta - gre za našo izbiro API-jev projekta.

## [publish.html](publish.html):
Publish.html omogoča uporabniku vnos svojega auta za najem. Uporabnik lahko vnese sliko, podatke o avtomobilu, lokacijo najema, dodatne informacije za avto (npr. pravila), izbere featurje avta in določi ceno.

S klikom na gumb "Submit" uporabnik shrani podatke ter objavi avto na spletni strani.

## [profile.html](profile.html):
Profile.html je stran, ki prikaže informacije o uporabniku in njegovih vozilih. Prikazane informacije uporabnika so ime, priimek, lokacija, mail, telefon in slika. Vsak prikazan auto na strani je možno urediti s klikom na gumb **Edit** in odstraniti s klikom na gumb Remove. Klikom na avtomobil se odpre [vehicleprofile.html](vehicleprofile.html) s podatki o avtomobilu. Poleg lastnih vozil, prikazano so tudi priljubljena vozila (**favorite**).
Uporabnik lahko spremeni podatke s klikom na **Edit** in lahko zaključi sejo s klikom na gumb Log out.

## [edit_profile.html](edit_profile.html):
Edit_profile.html je stran, ki je dostopna le obstoječim uporabnikom. Omogoča jim spremembo osebnih podatkov (imena, priimka, e-mail naslova, telefonske številke in kraja). Uporabnik lahko tudi spremeni svoj trenutni avatar, s klikom na gumb **Choose image** lahko naloži novo sliko ki bo uporabljena kot njegov avatar. Svoje spremembe uporabnik potrdi klikom na gumb **Save**, ki ga pripelje nazaj na lastni profil na [profile.html](profile.html).

## [search.html](search.html):
Search.html je stran ki omogoča iskanje avtomobilov. S klikom na avtomobil se odpre [vehicleprofile.html](vehicleprofile.html), ki vsebuje podatke o avtomobilu. S klikom na uporabnika se odpre [tuji_profile.html](tuji_profile.html) s podatki o uporabniku.

## [vehicleprofile.html](vehicleprofile.html):
Vehicleprofile.html je stran ki prikazuje razne podatke o vozilu ki je za najem. Tukaj je: zaporedje fotografij v "carousel-u", povprečna ocena in "favorite" opcija (srček), kratek opis vozila, seznam ključnih lastnosti (klima, pogon, maksimalna hitrost, navigacija, bluetooth podpora itd.). 

Prikazan je tudi profil najemnika in njegove osnovne informacije (telefonska številka, e-mail naslov in kraj). Izpolnjevanjem polja za vnos datuma, ure in lokacije ter klikom na gumb **Book** uporabnik pride korak bližje najemu, na stran [book.html](book.html). 

Poleg tega, stran vsebuje možnost všečkanja (čist zgoraj poleg imena), povprečno oceno (takoj za tem) in recenzije na koncu strani. Vsaka recenzija vsebuje avatar avtorja, njegovo oceno od 1 do 5 in kratek komentar. Klik na avatar uporabnika pripelje do njegovega [profila](tuji_profile.html).

## [editvehicleprofile.html](editvehicleprofile.html):
Editvehicleprofile.html je stran ki je dostopna samo lastnikom vozil (osebe ki imajo tako uporabniški račun kot avto dano v najem). Uporabnikom je omogočeno ažuriranje podatkov vozila in sicer lahko spremenijo: naložene fotografije vozila, njegovo ime, opis, razne lastnosti, dostopni period najema, mogoče lokacije prevzema vozila, ceno najema. Le-te spremembe uporabniki uveljavijo s klikom na gumb, ki jih pripelje nazaj na [profil vozila](vehicleprofile.html).

## [book.html](book.html):
Book.html je stran čigav namen je izpis podrobnosti najema vozila. Nudi bodisi preklic, bodisi potrditev najema. Preklic vodi nazaj na [profil vozila](vehicleprofile.html), potrditev pa na [confirm.html](confirm.html). Na strani so še enkrat so prikazane izbrane podrobnosti prevzema (lokacija in čas), opis najemnika in lastnega profila (e-mail naslov, ime, priimek, kraj) in omogoča prek povezave dostop do celotnega [profila lastnik](tuji_profile.html) in strani za spremenitev osebnih podatkov na lastnem profilu [edit_profile.html](edit_profile.html).

## [confirm.html](reset-password.html):
Confirm.html je stran, ki prikaže uporabniku obvestilo, če je njegov najem uspešno potrjen. Do nje uporabnik lahko pride, če je potrdil svoj najem na strani [book](book.html). Nudi povezavo do strani [homepage](home.html).

## [register.html](register.html):
Register.html je stran preko katere uporabnik ustvari uporabniški račun. Stran zahteva e-mail naslov, geslo, ime in priimek. Ponuja tudi prehod nazaj na [homepage](home.html) in [login stran](login.html).

## [login.html](login.html):
Login.html je stran preko katere se uporabnik prijavi na spletno stran. Stran zahteva e-mail naslov in geslo, ime in priimek. Ponuja tudi opcijo **remember me** ter vrnitev na [homepage](home.html).

## [forgotpassword.html](forgotpassword.html):
Forgotpassword.html je stran dostopna samo uporabnikom. Omogoča opcijo resetiranja gesla, uporabnik vpiše svoj e-mail naslov, in po kratkem času dobi sporočilo z navodili kako nastaviti novo geslo. Nudi tudi opcijo prehoda na [homepage](home.html) in [login stran](login.html).

## [reset-password.html](reset-password.html):
Reset-password.html je stran do katere se lahko pride zgolj preko prejetega e-mail sporočila (generiran na strani [forgotpassword.html](forgotpassword.html)). Tukaj uporabnik upiše svoje novo geslo, ga ponovi in na koncu potrdi. Mogoč je tudi prehod na [homepage](home.html) in [login stran](login.html).

## [review.html](review.html):
Review.html je stran do katere uporabnik pride preko maila, ko vrne avto nazaj oz. ko se najem konča. Uporabnik lahko oceni najem in napiše kratek komentar. Ko klikne submit se prikaže [vehicleprofile](vehicleprofile.html). 

## Razlike brskalnikov:
Spletna stran je temeljena na Google Chrome brskalniku. V nadaljevanju primerjamo njen izgled na le-tem z Mozillo Firefox, Brave in Microsoft Edgom. 

### Firefox:
Splošno: Font v besedilih je dokaj bolj odebeljen in ostrejši.
1. [home.html](home.html) - črka "w" v Smart ForTwo izgleda drugače. Font spodaj slik.
2. [nearby.html](nearby.html) - črka "v" v vehicle, črka "y" v nearby, črka "w" v weather.
3. [publish.html](publish.html) - prostor za nalaganje slik drugačen, piše "Browse" namesto "Choose files". Skrajni desni del polje za selektiranje izgleda rahlo drugače. Oznake za polja so kanček bolj temno sive. Polje za vnos datuma sploh ni podprto
4. [profile.html](profile.html) in [tuji_profile.html](tuji_profile.html) - font 
5. [vehicleprofile.html](vehicleprofile.html) - polje za vnos datuma sploh ni podprto
6.[editvehicleprofile.html](editvehicleprofile.html) - font, puščice za številke vedno prikazane pri top-speed, age, luggage, door-count (na Chromu samo ob hoveru), polje za vnos datuma sploh ni podprto, prostor za nalaganje slik drugačen, piše "Browse" namesto "Choose files" 
7. [edit_profile.html](edit_profile.html) - gumb choose image bolj rumen, font
8. [search.html](search.html) - veliko posameznih črk izgleda "čudno" (v, w, a)
9. [book.html](book.html) - font, par posameznih črk izgleda "čudno" (v, w, a)
10. [login.html](login.html) - **log in gumb** izgleda večji, kljukica v **remember me** drugačna
11. [forgotpassword.html](forgotpassword.html) - font, **recover password** gumb izgleda večji, povezava na login stran druge nianse modre
12. [register.html](register.html) - font, **register** gumb izgleda večji, povezavi na strani druge nianse modre
13. [reset-password.html](reset-password.html) - font

### Microsoft Edge:
1. [home.html](home.html) - koledar ikonica drugačna
2. [publish.html](publish.html) - koledar ikonica drugačna
3. [profile.html](profile.html) in [tuji_profile.html](tuji_profile.html) - font za nazive vozil bolj odebeljen
4. [vehicleprofile.html](vehicleprofile.html) - font za opis vozil bolj odebeljen, koledar ikonica drugačna
5. [editvehicleprofile.html](editvehicleprofile.html) - koledar ikonica drugačna
6. [search.html](search.html) - font pri opisih vozil bolj odebeljen

### Brave:
Ni večjih razlik z Google Chrome.

## 2. LP

Dinamična spletna aplikacija z logiko na strani strežnika.

### Vnosna polja
### 1. register.hbs - 
Vnosno polje "firstname" sprejema samo besede (znake [Aa-Zz]). Imena s presledkom kot je "Ana Marija" so tudi dovoljena.
Vnosno polje "lastname" sprejema samo besede (znake [Aa-Zz]). Priimiki s presledkom kot je "van Basten" so tudi dovoljena.
Vnosno polje "email" sprejema samo e-mail naslove. Sprejema velike in male alfanumerične znake, Vnosno polje nujno mora imet en znak "@", in znak "." ki mu sledi končnica.
Vnosno polje "username" sprejema 4-15 velikih in malih alfanumeričnih znakov, presledki niso dovoljeni, prav tako pa "_" ali "." na začetku/koncu.
Vnosno polje "password" zahteva varna gesla. Zahtevano je: vsaj 6 alfanumeričnih znakov, vsaj ena velika črka, vsaj ena majhna črka in vsaj eden "specialen znak" (npr. število).
Vnosno polje "repeat-password mora biti kopija polja "password", drugač registracija ne bo uspešna.

Za uspešno registracijo morajo vsa polja biti ustrezno izpoljnena. 

### 2. login.hbs - 
Vnosno polje "email" sprejema samo e-mail naslove registriranih uporabnikov.
Vnosno polje "password" sprejema samo gesla registriranih uporabnikov.

Za uspešno prijavo morajo oba polja biti ustrezno izpoljnena. 

### 3. forgotpassword.hbs
Vnosno polje "email" sprejema samo e-mail naslove registriranih uporabnikov in je obvezno polje.

### 4. vehicleprofile.hbs
Na strani "vehicleprofile" je mogoča izposoja prikazanega vozila. 
Za to mora uporabnik biti **NUJNO** prijavljen (uporabnik je prijavljen če je v navbarju prikazana povezava My Profile namesto povazav Register in Login), drugače izposoja ne bo mogoča.
Na strani sta desno obvezna vnosna polja "date-from" in "date-to", ki omogočata izposojo vozila v intervalu ki je določil lastnik vozila. Zraven je tudi obvezno polje za kraj izposoje.
Ob kliku na gumb "book" ter izbiri datuma in lokacije uporabnik nadaljuje s postopkom izposoje.

### publish.hbs
Vnosno polje make lahko sprejema samo znake [Az-Zz], saj znamke avta so sestavljene samo iz črke.
Vnosno polje model lahko sprejma katerikoli niz pomembno je samo da polje ni prazno.
Vnosno polje hp (horespower) sprejema samo številke [0-9] stem da polje ne sme biti prazno.
Vnosno polje maxspeed sprejma samo številke stem da lahko vnašate tudi decimalke.
Vnosno polje acceleration lahko sprejema celi števil ali decimalnih števil stem da lahko decimalna mesta ločite z vejico ali piko. Primer dovoljenih vnosov: (3) (3.3) (3,3)
Za vnosno polje consumption veljajo ista pravila kot za acceleration.
Za vnosno polje doors in seats velja da sprejemata cela števila med 1 in 7.
Vnosno polje price sprejema decimalna stevila med 1 in 5000.
Vnosno polje number sprejema telfonska stevila in specijalen znak na začetku.
Vnosno polje luggage sprejma decimalna stevila ki so vecja od 0.
Vnosno polje address sprejma katerikoli niz, pomembno je le da polje ni prazno.
Vnosno polje city sprejma nize ki sestavljene samo iz crke [a-z] (je case insensitive), lahko tudi obstaja en znam '-' vmes. Primer uporabe: Ljubljana, Monte-Carlo.
Vnosno polje zip lahko sprejema cela stevila.
Za vnosno polje description je pomembno da ni prazno.
Za vnosna polja dates from in dates to je pomembno da dateTo je casovno po dateFrom.

### home.hbs
Vnosno polje city sprejma nize ki sestavljene samo iz crke [a-z] (je case insensitive), lahko tudi obstaja en znam '-' vmes. Primer uporabe: Ljubljana, Monte-Carlo.
Za vnosna polja dates from in dates to je pomembno da dateTo je casovno po dateFrom.

## 3. LP

Dinamična spletna aplikacija s podatkovno bazo

### Namestitev potrebnih datotek za zagon aplikacije v lokalnem okolju

1. Z ukazom v ukazni vrstici`git clone https://github.com/sp-2020-2021/LP-01` se v trenutno mapo namestijo datoteke iz oddaljenega repozitorija.
2. Premaknemo se v mapo `.\LP-01` z ukazom `cd .\LP-01`
3. Izvedemo ukaz `npm install` s čemer se namestijo potrebne vmesnike za zagon aplikacije.

### Zagon aplikacije
- V mapi `.\LP-01` izvedemo ukaz `nodemon` ali `npm start` s čemer strežnik se zažene.
V kolikor bi želeli ustaviti trenutni proces, to naredimo v ukazni vrstici z ukazom `Ctrl + C`.

### Dostop do aplikacije
- Spletna aplikacija je dostopna na vratih 3000, privzeti naslov za dostop je [localhost:3000](localhost:3000).

### Dostop do aplikacije v produkcijskem okolju
- Spletna aplikacija je dostopna na povezavi [Heroku spletna aplikacija](https://rentdrive-sp.herokuapp.com/).

## 4. LP

SPA aplikacija na eni strani


## 5. LP

Varnostno zaščitena progresivna aplikacija
