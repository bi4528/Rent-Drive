# Spletno programiranje 2020/2021

Lastni projekt pri predmetu **Spletno programiranje** v študijskem letu **2020/2021**.

Ideja projekta je porazdeljeni *Rent-a-car* oz. car sharing. Aplikacija omogoča brezplačno registracijo uporabnikom. Vsak uporabnik lahko najame vozilo za izbrani termin in lahko ponudi svoja vozila za najem. Ogled vozil je možen vsem, najem pa le registriranim uporabnikom. Funkcionalnosti, ki jih naša aplikacija ponuja so:
- registracija in prijava
- ogled kataloga vozil
- ogled tujega profila
- filtriranje kataloga
- iskanje vozil
- urejanje profila vozila
- prikaz avtomobilov v bližini
- prikaz vremenske napovedi
- urejanje lastnega profila
- objava/branje recenzij
- najem vozila
- funkcija pozabljenega gesla
- oddaja lastnega vozila v najem
- funkcija všečkanja vozila



## 2. LP - Dinamična spletna aplikacija z logiko na strani strežnika.

### Vnosna polja
### 1. register.hbs
Vnosno polje "firstname" sprejema samo besede (znake [Aa-Zz]). Imena s presledkom kot je "Ana Marija" so tudi dovoljena.\
Vnosno polje "lastname" sprejema samo besede (znake [Aa-Zz]). Priimiki s presledkom kot je "van Basten" so tudi dovoljena.\
Vnosno polje "email" sprejema samo e-mail naslove. Sprejema velike in male alfanumerične znake, Vnosno polje nujno mora imet en znak "@", in znak "." ki mu sledi končnica.\
Vnosno polje "username" sprejema 4-15 velikih in malih alfanumeričnih znakov, presledki niso dovoljeni, prav tako pa "_" ali "." na začetku/koncu.\
Vnosno polje "password" zahteva varna gesla. Zahtevano je: vsaj 6 alfanumeričnih znakov, vsaj ena velika črka, vsaj ena majhna črka in vsaj eden "specialen znak" (npr. število).\
Vnosno polje "repeat-password mora biti kopija polja "password", drugač registracija ne bo uspešna.

Za uspešno registracijo morajo vsa polja biti ustrezno izpoljnena. 

### 2. login.hbs
Vnosno polje "email" sprejema samo e-mail naslove registriranih uporabnikov.
Vnosno polje "password" sprejema samo gesla registriranih uporabnikov.

Za uspešno prijavo morajo oba polja biti ustrezno izpoljnena. 

### 3. forgotpassword.hbs
Vnosno polje "email" sprejema samo e-mail naslove registriranih uporabnikov in je obvezno polje.

### 4. resetpassword.hbs
Vnosno polje "email" je že izpolnjeno in je onemogočen vpis (saj do te strani dostopa uporabnik preko povezave z e-mail naslova).\
Vnosno polje "password" zahteva varna gesla. Zahtevano je: vsaj 6 alfanumeričnih znakov, vsaj ena velika črka, vsaj ena majhna črka in vsaj eden "specialen znak" (npr. število).\
Vnosno polje "password_repeated mora biti kopija polja "password", drugač registracija ne bo uspešna.

### 5. vehicleprofile.hbs
Na strani "vehicleprofile" je mogoča izposoja prikazanega vozila. \
Za to mora uporabnik biti **NUJNO** prijavljen (uporabnik je prijavljen če je v navbarju prikazana povezava My Profile namesto povazav Register in Login), drugače izposoja ne bo mogoča.\
Na strani sta desno obvezna vnosna polja "date-from" in "date-to", ki omogočata izposojo vozila v intervalu ki je določil lastnik vozila. Zraven je tudi obvezno polje za kraj izposoje. \
Ob kliku na gumb "book" ter izbiri datuma in lokacije uporabnik nadaljuje s postopkom izposoje. 

