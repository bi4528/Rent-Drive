const mongoose = require('mongoose');
const Vehicles = mongoose.model('Vehicle');

const reviewsAll = (req, res) => {
    Vehicles
        .findById(req.params.id)
        .select('reviews')
        .exec((err, data) => {
            if (!data) {
                return res.status(404).json({
                    "message":
                        "Ne najdem avta s podanim enoličnim identifikatorjem id."
                });
            }
            else if (err) {
                return res.status(500).json(err);
            }
            else {
                res.status(200).json(data.reviews);     //ce napisemo samo data dobimo atribut id + reviews
            }
        });
};

const addReview = (req, res, data) => {
    if (!data) {
        res.status(404).json({ "message": "Ne najdem avta s podanim enoličnim identifikatorjem id.." });
    } else {
        data.reviews.push({
            username: req.body.username,
            user_id: req.body.user_id,
            rating: req.body.rating,
            comment: req.body.comment,
            img: req.body.img
        });
        data.save((err, data) => {
            if (err) {
                res.status(400).json(err);
            } else {
                //posodobiPovprecnoOceno(data._id);
                const dodaniKomentar = data.reviews.slice(-1).pop();
                res.status(201).json(dodaniKomentar);
            }
        });
    }
};
const reviewsUpload = (req, res) => {
    const idVehicle = req.params.id;
    if (idVehicle) {
        Vehicles
            .findById(idVehicle)
            .select('reviews')
            .exec((err, data) => {
                if (err) {
                    res.status(400).json(err);
                } else {
                    addReview(req, res, data);
                }
            });
    } else {
        res.status(400).json({
            "message":
                "Ne najdem avto, idVehicle je obvezen parameter."
        });
    }
};
const reviewsFind = (req, res) => {
    Vehicles
        .findById(req.params.idVehicle)
        .select('reviews')
        .exec((err, data) => {
            if (!data) {
                return res.status(404).json({
                    "message":
                        "Ne najdem avta s podanim enoličnim identifikatorjem id."
                });
            }
            else if (err) {
                return res.status(500).json(err);
            }

            if (data.reviews && data.reviews.length > 0) {
                const komentar = data.reviews.id(req.params.idReview);
                if (!komentar) {
                    return res.status(404).json({
                        "message":
                            "Ne najdem komentarja s podanim enoličnim identifikatorjem idReview."
                    });
                } else {
                    res.status(200).json({
                        "username": komentar.username,
                        "user_id": komentar.user_id,
                        "rating": komentar.rating,
                        "comment": komentar.comment,
                        "img": komentar.img,
                        "_id": komentar._id
                    });
                }
            } else {
                return res.status(404).json({
                    "message":
                        "Ne najdem nobenega komentarja."
                });
            }
        });
};

const reviewsDelete = (req, res) => {
    const { idVehicle, idReview } = req.params;
    if (!idVehicle || !idReview) {
        return res.status(404).json({
            "message":
                "Ne najdem avto oz. komentarja, " +
                "idVehicle in idReview sta obvezna parametra."
        });
    }
    Vehicles
        .findById(idVehicle)
        .select('reviews')
        .exec((err, data) => {
            if (!data) {
                return res.status(404).json({ "message": "Ne najdem avta s podanim enoličnim identifikatorjem id." });
            } else if (err) {
                return res.status(500).json(err);
            }
            if (data.reviews && data.reviews.length > 0) {
                if (!data.reviews.id(idReview)) {
                    return res.status(404).json({ "message": "Ne najdem komentarja s podanim enoličnim identifikatorjem idReview." });
                } else {
                    data.reviews.id(idReview).remove();
                    data.save((err) => {
                        if (err) {
                            return res.status(500).json(err);
                        } else {
                            //posodobiPovprecnoOceno(data._id);
                            res.status(204).json(true);
                        }
                    });
                }
            } else {
                res.status(404).json({ "message": "Ni komentarja za brisanje." });
            }
        });
};

module.exports = {
    reviewsAll,
    reviewsUpload,
    reviewsFind,
    reviewsDelete
}