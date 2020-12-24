const mongoose = require('mongoose');
const Vehicle = mongoose.model('Vehicle');
const User = mongoose.model('User');
const vehiclesData = require('../models/vehicles-test.json');

function Latch(limit) {
    this.limit = limit;
    this.count = 0;
    this.waitBlock = function () {
    };
};

Latch.prototype.async = function (fn, ctx) {
    var _this = this;
    setTimeout(function () {
        fn.call(ctx, function () {
            _this.count = _this.count + 1;
            if (_this.limit <= _this.count) {
                _this.waitBlock.call(_this.waitBlockCtx);
            }
        });
    }, 0);
};

Latch.prototype.await = function (callback, ctx) {
    this.waitBlock = callback;
    this.waitBlockCtx = ctx;
};

const addSampleData = (req, res) => {
    TODO
};

const deleteAllData = (req, res) => {
    Vehicle.collection.drop();
    User.collection.drop();
    res.status(200).json({"sporočilo": "Vsebina podatkovne baze je bila uspešno izbrisana."});
};

module.exports = {
    addSampleData,
    deleteAllData
}