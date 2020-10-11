# Spletno programiranje 2020/2021

Dokumentacija lastnega projekta pri predmetu **Spletno programiranje** v študijskem letu **2020/2021**.

Navodila:
V repozitoriju ustvarite mapo z imenom docs, kamor boste shranili rezultate 1. LP. Za vsak pogled, ki ga boste izdelali v okviru lastnega projekta, morate pripraviti po eno zaslonsko masko, ki jo shranite v obliki ločene HTML datoteke. Zaslonske maske pripravite za vsaj 3 različne tipe naprav (npr. namizni računalnik, tablico oz. mobilni telefon v ležečem načinu in mobilni telefon v pokončnem načinu). Pri opredelitvi uporabniškega vmesnika si pomagajte z Bootstrap gradniki, kar je bilo predstavljeno na predavanju P1.1, ki je na voljo v poglavju 1. Pri tem upoštevajte, da v skladu z vašim projektom izdelate zaslonske maske vsaj sledečih tipov:
prijava/registracija uporabnika,
dodajanje elementa,
izpis seznama elementov in master/detail vzorec,
brisanje elementa,
pregled in urejanje elementa,
iskanje,
integracija aplikacije z zunanjim virom (lahko nadgradite eno izmed obstoječih zaslonskih mask).
V korenski mapi repozitorija v datoteki README.md na kratko opišite vašo aplikacijo (glejte primere opisov projektov v poglavju 3.7 in v dokument vključite povezave na zaslonske maske. Zaslonske maske vaše aplikacij predstavite s statičnimi HTML stranmi. Na HTML strani (npr. spletni obrazci, seznam vrednosti v tabeli iptd.) podatke vključite kot vnaprej definirane42 in se naj ne spreminjajo dinamično, saj boste to funkcionalnost dopolnili v naslednjih korakih izdelave aplikacije. Kjer je predvideno dinamično spreminjanje vsebine, le-to na strani ustrezno označite, kar boste implementirali kasneje. Za vsako zaslonsko masko je potrebno opisati njene funkcionalnosti.


Alternativne ideje: 
Rent-a-car (spremljanje vozil prek Mapsa, katalog vozil za izposojo, klik na vozilo pokaže podrobnosti, sortiranje vozil po letniku/ceni/itd., uporabnik lahko stranka ali admin, dodajanje novih vozil, brisanje vozil), Avtošola, Ski dnevnik (weather api, uporabniki lahko učitelji ali učenci)


Ideje za ime: Avtofil, Avto-entuziast, Autorgolio, Autus, Cars & Drivers, Only Cars, Car World, HypeDrivers, Auto addicts, Highway, CarNet, CarWay, Petrolicious, Diesel Drink, Broom Broom, Carma

API-ji:
https://api.auto-data.net/ - sijajna zbirka tehničnih podatkov o avtih, vendar plačljiva :c
https://www.carmd.com/car-image-api/ - slike avtomobilov, vendar prek 25 poizvedb postane tudi plačljiv
https://github.com/zejn/prometapi - slovenski API ki vleče kar nekaj podatkov s promet.si (kamere, števci prometa, burja, parkirišča, dogodki na cestah, BicikeLJ)
https://edmundsapi-preprod.github.io/api-documentation/vehicle/ - tehnični podatki, ne dela?
https://vpic.nhtsa.dot.gov/api/ - tehnični podatki
Google Maps oz. Google Places - če prav razumem lahko prikažemo zanimive točke v bližini (atribut type = car_dealer, car_rental, car_repair, car_wash, park, parking, rv_park), verjetno najboljša opcija

funkcionalnosti CarMeets aplikacije - klubi/skupine, pregled lastnih vozil in dodatkov, dvojezičnost, google translate postov

feed glavna stran (Home) - pregled slik, pregled objav, like opcija, komentar opcija, dodaj/briši/uredi objavo, iskanje objave (kronološko, po lajkih, po osebah)  - Marko

maps (Nearby) - avtopralnice, vulkanizerji, avto-servis,bencinske črpalke, avto-kozmetika. electric charges.  Google Maps API, opcija spremljanja lokacije prijateljev - Bojan

Buttons for nearby:
service station
gas station
car-shops
registration
meet-ups
-----ko klikneš event - opis, slike, tip eventa, kdo se je ali se bo udeležil

stran za registracijo (Registration) - uporabnik, geslo, ponovi geslo, sign-up - Nino

stran za prijava- Become a member (Log In) - uporabnik + geslo (podatkovna baza hrani uporabnike), sign-up - Nino

koledar (Calendar) - sam koledar?, poseben div prihajajoči dogodki, dodaj dogodek(popup/modal), knjižnice import pa roka, - Nino

profil lastnik - ime, priimek, vzdevek, najljubše avto, avti v lasti, preference, teme ki jim sledi uporabnik, slike, log out, delete profile - Matej

profil ne lastnik/prijatelj - ime, priimek, vzdevek, najljubše avto, avti v lasti, preference, teme ki jim sledi uporabnik, slike, follow, unfollow - Matej
deals + shop (Shop) - razni popusti ter merchandise - Bojan

informativna stran o podjetju (About us) - osnovni podatki o nam, fake naslov, fake telefonska številka, copyright itd. - Matej

Opis projekta: TODO
