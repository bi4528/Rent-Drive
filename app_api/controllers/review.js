const mongoose = require('mongoose');
const Review = mongoose.model('Review');

const review = (req, res) => {
    Review.findById(req.params.idReview).exec((napaka, review) => {
        if (!review) {
            return res.status(404).json({
                "sporočilo": "Ne najdem lokacije s podanim enoličnim identifikatorjem idReview."
            });
        } else if (napaka) {
            return res.status(500).json(napaka);
        } else {
            res.status(200).json(review);
        }
    });
};

module.exports = {
    review
};