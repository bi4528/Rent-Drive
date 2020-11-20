var fs = require('fs');
var dataJSON = require('../models/avti-seznam.json');

/* GET vehicleprofile.hbs */
const vehicleprofile = (req, res) => {
    debugger;
    console.log(dataJSON.cars[dataJSON.cars.length-1]);
    res.render('vehicleprofile', dataJSON.cars[dataJSON.cars.length-1]
    );
};

const publish = (req, res) => {
    res.render('publish');
};

const submitcar = (req, res) => {
    //console.log(req.body);
    dataJSON.cars.push(JSON.parse(JSON.stringify(req.body)));
    fs.writeFile('app_server/models/avti-seznam.json', JSON.stringify(dataJSON,null,'\t'), 'utf-8', function (err, data) {
        if (err) throw err;
        console.log('Done!');
    });

    res.render('home', dataJSON);
};

const editvehicleprofile = (req,res) => {
    res.render('editvehicleprofile',dataJSON.cars[dataJSON.cars.length-1]);
};

const vehicleprofile_book = (req,res) => {
    console.log(req.body);
    res.render('book',req.body);
};

module.exports = {
    vehicleprofile,
    publish,
    submitcar,
    editvehicleprofile,
    vehicleprofile_book
};