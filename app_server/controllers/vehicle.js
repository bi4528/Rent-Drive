//const { default: Axios } = require('axios');
var fs = require('fs');


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

var dataJSON = require('../models/avti-seznam.json');

/* GET vehicleprofile.hbs */
const vehicleprofile = (req, res) => {
    debugger;
    console.log(dataJSON.cars[dataJSON.cars.length - 1]);
    res.render('vehicleprofile', dataJSON.cars[dataJSON.cars.length - 1]
    );
};

const vehicleprofile2 = (req, res) => {
    axios
        .get('/api/vehicles/'+req.params.id)
        .then ((odgovor) => {
            console.log(odgovor.data);
            showvehicleprofile(req, res, odgovor.data);
        });
        
};

const showvehicleprofile = (req, res, data) =>{
    res.render('vehicleprofile', data);
};

const publish = (req, res) => {
    res.render('publish');
};

const submitcar = (req, res) => {
    console.log(req.body);
    /*dataJSON.cars.push(JSON.parse(JSON.stringify(req.body)));
    fs.writeFile('app_server/models/avti-seznam.json', JSON.stringify(dataJSON,null,'\t'), 'utf-8', function (err, data) {
        if (err) throw err;
        console.log('Done!');
    });
    res.render('home', dataJSON);*/
    //console.log(req.body);

    axios({
        method: 'post',
        url: '/api/vehicles',
        data: {
            image: req.body.carphotos,
            make: req.body.make,
            model: req.body.model,
            typeoffuel: req.body.typeoffuel,
            category: req.body.category,
            hp: req.body.hp,
            maxspeed: req.body.maxspeed,
            acceleration: req.body.acceleration,
            consumption: req.body.consumption,
            seats: (req.body.seats),
            doors: (req.body.doors),
            AirConditioning: req.body.AirConditioning,
            Navigation: req.body.Navigation,
            USB: req.body.USB,
            AUX: req.body.AUX ,
            autopilot: req.body.autopilot ,
            bluetooth: req.body.bluetooth ,
            parkingsensors: req.body.parkingsensors,
            description: req.body.description,
            address: req.body.address,
            city: req.body.city,
            zip: req.body.zip,
            price: req.body.price,
            number: req.body.number,
            date: req.body.date
        }
    }). then(() => {
        res.redirect('/');
    }).catch((err) => {
        console.log("NAPAKA");
    })
};

const editvehicleprofile = (req, res) => {
    res.render('editvehicleprofile', dataJSON.cars[dataJSON.cars.length - 1]);
};

const vehicleprofile_book = (req, res) => {
    console.log(req.body);
    res.render('book', req.body);
};

module.exports = {
    vehicleprofile,
    publish,
    submitcar,
    editvehicleprofile,
    vehicleprofile_book,
    vehicleprofile2
};