### 6. editvehicleprofile.hbs
Vnosno polje make lahko sprejema samo znake [Az-Zz], saj avtomobilske znamke imajo samo črke. \
Vnosno polje model lahko sprejema katerikoli niz razen praznega. \
Vnosno polje hp (horsepower) sprejema samo številke [0-9], pri tem polje ne sme biti prazno. \
Vnosno polje maxspeed sprejema samo številke, ki so lahko tudi decimalne. \
Vnosno polje acceleration lahko sprejema cela števila ali decimalna števila (decimalna mesta ločite z vejico ali piko). Primer dovoljenih vnosov: (3) (3.3) (3,3) \
Za vnosno polje consumption veljajo ista pravila kot za acceleration. \
Za vnosna polja doors in seats velja da sprejemata cela števila med 1 in 7. \
Vnosno polje price sprejema decimalna števila med 1 in 5000. \
Vnosno polje luggage sprejma decimalna števila ki so večja od 0. \
Vnosno polje address sprejma katerikoli niz, pomembno je le da polje ni prazno. \
Vnosno polje city sprejema nize ki so sestavljene samo iz črk [a-z] (je case insensitive), lahko celo tudi obstaja en znak '-' vmes. Primer uporabe: Ljubljana, Monte-Carlo. \
Vnosno polje zip sprejema cela števila. \
Za vnosno polje description je pomembno da ni prazno. \
Za vnosna polja dates-from in date-to je pomembno da datefrom je časovno po dateFrom.

### 7. publish.hbs
Vnosno polje make lahko sprejema samo znake [Az-Zz], saj avtomobilske znamke imajo samo črke. \
Vnosno polje model lahko sprejema katerikoli niz razen praznega. \
Vnosno polje hp (horsepower) sprejema samo številke [0-9], pri tem polje ne sme biti prazno.
Vnosno polje maxspeed sprejema samo številke, ki so lahko tudi decimalne. \
Vnosno polje acceleration lahko sprejema cela števila ali decimalna števila (decimalna mesta ločite z vejico ali piko). Primer dovoljenih vnosov: (3) (3.3) (3,3) \
Za vnosno polje consumption veljajo ista pravila kot za acceleration. \
Za vnosna polja doors in seats velja da sprejemata cela števila med 1 in 7. \
Vnosno polje price sprejema decimalna stevila med 1 in 5000. \
Vnosno polje number sprejema telfonska stevila in specijalen znak na začetku. \
Vnosno polje luggage sprejma decimalna stevila ki so vecja od 0. \
Vnosno polje address sprejma katerikoli niz, pomembno je le da polje ni prazno. \
Vnosno polje city sprejema nize ki so sestavljene samo iz črk [a-z] (je case insensitive), lahko celo tudi obstaja en znak '-' vmes. Primer uporabe: Ljubljana, Monte-Carlo. \
Vnosno polje zip sprejema cela števila. \
Za vnosno polje description je pomembno da ni prazno. \
Za vnosna polja dates-from in date-to je pomembno da datefrom je časovno po dateFrom.

### 8. home.hbs
Vnosno polje city sprejema nize ki so sestavljene samo iz črk [a-z] (je case insensitive), lahko tudi obstaja en znak '-' vmes. Primer uporabe: Ljubljana, Monte-Carlo. \
Za vnosna polja dates from in dates to je pomembno da dateTo je časovno po dateFrom.

### Seznam dovoljenih naprav
Naša aplikacija je bila testirana in pravilno dela na kateremkoli računalniku, prenosniku, iPadu, iPhone X in vseh ostalih napravah.

### Handlebars helper funkcije
Znotraj mape /app_server/views/helpers imamo shranjene 6 handlebars helper procedur, ki pomagaju pri marsikakšnih detaljih (izpis zvezdic, lastnosti vozil, seznama avta itd.)

### Seznam podprtih brskalnikov
Naša aplikacija je bila testirana in pravilno dela na: Google Chrome, Microsoft Edge, Mozila Firefox, Brave.

