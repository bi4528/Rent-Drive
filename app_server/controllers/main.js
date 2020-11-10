var fs = require('fs');
var dataJSON = require('../models/avti-seznam.json');

/* GET home page */
const home = (req, res) => {
    res.render('home', dataJSON);
};

const publish = (req, res) => {
    res.render('publish');
};

const search = (req, res) => {
    res.render('search', dataJSON);
};

const review = (req, res) => {
    res.render('review');
};

const submitcar = (req, res) => {
    //console.log(req);
    dataJSON.cars.push(JSON.parse(JSON.stringify(req.body)));
    fs.writeFile('app_server/models/avti-seznam.json', JSON.stringify(dataJSON,null,'\t'), 'utf-8', function (err, data) {
        if (err) throw err;
        console.log('Done!');
    });

    res.render('submitcar');
}

module.exports = {
    home,
    publish,
    search,
    review,
    submitcar
};