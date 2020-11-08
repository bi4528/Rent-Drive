/* GET vehicleprofile.hbs */
const vehicleprofile = (req, res) => {
    res.render('vehicleprofile', 
    {   car_name: 'Tesla Model 3 2019',
        phone_number: '+38670789654',
        email: 'josh_smith@gmail.com',
        location: 'Koper, Slovenia',
        username: 'JoshSmith213',
        description: 'Step into the future with our beautiful electric four-door fastback sedan. Enjoy your trip without engine noise, listening to music on Spotify or your favourite podcast. Equipped with Autopilot, it\'ll reduce your driving fatigue and you will arrive at your destination relaxed and ready for action. Make your driving enjoyable, drive a Tesla - we are sure your experience will be something to remember.',
        avg_rating: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>',
        avatar: '/images/oseba_template.jpg',
        car_photos: [{car_photo: 'tesla1.jpg'}]
        /*rewiew: [
        {   username: 'Marko Šter', rating: '★★★☆☆'}
        ]*/
    });
};

module.exports = {
    vehicleprofile
};