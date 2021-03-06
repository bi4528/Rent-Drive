const mongoose = require('mongoose');
const Vehicle = mongoose.model('Vehicle');

function isEmpty(str) {
    return (!str || 0 === str.length);
}
function isLater(str1, str2) {
    return new Date(str1) >= new Date(str2);
}

const vehiclesAll = (req, res) => {
    Vehicle
        .find()
        .exec((err, dataJSON) => {
            if (!dataJSON) {
                return res.status(404).json({
                    "message":
                        "Ne najdem avtomobilov."
                });
            }
            else if (err) {
                console.err(err);
                res.status(404).json({ "message": "Napaka pri poizvedbi: " + err });
            } else {
                //res.status(200).json(data);
                const keyWord = req.query.value;
                const city = req.query.city;
                const dateFrom = req.query.dateFrom;
                const dateTo = req.query.dateTo;
                const category = req.query.category;
                const page = req.query.page;
                console.log(keyWord);

                if (isEmpty(keyWord) && isEmpty(city) && isEmpty(category)) {
                    //res.status(200).json(dataJSON);
                    sliceArray(res, dataJSON, page);
                }
                else if (!isEmpty(keyWord)) {
                    newData = [];
                   
                    dataJSON.forEach(function (item, index) {
                        makemodel = item.make+" "+item.model;
                        if (item.model.toLowerCase().includes(keyWord.toLowerCase()) || item.make.toLowerCase().includes(keyWord.toLowerCase()) || makemodel.toLowerCase().includes(keyWord.toLowerCase()) ) {
                            newData.push(item);
                        }
                    });
                    //res.status(200).json(newData);
                    sliceArray(res, newData, page);
                }
                else if (!isEmpty(city)) {
                    newData = [];
                    dataJSON.forEach(function (item, index) {

                        if (item.city.localeCompare(city) == 0 && isLater(dateFrom, item.date[0]) && isLater(item.date[1], dateTo)) {
                            newData.push(item);
                        }
                    });
                    //res.status(200).json(newData);
                    sliceArray(res, newData, page);
                }
                else if (!isEmpty(category)) {
                    newData = [];
                    dataJSON.forEach(function (item, index) {
                        if (item.category.localeCompare(category) == 0) {
                            newData.push(item);
                        }
                    });
                    //res.status(200).json(newData);
                    sliceArray(res, newData, page);
                }
            }
        });
};

const sliceArray = (res, dataJSON, page) => {
    if (isEmpty(page)) {
        res.status(200).json(dataJSON);
    }
    else {
        res.status(200).json(dataJSON.slice(12 * (page - 1), 12 * page))
    }
}

const returnLength = (req, res) => {
    Vehicle
        .find()
        .exec((err, dataJSON) => {
            if (!dataJSON) {
                return res.status(404).json({
                    "message":
                        "Zgodila se je napaka pri dobivanje st avtov"
                });
            }
            else if (err) {
                console.err(err);
                res.status(500).json({ "message": "Napaka pri poizvedbi: " + err });
            } else {
                //res.status(200).json(data);
                const keyWord = req.query.value;
                const city = req.query.city;
                const dateFrom = req.query.dateFrom;
                const dateTo = req.query.dateTo;
                const category = req.query.category;

                if (isEmpty(keyWord) && isEmpty(city) && isEmpty(category)) {
                    return res.status(200).json({ "number_vehicles": dataJSON.length });
                }
                else if (!isEmpty(keyWord)) {
                    newData = [];
                    
                    dataJSON.forEach(function (item, index) {
                        makemodel = item.make+" "+item.model;
                        if (item.model.toLowerCase().includes(keyWord.toLowerCase()) || item.make.toLowerCase().includes(keyWord.toLowerCase()) || makemodel.toLowerCase().includes(keyWord.toLowerCase()) ) {
                            newData.push(item);
                        }
                    });
                    return res.status(200).json({ "number_vehicles": newData.length });
                    
                }
                else if (!isEmpty(city)) {
                    newData = [];
                    dataJSON.forEach(function (item, index) {

                        if (item.city.localeCompare(city) == 0 && isLater(dateFrom, item.date[0]) && isLater(item.date[1], dateTo)) {
                            newData.push(item);
                        }
                    });
                    return res.status(200).json({ "number_vehicles": newData.length });
                }
                else if (!isEmpty(category)) {
                    newData = [];
                    dataJSON.forEach(function (item, index) {
                        if (item.category.localeCompare(category) == 0) {
                            newData.push(item);
                        }
                    });
                    return res.status(200).json({ "number_vehicles": newData.length });
                }
            }
        });
}

