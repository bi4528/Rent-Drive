/* GET home page */
const home = (req, res) => {
    res.render('home', { title: 'Express' });
};

const publish = (req, res) => {
    res.render('publish');
};

const search = (req, res) => {
    res.render('search');
};

const review = (req, res) => {
    res.render('review');
}

module.exports = {
    home,
    publish,
    search,
    review
};