const e = require('express');
var fs = require('fs');
var url = require('url');
var http = require("http");

var appiParams = {
    server: 'http://localhost:' + (process.env.PORT || 3000)
};
if (process.env.NODE_ENV === 'production') {
    appiParams.server = 'https://rentdrive-sp.herokuapp.com/';
}
const axios = require('axios').create({
    baseURL: appiParams.server,
    timeout: 5000
});

//var dataJSON = require('../models/avti-seznam.json');
var locationJSON = require('../models/avti-seznam-cords.json');

function isEmpty(str) {
    return (!str || 0 === str.length);
}

/* GET home page */
const home = (req, res) => {
    axios
        .get('/api/vehicles')
        .then((odgovor) => {
            let sporocilo = odgovor.data.length ? null : "No cars found.";
            showVehiclesHome(req, res, odgovor.data, sporocilo);
        })
        .catch(() => {
            showVehiclesHome(req, res, [], "Mistake on API side when searching.");
        });
};

const showVehiclesHome = (req, res, data, sporocilo) => {
    res.render('home', {
        
        "title": "Seznam avtomobilov",
        "cars": data,
        "error": sporocilo
    });
};

const search = (req, res) => {
    let dataJson;
    axios
        .get('/api/vehicles', {
            params: {
                value: req.query.value,
                city: req.query.city,
                dateFrom: req.query.dateFrom,
                dateTo: req.query.dateTo,
                category: req.query.category,
            }
        })
        .then((odgovor) => {
            let sporocilo = odgovor.data.length ? null : "No cars found.";
            showVehiclesSearch(req, res, odgovor.data, sporocilo);
        })
        .catch(() => {
            showVehiclesSearch(req, res, [], "Mistake on API side when searching.");
        });

    /*
    const keyWord = req.query.value;
    const city = req.query.city;
    const dateFrom = req.query.dateFrom;
    const dateTo = req.query.dateTo;
    const category = req.query.category;

    console.log(city + " " + dateFrom + " " + dateTo);

    if (isEmpty(keyWord) && isEmpty(city) && isEmpty(category)) {
        dataJSON.filter = "<H3>No filter applied</H3>";
        res.render('search', dataJSON);
    }
    else if (!isEmpty(keyWord)) {
        newData = {
            "title": "Seznam avtomobilov",
            "filter": "<H3>Filtered by keyword: \"" + keyWord + "\"</H3>",
            "cars": []
        }

        dataJSON.cars.forEach(function (item, index) {
            if (item.model.toLowerCase().includes(keyWord.toLowerCase()) || item.make.toLowerCase().includes(keyWord.toLowerCase())) {
                newData.cars.push(item);
            }
        });

        res.render('search', newData);

    }
    else if (!isEmpty(city)) {
        newData = {
            "title": "Seznam avtomobilov",
            "filter": "<H3>Filtered by city of pick-up: \"" + city + "\", date from: \"" + dateFrom + "\" and date to: \"" + dateTo + "\"</H3>",
            "cars": []
        }
        dataJSON.cars.forEach(function (item, index) {
            //console.log(typeof(item.date[0])+" "+typeof(dateFrom));
            //console.log(item.date[0]+" "+dateFrom);
            if (item.city.localeCompare(city) == 0 && isLater(dateFrom, item.date[0]) && isLater(item.date[1], dateTo)) {
                newData.cars.push(item);
            }
        });
        res.render('search', newData);
    }
    else if (!isEmpty(category)) {
        newData = {
            "title": "Seznam avtomobilov",
            "filter": "<H3>Filtered by category: \"" + category.toLowerCase() + "\"</H3>",
            "cars": []
        }
        dataJSON.cars.forEach(function (item, index) {
            //console.log(typeof(item.date[0])+" "+typeof(dateFrom));
            //console.log(item.date[0]+" "+dateFrom);
            if (item.category.localeCompare(category) == 0) {
                newData.cars.push(item);
            }
        });
        res.render('search', newData);
    }
    */
};

const showVehiclesSearch = (req, res, data, sporocilo) => {
    const keyWord = req.query.value;
    const city = req.query.city;
    const dateFrom = req.query.dateFrom;
    const dateTo = req.query.dateTo;
    const category = req.query.category;
    filter="";
    if (!isEmpty(keyWord)) {
        filter = "<H3>Filtered by keyword: \"" + keyWord + "\"</H3>";
    }
    else if (!isEmpty(keyWord)) {
        filter = "<H3>Filtered by keyword: \"" + keyWord + "\"</H3>";
    }
    else if (!isEmpty(city)) {
        filter = "<H3>Filtered by city of pick-up: \"" + city + "\", date from: \"" + dateFrom + "\" and date to: \"" + dateTo + "\"</H3>";
    } else if (!isEmpty(category)) {
        filter = "<H3>Filtered by category: \"" + category.toLowerCase() + "\"</H3>";
    }

    res.render('search', {
        "title": "Seznam avtomobilov",
        "filter": filter,
        "cars": data,
        "error": sporocilo
    });
};

