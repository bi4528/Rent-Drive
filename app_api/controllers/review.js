const mongoose = require('mongoose');
const Vehicles = mongoose.model('Vehicle');

const reviewsAll = (req, res) => {
    Vehicles
        .findById(req.params.id)
        .select('reviews')
        .exec((err, data) =>{
            if(!data){
                return res.status(404).json({
                    "sporočilo": 
                      "Ne najdem avte s podanim enoličnim identifikatorjem id."
                  });
            }
            else if (err) {
                return res.status(500).json(err);
            }
            else{
                res.status(200).json(data.reviews);     //ce napisemo samo data dobimo atribut id + reviews
            }
        });
};
const reviewsUpload = (req, res) => {
    res.status(200).json({"status": "uspešno"});
};
const reviewsFind = (req, res) => {
    Vehicles
        .findById(req.params.idVehicle)
        .select('reviews')
        .exec((err, data) =>{
            if(!data){
                return res.status(404).json({
                    "sporočilo": 
                      "Ne najdem avte s podanim enoličnim identifikatorjem id."
                  });
            }
            else if (err) {
                return res.status(500).json(err);
            }
            
            if (data.reviews && data.reviews.length > 0) {
                const komentar = data.reviews.id(req.params.idReview);
                if (!komentar) {
                  return res.status(404).json({
                    "sporočilo": 
                      "Ne najdem komentarja s podanim enoličnim identifikatorjem idKomentarja."
                  });
                } else {
                  res.status(200).json({
                    "username": komentar.username,
                    "rating": komentar.rating,
                    "comment": komentar.comment,
                    "img": komentar.img,
                    "_id": komentar._id
                  });
                }
              } else {
                return res.status(404).json({
                  "sporočilo": 
                    "Ne najdem nobenega komentarja."
                });
            }
        });
};
const reviewsDelete = (req, res) => {
    res.status(200).json({"status": "uspešno"});
};

module.exports = {
    reviewsAll,
    reviewsUpload,
    reviewsFind,
    reviewsDelete
}