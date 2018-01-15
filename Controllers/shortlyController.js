var base58 = require('../base58.js')
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var express = require('express');
var router = express.Router();



var shortlyController = function () {
    var Url = require('../models/url');

    var post = function (req, res) {
        var longUrl = req.body.url;
        var shortUrl = '';
        console.log('longurl: ' + longUrl);
        // check if url already exists in databas
        Url.findOne({
            long_url: longUrl
        }).then(function (url) {
            if (url) {
                shortUrl = 'http://localhost:3000/' + url.short_url_id;
                res.status(200).send({'shortUrl': shortUrl});

            } else {
                var newUrl = Url({
                    long_url: longUrl
                });
                newUrl.save().then(function (url) {

                        shortUrl = 'http://localhost:3000/' + url.short_url_id;
                        res.status(201).send({'shortUrl': shortUrl});
                    })
                    .catch(function (err) {
                        console.log(err)
                        res.status(500).send('An Internal Server Error has occurred');
                    })
            }
        });
    }

    var getById = function (req, res) {
        var base58Id = req.params.encoded_id;
        //var id = base58.decode(base58Id);

        Url.findOne({
                short_url_id: base58Id
            }).then(function (url) {
                res.redirect(url.long_url);
            })
            .catch(function (err) {
                //console.log(err);
                //res.redirect('http://localhost:3000');
                res.status(500).redirect('http://localhost:3000').send('An Internal Server Error has occurred');
            })
    }


    return {
        post: post,
        getById: getById
    }

}

module.exports = shortlyController;