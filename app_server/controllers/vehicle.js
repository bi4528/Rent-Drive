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
    var sessionUser = req.session.user_id;
    var tmp = null;
    axios
        .get('/api/vehicles/' + req.params.id)
        .then((odgovor) => {
            //console.log(odgovor.data);
            let car_photos = [];
            let indicators = [];
            for (i = 0; i < odgovor.data.images.length; i++) {
                if (i == 0) {
                    car_photos.push({ "image": odgovor.data.images[i], "active": "active" });
                    indicators.push({ "num": i.toString(), "active": "class='active'" });
                }
                else {
                    car_photos.push({ "image": odgovor.data.images[i] });
                    indicators.push({ "num": i.toString() });
                }
            }
            odgovor.data.indicators = indicators;
            odgovor.data.car_photos = car_photos;

            // for zanka, axios get odgovor.data.reviews.user_id, poišči user_id, namesto img iz reviews, beremo iz user sheme


            for (var i = 0; i < odgovor.data.reviews.length; i++) {
                odgovor.data.reviews.show_delete_button = odgovor.data.reviews[i].user_id == req.session.user_id;
            }


            var sum = getAverageRating(odgovor);
            if (sum > 0) {
                var newAvgRating = sum / odgovor.data.reviews.length;
                odgovor.data.avg_rating = newAvgRating;
            }

            for (i = 0; i < odgovor.data.reviews.length; i++) {
                console.log(odgovor.data.reviews[i]);
            }


            tmp = odgovor.data;
        }).then((response) => {
            console.log("Lastnik je " + tmp.owner_id);
            axios({
                method: 'get',
                url: '/api/users/' + tmp.owner_id, //manjka id!!!
            }).then((user) => {
                if (user.data.phone_number != null) tmp.phone_number = user.data.phone_number;
                if (user.data.profile_picture != null) tmp.profile_picture = user.data.profile_picture;
                if (user.data.firstname != null) tmp.firstname = user.data.firstname;
                if (user.data.lastname != null) tmp.lastname = user.data.lastname;
                if (user.data.email != null) tmp.email = user.data.email;
                if (user.data.username != null) tmp.username = user.data.username;
                if (user.data.location != null) tmp.location = user.data.location;
                //console.log("SESSION " + sessionUser);
                tmp.sessionUser = sessionUser;
                showvehicleprofile(req, res, tmp);
            }).catch((napaka) => {
                console.log("Napaka pri iskanju lastnika vozila!");
                //console.log(tmp);
                showvehicleprofile(req, res, tmp)
            });
        });
};

const showvehicleprofile = (req, res, data) => {
    //console.log(data.sessionUser);
    data.user_logged = req.session.user_id != null;
    res.render('vehicleprofile', data);
};

const publish = (req, res) => {
    const is_user_logged = req.session.user_id != null;
    res.render('publish', {
        user_logged: is_user_logged
    });
};

const { names } = require('debug');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
        //cb(null, './public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
        //cb(null, Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({ storage: storage }).array('carphotos', 10);
const submitcar = (req, res) => {

    upload(req, res, function (err) {
        //console.log(req);
        console.log(req.body);
        if (err) {
            console.log("NAPAKA");
        }
        console.log(req.files);
        let names = [];
        for (i = 0; i < req.files.length; i++) {
            names.push(req.files[i].filename);
        }
        submitCB(req, res, names);
    });
};

const submitCB = (req, res, images) => {
    axios({
        method: 'post',
        url: '/api/vehicles',
        data: {
            images: images,
            owner_id: req.session.user_id,
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
            AUX: req.body.AUX,
            autopilot: req.body.autopilot,
            bluetooth: req.body.bluetooth,
            parkingsensors: req.body.parkingsensors,
            accessibility: req.body.accessibility,
            description: req.body.description,
            addres: req.body.addres,
            city: req.body.city,
            zip: req.body.zip,
            price: req.body.price,
            number: req.body.number,
            date: req.body.date,
            minage: req.body.minage,
            luggage: req.body.luggage

        }
    }).then(() => {
        res.redirect('/');
    }).catch((err) => {
        console.log("NAPAKA");
    })
};

