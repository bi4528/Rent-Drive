var fs = require('fs');
var dataJSON = require('../models/avti-seznam.json');

/* GET home page */
const home = (req, res) => {
    res.render('home', dataJSON);
};

const search = (req, res) => {
    res.render('search', dataJSON);
};

module.exports = {
    home,
    search
};