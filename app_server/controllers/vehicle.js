var fs = require('fs');
var dataJSON = require('../models/avti-seznam.json');

/* GET vehicleprofile.hbs */
const vehicleprofile = (req, res) => {

    console.log(dataJSON.cars[dataJSON.cars.length-1]);
    res.render('vehicleprofile', dataJSON.cars[dataJSON.cars.length-1]
    /*{   car_name: 'Tesla Model 3 2019',
        phone_number: '+38670789654',
        email: 'josh_smith@gmail.com',
        location: 'Koper, Slovenia',
        username: 'JoshSmith213',
        description: 'Step into the future with our beautiful electric four-door fastback sedan. Enjoy your trip without engine noise, listening to music on Spotify or your favourite podcast. Equipped with Autopilot, it\'ll reduce your driving fatigue and you will arrive at your destination relaxed and ready for action. Make your driving enjoyable, drive a Tesla - we are sure your experience will be something to remember.',
        avg_rating: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>',
        avatar: '/images/oseba_template.jpg',
        price: '85€',
        car_photos: [{image: '../images/tesla1.jpg',active:'active'},{image:'../images/tesla2.jpg'},{image:'../images/tesla3.jpg'},{image:'../images/tesla4.jpg'},{image:'../images/tesla5.jpg'},{image:'../images/tesla4.jpg'},{image:'../images/tesla6.jpg'}],
        indicators: [{num: "0", active:"class='active'"},{num: "1"},{num: "2"},{num: "3"},{num: "4"},{num: "5"}],
        reviews: [{username: 'Marko Šter', rating: '★★★☆☆', comment:'Everything is immaculate and well kept, hats off to the renting crew, but I guess I just dont fancy electric cars it seems.', img:'../images/oseba_template_2.jpg'},
    {username: 'Marko Šter', rating: '★★★☆☆', comment:'Everything is immaculate and well kept, hats off to the renting crew, but I guess I just dont fancy electric cars it seems.', img:'../images/oseba_template_2.jpg'}],
        pickup_locations: [{location_name:"Vojkovo nabrežje 1, Koper"},{location_name:"Ankaranska cesta 5d, Koper"}]
    }*/

    );
};

const publish = (req, res) => {
    res.render('publish');
};

const submitcar = (req, res) => {
    //console.log(req);
    dataJSON.cars.push(JSON.parse(JSON.stringify(req.body)));
    fs.writeFile('app_server/models/avti-seznam.json', JSON.stringify(dataJSON,null,'\t'), 'utf-8', function (err, data) {
        if (err) throw err;
        console.log('Done!');
    });

    res.render('home', dataJSON);
}


module.exports = {
    vehicleprofile,
    publish,
    submitcar
};