const editvehicleprofile = (req, res) => {
    var tmp = null;
    axios
        .get('/api/vehicles/' + req.params.id)
        .then((odgovor) => {
            //console.log(odgovor.data);
            tmp = odgovor.data;
        }).then((response) => {
            console.log("Lastnik je " + tmp.owner_id);
            axios({
                method: 'get',
                url: '/api/users/' + tmp.owner_id,
            }).then((user) => {
                //console.log(user.data);
                if (user.data.phone_number != null) tmp.phone_number = user.data.phone_number;
                if (user.data.profile_picture != null) tmp.profile_picture = user.data.profile_picture;
                if (user.data.firstname != null) tmp.firstname = user.data.firstname;
                if (user.data.lastname != null) tmp.lastname = user.data.lastname;
                if (user.data.email != null) tmp.email = user.data.email;
                if (user.data.username != null) tmp.username = user.data.username;
                if (user.data.location != null) tmp.location = user.data.location;
                tmp.user_logged = req.session.user_id != null;
                res.render('editvehicleprofile', tmp);
            }).catch((napaka) => {
                console.log("Napaka pri iskanju lastnika vozila!");
                tmp.user_logged = req.session.user_id != null;
                res.render('editvehicleprofile', tmp);
            });
        });
};

var upload2 = multer({ storage: storage }).array('carphotos2', 10);
const editvehicleprofile_submit = (req, res) => {
    var changes = [];
    console.log(req.body);
    for (var i in req.body) {
        var obj = {};
        obj.key = i;
        obj.value = req.body[i];
        changes.push(obj);
    }
    axios
        .get('/api/vehicles/' + req.params.id)
        .then((odgovor) => {
            accessibilityOff = true;
            auxOff = true;
            usbOff = true;
            bluetoothOff = true;
            navigationOff = true;
            parkingsensorsOff = true;
            AirConditioningOff = true;
            autopilotOff = true;

            for (var i in changes) {
                //console.log(changes[i].key + ": " + changes[i].value);
                //console.log(odgovor.data[changes[i].key]);
                odgovor.data[changes[i].key] = changes[i].value;
                if (changes[i].key == "accessibility") accessibilityOff = false;
                if (changes[i].key == "AUX") auxOff = false;
                if (changes[i].key == "USB") usbOff = false;
                if (changes[i].key == "bluetooth") bluetoothOff = false;
                if (changes[i].key == "Navigation") navigationOff = false;
                if (changes[i].key == "parkingsensors") parkingsensorsOff = false;
                if (changes[i].key == "AirConditioning") AirConditioningOff = false;
                if (changes[i].key == "autopilot") autopilotOff = false;
                if (changes[i].key == "date-from") odgovor.data.date[0] = changes[i].value;
                if (changes[i].key == "date-to") odgovor.data.date[1] = changes[i].value;
            }
            if (accessibilityOff) odgovor.data.accessibility = "off";
            if (auxOff) odgovor.data.AUX = "off";
            if (usbOff) odgovor.data.USB = "off";
            if (bluetoothOff) odgovor.data.bluetooth = "off";
            if (navigationOff) odgovor.data.Navigation = "off";
            if (parkingsensorsOff) odgovor.data.parkingsensors = "off";
            if (AirConditioningOff) odgovor.data.AirConditioning = "off";
            if (autopilotOff) odgovor.data.autopilot = "off";

            var upload = multer({
                storage: storage
            }).array('carphotos2', 5);
            axios({
                method: 'put',
                url: '/api/vehicles/' + req.params.id,
                data: odgovor.data
            }).then(() => {
                //res.render('/vehicles/' + req.params.id, odgovor.data)
                res.redirect('/vehicles/' + req.params.id);
            }).catch((napaka) => {
                console.log("Prišlo je do napake pri posodabljanju.");
            });
            /*upload(req, res, function (error) {
                if (error) {
                    console.log(error);
                } else if (req.files.length > 0) {
                    console.log("We have an image.");
                    images = [];
                    for (i = 0; i < req.files.length; i++) {
                        images.push(req.files[i].filename);
                    }
                    odgovor.data.images = images;
                }
                //console.log(odgovor.data);
                axios({
                    method: 'put',
                    url: '/api/vehicles/' + req.params.id,
                    data: odgovor.data
                }).then(() => {
                    //res.render('/vehicles/' + req.params.id, odgovor.data)
                    res.redirect('/vehicles/' + req.params.id);
                }).catch((napaka) => {
                    console.log("Prišlo je do napake pri posodabljanju.");
                });
            });*/


        })
};

