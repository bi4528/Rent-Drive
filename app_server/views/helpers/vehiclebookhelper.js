const hbs = require('hbs');
hbs.registerHelper('vehiclebookhelper', (date, pickup_locations, dailyprice, phones, email, location, username) => {
    var rezultat ="";

    rezultat+='<li class="list-group-item">' + date + '</li>';

    return rezultat;
});