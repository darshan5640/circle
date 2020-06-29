"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Schema = new Schema(
    {
        json: { type: String, required: true },
        isActive: { type: Boolean, default: true }
    },
    { timestamps: true }
);


Schema.statics.getAll = function () {
    return this.find({ isActive: true })
        .populate("department", ['_id', 'email'])
        .sort({ createdAt: -1 }).exec();
};

Schema.statics.findById = function (id) {
    return this.findOne({ _id: id, isActive: true })
        .populate("department", ['_id', 'email'])
        .exec();
};

Schema.statics.update = function (data) {
    return this.findOneAndUpdate({
        _id: data._id,
    }, {
        $set: data
    },
        { new: true } // returns updated record
    );
};

Schema.statics.delete = function (id) {
    return this.findOneAndUpdate({
        _id: id,
        isActive: { $ne: false }
    }, {
        $set: { isActive: false }
    },
        { new: true } // returns updated record
    );
};

module.exports = mongoose.model("Circle", Schema);
