const mongoose = require('mongoose');
const Vehicle = mongoose.model('Vehicle');

const vehiclesAll = (req, res) => {
    Vehicle
        .find()
        .exec((err, data) => {
            if(!data){
                return res.status(404).json({
                    "sporočilo": 
                      "Ne najdem lokacije s podanim enoličnim identifikatorjem idLokacije."
                });
            }
            else if(err){
                console.err(err);
                res.status(404).json({"sporočilo": "Napaka pri poizvedbi: " + err});
            } else {
                res.status(200).json(data);
            }
        });
};

const vehiclesUpload = (req, res) => {
    res.status(200).json({"status": "uspešno"});
};

const vehiclesFind = (req, res) => {
    Vehicle
        .findById(req.params.id)
        .exec((err, data) => {
            if(!data){
                return res.status(404).json({
                    "sporočilo": 
                      "Ne najdem lokacije s podanim enoličnim identifikatorjem idLokacije."
                });
            }
            else if(err){
                console.err(err);
                res.status(404).json({"sporočilo": "Napaka pri poizvedbi: " + err});
            } else {
                res.status(200).json(data);
            }
        });
};

const vehiclesUpdate = (req, res) => {
    res.status(200).json({"status": "uspešno"});
};

const vehiclesDelete = (req, res) => {
    res.status(200).json({"status": "uspešno"});
};

module.exports = {
    vehiclesAll,
    vehiclesUpload,
    vehiclesFind,
    vehiclesUpdate,
    vehiclesDelete
}