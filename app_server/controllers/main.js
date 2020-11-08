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

module.exports = {
    home,
    publish,
    search,
    review
};