const imagesUpload = (req, res) => {
    if (!req.files) {
        console.log("No file received");
        res.status(404).json({
            "message": "No file found."
        });

    } else {
        console.log('file received');
        return res.status(201).json(req.files);
    }
}

const vehiclesUpload = (req, res) => {
    //console.log("Vehicle upload");
    //console.log(req.body);

    Vehicle.create({
        images: req.body.images,
        owner_id: req.body.owner_id,
        make: req.body.make,
        model: req.body.model,
        typeoffuel: req.body.typeoffuel,
        category: req.body.category,
        hp: parseFloat(req.body.hp),
        maxspeed: parseFloat(req.body.maxspeed),
        acceleration: parseFloat(req.body.acceleration),
        consumption: parseFloat(req.body.consumption),
        seats: parseInt(req.body.seats),
        doors: parseInt(req.body.doors),
        accessibility: req.body.accessibility,
        AirConditioning: req.body.AirConditioning,
        Navigation: req.body.Navigation,
        USB: req.body.USB,
        AUX: req.body.AUX,
        autopilot: req.body.autopilot,
        bluetooth: req.body.bluetooth,
        parkingsensors: req.body.parkingsensors,
        description: req.body.description,
        addres: req.body.addres,
        city: req.body.city,
        country: req.body.country,
        zip: parseInt(req.body.zip),
        price: parseFloat(req.body.price),
        number: req.body.number,
        date: req.body.date,
        luggage: parseInt(req.body.luggage),
        minage: parseInt(req.body.minage),
        reviews: [],
    }, (err, data) => {
        if (err) {
            res.status(400).json(err);
        } else {
            res.status(201).json(data);

        }
    });
};

const vehiclesFind = (req, res) => {
    Vehicle
        .findById(req.params.id)
        .exec((err, data) => {
            if (!data) {
                return res.status(404).json({
                    "message":
                        "Ne najdem avta s podanim enoli??nim identifikatorjem id."
                });
            }
            else if (err) {
                console.err(err);
                res.status(404).json({ "message": "Napaka pri poizvedbi: " + err });
            } else {
                res.status(200).json(data);
            }
        });
};

const vehiclesUpdate = (req, res) => {
    if (!req.params.id) {
        return res.status(404).json({
            "message":
                "Ne najdem avta s podanim enoli??nim identifikatorjem id."
        });
    }
    Vehicle
        .findById(req.params.id)
        .select('-reviews')
        .exec((err, data) => {
            if (!data) {
                return res.status(404).json({ "message": "Ne najdem avto." });
            } else if (err) {
                return res.status(500).json(err);
            }
            data.images = req.body.images;
            data.owner_id = req.body.owner_id,
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
            data.AirConditioning = req.body.AirConditioning;
            data.Navigation = req.body.Navigation;
            data.USB = req.body.USB;
            data.AUX = req.body.AUX;
            data.autopilot = req.body.autopilot;
            data.bluetooth = req.body.bluetooth;
            data.parkingsensors = req.body.parkingsensors;
            data.description = req.body.description;
            data.addres = req.body.addres;
            data.city = req.body.city;
            data.zip = parseFloat(req.body.zip);
            data.price = parseFloat(req.body.price);
            data.number = req.body.number;
            data.date = req.body.date;
            data.luggage = req.body.luggage;
            data.minage = req.body.minage;
            data.accessibility = req.body.accessibility;
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
    const idVehicle = req.params.id;
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
            "message":
                "Ne najdem avta s podanim enoli??nim identifikatorjem id."
        });
    }
};

module.exports = {
    vehiclesAll,
    vehiclesUpload,
    vehiclesFind,
    vehiclesUpdate,
    vehiclesDelete,
    returnLength,
    imagesUpload
}