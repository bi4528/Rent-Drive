//const { default: Axios } = require('axios');
var fs = require('fs');
const multer = require("multer");

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
            //console.log(odgovor.data);
            let car_photos=[];
            let indicators=[];
            for(i=0; i<odgovor.data.images.length; i++){
                if(i==0){
                    car_photos.push({"image": odgovor.data.images[i], "active": "active"});
                    indicators.push({"num": i.toString(), "active": "class='active'" });
                }
                else{
                    car_photos.push({"image": odgovor.data.images[i]});
                    indicators.push({"num": i.toString()});
                }
            }
            odgovor.data.indicators=indicators;
            odgovor.data.car_photos=car_photos;
            
            var sum = getAverageRating(odgovor);
            if (sum>0) {
                var newAvgRating = sum/odgovor.data.reviews.length;
                odgovor.data.avg_rating = newAvgRating; 
            } 
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
            images: [req.body.carphotos],
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
            accessibility: req.body.accessibility,
            description: req.body.description,
            addres: req.body.addres,
            city: req.body.city,
            zip: req.body.zip,
            price: req.body.price,
            number: req.body.number,
            date: req.body.date,
            minage:req.body.minage,
            luggage:req.body.luggage
            
        }
    }). then(() => {
        res.redirect('/');
    }).catch((err) => {
        console.log("NAPAKA");
    })
};

const editvehicleprofile = (req, res) => {
    axios
        .get('/api/vehicles/'+req.params.id)
        .then ((odgovor) => {
            console.log(odgovor.data);
            //showvehicleprofile(req, res, odgovor.data);
            res.render('editvehicleprofile', odgovor.data);
        });    
};

const editvehicleprofile_submit = (req, res) => {
    var changes = [];
    for(var i in req.body){
        var obj = {};
        obj.key = i;
        obj. value = req.body[i];
        changes.push(obj);
    }
    axios
        .get('/api/vehicles/'+req.params.id)
        .then ((odgovor) => {
            //console.log(req.body);
            //console.log(odgovor.data);
            for (var i in changes) {
                //console.log(changes[i].key + ": " + changes[i].value);
                //console.log(odgovor.data[changes[i].key]);
                if (odgovor.data[changes[i].key]!=changes[i].value && changes[i].value!="on" && changes[i].value!="" && changes[i].value!=null){
                    odgovor.data[changes[i].key]=changes[i].value;
                }
            }
            res.render('vehicleprofile', odgovor.data);
        }); 
};

const vehicleprofile_book = (req, res) => {
    console.log(req.body);
    res.render('book', req.body);
};

function getAverageRating (odgovor){
    var sum = 0;
    for (i=0; i<odgovor.data.reviews.length;i++)
        sum += odgovor.data.reviews[i].rating.match(/★/g).length;
    return sum; 
}

module.exports = {
    vehicleprofile,
    publish,
    submitcar,
    editvehicleprofile,
    vehicleprofile_book,
    vehicleprofile2,
    editvehicleprofile_submit
};