### Dodatna knjižnica: Nodemailer
Nodemailer smo uporabili za pošiljanje mailov iz strežnika. Rabimo ga za dve akciji:
1)Z uporabo knjižnice pošljemo mail za reset passworda.
Ta se pošlje, ko uporabnik na strani forgotpassword.hbs vpiše mail v zaželeno polje in klikne na gumb 'RECOVER PASSWORD'
Za uspešno delovanje smo najprej ustvarili transporter. Izkoristili smo gmail za to. Ustavrili smo nov mail.
Mail je 'skupina01.sp@gmail.com'. Geslo je 'lavbicsp'.
Se pravi navedeni naslov pošlje mail naslovu, ki ga je podal uporabnik.
Zadeva (v angl. Subject) je 'Recover Password - Rent&Drive'.
Poslano besedilo je 'Click on http://localhost:3000/users/:podaniMail/resetpassword or https://rentdrive-sp.herokuapp.com/users/:podaniMail/resetpassword'.
S klikom eden izmed linkov se odpre stran resetpassword.hbs, kjer lahko uporabnik resetira pozabljeno geslo.
2)Z uporabo knjižnice pošljemo mail za confirm booking.
Ta se pošlje, ko uporabnik na strani book.hbs klikne na gumb confirm.
Za uspešno delovanje smo najprej ustvarili transporter.
Se pravi navedeni naslov ('skupina01.sp@gmail.com') pošlje mail naslovu, ki ga je prijavljen.
Zadeva (v angl. Subject) je 'Confirm booking - Rent&Drive'.
Poslano besedilo je 'Thank you for choosing Rent&Drive. Rentan avto: https://rentdrive-sp.herokuapp.com/vehicles/:idVehicle. You can login by clicking https://rentdrive-sp.herokuapp.com/users/login'.
S klikom na prvi link se odpre stran avta. S klikom na drugi link se odpre stran Login.
### Dodatna knjižnica: Multer
Ena zunanja knjižnica ki jo uporabljamo je multer. V glavnem ta se uporablja na publish.hbs, editvehicleprofile.hbs, editprofile.hbs kjer lahko uporabnik ima opcijo da naloži eno sliko, to je le pri editprofile.hbs ali več slik pri publish.hbs in editvehicleprofile.hbs. Podprta je torej možnost nalaganja več slik avta uporabnika ki se potem prikažejo na vehicleprofile.hbs

## 3. LP - Dinamična spletna aplikacija s podatkovno bazo

### Namestitev potrebnih datotek za zagon aplikacije v lokalnem okolju

1. Z ukazom v ukazni vrstici` git clone https://github.com/sp-2020-2021/LP-01` se v trenutno mapo namestijo datoteke iz oddaljenega repozitorija.
2. Premaknemo se v mapo ` .\LP-01` z ukazom `cd .\LP-01`
3. Izvedemo ukaz ` npm install` s čemer se namestijo potrebne vmesnike za zagon aplikacije.
4. Izvedemo ukaz ` docker-compose up --no-start `
5. Izvedemo ukaz ` docker start sp-rentdrive-mongodb `  
6. Izvedemo ukaz da se povežemo na vsebnik `docker exec -it sp-rentdrive-mongodb mongo`, in nato izklopimo mongo ukazno vrstico s kombinacijo `Ctrl + C`

### Zagon aplikacije
- V mapi `.\LP-01` izvedemo ukaz `nodemon` ali `npm start` s čemer strežnik se zažene.
V kolikor bi želeli ustaviti trenutni proces, to naredimo v ukazni vrstici z ukazom `Ctrl + C`.

### Dostop do aplikacije
- Spletna aplikacija je dostopna na vratih 3000, privzeti naslov za dostop je [localhost:3000](localhost:3000).

### Generiranje podatkov
- Odpremo spletno stran [localhost:3000/db](localhost:3000/db) in kliknemo na gumb "Add sample data".

