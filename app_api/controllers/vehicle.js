const mongoose = require('mongoose');
const Vehicle = mongoose.model('Vehicle');

const vehiclesAll = (req, res) => {
    Vehicle
        .find()
        .exec((err, data) => {
            if (!data) {
                return res.status(404).json({
                    "sporočilo":
                        "Ne najdem lokacije s podanim enoličnim identifikatorjem idLokacije."
                });
            }
            else if (err) {
                console.err(err);
                res.status(404).json({ "sporočilo": "Napaka pri poizvedbi: " + err });
            } else {
                res.status(200).json(data);
            }
        });
};

const vehiclesUpload = (req, res) => {
    Vehicle.create({
        image: req.body.image,
        make: req.body.make,
        model: req.body.model,
        typeoffuel: req.body.typeoffuel,
        category: req.body.category,
        hp: parseFloat(req.body.hp),
        maxspeed: parseFloat(req.body.maxspeed),
        acceleration: parseFloat(req.body.acceleration),
        consumption: parseFloat(req.body.consumption),
        seats: parseFloat(req.body.seats),
        doors: parseFloat(req.body.doors),
        AirConditioning: req.body.AirConditioning == null ? "0" : "1",
        Navigation: req.body.Navigation == null ? "0" : "1",
        USB: req.body.USB == null ? "0" : "1",
        AUX: req.body.AUX == null ? "0" : "1",
        autopilot: req.body.autopilot == null ? "0" : "1",
        bluetooth: req.body.bluetooth == null ? "0" : "1",
        parkingsensors: req.body.parkingsensors == null ? "0" : "1",
        description: req.body.description,
        addres: req.body.addres,
        city: req.body.city,
        zip: parseFloat(req.body.zip),
        price: parseFloat(req.body.price),
        number: req.body.number,
        date: req.body.date,
        reviews: []
    }, (err, data) => {
        if (err) {
            res.status(400).json(err);
        } else {
            res.status(201).json(data);
            //res.redirect('/');
        }
    });
};

const vehiclesFind = (req, res) => {
    Vehicle
        .findById(req.params.id)
        .exec((err, data) => {
            if (!data) {
                return res.status(404).json({
                    "sporočilo":
                        "Ne najdem lokacije s podanim enoličnim identifikatorjem idLokacije."
                });
            }
            else if (err) {
                console.err(err);
                res.status(404).json({ "sporočilo": "Napaka pri poizvedbi: " + err });
            } else {
                res.status(200).json(data);
            }
        });
};

const vehiclesUpdate = (req, res) => {
    if (!req.params.id) {
        return res.status(404).json({
            "sporočilo":
                "Ne najdem avto, id je obvezen parameter."
        });
    }
    Vehicle
        .findById(req.params.id)
        .select('-reviews')
        .exec((err, data) => {
            if (!data) {
                return res.status(404).json({ "sporočilo": "Ne najdem avto." });
            } else if (err) {
                return res.status(500).json(err);
            }
            data.image = req.body.image;
            data.make = req.body.make;
            data.model = req.body.model;
            data.typeoffuel = req.body.typeoffuel;
            data.category = req.body.category;
            data.hp = parseFloat(req.body.hp);
            data.maxspeed = parseFloat(req.body.maxspeed);
            data.acceleration = parseFloat(req.body.acceleration);
            data.consumption = parseFloat(req.body.consumption);
            data.seats = parseFloat(req.body.seats);
            data.doors = parseFloat(req.body.doors);
            data.AirConditioning = req.body.AirConditioning == null ? "0" : "1";
            data.Navigation = req.body.Navigation == null ? "0" : "1";
            data.USB = req.body.USB == null ? "0" : "1";
            data.AUX = req.body.AUX == null ? "0" : "1";
            data.autopilot = req.body.autopilot == null ? "0" : "1";
            data.bluetooth = req.body.bluetooth == null ? "0" : "1";
            data.parkingsensors = req.body.parkingsensors == null ? "0" : "1";
            data.description = req.body.description;
            data.addres = req.body.addres;
            data.city = req.body.city;
            data.zip = parseFloat(req.body.zip);
            data.price = parseFloat(req.body.price);
            data.number = req.body.number;
            data.date = req.body.date;
            data.save((err, data) => {
                if (err) {
                    res.status(404).json(err);
                } else {
                    res.status(200).json(data);
                }
            });
        });
};

const vehiclesDelete = (req, res) => {
    const { idVehicle } = req.params;
    if (idVehicle) {
        Vehicle
            .findByIdAndRemove(idVehicle)
            .exec((err) => {
                if (err) {
                    return res.status(500).json(err);
                }
                res.status(204).json(null);
            });
    } else {
        res.status(404).json({
            "sporočilo":
                "Ne najdem lokacije, idVehicle je obvezen parameter."
        });
    }
};

module.exports = {
    vehiclesAll,
    vehiclesUpload,
    vehiclesFind,
    vehiclesUpdate,
    vehiclesDelete
}