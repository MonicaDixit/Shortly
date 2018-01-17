var base58 = require('../base58.js'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var countSchema = new Schema({
    _id: {
        type: String,
        required: true,
        default: 'url_id'
    },
    seq: {
        type: Number,
        default: 1
    }
});

var count = mongoose.model('count', countSchema);
var urlSchema = new Schema({
    short_url_id: {
        type: String
    },
    long_url: {
        type: String
    }
});

urlSchema.pre('save', function (next) {
    var doc = this;
    count.findByIdAndUpdate({
        _id: 'url_id'
    }, {
        $inc: {
            seq: 1
        }
    }, {
        "upsert": true,
        "new": true
    }, function (error, counter) {
        if (error)
            return next(error);
        doc.short_url_id = base58.encode(counter.seq + Math.floor(Math.random() * Math.pow(2, 32)));
        next();
    });

})

var Url = mongoose.model('Url', urlSchema);

module.exports = Url;