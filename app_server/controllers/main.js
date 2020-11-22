const e = require('express');
var fs = require('fs');
var weatherJSON = require('../models/weather-api.json');

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

    /*
    axios
        .get('/api/vehicles')
        .then((odgovor) => {
            let sporocilo = odgovor.data.length ? null : "No cars found.";
            locationJSON.cars=odgovor.data;
            dobis lng in lat preko zunajni API nad locationJSON.adress
            locationJSON.lat=
            locationJSON.lng=

        })
        .catch(() => {
            showVehiclesHome(req, res, [], "Mistake on API side when searching.");
        });   
    */

    res.render('nearby', {
        cars: JSON.stringify(locationJSON.cars),
        weather: weatherJSON,
        user_logged: req.session.user_id != null
    });
};

module.exports = {
    home,
    search,
    nearby
};