const vehicleprofile_book = (req, res) => {
    console.log(req.body);
    //user.logged_user_profile(req,res);
    //console.log(res.body);
    var idUser = req.session.user_id;
    console.log(idUser);
    axios.get(appiParams.server + '/api/users/' + idUser, {
        params: req.body.params
    })
        .then((response) => {
            var user = { "prvi": response.data, "drugi": req.body };
            res.render('book', user);
            console.log(user);
        })
        .catch((error) => {
            console.log(error);
        });

};

function getAverageRating(odgovor) {
    var sum = 0;
    for (i = 0; i < odgovor.data.reviews.length; i++)
        sum += odgovor.data.reviews[i].rating.match(/★/g).length;
    return sum;
}

const review = (req, res) => {
    res.render('review', { user_logged: req.session.user_id != null });
}

const addReview = (req, res, username, stars) => {
    id = req.params.id;
    axios({
        method: 'post',
        url: '/api/vehicles/' + id + '/reviews/',
        data: {
            comment: req.body.comment,
            rating: stars,
            img: "../images/oseba_template_2.jpg",
            //TODO USERNAME USERIMG
            user_id: req.session.user_id,
            username: username
        }
    }).then(() => {
        res.redirect('/vehicles/' + id);
    }).catch((napaka) => {
        console.log("NAPAKA");
    });
}

const postReview = (req, res) => {
    console.log(req.body);
    let stars = "";
    if (req.body.stars === '1') {
        stars = "★☆☆☆☆";
    }
    else if (req.body.stars === '2') {
        stars = "★★☆☆☆";
    }
    else if (req.body.stars === '3') {
        stars = "★★★☆☆";
    }
    else if (req.body.stars === '4') {
        stars = "★★★★☆";
    }
    else {
        stars = "★★★★★";
    }

    id = req.params.id;


    axios
        .get('/api/users/' + req.session.user_id)
        .then((odgovor) => {
            //console.log(odgovor.data);
            addReview(req, res, odgovor.data.username, stars);
        })
        .catch((napaka) => {
            console.log("Napaka pri iskanju lastnika!");
            console.log(napaka);
        });
}

const deleteReviewOfVehicle = (req, res) => {
    console.log(req.params);
    axios.delete('/api/vehicles/' + req.params.idVehicle + '/reviews/' + req.params.idReview)
        .then((odgovor) => {
            console.log(odgovor.data);
            req.params.id = req.params.idVehicle;
            vehicleprofile2(req, res);
            //addReview(req, res, odgovor.data.username, stars);
        })
        .catch((napaka) => {
            console.log("Napaka pri iskanju lastnika!");
            console.log(napaka);
        });
    //TODO
}

const changeFavoriteOfUser = (req, res) => {

    console.log("Adding fav veh Server");
    console.log(req.body);
    console.log(req.params);

    axios({
        method: 'post',
        url: '/api/users/' + req.session.user_id + '/favourite_vehicle',
        data: {
            idUser: req.session.user_id,
            favourite_vehicles_id: req.params.idVehicle
        }
    }).then((response) => {
        if (response.data != null && response.data == true) {
            req.params.id = req.params.idVehicle;
            vehicleprofile2(req, res);
        } else {
            show_vehicle_profile_error(req, res, "Unable to add favourite vehicle.")
        }
    }).catch((napaka) => {
        console.log(napaka);
        show_vehicle_profile_error(req, res, "Unable to add favourite vehicle.")
    });
}

const show_vehicle_profile_error = (req, res, message) => {
    res.render('vehicleprofile', {
        user_logged: req.session.user_id != null,
        alert_error: message
    });
};


module.exports = {
    vehicleprofile,
    publish,
    submitcar,
    editvehicleprofile,
    vehicleprofile_book,
    vehicleprofile2,
    editvehicleprofile_submit,
    review,
    postReview,
    deleteReviewOfVehicle,
    changeFavoriteOfUser
};