const nearby = (req, res) => {

    var razcleni = url.parse(req.url, true);

    //console.log(razcleni);
    var spec = ""
    if (razcleni.search != null) {

        var srch = razcleni.search.split("&");
        spec = srch[0];
    }

    //console.log("Specifikacija: "+spec);

    switch (spec) {
        case "?weather":

            const requestUrl = 'http://api.weatherstack.com/current?access_key=f61e126b021aa0d360b427c69a9e4c27&query=Ljubljana';
            http.get(url.format(requestUrl), (resp) => {
                let data = '';
                resp.on('data', (chunk) => {
                    //console.log("GET chunk: " + chunk);
                    data += chunk;
                });

                // The whole response has been received. Print out the result.
                resp.on('end', () => {
                    console.log("GET end of response: " + data);
                    res.header("Content-Type", 'application/json');
                    res.send(data);
                });

            }).on("error", (err) => {
                console.log("GET Error: " + err);
            });
            break;
        case "?markeri":
            //var locationJSON = require('../models/vehicles-test.json');
            //console.log("markeri");
            axios
                .get('/api/vehicles')
                .then((odgovor) => {
                    //console.log("axios");
                    let sporocilo = odgovor.data.length ? null : "No cars found.";

                    try {
                        var data = JSON.stringify(odgovor.data);

                        //ima newline characters in data, json format nije dobar zbog toga
                        data = data.replace(/[\r\n]+/g, " ");
                        //console.log("odgovor: " + JSON.stringify(data));

                        var cars = JSON.parse(data);


                        //console.log(cars);
                        jsonObj = [];
                        const basic_url = 'http://open.mapquestapi.com/geocoding/v1/address?key=7VWv1A4oIlOF80mOVTkI0LHdiJr8V5EP';
                        //vzmemo iz carsa tisto, kar potrebujemo za markerje
                        odgovor.data.forEach(function (car) {
                            //zmanjsam stevilo zahtev na 3, ker je omejeno stevilo brezplacnih dostopov
                            if (jsonObj.length >= 3) return;
                            item = {};
                            // nastavim default vrednosti, v slučaju da so neke prazne
                            item ["make"] = car.make || 'Automobil';
                            item ["model"] = car.model || 'Model';
                            item ["address"] = car.address || 'Trg Osvobodilne fronte 4';
                            item ["city"] = car.city || 'Ljubljana';
                            item ["country"] = car.country || 'Slovenija';
                            item ["LAT"] = 46.050166466;
                            item ["LNG"] = 14.502164658;

                            //URL encoding converts characters into a format that can be transmitted over the Internet.
                            //izdelava request zahtev
                            //url encoding pretvarja presledke v %20, a oddaljeni API zahteva +
                            //zaradi tega nejprej encode, pa potem replace
                            var requestUrl = basic_url + '&street=' + encodeURIComponent(car.address).replace(/\%20/g, '+');
                            requestUrl = requestUrl + '&city=' + encodeURIComponent(car.city).replace(/\%20/g, '+');
                            requestUrl = requestUrl + '&country=' + encodeURIComponent(car.country).replace(/\%20/g, '+');


                            item["req"] = requestUrl;
                            jsonObj.push(item)

                        });
                        //console.log(jsonObj);
                    } catch (err) {
                        console.log(err.message);

                    }
                    ;
                    //console.log(jsonObj);

                    //rabim novi axios
                    const axios1 = require('axios');

                    (async () => {
                        try {
                            //3 requesta na enkrat
                            const [response0, response1, response2] = await axios1.all([
                                axios1.get(jsonObj[0].req),
                                axios1.get(jsonObj[1].req),
                                axios1.get(jsonObj[2].req)

                            ]);

                            //console.log(jsonObj[0].req);
                            //console.log(response0.data.results[0].locations[0].latLng.lat);
                            //console.log(response0.data.results[0].locations[0].latLng.lng);
                            jsonObj[0].LAT = response0.data.results[0].locations[0].latLng.lat;
                            jsonObj[0].LNG = response0.data.results[0].locations[0].latLng.lng;
                            jsonObj[0].req = '';

                            //console.log(jsonObj[1].req);
                            //console.log(response1.data.results[0].locations[0].latLng.lat);
                            //console.log(response1.data.results[0].locations[0].latLng.lng);
                            jsonObj[1].LAT = response1.data.results[0].locations[0].latLng.lat;
                            jsonObj[1].LNG = response1.data.results[0].locations[0].latLng.lng;
                            jsonObj[1].req = '';

                            //console.log(jsonObj[2].req);
                            //console.log(response2.data.results[0].locations[0].latLng.lat);
                            //console.log(response2.data.results[0].locations[0].latLng.lng);
                            jsonObj[2].LAT = response2.data.results[0].locations[0].latLng.lat;
                            jsonObj[2].LNG = response2.data.results[0].locations[0].latLng.lng;

                            //console.log(jsonObj);

                            res.header("Content-Type", 'application/json');
                            res.send(jsonObj);


                        } catch (error) {
                            console.log(error);
                        }
                    })();

                })
                .catch(() => {
                    showVehiclesHome(req, res, [], "Mistake on API side when searching.");
                });

            break;
        default:

            res.render('nearby', {
                user_logged: req.session.user_id != null
            });


    }
};

module.exports = {
    home,
    search,
    nearby
};