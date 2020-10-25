# Spletno programiranje 2020/2021

Lastni projekt pri predmetu **Spletno programiranje** v študijskem letu **2020/2021**.


## 1. LP

Ideja projekta je Rent-a-car. Kdorkoli se lahko v aplikacijo brezplačno registrira. Vsak uporabnik lahko najame vozilo za izbrani termin in lahko nudi svoja vozila za najem.
Vse strani (razen register.html, login.html in forgotpassword.html) vsebujejo navbar in footer.
Navbar se razlikue, če je uporabnik prijavljen ali ne. Če uporabnik ni prijavljen, navbar vsebuje gumbe Home, Nearby, Add your vehicle, Register, Login, Search. Če uporabnik je prijavljen 
navbar vsebuje gumbe Home, Nearby, Add your vehicle, Profile, Search. Za 1.LP bomo prikazali strani, kot da je uporabnik prijavljen v sistem.
Strani so sledeče:

-home.html: je glavna stran aplikacije. Uporabnik lahko poišče aute za najem. Uporabnik filtrira aute z mesta (Npr. Ljubljana), datuma in z klikom na zaželeno kategorijo auta. Kategorije so Hatchback, Saloon, Caravan, Coupe, SUV in Pick-up. Auti so prikazani v spodnji polovici strani z uporabo
carousel strukture. Uporabnik z klikom na puščice se premika levo in desno. Po določenem času bo se animacija automatsko zagnala in prikazala aute na naslednji (desni) strani.

-nearby.html: omogoča uporabnik ogled autov, ki so v bljižini z uporabo mape. Na strani je tudi prikazan promet za izbrano okolico v mapo. Z klikom na zaželeni auto se odpre profil tega auta.

-publish.html: omogoča uporabnik vnos svojega auta za najem. Uporabnik lahko vnese sliko, podatke o avtomobilu, lokacijo najema, dodatne informacije za avto (Npr. pravila) izbere featurje avta in določi ceno.
S klikom na gumb Submit uporabnik shrani podatke.

-profile.html: je stran, ki prikaže informacije o uporabnik in svoja vozila. Prikane informacije uporabnika so ime, priimek, lokacija, mail, telefon in slika. Vsak prikazan auto na strani je možno urediti s klikom na gumb Edit in odstraniti s klikom na gumb Remove.
Uporabnik lahko spremeni podetke s klikom na Edit in lahko zaključi sejo s klikom na gumb Log out. Sklikom na avtomobil se odpre vehicleprofile.html s podatki o avtomobilu.

-search.html: omogoča iskanje avtomobilov in uporabnikov. S klikom na avtomovil se odpre vehicleprofile.html, ki vsebuje podatke o avtomobilu. S klikom na uporabnika se odpre tuji_profile.html s podatki o uporabniku.
## 2. LP

Dinamična spletna aplikacija z logiko na strani strežnika


## 3. LP

Dinamična spletna aplikacija s podatkovno bazo


## 4. LP

SPA aplikacija na eni strani


## 5. LP

Varnostno zaščitena progresivna aplikacija