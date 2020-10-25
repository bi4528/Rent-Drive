# Spletno programiranje 2020/2021

Lastni projekt pri predmetu **Spletno programiranje** v študijskem letu **2020/2021**.

## 1. LP - Osnutek aplikacije in wireframe model

Ideja projekta je porazdeljeni *Rent-a-car*. Kdorkoli se lahko v aplikacijo brezplačno registrira. Vsak uporabnik lahko najame vozilo za izbrani termin in lahko nudi svoja vozila za najem. Ogled vozil je možen vsem, najem pa le registriranim uporabnikom.

Vse strani vsebujejo footer, navbar pa vsebujejo vse strani razen register.html, login.html, forgotpassword.html in resetpassword.html.

Navbar se razlikuje, če je uporabnik prijavljen ali ne. Če uporabnik ni prijavljen, navbar vsebuje gumbe Home, Nearby, Add your vehicle, Register, Login, Search.
Če pa uporabnik je prijavljen navbar vsebuje gumbe **Home**, **Nearby**, **Add your vehicle**, **Profile**, **Search**. Za 1.LP bomo prikazali strani, kot da je uporabnik prijavljen v sistem.

Navbar in footer ves čas omogočajo uporabnikom prehod na prej naštete strani **Home**, **Nearby**, **Add your vehicle**, **Profile**, **Search**.

Strani so sledeče:

## [home.html](home.html): 
Home.html je glavna stran aplikacije. Uporabnik lahko poišče aute za najem. Uporabnik filtrira aute s pomočjo kraja (npr. Ljubljana), datuma ter s klikom na zaželeno kategorijo auta. Kategorije so Hatchback, Saloon, Caravan, Coupe, SUV in Pick-up. Auti so prikazani v spodnji polovici strani z uporabo
carousel strukture. Uporabnik z klikom na puščice se premika levo in desno. Po določenem času bo se animacija automatsko zagnala in prikazala aute na naslednji (desni) strani. S klikom na izbrani auto se prikaže nova stran s podatki tega (Master/detail).

## [nearby.html](nearby.html):
Nearby.html omogoča uporabniku ogled autov, ki so v bližini z uporabo mape. Na strani je tudi prikazan promet za izbrano okolico v mapo. Z klikom na zaželeni auto se odpre profil tega auta. Ta funkcionalnost bo implementirana v prihodnjih fazah projekta - gre za našo izbiro API-ja projekta.

## [publish.html](publish.html):
Publish.html omogoča uporabniku vnos svojega auta za najem. Uporabnik lahko vnese sliko, podatke o avtomobilu, lokacijo najema, dodatne informacije za avto (npr. pravila), izbere featurje avta in določi ceno.

S klikom na gumb "Submit" uporabnik shrani podatke ter objavi avto na spletni strani.

## [profile.html](profile.html):
Profile.html je stran, ki prikaže informacije o uporabniku in njegovih vozilih. Prikazane informacije uporabnika so ime, priimek, lokacija, mail, telefon in slika. Vsak prikazan auto na strani je možno urediti s klikom na gumb **Edit** in odstraniti s klikom na gumb Remove.
Uporabnik lahko spremeni podetke s klikom na **Edit** in lahko zaključi sejo s klikom na gumb Log out. Klikom na avtomobil se odpre vehicleprofile.html s podatki o avtomobilu.

## [edit_profile.html](edit_profile.html):
Edit_profile.html je stran, ki je dostopna le obstoječim uporabnikom. Omogoča jim spremembo osebnih podatkov (imena, priimka, e-mail naslova, telefonske številke in kraja). Uporabnik lahko tudi spremeni svoj trenutni avatar, s klikom na gumb **Choose image** lahko naloži novo sliko ki bo uporabljena kot njegov avatar. Svoje spremembe uporabnik potrdi klikom na gumb **Save**, ki ga pripelje nazaj na lastni profil na [profile.html](profile.html).

## [search.html](search.html):
Search.html je stran ki omogoča iskanje avtomobilov in uporabnikov. S klikom na avtomobil se odpre [vehicleprofile.html](vehicleprofile.html), ki vsebuje podatke o avtomobilu. S klikom na uporabnika se odpre [tuji_profile.html](tuji_profile.html) s podatki o uporabniku.

## [vehicleprofile.html](vehicleprofile.html):
Vehicleprofile.html je stran ki prikazuje razne podatke o vozilu ki je za najem. Tukaj je: zaporedje fotografij v "carousel-u", kratek opis vozila, seznam ključnih lastnosti (klima, pogon, maksimalna hitrost, navigacija, bluetooth podpora itd.). 

Prikazan je tudi profil najemnika in njegove osnovne informacije (telefonska številka, e-mail naslov in kraj). Izpolnjevanjem polja za vnos datuma, ure in lokacije ter klikom na gumb **Book** uporabnik pride korak bližje najemu, na stran [book.html](book.html). 

Poleg tega, stran vsebuje možnost všečkanja (čist zgoraj poleg imena), povprečno oceno (takoj za tem) in recenzije na koncu strani. Vsaka recenzija vsebuje avatar avtorja, njegovo oceno od 1 do 5 in kratek komentar.

## [editvehicleprofile.html](editvehicleprofile.html):
Editvehicleprofile.html je stran ki je dostopna samo lastnikom vozil (osebe ki imajo tako uporabniški račun kot avto dano v najem). Uporabnikom je omogočeno ažuriranje podatkov vozila in sicer lahko spremenijo: naložene fotografije vozila, njegovo ime, opis, razne lastnosti, dostopni period najema, mogoče lokacije prevzema vozila, ceno najema. Le-te spremembe uporabniki uveljavijo s klikom na gumb, ki jih pripelje nazaj na [profil vozila](vehicleprofile.html).

## [book.html](book.html):
Book.html je stran čigav namen je izpis podrobnosti najema vozila. Nudi bodisi preklic, bodisi potrditev najema. Še enkrat so prikazane izbrane podrobnosti prevzema (lokacija in čas) , opis najemnika in lastnega profila (e-mail naslov, ime, priimek, kraj).

## [register.html](register.html):
Register.html je stran preko katere uporabnik ustvari uporabniški račun. Stran zahteva e-mail naslov, geslo, ime in priimek. Ponuja tudi prehod nazaj na [homepage](home.html) in [login stran](login.html).

## [login.html](login.html):
Login.html je stran preko katere se uporabnik prijavi na spletno stran. Stran zahteva e-mail naslov in geslo, ime in priimek. Ponuja tudi opcijo **remember me** ter vrnitev na [homepage](home.html).

## [forgotpassword.html](forgotpassword.html):
Forgotpassword.html je stran dostopna samo uporabnikom. Omogoča opcijo resetiranja gesla, uporabnik vpiše svoj e-mail naslov, in po kratkem času dobi sporočilo z navodili kako nastaviti novo geslo. Nudi tudi opcijo prehoda na [homepage](home.html) in [login stran](login.html).

## [reset-password.html](reset-password.html):
Reset-password.html je stran do katere se lahko pride zgolj preko prejetega e-mail sporočila (generiran na strani [forgotpassword.html](forgotpassword.html)). Tukaj uporabnik upiše svoje novo geslo, ga ponovi in na koncu potrdi. Mogoč je tudi prehod na [homepage](home.html) in [login stran](login.html).


## Razlike brskalnikov:
*TODO*

## 2. LP

Dinamična spletna aplikacija z logiko na strani strežnika


## 3. LP

Dinamična spletna aplikacija s podatkovno bazo


## 4. LP

SPA aplikacija na eni strani


## 5. LP

Varnostno zaščitena progresivna aplikacija