Podatki o avtih in komentarjih so dostopni na naslovu [localhost:3000/api/vehicles](localhost:3000/api/vehicles)
Podatki o uporabnikih so dostopni na naslovu [localhost:3000/api/users](localhost:3000/api/users)
Podatki o izposojenih avtih so dostopni na naslovu [localhost:3000/api/rented](localhost:3000/api/rented)

### Brisanje podatkov
- Odpremo spletno stran [localhost:3000/db](localhost:3000/db) in kliknemo na gumb "Delete all data".

### Dostop do aplikacije v produkcijskem okolju
- Spletna aplikacija je dostopna na povezavi [Heroku spletna aplikacija](https://rentdrive-sp.herokuapp.com/).

### Navodila za uporabo
- Preden uporabite aplikacijo predlagamo, da si z gumbom register, ki se nahaja v navbar ustvarite svoj uporabniški račun. Po uspešni registraciji se bojo prikazali novi gumbi v navbar in sicer to Profile in List your car. 

## 4. LP - SPA aplikacija na eni strani

### Namestitev potrebnih datotek za zagon, in zagon aplikacije v lokalnem okolju

1. Z ukazom v ukazni vrstici` git clone https://github.com/sp-2020-2021/LP-01` se v trenutno mapo namestijo datoteke iz oddaljenega repozitorija.
2. Premaknemo se v mapo ` .\LP-01` z ukazom `cd .\LP-01`
3. Izvedemo ukaz ` npm install` s čemer se namestijo potrebne vmesnike za zagon aplikacije.
4. Izvedemo ukaz ` docker-compose up --no-start `
5. Izvedemo ukaz ` docker start sp-rentdrive-mongodb `  
6. Izvedemo ukaz da se povežemo na vsebnik `docker exec -it sp-rentdrive-mongodb mongo`, in nato izklopimo mongo ukazno vrstico s kombinacijo `Ctrl + C`
7. Izvedemo ukaz ` nodemon ` da zaženemo strežnik.
8. Odpremo nov terminal
9. Premaknemo se v mapo ` .\app_public` z ukazom `cd .\app_public`
10. Izvedemo ukaz ` npm install` s čemer se namestijo potrebne vmesnike za zagon aplikacije.
11. Izvedemo ukaz ` ng serve --open` s čemer angular nam postreže našo aplikacijo.

### Prikaz zemljevida
- Za prikaz zemljevida uporabljena je knjžnica [@asymmetrik/ngx-leaflet](https://github.com/Asymmetrik/ngx-leaflet)
    
### Povezava do oddaljene spletne aplikacije

- http://rentdrive-sp.herokuapp.com/
    
## 5. LP - Varnostno zaščitena progresivna aplikacija

### Avtentikacija in avtorizacija z MEAN (JWT)

Naša aplikacija podpira tri tipe uporabnikov. Če je trenutno prijavljeni uporabnik navaden, potem on lahko spreminja oz. dodaja samo podatke, ki jih je on dodal sam. Takšni podatki so: avti, osebni podatki, komentarji, najemi. Če pa je trenuten uporabnik administrator, potem on lahko spreminja vse (če se mu zdi to smiselno). Takrat so mu vsi gumbi za brisanje in spreminjanje podatkov dostopni in vidni. Obstajajo še gostje, to so uporabniki, ki niso ustvarili svojega računa in si lahko ogledajo avte, profile, berejo komentarje oz. imajo samo bralni dostop. Uporabnik je administrator. če se registrira z ADMIN_PASSWORD. V sklopu uporabnikov smo implementirali še reset gesla z mailom. Na mail se pošlje nek url, ki vsebuje token za reset gesla. Brez tokena uporabnik ne more resetirati gesla. Ne registriran uporabnik nima pravice za določene requeste (npr. delete user za nek drugi uporabnik).

### Varnostni pregled
Delovanje naše aplikacije smo preverili z orodjem [OWASP ZAP](https://owasp.org/www-project-zap/). 
- Najprej generiramo docker verzije Angular aplikacije.`ng build --configuration=docker --output-path build`
- Odstranimo morebitno predhodno postavitev Docker vsebnikov `docker-compose down`.
- Zahtevamo ponovno generiranje slike naše aplikacije in poženemo z ukazom `docker-compose up --build --detach`
- Naredimo novega admina z registracijo z geslom *ADMIN_PASSWORD* iz datoteke `.env`.
- V brskalniku gremo na povezavo [http://localhost:3000/db](http://localhost:3000/db) in z klikom na gumb *Delete smaple data* pobrišemo moribitne podatke in z potem s klikom na gum *Add smaple data* dodamo vzorčne podatke v bazo.
- V orodje [OWASP ZAP](https://owasp.org/www-project-zap/) uvezemo datoteko s strani [http://localhost:3000/api/swagger.json](http://localhost:3000/api/swagger.json) in seznam najpomembnejših povezav dostopen v datoteki `test/security/povezave.txt`, ampak za ponoven zagon je potrebno spremeniti id-je v povezavah, saj so odvisni od podatkovne baze.

- Delovanje smo preverili preko uvoza omejene swagger.json datoteke, z ročnim preiskovanjem na povezavi [http://localhost:3000](http://localhost:3000), pregledom *Spider* in *Ajax Spider* in izvedbo napada *Attack*. Izdelali smo začetno poročilo z vranostnimi tveganji dostopno v datoteki `test/security/rentdrive-report-prej.html`. Vsa varnostna tveganja smo odpravili in naredili novo poročilo v datoteki `test/security/rentdrive-report-potem.html`.

### Progresivna spletna aplikacija

S pomočjo orodja Lighthouse smo nadgradili našo aplikacijo. Obstoječe slike so kompresirane, uporabljena je knjižnica za kompresijo kode in besedišča. Spremenjena je barva navigacijskeg menija zaradi boljše dostopnosti. Produkcijska verzija je skladna z načeli progresivne spletne aplikacije, http preusmerja na https, aplikacija opozori na stanje brez povezave in ustrezno takrat onemogoči določene funkcionalnosti, dodan je ServiceWorker. Dodani so tudi async in defer atributi za določene zunanje skripte in povezave, kar je nekoliko pospešilo prvotno nalaganje strani.

Dodani so metapodatki "viewport" in "description" v osnovno html datoteko, kar je zvišalo SEO oceno.

Možno je pohitriti tudi nameščanje zunanjih css datotek z uporabo preloada, zavedamo se da bi lahko najprej naložili kritične css komponente in šele nato naredili load nekritičnih css stilov, vendar to zaenkrat nismo implementirali.

Zavedali smo se, da bi compresija slik (uploads) na strani apija zmanjšala velikosti slik in posledično izboljšala uporabniško izkušnjo. Tega nismo implementirali.

Trenutno stanje je takšno da so ocene dostopnosti, SEO, najboljših praks zelo visoke, zmeraj nad 90%, pogostokrat pa so ocenjene s kar 100%.
Performanse se pa gibljejo okrog solidnih 75%.

Test za mobilni način uporabe svetuje proti serviranju slik z nizko ločlivostjo, vendar mislimo da v tem primeru to ne predstavlja problem, ker "slika" gre za ikonico ki se prikaže pri minimiziranju navigacijske vrstice (štiri črtice). 

PWA test včasih javi "napako"
```
start_url does not respond with a 200 when offline The start_url did respond, but not via a service worker
```
ki je prisotna na Google Chrome brskalniku, dočim ni prisotna na Brave in Firefoxu brskalniku.

Prav tako se zavedamo da pri SEO delu Lighthouse test na produkcijski verziji javi napako "robots.txt". Napaka se lahko odpravi z dodajanjem
```
app.all('/robots.txt', (req, res) => {
  res.type('text/plain')
  res.send("User-agent: *\Allow: /");
});
```
v datoteko app.js, vendar ta sprememba ustvari varnostno luknjo (rumeno opozorilo pri OWASP ZAP testu) tako da smo se odločili izpustiti omenjeni del kode. 
