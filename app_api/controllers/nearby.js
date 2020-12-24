const e = require('express');
var fs = require('fs');
var url = require('url');
var http = require("http");


var appiParams = {
    server: 'http://localhost:' + (process.env.PORT || 3000)
};

if (process.env.NODE_ENV === 'production') {
    appiParams.server = 'https://rentdrive-sp.herokuapp.com';
}
const axios = require('axios').create({
    baseURL: appiParams.server,
    timeout: 5000
});


function isEmpty(str) {
    return (!str || 0 === str.length);
}


function  weather (req, res) {

    const requestUrl = 'http://api.weatherstack.com/current?access_key='+process.env.WEATHERSTACK_KEY+'&query=Ljubljana';
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

}

function locations(req,res) {
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
                const basic_url = 'http://open.mapquestapi.com/geocoding/v1/address?key='+process.env.MAPQUESTAPI_KEY;
                //vzmemo iz carsa tisto, kar potrebujemo za markerje
                odgovor.data.forEach(function (car) {
                    console.log(car);
                    //zmanjsam stevilo zahtev na 5, ker je omejeno stevilo brezplacnih dostopov
                    if (jsonObj.length >= 5) return;
                    item = {};
                    // nastavim default vrednosti, v slučaju da so neke prazne
                    item["make"] = car.make || 'Automobil';
                    item["model"] = car.model || 'Model';
                    item["address"] = car.addres || 'Trg Osvobodilne fronte 4';
                    item["city"] = car.city || 'Ljubljana';
                    item["country"] = car.country || 'Slovenija';
                    item["LAT"] = 46.050166466;
                    item["LNG"] = 14.502164658;

                    //URL encoding converts characters into a format that can be transmitted over the Internet.
                    //izdelava request zahtev
                    //url encoding pretvarja presledke v %20, a oddaljeni API zahteva +
                    //zaradi tega nejprej encode, pa potem replace
                    var requestUrl = basic_url + '&street=' + encodeURIComponent(car.addres).replace(/\%20/g, '+');
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
                    const [response0, response1, response2, response3, response4] = await axios1.all([
                        axios1.get(jsonObj[0].req),
                        axios1.get(jsonObj[1].req),
                        axios1.get(jsonObj[2].req),
                        axios1.get(jsonObj[3].req),
                        axios1.get(jsonObj[4].req),

                    ]);

                    //console.log(jsonObj[0].req);
                    //console.log(response0.data.results[0]);
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
                    jsonObj[2].req = '';

                    jsonObj[3].LAT = response3.data.results[0].locations[0].latLng.lat;
                    jsonObj[3].LNG = response3.data.results[0].locations[0].latLng.lng;
                    jsonObj[3].req = '';

                    jsonObj[4].LAT = response4.data.results[0].locations[0].latLng.lat;
                    jsonObj[4].LNG = response4.data.results[0].locations[0].latLng.lng;
                    jsonObj[4].req = '';

                    //console.log(jsonObj);

                    res.header("Content-Type", 'application/json');
                    res.send(jsonObj);


                } catch (error) {
                    console.log(error);
                }
            })();

        })
}



module.exports = {
    weather,
    locations
};
